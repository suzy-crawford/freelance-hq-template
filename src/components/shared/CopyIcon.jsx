import React, { useState } from "react";
import { Copy, Check } from "@/components/brand/icons";

// Small icon-only copy button (for websites, phone numbers, handles).
export default function CopyIcon({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  if (!text) return null;
  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-app-border text-app-muted hover:text-app-text hover:border-app-text flex-shrink-0"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
