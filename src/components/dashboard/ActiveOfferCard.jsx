import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/offerData";

export default function ActiveOfferCard({ offer }) {
  const oneSentence = offer.record?.talk?.one_sentence || "";

  return (
    <section className="mb-6 rounded-xl border border-app-border bg-app-surface p-6">
      <h3 className="text-lg font-semibold text-app-text">{offer.selected_name}</h3>
      {oneSentence && <p className="text-app-muted text-sm mt-2 max-w-lg">{oneSentence}</p>}
      <div className="text-2xl font-semibold text-app-text mt-3">
        {formatMoney(offer.price)} <span className="text-sm font-normal text-app-muted">per month</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Button asChild className="rounded-full h-11 px-5 bg-app-primary text-app-on-primary hover:bg-app-text">
          <Link to={`/offer/${offer.id}?tab=offer`}>View offer</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-11 px-5 border-app-border text-app-text">
          <Link to={`/offer/${offer.id}?tab=doc`}>Offer doc</Link>
        </Button>
        <Link
          to="/offer-builder"
          className="text-sm font-medium text-app-muted underline hover:text-app-text ml-1"
        >
          Build another
        </Link>
      </div>
    </section>
  );
}