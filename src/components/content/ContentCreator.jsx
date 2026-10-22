import React, { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, FormDoc, Store, Target, Calendar, Video, Camera, ImagePic, Wand, Refresh } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { cn } from "@/lib/utils";
import { PRACTICE_BUSINESS } from "@/lib/adsData";
import { Foot, Q, Group, CopyBtn, CopyField, useCopy } from "@/components/ads/MetaAdsBuilder";
import {
  CONTENT_STAGES,
  LENGTHS,
  FORMATS,
  CTAS,
  formatLabel,
  nextBatch,
  postText,
  buildContentRewriteCall,
  finalizeContentRewrite,
  buildPillarRedoCall,
  applyPillarRedo,
  buildHookRedoCall,
  buildDayRedoCall,
  applyDayRedo,
  buildPositioningRedoCall,
  carouselDesignPrompt,
  contentDocHtml,
  contentDocText,
  strategyDocHtml,
  strategyDocText,
  strategyDocPage,
  contentDocPage,
} from "@/lib/contentEngine";
import { useProfile } from "@/lib/ProfileContext";

// Content Creator screens: About the client > Strategy > Content. Same kit 2.0 look as the Meta Ads Builder.

export function ContentTrack({ stage, canGo, onGo }) {
  const current = CONTENT_STAGES.findIndex((s) => s.id === stage);
  return (
    <ol className="lp-track ab-track" aria-label="Content steps">
      {CONTENT_STAGES.map((s, i) => (
        <li key={s.id} className={cn("lp-step", i < current && "is-done", i === current && "is-current")} aria-current={i === current ? "step" : undefined}>
          <button type="button" onClick={() => canGo(s.id) && onGo(s.id)} disabled={!canGo(s.id)}>
            <i />
            {s.label}
          </button>
        </li>
      ))}
    </ol>
  );
}

const FORMAT_ICON = { talking_head: Video, broll: Camera, carousel: ImagePic };
const GOAL_LABEL = { reach: "Reach", trust: "Trust", offer: "Offer" };

