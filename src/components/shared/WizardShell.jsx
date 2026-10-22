import React from "react";
import { ArrowLeft } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

// Kit 2.0 step frame, same as the Meta Ads Builder and Content Creator: page title and step track
// in the header, one card per step, Back bottom left and the one main button bottom right.
export default function WizardShell({
  step,
  totalSteps,
  steps,
  headTitle,
  headSub,
  standalone,
  title,
  helper,
  onBack,
  onContinue,
  continueDisabled,
  continueLabel = "Continue",
  children,
}) {
  const labels = steps || Array.from({ length: totalSteps }, (_, i) => `Step ${i + 1}`);
  return (
    <div className={cn("lp ab wz", standalone && "wz-standalone")}>
      <header className="lp-head">
        <div className="min-w-0 flex-1">
          {headTitle && <h1 className="lp-title">{headTitle}</h1>}
          {headSub && <div className="lp-sub">{headSub}</div>}
        </div>
        <ol className="lp-track ab-track" aria-label="Steps">
          {labels.map((label, i) => (
            <li key={label} className={cn("lp-step", i + 1 < step && "is-done", i + 1 === step && "is-current")} aria-current={i + 1 === step ? "step" : undefined}>
              <span className="wz-step">
                <i />
                {label}
              </span>
            </li>
          ))}
        </ol>
      </header>
      <div className="ab-solo">
        <section className="lp-card">
          <div className="lp-body">
            <h2 className="ab-title">{title}</h2>
            {helper && <p className="mb-intro">{helper}</p>}
            <div className="wz-body">{children}</div>
          </div>
          <div className="lp-cardfoot">
            {step > 1 && onBack && (
              <button type="button" className="lp-link lp-back-link" onClick={onBack}>
                <ArrowLeft /> Back
              </button>
            )}
            <div className="ab-foot-right">
              <button type="button" className="lp-btn" onClick={onContinue} disabled={continueDisabled}>
                {continueLabel} →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
