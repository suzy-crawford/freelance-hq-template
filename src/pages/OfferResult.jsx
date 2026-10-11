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
import { PageSkeleton } from "@/components/shared/Skeleton";
import Tabs from "@/components/shared/Tabs";

const TABS = [
  { id: "offer", label: "Your offer" },
  { id: "doc", label: "Offer doc" },
  { id: "scope", label: "Scope of work" },
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
        <PageSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-[860px]">
      <p className="text-xs font-semibold uppercase tracking-widest text-app-muted">Your freelance offer</p>
      <h1 className="page-title mt-2">{offer.selected_name}</h1>
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

      <Tabs tabs={TABS} active={tab} onChange={setTab} className="mt-8" />

      {tab === "offer" && (
        <div>
          <div className="mt-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg bg-app-lavender-soft p-5">
            <span className="text-app-text font-semibold">Your offer doc is ready.</span>
            <Button onClick={() => setTab("doc")}>
              View offer doc
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