import React, { useState } from "react";
import { Search, ExternalLink, RefreshCw } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/CopyButton";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CLAUDE_ANALYSIS_PROMPT } from "@/lib/clientsLogic";
import {
  getObservationOptions,
  adLibraryUrl,
  instagramSearchUrl,
  buildAnalysisPrompt,
  finalizeAnalysis,
  analysisToText,
  SOURCE_LABELS,
} from "@/lib/clientsAnalysis";

const LEVEL_STYLES = {
  high: "bg-app-primary text-app-on-primary",
  medium: "bg-app-surface text-app-text border border-app-border",
  low: "bg-app-bg text-app-muted border border-app-border",
};

function SourceTag({ source }) {
  return (
    <span
      className={cn(
        "inline-block text-[11px] rounded-full px-2 py-0.5 whitespace-nowrap",
        source === "guess" ? "border border-dashed border-app-border text-app-muted" : "bg-app-surface text-app-text"
      )}
    >
      {SOURCE_LABELS[source]}
    </span>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border-2 px-3.5 py-2 text-sm text-left",
        selected ? "border-app-primary bg-app-primary text-app-on-primary" : "border-app-border bg-app-bg text-app-text hover:border-app-text"
      )}
    >
      {label}
    </button>
  );
}

function CopyPromptButton() {
  const [state, setState] = useState("");
  const copy = async () => {
    if (!CLAUDE_ANALYSIS_PROMPT) {
      setState("The analysis prompt is coming soon.");
      return;
    }
    try {
      await navigator.clipboard.writeText(CLAUDE_ANALYSIS_PROMPT);
      setState("Copied. Paste it into Claude with your screenshots.");
    } catch {
      setState("Couldn't copy. Try again.");
    }
    setTimeout(() => setState(""), 3000);
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" variant="outline" className="rounded-full h-10 px-4 border-app-border text-app-text" onClick={copy}>
        Copy our analysis prompt
      </Button>
      {state && <span className="text-xs text-app-muted">{state}</span>}
    </div>
  );
}

