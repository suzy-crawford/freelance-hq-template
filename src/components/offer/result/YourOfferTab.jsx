import React from "react";
import { base44 } from "@/api/base44Client";
import SectionCard from "@/components/offer/result/SectionCard";
import PriceCard from "@/components/offer/result/PriceCard";
import { CopyButton } from "@/components/shared/Page";
import RefineIt from "@/components/offer/result/RefineIt";
import { formatMoney, buildPriceExplanation } from "@/lib/libs";
import { cn } from "@/lib/utils";

function joinLines(parts) {
  return parts.filter((p) => p !== undefined && p !== null && p !== "").join("\n");
}

function positioningCopy(pos) {
  return joinLines([
    pos.summary,
    pos.client_thinking ? `"${pos.client_thinking}"` : "",
    "What they don't want:",
    ...(pos.they_dont_want || []).map((t) => `- ${t}`),
    pos.they_need ? `What they need: ${pos.they_need}` : "",
    pos.your_fit,
  ]);
}

function sellingCopy(selling) {
  return joinLines([
    selling.plain_explanation,
    ...(selling.layers || []).map((l) => `${l.name}: ${l.text}`),
    "Ways to say it:",
    ...(selling.i_help || []).map((t) => `- ${t}`),
  ]);
}

function offerCopy(offer, offerRec, pkg) {
  return joinLines([
    offer.selected_name,
    offerRec.statement,
    "What's included:",
    ...(pkg.categories || []).flatMap((c) => [c.name, ...(c.items || []).map((i) => `- ${i}`)]),
    offerRec.method?.name ? `How it works: ${offerRec.method.name}` : "",
    ...(offerRec.method?.steps || []).map((s, i) => `${i + 1}. ${s.name}: ${s.text}`),
    `Price: ${formatMoney(offer.price)} per month`,
  ]);
}

