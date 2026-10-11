import React from "react";
import { Input } from "@/components/ui/input";
import { INCOME_PRESETS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function IncomeGoalInput({ preset, customGoal, onPresetChange, onCustomGoalChange }) {
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