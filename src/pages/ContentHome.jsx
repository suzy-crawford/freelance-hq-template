import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight } from "@/components/brand/icons";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ToolHero, ListSkeleton } from "@/components/shared/Page";

export default function ContentHome() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    base44.entities.ContentPlan.filter({}, { sort: "-updated_date", limit: 200 })
      .then(({ items }) => setPlans(items || []))
      .catch(() => setPlans([]));
  }, []);

  const startNew = async () => {
    setCreating(true);
    try {
      const p = await base44.entities.ContentPlan.create({ stage: "about", business_source: "new", length: 5, cta_type: "keyword", formats: ["talking_head", "broll", "carousel"] });
      navigate(`/content/${p.id}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <ToolHero
        icon={Calendar}
        title="Content Creator"
        subtitle="Plan a client's content and get the posts written: scripts, text and what to film."
        right={
          <button type="button" className="btn btn-primary" onClick={startNew} disabled={creating}>
            {creating ? "Starting..." : "New content plan"}
          </button>
        }
      />
      {plans === null ? (
        <ListSkeleton rows={3} />
      ) : plans.length === 0 ? (
        <section className="panel">
          <div className="empty">
            <div className="empty-title">No content plans yet</div>
            <p className="empty-text">Pick a business from your lead list, or practice with a sample one. It takes about five minutes.</p>
            <button type="button" className="btn btn-primary" onClick={startNew} disabled={creating}>
              Plan your first content
            </button>
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="panel-head">
            <h2>Your content plans</h2>
            <span className="count">{plans.length}</span>
          </div>
          <ul>
            {plans.map((p) => {
              const total = p.strategy?.calendar?.length || 0;
              const done = (p.posts || []).length;
              return (
                <li key={p.id} className="border-b border-app-border last:border-b-0">
                  <Link to={`/content/${p.id}`} className="flex items-center gap-4 px-4 py-3.5">
                    <span className="initial-sm" aria-hidden="true">
                      {(p.business_name || "?").charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-app-text truncate">{p.business_name || "Untitled plan"}</div>
                      <div className="hint truncate">{[p.offer_text, `${p.length || 5} posts`].filter(Boolean).join(" · ")}</div>
                    </div>
                    <span className="stage">{done && done >= total ? "Done" : done ? `${done} of ${total} written` : total ? "Planned" : "Planning"}</span>
                    <ChevronRight className="w-5 h-5 text-app-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
