import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { useProfile } from "@/lib/ProfileContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/shared/CopyButton";
import { cn } from "@/lib/utils";
import {
  buildOutreachPrompt,
  finalizeOutreach,
  outreachChecks,
  MESSAGE_FIELDS,
  OUTREACH_TONES,
} from "@/lib/clientsOutreach";

function Checks({ text, prospectName, field }) {
  const checks = outreachChecks(text, { prospectName, maxWords: field.maxWords, requireName: field.requireName });
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
      {checks.map((c) => (
        <span key={c.label} className={cn("inline-flex items-center gap-1 text-xs", c.pass ? "text-app-success" : "text-app-warning")}>
          {c.pass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {c.label}
        </span>
      ))}
    </div>
  );
}

function MessageCard({ field, outreach, prospectName, onChange, onSave }) {
  const isEmail = field.key === "email";
  const text = isEmail ? outreach.email_body : outreach[field.key];
  const copyText = isEmail ? `Subject: ${outreach.email_subject}\n\n${outreach.email_body}` : text;
  return (
    <div className="rounded-xl border border-app-border p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="font-semibold text-app-text">{field.label}</div>
          <div className="text-xs text-app-muted">{field.when}</div>
        </div>
        <CopyButton text={copyText} label="Copy" />
      </div>
      {isEmail && (
        <Input
          value={outreach.email_subject}
          onChange={(e) => onChange("email_subject", e.target.value)}
          onBlur={onSave}
          className="mb-2 h-10"
          aria-label="Email subject"
        />
      )}
      <Textarea
        value={text}
        onChange={(e) => onChange(isEmail ? "email_body" : field.key, e.target.value)}
        onBlur={onSave}
        className={cn("min-h-[110px]", isEmail && "min-h-[180px]")}
      />
      <Checks text={text} prospectName={prospectName} field={field} />
    </div>
  );
}

export default function OutreachSection({ prospect, offer, onUpdated }) {
  const { profile } = useProfile();
  const [outreach, setOutreach] = useState(prospect.outreach || null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);
  const hasAnalysis = !!prospect.analysis;

  const generate = async (tone) => {
    setRunning(true);
    setError(null);
    try {
      const { prompt, response_json_schema } = buildOutreachPrompt({ offer, profile, prospect, tone });
      const result = await callAI({ prompt, response_json_schema });
      const finalized = finalizeOutreach(result);
      const updated = await base44.entities.Prospect.update(prospect.id, { outreach: finalized });
      setOutreach(finalized);
      onUpdated(updated);
    } catch (e) {
      console.error("[Get Clients] outreach", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setRunning(false);
    }
  };

  const change = (key, value) => setOutreach((prev) => ({ ...prev, [key]: value }));
  const save = async () => {
    const updated = await base44.entities.Prospect.update(prospect.id, { outreach });
    onUpdated(updated);
  };

  return (
    <section className="panel p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-app-surface flex items-center justify-center flex-shrink-0">
          <Send className="w-4 h-4 text-app-text" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-app-muted">Step 3</div>
          <div className="font-semibold text-app-text">Write your message</div>
        </div>
      </div>

      {!hasAnalysis ? (
        <p className="text-sm text-app-muted">Analyze this business first. Your message is built from what you find.</p>
      ) : !outreach ? (
        <div className="space-y-3">
          <p className="text-sm text-app-muted">
            A short message built from your offer and what you found. The goal of the first message isn't to close
            the client. It's to get a reply.
          </p>
          <Button className="rounded-full h-11 px-6" onClick={() => generate()} disabled={running}>
            {running ? "Writing your messages..." : "Write my messages"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-app-muted">
            Read each one and make it sound like you before sending. Edits save automatically.
          </p>
          {MESSAGE_FIELDS.map((field) => (
            <MessageCard
              key={field.key}
              field={field}
              outreach={outreach}
              prospectName={prospect.name}
              onChange={change}
              onSave={save}
            />
          ))}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-sm text-app-muted mr-1">Rewrite all:</span>
            {OUTREACH_TONES.map((t) => (
              <Button
                key={t.id}
                variant="outline"
                className="rounded-full h-9 px-4 border-app-border text-app-text"
                onClick={() => generate(t.id)}
                disabled={running}
              >
                {t.label}
              </Button>
            ))}
            <Button
              variant="outline"
              className="rounded-full h-9 px-4 border-app-border text-app-text"
              onClick={() => generate()}
              disabled={running}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> New version
            </Button>
            {running && <span className="text-xs text-app-muted">Rewriting...</span>}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-app-border bg-app-surface p-4">
          <p className="text-app-text text-sm">That didn't work. Try again.</p>
          <p className="text-xs text-app-muted mt-1">Details: {error}</p>
        </div>
      )}
    </section>
  );
}
