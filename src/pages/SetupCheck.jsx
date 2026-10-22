import React, { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { runLibraryChecks } from "@/lib/offerChecks";
import { Check, X } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { PageSkeleton } from "@/components/shared/Skeleton";

// Is this an exact copy of the template? Loaded on demand (it reads every source file).
function CopyCheck() {
  const [copy, setCopy] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    import("@/lib/copyCheck")
      .then((m) => m.runCopyCheck())
      .then(setCopy)
      .catch((e) => setError(e.message || String(e)));
  }, []);
  if (error) {
    return (
      <div className="rounded-xl border-2 border-app-danger p-5 mb-6">
        <div className="text-lg font-semibold text-app-danger">Copy check couldn't run</div>
        <p className="text-app-text text-sm mt-1">{error}</p>
      </div>
    );
  }
  if (!copy) {
    return (
      <div className="rounded-xl border-2 border-app-border p-5 mb-6">
        <div className="text-lg font-semibold text-app-text">Checking your copy...</div>
        <p className="text-app-muted text-sm mt-1">Comparing every file in your app with the template.</p>
      </div>
    );
  }
  const exact = copy.matched === copy.total;
  const off = [...copy.changed.map((f) => ({ ...f, how: "changed" })), ...copy.missing.map((f) => ({ ...f, how: "missing" }))];
  return (
    <div className={cn("rounded-xl border-2 p-5 mb-6", exact ? "border-app-success" : "border-app-danger")}>
      <div className={cn("text-lg font-semibold", exact ? "text-app-success" : "text-app-danger")}>
        Copy check: {copy.matched} of {copy.total} files match version {copy.version}
      </div>
      <p className="text-app-text text-sm mt-1">
        {exact
          ? "Your app is an exact copy of Freelance HQ. Every tool is the real one."
          : `Some files aren't exact copies. In Base44, send this: "Redo part ${copy.parts.join(" and part ")} of COPY.md exactly, then stop." Then run this check again.`}
      </p>
      {!exact && (
        <ul className="mt-3 space-y-1">
          {off.slice(0, 40).map((f) => (
            <li key={f.file} className="text-xs text-app-muted break-words">
              Part {f.part}: {f.file} ({f.how})
            </li>
          ))}
          {off.length > 40 && <li className="text-xs text-app-muted">and {off.length - 40} more</li>}
        </ul>
      )}
    </div>
  );
}

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
      <PageHeader title="Setup check" subtitle="Verifies your copy of Freelance HQ is complete and exact." />

      <CopyCheck />

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