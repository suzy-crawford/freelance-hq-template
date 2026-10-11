import React from "react";
import { Check } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

export default function SelectableCard({ title, description, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "w-full text-left rounded-xl border-2 bg-app-bg p-5 transition-colors duration-150",
        selected ? "border-app-primary" : "border-app-border hover:border-app-text",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-app-text text-base">{title}</div>
          {description && <div className="text-app-muted text-sm mt-1">{description}</div>}
        </div>
        <div
          className={cn(
            "mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            selected ? "bg-app-primary border-app-primary" : "border-app-border"
          )}
        >
          {selected && <Check className="w-3.5 h-3.5 text-app-on-primary" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}