function QuickLook({ prospect, observations, setObservations, research, setResearch, offer }) {
  const options = getObservationOptions(offer);
  const toggle = (id) => setObservations((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const linkClass = "inline-flex items-center gap-1 text-sm font-medium underline text-app-text";
  return (
    <div className="space-y-5">
      <div>
        <div className="font-semibold text-app-text">Step 1: Take a quick look (optional, but it makes the analysis much better)</div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
          <a href={adLibraryUrl(prospect.name)} target="_blank" rel="noreferrer" className={linkClass}>
            See if they're running ads <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {prospect.instagram ? (
            <a href={prospect.instagram} target="_blank" rel="noreferrer" className={linkClass}>
              Open their Instagram <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a href={instagramSearchUrl(prospect.name, prospect.location)} target="_blank" rel="noreferrer" className={linkClass}>
              Find their Instagram <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
      <div>
        <div className="text-sm text-app-muted mb-2">Tap anything you noticed:</div>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <Chip key={o.id} label={o.label} selected={observations.includes(o.id)} onClick={() => toggle(o.id)} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="research" className="text-sm text-app-muted block">
          Anything else you noticed? You can also paste Claude's analysis of your screenshots here.
        </label>
        <CopyPromptButton />
        <Textarea
          id="research"
          value={research}
          onChange={(e) => setResearch(e.target.value)}
          placeholder="For example: their last post was 3 weeks ago, they have great before-and-after photos, and their ads all use the same image..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
}

function AnalysisResult({ prospect, analysis }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className={cn("rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide", LEVEL_STYLES[analysis.opportunity_level])}>
          {analysis.opportunity_level} opportunity
        </span>
        <CopyButton text={analysisToText(prospect, analysis)} label="Copy" />
      </div>
      <p className="text-app-text">{analysis.opportunity_reason}</p>
      {!analysis.website_read && (
        <p className="text-xs text-app-muted">We couldn't read their website, so this is based on what you noticed and our best guesses.</p>
      )}

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-app-muted mb-2">What they're doing now</div>
        <ul className="space-y-2">
          {analysis.doing_now.map((d, i) => (
            <li key={i} className="flex flex-wrap items-start gap-2 text-sm text-app-text">
              <span className="flex-1 min-w-[200px]">{d.point}</span>
              <SourceTag source={d.source} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-app-muted mb-2">Where you could help</div>
        <ul className="space-y-3">
          {analysis.where_you_could_help.map((g, i) => (
            <li key={i} className="text-sm">
              <div className="flex flex-wrap items-start gap-2">
                <span className="flex-1 min-w-[200px] text-app-text font-medium">{g.gap}</span>
                <SourceTag source={g.source} />
              </div>
              {g.evidence && <div className="text-xs text-app-muted mt-1">"{g.evidence}"</div>}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border-2 border-app-primary p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">Pitch this</div>
        <div className="font-semibold text-app-text mt-1">{analysis.pitch.what}</div>
        <p className="text-sm text-app-text mt-2">
          <span className="font-medium">Your way in: </span>
          {analysis.pitch.angle}
        </p>
        <p className="text-sm text-app-muted mt-1">{analysis.pitch.why}</p>
        {analysis.pitch.show_them && (
          <p className="text-sm text-app-text mt-3 pt-3 border-t border-app-border">
            <span className="font-medium">Show them: </span>
            {analysis.pitch.show_them}
          </p>
        )}
      </div>


      <p className="text-sm text-app-text">
        <span className="font-semibold">Good fit? </span>
        {analysis.good_fit.verdict === "yes" ? "Yes. " : analysis.good_fit.verdict === "no" ? "Probably not. " : "Maybe. "}
        <span className="text-app-muted">{analysis.good_fit.why}</span>
      </p>
    </div>
  );
}

export default function AnalyzeSection({ prospect, offer, onUpdated }) {
  const [observations, setObservations] = useState(prospect.observations || []);
  const [research, setResearch] = useState(prospect.research_notes || "");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);
  const [redo, setRedo] = useState(false);
  const analysis = prospect.analysis;
  const showForm = !analysis || redo;

  const run = async () => {
    setRunning(true);
    setError(null);
    try {
      let site = { ok: false, error: "No website on file." };
      if (prospect.website) {
        const response = await base44.functions.invoke("readWebsite", { url: prospect.website });
        site = response?.data ?? response;
      }
      const { prompt, response_json_schema } = buildAnalysisPrompt({
        offer,
        prospect,
        site,
        observations,
        research,
        notes: prospect.notes,
      });
      const result = await callAI({ prompt, response_json_schema });
      const finalized = finalizeAnalysis(result, { site, observations, research });
      const updated = await base44.entities.Prospect.update(prospect.id, {
        observations,
        research_notes: research,
        analysis: finalized,
        analyzed_at: new Date().toISOString(),
      });
      onUpdated(updated);
      setRedo(false);
    } catch (e) {
      console.error("[Get Clients] analyze", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="panel p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-app-surface flex items-center justify-center flex-shrink-0">
            <Search className="w-4 h-4 text-app-text" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">Step 2</div>
            <div className="font-semibold text-app-text">Analyze this business</div>
          </div>
        </div>
        {analysis && !redo && (
          <button type="button" onClick={() => setRedo(true)} className="inline-flex items-center gap-1 text-sm text-app-muted underline">
            <RefreshCw className="w-3.5 h-3.5" /> Redo
          </button>
        )}
      </div>

      {!offer && (
        <p className="text-sm text-app-muted mb-4">
          Tip: build your offer first. The analysis uses it to decide what you should pitch.
        </p>
      )}

      {showForm ? (
        <div className="space-y-5">
          <QuickLook
            prospect={prospect}
            offer={offer}
            observations={observations}
            setObservations={setObservations}
            research={research}
            setResearch={setResearch}
          />
          <div>
            <div className="font-semibold text-app-text mb-2">Step 2: Analyze</div>
            <Button className="rounded-full h-11 px-6" onClick={run} disabled={running}>
              {running
                ? "Reading their website and thinking..."
                : observations.length || research.trim()
                  ? "Analyze this business"
                  : "Skip the look and analyze"}
            </Button>
            {running && <p className="text-xs text-app-muted mt-2">This usually takes 15 to 30 seconds.</p>}
          </div>
          {error && (
            <div className="rounded-xl border border-app-border bg-app-surface p-4">
              <p className="text-app-text text-sm">That didn't work. Try again.</p>
              <p className="text-xs text-app-muted mt-1">Details: {error}</p>
            </div>
          )}
        </div>
      ) : (
        <AnalysisResult prospect={prospect} analysis={analysis} />
      )}
    </section>
  );
}
