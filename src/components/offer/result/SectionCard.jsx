import React from "react";
import CopyButton from "@/components/shared/CopyButton";

export default function SectionCard({ number, title, copyText, children }) {
  return (
    <section className="rounded-2xl border border-app-border bg-app-bg p-6 md:p-7">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-app-muted">{number}</div>
          <h2 className="text-lg font-semibold text-app-text mt-1">{title}</h2>
        </div>
        {copyText ? <CopyButton text={copyText} className="flex-shrink-0" /> : null}
      </div>
      {children}
    </section>
  );
}