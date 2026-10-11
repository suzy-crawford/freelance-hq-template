import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolHero from "@/components/shared/ToolHero";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useProfile } from "@/lib/ProfileContext";
import OfferHomeCard from "@/components/offer/OfferHomeCard";
import { PageSkeleton } from "@/components/shared/Skeleton";

export default function OfferBuilder() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [offers, setOffers] = useState(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    (async () => {
      const { items } = await base44.entities.Offer.filter({}, { sort: "-created_date", limit: 50 });
      setOffers(items);
    })();
  }, []);

  const startNew = async () => {
    setStarting(true);
    try {
      const created = await base44.entities.Offer.create({
        status: "draft",
        current_screen: 1,
        experience_level: profile?.experience_level || "brand_new",
      });
      navigate(`/offer-builder/${created.id}`);
    } finally {
      setStarting(false);
    }
  };

  const openOffer = (offer) => {
    if (offer.status === "complete") {
      navigate(`/offer/${offer.id}`);
    } else {
      navigate(`/offer-builder/${offer.id}`);
    }
  };

  if (offers === null) {
    return (
      <div className="flex items-center justify-center py-24">
        <PageSkeleton />
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div>
        <ToolHero
          title="Offer Builder"
          subtitle="Answer three questions and get your offer, your price and a one-page offer doc you can share."
        />
        <Button
          onClick={startNew}
          disabled={starting}
          className="rounded-full h-11 px-6 bg-app-primary text-app-on-primary hover:bg-app-text"
        >
          Start
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ToolHero
        title="Offer Builder"
        subtitle="Answer three questions and get your offer, your price and a one-page offer doc you can share."
        actions={
          <Button
            onClick={startNew}
            disabled={starting}
            className="rounded-full h-11 px-6 bg-app-primary text-app-on-primary hover:bg-app-text"
          >
            Build a new offer
          </Button>
        }
      />
      <div className="space-y-3">
        {offers.map((o) => (
          <OfferHomeCard key={o.id} offer={o} onOpen={() => openOffer(o)} />
        ))}
      </div>
    </div>
  );
}