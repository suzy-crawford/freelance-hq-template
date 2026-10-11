import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function WizardShell({
  step,
  totalSteps,
  title,
  helper,
  onBack,
  onContinue,
  continueDisabled,
  continueLabel = "Continue",
  children,
}) {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <div className="max-w-2xl w-full mx-auto px-5 pt-8 pb-32 md:pb-12 flex-1">
        <div className="mb-6">
          <div className="text-sm font-medium text-app-muted mb-2">
            Step {step} of {totalSteps}
          </div>
          <div className="h-2 w-full rounded-full bg-app-surface overflow-hidden">
            <div
              className="h-full bg-app-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-app-text mb-2">{title}</h1>
        {helper && <p className="text-app-muted text-base mb-6">{helper}</p>}
        <div className="mt-6">{children}</div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-app-bg border-t border-app-border md:static md:border-0">
        <div className="max-w-2xl w-full mx-auto px-5 py-4 flex items-center gap-3">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="rounded-full h-11 px-6 border-app-border text-app-text"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className="rounded-full h-11 px-6 ml-auto bg-app-primary text-app-on-primary hover:bg-app-text"
          >
            {continueLabel}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}