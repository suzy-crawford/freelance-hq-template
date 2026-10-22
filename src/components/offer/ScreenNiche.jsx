import React, { useState } from "react";
import WizardShell from "@/components/shared/WizardShell";

const OFFER_STEPS = ["What you offer", "Who you help", "About you"];
import SelectableCard from "@/components/shared/SelectableCard";
import { Input } from "@/components/ui/input";
import { NICHES, NICHE_GROUPS, NICHE_SCREEN_COPY } from "@/lib/offerData";

// Screen 2: broad groups first (starting broad is fine), specific niches optional.
export default function ScreenNiche({ offer, onBack, onDone }) {
  const startsSpecific = !!offer.niche && !offer.niche_is_broad;
  const [niche, setNiche] = useState(offer.niche || "");
  const [isBroad, setIsBroad] = useState(!!offer.niche_is_broad);
  const [isCustom, setIsCustom] = useState(!!offer.niche_is_custom);
  const [showSpecific, setShowSpecific] = useState(startsSpecific);
  const [custom, setCustom] = useState(offer.niche_is_custom ? offer.niche || "" : "");

  const pickGroup = (label) => {
    setNiche(label);
    setIsBroad(true);
    setIsCustom(false);
    setShowSpecific(false);
  };

  const pickSpecific = (label) => {
    setNiche(label);
    setIsBroad(false);
    setIsCustom(false);
  };

  const pickCustom = (value) => {
    setCustom(value);
    setNiche(value);
    setIsBroad(false);
    setIsCustom(true);
  };

  const openSpecific = () => {
    setShowSpecific(true);
    if (isBroad) {
      setNiche("");
      setIsBroad(false);
    }
  };

  const chosenNiche = NICHES.find((n) => n.label === niche);
  const canContinue = niche.trim().length > 0;

  return (
    <WizardShell
      steps={OFFER_STEPS}
      headTitle="Offer Builder"
      headSub="Let's build your freelance offer."
      step={2}
      totalSteps={3}
      title={NICHE_SCREEN_COPY.title}
      helper={NICHE_SCREEN_COPY.subtitle}
      onBack={onBack}
      onContinue={() => onDone({ niche: niche.trim(), niche_is_custom: isCustom, niche_is_broad: isBroad }, 3)}
      continueDisabled={!canContinue}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NICHE_GROUPS.map((g) => (
          <SelectableCard
            key={g.id}
            title={g.label}
            description={g.examples}
            selected={isBroad && niche === g.label}
            onSelect={() => pickGroup(g.label)}
          />
        ))}
        <SelectableCard
          title={NICHE_SCREEN_COPY.specificLabel}
          description={NICHE_SCREEN_COPY.specificDescription}
          selected={showSpecific}
          onSelect={openSpecific}
        />
      </div>

      {showSpecific && (
        <div className="mt-6">
          <div className="text-sm font-semibold text-app-text mb-3">Pick a type of business</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {NICHES.map((n) => (
              <SelectableCard
                key={n.id}
                title={n.label}
                description={n.why}
                selected={!isBroad && !isCustom && niche === n.label}
                onSelect={() => pickSpecific(n.label)}
              />
            ))}
            <SelectableCard
              title="Other"
              description="Type the kind of business"
              selected={isCustom}
              onSelect={() => pickCustom(custom)}
            />
          </div>
          {isCustom && (
            <Input
              value={custom}
              onChange={(e) => pickCustom(e.target.value)}
              placeholder="Type the kind of business"
              className="mt-3 h-11"
              autoFocus
            />
          )}
        </div>
      )}

      {canContinue && (
        <div className="mt-6 rounded-xl border border-app-border bg-app-surface p-4">
          <p className="text-app-text font-medium">{niche} it is. You can always change this later.</p>
          {chosenNiche && !isBroad && <p className="text-app-muted text-sm mt-1">{chosenNiche.why}</p>}
        </div>
      )}
    </WizardShell>
  );
}
