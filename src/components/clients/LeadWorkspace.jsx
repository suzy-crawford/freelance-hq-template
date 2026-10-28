import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Send,
  Check,
  Copy,
  CheckCircle2,
  ExternalLink,
  Globe,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ImagePic,
  ListLines,
  LinkChain,
  Megaphone,
  ArrowLeft,
} from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { useProfile } from "@/lib/ProfileContext";
import CopyIcon from "@/components/shared/CopyIcon";
import { cn } from "@/lib/utils";
import {
  adLibraryUrl,
  instagramSearchUrl,
  displayDomain,
  displayInstagram,
  displayFacebook,
  formatMoney,
  fillFindOpportunityPrompt,
  parseAnalysis,
  analysisReady,
  getSample,
  fallbackSamples,
  sampleOptions,
  withArticle,
  SECTIONS,
  buildOutreachPrompt,
  finalizeOutreach,
  outreachChecks,
  MESSAGE_FIELDS,
  OUTREACH_TONES,
} from "@/lib/libs";
import BuildsPanel from "@/components/builds/BuildsPanel";

// Lead page, Brand 2.0 (brand kit app/APP-2.0.md, screens lead-1 to lead-6).
// Two tool cards: AI Lead Analyzer (Screenshots > Your offer > AI Analysis > Paste answer, then the saved
// Lead analysis) and AI Outreach Generator (Create sample work > Your messages, then "I sent it").

const DEFAULT_OTHER = "Ads management for businesses";
const strip = (t) => String(t || "").replace(/==/g, "");
const FIT_WORDS = ["Best fit", "Great fit", "Good fit"];

export function leadStage(p) {
  if (p.contacted_at) return "Contacted";
  if (p.outreach) return "Message ready";
  if (p.analysis) return "Analyzed";
  return "Saved";
}

// ==phrase== from the answer becomes a soft berry highlight.
function Marked({ text }) {
  const parts = String(text || "").split(/==(.+?)==/g);
  return parts.map((p, i) => (i % 2 ? <mark key={i} className="hl">{p}</mark> : <React.Fragment key={i}>{p}</React.Fragment>));
}

