var e=`import React, { useEffect, useState } from "react";
import { Megaphone } from "@/components/brand/icons";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ToolHero from "@/components/shared/ToolHero";
import { ListSkeleton } from "@/components/shared/Skeleton";
import { ChevronRight } from "@/components/brand/icons";
import { BUSINESS_TYPES } from "@/lib/adsData";

export default function AdsHome() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    base44.entities.AdCampaign.filter({}, { sort: "-updated_date", limit: 200 })
      .then(({ items }) => setCampaigns(items || []))
      .catch(() => setCampaigns([]));
  }, []);

  const startNew = async () => {
    setCreating(true);
    try {
      const c = await base44.entities.AdCampaign.create({ status: "draft", step: 1, stage: "plan", business_source: "new", daily_budget: 20, monthly_budget: 608, radius_miles: 10 });
      navigate(\`/ads/\${c.id}\`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <ToolHero
        icon={Megaphone}
        title="Meta Ads Builder"
        subtitle="Build a complete Meta campaign, from offer to ads to launch."
        right={
          <button type="button" className="btn btn-primary" onClick={startNew} disabled={creating}>
            {creating ? "Starting..." : "New campaign"}
          </button>
        }
      />
      {campaigns === null ? (
        <ListSkeleton rows={3} />
      ) : campaigns.length === 0 ? (
        <section className="panel">
          <div className="empty">
            <div className="empty-title">No campaigns yet</div>
            <p className="empty-text">Pick a business from your lead list, or practice with a sample one. It takes about five minutes.</p>
            <button type="button" className="btn btn-primary" onClick={startNew} disabled={creating}>
              Build your first campaign
            </button>
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="panel-head">
            <h2>Your campaigns</h2>
            <span className="count">{campaigns.length}</span>
          </div>
          <ul>
            {campaigns.map((c) => (
              <li key={c.id} className="border-b border-app-border last:border-b-0">
                <Link to={\`/ads/\${c.id}\`} className="flex items-center gap-4 px-4 py-3.5">
                  <span className="initial-sm" aria-hidden="true">
                    {(c.business_name || "?").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-app-text truncate">{c.business_name || "Untitled campaign"}</div>
                    <div className="hint truncate">
                      {[c.product, c.offer_text, c.daily_budget ? \`$\${c.daily_budget}/day\` : ""].filter(Boolean).join(" · ") || "Draft"}
                    </div>
                  </div>
                  <span className="stage">{c.launched_at ? "Launched" : c.record ? "Ads ready" : "Planning"}</span>
                  <ChevronRight className="w-5 h-5 text-app-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
`;export{e as default};