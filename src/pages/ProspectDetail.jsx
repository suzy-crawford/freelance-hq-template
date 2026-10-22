import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "@/components/brand/icons";
import LeadWorkspace, { LeadHeader, ContactCard } from "@/components/clients/LeadWorkspace";
import { base44 } from "@/api/base44Client";
import { displayDomain } from "@/lib/clientsLogic";

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

  const fromWebsite = !prospect.email_source || prospect.email_source.includes(displayDomain(prospect.website) || "@@");
  const emailStatus = !prospect.email_verified
    ? { label: "Double-check before sending", tone: "warn" }
    : fromWebsite
      ? { label: "Found on their website", tone: "found" }
      : { label: "Found in a web search and confirmed", tone: "found" };

  return (
    <div className="lp">
      <Link to="/clients?tab=list" className="lp-back">
        <ArrowLeft /> My list
      </Link>

      <LeadHeader prospect={prospect} />

      <LeadWorkspace
        prospect={prospect}
        offer={offer}
        onUpdated={setProspect}
        contact={
          <ContactCard
            prospect={prospect}
            emailStatus={prospect.email ? emailStatus.label : ""}
            onFind={findEmail}
            finding={emailSearch.running}
            findMessage={emailSearch.message}
          />
        }
        extras={
          <>
            {prospect.website_not_working && (
              <section className="lp-card lp-main-card">
                <h2 className="lp-card-title">Their website isn't loading</h2>
                <p className="lp-intro">
                  The business looks active, but their website doesn't load. That's a real reason to reach out: people who look them up right
                  now can't find their services or book.
                </p>
              </section>
            )}
            <section className="lp-card lp-main-card">
              <label htmlFor="notes" className="lp-card-title block">
                Your notes
              </label>
              <textarea
                id="notes"
                className="lp-paste"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={saveNotes}
                placeholder="Anything you noticed about this business..."
              />
              <p className="lp-foot">{notesSaved ? "Saved" : "Saves when you click away."}</p>
            </section>
            <button type="button" className="lp-quiet-link lp-remove" onClick={remove}>
              <Trash2 /> Remove from my list
            </button>
          </>
        }
      />
    </div>
  );
}