// ---------- 1. About the client ----------
export function AboutStep({ plan, onChange, onBuild, building, error }) {
  const [prospects, setProspects] = useState([]);
  const [reading, setReading] = useState(false);
  const [siteNote, setSiteNote] = useState("");
  const [tried, setTried] = useState(false);
  const set = (u) => onChange(u);
  const formats = plan.formats?.length ? plan.formats : [];
  const cta = CTAS.find((c) => c.id === plan.cta_type) || CTAS[0];
  const missing = [
    !String(plan.business_name || "").trim() && "business name",
    !String(plan.offer_text || "").trim() && "what they sell",
    !formats.length && "at least one format",
  ].filter(Boolean);

  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    base44.entities.Prospect.filter({}, { sort: "-updated_date", limit: 500 })
      .then(({ items }) => setProspects(items || []))
      .catch(() => {});
    base44.entities.AdCampaign.filter({}, { sort: "-updated_date", limit: 200 })
      .then(({ items }) => setCampaigns((items || []).filter((c) => c.business_name)))
      .catch(() => {});
  }, []);

  const BLANK = { business_source: "new", prospect_id: "", business_name: "", website: "", location: "", business_description: "", services: [], offer_text: "", audience: "", voice_samples: "" };
  // Picking a business replaces the answers; picking nothing clears them.
  const pickBusiness = (key) => {
    setSiteNote("");
    if (!key) return set(BLANK);
    const [kind, id] = key.split(":");
    if (kind === "lead") {
      const p = prospects.find((x) => x.id === id);
      if (p) set({ ...BLANK, business_source: "lead", prospect_id: key, business_name: p.name, website: p.website || "", location: p.location || "", business_description: p.business_type || "" });
    } else {
      const c = campaigns.find((x) => x.id === id);
      if (c)
        set({
          ...BLANK,
          business_source: "lead",
          prospect_id: key,
          business_name: c.business_name,
          website: c.website || "",
          location: c.location || "",
          business_description: c.business_description || "",
          services: c.services || [],
          offer_text: c.offer_text || c.product || "",
          audience: c.target_customer || "",
          voice_samples: c.voice_samples || "",
        });
    }
  };
  // Older plans saved the bare lead id.
  const selected = plan.prospect_id && !plan.prospect_id.includes(":") ? `lead:${plan.prospect_id}` : plan.prospect_id || "";

  const fillFromSite = async () => {
    setReading(true);
    setSiteNote("");
    try {
      const url = /^https?:\/\//i.test(plan.website) ? plan.website : `https://${plan.website}`;
      const res = await base44.functions.invoke("readWebsite", { url, follow: true });
      const site = res?.data ?? res;
      if (!site?.ok) {
        setSiteNote(`${site?.error || "We couldn't read that website."} Fill in the answers below yourself.`);
        return;
      }
      const { buildSiteFillPrompt, finalizeSiteFill, SITE_FILL_SCHEMA } = await import("@/lib/adsBuilder");
      const r = finalizeSiteFill(await callAI({ prompt: buildSiteFillPrompt(site), response_json_schema: SITE_FILL_SCHEMA }), site);
      const u = {};
      if (r.business_name && !plan.business_name) u.business_name = r.business_name;
      if (r.location && !plan.location) u.location = r.location;
      if (r.description && !plan.business_description) u.business_description = r.description;
      if (r.services.length) u.services = r.services;
      if (!plan.offer_text && (r.offers[0] || r.services[0])) u.offer_text = r.offers[0] || r.services[0];
      if (r.target_customer && !plan.audience) u.audience = r.target_customer;
      if (r.colors && !plan.brand_colors) u.brand_colors = r.colors;
      if (r.brand_style && !plan.brand_style) u.brand_style = r.brand_style;
      set(u);
      setSiteNote("We read their website and filled in what we found. Check each answer.");
    } catch {
      setSiteNote("That didn't work. Fill in the answers below yourself.");
    } finally {
      setReading(false);
    }
  };

  const toggleFormat = (id) => set({ formats: formats.includes(id) ? formats.filter((f) => f !== id) : [...formats, id] });

  return (
    <section className="lp-card">
      <div className="lp-body">
        <h2 className="ab-title">Tell us about the client</h2>
        <p className="mb-intro">A few answers and we'll plan their content and write the posts.</p>

        <div className="mb-source">
          <span>Start from</span>
          <select className="select" value={selected} onChange={(e) => pickBusiness(e.target.value)} aria-label="Pick a business">
            <option value="">{selected ? "None, start fresh" : "Pick a business"}</option>
            {prospects.length > 0 && (
              <optgroup label="Lead list">
                {prospects.map((p) => (
                  <option key={p.id} value={`lead:${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            )}
            {campaigns.length > 0 && (
              <optgroup label="Meta Ads Builder">
                {campaigns.map((c) => (
                  <option key={c.id} value={`ads:${c.id}`}>
                    {c.business_name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <button
            type="button"
            className="lp-link"
            onClick={() =>
              set({
                ...BLANK,
                business_source: "practice",
                prospect_id: "",
                business_name: PRACTICE_BUSINESS.business_name,
                business_description: PRACTICE_BUSINESS.business_description,
                location: PRACTICE_BUSINESS.location,
                offer_text: plan.offer_text || "Free skin consultation",
                audience: plan.audience || "Women 30 to 55 in Austin who want natural-looking results",
              })
            }
          >
            Use the practice business
          </button>
          {(selected || plan.business_source === "practice") && (
            <button type="button" className="lp-link mb-source-clear" onClick={() => pickBusiness("")}>
              Clear
            </button>
          )}
        </div>

        <div className="mb-fill">
          <span className="mb-fill-icon">
            <Wand />
          </span>
          <div className="mb-fill-text">
            <strong>Fill it in from their website</strong>
            <span>We'll read it and fill in what we can.</span>
          </div>
          <input className="input" value={plan.website || ""} onChange={(e) => set({ website: e.target.value })} placeholder="theirwebsite.com" aria-label="Their website" />
          <button type="button" className="lp-btn-outline" onClick={fillFromSite} disabled={!String(plan.website || "").trim() || reading}>
            {reading ? "Reading..." : "Fill it in"}
          </button>
        </div>
        {siteNote && <p className="ab-hint mb-fill-note">{siteNote}</p>}

        <Group icon={Store} title="The business">
          <div className="mb-two">
            <Q label="Business name">
              <input className="input" value={plan.business_name || ""} onChange={(e) => set({ business_name: e.target.value })} placeholder="Glow Aesthetics" aria-label="Business name" />
            </Q>
            <Q label="Who's it for?">
              <input className="input" value={plan.audience || ""} onChange={(e) => set({ audience: e.target.value })} placeholder="Busy moms in Austin who want to feel like themselves again" aria-label="Who it's for" />
            </Q>
          </div>
          <Q label="What do they sell?" hint="The service or offer the content should lead to.">
            <input className="input" value={plan.offer_text || ""} onChange={(e) => set({ offer_text: e.target.value })} placeholder="Free skin consultation" aria-label="What they sell" />
          </Q>
        </Group>

        <Group icon={Target} title="What should followers do?">
          <div className="choice mb-chips">
            {CTAS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cta.id === c.id} onClick={() => set({ cta_type: c.id })}>
                {c.label}
              </button>
            ))}
          </div>
          {cta.ask && (
            <Q label={cta.ask} optional>
              <input className="input" value={plan.cta_detail || ""} onChange={(e) => set({ cta_detail: e.target.value })} placeholder={cta.placeholder} aria-label={cta.ask} />
            </Q>
          )}
        </Group>

        <Group icon={Calendar} title="How much content?">
          <div className="cc-lengths" role="radiogroup" aria-label="How much content">
            {LENGTHS.map((l) => (
              <button key={l.n} type="button" role="radio" aria-checked={Number(plan.length || 5) === l.n} className="mb-goal" onClick={() => set({ length: l.n })}>
                <strong>{l.label}</strong>
                <span>{l.sub || "One for each day"}</span>
              </button>
            ))}
          </div>
          <Q label="Which formats?">
            <div className="cc-formats">
              {FORMATS.map((f) => {
                const Icon = FORMAT_ICON[f.id];
                const on = formats.includes(f.id);
                return (
                  <button key={f.id} type="button" role="checkbox" aria-checked={on} className="mb-goal" onClick={() => toggleFormat(f.id)}>
                    <span className="mb-goal-icon">
                      <Icon />
                    </span>
                    <strong>{f.label}</strong>
                    <span>{f.text}</span>
                  </button>
                );
              })}
            </div>
          </Q>
        </Group>

        <Q label="Paste 2 or 3 of the client's captions" optional hint="So the posts sound like them, not like AI.">
          <textarea className="textarea" rows={4} value={plan.voice_samples || ""} onChange={(e) => set({ voice_samples: e.target.value })} />
        </Q>
        {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
      </div>
      <Foot left={tried && missing.length ? <span className="ab-missing">Still needed: {missing.join(", ")}</span> : "About a minute"}>
        <button type="button" className="lp-btn" onClick={() => (missing.length ? setTried(true) : onBuild())} disabled={building}>
          {building ? "Planning..." : plan.strategy ? "Redo my plan →" : "Plan my content →"}
        </button>
      </Foot>
    </section>
  );
}

// "Redo" with an optional note: what should change. One small AI call.
function RedoButton({ label = "Redo", big, warn, example, onRedo }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const run = async () => {
    setBusy(true);
    setErr("");
    try {
      await onRedo(note.trim());
      setOpen(false);
      setNote("");
    } catch {
      setErr("That didn't work. Try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className={cn("cc-redo", open && "is-open")}>
      <button type="button" className={big ? "lp-btn-outline" : "mb-tool"} onClick={() => setOpen((v) => !v)} aria-expanded={open} disabled={busy}>
        <Refresh /> {busy ? "Redoing..." : label}
      </button>
      {open && (
        <form
          className="cc-redo-pop"
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <label className="cc-redo-q" htmlFor={undefined}>
            What didn't you like? <em>Optional</em>
          </label>
          <input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder={example || "e.g. too generic"} aria-label="What didn't you like" autoFocus />
          <button type="submit" className="lp-btn lp-btn-sm" disabled={busy}>
            {busy ? "Redoing..." : "Redo"}
          </button>
          <span className="cc-redo-hint">Leave it blank and you'll just get a new one.</span>
          {warn && <span className="cc-redo-warn">{warn}</span>}
          {err && <span className="lp-error">{err}</span>}
        </form>
      )}
    </span>
  );
}

// ---------- 2. Strategy ----------
// "Prepared by" on the client docs: the freelancer's name.
function useBy() {
  const { profile } = useProfile();
  return [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
}

export function StrategyStep({ plan, building, writing, error, onBack, onWrite, onSaveStrategy, onRedoAll }) {
  const st = plan.strategy;
  const by = useBy();
  const [pillarTab, setPillarTab] = useState(0);
  if (building || !st)
    return (
      <section className="lp-card">
        <div className="lp-body">
          <h2 className="ab-title">Your content plan</h2>
          {building ? (
            <div className="ab-building">
              <i /> Planning content for this client. This takes about a minute.
            </div>
          ) : (
            <p className="lp-p">Answer the questions in About, then press Plan my content.</p>
          )}
          {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
        </div>
        <Foot onBack={onBack} />
      </section>
    );
  const pillar = st.pillars[pillarTab] || st.pillars[0];
  const hooks = st.hooks.map((h, gi) => ({ ...h, gi })).filter((h) => h.pillar === pillar?.name);
  const hooksText = st.pillars.map((p) => `${p.name}\n${st.hooks.filter((h) => h.pillar === p.name).map((h) => `- ${h.line}`).join("\n")}`).join("\n\n");
  const hasPosts = (plan.posts || []).length > 0;
  const written = new Set((plan.posts || []).map((x) => x.day));
  const ai = async (call) => callAI(call);
  const redoPillar = async (i, note) => {
    const { strategy, changed } = applyPillarRedo(st, i, await ai(buildPillarRedoCall(plan, i, note)));
    onSaveStrategy(strategy, changed);
  };
  const redoHook = async (gi, note) => {
    const r = await ai(buildHookRedoCall(plan, st.hooks[gi], note));
    const line = String(r?.text || "").replace(/\s*\u2014\s*/g, ", ").trim();
    if (!line) throw new Error("empty");
    onSaveStrategy({ ...st, hooks: st.hooks.map((h, j) => (j === gi ? { ...h, line } : h)) });
  };
  const redoDay = async (item, note) => {
    const next = applyDayRedo(plan, item, await ai(buildDayRedoCall(plan, item, note)));
    onSaveStrategy({ ...st, calendar: st.calendar.map((x) => (x.day === item.day ? next : x)) }, [item.day]);
  };
  const positioningField = {
    label: "Positioning",
    value: st.positioning,
    edited: false,
    onFill: () => {},
    onReset: () => {},
    onSave: (t) => onSaveStrategy({ ...st, positioning: t }),
    onRewrite: async (how) => {
      const r = await ai(buildPositioningRedoCall(plan, how));
      const t = String(r?.text || "").replace(/\s*\u2014\s*/g, ", ").trim();
      if (!t) throw new Error("empty");
      onSaveStrategy({ ...st, positioning: t });
    },
  };
  return (
    <section className="lp-card">
      <div className="lp-body">
        <div className="cc-title-row">
          <h2 className="ab-title">Your content plan</h2>
          <div className="cc-plan-tools">
            <DocActions quiet html={strategyDocHtml(plan)} text={strategyDocText(plan)} page={strategyDocPage(plan, by)} copyLabel="Copy strategy doc" />
            <RedoButton label="Redo the whole plan" example="e.g. too generic, focus more on Botox" warn={hasPosts ? "Your written posts will be cleared." : ""} onRedo={onRedoAll} />
          </div>
        </div>

        <div className="cc-position">
          <CopyField {...positioningField} />
        </div>

        <h3 className="cc-h">Content pillars</h3>
        <div className="cc-pillars">
          {st.pillars.map((p, i) => (
            <div key={p.name} className="cc-pillar">
              <div className="cc-pillar-top">
                <span className="cc-pillar-n">{i + 1}</span>
                <RedoButton
                  label="Redo pillar"
                  example="e.g. too broad, make one about pricing"
                  warn={st.calendar.some((x) => x.pillar === p.name && written.has(x.day)) ? "Posts written for this pillar will need writing again." : ""}
                  onRedo={(note) => redoPillar(i, note)}
                />
              </div>
              <strong>{p.name}</strong>
              <p>{p.about}</p>
              <p className="cc-pillar-offer">
                <b>Leads to the offer:</b> {p.leads_to_offer}
              </p>
            </div>
          ))}
        </div>

        <div className="cc-h-row">
          <h3 className="cc-h">Hook bank</h3>
          <CopyBtn text={hooksText} label="Copy all hooks" />
        </div>
        <div className="mb-tabs cc-hook-tabs" role="tablist" aria-label="Hooks by pillar">
          {st.pillars.map((p, i) => (
            <div key={p.name} className={cn("mb-tab", i === pillarTab && "is-current")}>
              <button type="button" role="tab" aria-selected={i === pillarTab} onClick={() => setPillarTab(i)}>
                <span className="mb-tab-name">{p.name}</span>
                <span className="mb-tab-angle">{st.hooks.filter((h) => h.pillar === p.name).length} hooks</span>
              </button>
            </div>
          ))}
        </div>
        <ol className="cc-hooks">
          {hooks.map((h) => (
            <li key={h.gi}>
              <span>{h.line}</span>
              <RedoButton example="e.g. too salesy, make it funnier" onRedo={(note) => redoHook(h.gi, note)} />
            </li>
          ))}
        </ol>

        <h3 className="cc-h">Calendar</h3>
        <div className="cc-cal">
          {st.calendar.map((x) => {
            const Icon = FORMAT_ICON[x.format] || ImagePic;
            return (
              <div key={x.day} className="cc-day">
                <div className="cc-day-top">
                  <span className="cc-day-n">Day {x.day}</span>
                  <span className={cn("cc-goal", `is-${x.goal}`)}>{GOAL_LABEL[x.goal]}</span>
                </div>
                <div className="cc-day-format">
                  <Icon /> {formatLabel(x.format)}
                </div>
                <strong>{x.hook}</strong>
                <span className="cc-day-pillar">{x.pillar}</span>
                <div className="cc-day-foot">
                  <RedoButton example="e.g. make it a carousel, talk about first visits" warn={written.has(x.day) ? "This post will need writing again." : ""} onRedo={(note) => redoDay(x, note)} />
                </div>
              </div>
            );
          })}
        </div>
        {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
      </div>
      <Foot onBack={onBack}>
        <button type="button" className="lp-btn" onClick={onWrite} disabled={writing}>
          {writing ? "Writing..." : hasPosts ? "See my content →" : `Write my first ${Math.min(5, st.calendar.length)} posts →`}
        </button>
      </Foot>
    </section>
  );
}

// ---------- 3. Content ----------
function PostDetail({ plan, post, item, onSave }) {
  const save = (u) => onSave({ ...post, ...u });
  const rewriter = (label, multiline) => async (text, how) => {
    const r = await callAI(buildContentRewriteCall(plan, post, label, text, how));
    const t = finalizeContentRewrite(r, multiline);
    if (!t) throw new Error("empty");
    return t;
  };
  // A field bound to one key of the post (or one item of a list).
  const field = (label, value, write, multiline) => ({
    label,
    value,
    multiline,
    copy: true,
    edited: false,
    onSave: (t) => write(t),
    onReset: () => {},
    onFill: (blank, v) => write(String(value).split(blank).join(v)),
    onRewrite: async (how) => write(await rewriter(label, multiline)(value, how)),
  });
  const setListItem = (key, i, v) => save({ [key]: post[key].map((x, j) => (j === i ? v : x)) });
  const setSlide = (i, v) => save({ slides: post.slides.map((sl, j) => (j === i ? { ...sl, text: v } : sl)) });
  return (
    <div className="mb-detail">
      <div className="mb-detail-head">
        <h3>
          Day {post.day}: {formatLabel(post.format)}
        </h3>
        {item && (
          <p>
            <strong>Pillar:</strong> {item.pillar} · <strong>Idea:</strong> {item.idea}
          </p>
        )}
      </div>
      <div className="mb-detail-stack">
        <div className="mb-fields">
          {post.format !== "carousel" && <CopyField {...field("Hook", post.hook, (t) => save({ hook: t }))} />}
          {post.format === "talking_head" && (
            <>
              <CopyField {...field("Script", post.script, (t) => save({ script: t }), true)} />
              <CopyField {...field("What to film", post.visual, (t) => save({ visual: t }), true)} />
            </>
          )}
          {post.format === "broll" && (
            <>
              {post.on_screen.map((t, i) => (
                <CopyField key={i} {...field(`Text on screen ${i + 1}`, t, (v) => setListItem("on_screen", i, v))} />
              ))}
              <CopyField {...field("What the clips show", post.visual, (t) => save({ visual: t }), true)} />
            </>
          )}
          {post.format === "carousel" &&
            post.slides.map((sl, i) => <CopyField key={i} {...field(`Slide ${i + 1}`, sl.text, (v) => setSlide(i, v), true)} note={sl.visual ? `Visual: ${sl.visual}` : ""} />)}
          <CopyField {...field("Caption", post.caption, (t) => save({ caption: t }), true)} />
        </div>
        {post.format === "carousel" && post.slides.length > 0 && (
          <div className="mb-action">
            <div className="mb-action-label">Make it</div>
            <h4 className="mb-action-title">Design this carousel</h4>
            <p>Paste this into Claude. It designs every slide at Instagram size in the client's colors, with your exact text. Upload their logo or a screenshot of their website first so it matches.</p>
            <div className="mb-action-row">
              <CopyBtn cream text={carouselDesignPrompt(plan, post, item)} label="Copy design prompt" />
              <a className="lp-link" href="https://claude.ai/new" target="_blank" rel="noreferrer">
                Open Claude <ExternalLink />
              </a>
            </div>
          </div>
        )}
        <div className="cc-copy-post">
          <CopyBtn text={postText(plan, post, item)} label="Copy the whole post" />
        </div>
      </div>
    </div>
  );
}

// Copy a doc with its formatting (pastes cleanly into Google Docs or Notion), or save it as a PDF.
function DocActions({ html, text, title, copyLabel = "Copy doc", quiet, page }) {
  const [copied, setCopied] = useState(false);
  const copyDoc = async () => {
    try {
      if (window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };
  // Opens the designed, client-ready page in a new tab; its own button saves it as a PDF.
  const openPage = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(page);
    w.document.close();
    w.focus();
  };
  return (
    <div className={quiet ? "cc-tools" : "mb-action-row cc-doc-actions"}>
      <button type="button" className={quiet ? "mb-tool" : "lp-btn-outline"} onClick={copyDoc}>
        {copied ? <Check /> : <Copy />} {copied ? "Copied" : copyLabel}
      </button>
      <button type="button" className={quiet ? "mb-tool" : "lp-btn-outline"} onClick={openPage}>
        {quiet && <FormDoc />} Open the doc
      </button>
    </div>
  );
}

// The content doc: every written post on one clean page, to use or show the client.
function ContentDoc({ plan }) {
  const html = contentDocHtml(plan);
  const by = useBy();
  const page = contentDocPage(plan, by);
  return (
    <div className="cc-doc-wrap">
      <div className="cc-doc-bar">
        <span className="ab-hint">Ready to use or send to your client.</span>
        <DocActions html={html} text={contentDocText(plan)} page={page} />
      </div>
      <iframe
        className="cc-doc-frame"
        title="Content doc preview"
        srcDoc={page.replace('<div class="bar">', '<div class="bar" style="display:none">')}
        onLoad={(e) => {
          const d = e.currentTarget.contentDocument;
          if (d) e.currentTarget.style.height = `${d.documentElement.scrollHeight + 8}px`;
        }}
      />
    </div>
  );
}

export function ContentStep({ plan, writing, error, onBack, onWriteMore, onSavePost, onDone }) {
  const cal = plan.strategy?.calendar || [];
  const posts = plan.posts || [];
  const [sel, setSel] = useState(posts[0]?.day || 1);
  const byDay = Object.fromEntries(posts.map((p) => [p.day, p]));
  const item = cal.find((x) => x.day === sel);
  const post = byDay[sel];
  const left = nextBatch(plan).length;
  const [view, setView] = useState("posts");
  return (
    <section className="lp-card">
      <div className="lp-body">
        <div className="cc-title-row">
          <h2 className="ab-title">Your content</h2>
          <div className="mb-seg" role="tablist" aria-label="View">
            <button type="button" role="tab" aria-selected={view === "posts"} onClick={() => setView("posts")}>
              Posts
            </button>
            <button type="button" role="tab" aria-selected={view === "doc"} onClick={() => setView("doc")}>
              Content doc
            </button>
          </div>
        </div>
        {view === "doc" ? (
          <ContentDoc plan={plan} />
        ) : (
          <>
        <p className="mb-intro">Pick a day to see its post. Edit anything, rewrite it, or copy it.</p>
        <div className="cc-stage">
          <ol className="cc-list" aria-label="Posts">
            {cal.map((x) => {
              const Icon = FORMAT_ICON[x.format] || ImagePic;
              const ready = !!byDay[x.day];
              return (
                <li key={x.day}>
                  <button type="button" className={cn("cc-list-item", sel === x.day && "is-current", !ready && "is-empty")} onClick={() => setSel(x.day)} aria-current={sel === x.day}>
                    <span className="cc-list-day">Day {x.day}</span>
                    <span className="cc-list-format">
                      <Icon /> {formatLabel(x.format)}
                    </span>
                    <span className="cc-list-hook">{x.hook}</span>
                    {!ready && <span className="cc-list-wait">Not written yet</span>}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="cc-main">
            {writing ? (
              <div className="ab-building">
                <i /> Writing the posts. This takes about a minute.
              </div>
            ) : post ? (
              <PostDetail key={sel} plan={plan} post={post} item={item} onSave={onSavePost} />
            ) : (
              <div className="cc-empty">
                <p>This post isn't written yet.</p>
                <button type="button" className="lp-btn-outline" onClick={onWriteMore}>
                  Write the next {Math.min(5, left)} posts
                </button>
              </div>
            )}
            {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
          </div>
        </div>
          </>
        )}
      </div>
      <Foot onBack={onBack} left={`${posts.length} of ${cal.length} written`}>
        {left > 0 ? (
          <button type="button" className="lp-btn" onClick={onWriteMore} disabled={writing}>
            {writing ? "Writing..." : `Write the next ${Math.min(5, left)} →`}
          </button>
        ) : (
          <button type="button" className="lp-btn" onClick={onDone}>
            Done <Check />
          </button>
        )}
      </Foot>
    </section>
  );
}
