import React, { useRef } from "react";
import WizardShell from "@/components/shared/WizardShell";
import { Textarea } from "@/components/ui/textarea";
import AIError from "@/components/offer/AIError";

const CHIPS = [
  { label: "Jobs I've had", text: "I've worked as " },
  { label: "Industries I know", text: "I know the ___ industry because " },
  { label: "Skills I already have", text: "I'm already good at " },
  { label: "People I know", text: "I know business owners who " },
  { label: "Why I'm starting", text: "I'm starting this because " },
];

export default function ScreenAbout({ aboutMe, setAboutMe, onBack, onBuild, error, onRetry }) {
  const ref = useRef(null);

  const addChip = (text) => {
    const current = aboutMe || "";
    const sep = current && !current.endsWith("\n") ? "\n" : "";
    const next = current + sep + text;
    setAboutMe(next);
    requestAnimationFrame(() => {
      const el = ref.current;
      if (el) {
        el.focus();
        el.setSelectionRange(next.length, next.length);
      }
    });
  };

  return (
    <WizardShell
      step={3}
      totalSteps={3}
      title="Tell us a little about yourself"
      helper="Optional. Previous experience, industries you know, or anything you'd like us to consider."
      onBack={onBack}
      onContinue={onBuild}
      continueLabel="Build My Offer"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {CHIPS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => addChip(c.text)}
            className="rounded-full border border-app-border bg-app-bg px-3 py-1.5 text-sm text-app-text hover:border-app-text transition-colors"
          >
            {c.label}
          </button>
        ))}
      </div>

      <Textarea
        ref={ref}
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        rows={7}
        placeholder="For example: I worked at a dental office for 5 years, I love fitness, and I've been running ads for my friend's salon."
      />

      <button
        type="button"
        onClick={onBuild}
        className="mt-4 text-sm font-medium text-app-muted underline hover:text-app-text"
      >
        Skip and build my offer
      </button>

      {error && <AIError message={error} onRetry={onRetry} />}
    </WizardShell>
  );
}