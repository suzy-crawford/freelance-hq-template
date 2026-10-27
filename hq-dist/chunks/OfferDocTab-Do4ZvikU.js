var e=`import React from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/CopyButton";
import InfoTip from "@/components/shared/InfoTip";
import EditableText from "@/components/offer/result/EditableText";
import { DOC_STYLES } from "@/lib/offerData";
import { getPaperData, paperToText } from "@/lib/offerLogic";
import { cn } from "@/lib/utils";

export default function OfferDocTab({ offer, profile, onOfferUpdate }) {
  const data = getPaperData(offer, profile, offer.paper_overrides);
  const style = DOC_STYLES.find((s) => s.id === offer.paper_style) || DOC_STYLES[0];

  const saveStyle = async (id) => {
    const updated = await base44.entities.Offer.update(offer.id, { paper_style: id });
    onOfferUpdate(updated);
  };

  const saveField = async (key, value) => {
    const overrides = { ...(offer.paper_overrides || {}), [key]: value };
    const updated = await base44.entities.Offer.update(offer.id, { paper_overrides: overrides });
    onOfferUpdate(updated);
  };

  const docStyle = {
    backgroundColor: style.bg,
    color: style.text,
    fontFamily: \`"\${style.bodyFont}", Inter, sans-serif\`,
  };
  const headingFont = { fontFamily: \`"\${style.headingFont}", Georgia, serif\` };
  const muted = { color: style.muted };
  const accent = { color: style.accent };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-app-text">Your offer doc</h2>
      <p className="text-app-muted text-sm mt-1 max-w-[620px]">
        Your one-page offer. Share it, attach it to an email, or show it when someone asks what you offer.
      </p>

      <div className="sticky top-0 z-10 mt-4 -mx-5 px-5 py-3 bg-app-bg border-b border-app-border flex flex-wrap items-center gap-2">
        <Button
          onClick={() => window.print()}
          className="rounded-full h-11 px-5 bg-app-primary text-app-on-primary hover:bg-app-text"
        >
          Save as PDF
        </Button>
        <CopyButton text={paperToText(data)} label="Copy text" />
        <InfoTip text="Choose 'Save as PDF' as the printer." />
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium text-app-muted mb-2">Style</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DOC_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => saveStyle(s.id)}
              className={cn(
                "rounded-xl border-2 p-3 text-left transition-colors",
                style.id === s.id ? "border-app-primary" : "border-app-border hover:border-app-text"
              )}
            >
              <div className="flex gap-2 mb-2">
                <span className="w-5 h-5 rounded-full border border-app-border" style={{ backgroundColor: s.bg }} />
                <span className="w-5 h-5 rounded-full border border-app-border" style={{ backgroundColor: s.accent }} />
              </div>
              <div className="text-sm font-medium text-app-text">{s.name}</div>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-app-muted mt-5">
        Click any text to edit it. Prices and what's included come from your offer.
      </p>

      <div className="mt-3 overflow-x-auto">
        <div
          className="print-area mx-auto rounded-lg border border-app-border shadow-sm"
          style={{ ...docStyle, width: "100%", maxWidth: 680, minHeight: 880, padding: "48px 44px" }}
        >
          <EditableText
            value={data.freelancer_name}
            placeholder="Your name"
            onSave={(v) => saveField("freelancer_name", v)}
            as="div"
            className="text-xs uppercase tracking-widest"
            style={muted}
          />
          <EditableText
            value={data.offer_name}
            placeholder="Your offer name"
            onSave={(v) => saveField("offer_name", v)}
            as="h1"
            className="text-3xl font-bold mt-3 leading-tight"
            style={headingFont}
          />
          <EditableText
            value={data.tagline}
            placeholder="Add a tagline"
            onSave={(v) => saveField("tagline", v)}
            as="p"
            className="italic mt-2 text-lg"
            style={muted}
          />

          <div className="mt-6">
            <EditableText
              value={data.who_its_for}
              placeholder="Who is this for?"
              onSave={(v) => saveField("who_its_for", v)}
              as="p"
              className="font-semibold"
            />
            <EditableText
              value={data.description}
              placeholder="Describe your offer"
              onSave={(v) => saveField("description", v)}
              as="p"
              multiline
              className="mt-2 leading-relaxed"
            />
          </div>

          <div className="mt-7">
            <div className="text-xs uppercase tracking-widest font-semibold" style={accent}>
              What's included
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {data.categories.map((c, i) => (
                <div key={i}>
                  <div className="text-xs font-semibold uppercase tracking-wide" style={accent}>
                    {c.name}
                  </div>
                  <ul className="mt-1.5 space-y-1 text-sm">
                    {(c.items || []).map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <div className="text-xs uppercase tracking-widest font-semibold" style={accent}>
              Investment
            </div>
            <div className="text-3xl font-bold mt-1" style={{ ...accent, ...headingFont }}>
              {data.price}
            </div>
            {data.price_note ? (
              <div className="text-xs mt-1" style={muted}>
                {data.price_note}
              </div>
            ) : null}
          </div>

          <div className="mt-8 pt-4" style={{ borderTop: \`1px solid \${style.rule}\` }}>
            <EditableText
              value={data.next_step}
              placeholder="Add a next step"
              onSave={(v) => saveField("next_step", v)}
              as="p"
              className="text-sm leading-relaxed"
            />
            <div className="mt-3 text-sm">
              <EditableText
                value={data.freelancer_name}
                placeholder="Your name"
                onSave={(v) => saveField("freelancer_name", v)}
                as="span"
                className="font-semibold"
              />
              <span style={muted}> | </span>
              <EditableText
                value={data.contact}
                placeholder="Add your email or Instagram"
                onSave={(v) => saveField("contact", v)}
                as="span"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;export{e as default};