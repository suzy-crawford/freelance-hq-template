import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import { useProfile } from "@/lib/ProfileContext";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Pencil, Check, FileText } from "lucide-react";
import { PATH_STEPS, CURRENT_STEP_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ToolCard from "@/components/dashboard/ToolCard";
import ActiveOfferCard from "@/components/dashboard/ActiveOfferCard";

export default function Dashboard() {
  const { profile } = useProfile();
  const [activeOffer, setActiveOffer] = useState(null);

  useEffect(() => {
    (async () => {
      const { items } = await base44.entities.Offer.filter(
        { is_active: true, status: "complete" },
        { sort: "-created_date", limit: 1 }
      );
      setActiveOffer(items[0] || null);
    })();
  }, []);

  const firstName = profile?.first_name || "there";
  const goal = profile?.monthly_income_goal || 0;
  const current = profile?.current_income || 0;
  const stepIndex = activeOffer ? 2 : CURRENT_STEP_INDEX;

  return (
    <div>
      <PageHeader title={`Hi ${firstName}`} subtitle="Here's your freelance business at a glance." />

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-app-muted uppercase tracking-wide mb-3">Your path</h2>
        <div className="flex flex-col md:flex-row md:items-stretch gap-2">
          {PATH_STEPS.map((s, i) => (
            <div key={s.label} className="contents">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg border-2 px-4 py-3 md:flex-1",
                  i === stepIndex ? "border-app-primary bg-app-surface" : "border-app-border bg-app-bg"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0",
                    i <= stepIndex
                      ? "bg-app-primary text-app-on-primary"
                      : "bg-app-surface text-app-muted border border-app-border"
                  )}
                >
                  {i < stepIndex ? <Check className="w-4 h-4" strokeWidth={3} /> : i + 1}
                </div>
                <div className={cn("text-sm font-medium", i > stepIndex ? "text-app-muted" : "text-app-text")}>
                  {s.label}
                </div>
                {i === stepIndex && (
                  <span className="ml-auto text-xs font-semibold text-app-primary">Current</span>
                )}
              </div>
              {i < PATH_STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-app-border px-1 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-app-muted uppercase tracking-wide mb-3">Your tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToolCard
            icon={FileText}
            name="Offer Builder"
            description="Build your freelance offer, price, and offer doc."
            to="/offer-builder"
          />
        </div>
      </section>

      {activeOffer ? (
        <ActiveOfferCard offer={activeOffer} />
      ) : (
        <section className="mb-6 rounded-xl border border-app-border bg-app-surface p-6">
          <h3 className="text-lg font-semibold text-app-text">Build your first offer</h3>
          <p className="text-app-muted text-sm mt-2 mb-4 max-w-lg">
            Answer three quick questions and walk away with a clear offer, a price, and a one-page offer document.
          </p>
          <Button asChild className="rounded-full h-11 px-6 bg-app-primary text-app-on-primary hover:bg-app-text">
            <Link to="/offer-builder">
              Start <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </section>
      )}

      <section className="rounded-xl border border-app-border bg-app-bg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-app-text">Your goal</h3>
          <Link
            to="/profile"
            className="text-sm font-medium text-app-primary inline-flex items-center gap-1 hover:underline"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-app-surface p-4">
            <div className="text-xs text-app-muted uppercase tracking-wide">Monthly goal</div>
            <div className="text-2xl font-semibold text-app-text mt-1">${goal.toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-app-surface p-4">
            <div className="text-xs text-app-muted uppercase tracking-wide">Current income</div>
            <div className="text-2xl font-semibold text-app-text mt-1">${current.toLocaleString()}</div>
          </div>
        </div>
      </section>
    </div>
  );
}