import React from "react";
import { CopyButton } from "@/components/shared/ToolKit";

// A result section as an app panel: numbered title in the panel head, content in the body.
export default function SectionCard({ number, title, copyText, children }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <span className="hint tabular-nums">{number}</span>
        <h2 className="panel-title">{title}</h2>
        {copyText ? <CopyButton text={copyText} className="ml-auto flex-shrink-0" /> : null}
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}
