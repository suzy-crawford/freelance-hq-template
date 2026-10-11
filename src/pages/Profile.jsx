import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import SelectableCard from "@/components/shared/SelectableCard";
import IncomeGoalInput from "@/components/shared/IncomeGoalInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/lib/ProfileContext";
import { EXPERIENCE_OPTIONS, COUNTRIES } from "@/lib/constants";
import { getThemeChoice, setThemeChoice } from "@/lib/theme";
import { APP_VERSION, isNewer, fetchLatest, updatePrompt } from "@/lib/version";
import CopyButton from "@/components/shared/CopyButton";

function VersionSetting() {
  const [state, setState] = React.useState({ status: "idle" });
  const check = async () => {
    setState({ status: "checking" });
    try {
      const latest = await fetchLatest();
      setState(isNewer(latest.version, APP_VERSION) ? { status: "update", latest } : { status: "current" });
    } catch {
      setState({ status: "error" });
    }
  };
  return (
    <div className="field my-8">
      <span className="label">App version</span>
      <p className="text-app-text m-0">You're on version {APP_VERSION}.</p>
      <div>
        <button type="button" className="btn btn-quiet" onClick={check} disabled={state.status === "checking"}>
          {state.status === "checking" ? "Checking..." : "Check for updates"}
        </button>
      </div>
      {state.status === "current" && <p className="hint">You have the newest version.</p>}
      {state.status === "error" && <p className="hint">Couldn't check right now. Try again in a minute.</p>}
      {state.status === "update" && (
        <div className="flex flex-col gap-2">
          <p className="text-app-text m-0">Version {state.latest.version} is ready. Copy the prompt, open your app in Base44, switch the chat to Discuss mode, paste it and send. Your data stays.</p>
          <div>
            <CopyButton text={updatePrompt(state.latest)} label="Copy update prompt" />
          </div>
        </div>
      )}
    </div>
  );
}

function AppearanceSetting() {
  const [choice, setChoice] = React.useState(getThemeChoice());
  const pick = (c) => {
    setChoice(c);
    setThemeChoice(c);
  };
  return (
    <div className="field my-8">
      <span className="label">Appearance</span>
      <div className="choice">
        {[
          { id: "light", label: "Day" },
          { id: "dark", label: "Night" },
          { id: "auto", label: "Auto" },
        ].map((o) => (
          <button key={o.id} type="button" aria-pressed={choice === o.id} onClick={() => pick(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <p className="note">Auto follows your phone or computer setting.</p>
    </div>
  );
}

export default function Profile() {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
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

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        first_name: firstName.trim(),
        business_name: businessName.trim(),
        experience_level: experience,
        monthly_income_goal: monthlyGoal,
        current_income: Number(currentIncome) || 0,
        country,
      });
      toast({ title: "Saved", description: "Your profile has been updated." });
    } finally {
      setSaving(false);
    }
  };

  const canSave =
    !saving && firstName.trim() && monthlyGoal !== null && !isNaN(monthlyGoal);

  return (
    <div>
      <PageHeader title="Settings" subtitle="Update your details anytime. These power your recommendations." />
      <AppearanceSetting />
      <VersionSetting />
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-app-muted uppercase tracking-wide">About you</h2>
          <div>
            <Label htmlFor="p_firstName" className="text-app-text font-medium">First name</Label>
            <Input
              id="p_firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1.5 h-12 rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="p_businessName" className="text-app-text font-medium">
              Business name <span className="text-app-muted font-normal">(optional)</span>
            </Label>
            <Input
              id="p_businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1.5 h-12 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-app-muted uppercase tracking-wide">
            Where are you right now?
          </h2>
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

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-app-muted uppercase tracking-wide">Your goal</h2>
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
            <Label htmlFor="p_currentIncome" className="text-app-text font-medium">
              Current freelance income per month
            </Label>
            <Input
              id="p_currentIncome"
              type="number"
              min="0"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="mt-1.5 h-12 rounded-lg max-w-xs"
            />
          </div>
          <div>
            <Label htmlFor="p_country" className="text-app-text font-medium">Country</Label>
            <select
              id="p_country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1.5 h-12 rounded-lg max-w-xs w-full bg-app-bg border border-app-border px-3 text-app-text focus:outline-none focus:border-app-primary"
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-full h-11 px-8 bg-app-primary text-app-on-primary hover:bg-app-text"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>

        <div className="pt-4 border-t border-app-border">
          <Link to="/setup-check" className="text-sm text-app-muted underline hover:text-app-text">
            Check my setup
          </Link>
        </div>
      </div>
    </div>
  );
}