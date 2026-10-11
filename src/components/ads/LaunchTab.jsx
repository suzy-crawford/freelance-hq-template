import React from "react";
import CopyButton from "@/components/shared/CopyButton";
import { ExternalLink } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { RULEBOOK, DIAGNOSIS, getComplianceRules } from "@/lib/adsData";
import { isLegacyRecord } from "@/lib/adsCards";
import { getLaunchDays, getWeeklyRhythm, dayDate, approvalMessage, liveMessage, followUpTexts } from "@/lib/adsLaunch";
import { buildSetupPrompt, buildCheckPrompt, buildReportPrompt, buildCompetitorPrompt, buildProjectPrompt } from "@/lib/adsClaudePrompts";

const CLAUDE = {
  project: { build: buildProjectPrompt, label: "Copy project instructions" },
  setup: { build: buildSetupPrompt, label: "Copy for Claude" },
  check: { build: buildCheckPrompt, label: "Copy for Claude" },
  report: { build: buildReportPrompt, label: "Copy for Claude" },
  competitors: { build: buildCompetitorPrompt, label: "Copy for Claude" },
};

function Check({ id, done, onToggle, children }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 flex-shrink-0"
        style={{ accentColor: "var(--a-ink)" }}
        checked={done.has(id)}
        onChange={() => onToggle(id)}
      />
      <span className={cn("text-app-text", done.has(id) && "line-through text-app-muted")}>{children}</span>
    </label>
  );
}

function MessageBox({ text }) {
  return (
    <div className="mt-2 rounded-md border border-app-border p-3" style={{ background: "var(--a-sunk)" }}>
      <p className="text-sm text-app-text whitespace-pre-line m-0">{text}</p>
      <div className="mt-2">
        <CopyButton text={text} label="Copy message" />
      </div>
    </div>
  );
}

