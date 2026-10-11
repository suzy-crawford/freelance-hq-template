import React, { useState } from "react";
import WizardShell from "@/components/shared/WizardShell";
import SelectableCard from "@/components/shared/SelectableCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES, SERVICE_QUIZ, scoreServiceQuiz, getOfferService } from "@/lib/offerData";

const SERVICE_KEYS = ["meta_ads", "organic_social", "other"];

export default function ScreenServices({ offer, onDone }) {
  const [interested, setInterested] = useState(offer.interested_services || []);
  const [helpMe, setHelpMe] = useState(false);
  const [answers, setAnswers] = useState({});
  const [customName, setCustomName] = useState(offer.custom_service_name || "");
  const [customDetails, setCustomDetails] = useState(offer.custom_service_details || "");

  const toggleService = (key) => {
    setHelpMe(false);
    setInterested((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const selectHelpMe = () => {
    setHelpMe(true);
    setInterested([]);
  };

  const chooseRecommended = (key) => {
    setInterested([key]);
    setHelpMe(false);
  };

  const allAnswered = SERVICE_QUIZ.every((q) => answers[q.id] !== undefined);
  const result = allAnswered ? scoreServiceQuiz(answers) : null;

  const hasOther = interested.includes("other");
  const hasAds = interested.includes("meta_ads");
  const hasSocial = interested.includes("organic_social");

  const canContinue = interested.length > 0 && (!hasOther || customName.trim().length > 0);

  const handleContinue = () => {
    onDone(
      {
        interested_services: interested,
        custom_service_name: customName,
        custom_service_details: customDetails,
        primary_service: getOfferService(interested),
      },
      2
    );
  };

  const courseLabels = [hasAds && SERVICES.meta_ads.label, hasSocial && SERVICES.organic_social.label]
    .filter(Boolean)
    .join(" and ");

  return (
    <WizardShell
      step={1}
      totalSteps={3}
      title="What would you like to offer?"
      helper="We recommend starting with one service. You can always add more later."
      onContinue={handleContinue}
      continueDisabled={!canContinue}
    >
      <div className="space-y-3">
        {SERVICE_KEYS.map((key) => (
          <SelectableCard
            key={key}
            title={SERVICES[key].label}
            description={SERVICES[key].description}
            selected={interested.includes(key)}
            onSelect={() => toggleService(key)}
          />
        ))}
        <SelectableCard
          title="Help Me Decide"
          description="Not sure yet? Answer 4 quick questions."
          selected={helpMe}
          onSelect={selectHelpMe}
        />
      </div>

      {helpMe && (
        <div className="mt-6 space-y-5">
          {SERVICE_QUIZ.map((q) => (
            <div key={q.id}>
              <div className="text-sm font-semibold text-app-text mb-2">{q.question}</div>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <SelectableCard
                    key={opt.label}
                    title={opt.label}
                    selected={answers[q.id] === i}
                    onSelect={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                  />
                ))}
              </div>
            </div>
          ))}

          {result && (
            <div className="rounded-xl border-2 border-app-primary bg-app-surface p-5">
              <p className="text-app-text">{result.message}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {result.recommendation ? (
                  <Button className="rounded-full" onClick={() => chooseRecommended(result.recommendation)}>
                    Choose {SERVICES[result.recommendation].label}
                  </Button>
                ) : (
                  <>
                    <Button className="rounded-full" onClick={() => chooseRecommended("meta_ads")}>
                      Choose {SERVICES.meta_ads.label}
                    </Button>
                    <Button className="rounded-full" onClick={() => chooseRecommended("organic_social")}>
                      Choose {SERVICES.organic_social.label}
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {hasOther && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-app-text">What service?</label>
            <Input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Email marketing"
              className="mt-1 h-11"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-app-text">Describe it in one sentence (optional)</label>
            <Textarea
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )}

      {hasAds && hasSocial && (
        <p className="mt-4 text-sm text-app-muted">
          Your offer will include both. That's more work each month, so the price is higher.
        </p>
      )}
      {hasOther && (hasAds || hasSocial) && (
        <p className="mt-4 text-sm text-app-muted">
          Your offer will be built around {courseLabels}. We'll mention {customName || "your service"} as something you
          can add later.
        </p>
      )}
    </WizardShell>
  );
}