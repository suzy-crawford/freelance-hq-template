import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Refresh } from "@/components/brand/icons";
import {
  BUSINESS_TYPES,
  GOALS,
  BUDGET_PRESETS,
  ASSET_OPTIONS,
  PRACTICE_BUSINESS,
  formatMoney,
} from "@/lib/adsData";
import { getNiche, cplText, cplSourceText } from "@/lib/adsNiches";

const STEPS = [
  { n: 1, label: "Business" },
  { n: 2, label: "Advertising" },
  { n: 3, label: "Details" },
];

const LEAD_TYPE_MAP = { "Med spas": "health_beauty", Dentists: "health_beauty", Chiropractors: "health_beauty", Salons: "health_beauty" };

// Questions in sentence case; "(optional)" in a label shows as a muted "Optional".
function Field({ label, hint, htmlFor, children }) {
  const optional = /\s*\(optional\)\s*$/i.test(label);
  const text = label.replace(/\s*\(optional\)\s*$/i, "");
  const Tag = htmlFor ? "label" : "span";
  return (
    <div className="field field-q">
      <Tag htmlFor={htmlFor} className={htmlFor ? undefined : "label"}>
        {text}
        {optional && <span className="optional"> Optional</span>}
      </Tag>
      {children}
      {hint && <span className="note">{hint}</span>}
    </div>
  );
}

function OptionList({ options, value, onChange, name }) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "text-left rounded-sm border px-3 py-2.5 bg-app-raised",
            value === o.id ? "border-app-primary ring-1 ring-app-primary" : "border-app-border"
          )}
        >
          <div className="text-sm font-semibold text-app-text">{o.label}</div>
          {o.description && <div className="hint mt-0.5">{o.description}</div>}
        </button>
      ))}
    </div>
  );
}

