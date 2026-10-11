import React from "react";
import { SERVICES, formatMoney } from "@/lib/offerData";

function serviceLabel(offer) {
  if (!offer.primary_service) return "Draft";
  if (offer.primary_service === "other") return offer.custom_service_name || "Other";
  return SERVICES[offer.primary_service]?.label || "";
}

export default function OfferHomeCard({ offer, onOpen }) {
  const complete = offer.status === "complete";
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left rounded-xl border-2 border-app-border bg-app-bg p-5 hover:border-app-text transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-app-text text-lg">{offer.selected_name || "Draft offer"}</div>
          <div className="text-app-muted text-sm mt-1">{serviceLabel(offer)}</div>
          {complete && offer.price ? (
            <div className="text-app-text text-sm mt-2">{formatMoney(offer.price)} per month</div>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          {offer.is_active && (
            <span className="rounded-full bg-app-primary text-app-on-primary text-xs font-semibold px-3 py-1">
              Active
            </span>
          )}
          <span className="text-app-muted text-xs">{complete ? "View" : "Continue"}</span>
        </div>
      </div>
    </button>
  );
}