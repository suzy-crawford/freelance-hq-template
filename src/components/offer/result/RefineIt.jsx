import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AIError from "@/components/offer/AIError";
import { buildRefinePrompt, finalizeRefineResult } from "@/lib/offerPrompts";
import { callAI } from "@/lib/callAI";

const CHIPS = [
  "Make it sound more premium",
  "Can we simplify the deliverables?",
  "I want to charge $1,200 instead",
];

export default function RefineIt({ offer, profile, onOfferUpdate, onViewOfferDoc }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  const history = offer.refine_history || [];

  const run = async () => {
    const requestText = text.trim();
    if (!requestText || loading) return;
    setError(null);
    setSummary(null);
    setLoading(true);
    try {
      const { prompt, response_json_schema } = buildRefinePrompt(offer, profile, requestText);
      const result = await callAI({ prompt, response_json_schema });
      const updated = finalizeRefineResult(result, offer, requestText);

      const overrides = offer.paper_overrides || {};
      const keptOverrides = {};
      if (overrides.freelancer_name !== undefined) keptOverrides.freelancer_name = overrides.freelancer_name;
      if (overrides.contact !== undefined) keptOverrides.contact = overrides.contact;

      const saved = await base44.entities.Offer.update(offer.id, {
        record: updated.record,
        package: updated.package,
        price: updated.price,
        selected_name: updated.selected_name,
        paper_overrides: keptOverrides,
        refine_history: [
          ...history,
          { request: requestText, change_summary: updated.change_summary, date: new Date().toISOString() },
        ],
      });

      onOfferUpdate(saved);
      setSummary(updated.change_summary);
      setText("");
    } catch (e) {
      console.error("[Offer Builder AI]", e);
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-app-border bg-app-bg p-6 md:p-7">
      <h2 className="text-lg font-semibold text-app-text">Refine it</h2>
      <p className="text-app-muted text-sm mt-1 max-w-[560px]">
        Want to change something? Tell us in plain English. Your offer, offer doc, and scope of work all update together.
      </p>

      {summary && (
        <div className="mt-4 rounded-xl border-2 border-app-success bg-app-surface p-4">
          <div className="text-sm font-semibold text-app-text">Updated</div>
          <p className="text-app-text text-sm mt-1">{summary}</p>
          <Button
            variant="outline"
            className="mt-3 rounded-full border-app-border text-app-text"
            onClick={onViewOfferDoc}
          >
            View offer doc
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setText(c)}
            className="rounded-full border border-app-border bg-app-bg px-3 py-2 text-sm text-app-text hover:border-app-text transition-colors"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label htmlFor="refine-box" className="sr-only">
          What would you like to change?
        </label>
        <Textarea
          id="refine-box"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Tell us what you'd like to change..."
        />
      </div>

      <Button
        onClick={run}
        disabled={loading || !text.trim()}
        className="mt-3 rounded-full h-11 px-6 bg-app-primary text-app-on-primary hover:bg-app-text"
      >
        {loading ? (
          <>
            Updating your offer...
          </>
        ) : (
          "Update my offer"
        )}
      </Button>

      {error && <AIError message={error} onRetry={run} />}

      {history.length > 0 && (
        <div className="mt-5">
          <div className="text-sm font-medium text-app-muted">Recent changes</div>
          <ul className="mt-2 space-y-1">
            {history.slice(-3).reverse().map((h, i) => (
              <li key={i} className="text-xs text-app-muted">
                {h.change_summary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}