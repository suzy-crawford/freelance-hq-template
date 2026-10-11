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
      <PageHeader title="My Profile" subtitle="Update your details anytime. These power your recommendations." />
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