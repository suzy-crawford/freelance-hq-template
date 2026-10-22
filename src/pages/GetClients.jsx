import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Globe, Phone, Mail, MapPin, Instagram, Facebook, CheckCircle2, AlertCircle, ChevronRight, Search } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { useProfile } from "@/lib/ProfileContext";
import EmptyState from "@/components/shared/EmptyState";
import ToolHero from "@/components/shared/ToolHero";
import { ListSkeleton } from "@/components/shared/Skeleton";
import ContactRow from "@/components/clients/ContactRow";
import {
  searchSuggestions,
  displayDomain,
  displayInstagram,
  displayFacebook,
  prospectFromResult,
  savedMatchKeys,
  isAlreadySaved,
  chainsHiddenText,
  SEARCH_MESSAGES,
  leadStage,
  leadFit,
} from "@/lib/clientsLogic";

// One labeled column in a lead card. Shows the value, or a muted line when nothing was found.
function Fact({ label, children, empty }) {
  return (
    <div className="lead-fact">
      <div className="lead-fact-label">{label}</div>
      {children || <div className="lead-fact-none">{empty}</div>}
    </div>
  );
}

function ResultRow({ business, onSave, saving, saved }) {
  const hasSocial = business.instagram || business.facebook;
  return (
    <article className="lead-card">
      <div className="lead-head">
        <span className="initial" aria-hidden="true">
          {business.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="title-row">
            <span className="result-name">{business.name}</span>
            {business.is_chain && <span className="tag tag-line">Chain</span>}
          </div>
          {business.address && (
            <div className="lead-sub">
              <ContactRow icon={MapPin} value={business.address} copyLabel="Copy address" />
            </div>
          )}
        </div>
        <div className="lead-act">
          {saved ? (
            <span className="saved">
              <CheckCircle2 /> Saved
            </span>
          ) : (
            <button type="button" className="btn btn-primary btn-sm" onClick={onSave} disabled={saving}>
              {saving ? "Saving..." : "Save to lead list"}
            </button>
          )}
        </div>
      </div>

      <div className="lead-facts">
        <Fact label="Website" empty="No website found">
          {business.website && (
            <>
              <ContactRow
                icon={Globe}
                value={business.website}
                display={displayDomain(business.website)}
                copyLabel="Copy website"
                visitUrl={business.website}
              />
              {business.website_checked ? (
                <div className="lead-note lead-note-ok">
                  <CheckCircle2 /> Website checked
                </div>
              ) : (
                <div className="lead-note lead-note-warn">
                  <AlertCircle /> Website isn't loading. Could be the wrong address, or their site is down (an opportunity).
                </div>
              )}
            </>
          )}
        </Fact>
        <Fact label="Email" empty="No email on their website. Save it, then use Find contact info to search the web.">
          {business.email && (
            <>
              <ContactRow icon={Mail} value={business.email} copyLabel="Copy email" />
              <div className="lead-note">Found on their website</div>
            </>
          )}
        </Fact>
        <Fact label="Phone" empty="No phone found">
          {business.phone && <ContactRow icon={Phone} value={business.phone} copyLabel="Copy phone" />}
        </Fact>
        <Fact label="Social" empty="None found">
          {hasSocial && (
            <>
              <ContactRow
                icon={Instagram}
                value={business.instagram}
                display={displayInstagram(business.instagram)}
                copyLabel="Copy Instagram"
                visitUrl={business.instagram}
              />
              <ContactRow
                icon={Facebook}
                value={business.facebook}
                display={displayFacebook(business.facebook)}
                copyLabel="Copy Facebook Page"
                visitUrl={business.facebook}
              />
            </>
          )}
        </Fact>
      </div>
    </article>
  );
}

function FindTab({ offer, prospects, onSaved }) {
  const { profile, updateProfile } = useProfile();
  const { term, suggestions } = useMemo(() => searchSuggestions(offer), [offer]);
  const [businessType, setBusinessType] = useState(term);
  const [location, setLocation] = useState(profile?.last_search_location || "");
  const [searching, setSearching] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState({ businessType: "", location: "" });
  const [showChains, setShowChains] = useState(false);
  const [savingKey, setSavingKey] = useState(null);
  const [justSaved, setJustSaved] = useState(new Set());

  useEffect(() => setBusinessType(term), [term]);
  const savedKeys = useMemo(() => savedMatchKeys(prospects), [prospects]);

  useEffect(() => {
    if (!searching) return undefined;
    setMessageIndex(0);
    const id = setInterval(() => setMessageIndex((i) => Math.min(i + 1, SEARCH_MESSAGES.length - 1)), 6000);
    return () => clearInterval(id);
  }, [searching]);

  const runSearch = async () => {
    setSearching(true);
    setError(null);
    setResults(null);
    setJustSaved(new Set());
    try {
      if (location !== profile?.last_search_location) updateProfile({ last_search_location: location });
      const exclude = prospects
        .filter((p) => (p.location || "").toLowerCase() === location.trim().toLowerCase())
        .map((p) => p.name)
        .slice(0, 60);
      const response = await base44.functions.invoke("findBusinesses", { businessType, location, exclude });
      const data = response?.data ?? response;
      if (data?.error) throw new Error(data.error);
      setResults(data.businesses || []);
      setSearched({ businessType, location });
    } catch (e) {
      console.error("[Get Clients] findBusinesses", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setSearching(false);
    }
  };

  const fresh = (results || []).filter((b) => justSaved.has(b.dedupe_key) || !isAlreadySaved(b, savedKeys));
  const hiddenSaved = (results || []).length - fresh.length;
  const visible = fresh.filter((b) => showChains || !b.is_chain);
  const hiddenChains = fresh.filter((b) => b.is_chain).length;

  const saveOne = async (b) => {
    setSavingKey(b.dedupe_key);
    try {
      await base44.entities.Prospect.create(prospectFromResult(b, { ...searched, offerId: offer?.id }));
      setJustSaved((prev) => new Set(prev).add(b.dedupe_key));
      onSaved();
    } catch (e) {
      console.error("[Client Finder] save", e);
      setError(e.message || String(e));
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="searchbar">
          <div className="sb-field">
            <label htmlFor="business-type">What kind of business?</label>
            <input
              id="business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="For example: med spas, dentists, roofers"
            />
          </div>
          <div className="sb-field">
            <label htmlFor="location">Where?</label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && businessType.trim() && location.trim() && runSearch()}
              placeholder="City and state, for example: Austin, TX"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={runSearch}
            disabled={searching || !businessType.trim() || !location.trim()}
          >
            <Search />
            {searching ? "Searching..." : "Find businesses"}
          </button>
        </div>
        <div className="suggest">
          {suggestions.length > 0 && (
            <>
              <span>Your offer is for {offer?.niche?.toLowerCase()}. Pick one type to search for:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chip"
                  aria-pressed={businessType === s}
                  onClick={() => setBusinessType(s)}
                >
                  {s}
                </button>
              ))}
            </>
          )}
          <span className="ml-auto">A city works best. "Austin, TX" finds more than a single neighborhood.</span>
        </div>
      </div>

      {searching && (
        <div aria-busy="true">
          <p className="font-semibold" aria-live="polite">{SEARCH_MESSAGES[messageIndex]}</p>
          <p className="muted text-sm">This usually takes 15 to 40 seconds.</p>
          <ListSkeleton rows={4} className="mt-4" />
        </div>
      )}

      {error && (
        <div className="panel panel-body">
          <p>That didn't work. Try again.</p>
          <p className="hint mt-2">Details: {error}</p>
        </div>
      )}

      {results && !searching && (
        <div>
          <div className="results-head flex-wrap mb-2">
            <div>
              <h2 className="h-section">
                {visible.length} {searched.businessType.toLowerCase()} in {searched.location}
              </h2>
              <p className="muted text-[13.5px] mt-1">
                Pick the ones that look like a good fit and save them to your list.
                {hiddenSaved > 0 && ` ${hiddenSaved} already in your list (hidden).`}
                {hiddenChains > 0 && !showChains && ` ${chainsHiddenText(hiddenChains, searched.businessType)}`}
              </p>
            </div>
            {hiddenChains > 0 && (
              <button type="button" className="sort chip" onClick={() => setShowChains((v) => !v)}>
                {showChains ? "Hide chains and franchises" : "Show chains and franchises"}
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <EmptyState
              title="No businesses found"
              text="Try a bigger area (a city instead of a neighborhood) or a more common type of business."
            />
          ) : (
            <div className="lead-cards">
              {visible.map((b) => (
                <ResultRow
                  key={b.dedupe_key}
                  business={b}
                  saving={savingKey === b.dedupe_key}
                  saved={justSaved.has(b.dedupe_key)}
                  onSave={() => saveOne(b)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ListTab({ prospects, loading }) {
  const navigate = useNavigate();
  if (loading) return <ListSkeleton rows={4} />;
  if (!prospects.length)
    return (
      <EmptyState
        title="Your lead list is empty"
        text="Find businesses you could help, then save the good ones here."
      />
    );
  return (
    <div className="lead-cards">
      {prospects.map((p) => (
        <div
          key={p.id}
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/clients/${p.id}`)}
          onKeyDown={(e) => e.key === "Enter" && navigate(`/clients/${p.id}`)}
          className="lead-card lead-card-link"
        >
          <div className="lead-head">
            <span className="initial" aria-hidden="true">
              {p.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <div className="title-row">
                <span className="result-name">{p.name}</span>

              </div>
              <div className="lead-sub muted">
                {p.business_type} · {p.location}
              </div>
              <div className="lead-stagefit">
                <span className="stage">{leadStage(p)}</span>
                {leadFit(p) ? <span className="fit-word">{leadFit(p)}</span> : <span className="muted">Fit: —</span>}
              </div>
              {(p.email || p.phone) && (
                <div className="lead-contact">
                  {p.email && (
                    <span>
                      <Mail /> {p.email}
                    </span>
                  )}
                  {p.phone && (
                    <span>
                      <Phone /> {p.phone}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span className="lead-act lead-open">
              Details
              <ChevronRight />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GetClients() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "list" ? "list" : "find";
  const setTab = (t) => setSearchParams(t === "list" ? { tab: "list" } : {});
  const [offer, setOffer] = useState(null);
  const [prospects, setProspects] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const loadProspects = async () => {
    try {
      const { items } = await base44.entities.Prospect.filter({}, { sort: "-created_date", limit: 500 });
      setProspects(items || []);
    } catch (e) {
      console.error("[Get Clients] load list", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { items } = await base44.entities.Offer.filter(
        { is_active: true, status: "complete" },
        { sort: "-created_date", limit: 1 }
      );
      setOffer(items?.[0] || null);
    })();
    loadProspects();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <ToolHero
        icon={Search}
        title="Client Finder"
        subtitle="Find real businesses near you, see where you could help, and get a message ready to send."
        tabs={[
          { id: "find", label: "Find businesses" },
          { id: "list", label: `Lead list${prospects.length ? ` (${prospects.length})` : ""}` },
        ]}
        activeTab={tab}
        onTabChange={setTab}
      />
      {tab === "find" ? (
        <FindTab offer={offer} prospects={prospects} onSaved={loadProspects} />
      ) : (
        <ListTab prospects={prospects} loading={loadingList} />
      )}
    </div>
  );
}
