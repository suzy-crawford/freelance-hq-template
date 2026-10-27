var e=`import React, { useEffect, useState } from "react";
import { Offer, ChevronRight } from "@/components/brand/icons";
import { useNavigate } from "react-router-dom";
import ToolHero from "@/components/shared/ToolHero";
import { base44 } from "@/api/base44Client";
import { useProfile } from "@/lib/ProfileContext";
import { SERVICES, formatMoney } from "@/lib/offerData";
import { ListSkeleton } from "@/components/shared/Skeleton";

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
      navigate(\`/offer-builder/\${created.id}\`);
    } finally {
      setStarting(false);
    }
  };

  const openOffer = (offer) => {
    if (offer.status === "complete") {
      navigate(\`/offer/\${offer.id}\`);
    } else {
      navigate(\`/offer-builder/\${offer.id}\`);
    }
  };

  const hero = (right) => (
    <ToolHero
      icon={Offer}
      title="Offer Builder"
      subtitle="Answer three questions and get your offer, your price and a one-page offer doc you can share."
      right={right}
    />
  );

  return (
    <div className="flex flex-col gap-10">
      {hero(
        offers?.length ? (
          <button type="button" onClick={startNew} disabled={starting} className="btn btn-primary">
            {starting ? "Starting..." : "New offer"}
          </button>
        ) : null
      )}
      {offers === null ? (
        <ListSkeleton rows={3} />
      ) : offers.length === 0 ? (
        <section className="panel">
          <div className="empty">
            <div className="empty-title">No offers yet</div>
            <p className="empty-text">Answer three questions and get your offer and your price. It takes about ten minutes.</p>
            <button type="button" className="btn btn-primary" onClick={startNew} disabled={starting}>
              Build your first offer
            </button>
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="panel-head">
            <h2>Your offers</h2>
            <span className="count">{offers.length}</span>
          </div>
          <ul>
            {offers.map((o) => {
              const name = o.selected_name || "Draft offer";
              const complete = o.status === "complete";
              const meta = [serviceLabel(o), complete && o.price ? \`\${formatMoney(o.price)} a month\` : ""].filter(Boolean).join(" · ");
              return (
                <li key={o.id} className="border-b border-app-border last:border-b-0">
                  <button type="button" onClick={() => openOffer(o)} className="flex w-full items-center gap-4 px-4 py-3.5 text-left">
                    <span className="initial-sm" aria-hidden="true">
                      {name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-app-text truncate">{name}</div>
                      <div className="hint truncate">{meta || "Draft"}</div>
                    </div>
                    <span className="stage">{o.is_active && complete ? "Active" : complete ? "Done" : "Draft"}</span>
                    <ChevronRight className="w-5 h-5 text-app-muted" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function serviceLabel(offer) {
  if (!offer.primary_service) return "";
  if (offer.primary_service === "other") return offer.custom_service_name || "Other";
  return SERVICES[offer.primary_service]?.label || "";
}
`;export{e as default};