import React, { useEffect, useState } from "react";
import { Copy, Check } from "@/components/brand/icons";
import { APP_VERSION, isNewer, fetchLatest, updatePrompt } from "@/lib/version";
import { cn } from "@/lib/utils";

// Page parts shared by the HQ and the tools: loading placeholders, headers, the copy button and the update banner.

// Brand loading state: placeholders shaped like the content that's coming, never a spinner.
export function SkeletonLine({ className }) {
  return <div className={cn("sf-skel h-3", className)} />;
}

export function PageSkeleton({ className }) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto px-4 py-10 space-y-4", className)} aria-busy="true" aria-label="Loading">
      <SkeletonLine className="h-3 w-24" />
      <SkeletonLine className="h-7 w-2/3" />
      <div className="pt-4 space-y-3">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-11/12" />
        <SkeletonLine className="w-4/5" />
      </div>
      <div className="pt-6 space-y-3">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-3/4" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 3, className }) {
  return (
    <div className={cn("border-t border-app-border", className)} aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="py-5 border-b border-app-border space-y-2">
          <SkeletonLine className="h-4 w-1/2" />
          <SkeletonLine className="w-4/5" />
        </div>
      ))}
    </div>
  );
}

// Tool page header (brand kit v3): small "AI tool" label, the tool name in Gloock,
// the one-sentence description, optional action on the right, optional underline tabs below.
export function ToolHero({ title, subtitle, right, tabs, activeTab, onTabChange, label = "AI tool", tag, icon: Icon }) {
  return (
    <header>
      <div className="tool-head">
        {Icon && (
          <span className="tool-head-icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="tool-label">{label}</div>
          {tag ? (
            <div className="title-row">
              <h1 className="page-title">{title}</h1>
              {tag}
            </div>
          ) : (
            <h1 className="page-title">{title}</h1>
          )}
          {subtitle && <p className="lede">{subtitle}</p>}
        </div>
        {right}
      </div>
      {tabs && (
        <nav className="tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className="tab bg-transparent border-x-0 border-t-0 cursor-pointer"
              aria-selected={activeTab === t.id}
              onClick={() => onTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CopyButton({ text, label = "Copy", className }) {
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
    <button type="button" onClick={handleCopy} className={`btn-outline-grad ${className || ""}`}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : label}
    </button>
  );
}

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
