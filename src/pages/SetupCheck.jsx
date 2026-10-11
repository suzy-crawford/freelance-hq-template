import React, { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { runLibraryChecks } from "@/lib/offerChecks";
import { Check, X } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { PageSkeleton } from "@/components/shared/Skeleton";

export default function SetupCheck() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(runLibraryChecks());
  }, []);

  if (!result) {
    return (
      <div className="flex items-center justify-center py-24">
        <PageSkeleton />
      </div>
    );
  }

  const allPassed = result.passed === result.total;

  return (
    <div>
      <PageHeader title="Setup check" subtitle="Verifies your Offer Builder files are set up correctly." />

      <div className={cn("rounded-xl border-2 p-5", allPassed ? "border-app-success" : "border-app-danger")}>
        <div className={cn("text-lg font-semibold", allPassed ? "text-app-success" : "text-app-danger")}>
          {result.passed} of {result.total} checks passed
        </div>
        <p className="text-app-text text-sm mt-1">
          {allPassed
            ? "Your Offer Builder is set up correctly."
            : "Some checks failed. Send a screenshot of this page for help."}
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {result.results.map((r, i) => (
          <li key={i} className="rounded-lg border border-app-border bg-app-bg p-4">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  r.pass ? "bg-app-success text-app-on-primary" : "bg-app-danger text-app-on-primary"
                )}
              >
                {r.pass ? <Check className="w-3 h-3" strokeWidth={3} /> : <X className="w-3 h-3" strokeWidth={3} />}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-app-text">{r.name}</div>
                <div className="text-xs text-app-muted mt-1 break-words">Expected: {r.expected}</div>
                <div className="text-xs text-app-muted break-words">Actual: {r.actual}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}