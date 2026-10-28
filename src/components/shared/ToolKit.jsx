import React, { useEffect, useState } from "react";
import { Copy, Check } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { LIBS_REF, libsReady, loadLibs } from "@/lib/libs";

// What every AI tool's screens share: the gate that loads the tools' libraries, the "AI isn't switched on" notice,
// the tool header, loading placeholders, the copy button and images. Each tool's build brings this file and imports
// nothing else from the HQ beyond files every HQ has had since 3.0.0, so a tool builds into an older HQ unchanged.

const REPO = "suzy-crawford/freelance-hq-template";
const RAW = `https://raw.githubusercontent.com/${REPO}/${LIBS_REF}`;

// Images load from the template, pinned to the version these files come from.
export const asset = (path) => `https://cdn.jsdelivr.net/gh/${REPO}@${LIBS_REF}/public${path}`;

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

// The message that deploys one backend function Base44 wrote but didn't switch on.
export function deployMessage(name) {
  const file = `base44/functions/${name}/entry.ts`;
  return `Deploy my backend function ${name}. Its code is in ${file}. If that file isn't in my app, create it exactly from ${RAW}/${file} first. Don't change the code and don't call or test it. When ${name} appears in my app's list of backend functions, reply "${name} is deployed." and stop.`;
}

// Shown at the top of every page when an AI call hits a backend function that isn't deployed (callAI.js).
export function AIOffNotice() {
  const [name, setName] = useState(null);
  useEffect(() => {
    const show = (e) => setName(e.detail?.name || null);
    window.addEventListener("sf-ai-off", show);
    return () => window.removeEventListener("sf-ai-off", show);
  }, []);
  if (!name) return null;
  const message = deployMessage(name);
  return (
    <section className="lp-card mb-6" role="alert">
      <div className="lp-body">
        <h2 className="ab-title">Your AI isn't switched on yet</h2>
        <p className="ab-muted">
          Base44 wrote this tool's AI function ({name}) but didn't switch it on. Send this message in Base44, wait until it replies "{name} is
          deployed.", then try again.
        </p>
        <div className="lp-codebox">
          <div className="lp-codebox-bar">
            <span className="lp-codebox-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>Message for Base44</span>
          </div>
          <pre tabIndex={0} aria-label="Message for Base44">{message}</pre>
        </div>
        <div className="lp-actions">
          <CopyButton text={message} label="Copy the message" />
          <button type="button" className="lp-link" onClick={() => setName(null)}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
}

// A tool page that shows once the tools' libraries are in (libs.js), with the "AI isn't switched on" notice above it.
export function withLibs(Page) {
  return function ToolPage(props) {
    const [state, setState] = useState(libsReady ? "ready" : "loading");
    const [error, setError] = useState(null);
    useEffect(() => {
      if (state === "ready") return;
      loadLibs().then(
        () => setState("ready"),
        (e) => {
          setError(e);
          setState("error");
        }
      );
    }, [state]);
    if (state === "loading") return <PageSkeleton />;
    if (state === "error")
      return (
        <div className="max-w-xl mx-auto py-24 px-6 text-center">
          <h1 className="text-2xl font-semibold">This tool didn't load</h1>
          <p className="mt-3 text-app-muted">Check your internet connection, then refresh the page.</p>
          {error?.message && <p className="mt-3 text-xs text-app-muted break-words">Details: {error.message}</p>}
        </div>
      );
    return (
      <>
        <AIOffNotice />
        <Page {...props} />
      </>
    );
  };
}