export default function YourOfferTab({ offer, profile, onOfferUpdate, onViewOfferDoc }) {
  const r = offer.record || {};
  const pos = r.positioning || {};
  const selling = r.selling || {};
  const offerRec = r.offer || {};
  const talk = r.talk || {};
  const pkg = offer.package || {};

  const selectName = async (name) => {
    const updated = await base44.entities.Offer.update(offer.id, { selected_name: name });
    onOfferUpdate(updated);
  };

  const talkBlocks = [
    { label: "Bio line", text: talk.bio_line },
    { label: "One-sentence introduction", text: talk.one_sentence },
    { label: "30-second explanation", text: talk.spoken_30s },
    { label: "Explaining your package and price", text: buildPriceExplanation(offer) },
  ].filter((b) => b.text);

  return (
    <div className="mt-6 space-y-5 max-w-[760px]">
      {r.skills_note ? (
        <div className="rounded-lg bg-app-lavender-soft p-5 md:p-6">
          <div className="text-sm font-semibold text-app-text">Before you sell this</div>
          <p className="text-app-muted text-sm mt-1">{r.skills_note}</p>
        </div>
      ) : null}

      <SectionCard number="01" title="Your positioning" copyText={positioningCopy(pos)}>
        {pos.summary && <p className="text-app-text">{pos.summary}</p>}
        {pos.client_thinking && (
          <div className="mt-4">
            <div className="text-sm font-medium text-app-muted">What they're thinking:</div>
            <blockquote className="mt-2 text-xl italic text-app-text border-l-2 border-app-border pl-4">
              {pos.client_thinking}
            </blockquote>
          </div>
        )}
        {(pos.they_dont_want || []).length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium text-app-muted">What they don't want:</div>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-app-text">
              {pos.they_dont_want.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {pos.they_need && (
          <div className="mt-4">
            <div className="text-sm font-medium text-app-muted">What they need:</div>
            <p className="mt-1 text-app-text">{pos.they_need}</p>
          </div>
        )}
        {pos.your_fit && <p className="mt-4 text-app-text">{pos.your_fit}</p>}
      </SectionCard>

      <SectionCard number="02" title="What you're selling" copyText={sellingCopy(selling)}>
        {selling.plain_explanation && <p className="text-app-text">{selling.plain_explanation}</p>}
        {(selling.layers || []).length > 0 && (
          <dl className="mt-5 border-t border-app-border">
            {selling.layers.map((l, i) => (
              <div key={i} className="py-4 border-b border-app-border md:grid md:grid-cols-[180px_1fr] md:gap-6">
                <dt className="sf-eyebrow pt-0.5">{l.name}</dt>
                <dd className="text-app-text mt-1 md:mt-0">{l.text}</dd>
              </div>
            ))}
          </dl>
        )}
        {(selling.i_help || []).length > 0 && (
          <div className="mt-4">
            <div className="sf-eyebrow">Ways to say it</div>
            <ul className="mt-2 border-t border-app-border">
              {selling.i_help.map((t, i) => (
                <li key={i} className="flex items-start justify-between gap-3 py-3 border-b border-app-border">
                  <span className="text-app-text">{t}</span>
                  <CopyButton text={t} label="" className="flex-shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionCard>

      <SectionCard number="03" title="Your offer" copyText={offerCopy(offer, offerRec, pkg)}>
        {(offerRec.name_options || []).length > 0 && (
          <>
            <div className="sf-eyebrow">Pick your offer name</div>
            <div className="mt-2 border-t border-app-border" role="radiogroup" aria-label="Offer name">
              {offerRec.name_options.map((o, i) => (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={offer.selected_name === o.name}
                  onClick={() => selectName(o.name)}
                  className="w-full text-left grid grid-cols-[24px_1fr] gap-3 py-4 border-b border-app-border"
                >
                  <span
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded-sm border-[1.5px] flex items-center justify-center",
                      offer.selected_name === o.name ? "bg-app-primary border-app-primary" : "border-app-border-strong"
                    )}
                  >
                    {offer.selected_name === o.name && <span className="w-2 h-2 bg-app-on-primary rounded-xs" />}
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-tight text-app-text">{o.name}</span>
                    <span className="block text-app-muted text-sm mt-1">{o.why}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {offerRec.statement && <p className="mt-5 text-app-text">{offerRec.statement}</p>}

        {(pkg.categories || []).length > 0 && (
          <div className="mt-5">
            <div className="sf-eyebrow">What's included</div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-app-border">
              {pkg.categories.map((c, i) => (
                <div key={i} className="py-4 border-b border-app-border">
                  <div className="font-semibold text-app-text">{c.name}</div>
                  <ul className="mt-2 list-disc pl-4 space-y-1 text-app-text">
                    {(c.items || []).map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {(pkg.not_included || []).length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-semibold text-app-muted">Not included</div>
                <ul className="mt-1 list-disc pl-4 space-y-0.5 text-app-muted text-sm">
                  {pkg.not_included.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {(offerRec.method?.steps || []).length > 0 && (
          <div className="mt-5">
            <div className="sf-eyebrow">How it works</div>
            <div className="font-display text-xl text-app-text mt-1">{offerRec.method.name}</div>
            <ol className="mt-3 border-t border-app-border">
              {offerRec.method.steps.map((s, i) => (
                <li key={i} className="flex gap-4 py-3 border-b border-app-border">
                  <span className="font-display text-xl leading-none text-app-muted w-5 flex-shrink-0 pt-0.5">{i + 1}</span>
                  <div>
                    <span className="font-medium text-app-text">{s.name}: </span>
                    <span className="text-app-text">{s.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <PriceCard offer={offer} onOfferUpdate={onOfferUpdate} />
      </SectionCard>

      <SectionCard number="04" title="How to talk about your offer">
        <p className="text-sm text-app-muted mb-4">Messages to specific businesses come later, in Get Clients.</p>
        <div className="border-t border-app-border">
          {talkBlocks.map((b) => (
            <div key={b.label} className="py-5 border-b border-app-border">
              <div className="flex items-center justify-between gap-3">
                <div className="sf-eyebrow">{b.label}</div>
                <CopyButton text={b.text} />
              </div>
              <p className="text-app-text mt-2">{b.text}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {(r.terms || []).length > 0 && (
        <div className="rounded-lg bg-app-lavender-soft p-5 md:p-6">
          <div className="sf-eyebrow mb-3">Words to know</div>
          <ul className="space-y-2">
            {r.terms.map((t, i) => (
              <li key={i} className="text-sm text-app-text">
                <span className="font-semibold">{t.term}:</span> <span className="text-app-muted">{t.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <RefineIt
        offer={offer}
        profile={profile}
        onOfferUpdate={onOfferUpdate}
        onViewOfferDoc={onViewOfferDoc}
      />
    </div>
  );
}