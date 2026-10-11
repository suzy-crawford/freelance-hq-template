import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useProfile } from "@/lib/ProfileContext";
import { getPriceRecommendation } from "@/lib/offerData";
import { buildOfferPrompt, finalizeBuildResult } from "@/lib/offerPrompts";
import { callAI } from "@/lib/callAI";
import BuildLoading from "@/components/offer/BuildLoading";
import ScreenServices from "@/components/offer/ScreenServices";
import ScreenNiche from "@/components/offer/ScreenNiche";
import ScreenAbout from "@/components/offer/ScreenAbout";
import { PageSkeleton } from "@/components/shared/Skeleton";

export default function OfferWizard() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutMe, setAboutMe] = useState("");
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const o = await base44.entities.Offer.get(offerId);
        if (!active) return;
        if (o.status === "complete") {
          navigate(`/offer/${offerId}`, { replace: true });
          return;
        }
        setOffer(o);
        setAboutMe(o.about_me || "");
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

  const goTo = async (screen, updates = {}) => {
    const updated = await base44.entities.Offer.update(offer.id, { ...updates, current_screen: screen });
    setOffer(updated);
    window.scrollTo(0, 0);
  };

  const runBuild = async () => {
    setError(null);
    setBuilding(true);
    try {
      const saved = await base44.entities.Offer.update(offer.id, { about_me: aboutMe });
      const current = { ...saved, about_me: aboutMe };

      const rec = getPriceRecommendation(
        current.primary_service,
        current.experience_level,
        current.niche,
        current.niche_is_custom
      );
      await base44.entities.Offer.update(offer.id, {
        price: rec.recommended,
        price_low: rec.low,
        price_high: rec.high,
        price_reasons: rec.reasons,
      });

      const { prompt, response_json_schema } = buildOfferPrompt(current, profile);
      const result = await callAI({ prompt, response_json_schema });
      const finalized = finalizeBuildResult(result, current);

      const updates = {
        record: finalized.record,
        package: finalized.package,
        selected_name: finalized.selected_name,
        status: "complete",
      };

      const { items: actives } = await base44.entities.Offer.filter({ is_active: true }, { limit: 1 });
      if (!actives.length) {
        updates.is_active = true;
        await updateProfile({ active_offer_id: offer.id });
      }

      await base44.entities.Offer.update(offer.id, updates);
      navigate(`/offer/${offer.id}`);
    } catch (e) {
      console.error("[Offer Builder AI]", e);
      setError(e?.message || String(e));
    } finally {
      setBuilding(false);
    }
  };

  if (building) return <BuildLoading />;

  if (loading || !offer) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-app-bg">
        <PageSkeleton />
      </div>
    );
  }

  const screen = offer.current_screen || 1;

  return (
    <div>
      <div className="max-w-2xl mx-auto px-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-app-muted">
          Let's build your freelance offer.
        </p>
      </div>

      {screen === 1 && <ScreenServices offer={offer} onDone={(u, s) => goTo(s, u)} />}
      {screen === 2 && <ScreenNiche offer={offer} onBack={() => goTo(1)} onDone={(u, s) => goTo(s, u)} />}
      {screen === 3 && (
        <ScreenAbout
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
          onBack={() => goTo(2, { about_me: aboutMe })}
          onBuild={runBuild}
          error={error}
          onRetry={runBuild}
        />
      )}
    </div>
  );
}