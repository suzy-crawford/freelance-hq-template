import React, { useState } from "react";
import { Copy, Check } from "@/components/brand/icons";
import { Button } from "@/components/ui/button";

export default function CopyButton({ text, label = "Copy", className }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleCopy}
      className={`rounded-full h-9 px-3 text-sm border-app-border text-app-text ${className || ""}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 mr-1" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 mr-1" />
          {label}
        </>
      )}
    </Button>
  );
}