import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Globe, Phone, Mail, MapPin, Instagram, Facebook, Trash2, CheckCircle2, Highlight } from "@/components/brand/icons";
import AnalyzeSection from "@/components/clients/AnalyzeSection";
import OutreachSection from "@/components/clients/OutreachSection";
import { base44 } from "@/api/base44Client";
import ContactRow from "@/components/clients/ContactRow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { displayDomain, displayInstagram, displayFacebook } from "@/lib/clientsLogic";

function ComingSoonCard({ icon: Icon, step, title, text }) {
  return (
    <div className="rounded-lg border border-dashed border-app-border-strong bg-app-raised p-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-app-surface flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-app-muted" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">{step}</div>
          <div className="font-semibold text-app-text mt-0.5">{title}</div>
          <p className="text-sm text-app-muted mt-1">{text}</p>
          <span className="inline-block mt-3 text-xs rounded-full bg-app-surface border border-app-border px-2.5 py-1 text-app-muted">
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProspectDetail() {
  const { prospectId } = useParams();
  const navigate = useNavigate();
  const [prospect, setProspect] = useState(null);
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [missing, setMissing] = useState(false);
  const [emailSearch, setEmailSearch] = useState({ running: false, message: "" });
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await base44.entities.Prospect.get(prospectId);
        setProspect(p);
        setNotes(p.notes || "");
        let o = null;
        if (p.offer_id) o = await base44.entities.Offer.get(p.offer_id).catch(() => null);
        if (!o || o.status !== "complete") {
          const { items } = await base44.entities.Offer.filter(
            { is_active: true, status: "complete" },
            { sort: "-created_date", limit: 1 }
          );
          o = items?.[0] || null;
        }
        setOffer(o);
      } catch {
        setMissing(true);
      }
    })();
  }, [prospectId]);

  const saveNotes = async () => {
    if (!prospect || notes === (prospect.notes || "")) return;
    const updated = await base44.entities.Prospect.update(prospect.id, { notes });
    setProspect(updated);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const findEmail = async () => {
    setEmailSearch({ running: true, message: "" });
    try {
      const response = await base44.functions.invoke("findEmail", {
        website: prospect.website,
        name: prospect.name,
        location: prospect.location,
        needSocial: !prospect.instagram || !prospect.facebook,
      });
      const data = response?.data ?? response;
      if (data?.error) throw new Error(data.error);
      const updates = {
        website_not_working: !data.website_works && !!prospect.website,
        website_checked: !!data.website_works,
      };
      if (data.new_website) {
        updates.website = data.new_website;
        updates.website_not_working = false;
      }
      if (data.instagram && !prospect.instagram) updates.instagram = data.instagram;
      if (data.facebook && !prospect.facebook) updates.facebook = data.facebook;
      if (data.email && !prospect.email) {
        updates.email = data.email;
        updates.email_source = data.email_source || "";
        updates.email_verified = !!data.email_verified;
      }
      const updated = await base44.entities.Prospect.update(prospect.id, updates);
      setProspect(updated);
      setEmailSearch({
        running: false,
        message:
          data.email || prospect.email
            ? ""
            : "No email found on their website or in a web search. Try their Instagram, or call them instead.",
      });
    } catch (e) {
      console.error("[Get Clients] findEmail", e);
      setEmailSearch({ running: false, message: `That didn't work. Details: ${e?.response?.data?.error || e.message}` });
    }
  };

  const remove = async () => {
    if (!window.confirm(`Remove ${prospect.name} from your list?`)) return;
    await base44.entities.Prospect.delete(prospect.id);
    navigate("/clients?tab=list", { replace: true });
  };

  if (missing)
    return (
      <div className="text-center py-16">
        <p className="text-app-muted">That business could not be found.</p>
        <Link to="/clients?tab=list" className="underline text-sm mt-2 inline-block">
          Back to my list
        </Link>
      </div>
    );
  if (!prospect) return <p className="text-app-muted">Loading...</p>;

  return (
    <div className="space-y-6">
      <Link to="/clients?tab=list" className="inline-flex items-center gap-1 text-sm text-app-muted hover:text-app-text">
        <ArrowLeft className="w-4 h-4" /> My list
      </Link>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">
          {prospect.business_type} · {prospect.location}
        </div>
        <h1 className="page-title">{prospect.name}</h1>
      </div>

      <section className="panel p-5 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-app-muted">Contact details</h2>
        {prospect.website ? (
          <div className="space-y-1">
            <ContactRow
              icon={Globe}
              value={prospect.website}
              display={displayDomain(prospect.website)}
              copyLabel="Copy website"
              visitUrl={prospect.website}
            />
            {prospect.website_checked && (
              <span className="inline-flex items-center gap-1 text-xs text-app-success ml-6">
                <CheckCircle2 className="w-3.5 h-3.5" /> Website checked
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-app-muted">No website found.</p>
        )}
        {prospect.email ? (
          <div className="space-y-1">
            <ContactRow icon={Mail} value={prospect.email} copyLabel="Copy email" />
            <p className="text-xs text-app-muted ml-6">
              {prospect.email_verified ? (
                <>
                  {prospect.email_source && !prospect.email_source.includes(displayDomain(prospect.website) || "@@")
                    ? "Found in a web search and confirmed on the source page. "
                    : "Found on their website. "}
                  {prospect.email_source && (
                    <a href={prospect.email_source} target="_blank" rel="noreferrer" className="underline">
                      See where
                    </a>
                  )}
                </>
              ) : (
                <>
                  Found in a web search, but we couldn't confirm it. Double-check before sending.{" "}
                  {prospect.email_source && (
                    <a href={prospect.email_source} target="_blank" rel="noreferrer" className="underline">
                      See source
                    </a>
                  )}
                </>
              )}
            </p>
          </div>
        ) : null}
        <ContactRow icon={Phone} value={prospect.phone} copyLabel="Copy phone" />
        <ContactRow icon={MapPin} value={prospect.address} copyLabel="Copy address" />
        <ContactRow
          icon={Facebook}
          value={prospect.facebook}
          display={displayFacebook(prospect.facebook)}
          copyLabel="Copy Facebook Page"
          visitUrl={prospect.facebook}
        />
        <ContactRow
          icon={Instagram}
          value={prospect.instagram}
          display={displayInstagram(prospect.instagram)}
          copyLabel="Copy Instagram"
          visitUrl={prospect.instagram}
        />
        {(!prospect.email || !prospect.instagram || !prospect.facebook) && (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="outline"
              className="rounded-full h-9 px-4 border-app-border text-app-text"
              onClick={findEmail}
              disabled={emailSearch.running}
            >
              {emailSearch.running ? "Searching their website and the web..." : "Find contact info"}
            </Button>
            <span className="text-xs text-app-muted">
              Missing: {[!prospect.email && "email", !prospect.instagram && "Instagram", !prospect.facebook && "Facebook Page"].filter(Boolean).join(", ")}
            </span>
            {emailSearch.message && <span className="text-xs text-app-muted w-full">{emailSearch.message}</span>}
          </div>
        )}
        <p className="text-xs text-app-muted pt-1">
          Always double-check details on their website before reaching out.
        </p>
      </section>

      {prospect.website_not_working && (
        <section className="rounded-xl border-2 border-app-primary bg-app-surface p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">Opportunity spotted</div>
          <div className="font-semibold text-app-text mt-1">Their website isn't working</div>
          <p className="text-sm text-app-muted mt-1">
            The business looks active, but their website doesn't load. That's a real reason to reach out: people who
            look them up right now can't find their services or book.
          </p>
        </section>
      )}

      <AnalyzeSection prospect={prospect} offer={offer} onUpdated={setProspect} />

      <OutreachSection key={prospect.analyzed_at || "none"} prospect={prospect} offer={offer} onUpdated={setProspect} />

      <ComingSoonCard
        icon={Highlight}
        step="Coming with the Ads and Content tools"
        title="Create something to send"
        text="Make a few Reel ideas or ad ideas made just for this business, so your first message comes with something useful."
      />

      <section className="panel p-5">
        <label htmlFor="notes" className="text-sm font-semibold uppercase tracking-wide text-app-muted">
          Your notes
        </label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveNotes}
          placeholder="Anything you noticed about this business..."
          className="mt-3 min-h-[100px]"
        />
        <p className="text-xs text-app-muted mt-2 h-4">{notesSaved ? "Saved" : "Saves when you click away."}</p>
      </section>

      <Button variant="outline" className="rounded-full h-11 px-5 border-app-border text-app-muted" onClick={remove}>
        <Trash2 className="w-4 h-4 mr-2" /> Remove from my list
      </Button>
    </div>
  );
}