// ---------- Header ----------
// The track is also navigation: Saved goes to the top, Analyze to the analyzer, Message and
// Contacted to the outreach generator.
function goToStep(i) {
  if (i === 0) return window.scrollTo({ top: 0, behavior: "smooth" });
  const el = document.getElementById(i === 1 ? "lead-analyze" : "lead-message");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LeadHeader({ prospect }) {
  const stage = prospect.contacted_at ? 4 : prospect.analysis ? 2 : 1;
  const steps = ["Saved", "Analyze", "Message", "Contacted"];
  return (
    <header className="lp-head">
      <span className="lp-avatar" aria-hidden="true">
        {prospect.name.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <h1 className="lp-title">{prospect.name}</h1>
        <div className="lp-sub">{[prospect.business_type, prospect.location].filter(Boolean).join(" · ")}</div>
      </div>
      <ol className="lp-track ab-track" aria-label="Where this lead is">
        {steps.map((s, i) => (
          <li key={s} className={cn("lp-step", i < stage && "is-done", i === stage && "is-current")} aria-current={i === stage ? "step" : undefined}>
            <button type="button" onClick={() => goToStep(i)}>
              <i />
              {s}
            </button>
          </li>
        ))}
      </ol>
    </header>
  );
}

// ---------- Right column ----------
export function ContactCard({ prospect, emailStatus, onFind, finding, findMessage }) {
  const handle = displayInstagram(prospect.instagram).replace(/^@/, "");
  const rows = [
    { icon: Instagram, value: prospect.instagram, display: displayInstagram(prospect.instagram), href: prospect.instagram, label: "Copy Instagram", extra: handle ? { href: `https://ig.me/m/${handle}`, text: "Open DM" } : null },
    { icon: Mail, value: prospect.email, label: "Copy email" },
    { icon: Phone, value: prospect.phone, label: "Copy phone" },
    { icon: Globe, value: prospect.website, display: displayDomain(prospect.website), href: prospect.website, label: "Copy website" },
    { icon: Facebook, value: prospect.facebook, display: displayFacebook(prospect.facebook), href: prospect.facebook, label: "Copy Facebook Page" },
    { icon: MapPin, value: prospect.address, label: "Copy address" },
  ].filter((r) => r.value);
  const missing = [!prospect.email && "email", !prospect.instagram && "Instagram", !prospect.facebook && "Facebook"].filter(Boolean);
  return (
    <section className="lp-card lp-side-card">
      <div className="lp-label">Contact</div>
      <ul className="lp-contacts">
        {rows.map((r) => (
          <li key={r.label}>
            <r.icon />
            {r.href ? (
              <a href={r.href} target="_blank" rel="noreferrer" title={r.value}>
                {r.display || r.value}
              </a>
            ) : (
              <span title={r.value}>{r.display || r.value}</span>
            )}
            {r.extra ? (
              <a href={r.extra.href} target="_blank" rel="noreferrer" className="lp-link lp-dm">
                {r.extra.text} <ExternalLink />
              </a>
            ) : (
              <CopyIcon text={r.value} label={r.label} />
            )}
          </li>
        ))}
      </ul>
      <p className="lp-foot">
        {prospect.email && emailStatus && (
          <>
            {emailStatus}
            {prospect.email_source && (
              <>
                {" · "}
                <a href={prospect.email_source} target="_blank" rel="noreferrer" className="lp-quiet-link">
                  see where
                </a>
              </>
            )}
          </>
        )}
        {missing.length > 0 && (
          <>
            {prospect.email && emailStatus ? " · " : ""}
            <button type="button" className="lp-quiet-link" onClick={onFind} disabled={finding}>
              {finding ? "Searching..." : `Find their ${missing.join(", ")}`}
            </button>
          </>
        )}
      </p>
      {findMessage && <p className="lp-foot">{findMessage}</p>}
    </section>
  );
}

function TipsCard() {
  return (
    <section className="lp-card lp-side-card">
      <div className="lp-label">What makes a good screenshot</div>
      <ul className="lp-tips">
        <li>The whole screen, not a crop</li>
        <li>Their newest posts, not their best ones</li>
        <li>Ads show the most: they're already paying for marketing</li>
      </ul>
    </section>
  );
}

// ---------- Shared tool-card parts ----------
function ToolHead({ icon: Icon, title, children }) {
  return (
    <div className="lp-tool-head">
      <span className="lp-tool-icon">
        <Icon />
      </span>
      <div className="min-w-0">
        <h2 className="lp-tool-title">{title}</h2>
        <p className="lp-tool-intro">{children}</p>
      </div>
    </div>
  );
}

function StepTabs({ steps, current, onPick }) {
  return (
    <div className="lp-steptabs" role="tablist">
      {steps.map((s, i) => (
        <button
          key={s}
          type="button"
          role="tab"
          className={cn("lp-steptab", i < current && "is-done")}
          aria-current={i === current ? "step" : undefined}
          aria-selected={i === current}
          onClick={() => onPick(i)}
        >
          <b>{i < current ? <Check /> : i + 1}</b>
          {s}
        </button>
      ))}
    </div>
  );
}

function Foot({ left, onBack, children }) {
  return (
    <div className="lp-cardfoot">
      {onBack ? (
        <button type="button" className="lp-link lp-back-link" onClick={onBack}>
          <ArrowLeft /> Back
        </button>
      ) : (
        <span className="lp-meta">{left}</span>
      )}
      {children}
    </div>
  );
}

// ---------- AI Lead Analyzer ----------
function LeadAnalyzer({ prospect, offer, onUpdated, pitchState, rerun, setRerun }) {
  const { profile } = useProfile();
  const { pitch, setPitch, other, setOther, offers, chosenOffer, customPitch } = pitchState;
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("opportunity");
  const first = prospect.name.split(/\s+/)[0];
  const analysis = prospect.analysis?.source === "claude" ? prospect.analysis : null;
  const showSteps = !analysis || rerun;
  const experience = chosenOffer?.experience_level || profile?.experience_level;
  const pitchName = customPitch || chosenOffer?.selected_name || "your offer";
  const prompt = useMemo(
    () => fillFindOpportunityPrompt({ prospect, offer: chosenOffer, experience, customPitch }),
    [prospect, chosenOffer, experience, customPitch]
  );

  const look = [
    { icon: Instagram, what: "Instagram, TikTok, and other social feeds", href: prospect.instagram || instagramSearchUrl(prospect.name, prospect.location), link: "Open" },
    { icon: ImagePic, what: "3-5 social media posts" },
    { icon: Globe, what: "Website homepage", href: prospect.website || "", link: "Open" },
    { icon: ListLines, what: "Other important website pages", sub: "Services, case studies", href: prospect.website || "", link: "Open" },
    { icon: LinkChain, what: "Links in social media bio", href: prospect.instagram || "", link: "Open" },
    { icon: Megaphone, what: "Active ads they are running", href: adLibraryUrl(prospect.name), link: "Ad Library" },
  ];

  const savePitch = async (next, text) => {
    try {
      const updates = next === "other" ? { pitch_custom: text || DEFAULT_OTHER } : { offer_id: next, pitch_custom: "" };
      onUpdated(await base44.entities.Prospect.update(prospect.id, updates));
    } catch {
      /* applies to this visit */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked: she can select the text in the box */
    }
  };

  const parsed = useMemo(() => (pasted.trim() ? parseAnalysis(pasted) : null), [pasted]);
  const ready = analysisReady(parsed);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const recs = parsed.samples?.length ? parsed.samples : fallbackSamples({ offer: chosenOffer, customPitch });
      const saved = {
        ...parsed,
        samples: recs,
        chosen_samples: recs.slice(0, 1).map((r) => r.id),
        full_text: pasted,
        pitch: customPitch || chosenOffer?.selected_name || "",
      };
      const updated = await base44.entities.Prospect.update(prospect.id, { analysis: saved, analyzed_at: new Date().toISOString(), outreach: null, contacted_at: "" });
      setPasted("");
      setStep(0);
      setRerun(false);
      onUpdated(updated);
    } catch (e) {
      setError(e?.message || "That didn't save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const date = prospect.analyzed_at ? new Date(prospect.analyzed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
  const caught = analysis?.caught?.length ? analysis.caught : [analysis?.positive].filter(Boolean);

  return (
    <section className="lp-card" id="lead-analyze">
      <ToolHead icon={Search} title="AI Lead Analyzer">
        We will use AI to look at the prospect's current online presence and marketing, find your highest-leverage offer, and create a high-quality outbound message.
      </ToolHead>

      {showSteps ? (
        <>
          {rerun && analysis && (
            <div className="lp-saved">
              <span>Running a new analysis. Your saved one stays until you paste a new answer.</span>
              <button type="button" className="lp-link lp-push" onClick={() => (setRerun(false), setStep(0))}>
                Back to my saved analysis
              </button>
            </div>
          )}
          <StepTabs steps={["Screenshots", "Your offer", "AI Analysis", "Paste answer"]} current={step} onPick={setStep} />

          {step === 0 && (
            <>
              <div className="lp-body">
                <h3 className="lp-h">Grab screenshots of the brand's online presence</h3>
                <ul className="lp-list">
                  {look.map((it) => (
                    <li key={it.what}>
                      <span className="lp-list-icon">
                        <it.icon />
                      </span>
                      <span className="lp-list-text">
                        {it.what}
                        {it.sub && <small>{it.sub}</small>}
                      </span>
                      {it.href && (
                        <a href={it.href} target="_blank" rel="noreferrer" className="lp-link">
                          {it.link} <ExternalLink />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <Foot left="About 5 minutes in all">
                <button type="button" className="lp-btn" onClick={() => setStep(1)}>
                  Next: pick your offer →
                </button>
              </Foot>
            </>
          )}

          {step === 1 && (
            <>
              <div className="lp-body">
                <h3 className="lp-h">Pick the offer you'll pitch</h3>
                <p className="lp-p">We'll shape the analysis and your message around it.</p>
                <div className="lp-pitch-pick">
                  <select
                    className="select"
                    value={pitch}
                    onChange={(e) => {
                      setPitch(e.target.value);
                      savePitch(e.target.value, other.trim());
                    }}
                    aria-label="Offer to pitch"
                  >
                    {offers.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.selected_name}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {pitch === "other" && (
                    <input
                      className="input"
                      value={other}
                      placeholder={DEFAULT_OTHER}
                      onChange={(e) => setOther(e.target.value)}
                      onBlur={() => savePitch("other", other.trim())}
                      aria-label="Your offer"
                    />
                  )}
                </div>
                {chosenOffer && (
                  <div className="lp-offer-box">
                    <strong>
                      {chosenOffer.selected_name}
                      {chosenOffer.price ? ` · ${formatMoney(chosenOffer.price)}/mo` : ""}
                    </strong>
                    {chosenOffer.record?.talk?.one_sentence && <p>{chosenOffer.record.talk.one_sentence}</p>}
                  </div>
                )}
                <Link to="/offer-builder" className="lp-link lp-mt">
                  Build a new offer
                </Link>
              </div>
              <Foot onBack={() => setStep(0)}>
                <button type="button" className="lp-btn" onClick={() => setStep(2)}>
                  Next: AI analysis →
                </button>
              </Foot>
            </>
          )}

          {step === 2 && (
            <>
              <div className="lp-body">
                <h3 className="lp-h">Analyze with Claude or ChatGPT</h3>
                <p className="lp-p">
                  Copy this prompt, open either one, and attach your screenshots. It's already written for {first} and {pitchName}.
                </p>
                <div className="lp-codebox">
                  <div className="lp-codebox-bar">
                    <span className="lp-codebox-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>prompt.txt</span>
                    <button type="button" className="lp-codebox-copy" onClick={copy}>
                      {copied ? <Check /> : <Copy />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre tabIndex={0} aria-label="The full prompt">
                    {prompt}
                  </pre>
                </div>
                <div className="lp-actions">
                  <button type="button" className="lp-btn-outline" onClick={copy}>
                    {copied ? <Check /> : <Copy />}
                    {copied ? "Copied" : "Copy prompt"}
                  </button>
                  <a href="https://claude.ai/new" target="_blank" rel="noreferrer" className="lp-link">
                    Open Claude <ExternalLink />
                  </a>
                  <a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="lp-link">
                    Open ChatGPT <ExternalLink />
                  </a>
                </div>
              </div>
              <Foot onBack={() => setStep(1)}>
                <button type="button" className="lp-btn" onClick={() => setStep(3)}>
                  Next: paste the answer →
                </button>
              </Foot>
            </>
          )}

          {step === 3 && (
            <>
              <div className="lp-body">
                <h3 className="lp-h">Paste the whole answer</h3>
                <p className="lp-p">Copy everything Claude or ChatGPT wrote and paste it here. We'll save it to {first} and write your first message.</p>
                <textarea
                  className="lp-paste"
                  rows={8}
                  value={pasted}
                  onChange={(e) => setPasted(e.target.value)}
                  placeholder="Paste the answer from Claude or ChatGPT"
                  aria-label="Answer from Claude or ChatGPT"
                />
                {pasted.trim() &&
                  (ready ? (
                    <p className="lp-ok">
                      <Check /> Looks complete: starts with "1. Business snapshot"
                    </p>
                  ) : (
                    <p className="lp-warn">We can't find the Outreach handoff part yet. Paste the whole answer.</p>
                  ))}
                {error && <p className="lp-error">{error}</p>}
              </div>
              <Foot onBack={() => setStep(2)}>
                <button type="button" className="lp-btn" onClick={save} disabled={!ready || saving}>
                  {saving ? "Saving..." : "Write my message →"}
                </button>
              </Foot>
            </>
          )}
        </>
      ) : (
        <div className="lp-body lp-body-saved">
          <div className="lp-saved">
            <CheckCircle2 />
            <span>
              <strong>Analysis saved</strong> · {date}
              {analysis.pitch ? ` · pitching ${analysis.pitch}` : ""}
            </span>
            <button type="button" className="lp-link lp-push" onClick={() => setRerun(true)}>
              Run a new analysis
            </button>
          </div>

          <h3 className="lp-h lp-h-sm">Lead analysis</h3>
          <div className="lp-tabs" role="tablist">
            {[
              ["snapshot", "Business snapshot"],
              ["opportunity", "The opportunity"],
              ["pitch", "Pitch idea"],
            ].map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className="lp-tab">
                {label}
              </button>
            ))}
          </div>

          {tab === "snapshot" && (
            <div className="lp-pane">
              {analysis.snapshot && (
                <p className="lp-text">
                  <Marked text={analysis.snapshot} />
                </p>
              )}
              {caught.length > 0 && (
                <>
                  <div className="lp-label lp-gap">What caught my attention</div>
                  <ul className="lp-findings">
                    {caught.map((c, i) => (
                      <li key={i}>
                        <i />
                        <p>
                          <Marked text={c} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          {tab === "opportunity" && (
            <div className="lp-pane">
              <p className="lp-lead">
                <Marked text={analysis.opp_detail || analysis.opportunity} />
              </p>
              <dl className="lp-defs">
                {[
                  ["What I noticed", analysis.noticed],
                  ["Why it might be useful", analysis.why],
                  ["Evidence", analysis.opp_evidence || analysis.evidence, true],
                ]
                  .filter((r) => r[1])
                  .map(([label, value, muted]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd className={muted ? "is-muted" : ""}>
                        <Marked text={value} />
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}
          {tab === "pitch" && (
            <div className="lp-pane">
              <div className="lp-pitch-box">
                <div className="lp-label">Pitch idea</div>
                <p>{strip(analysis.idea_detail || analysis.idea)}</p>
              </div>
              <dl className="lp-defs">
                {[
                  ["What you'd offer to send", analysis.offer_to_send],
                  ["What it could look like", analysis.creative],
                  ["Why it's relevant", analysis.relevance],
                ]
                  .filter((r) => r[1])
                  .map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>
                        <Marked text={value} />
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ---------- AI Outreach Generator ----------
function OutreachGenerator({ prospect, offer, onUpdated }) {
  const { profile } = useProfile();
  const a = prospect.analysis || {};
  const [step, setStep] = useState(prospect.outreach ? 1 : 0);
  const [outreach, setOutreach] = useState(prospect.outreach || null);
  const [tab, setTab] = useState("dm");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showChecks, setShowChecks] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const first = prospect.name.split(/\s+/)[0];

  const { ordered: top, chosen } = sampleOptions(a);
  const shown = top.slice(0, 3);
  const others = top.slice(3);
  const chosenSample = top.find((x) => x.id === chosen) || getSample(chosen);

  const choose = async (id) => {
    try {
      onUpdated(await base44.entities.Prospect.update(prospect.id, { analysis: { ...a, chosen_samples: [id], chosen_by_user: true } }));
    } catch {
      /* try again */
    }
  };

  const generate = async (tone) => {
    setRunning(true);
    setError("");
    try {
      const fresh = { ...prospect, analysis: { ...a, chosen_samples: [chosen], chosen_text: chosenSample?.fromIdea ? chosenSample.receive : "" } };
      const { prompt, response_json_schema } = buildOutreachPrompt({ offer, profile, prospect: fresh, tone });
      const finalized = finalizeOutreach(await callAI({ prompt, response_json_schema }));
      setOutreach(finalized);
      setStep(1);
      onUpdated(await base44.entities.Prospect.update(prospect.id, { outreach: finalized }));
    } catch (e) {
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setRunning(false);
    }
  };

  const field = MESSAGE_FIELDS.find((f) => f.key === tab);
  const isEmail = tab === "email";
  const text = outreach ? (isEmail ? outreach.email_body : outreach[tab]) || "" : "";
  const copyText = isEmail && outreach ? `Subject: ${outreach.email_subject}\n\n${outreach.email_body}` : text;
  const checks = outreach ? outreachChecks(text, { prospectName: prospect.name, maxWords: field.maxWords, requireName: field.requireName }) : [];
  const passed = checks.filter((c) => c.pass).length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const change = (key, value) => setOutreach((prev) => ({ ...prev, [key]: value }));
  const save = async () => {
    try {
      onUpdated(await base44.entities.Prospect.update(prospect.id, { outreach }));
    } catch {
      /* kept on screen */
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  const sent = async () => {
    try {
      onUpdated(await base44.entities.Prospect.update(prospect.id, { contacted_at: new Date().toISOString() }));
    } catch {
      /* try again */
    }
  };

  const Option = ({ s, i }) => (
    <button type="button" role="radio" aria-checked={chosen === s.id} className="lp-option" onClick={() => choose(s.id)}>
      <span className="lp-radio" />
      <span className="lp-option-body">
        <span className="lp-option-name">
          {s.name}
          {s.rec && i < 3 && <span className="lp-option-fit">{FIT_WORDS[i]}</span>}
        </span>
        <span className="lp-option-text">
          They'd get {s.receive.charAt(0).toLowerCase() + s.receive.slice(1).replace(/\.$/, "")}.
        </span>
        {s.why && <span className="lp-option-why">{s.why}</span>}
      </span>
    </button>
  );

  return (
    <section className="lp-card" id="lead-message">
      <ToolHead icon={Send} title="AI Outreach Generator">
        Pick the sample work you'll offer {prospect.name}. Then we'll write your DM, email and follow-ups around it.
      </ToolHead>
      <StepTabs steps={["Create sample work", "Your messages"]} current={step} onPick={(i) => (i === 0 || outreach) && setStep(i)} />

      {step === 0 && (
        <>
          <div className="lp-body">
            <h3 className="lp-h">Create Sample Work</h3>
            <p className="lp-p">
              Give potential clients a reason to respond. Create personalized sample content, ads, or landing pages for their business so you can show them what you could do before pitching your services.
            </p>
            <div className="lp-options" role="radiogroup" aria-label="Sample work">
              {shown.map((s, i) => (
                <Option key={s.id} s={s} i={i} />
              ))}
              {showAll && others.map((s, i) => <Option key={s.id} s={s} i={i + 3} />)}
            </div>
            {others.length > 0 && (
              <button type="button" className="lp-link lp-mt" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show fewer options" : `See ${others.length} other options`}
              </button>
            )}
            {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
          </div>
          <Foot left={a.pitch ? `Pitching ${a.pitch}` : ""}>
            <button type="button" className="lp-btn" onClick={() => generate()} disabled={running || !chosen}>
              {running ? "Writing your messages..." : "Create my messages →"}
            </button>
          </Foot>
        </>
      )}

      {step === 1 && outreach && (
        <>
          <div className="lp-body">
            <div className="lp-note">
              <CheckCircle2 />
              <div>
                <strong>Offering: {chosenSample ? withArticle(chosenSample.name) : "a sample"}</strong>
                <p>
                  Your message says you've made it. When they reply yes, create it
                  {chosenSample ? `: ${chosenSample.receive.charAt(0).toLowerCase() + chosenSample.receive.slice(1).replace(/\.$/, "")}` : ""}.
                </p>
              </div>
              <button type="button" className="lp-link lp-push" onClick={() => setStep(0)}>
                Change
              </button>
            </div>

            <div className="lp-tabs lp-tabs-flush" role="tablist">
              {[
                ["dm", "Instagram DM"],
                ["email", "Email"],
                ["follow_up_1", "Follow-up 1"],
                ["follow_up_2", "Follow-up 2"],
              ].map(([id, label]) => (
                <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className="lp-tab">
                  {label}
                </button>
              ))}
            </div>
            {isEmail && (
              <input className="lp-subject" value={outreach.email_subject || ""} onChange={(e) => change("email_subject", e.target.value)} onBlur={save} aria-label="Email subject" />
            )}
            <textarea
              className="lp-message"
              rows={isEmail ? 8 : 5}
              value={text}
              onChange={(e) => change(isEmail ? "email_body" : tab, e.target.value)}
              onBlur={save}
              aria-label={field.label}
            />
            <div className="lp-msg-actions">
              <button type="button" className="lp-btn-outline" onClick={copy}>
                {copied ? "Copied" : "Copy message"}
              </button>
              <button type="button" className="lp-link lp-link-muted" onClick={() => generate()} disabled={running}>
                {running ? "Writing..." : "Write a new version"}
              </button>
              <button type="button" className={cn("lp-checkline", passed === checks.length ? "is-pass" : "is-warn")} onClick={() => setShowChecks((v) => !v)} aria-expanded={showChecks}>
                <CheckCircle2 />
                {words} words · {passed === checks.length ? `passes all ${checks.length} checks` : `passes ${passed} of ${checks.length} checks`}
              </button>
            </div>
            {showChecks && (
              <div className="lp-checks-detail">
                <ul>
                  {checks.map((c) => (
                    <li key={c.label} className={c.pass ? "is-pass" : "is-warn"}>
                      <CheckCircle2 /> {c.label}
                    </li>
                  ))}
                </ul>
                <div className="lp-tones">
                  Rewrite:
                  {OUTREACH_TONES.map((t) => (
                    <button key={t.id} type="button" className="lp-link lp-link-muted" onClick={() => generate(t.id)} disabled={running}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
          </div>
          <Foot onBack={() => setStep(0)}>
            {prospect.contacted_at ? (
              <span className="lp-sent">
                <CheckCircle2 /> Sent to {first}
              </span>
            ) : (
              <button type="button" className="lp-btn" onClick={sent}>
                I sent it →
              </button>
            )}
          </Foot>
        </>
      )}
    </section>
  );
}

// Shown until the analysis is saved: the same card, not usable yet.
function LockedGenerator({ prospect }) {
  return (
    <section className="lp-card lp-locked" aria-disabled="true" id="lead-message">
      <ToolHead icon={Send} title="AI Outreach Generator">
        Pick the sample work you'll offer {prospect.name}. Then we'll write your DM, email and follow-ups around it.
      </ToolHead>
      <div className="lp-steptabs">
        {["Create sample work", "Your messages"].map((label, i) => (
          <span key={label} className="lp-steptab">
            <b>{i + 1}</b>
            {label}
          </span>
        ))}
      </div>
      <div className="lp-body">
        <p className="lp-locked-note">Finish the AI Lead Analyzer above first. Your sample work options and messages will appear here.</p>
      </div>
    </section>
  );
}

// ---------- AI Builds (AI Build Lab, section 1: builds to get clients) ----------
function AIBuildsCard({ prospect, offer, onUpdated }) {
  return (
    <section className="lp-card" id="lead-builds">
      <ToolHead icon={Globe} title="AI Builds">
        Build {prospect.name} something real in Base44, then send them the link. It's the strongest way to open a conversation.{" "}
        <Link to={`/build-lab?lead=${prospect.id}`} className="lp-link">
          More builds in the AI Build Lab
        </Link>
      </ToolHead>
      <BuildsPanel prospect={prospect} offer={offer} builds={SECTIONS[0].builds} onUpdated={onUpdated} />
    </section>
  );
}

// ---------- The page body ----------
export default function LeadWorkspace({ prospect, offer, onUpdated, contact, extras }) {
  const [rerun, setRerun] = useState(false);
  const [offers, setOffers] = useState([]);
  const [pitch, setPitch] = useState(prospect.pitch_custom ? "other" : offer?.id || "");
  const [other, setOther] = useState(prospect.pitch_custom || "");
  const analyzed = prospect.analysis?.source === "claude" && !rerun;

  useEffect(() => {
    base44.entities.Offer.filter({ status: "complete" }, { sort: "-updated_date", limit: 50 })
      .then(({ items }) => {
        setOffers(items || []);
        setPitch((p) => p || (items?.[0]?.id ?? "other"));
      })
      .catch(() => setPitch((p) => p || "other"));
  }, []);

  const chosenOffer = pitch && pitch !== "other" ? offers.find((o) => o.id === pitch) || (offer?.id === pitch ? offer : null) : null;
  const customPitch = pitch === "other" ? other.trim() || DEFAULT_OTHER : "";
  const pitchState = { pitch, setPitch, other, setOther, offers, chosenOffer, customPitch };

  return (
    <div className="lp-grid">
      <div className="lp-main">
        <LeadAnalyzer prospect={prospect} offer={offer} onUpdated={onUpdated} pitchState={pitchState} rerun={rerun} setRerun={setRerun} />
        {analyzed ? (
          <OutreachGenerator key={prospect.analyzed_at || "none"} prospect={prospect} offer={offer} onUpdated={onUpdated} />
        ) : (
          <LockedGenerator prospect={prospect} />
        )}
        <AIBuildsCard prospect={prospect} offer={offer} onUpdated={onUpdated} />
        {extras}
      </div>
      <aside className="lp-side">
        {contact}
        {!analyzed && <TipsCard />}
      </aside>
    </div>
  );
}
