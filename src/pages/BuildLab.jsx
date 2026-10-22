import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Globe, Store, Target, Wand, Cart } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import ToolHero from "@/components/shared/ToolHero";
import { ListSkeleton } from "@/components/shared/Skeleton";
import { cn } from "@/lib/utils";
import { SECTIONS } from "@/lib/clientsBuilds";
import BuildsPanel from "@/components/builds/BuildsPanel";

// AI Build Lab: every Base44 build in one place, in three sections. Start from a lead on the list,
// or any other business (added to the lead list by default so links and outreach are kept).
const SECTION_ICON = { get: Globe, magnets: Target, sell: Cart };
const EMPTY = { name: "", business_type: "", location: "", website: "", instagram: "", phone: "" };

export default function BuildLab() {
  const [params, setParams] = useSearchParams();
  const [section, setSection] = useState(params.get("section") || "get");
  const [prospects, setProspects] = useState(null);
  const [offer, setOffer] = useState(null);
  const [pick, setPick] = useState(params.get("lead") ? `lead:${params.get("lead")}` : "");
  const [draft, setDraft] = useState(EMPTY);
  const [addToList, setAddToList] = useState(true);
  const [adding, setAdding] = useState(false);
  const [other, setOther] = useState(null); // a business not saved to the lead list
  const urlSection = params.get("section") || "get";
  useEffect(() => setSection(urlSection), [urlSection]);

  useEffect(() => {
    base44.entities.Prospect.filter({}, { sort: "-updated_date", limit: 500 })
      .then(({ items }) => setProspects(items || []))
      .catch(() => setProspects([]));
    base44.entities.Offer.filter({ is_active: true, status: "complete" }, { sort: "-created_date", limit: 1 })
      .then(({ items }) => setOffer(items?.[0] || null))
      .catch(() => {});
  }, []);

  const current = useMemo(() => {
    if (pick.startsWith("lead:")) return (prospects || []).find((p) => p.id === pick.slice(5)) || null;
    if (pick === "other" && other) return other;
    return null;
  }, [pick, prospects, other]);

  const sec = SECTIONS.find((s) => s.id === section) || SECTIONS[0];
  const chooseSection = (id) => {
    setSection(id);
    const next = new URLSearchParams(params);
    next.set("section", id);
    setParams(next, { replace: true });
  };
  const updated = (p) => setProspects((list) => (list || []).map((x) => (x.id === p.id ? p : x)));

  const useBusiness = async () => {
    if (!draft.name.trim()) return;
    if (!addToList) {
      setOther({ ...draft, name: draft.name.trim() });
      return;
    }
    setAdding(true);
    try {
      const p = await base44.entities.Prospect.create({ ...draft, name: draft.name.trim(), status: "new" });
      setProspects((list) => [p, ...(list || [])]);
      setPick(`lead:${p.id}`);
      setDraft(EMPTY);
    } finally {
      setAdding(false);
    }
  };
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));

  return (
    <div className="lp">
    <div className="flex flex-col gap-8">
      <ToolHero icon={Wand} title="AI Build Lab" subtitle="Build real websites, decks, lead magnets and tools for businesses in Base44, then use them to land clients." />

      <div className="bl-sections" role="radiogroup" aria-label="Section">
        {SECTIONS.map((s) => {
          const Icon = SECTION_ICON[s.id] || Globe;
          return (
            <button key={s.id} type="button" role="radio" aria-checked={section === s.id} className="mb-goal bl-section" onClick={() => chooseSection(s.id)}>
              <span className="mb-goal-icon">
                <Icon />
              </span>
              <strong>{s.label}</strong>
              <span>{s.intro}</span>
              <em>{s.builds.map((b) => b.label).join(" · ")}</em>
            </button>
          );
        })}
      </div>

      <section className="lp-card">
        <div className="lp-body">
          <h2 className="ab-title">Who's this for?</h2>
          {prospects === null ? (
            <ListSkeleton rows={1} />
          ) : (
            <div className="mb-source bl-who">
              <select className="select" value={pick} onChange={(e) => (setPick(e.target.value), setOther(null))} aria-label="Pick a business">
                <option value="">Pick a business</option>
                {prospects.length > 0 && (
                  <optgroup label="Lead list">
                    {prospects.map((p) => (
                      <option key={p.id} value={`lead:${p.id}`}>
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                <option value="other">Another business…</option>
              </select>
              {current && <span className="ab-muted">{[current.business_type, current.location].filter(Boolean).join(" · ")}</span>}
            </div>
          )}

          {pick === "other" && !other && (
            <div className="bl-form">
              <div className="mb-two">
                <label className="ab-q">
                  <span className="ab-q-label">Business name</span>
                  <input className="input" value={draft.name} onChange={set("name")} placeholder="B Street Family Dental" />
                </label>
                <label className="ab-q">
                  <span className="ab-q-label">Type of business</span>
                  <input className="input" value={draft.business_type} onChange={set("business_type")} placeholder="Dentist" />
                </label>
                <label className="ab-q">
                  <span className="ab-q-label">City</span>
                  <input className="input" value={draft.location} onChange={set("location")} placeholder="Tustin, CA" />
                </label>
                <label className="ab-q">
                  <span className="ab-q-label">Website</span>
                  <input className="input" value={draft.website} onChange={set("website")} placeholder="theirwebsite.com" />
                </label>
                <label className="ab-q">
                  <span className="ab-q-label">Instagram</span>
                  <input className="input" value={draft.instagram} onChange={set("instagram")} placeholder="@theirhandle" />
                </label>
                <label className="ab-q">
                  <span className="ab-q-label">Phone</span>
                  <input className="input" value={draft.phone} onChange={set("phone")} placeholder="(714) 555-0100" />
                </label>
              </div>
              <div className="bl-form-foot">
                <label className="ab-check">
                  <input type="checkbox" checked={addToList} onChange={(e) => setAddToList(e.target.checked)} />
                  Add to my lead list (so your links and messages are saved)
                </label>
                <button type="button" className="lp-btn" onClick={useBusiness} disabled={!draft.name.trim() || adding}>
                  {adding ? "Adding..." : "Use this business →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {current ? (
        <section className="lp-card">
          <div className="lp-tool-head">
            <span className="lp-tool-icon">
              <Store />
            </span>
            <div className="min-w-0">
              <h2 className="lp-tool-title">{sec.label}</h2>
              <p className="lp-tool-intro">
                {sec.intro} For <strong>{current.name}</strong>.
              </p>
            </div>
          </div>
          <BuildsPanel key={`${sec.id}-${current.id || "other"}`} prospect={current} offer={offer} builds={sec.builds} onUpdated={updated} canSave={!!current.id} />
        </section>
      ) : (
        <p className={cn("ab-muted", "bl-hint")}>Pick a business above to start building.</p>
      )}
    </div>
    </div>
  );
}