function ProjectSetup({ campaign }) {
  return (
    <div className="mt-2 rounded-md border border-app-border p-3" style={{ background: "var(--a-sunk)" }}>
      <ol className="list-decimal pl-5 space-y-1 text-sm text-app-text">
        <li>In Claude, open Projects and click New project. Name it after the client.</li>
        <li>Click to set the project instructions and paste what you copy below.</li>
        <li>Make sure the Meta Ads connector is on (Settings, then Connectors, Meta Ads, Connect). You need a paid Claude plan.</li>
        <li>From now on, start every Claude chat for this client inside this project. Save each "Log" Claude gives you as a file in the project.</li>
      </ol>
      <div className="flex flex-wrap gap-2 mt-3">
        <CopyButton text={buildProjectPrompt(campaign)} label="Copy project instructions" />
        <a className="btn btn-quiet inline-flex items-center gap-1" style={{ height: 36, fontSize: 13 }} href="https://claude.ai/projects" target="_blank" rel="noreferrer">
          Open Claude
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function Task({ campaign, task, done, onToggle, onGoTab }) {
  return (
    <li className="py-3" style={{ borderTop: "1px solid var(--a-line)" }}>
      <Check id={task.id} done={done} onToggle={onToggle}>
        {task.task}
      </Check>
      <div className="pl-7">
        {task.link && (
          <a className="chip inline-flex items-center gap-1 mt-1" href={task.link} target="_blank" rel="noreferrer">
            {task.linkLabel}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {task.tab && (
          <button type="button" className="chip mt-1" onClick={() => onGoTab(task.tab)}>
            {task.tabLabel}
          </button>
        )}
        {task.claude === "project" && <ProjectSetup campaign={campaign} />}
        {task.claude && task.claude !== "project" && (
          <div className="mt-2">
            <CopyButton text={CLAUDE[task.claude].build(campaign)} label={CLAUDE[task.claude].label} />
            <span className="hint ml-2">Paste it into a new chat in this client's Claude project.</span>
          </div>
        )}
        {task.message === "approval" && <MessageBox text={approvalMessage(campaign)} />}
        {task.message === "live" && <MessageBox text={liveMessage(campaign)} />}
        {task.scripts && (
          <div className="mt-2 flex flex-col gap-2">
            {followUpTexts(campaign).map((t, i) => (
              <div key={i} className="rounded-md border border-app-border p-3" style={{ background: "var(--a-sunk)" }}>
                <div className="text-xs font-semibold text-app-muted">{t.when}</div>
                <p className="text-sm text-app-text m-0 mt-1">{t.text}</p>
              </div>
            ))}
            <div>
              <CopyButton text={followUpTexts(campaign).map((t) => `${t.when}:\n${t.text}`).join("\n\n")} label="Copy all texts" />
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default function LaunchTab({ campaign, onToggleCheck, onChange, onGoTab }) {
  const done = new Set(campaign.checklist_done || []);
  const days = getLaunchDays(campaign);
  const weekly = getWeeklyRhythm(campaign);
  const total = days.reduce((n, d) => n + d.tasks.length, 0);
  const doneCount = days.reduce((n, d) => n + d.tasks.filter((t) => done.has(t.id)).length, 0);
  const legacy = isLegacyRecord(campaign.record);

  return (
    <>
      <section className="doc-section">
        <h3>Your 7-day launch</h3>
        <p className="intro">From onboarding to live ads in about a week. Nothing goes live until you publish it yourself.</p>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-app-text">
            Day 1 is
            <input
              type="date"
              className="input"
              style={{ width: 190 }}
              value={campaign.start_date || ""}
              onChange={(e) => onChange({ start_date: e.target.value })}
            />
          </label>
          <span className="hint pb-2">
            {doneCount} of {total} done{campaign.start_date ? "" : ". Pick a start date to see the dates for each day."}
          </span>
        </div>
        {legacy && <p className="hint mt-3">Rebuild your ad strategy first, so Claude gets the finished ads.</p>}
      </section>

      {days.map((d) => (
        <section key={d.day} className="doc-section">
          <div className="tool-label">
            {d.span || `Day ${d.day}`}
            {campaign.start_date ? ` · ${dayDate(campaign, d.day)}` : ""}
          </div>
          <h3 className="mt-1">{d.title}</h3>
          <p className="intro">{d.intro}</p>
          <ul className="flex flex-col">
            {d.tasks.map((t) => (
              <Task key={t.id} campaign={campaign} task={t} done={done} onToggle={onToggleCheck} onGoTab={onGoTab} />
            ))}
          </ul>
          {d.notes?.map((n, i) => (
            <p key={i} className="hint mt-3">
              {n}
            </p>
          ))}
        </section>
      ))}

      <section className="doc-section">
        <h3>Every week after</h3>
        <p className="intro">Two habits keep the ads healthy and your client happy. Run them inside this client's Claude project.</p>
        <dl className="defs">
          {weekly.map((w) => (
            <div key={w.id}>
              <dt>
                {w.when}
                {w.from ? <span className="why">From {w.from}</span> : null}
              </dt>
              <dd>
                <strong>{w.title}</strong>
                <span className="why">{w.what}</span>
                <div className="mt-2">
                  <CopyButton text={CLAUDE[w.claude].build(campaign)} label="Copy for Claude" />
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="doc-section">
        <h3>The SheFreelances rulebook</h3>
        <p className="intro">Claude labels every ad with one of these when you run Check my ads.</p>
        <dl className="defs">
          {RULEBOOK.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.rule}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="doc-section">
        <h3>Where the problem is</h3>
        <p className="intro">Check in this order. The last two are the client's side, not the ads.</p>
        <dl className="defs">
          {DIAGNOSIS.map((d) => (
            <div key={d.sign}>
              <dt>{d.sign}</dt>
              <dd>{d.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="doc-section">
        <h3>Ad rules to check</h3>
        <ul className="list-disc pl-5 space-y-1 text-app-text">
          {getComplianceRules(campaign).map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
