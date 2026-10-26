import React, { useEffect, useState } from "react";
import { asset } from "@/lib/assets";
import {
  Check,
  Copy,
  ExternalLink,
  ArrowLeft,
  Store,
  Tag,
  Target,
  FormDoc,
  Calendar,
  Cart,
  Question,
  MapPin,
  Wand,
  Camera,
  Video,
  ImagePic,
  Play,
  ThumbUp,
  Comment,
  Share,
  Globe,
  Star,
  More,
  Pencil,
} from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPES, PRACTICE_BUSINESS, formatMoney } from "@/lib/adsData";
import { getNiche, cplText } from "@/lib/adsNiches";
import { BLANK_RE, displayName, fillBlanks } from "@/lib/adsCards";
import { STAGES, PLAN_GOALS, DAILY_PRESETS, RADIUS_PRESETS, dailyToMonthly, campaignDaily, blankPrompt, launchChecklist, goalLabel } from "@/lib/adsBuilder";
import {
  concepts,
  originalConcepts,
  buildRewriteCall,
  finalizeRewrite,
  buildVoiceCall,
  voiceEdits,
  REWRITE_OPTIONS,
  VOICES,
  conceptCopy,
  formatCaption,
  moreVersionsPrompt,
  funnelType,
  buildFunnelPrompt,
  imagePromptFor,
  instantFormText,
  buildCampaignInstructions,
} from "@/lib/adsEngine";

// Meta Ads Builder screens (kit 2.0, screens meta-ads-m1 to m4). One navigation: the track in the header.
// One night action box per screen, one primary button bottom right of each card.

