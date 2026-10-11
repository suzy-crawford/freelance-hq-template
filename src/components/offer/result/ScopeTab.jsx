import React from "react";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/CopyButton";
import { buildScopeOfWork, scopeOfWorkToText } from "@/lib/offerLogic";

function Highlight({ text }) {
  const parts = String(text || "").split(/(\[[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span key={i} className="bg-app-surface px-1 rounded">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function ScopeTab({ offer, profile }) {
  const sow = buildScopeOfWork(offer, profile);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-app-text">Scope of work</h2>
      <p className="text-app-muted text-sm mt-1 max-w-[620px]">
        Exactly what you will and won't do for a client. Send it with your offer when someone is ready to start.
      </p>

      <div className="sticky top-0 z-10 mt-4 -mx-5 px-5 py-3 bg-app-bg border-b border-app-border flex flex-wrap items-center gap-2">
        <Button
          onClick={() => window.print()}
          className="rounded-full h-11 px-5 bg-app-primary text-app-on-primary hover:bg-app-text"
        >
          Save as PDF
        </Button>
        <CopyButton text={scopeOfWorkToText(sow)} label="Copy" />
      </div>

      <div
        className="print-area mt-5 mx-auto rounded-lg border border-app-border bg-app-bg text-app-text"
        style={{ maxWidth: 680, padding: "40px 40px" }}
      >
        <h1 className="text-2xl font-semibold">{sow.title}</h1>
        <p className="text-sm mt-1 text-app-muted">
          <Highlight text={sow.prepared_line} />
        </p>

        <div className="mt-6 space-y-5">
          {sow.sections.map((s, i) => (
            <div key={i}>
              <div className="text-xs font-semibold uppercase tracking-widest text-app-muted">{s.title}</div>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                {s.items.map((it, j) => (
                  <li key={j}>
                    <Highlight text={it} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-app-muted">
          <Highlight text={sow.footer} />
        </p>
      </div>
    </div>
  );
}