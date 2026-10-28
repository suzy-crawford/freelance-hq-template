import React, { useEffect, useState } from "react";
import { CopyButton } from "@/components/shared/ToolKit";
import { APP_VERSION, isNewer, fetchLatest, updatePrompt } from "@/lib/version";

// HQ page parts: the page header and the update banner. Loading placeholders, the tool header and the copy button
// are in ToolKit.jsx, which the tools share.

// App page header (brand-kit app.css): Gloock title, one muted line, actions on the right.
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Shows on Home when the member template has a newer version. Free: a plain fetch, no AI.
export function UpdateBanner() {
  const [latest, setLatest] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetchLatest()
      .then((data) => {
        if (!isNewer(data.version, APP_VERSION)) return;
        try {
          if (localStorage.getItem("sf-update-dismissed") === data.version) return;
        } catch {
          /* storage unavailable */
        }
        setLatest(data);
      })
      .catch(() => {});
  }, []);

  if (!latest || hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("sf-update-dismissed", latest.version);
    } catch {
      /* storage unavailable */
    }
    setHidden(true);
  };

  return (
    <section className="panel p-5 flex flex-col gap-3" aria-label="Update available" style={{ background: "var(--lavender-soft)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="panel-title m-0">An update is ready (version {latest.version})</h2>
        <button type="button" className="chip" onClick={dismiss}>
          Not now
        </button>
      </div>
      {latest.notes?.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-sm text-app-text">
          {latest.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
      <p className="text-sm text-app-text m-0">
        To update: copy the prompt, open your app in Base44, switch the chat to Discuss mode, paste it and send. Your offers, lead list and
        campaigns stay. It uses a few Base44 credits.
      </p>
      <div>
        <CopyButton text={updatePrompt(latest)} label="Copy update prompt" />
      </div>
    </section>
  );
}
