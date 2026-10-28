import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WizardShell, SelectableCard, IncomeGoalInput, Input, Label } from "@/components/shared/Form";
import { useProfile } from "@/lib/ProfileContext";
import { EXPERIENCE_OPTIONS, COUNTRIES } from "@/lib/hq";

export default function Onboarding() {
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(profile?.onboarding_step || 1);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [businessName, setBusinessName] = useState(profile?.business_name || "");
  const [experience, setExperience] = useState(profile?.experience_level || "");
  const [goalPreset, setGoalPreset] = useState(() => {
    const g = profile?.monthly_income_goal;
    if (g && [1000, 3000, 5000].includes(g)) return String(g);
    if (g) return "custom";
    return "";
  });
  const [customGoal, setCustomGoal] = useState(() => {
    const g = profile?.monthly_income_goal;
    return g && ![1000, 3000, 5000].includes(g) ? String(g) : "";
  });
  const [currentIncome, setCurrentIncome] = useState(
    profile?.current_income != null ? String(profile.current_income) : "0"
  );
  const [country, setCountry] = useState(profile?.country || "United States");
  const [saving, setSaving] = useState(false);

  const monthlyGoal = goalPreset === "custom" ? Number(customGoal) : goalPreset ? Number(goalPreset) : null;

  const handleContinue = async () => {
    setSaving(true);
    try {
      if (step === 1) {
        await updateProfile({
          first_name: firstName.trim(),
          business_name: businessName.trim(),
          onboarding_step: 2,
        });
        setStep(2);
      } else if (step === 2) {
        await updateProfile({ experience_level: experience, onboarding_step: 3 });
        setStep(3);
      } else if (step === 3) {
        await updateProfile({
          monthly_income_goal: monthlyGoal,
          current_income: Number(currentIncome) || 0,
          country,
          onboarding_complete: true,
        });
        navigate("/");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const titles = [
    "Let's start with you",
    "Where are you right now?",
    "What are you working toward?",
  ];
  const helpers = ["Just a couple of details to personalize your experience.", undefined, undefined];

  const continueDisabled =
    saving ||
    (step === 1
      ? !firstName.trim()
      : step === 2
      ? !experience
      : monthlyGoal === null || isNaN(monthlyGoal));

  return (
    <WizardShell
      standalone
      headTitle="Welcome"
      headSub="Three quick questions to set up your account."
      steps={["About you", "Where you are", "Your goal"]}
      step={step}
      totalSteps={3}
      title={titles[step - 1]}
      helper={helpers[step - 1]}
      onBack={handleBack}
      onContinue={handleContinue}
      continueDisabled={continueDisabled}
      continueLabel={step === 3 ? "Finish" : "Continue"}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="text-app-text font-medium">
              First name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="mt-1.5 h-12 rounded-lg"
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="businessName" className="text-app-text font-medium">
              Business name <span className="text-app-muted font-normal">(optional)</span>
            </Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="What should we call your business?"
              className="mt-1.5 h-12 rounded-lg"
            />
            <p className="text-app-muted text-sm mt-1.5">
              You can leave this blank. You do not need a business name to start.
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="space-y-3">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <SelectableCard
                key={opt.value}
                title={opt.title}
                description={opt.description}
                selected={experience === opt.value}
                onSelect={() => setExperience(opt.value)}
              />
            ))}
          </div>
          <p className="text-app-muted text-sm mt-4">
            This helps us recommend the right package and price for where you are. You can change it
            later.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <Label className="text-app-text font-medium">Monthly income goal</Label>
            <div className="mt-1.5">
              <IncomeGoalInput
                preset={goalPreset}
                customGoal={customGoal}
                onPresetChange={setGoalPreset}
                onCustomGoalChange={setCustomGoal}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="currentIncome" className="text-app-text font-medium">
              Current freelance income per month
            </Label>
            <Input
              id="currentIncome"
              type="number"
              min="0"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="mt-1.5 h-12 rounded-lg max-w-xs"
            />
            <p className="text-app-muted text-sm mt-1.5">It's completely fine if this is $0.</p>
          </div>
          <div>
            <Label htmlFor="country" className="text-app-text font-medium">
              Country
            </Label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1.5 h-12 rounded-lg max-w-xs w-full bg-app-bg border border-app-border px-3 text-app-text focus:outline-none focus:border-app-primary"
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </WizardShell>
  );
}