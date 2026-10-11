import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { offerToText } from "@/lib/offerLogic";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/CopyButton";
import YourOfferTab from "@/components/offer/result/YourOfferTab";
import OfferDocTab from "@/components/offer/result/OfferDocTab";
import ScopeTab from "@/components/offer/result/ScopeTab";
import { useProfile } from "@/lib/ProfileContext";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "offer", label: "Your Offer" },
  { id: "doc", label: "Offer Doc" },
  { id: "scope", label: "Scope of Work" },
];

export default function OfferResult() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { profile } = useProfile();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const tab = params.get("tab") || "offer";
  const setTab = (t) => setParams({ tab: t });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const o = await base44.entities.Offer.get(offerId);
        if (active) setOffer(o);
      } catch (e) {
        navigate("/offer-builder", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [offerId, navigate]);

  if (loading || !offer) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-app-surface border-t-app-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-app-muted">Your freelance offer</p>
      <h1 className="text-3xl md:text-4xl font-semibold text-app-text mt-2">{offer.selected_name}</h1>
      <p className="text-app-muted mt-3 max-w-[620px]">
        This is a recommended starting offer. Review it, edit anything, and make it yours.
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        <CopyButton text={offerToText(offer)} label="Copy everything" />
        <Button
          variant="outline"
          className="rounded-full border-app-border text-app-text"
          onClick={() => navigate("/offer-builder")}
        >
          Start over
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1 rounded-full bg-app-surface p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full py-2.5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-app-primary text-app-on-primary" : "text-app-muted hover:text-app-text"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "offer" && (
        <div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-app-border bg-app-surface p-4">
            <span className="text-app-text font-medium">Your offer doc is ready.</span>
            <Button className="rounded-full bg-app-primary text-app-on-primary hover:bg-app-text" onClick={() => setTab("doc")}>
              View Offer Doc
            </Button>
          </div>
          <YourOfferTab
            offer={offer}
            profile={profile}
            onOfferUpdate={setOffer}
            onViewOfferDoc={() => setTab("doc")}
          />
        </div>
      )}

      {tab === "doc" && <OfferDocTab offer={offer} profile={profile} onOfferUpdate={setOffer} />}
      {tab === "scope" && <ScopeTab offer={offer} profile={profile} />}
    </div>
  );
}