// ---------- Shared bits ----------
export function StageTrack({ stage, canGo, onGo }) {
  const current = STAGES.findIndex((s) => s.id === stage);
  return (
    <ol className="lp-track ab-track" aria-label="Campaign steps">
      {STAGES.map((s, i) => (
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

export function Foot({ onBack, left, children }) {
  return (
    <div className="lp-cardfoot">
      {onBack && (
        <button type="button" className="lp-link lp-back-link" onClick={onBack}>
          <ArrowLeft /> Back
        </button>
      )}
      {left && <span className="lp-meta">{left}</span>}
      <div className="ab-foot-right">{children}</div>
    </div>
  );
}

// A term explained only when she asks (tap or hover).
export function Term({ children, tip }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="ab-term">
      <button type="button" onClick={() => setOpen((v) => !v)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} aria-expanded={open}>
        {children}
      </button>
      {open && (
        <span className="ab-term-tip" role="tooltip">
          {tip}
        </span>
      )}
    </span>
  );
}

export function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e?.stopPropagation?.();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };
  return [copied, copy];
}

// Gradient-outline copy button; cream pill inside a night box.
export function CopyBtn({ text, label, cream }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className={cream ? "mb-btn-cream" : "lp-btn-outline"} onClick={copy}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function CopyLink({ text, label, done = "Copied" }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className="lp-link ab-copylink" onClick={copy}>
      {copied ? done : label}
    </button>
  );
}

export function Q({ label, optional, hint, children }) {
  return (
    <div className="ab-q">
      <div className="ab-q-label">
        {label}
        {optional && <span className="ab-optional"> Optional</span>}
      </div>
      {children}
      {hint && <div className="ab-hint">{hint}</div>}
    </div>
  );
}

export function Group({ icon: Icon, title, action, children }) {
  return (
    <section className="mb-group">
      <div className="mb-group-head">
        <span className="mb-group-icon">
          <Icon />
        </span>
        <h3>{title}</h3>
        {action && <span className="mb-group-action">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function domainOf(url) {
  return String(url || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "");
}

const firstLetter = (c) => (displayName(c.business_name) || "?").trim().charAt(0).toUpperCase();

// The campaign summary: one strip under the header, from Ads on.
export function CampaignStrip({ campaign, onEdit }) {
  const daily = campaignDaily(campaign);
  const area = campaign.location ? `${campaign.location.split(",")[0]}${campaign.radius_miles ? ` + ${campaign.radius_miles} mi` : ""}` : "";
  const GoalIcon = GOAL_TILES[campaign.goal]?.icon || Target;
  const items = [
    ["Offer", campaign.offer_text || campaign.product, <Tag />],
    ["Goal", goalLabel(campaign.goal), <GoalIcon />],
    ["Budget", daily ? `${formatMoney(daily)}/day` : "", <b className="mb-strip-dollar">$</b>],
    ["Area", area, <MapPin />],
  ].filter(([, v]) => v);
  return (
    <div className="mb-strip">
      {items.map(([k, v, icon]) => (
        <div key={k} className="mb-strip-item">
          <span className="mb-strip-icon">{icon}</span>
          <div className="min-w-0">
            <small>{k}</small>
            <b>{v}</b>
          </div>
        </div>
      ))}
      <button type="button" className="mb-strip-edit" onClick={onEdit}>
        <Pencil /> Edit
      </button>
    </div>
  );
}

// ---------- 1. Plan ----------
const GOAL_TILES = {
  leads: { icon: FormDoc, text: "Leave their name and number" },
  appointments: { icon: Calendar, text: "Pick a time on their calendar" },
  purchases: { icon: Cart, text: "Purchase online" },
  help: { icon: Question, text: "We'll pick the best goal" },
};

// A small drawn map: the circle grows with the mile chips.
function RadiusMap({ miles, place }) {
  const r = 22 + Number(miles || 10) * 2.1;
  return (
    <div className="mb-map" aria-hidden="true">
      <svg viewBox="0 0 440 170" preserveAspectRatio="xMidYMid slice">
        <rect width="440" height="170" className="mb-map-land" />
        <path d="M330 0 C 300 60 320 120 350 170 L440 170 L440 0 Z" className="mb-map-water" />
        <path d="M0 40 L440 70 M0 120 L440 110 M95 0 L130 170 M270 0 L250 170" className="mb-map-road" />
        <path d="M0 85 L440 95" className="mb-map-road mb-map-road-thin" />
        <circle cx="210" cy="88" r={r} className="mb-map-ring" />
        <circle cx="210" cy="88" r="5" className="mb-map-dot" />
      </svg>
      <span className="mb-map-label">
        {place ? place.split(",")[0] : "Their city"}
        {miles ? ` + ${miles} miles` : ""}
      </span>
    </div>
  );
}

export function PlanStep({ campaign, onChange, onBuild, building }) {
  const [tried, setTried] = useState(false);
  const missing = [
    !String(campaign.business_name || "").trim() && "business name",
    !String(campaign.product || "").trim() && "what you're promoting",
    !campaign.goal && "what people should do",
  ].filter(Boolean);
  const [prospects, setProspects] = useState([]);
  const [reading, setReading] = useState(false);
  const [siteNote, setSiteNote] = useState("");
  const [found, setFound] = useState({ services: [], offers: [] });
  const [customBudget, setCustomBudget] = useState(false);
  const [otherService, setOtherService] = useState(false);
  const [more, setMore] = useState(false);
  const daily = campaignDaily(campaign);
  const niche = getNiche(campaign);
  const isPreset = DAILY_PRESETS.includes(Number(daily));
  const showCustom = customBudget || (daily && !isPreset && !campaign.budget_unsure);
  const services = found.services.length ? found.services : campaign.services || [];
  const showServiceInput = otherService || !services.length || (campaign.product && !services.includes(campaign.product));

  const [plans, setPlans] = useState([]);
  useEffect(() => {
    base44.entities.Prospect.filter({}, { sort: "-updated_date", limit: 500 })
      .then(({ items }) => setProspects(items || []))
      .catch(() => {});
    base44.entities.ContentPlan.filter({}, { sort: "-updated_date", limit: 200 })
      .then(({ items }) => setPlans((items || []).filter((p) => p.business_name)))
      .catch(() => {});
  }, []);

  const set = (u) => onChange(u);
  const setDaily = (d) => set({ daily_budget: d, monthly_budget: d ? dailyToMonthly(d) : null, budget_unsure: false });

  const CLEAR = { business_source: "new", prospect_id: "", business_name: "", website: "", location: "", business_description: "", services: [], product: "", offer_text: "", target_customer: "", differentiators: "", proof_text: "", credentials_text: "", brand_colors: "", brand_style: "", voice_samples: "" };
  // Picking a business replaces the answers; picking nothing clears them.
  const pickBusiness = (key) => {
    setSiteNote("");
    setFound({ services: [], offers: [] });
    if (!key) return set(CLEAR);
    const [kind, id] = key.split(":");
    if (kind === "lead") {
      const p = prospects.find((x) => x.id === id);
      if (p) set({ ...CLEAR, business_source: "lead", prospect_id: key, business_name: p.name, website: p.website || "", location: p.location || "" });
    } else {
      const c = plans.find((x) => x.id === id);
      if (c)
        set({
          ...CLEAR,
          business_source: "lead",
          prospect_id: key,
          business_name: c.business_name,
          website: c.website || "",
          location: c.location || "",
          business_description: c.business_description || "",
          services: c.services || [],
          product: (c.services || [])[0] || "",
          offer_text: c.offer_text || "",
          target_customer: c.audience || "",
          brand_colors: c.brand_colors || "",
          brand_style: c.brand_style || "",
          voice_samples: c.voice_samples || "",
        });
    }
  };
  // Older campaigns saved the bare lead id.
  const selected = campaign.prospect_id && !String(campaign.prospect_id).includes(":") ? `lead:${campaign.prospect_id}` : campaign.prospect_id || "";

  const fillFromSite = async () => {
    setReading(true);
    setSiteNote("");
    try {
      const url = /^https?:\/\//i.test(campaign.website) ? campaign.website : `https://${campaign.website}`;
      const res = await base44.functions.invoke("readWebsite", { url, follow: true });
      const site = res?.data ?? res;
      if (!site?.ok) {
        setSiteNote(`${site?.error || "We couldn't read that website."} Fill in the answers below yourself.`);
        return;
      }
      const { callAI } = await import("@/lib/callAI");
      const { buildSiteFillPrompt, finalizeSiteFill, SITE_FILL_SCHEMA } = await import("@/lib/adsBuilder");
      const r = finalizeSiteFill(await callAI({ prompt: buildSiteFillPrompt(site), response_json_schema: SITE_FILL_SCHEMA }), site);
      const updates = {};
      if (r.business_name && !campaign.business_name) updates.business_name = r.business_name;
      if (r.business_type) updates.business_type = r.business_type;
      if (r.location && !campaign.location) updates.location = r.location;
      if (r.description && !campaign.business_description) updates.business_description = r.description;
      if (r.services[0] && !campaign.product) updates.product = r.services[0];
      if (r.offers[0] && !campaign.offer_text) updates.offer_text = r.offers[0];
      if (r.goal && !campaign.goal) updates.goal = r.goal;
      if (r.services.length) updates.services = r.services;
      if (r.target_customer && !campaign.target_customer) updates.target_customer = r.target_customer;
      if (r.differentiators && !campaign.differentiators) updates.differentiators = r.differentiators;
      if (r.proof && !campaign.proof_text) updates.proof_text = r.proof;
      if (r.credentials && !campaign.credentials_text) updates.credentials_text = r.credentials;
      if (r.brand_style && !campaign.brand_style) updates.brand_style = r.brand_style;
      if (r.colors && !campaign.brand_colors) updates.brand_colors = r.colors;
      set(updates);
      setFound({ services: r.services, offers: r.offers });
      setOtherService(false);
      const gaps = [
        !(updates.target_customer || campaign.target_customer) && "the target customer",
        !(updates.offer_text || campaign.offer_text) && "the offer",
        !(updates.location || campaign.location) && "the location",
      ].filter(Boolean);
      setSiteNote(`We read their website and filled in what we found. Check each answer${gaps.length ? `, and add ${gaps.join(", ")}` : ""}.`);
    } catch (e) {
      setSiteNote("That didn't work. Fill in the answers below yourself.");
    } finally {
      setReading(false);
    }
  };

  return (
    <section className="lp-card">
      <div className="lp-body">
        <h2 className="ab-title">Tell us about the business</h2>
        <p className="mb-intro">Four quick parts. We'll build the whole campaign from your answers.</p>

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
            {plans.length > 0 && (
              <optgroup label="Content Creator">
                {plans.map((p) => (
                  <option key={p.id} value={`content:${p.id}`}>
                    {p.business_name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <button type="button" className="lp-link" onClick={() => set({ ...CLEAR, business_source: "practice", ...PRACTICE_BUSINESS })}>
            Use the practice business
          </button>
          {(selected || campaign.business_source === "practice") && (
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
          <input className="input" value={campaign.website || ""} onChange={(e) => set({ website: e.target.value })} placeholder="theirwebsite.com" aria-label="Their website" />
          <button type="button" className="lp-btn-outline" onClick={fillFromSite} disabled={!String(campaign.website || "").trim() || reading}>
            {reading ? "Reading..." : "Fill it in"}
          </button>
        </div>
        {siteNote && <p className="ab-hint mb-fill-note">{siteNote}</p>}

        <Group icon={Store} title="The business">
          <div className="mb-two">
            <Q label="Business name">
              <input className="input" value={campaign.business_name || ""} onChange={(e) => set({ business_name: e.target.value })} placeholder="Glow Aesthetics" aria-label="Business name" />
            </Q>
            <Q label="Who's the target customer?">
              <input className="input" value={campaign.target_customer || ""} onChange={(e) => set({ target_customer: e.target.value })} placeholder="Women 30 to 55 nearby who want natural-looking results" aria-label="Target customer" />
            </Q>
          </div>
          <Q label="What are you promoting?">
            {services.length > 0 && (
              <div className="choice mb-chips">
                {services.map((sv) => (
                  <button
                    key={sv}
                    type="button"
                    aria-pressed={campaign.product === sv && !otherService}
                    onClick={() => {
                      setOtherService(false);
                      set({ product: sv });
                    }}
                  >
                    {sv}
                  </button>
                ))}
                <button type="button" aria-pressed={!!otherService} onClick={() => (setOtherService(true), set({ product: "" }))}>
                  + Other
                </button>
              </div>
            )}
            {showServiceInput && (
              <input className="input mb-mt" value={campaign.product || ""} onChange={(e) => set({ product: e.target.value })} placeholder="Facials" aria-label="What you're promoting" autoFocus={otherService} />
            )}
          </Q>
        </Group>

        <Group
          icon={Tag}
          title="The offer"
          action={
            <button type="button" className="lp-link" onClick={() => set({ offer_help: !campaign.offer_help })} aria-pressed={!!campaign.offer_help}>
              {campaign.offer_help ? "I'll write the offer" : "Help me pick an offer"}
            </button>
          }
        >
          {campaign.offer_help ? (
            <p className="ab-hint">We'll pick the strongest offer for this business when we build the campaign.</p>
          ) : (
            <>
              <input
                className="input"
                value={campaign.offer_text || ""}
                onChange={(e) => set({ offer_text: e.target.value, offer_help: false })}
                placeholder="Free skin consultation"
                aria-label="The offer"
              />
              {found.offers.length > 0 && (
                <div className="choice mb-chips mb-mt">
                  {found.offers.map((o) => (
                    <button key={o} type="button" aria-pressed={campaign.offer_text === o} onClick={() => set({ offer_text: o, offer_help: false })}>
                      {o}
                    </button>
                  ))}
                </div>
              )}
              <div className="ab-hint">The reason someone taps the ad today.</div>
            </>
          )}
        </Group>

        <Group icon={Target} title="What should people do?">
          <div className="mb-goals" role="radiogroup" aria-label="What people should do">
            {PLAN_GOALS.map((g) => {
              const t = GOAL_TILES[g.id] || {};
              const Icon = t.icon || Question;
              return (
                <button key={g.id} type="button" role="radio" aria-checked={campaign.goal === g.id} className="mb-goal" onClick={() => set({ goal: g.id })}>
                  <span className="mb-goal-icon">
                    <Icon />
                  </span>
                  <strong>{g.label}</strong>
                  <span>{t.text}</span>
                </button>
              );
            })}
          </div>
        </Group>

        <Group icon={MapPin} title="Budget and area">
          <div className="mb-two">
            <Q label="Daily budget">
              <div className="choice mb-chips">
                {DAILY_PRESETS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={!showCustom && Number(daily) === d}
                    onClick={() => {
                      setCustomBudget(false);
                      setDaily(d);
                    }}
                  >
                    {formatMoney(d)}
                  </button>
                ))}
                <button type="button" aria-pressed={!!showCustom} onClick={() => setCustomBudget(true)}>
                  Custom
                </button>
              </div>
              {showCustom && (
                <div className="ab-row ab-narrow mb-mt">
                  <input
                    className="input"
                    type="number"
                    min="1"
                    value={daily ?? ""}
                    onChange={(e) => setDaily(e.target.value === "" ? null : Number(e.target.value))}
                    placeholder="Amount"
                    aria-label="Dollars per day"
                    autoFocus
                  />
                  <span className="lp-meta">a day</span>
                </div>
              )}
              {daily > 0 && (
                <div className="mb-monthly">
                  <span>{formatMoney(dailyToMonthly(daily))}</span> a month, paid by the business to Meta
                </div>
              )}
              <div className="ab-hint">
                {niche.budget ? `Typical for ${niche.label.toLowerCase()}: $${niche.budget[0]} to $${niche.budget[1]} a day.` : "$20 a day is a good first test."}
              </div>
            </Q>
            <Q label="Where should the ads run?">
              <input className="input" value={campaign.location || ""} onChange={(e) => set({ location: e.target.value })} placeholder="Austin, TX" aria-label="City" />
              <div className="choice mb-chips mb-mt">
                {RADIUS_PRESETS.map((m) => (
                  <button key={m} type="button" aria-pressed={Number(campaign.radius_miles) === m} onClick={() => set({ radius_miles: m })}>
                    +{m} mi
                  </button>
                ))}
              </div>
              <RadiusMap miles={campaign.radius_miles} place={campaign.location} />
            </Q>
          </div>
        </Group>

        <div className="mb-more-row">
          <button type="button" className="lp-link" onClick={() => setMore((v) => !v)} aria-expanded={more}>
            {more ? "Hide more details" : "More details (optional)"}
          </button>
          {!more && <span className="ab-muted">Photos they have, past ads, their target cost per lead</span>}
        </div>
        {more && (
          <div className="ab-more">
            <Q label="What kind of business is it?">
              <select className="select" value={campaign.business_type || ""} onChange={(e) => set({ business_type: e.target.value })} aria-label="Business type">
                <option value="">Work it out for me</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Q>
            <Q label="Tell us a little about the business" optional>
              <textarea className="textarea" rows={3} value={campaign.business_description || ""} onChange={(e) => set({ business_description: e.target.value })} />
            </Q>
            <Q
              label={
                <>
                  Their target <Term tip="Cost per lead: what the business pays Meta for each person who fills out the form or books.">cost per lead</Term>
                </>
              }
              optional
              hint={cplText(niche) ? `Typical for ${niche.label.toLowerCase()}: ${cplText(niche)}.` : "Leave it blank if you're not sure. The first 2 weeks will tell you."}
            >
              <input className="input ab-narrow" type="number" min="0" value={campaign.target_cpl ?? ""} onChange={(e) => set({ target_cpl: e.target.value === "" ? null : Number(e.target.value) })} placeholder="30" />
            </Q>
            <Q label="What makes them different?" optional>
              <input className="input" value={campaign.differentiators || ""} onChange={(e) => set({ differentiators: e.target.value })} placeholder="Two nurse injectors, 10 years in Austin" />
            </Q>
            <Q label="Real proof they have" optional hint="Only real things: a Google rating, number of reviews, years in business, awards. Never made up.">
              <input className="input" value={campaign.proof_text || ""} onChange={(e) => set({ proof_text: e.target.value })} placeholder="4.9 stars from 212 Google reviews" />
            </Q>
            <Q label="Credentials" optional>
              <input className="input" value={campaign.credentials_text || ""} onChange={(e) => set({ credentials_text: e.target.value })} placeholder="Board-certified, licensed estheticians" />
            </Q>
            <Q label="Brand colors and style" optional hint="Filled in from their website when we can read it.">
              <div className="ab-row">
                <input className="input" value={campaign.brand_colors || ""} onChange={(e) => set({ brand_colors: e.target.value })} placeholder="#f4ede4, #8a6f5a" aria-label="Brand colors" />
                <input className="input" value={campaign.brand_style || ""} onChange={(e) => set({ brand_style: e.target.value })} placeholder="Clean, warm, luxury spa" aria-label="Brand style" />
              </div>
            </Q>
            <Q label="What photos or videos do they have?" optional>
              <input className="input" value={campaign.assets_text || ""} onChange={(e) => set({ assets_text: e.target.value })} placeholder="Treatment room photos, a few client videos, team headshots" />
              <label className="ab-check">
                <input type="checkbox" checked={!!campaign.logo_available} onChange={(e) => set({ logo_available: e.target.checked })} />
                They have a logo
              </label>
            </Q>
            <Q label="Add emojis to the ads?">
              <div className="choice">
                <button type="button" aria-pressed={!campaign.no_emojis} onClick={() => set({ no_emojis: false })}>
                  Yes
                </button>
                <button type="button" aria-pressed={!!campaign.no_emojis} onClick={() => set({ no_emojis: true })}>
                  No
                </button>
              </div>
            </Q>
            <Q label="Paste a few of their posts or captions" optional hint="The ads will sound more like them.">
              <textarea className="textarea" rows={3} value={campaign.voice_samples || ""} onChange={(e) => set({ voice_samples: e.target.value })} />
            </Q>
            <Q label="Anything else we should know?" optional>
              <textarea className="textarea" rows={3} value={campaign.notes || ""} onChange={(e) => set({ notes: e.target.value })} />
            </Q>
          </div>
        )}
      </div>
      <Foot left={tried && missing.length ? <span className="ab-missing">Still needed: {missing.join(", ")}</span> : "About 2 minutes"}>
        <button type="button" className="lp-btn" onClick={() => (missing.length ? setTried(true) : onBuild())} disabled={building}>
          {building ? "Building..." : campaign.record ? "Rebuild my campaign →" : "Build my campaign →"}
        </button>
      </Foot>
    </section>
  );
}

// ---------- 2. Ads ----------
// Text with each [blank] as a tap-to-fill field.
function Fillable({ text, onFill }) {
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState("");
  const str = String(text || "");
  const out = [];
  let last = 0;
  for (const m of str.matchAll(BLANK_RE)) {
    if (m.index > last) out.push(str.slice(last, m.index));
    const blank = m[0];
    out.push(
      open === m.index ? (
        <input
          key={m.index}
          className="ab-blank-input"
          autoFocus
          value={value}
          placeholder={blankPrompt(blank).replace(/^Add /, "")}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            if (value.trim()) onFill(blank, value.trim());
            setOpen(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setOpen(null);
          }}
        />
      ) : (
        <button key={m.index} type="button" className="ab-blank" onClick={() => (setValue(""), setOpen(m.index))}>
          {blankPrompt(blank)}
        </button>
      )
    );
    last = m.index + blank.length;
  }
  if (last < str.length) out.push(str.slice(last));
  return <>{out}</>;
}

const firstSentence = (t, n = 64) => {
  const all = String(t || "").trim();
  let s = all.split(/(?<=[.!?])\s+(?=[A-Z])/)[0];
  if (s.length < 16) s = all; // "Dr. Rank in the clinic" is one sentence
  s = s.replace(/[.]$/, "");
  return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s;
};

// What to shoot, named on the image placeholder.
function shotLabel(k) {
  if (k.format === "video") return `Video: ${firstSentence(k.video?.opening_visual || k.creative_direction || "a short vertical clip", 52)}`;
  return `Photo: ${firstSentence(k.creative_direction || k.creative_type || "a real photo of the business", 52)}`;
}

// "$75 off your first service of $300+" -> "$75 off" big, "your first service of $300+" small.
// Splits at a separator, after a price or percent, or before a joining word. Never mid-phrase.
function badgeParts(text) {
  const t = String(text || "").trim();
  const split = t.split(/\s[·|•–-]\s|:\s|\n/);
  if (split.length > 1) return [split[0], split.slice(1).join(" ")];
  const price = t.match(/^((?:\$|£|€)?\d[\d,.]*%?\+?(?:\s+(?:off|free|only))?)\s+(.+)$/i);
  if (price && price[2].split(/\s+/).length > 1) return [price[1], price[2]];
  const words = t.split(/\s+/);
  if (words.length <= 4) return [t, ""];
  const at = words.findIndex((w, i) => i >= 2 && i <= 4 && /^(for|on|with|at|in|when|your|this|to|and|before|after)$/i.test(w));
  if (at > 0) return [words.slice(0, at).join(" "), words.slice(at).join(" ")];
  return [t, ""];
}

function proofBadges(campaign, k) {
  const proofy = /proof|trust|review|credib|award|social/i.test(`${k.creative_type || ""} ${k.angle || ""} ${k.name || ""}`);
  if (!proofy) return [];
  return String(campaign.proof_text || campaign.credentials_text || "")
    .split(/[,;\n]+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 2);
}

// A realistic Facebook post preview of one ad.
function PostPreview({ campaign, k, n, used }) {
  const fb = (t) => fillBlanks(t, campaign.blank_values);
  const ch = campaign.ad_choices?.[n - 1] || {};
  const isVideo = k.format === "video";
  const caption = formatCaption(fb((ch.version === "medium" ? k.primary_medium : k.primary_short) || "")).replace(BLANK_RE, "…");
  const headline = fb(k.headlines?.[ch.headline ?? 0] || "").replace(BLANK_RE, "…");
  const description = fb(k.descriptions?.[ch.description ?? 0] || "").replace(BLANK_RE, "…");
  const overlay = fb(k.overlay || "").replace(BLANK_RE, "…");
  const badges = proofBadges(campaign, k);
  const [big, small] = badgeParts(overlay);
  const name = displayName(campaign.business_name) || "Business";
  return (
    <div className={cn("mb-preview", !used && "is-off")}>
      <div className="mb-post">
        <div className="mb-post-head">
          <span className="mb-post-avatar">{firstLetter(campaign)}</span>
          <div className="min-w-0">
            <strong>{name}</strong>
            <span>
              Sponsored · <Globe />
            </span>
          </div>
          <More className="mb-post-more" />
        </div>
        <div className="mb-post-text">{caption}</div>
        <div className="mb-photo">
          <ImagePic className="mb-photo-icon" />
          <span className="mb-photo-brand">{name}</span>
          {isVideo ? (
            <>
              <span className="mb-play">
                <Play />
              </span>
              {overlay && <span className="mb-subtitle">{overlay}</span>}
            </>
          ) : badges.length ? (
            <div className="mb-awards">
              {badges.map((b) => (
                <span key={b}>
                  <Star /> {b}
                </span>
              ))}
            </div>
          ) : (
            overlay && (
              <div className="mb-offer-badge">
                <b>{big}</b>
                {small && <span>{small}</span>}
              </div>
            )
          )}
          <span className="mb-shot">
            {isVideo ? <Video /> : <Camera />} {shotLabel(k)}
          </span>
        </div>
        <div className="mb-linkbar">
          <div className="min-w-0">
            <small>{(domainOf(campaign.cta_url || campaign.website) || "theirwebsite.com").toUpperCase()}</small>
            <strong>{headline}</strong>
            {description && <span>{description}</span>}
          </div>
          <span className="mb-linkbar-btn">{k.cta || "Learn more"}</span>
        </div>
        <div className="mb-post-actions">
          <span>
            <ThumbUp /> Like
          </span>
          <span>
            <Comment /> Comment
          </span>
          <span>
            <Share /> Share
          </span>
        </div>
      </div>
      {!used && <p className="mb-off-note">This ad is off. It won't be in the campaign.</p>}
    </div>
  );
}

function CopyTool({ text }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className="mb-tool" onClick={copy}>
      {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
    </button>
  );
}

// One piece of ad copy she can edit by hand (free) or rewrite with AI (one small call).
export function CopyField({ label, head, value, edited, multiline, onSave, onReset, onRewrite, onFill, options, copy, note }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [menu, setMenu] = useState(false);
  const [own, setOwn] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const startEdit = () => {
    setDraft(value);
    setEditing(true);
    setMenu(false);
  };
  const save = () => {
    const t = draft.trim();
    if (t && t !== value) onSave(t);
    setEditing(false);
  };
  const rewrite = async (how) => {
    setMenu(false);
    setBusy(true);
    setErr("");
    try {
      await onRewrite(how);
      setOwn("");
    } catch (e) {
      setErr("That didn't work. Try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={cn("mb-field", editing && "is-editing")}>
      <div className="ab-field-head">
        <span className="ab-field-label">{label}</span>
        {head}
        <span className="mb-field-tools">
          {edited && !editing && (
            <>
              <span className="mb-edited">Edited</span>
              <button type="button" className="lp-link" onClick={onReset}>
                Reset
              </button>
            </>
          )}
          {options && options.list.length > 1 && !editing && (
            <button type="button" className="lp-link" onClick={() => setShowOptions((v) => !v)} aria-expanded={showOptions}>
              {showOptions ? "Done" : `${options.list.length - 1} more`}
            </button>
          )}
          {copy && !editing && <CopyTool text={value} />}
          {!editing && (
            <>
              <button type="button" className="mb-tool" onClick={startEdit} aria-label={`Edit the ${label.toLowerCase()}`}>
                <Pencil /> Edit
              </button>
              <button type="button" className="mb-tool" onClick={() => setMenu((v) => !v)} aria-expanded={menu} disabled={busy}>
                <Wand /> {busy ? "Rewriting..." : "Rewrite"}
              </button>
            </>
          )}
        </span>
      </div>
      {menu && (
        <div className="mb-rewrite">
          {REWRITE_OPTIONS.map((o) => (
            <button key={o.id} type="button" onClick={() => rewrite(o.ask)}>
              {o.label}
            </button>
          ))}
          <form
            className="mb-rewrite-own"
            onSubmit={(e) => {
              e.preventDefault();
              if (own.trim()) rewrite(own.trim());
            }}
          >
            <input className="input" value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Or say how: mention the free consult" aria-label="How to rewrite it" />
            <button type="submit" className="lp-link" disabled={!own.trim()}>
              Rewrite
            </button>
          </form>
        </div>
      )}
      {editing ? (
        <div className="mb-edit">
          <textarea
            className="textarea"
            rows={multiline ? Math.min(12, Math.max(4, draft.split("\n").length + 1)) : 2}
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setEditing(false);
              if (e.key === "Enter" && !multiline) (e.preventDefault(), save());
            }}
          />
          <div className="mb-edit-actions">
            <button type="button" className="lp-btn lp-btn-sm" onClick={save}>
              Save
            </button>
            <button type="button" className="lp-link" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={cn("ab-field-value", multiline && "ab-primary", busy && "is-busy")}>
          <Fillable text={value} onFill={onFill} />
        </div>
      )}
      {note && !editing && <p className="mb-field-note">{note}</p>}
      {err && <p className="lp-error">{err}</p>}
      {options && showOptions && !editing && (
        <ul className="ab-field-options">
          {options.list.map((o, i) => (
            <li key={i}>
              <button type="button" aria-pressed={i === options.selected} onClick={() => options.onPick(i)}>
                <Fillable text={o} onFill={onFill} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// "Voice": rewrite every piece of one ad in a new voice (one AI call), or go back to the original.
function VoicePicker({ current, onPick, onReset }) {
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const pick = async (v) => {
    setBusy(v.label);
    setErr("");
    try {
      await onPick(v);
    } catch {
      setErr("That didn't work. Try again.");
    } finally {
      setBusy("");
    }
  };
  return (
    <div className="mb-voice">
      <span className="ab-field-label">Voice</span>
      <div className="mb-voice-list" role="radiogroup" aria-label="Voice">
        <button type="button" role="radio" aria-checked={!current} onClick={onReset} disabled={!!busy}>
          Original
        </button>
        {VOICES.map((v) => (
          <button key={v.id} type="button" role="radio" aria-checked={current === v.id} onClick={() => pick(v)} disabled={!!busy}>
            {busy === v.label ? "Rewriting..." : v.label}
          </button>
        ))}
      </div>
      {err && <p className="lp-error">{err}</p>}
    </div>
  );
}

// The selected ad's copy and the night "Make this ad" box, beside its preview.
function AdDetail({ campaign, k, n, onChoice, onFill }) {
  const ch = campaign.ad_choices?.[n - 1] || {};
  const fb = (t) => fillBlanks(t, campaign.blank_values);
  const version = ch.version || "short";
  const isVideo = k.format === "video";
  const [showPrompt, setShowPrompt] = useState(false);
  const edits = ch.edits || {};
  const orig = originalConcepts(campaign)[n - 1] || k;
  const hi = Math.min(ch.headline ?? 0, Math.max(0, k.headlines.length - 1));
  const di = Math.min(ch.description ?? 0, Math.max(0, k.descriptions.length - 1));
  const primaryKey = version === "medium" ? "primary_medium" : "primary_short";
  const saveEdit = (key, text) => onChoice(n - 1, { edits: { ...edits, [key]: text } });
  const resetEdit = (key) => {
    const next = { ...edits };
    delete next[key];
    onChoice(n - 1, { edits: next });
  };
  const field = (key, value) => ({
    value,
    edited: typeof edits[key] === "string",
    onFill,
    onSave: (t) => saveEdit(key, t),
    onReset: () => resetEdit(key),
    onRewrite: async (how) => {
      const r = await callAI(buildRewriteCall(campaign, k, key, value, how));
      const t = finalizeRewrite(r, key);
      if (!t) throw new Error("empty");
      saveEdit(key, t);
    },
  });
  const changeVoice = async (voice) => {
    const r = await callAI(buildVoiceCall(campaign, orig, voice));
    const next = voiceEdits(r, orig);
    if (!Object.keys(next).length) throw new Error("empty");
    onChoice(n - 1, { edits: next, voice: voice.id });
  };
  return (
    <div className="mb-detail">
      <div className="mb-detail-head">
        <h3>{k.name}</h3>
        {k.angle && (
          <p>
            <strong>Angle:</strong> {k.angle}
          </p>
        )}
        {k.why && (
          <p>
            <strong>Why:</strong> {k.why}
          </p>
        )}
      </div>
      <div className="mb-detail-stack">
        <div>
          <VoicePicker current={ch.voice} onPick={changeVoice} onReset={() => onChoice(n - 1, { edits: {}, voice: undefined })} />
          <div className="mb-fields">
            <CopyField
              label="Primary text"
              multiline
              head={
                <span className="mb-seg mb-seg-sm" role="tablist" aria-label="Primary text length">
                  {["short", "medium"].map((v) => (
                    <button key={v} type="button" role="tab" aria-selected={version === v} onClick={() => onChoice(n - 1, { version: v })}>
                      {v === "short" ? "Short" : "Medium"}
                    </button>
                  ))}
                </span>
              }
              {...field(primaryKey, formatCaption(fb(version === "medium" ? k.primary_medium : k.primary_short)))}
            />
            <CopyField
              label="Headline"
              {...field(`headline_${hi}`, fb(k.headlines[hi] || ""))}
              options={{ list: k.headlines.map(fb), selected: hi, onPick: (i) => onChoice(n - 1, { headline: i }) }}
            />
            <CopyField
              label="Description"
              {...field(`description_${di}`, fb(k.descriptions[di] || ""))}
              options={{ list: k.descriptions.map(fb), selected: di, onPick: (i) => onChoice(n - 1, { description: i }) }}
            />
            {k.overlay && <CopyField label={isVideo ? "Text on screen" : "Text on image"} {...field("overlay", fb(k.overlay))} />}
            <div className="mb-field">
              <span className="ab-field-label">Button</span>
              <div className="ab-field-value">
                {k.cta}
                {k.cta_why && <span className="ab-muted"> · {k.cta_why}</span>}
              </div>
            </div>
            {isVideo && k.video && (
              <div className="mb-field">
                <span className="ab-field-label">Script{k.video.duration ? ` · ${k.video.duration}` : ""}</span>
                <div className="ab-field-value ab-script">
                  {k.video.hook && (
                    <p>
                      <strong>Hook:</strong> {fb(k.video.hook)}
                    </p>
                  )}
                  {k.video.body && (
                    <p>
                      <strong>Body:</strong> {fb(k.video.body)}
                    </p>
                  )}
                  {k.video.cta && (
                    <p>
                      <strong>CTA:</strong> {fb(k.video.cta)}
                    </p>
                  )}
                  {k.video.shots?.length > 0 && (
                    <ol>
                      {k.video.shots.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-action">
          <div className="mb-action-label">Make this ad</div>
          <ol className="mb-action-steps">
            <li>
              <strong>Copy the ad copy</strong>
              <p>Text, headline, description and button, ready for Meta.</p>
              <CopyBtn cream text={fb(conceptCopy(campaign, k, n - 1))} label="Copy ad copy" />
            </li>
            {isVideo ? (
              <li>
                <strong>Create the video</strong>
                <p>Make the first frame, then animate it. Use ChatGPT, Freepik or any image or video generator you already have. Or film it on a phone with the script.</p>
                <div className="mb-action-row">
                  <CopyBtn cream text={k.image_prompt} label="Copy image prompt" />
                  <CopyBtn cream text={k.motion_prompt} label="Copy video prompt" />
                </div>
              </li>
            ) : (
              <li>
                <strong>Create the ad image</strong>
                <p>Paste it into ChatGPT, which makes the finished image. Upload their logo or a screenshot of their website first so it matches their brand. Text-only design? Claude works too.</p>
                <div className="mb-action-row">
                  <CopyBtn cream text={fb(imagePromptFor(k))} label="Copy image prompt" />
                  <a className="lp-link" href="https://chatgpt.com/" target="_blank" rel="noreferrer">
                    Open ChatGPT <ExternalLink />
                  </a>
                </div>
                <div className="mb-action-links">
                  {k.image_prompt && <CopyLink text={k.image_prompt} label="Just want the photo? Copy a photo prompt" />}
                  <button type="button" className="lp-link mb-dim" onClick={() => setShowPrompt((v) => !v)} aria-expanded={showPrompt}>
                    {showPrompt ? "Hide the prompt" : "See the prompt"}
                  </button>
                </div>
                {showPrompt && <pre className="mb-pre">{fb(imagePromptFor(k))}</pre>}
              </li>
            )}
          </ol>
          <div className="mb-action-foot">
            <CopyLink text={moreVersionsPrompt(campaign, k)} label="Make more versions" />
            <span> · 6 new versions with the same offer and angle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdsStep({ campaign, building, error, onToggle, onChoice, onFill, onBack, onNext, onRebuild }) {
  const list = concepts(campaign);
  const off = new Set(campaign.ads_off || []);
  const [sel, setSel] = useState(0);
  const current = Math.min(sel, Math.max(0, list.length - 1));
  const using = list.filter((_, i) => !off.has(i)).length;
  return (
    <section className="lp-card">
      <div className="lp-body">
        <h2 className="ab-title">Here are the ads I'd run</h2>
        {building ? (
          <div className="ab-building">
            <i /> Writing your ads for {displayName(campaign.business_name)}. This takes about a minute.
          </div>
        ) : !list.length ? (
          <p className="lp-p">{campaign.record ? "This campaign was built with the older version. Press Rebuild my ads to get the new ones. Your Plan answers stay." : "Answer the questions in Plan, then press Build my campaign."}</p>
        ) : (
          <>
            <p className="mb-intro">{list.length === 3 ? "Three" : list.length} ads, each with a different angle. Pick one to see it, its copy and how to make it. Switch off any you don't want to run.</p>
            <div className="mb-tabs" role="tablist" aria-label="Your ads">
              {list.map((k, i) => (
                <div key={`${i}-${k.name}`} className={cn("mb-tab", i === current && "is-current", off.has(i) && "is-off")}>
                  <button type="button" role="tab" aria-selected={i === current} onClick={() => setSel(i)}>
                    <span className="mb-tab-num">Ad {i + 1}</span>
                    <span className="mb-tab-name">{k.name}</span>
                    <span className="mb-tab-angle">{k.creative_type || firstSentence(k.angle, 40)}</span>
                  </button>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!off.has(i)}
                    aria-label={off.has(i) ? `Turn ad ${i + 1} on` : `Turn ad ${i + 1} off`}
                    className="mb-switch"
                    onClick={() => onToggle(i)}
                  >
                    <i />
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-stage">
              <PostPreview campaign={campaign} k={list[current]} n={current + 1} used={!off.has(current)} />
              <AdDetail key={current} campaign={campaign} k={list[current]} n={current + 1} onChoice={onChoice} onFill={onFill} />
            </div>
          </>
        )}
        {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
      </div>
      <Foot onBack={onBack} left={list.length ? `${using} ${using === 1 ? "ad" : "ads"} in the campaign` : ""}>
        {list.length || building ? (
          <button type="button" className="lp-btn" onClick={onNext} disabled={building || !using}>
            Next: the funnel →
          </button>
        ) : campaign.record ? (
          <button type="button" className="lp-btn" onClick={onRebuild}>
            Rebuild my ads →
          </button>
        ) : (
          <button type="button" className="lp-btn" onClick={onBack}>
            Go to Plan →
          </button>
        )}
      </Foot>
    </section>
  );
}

// ---------- 3. Funnel ----------
function splitBenefit(b) {
  const t = String(b || "");
  const m = t.match(/^(.{3,60}?)(?::|\s[–-]\s|\.\s)(.+)$/);
  return m ? [m[1].trim(), m[2].trim()] : [t, ""];
}

// The landing page, drawn from the page copy we wrote, in a browser frame.
function LandingMock({ campaign, page, phone }) {
  const name = displayName(campaign.business_name) || "Business";
  const domain = domainOf(campaign.cta_url || campaign.website) || "theirwebsite.com";
  const proof = String(campaign.proof_text || "").trim();
  const rated = /star|rating|review|★/i.test(proof);
  return (
    <div className={cn("mb-browser", phone && "is-phone")}>
      <div className="mb-browser-bar">
        <i />
        <i />
        <i />
        <span className="mb-browser-url">{domain}/offer</span>
      </div>
      <div className="mb-lp">
        <div className="mb-lp-nav">
          <span className="mb-lp-logo">{name}</span>
          <span className="mb-lp-pill">{page.cta}</span>
        </div>
        <div className="mb-lp-hero">
          {page.page_type && <div className="mb-lp-eyebrow">{page.page_type}</div>}
          <h3>{page.headline}</h3>
          <p>{page.subheadline}</p>
          <span className="mb-lp-btn">{page.cta}</span>
          {proof && (
            <div className="mb-lp-stars">
              {rated && (
                <span className="mb-lp-star-row">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </span>
              )}
              {proof}
            </div>
          )}
        </div>
        {page.proof?.length > 0 && (
          <div className="mb-lp-proof">
            {page.proof.slice(0, 3).map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        )}
        {page.benefits?.length > 0 && (
          <div className="mb-lp-benefits">
            {page.benefits.slice(0, 3).map((b, i) => {
              const [title, text] = splitBenefit(b);
              return (
                <div key={i}>
                  <span className="mb-lp-num">{i + 1}</span>
                  <strong>{title}</strong>
                  {text && <p>{text}</p>}
                </div>
              );
            })}
          </div>
        )}
        <div className="mb-lp-form">
          <div>
            <h4>{page.cta}</h4>
            <p>{page.process?.[page.process.length - 1] || "Leave your details and we'll be in touch."}</p>
          </div>
          <div className="mb-lp-fields">
            {(page.form_fields?.length ? page.form_fields : ["Full name", "Phone number"]).map((f) => (
              <span key={f}>{f}</span>
            ))}
            <span className="mb-lp-submit">{page.cta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstantFormMock({ campaign, form }) {
  return (
    <div className="ab-phone">
      <div className="ab-phone-head">{displayName(campaign.business_name)}</div>
      <h3>{form.form_headline}</h3>
      <p>{form.intro}</p>
      {form.questions.map((q, i) => (
        <div key={i} className="ab-phone-q">
          <strong>{q.question}</strong>
          {q.options?.length > 0 && (
            <ul>
              {q.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {form.contact_fields.map((f) => (
        <div key={f} className="ab-phone-field">
          {f}
        </div>
      ))}
      <div className="ab-phone-btn">Submit</div>
      <div className="ab-phone-thanks">
        <strong>{form.thank_you_headline}</strong>
        <span>{form.thank_you_text}</span>
      </div>
    </div>
  );
}

export function FunnelStep({ campaign, onChange, onWrite, writing, error, onBack, onNext }) {
  const list = concepts(campaign);
  const type = funnelType(campaign);
  const adIndex = Math.min(campaign.funnel_ad ?? 0, Math.max(0, list.length - 1));
  const form = campaign.funnel?.instant_form;
  const page = campaign.funnel?.landing_page;
  const content = type === "instant_form" ? form : page;
  const [phone, setPhone] = useState(false);
  const [full, setFull] = useState(false);
  const word = type === "instant_form" ? "form" : "page";
  return (
    <section className="lp-card">
      <div className="lp-body">
        <h2 className="ab-title">What happens after they click</h2>
        <p className="mb-intro">Pick where people go when they tap the ad.</p>
        <div className="ab-paths" role="radiogroup" aria-label="Where the ad sends people">
          {[
            { id: "instant_form", name: "Instant Form", text: "They fill out a short form without leaving Facebook or Instagram. Simplest, most leads." },
            { id: "landing_page", name: "Landing page", text: "They go to a page built for this offer, then book, call or buy there." },
          ].map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={type === o.id} className="lp-option" onClick={() => onChange({ funnel_type: o.id })}>
              <span className="lp-radio" />
              <span className="lp-option-body">
                <span className="lp-option-name">{o.name}</span>
                <span className="lp-option-text">{o.text}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="ab-q ab-mt-lg">
          <div className="ab-q-label">Which ad does it follow?</div>
          <div className="mb-follow">
            <select className="select" value={adIndex} onChange={(e) => onChange({ funnel_ad: Number(e.target.value) })} aria-label="Ad this funnel follows" disabled={!list.length}>
              {list.map((k, i) => (
                <option key={i} value={i}>
                  Ad {i + 1}: {k.name}
                </option>
              ))}
            </select>
            <button type="button" className="lp-btn-outline" onClick={() => onWrite(type, adIndex)} disabled={writing || !list.length}>
              {writing ? "Writing..." : content ? `Rewrite my ${word}` : `Write my ${type === "instant_form" ? "Instant Form" : "landing page"}`}
            </button>
          </div>
          <div className="ab-hint">The {word} continues that ad's exact offer and promise.</div>
        </div>
        {error && <p className="lp-error">That didn't work. Try again. ({error})</p>}

        {type === "landing_page" && page && (
          <>
            <LandingMock campaign={campaign} page={page} phone={phone} />
            <div className="mb-under">
              <div className="mb-seg" role="tablist" aria-label="Preview size">
                <button type="button" role="tab" aria-selected={!phone} onClick={() => setPhone(false)}>
                  Desktop
                </button>
                <button type="button" role="tab" aria-selected={phone} onClick={() => setPhone(true)}>
                  Phone
                </button>
              </div>
              <button type="button" className="lp-link" onClick={() => setFull((v) => !v)} aria-expanded={full}>
                {full ? "Hide the full page copy" : "See the full page copy: offer, form and FAQs"}
              </button>
            </div>
            {full && (
              <dl className="lp-defs mb-defs">
                {[
                  ["The offer", page.offer],
                  ["Benefits", page.benefits],
                  ["Proof", page.proof],
                  ["How it works", page.process],
                  ["Form", page.form_fields?.join(", ")],
                ]
                  .filter(([, v]) => (Array.isArray(v) ? v.length : v))
                  .map(([label, v]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{Array.isArray(v) ? <ul className="ab-dd-list">{v.map((x, i) => <li key={i}>{x}</li>)}</ul> : v}</dd>
                    </div>
                  ))}
                {page.faqs?.length > 0 && (
                  <div>
                    <dt>FAQs</dt>
                    <dd>
                      {page.faqs.map((f, i) => (
                        <p key={i} className="ab-faq">
                          <strong>{f.q}</strong> {f.a}
                        </p>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            )}
            <div className="mb-action mb-mt-lg">
              <div className="mb-action-label">Build it</div>
              <h4 className="mb-action-title">Build this landing page</h4>
              <p>Create a new app in Base44, paste this and send. Attach their logo and photos if you have them. When it's built, click Publish at the top right and paste the link below. The form saves every lead to a private page.</p>
              <div className="mb-action-row">
                <CopyBtn cream text={buildFunnelPrompt(campaign, adIndex)} label="Copy landing page prompt" />
                <a className="lp-link" href="https://app.base44.com" target="_blank" rel="noreferrer">
                  Open Base44 <ExternalLink />
                </a>
              </div>
              <label className="mb-action-field">
                <span>
                  The page's link, once it's live <em>Optional</em>
                </span>
                <input className="input" value={campaign.cta_url || ""} onChange={(e) => onChange({ cta_url: e.target.value })} placeholder="https://" />
              </label>
            </div>
          </>
        )}

        {type === "instant_form" && form && (
          <div className="ab-funnel">
            <InstantFormMock campaign={campaign} form={form} />
            <div className="mb-action">
              <div className="mb-action-label">Set it up</div>
              <h4 className="mb-action-title">Build this Instant Form</h4>
              <p>In Meta Business Suite, go to All tools, then Instant Forms, and build it with this. Or let Claude build it for you in Launch.</p>
              {form.privacy_note && (
                <p>
                  <strong>Privacy policy:</strong> {form.privacy_note}
                </p>
              )}
              {form.follow_up && (
                <p>
                  <strong>Follow-up:</strong> {form.follow_up}
                </p>
              )}
              <div className="mb-action-row">
                <CopyBtn cream text={instantFormText(campaign)} label="Copy Instant Form setup" />
              </div>
            </div>
          </div>
        )}

        {!content && list.length > 0 && !writing && (
          <p className="lp-p mb-mt-lg">Press Write my {type === "instant_form" ? "Instant Form" : "landing page"} and we'll write it from the ad you picked.</p>
        )}
      </div>
      <Foot onBack={onBack}>
        <button type="button" className="lp-btn" onClick={onNext} disabled={!list.length}>
          Next: launch →
        </button>
      </Foot>
    </section>
  );
}

// ---------- 4. Launch ----------
const CONNECT_STEPS = [
  { title: "Open Claude Settings", text: "Click your name (bottom left), then Settings.", img: asset("/meta-connect/step1-settings.png"), alt: "Claude's account menu with Settings at the top" },
  { title: "Open Connectors", text: "In the Settings menu, click Connectors.", img: asset("/meta-connect/step2-connectors.png"), alt: "Claude Settings sidebar with Connectors selected" },
  { title: "Add Meta Ads", text: "Search for Meta Ads and click Connect.", img: asset("/meta-connect/step3-connect.png"), alt: "Connectors search for Meta Ads with the Connect button" },
  { title: "Approve your account", text: "Log in with the Facebook account that has the client's ad account.", rows: ["Meta Ads"], ok: true },
];

function StepNum({ n }) {
  return <span className="mb-num">{n}</span>;
}

// Step 2's message to Claude Code, shown like a chat she's about to send. She can edit it; edits are saved.
// The message that builds the campaign, in its own box. She can edit it (saved per version) and copy it.
function LaunchMessage({ campaign, onChange, mode }) {
  const key = mode === "manual" ? "launch_message_manual" : "launch_message";
  const to = mode === "manual" ? "Claude or ChatGPT" : "Claude Code";
  const built = fillBlanks(buildCampaignInstructions(campaign, mode), campaign.blank_values);
  const edited = !!campaign[key] && campaign[key] !== built;
  const text = edited ? campaign[key] : built;
  const [copied, copy] = useCopy(text);
  return (
    <div className="mb-action mb-msg">
      <div className="mb-msg-head">
        <span>Your message to {to}</span>
        {edited && (
          <button type="button" className="lp-link" onClick={() => onChange?.({ [key]: "" })}>
            Undo my changes
          </button>
        )}
      </div>
      <textarea className="mb-msg-box" value={text} onChange={(e) => onChange?.({ [key]: e.target.value })} spellCheck aria-label={`Your message to ${to}`} />
      <div className="mb-msg-foot">
        <button type="button" className="mb-btn-cream" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? `Copied. Paste it into ${to}` : "Copy"}
        </button>
        <a className="lp-link" href={mode === "manual" ? "https://claude.ai/new" : "https://claude.ai/code"} target="_blank" rel="noreferrer">
          {mode === "manual" ? "Open Claude" : "Open Claude Code"} <ExternalLink />
        </a>
      </div>
    </div>
  );
}

function ReviewStep({ campaign, n }) {
  return (
    <div className="mb-launch-step mb-launch-last">
      <StepNum n={n} />
      <div className="mb-launch-body">
        <div className="mb-launch-head">
          <div>
            <h3>Review and publish</h3>
            <p>Check everything before it goes live, then press Publish in Meta.</p>
          </div>
        </div>
        <ol className="mb-checklist">
          {launchChecklist(campaign).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function LaunchStep({ campaign, onChange, onBack, onDone }) {
  const [connected, setConnected] = useState(() => {
    try {
      return localStorage.getItem("sf-meta-connected") === "yes";
    } catch {
      return false;
    }
  });
  const markConnected = () => {
    setConnected(true);
    try {
      localStorage.setItem("sf-meta-connected", "yes");
    } catch {
      /* storage unavailable */
    }
  };
  const mode = campaign.launch_mode === "manual" ? "manual" : "connector";
  const launched = !!campaign.launched_at;
  const destination = funnelType(campaign) === "instant_form" ? "the Instant Form" : "the landing page";
  const count = concepts(campaign).filter((_, i) => !(campaign.ads_off || []).includes(i)).length;
  const what = `the objective, budget, location, audience, your ${count || 3} ads and ${destination}`;
  return (
    <section className="lp-card">
      <div className="lp-body">
        <h2 className="ab-title">Launch ads in Meta</h2>
        <p className="mb-intro">Everything is built paused, so nothing goes live until you approve it.</p>

        <div className="ab-paths" role="radiogroup" aria-label="How you'll build it">
          {[
            { id: "connector", name: "Claude Code builds it", text: "Connect Meta to Claude Code once. It builds the whole campaign in the ad account for you." },
            { id: "manual", name: "I'll build it in Ads Manager", text: "Claude or ChatGPT walks you through Meta Ads Manager, one click at a time." },
          ].map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={mode === o.id} className="lp-option" onClick={() => onChange?.({ launch_mode: o.id })}>
              <span className="lp-radio" />
              <span className="lp-option-body">
                <span className="lp-option-name">{o.name}</span>
                <span className="lp-option-text">{o.text}</span>
              </span>
            </button>
          ))}
        </div>

        {mode === "connector" ? (
          <>
            <div className="mb-launch-step">
              <StepNum n={1} />
              <div className="mb-launch-body">
                <div className="mb-launch-head">
                  <div>
                    <h3>Connect Meta to Claude Code</h3>
                    <p>{connected ? "" : "Once, then it works for every client. About 2 minutes."}</p>
                  </div>
                  {connected ? (
                    <button type="button" className="lp-link" onClick={() => setConnected(false)}>
                      Show the steps again
                    </button>
                  ) : (
                    <button type="button" className="lp-link" onClick={markConnected}>
                      Already connected? Skip
                    </button>
                  )}
                </div>
                {connected ? (
                  <p className="lp-ok">
                    <Check /> You're connected.
                  </p>
                ) : (
                  <div className="mb-connect">
                    {CONNECT_STEPS.map((s, i) => (
                      <div key={s.title} className="mb-connect-card">
                        <span className="mb-connect-n">{i + 1}</span>
                        <h4>{s.title}</h4>
                        <p>{s.text}</p>
                        {s.img ? (
                          <div className="mb-connect-shot">
                            <img src={s.img} alt={s.alt} loading="lazy" />
                          </div>
                        ) : (
                          <div className="mb-connect-rows" aria-hidden="true">
                            {s.rows.map((r, j) => (
                              <span key={r} className={cn(j === s.hit && "is-hit")}>
                                {r}
                                {s.ok && <em>Connected</em>}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-launch-step mb-launch-last">
              <StepNum n={2} />
              <div className="mb-launch-body">
                <div className="mb-launch-head">
                  <div>
                    <h3>Build your campaign inside Claude Code</h3>
                    <p>This is the message for Claude Code. It has everything: {what}. Change anything you want, then copy it into Claude Code.</p>
                  </div>
                </div>
                <LaunchMessage campaign={campaign} onChange={onChange} mode="connector" />
              </div>
            </div>

            <ReviewStep campaign={campaign} n={3} />
          </>
        ) : (
          <>
            <div className="mb-launch-step">
              <StepNum n={1} />
              <div className="mb-launch-body">
                <div className="mb-launch-head">
                  <div>
                    <h3>Build your campaign in Meta Ads Manager</h3>
                    <p>This is the message for Claude or ChatGPT. It has everything: {what}. Paste it in, open Meta Ads Manager next to it, and it tells you exactly what to click, one step at a time.</p>
                  </div>
                </div>
                <LaunchMessage campaign={campaign} onChange={onChange} mode="manual" />
              </div>
            </div>

            <ReviewStep campaign={campaign} n={2} />
          </>
        )}
      </div>
      <Foot onBack={onBack}>
        {launched ? (
          <span className="lp-sent">
            <Check /> Launched {new Date(campaign.launched_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        ) : (
          <button type="button" className="lp-btn" onClick={onDone}>
            Done →
          </button>
        )}
      </Foot>
    </section>
  );
}
