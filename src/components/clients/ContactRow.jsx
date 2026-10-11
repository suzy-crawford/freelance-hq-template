import React from "react";
import { ExternalLink } from "@/components/brand/icons";
import CopyIcon from "@/components/shared/CopyIcon";

// One line of contact info: label, value, copy icon, and an optional "Visit" link
// that opens in a new tab (so clicking never takes the member out of the app).
export default function ContactRow({ icon: Icon, value, display, copyLabel, visitUrl }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 min-w-0">
      {Icon && <Icon className="w-4 h-4 text-app-muted flex-shrink-0" />}
      <span className="text-sm text-app-text truncate">{display || value}</span>
      <CopyIcon text={value} label={copyLabel} />
      {visitUrl && (
        <a
          href={visitUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-app-muted hover:text-app-text whitespace-nowrap"
        >
          Visit <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