export default function InputsPanel({ campaign, onChange, onBuild, building, canBuild, onHide }) {
  const [prospects, setProspects] = useState([]);
  const [customOpen, setCustomOpen] = useState(false);
  const step = campaign.step || 1;
  const isPreset = BUDGET_PRESETS.includes(Number(campaign.monthly_budget));
  const customOn = !campaign.budget_unsure && (customOpen || (campaign.monthly_budget != null && campaign.monthly_budget !== "" && !isPreset));

  useEffect(() => {
    base44.entities.Prospect.filter({}, { sort: "-updated_date", limit: 500 })
      .then(({ items }) => setProspects(items || []))
      .catch(() => {});
  }, []);

  const set = (updates) => onChange(updates);

  const pickSource = (source) => {
    if (source === "practice") set({ business_source: "practice", prospect_id: "", ...PRACTICE_BUSINESS });
    else set({ business_source: source, prospect_id: "" });
  };

  const pickProspect = (id) => {
    const p = prospects.find((x) => x.id === id);
    if (!p) return set({ prospect_id: "" });
    set({
      prospect_id: p.id,
      business_name: p.name,
      website: p.website || "",
      location: p.location || "",
      business_type: LEAD_TYPE_MAP[p.business_type] || (/(spa|dent|chiro|clinic|salon|aesthetic)/i.test(p.business_type) ? "health_beauty" : "local"),
    });
  };

  const step1Done = campaign.business_name && campaign.business_type;
  const step2Done = campaign.product && campaign.goal;

  return (
    <section className="guided-form">
      <div className="stepper">
        <div className="stepper-top">
          <span>
            Step {step} of {STEPS.length} · <strong>{STEPS[step - 1].label}</strong>
          </span>
          {onHide && (
            <button type="button" className="bg-transparent text-[13px] text-app-muted" style={{ borderBottom: "1px solid var(--a-line-strong)" }} onClick={onHide}>
              Hide questions
            </button>
          )}
          <span className="progress-dots" aria-hidden="true">
            {STEPS.map((st) => (
              <i key={st.n} className={st.n < step ? "done" : st.n === step ? "now" : ""} />
            ))}
          </span>
        </div>
        <nav className="stepper-links" aria-label="Steps">
          {STEPS.map((st) => (
            <a
              key={st.n}
              href={`#step-${st.n}`}
              aria-current={step === st.n ? "step" : undefined}
              onClick={(e) => {
                e.preventDefault();
                set({ step: st.n });
              }}
            >
              {st.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-5">
        {step === 1 && (
          <>
            <Field label="Who are we creating ads for?">
              <div className="choice">
                {[
                  { id: "lead", label: "My lead list" },
                  { id: "new", label: "New business" },
                  { id: "practice", label: "Practice" },
                ].map((o) => (
                  <button key={o.id} type="button" aria-pressed={campaign.business_source === o.id} onClick={() => pickSource(o.id)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </Field>
            {campaign.business_source === "lead" && (
              <Field label="Pick a business" htmlFor="ad-lead" hint={prospects.length ? "" : "Your lead list is empty. Save businesses in Client Finder first."}>
                <select id="ad-lead" className="select" value={campaign.prospect_id || ""} onChange={(e) => pickProspect(e.target.value)}>
                  <option value="">Choose from your lead list</option>
                  {prospects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </Field>
            )}
            {campaign.business_source === "practice" && (
              <p className="hint">This is a made-up business so you can practice. Change anything you like.</p>
            )}
            <Field label="Business name" htmlFor="ad-name">
              <Input id="ad-name" value={campaign.business_name || ""} onChange={(e) => set({ business_name: e.target.value })} />
            </Field>
            <Field label="What type of business is it?">
              <OptionList name="Business type" options={BUSINESS_TYPES} value={campaign.business_type} onChange={(v) => set({ business_type: v })} />
            </Field>
            <Field label="Website (optional)" htmlFor="ad-web" hint="If they have one, we read it so the ads use real details.">
              <Input id="ad-web" value={campaign.website || ""} onChange={(e) => set({ website: e.target.value })} placeholder="https://" />
            </Field>
            <Field label="Tell us a little about the business" htmlFor="ad-desc" hint="Most helpful if there's no website.">
              <Textarea id="ad-desc" value={campaign.business_description || ""} onChange={(e) => set({ business_description: e.target.value })} />
            </Field>
            <div className="form-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => set({ step: 2 })} disabled={!step1Done}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="What product or service are we promoting?" htmlFor="ad-product">
              <Input
                id="ad-product"
                value={campaign.product || ""}
                onChange={(e) => set({ product: e.target.value })}
                placeholder="For example: laser hair removal"
              />
            </Field>
            <Field label="Is there a specific offer?" htmlFor="ad-offer">
              <Textarea
                id="ad-offer"
                value={campaign.offer_text || ""}
                onChange={(e) => set({ offer_text: e.target.value, offer_help: false })}
                placeholder="For example: free consultation, or 20% off your first visit"
                disabled={campaign.offer_help}
              />
              <label className="flex items-center gap-2 text-sm text-app-text mt-1">
                <input
                  type="checkbox"
                  checked={!!campaign.offer_help}
                  onChange={(e) => set({ offer_help: e.target.checked })}
                  style={{ accentColor: "var(--color-primary)" }}
                />
                Help me figure this out
              </label>
            </Field>
            <Field label="What should someone do after seeing the ad?">
              <OptionList name="Goal" options={GOALS} value={campaign.goal} onChange={(v) => set({ goal: v })} />
            </Field>
            <div className="form-actions">
              <button type="button" className="btn btn-quiet btn-lg" onClick={() => set({ step: 1 })}>
                Back
              </button>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => set({ step: 3 })} disabled={!step2Done}>
                Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <Field label="Where does the business serve customers?" htmlFor="ad-loc">
              <Input id="ad-loc" value={campaign.location || ""} onChange={(e) => set({ location: e.target.value })} placeholder="For example: Austin, TX" />
            </Field>
            <Field
              label="About how much will they spend on ads each month?"
              hint={(() => {
                const niche = getNiche(campaign);
                const base = "This is what the business pays Meta, not your fee.";
                if (!niche.budget) return base;
                const [lo, hi] = niche.budget;
                return `${base} Typical for ${niche.label.toLowerCase()}: $${lo} to $${hi} a day, about ${formatMoney(lo * 30.4)} to ${formatMoney(hi * 30.4)} a month.`;
              })()}
            >
              <div className="choice">
                {BUDGET_PRESETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={!campaign.budget_unsure && !customOn && Number(campaign.monthly_budget) === b}
                    onClick={() => {
                      setCustomOpen(false);
                      set({ monthly_budget: b, budget_unsure: false });
                    }}
                  >
                    {formatMoney(b)}
                  </button>
                ))}
                <button
                  type="button"
                  aria-pressed={customOn}
                  onClick={() => {
                    setCustomOpen(true);
                    set({ budget_unsure: false });
                  }}
                >
                  Custom
                </button>
                <button
                  type="button"
                  aria-pressed={!!campaign.budget_unsure}
                  onClick={() => {
                    setCustomOpen(false);
                    set({ budget_unsure: true });
                  }}
                >
                  Not sure yet
                </button>
              </div>
              {customOn && (
                <Input
                  type="number"
                  min="0"
                  value={campaign.monthly_budget ?? ""}
                  onChange={(e) => set({ monthly_budget: e.target.value === "" ? null : Number(e.target.value), budget_unsure: false })}
                  placeholder="Amount per month"
                  className="mt-2"
                  aria-label="Monthly ad budget"
                  autoFocus
                />
              )}
            </Field>
            <Field label="Add emojis to the ads?" hint="A few emojis make local ads friendlier and easier to scan.">
              <div className="choice">
                <button type="button" aria-pressed={!campaign.no_emojis} onClick={() => set({ no_emojis: false })}>
                  Yes
                </button>
                <button type="button" aria-pressed={!!campaign.no_emojis} onClick={() => set({ no_emojis: true })}>
                  No
                </button>
              </div>
            </Field>
            <Field label="What photos or videos do they have?">
              <div className="choice">
                {ASSET_OPTIONS.map((a) => (
                  <button key={a.id} type="button" aria-pressed={campaign.assets === a.id} onClick={() => set({ assets: a.id })}>
                    {a.label}
                  </button>
                ))}
              </div>
            </Field>
            {(() => {
              const niche = getNiche(campaign);
              const typical = cplText(niche);
              return (
                <Field
                  label="What's a good cost per lead for them? (optional)"
                  htmlFor="ad-cpl"
                  hint={
                    typical
                      ? `Typical for ${niche.label.toLowerCase()}: ${typical} (${cplSourceText(niche)}). Leave it blank if you're not sure.`
                      : "Leave it blank if you're not sure. The first 2 weeks will tell you."
                  }
                >
                  <Input
                    id="ad-cpl"
                    type="number"
                    min="0"
                    value={campaign.target_cpl ?? ""}
                    onChange={(e) => set({ target_cpl: e.target.value === "" ? null : Number(e.target.value) })}
                    placeholder="For example: 30"
                  />
                </Field>
              );
            })()}
            <Field
              label="Paste a few of their posts or captions (optional)"
              htmlFor="ad-voice"
              hint="From their Instagram, Facebook or website. The ads will sound more like them."
            >
              <Textarea id="ad-voice" value={campaign.voice_samples || ""} onChange={(e) => set({ voice_samples: e.target.value })} />
            </Field>
            <Field label="Anything else we should know? (optional)" htmlFor="ad-notes" hint="Past ads, a customer list, a target cost per lead, anything.">
              <Textarea id="ad-notes" value={campaign.notes || ""} onChange={(e) => set({ notes: e.target.value })} />
            </Field>
            <div className="form-actions">
              <button type="button" className="btn btn-quiet btn-lg" onClick={() => set({ step: 2 })}>
                Back
              </button>
              <button type="button" className="btn btn-primary btn-lg" onClick={onBuild} disabled={!canBuild || building}>
                {campaign.record && !building && <Refresh className="w-4 h-4" />}
                {building ? "Building..." : campaign.record ? "Rebuild my ad strategy" : "Build my ad strategy"}
              </button>
            </div>
            {!canBuild && <p className="hint">Fill in the business, what you're promoting and the goal first.</p>}
          </>
        )}
      </div>
    </section>
  );
}
