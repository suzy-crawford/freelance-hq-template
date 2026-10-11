import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Refresh, ChevronDown, ChevronUp } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { getAds, adToText, isLegacyRecord, listBlanks, BLANK_RE, displayName } from "@/lib/adsCards";
import { BODY_TYPES } from "@/lib/adsPrompts";
import { getNiche, cplText, cplSourceText, radiusText } from "@/lib/adsNiches";
import { ANGLE_CATEGORIES, getCategory } from "@/lib/adsAngleLibrary";
import { getStructure } from "@/lib/adsHeadlines";

// Show [blanks] highlighted, so the member can see what to fill in with the client.
export function WithBlanks({ text }) {
  const s = String(text || "");
  const out = [];
  let last = 0;
  for (const m of s.matchAll(BLANK_RE)) {
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(
      <mark key={m.index} className="rounded-sm px-1" style={{ background: "var(--butter)", color: "var(--on-butter)" }}>
        {m[0]}
      </mark>
    );
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

function categoryLabel(cat) {
  if (!cat) return "";
  const t = cat.name.replace(/&/g, "and").toLowerCase();
  return t[0].toUpperCase() + t.slice(1);
}

export function PlanStrip({ campaign, ads }) {
  const niche = getNiche(campaign);
  const target = campaign.target_cpl
    ? `$${campaign.target_cpl}, their target`
    : cplText(niche)
      ? cplText(niche).replace(/ per (lead|sale).*/, "")
      : "Set in week 2";
  const items = [
    ["Ads to build", `${ads.length} ads`],
    ["Button", campaign.record.cta || ads[0]?.cta],
    ["Who sees it", niche.radius ? `${radiusText(niche).replace(" mi", " miles")} around them` : "The whole country"],
    ["Target cost per lead", target],
  ];
  return (
    <div className="summary" aria-label="Your ads at a glance" title={cplSourceText(niche) ? `Cost per lead source: ${cplSourceText(niche)}` : undefined}>
      {items.map(([k, v]) => (
        <div key={k}>
          <div className="k">{k}</div>
          <div className="v">{v}</div>
        </div>
      ))}
    </div>
  );
}

function PostPreview({ campaign, ad }) {
  const name = displayName(campaign.business_name);
  const initials = (name || "?")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const lines = ad.edited ? [{ text: ad.primary }] : ad.parts;
  return (
    <div className="rounded-md border border-app-border overflow-hidden" style={{ background: "var(--a-surface)", boxShadow: "var(--a-panel-shadow)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="initial-sm" style={{ width: 34, height: 34, fontSize: 14 }}>
            {initials}
          </span>
          <div>
            <div className="text-sm font-semibold text-app-text">{name}</div>
            <div className="text-xs text-app-muted">Sponsored</div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 text-[14.5px] leading-relaxed text-app-text">
          {lines.map((l, i) => (
            <p key={i} className="whitespace-pre-line m-0">
              <WithBlanks text={l.text} />
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-1.5 px-8 py-10 min-h-[300px]" style={{ background: "var(--a-sunk)" }}>
        {ad.format && <div className="tool-label">{ad.format}</div>}
        <div className="text-sm text-app-text max-w-[300px]">{ad.image?.visual || "Your image goes here"}</div>
        {ad.image?.overlay && (
          <div className="text-xs text-app-muted">
            Text on the image: <WithBlanks text={ad.image.overlay} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: "var(--a-sunk)", borderTop: "1px solid var(--a-line)" }}>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-app-text">
            <WithBlanks text={ad.headline} />
          </div>
          {ad.description && (
            <div className="text-xs text-app-muted">
              <WithBlanks text={ad.description} />
            </div>
          )}
        </div>
        <span className="text-sm font-semibold rounded-md px-3 py-1.5 whitespace-nowrap" style={{ background: "var(--a-line)" }}>
          {ad.cta}
        </span>
      </div>
    </div>
  );
}

function Picker({ title, options, selected, onPick, getLabel }) {
  return (
    <div>
      <div className="sf-eyebrow mb-1">{title}</div>
      <ul>
        {options.map((o, i) => (
          <li key={i} className="py-2 border-b border-app-border last:border-b-0">
            <button
              type="button"
              onClick={() => onPick(i)}
              className={cn("w-full text-left flex gap-3 items-start bg-transparent", selected === i ? "text-app-text" : "text-app-muted")}
              aria-pressed={selected === i}
            >
              <span
                className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 border"
                style={{ background: selected === i ? "var(--a-ink)" : "transparent", borderColor: "var(--a-line-strong)" }}
              />
              <span className="text-sm">
                {getLabel && getLabel(o) && <span className="font-semibold text-app-text">{getLabel(o)}: </span>}
                <WithBlanks text={typeof o === "string" ? o : o.text} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyAd({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-primary"
      style={{ height: 34, fontSize: 13 }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy ad"}
    </button>
  );
}

const EDIT_LABELS = { hook: "First line", body: "The middle", offer: "The offer", trust: "Why trust them", next: "What to do next" };

function AdCard({ campaign, ad, total, niche, busy, onChoice, onRewrite, onSwap, onBlanks }) {
  const [more, setMore] = useState(false);
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState({});
  const [filling, setFilling] = useState(false);
  const [fills, setFills] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const a = ad.angle;
  const usedNames = (campaign.record.angles || []).map((x) => x.name.toLowerCase());
  const usedCats = (campaign.record.angles || []).map((x) => x.category);
  const library = niche.angles.length
    ? niche.angles
    : ANGLE_CATEGORIES.map((c) => ({ name: c.name, category: c.id, concept: c.concept, idea: c.psychology }));
  const swapOptions = library.filter((n) => !usedNames.includes(n.name.toLowerCase()) && (niche.angles.length || !usedCats.includes(n.category)));
  const blankList = listBlanks(ad);
  const blanks = blankList.length;
  const cat = getCategory(ad.category);
  const editFields = [
    ...ad.parts.map((p) => ({ key: p.key, label: EDIT_LABELS[p.part], value: p.text, long: p.part === "body" })),
    { key: ad.headlineKey, label: "Headline", value: ad.headline },
    { key: "description", label: "Description", value: ad.description },
  ];

  const startEdit = () => {
    setFilling(false);
    setDrafts(Object.fromEntries(editFields.map((f) => [f.key, f.value])));
    setEditing(true);
  };
  const saveEdit = () => {
    const edits = { ...(ad.choice.edits || {}) };
    editFields.forEach((f) => {
      if (drafts[f.key] !== undefined && drafts[f.key] !== f.value) edits[f.key] = drafts[f.key];
    });
    onChoice(ad.index, { edits });
    setEditing(false);
  };
  const startFill = () => {
    setEditing(false);
    setFills(Object.fromEntries(blankList.map((b) => [b, (campaign.blank_values || {})[b] || ""])));
    setFilling(true);
  };
  const saveFill = () => {
    onBlanks(fills);
    setFilling(false);
  };

  return (
    <section className="doc-section pt-8" style={{ borderTop: "1px solid var(--a-line)" }}>
      <div className="tool-label">
        Ad {ad.index + 1} of {total}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
        <h3 className="m-0">{ad.name}</h3>
        {cat && <span className="tag tag-lav">{categoryLabel(cat)}</span>}
        {busy && (
          <span className="writing">
            <i />
            Writing
          </span>
        )}
      </div>
      {ad.why && <p className="intro">{ad.why}</p>}

      {blanks > 0 && !editing && !filling && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md px-4 py-3 mb-4" style={{ background: "var(--butter-soft)" }}>
          <span className="text-sm text-app-text">
            <strong>
              {blanks} blank{blanks > 1 ? "s" : ""}
            </strong>{" "}
            to fill in before this ad is ready.
          </span>
          <button type="button" className="btn btn-quiet" style={{ height: 32, fontSize: 13, background: "var(--a-surface)" }} onClick={startFill}>
            Fill in blanks
          </button>
        </div>
      )}

      {filling && (
        <div className="rounded-md px-4 py-4 mb-4 flex flex-col gap-3" style={{ background: "var(--butter-soft)" }}>
          <p className="text-sm text-app-text m-0">Get these from your client. Each answer fills that blank in every ad. Leave one empty to keep the blank.</p>
          {blankList.map((b) => (
            <label key={b} className="flex flex-col gap-1 text-sm font-semibold text-app-text">
              {b.slice(1, -1).replace(/^./, (x) => x.toUpperCase())}
              <Input value={fills[b] || ""} onChange={(e) => setFills((f) => ({ ...f, [b]: e.target.value }))} style={{ background: "var(--a-surface)" }} />
            </label>
          ))}
          <div className="flex gap-2">
            <button type="button" className="btn btn-primary" onClick={saveFill}>
              Save
            </button>
            <button type="button" className="btn btn-quiet" style={{ background: "var(--a-surface)" }} onClick={() => setFilling(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <CopyAd text={adToText(ad)} />
        <button type="button" className="btn btn-quiet" style={{ height: 34, fontSize: 13 }} onClick={startEdit} disabled={busy}>
          Edit
        </button>
        <div className="relative">
          <button type="button" className="btn btn-quiet" style={{ height: 34, fontSize: 13 }} onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} disabled={busy}>
            <Refresh className="w-4 h-4" />
            Rewrite
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {menuOpen && (
            <div
              className="absolute left-0 top-[40px] z-10 min-w-[200px] rounded-md border border-app-border p-1 flex flex-col"
              style={{ background: "var(--a-surface)", boxShadow: "var(--a-float)" }}
              role="menu"
            >
              <button
                type="button"
                role="menuitem"
                className="text-left text-sm px-3 py-2 rounded-sm bg-transparent hover:bg-app-bg"
                onClick={() => {
                  setMenuOpen(false);
                  onRewrite(ad.index);
                }}
              >
                Rewrite this ad
              </button>
              {swapOptions.length > 0 && (
                <button
                  type="button"
                  role="menuitem"
                  className="text-left text-sm px-3 py-2 rounded-sm bg-transparent hover:bg-app-bg"
                  onClick={() => {
                    setMenuOpen(false);
                    setSwapOpen(true);
                  }}
                >
                  Swap the angle
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {swapOpen && (
        <div className="rounded-md border border-app-border p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="sf-eyebrow">Pick a different angle</div>
            <button type="button" className="chip" onClick={() => setSwapOpen(false)}>
              Cancel
            </button>
          </div>
          <ul>
            {swapOptions.map((o) => (
              <li key={o.name}>
                <button
                  type="button"
                  className="w-full text-left rounded-sm px-3 py-2 bg-transparent transition-colors hover:bg-[var(--lavender-soft)] focus-visible:bg-[var(--lavender-soft)]"
                  onClick={() => {
                    setSwapOpen(false);
                    onSwap(ad.index, o);
                  }}
                >
                  <span className="text-sm font-semibold text-app-text">{o.name}</span>
                  <span className="text-sm text-app-muted"> {o.concept || o.idea}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="max-w-[560px]">
        <div>
          {editing ? (
            <div className="flex flex-col gap-3">
              {editFields.map((f) => (
                <label key={f.key} className="flex flex-col gap-1 text-sm font-semibold text-app-text">
                  {f.label}
                  {f.long ? (
                    <Textarea value={drafts[f.key] ?? ""} onChange={(e) => setDrafts((d) => ({ ...d, [f.key]: e.target.value }))} rows={4} />
                  ) : (
                    <Input value={drafts[f.key] ?? ""} onChange={(e) => setDrafts((d) => ({ ...d, [f.key]: e.target.value }))} />
                  )}
                </label>
              ))}
              <p className="hint">Leave a line empty to remove it from the ad.</p>
              <div className="flex gap-2">
                <button type="button" className="btn btn-primary" onClick={saveEdit}>
                  Save
                </button>
                <button type="button" className="btn btn-quiet" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <PostPreview campaign={campaign} ad={ad} />
          )}
        </div>

      </div>

      {(ad.edited || (ad.choice.edits && Object.keys(ad.choice.edits).length > 0)) && (
        <p className="hint mt-3">
          You edited this ad.{" "}
          <button type="button" className="chip" onClick={() => onChoice(ad.index, { text: undefined, headline_text: undefined, edits: undefined })}>
            Undo my edits
          </button>
        </p>
      )}

      {a && !ad.edited && (
        <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--a-line)" }}>
          <button type="button" className="inline-flex items-center gap-1.5 bg-transparent text-sm font-semibold text-app-text" onClick={() => setMore((v) => !v)} aria-expanded={more}>
            {more ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Other first lines, middles and headlines to try
          </button>
          {more && (
            <div className="flex flex-col gap-4 mt-3">
              <p className="hint">Pick one and the ad updates. Test the others later as new ads.</p>
              <Picker title="First line" options={ad.hooks} selected={ad.choice.hook ?? 0} onPick={(i) => onChoice(ad.index, { hook: i })} />
              <Picker title="The middle" options={ad.bodies} selected={ad.choice.body ?? 0} getLabel={(b) => BODY_TYPES[b?.type]} onPick={(i) => onChoice(ad.index, { body: i })} />
              <Picker
                title="Headline"
                options={ad.headlines}
                selected={ad.choice.headline ?? 0}
                getLabel={(h) => getStructure(h?.structure)?.name}
                onPick={(i) => onChoice(ad.index, { headline: i })}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function AdCards({ campaign, busyIndex, onChoice, onRewrite, onSwap, onBlanks }) {
  const ads = getAds(campaign);
  const niche = getNiche(campaign);
  const legacy = isLegacyRecord(campaign.record);
  return (
    <>
      <div className="flex flex-col gap-4">
        <PlanStrip campaign={campaign} ads={ads} />
        {legacy && <p className="hint">This campaign was built with the older version. Click Rebuild my ad strategy to get the new ad cards.</p>}
      </div>
      {ads.map((ad) =>
        legacy ? (
          <section key={ad.index} className="doc-section">
            <h3>{ad.name}</h3>
            <PostPreview campaign={campaign} ad={ad} />
          </section>
        ) : (
          <AdCard
            key={`${ad.index}-${ad.name}`}
            campaign={campaign}
            ad={ad}
            total={ads.length}
            niche={niche}
            busy={busyIndex === ad.index}
            onChoice={onChoice}
            onRewrite={onRewrite}
            onSwap={onSwap}
            onBlanks={onBlanks}
          />
        )
      )}
    </>
  );
}
