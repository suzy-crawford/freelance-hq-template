var e=`import React, { useState } from "react";
import { Info } from "@/components/brand/icons";

export default function InfoTip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="text-app-muted hover:text-app-text focus:outline-none"
        aria-label="More info"
      >
        <Info className="w-4 h-4" />
      </button>
      {open && (
        <span className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-app-text text-app-on-primary text-xs px-3 py-2 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}`;export{e as default};