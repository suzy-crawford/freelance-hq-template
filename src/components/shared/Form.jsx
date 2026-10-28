import * as React from "react";
import { ArrowLeft } from "@/components/brand/icons";
import { INCOME_PRESETS } from "@/lib/hq";
import { cn } from "@/lib/utils";

// Plain label, button, input and text box for the HQ's pages, plus the setup wizard's pieces. They use no extra packages on purpose: a page that loads on
// demand must not pull in a package the app didn't load at startup, or Base44's preview can get stuck
// rebuilding its packages ("Failed to fetch dynamically imported module").

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
));
Label.displayName = "Label";

const VARIANTS = {
  default: "bg-app-primary text-app-on-primary",
  outline: "border border-app-border-strong bg-transparent text-app-text",
  ghost: "text-app-text active:bg-app-surface",
  link: "text-app-text underline underline-offset-4 decoration-[1.5px]",
};
const SIZES = {
  default: "h-10 px-4",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "sf-press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold leading-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      VARIANTS[variant] || VARIANTS.default,
      SIZES[size] || SIZES.default,
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex min-h-11 w-full rounded-sm border-[1.5px] border-app-border-strong bg-app-raised px-3 py-2 text-base text-app-text file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-app-muted disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[60px] w-full rounded-sm border-[1.5px] border-app-border-strong bg-app-raised px-3 py-2 text-base text-app-text placeholder:text-app-muted disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Pick-one / pick-many option, kit 2.0: navy outline and filled dot when chosen.
export function SelectableCard({ title, description, selected, onSelect, disabled }) {
  return (
    <button type="button" role="checkbox" aria-checked={!!selected} onClick={onSelect} disabled={disabled} className={cn("lp-option", disabled && "opacity-50 cursor-not-allowed")}>
      <span className="lp-radio" />
      <span className="lp-option-body">
        <span className="lp-option-name">{title}</span>
        {description && <span className="lp-option-text">{description}</span>}
      </span>
    </button>
  );
}

export function IncomeGoalInput({ preset, customGoal, onPresetChange, onCustomGoalChange }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {INCOME_PRESETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onPresetChange(String(amt))}
            className={cn(
              "rounded-full h-11 px-5 text-sm font-medium border-2 transition-colors",
              preset === String(amt)
                ? "bg-app-primary text-app-on-primary border-app-primary"
                : "bg-app-bg text-app-text border-app-border hover:border-app-text"
            )}
          >
            ${amt.toLocaleString()}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPresetChange("custom")}
          className={cn(
            "rounded-full h-11 px-5 text-sm font-medium border-2 transition-colors",
            preset === "custom"
              ? "bg-app-primary text-app-on-primary border-app-primary"
              : "bg-app-bg text-app-text border-app-border hover:border-app-text"
          )}
        >
          Custom
        </button>
      </div>
      {preset === "custom" && (
        <div className="mt-3">
          <Input
            type="number"
            min="0"
            value={customGoal}
            onChange={(e) => onCustomGoalChange(e.target.value)}
            placeholder="Enter your monthly goal"
            className="h-11 rounded-lg max-w-xs"
          />
        </div>
      )}
    </div>
  );
}

// Kit 2.0 step frame, same as the Meta Ads Builder and Content Creator: page title and step track
// in the header, one card per step, Back bottom left and the one main button bottom right.
export function WizardShell({
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
