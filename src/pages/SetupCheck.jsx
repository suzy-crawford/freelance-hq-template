import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, CopyButton } from "@/components/shared/Page";
import { TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

// Is each piece of the HQ an exact copy of the template? Each check runs only when its button is clicked
// and reads only that piece's files, so this page never slows the app down.
const READY = import.meta.glob("../tools/*.ready.js", { eager: true });
const built = (tool) => !!READY[`../tools/${tool.id}.ready.js`];

// The exact fix for Base44: only the files that are off, each with its link.
function fixMessage(result) {
  const files = [...result.changed, ...result.missing];
  return `Replace these files in my app with the exact files from these links, character for character. Don't change anything else, then stop.\n\n${files
    .map((f) => `- ${f}: ${result.raw}/${f}`)
    .join("\n")}`;
}

function CheckRow({ id, name }) {
  const [state, setState] = useState({ status: "idle" });
  const run = async () => {
    setState({ status: "running" });
    try {
      const { runCopyCheck } = await import("@/lib/copyCheck");
      setState({ status: "done", result: await runCopyCheck(id) });
    } catch (e) {
      setState({ status: "error", error: e.message || String(e) });
    }
  };
  const r = state.result;
  const exact = r && r.matched === r.total;
  return (
    <li className={cn("rounded-xl border-2 p-5", r ? (exact ? "border-app-success" : "border-app-danger") : "border-app-border")}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-base font-semibold text-app-text">{name}</div>
          {state.status === "idle" && <p className="text-app-muted text-sm mt-1">Compares this part of your app with the template.</p>}
          {state.status === "running" && <p className="text-app-muted text-sm mt-1">Checking...</p>}
          {state.status === "error" && <p className="text-app-danger text-sm mt-1">The check couldn't run: {state.error}</p>}
          {r && (
            <p className={cn("text-sm mt-1", exact ? "text-app-success" : "text-app-danger")}>
              {exact ? `All ${r.total} files match. It's the real one.` : `${r.total - r.matched} of ${r.total} files aren't exact copies.`}
            </p>
          )}
        </div>
        <button type="button" className="btn btn-quiet btn-sm" onClick={run} disabled={state.status === "running"}>
          {r ? "Check again" : "Check"}
        </button>
      </div>
      {r && !exact && (
        <div className="mt-4">
          <p className="text-app-text text-sm">In Base44, send this message, then click Check again:</p>
          <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-app-bg p-3 text-xs text-app-muted whitespace-pre-wrap break-words">{fixMessage(r)}</pre>
          <div className="mt-2">
            <CopyButton text={fixMessage(r)} label="Copy the message" />
          </div>
        </div>
      )}
    </li>
  );
}

export default function SetupCheck() {
  const notBuilt = TOOLS.filter((t) => !built(t));
  return (
    <div>
      <PageHeader title="Setup check" subtitle="Check any part of your HQ against the template. Each check only runs when you click it." />
      <ul className="space-y-3">
        <CheckRow id="shell" name="Your HQ (home, sidebar, settings)" />
        {TOOLS.filter(built).map((t) => (
          <CheckRow key={t.id} id={t.id} name={t.name} />
        ))}
      </ul>
      {notBuilt.length > 0 && (
        <p className="text-app-muted text-sm mt-5">
          Not built yet:{" "}
          {notBuilt.map((t, i) => (
            <span key={t.id}>
              {i > 0 && ", "}
              <Link to={t.route} className="link">
                {t.name}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
    </div>
  );
}
