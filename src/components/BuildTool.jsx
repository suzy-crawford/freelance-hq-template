import React, { useEffect, useState } from "react";
import { ToolHero, CopyButton } from "@/components/shared/Page";
import { Check, Wand } from "@/components/brand/icons";
import { TEMPLATE_REPO, TEMPLATE_REF } from "@/lib/version";

// Shown in place of a tool that isn't in the member's app yet: one Base44 message builds it.
// When Base44 finishes, the tool's page file exists and this screen turns into the tool by itself.
const RAW = `${TEMPLATE_REPO.replace("https://github.com/", "https://raw.githubusercontent.com/")}/${TEMPLATE_REF}`;

export function buildMessage(tool) {
  return `Add the ${tool.name} to my app. Open this file and follow it exactly: ${RAW}/builds/${tool.id}.md`;
}

export default function BuildTool({ tool }) {
  const message = buildMessage(tool);
  return (
    <div className="lp">
      <div className="flex flex-col gap-8">
        <ToolHero icon={Wand} label="Build this tool" title={`Build your ${tool.name}`} subtitle={`One message in Base44 adds it to your HQ. It takes about ${tool.minutes} minutes.`} />

        <section className="lp-card">
          <div className="lp-body">
            <h2 className="ab-title">What you'll have</h2>
            <ul className="bt-gets">
              {tool.gets.map((g) => (
                <li key={g}>
                  <Check /> {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-card">
          <div className="lp-body">
            <h2 className="ab-title">Build it</h2>
            <ol className="bt-steps">
              <li>Copy this message.</li>
              <li>In Base44, paste it into the chat and send it.</li>
              <li>Wait until Base44 replies "Your {tool.name} is ready." Don't send anything else or accept Base44's suggestions while it works. Then refresh the preview.</li>
            </ol>
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
            </div>
            <p className="ab-muted bt-note">
              Still showing this page after Base44 says it's done? Refresh the preview. Then open Settings, Check my setup, and click Check next to {tool.name}.
            </p>
          </div>
        </section>
      </div>
    </div>
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
