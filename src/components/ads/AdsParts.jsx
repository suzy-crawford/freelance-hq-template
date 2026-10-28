import React, { useState } from "react";
import { Check, Copy, ArrowLeft, Wand, Pencil } from "@/components/brand/icons";
import { cn } from "@/lib/utils";
import { BLANK_RE, blankPrompt, REWRITE_OPTIONS } from "@/lib/libs";

// The Meta Ads Builder's small shared pieces (card footer, question, group, copy buttons, editable copy field).
// The Content Creator uses them too, so they live apart from the ads screens.

export function Foot({ onBack, left, children }) {
  return (
    <div className="lp-cardfoot">
      {onBack && (
        <button type="button" className="lp-link lp-back-link" onClick={onBack}>
          <ArrowLeft /> Back
        </button>
      )}
      {left && <span className="lp-meta">{left}</span>}
      <div className="ab-foot-right">{children}</div>
    </div>
  );
}

// A term explained only when she asks (tap or hover).
export function Term({ children, tip }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="ab-term">
      <button type="button" onClick={() => setOpen((v) => !v)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} aria-expanded={open}>
        {children}
      </button>
      {open && (
        <span className="ab-term-tip" role="tooltip">
          {tip}
        </span>
      )}
    </span>
  );
}

export function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e?.stopPropagation?.();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };
  return [copied, copy];
}

// Gradient-outline copy button; cream pill inside a night box.
export function CopyBtn({ text, label, cream }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className={cream ? "mb-btn-cream" : "lp-btn-outline"} onClick={copy}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function CopyLink({ text, label, done = "Copied" }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className="lp-link ab-copylink" onClick={copy}>
      {copied ? done : label}
    </button>
  );
}

export function Q({ label, optional, hint, children }) {
  return (
    <div className="ab-q">
      <div className="ab-q-label">
        {label}
        {optional && <span className="ab-optional"> Optional</span>}
      </div>
      {children}
      {hint && <div className="ab-hint">{hint}</div>}
    </div>
  );
}

export function Group({ icon: Icon, title, action, children }) {
  return (
    <section className="mb-group">
      <div className="mb-group-head">
        <span className="mb-group-icon">
          <Icon />
        </span>
        <h3>{title}</h3>
        {action && <span className="mb-group-action">{action}</span>}
      </div>
      {children}
    </section>
  );
}

// Text with each [blank] as a tap-to-fill field.
// Text with each [blank] as a tap-to-fill field.
export function Fillable({ text, onFill }) {
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState("");
  const str = String(text || "");
  const out = [];
  let last = 0;
  for (const m of str.matchAll(BLANK_RE)) {
    if (m.index > last) out.push(str.slice(last, m.index));
    const blank = m[0];
    out.push(
      open === m.index ? (
        <input
          key={m.index}
          className="ab-blank-input"
          autoFocus
          value={value}
          placeholder={blankPrompt(blank).replace(/^Add /, "")}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            if (value.trim()) onFill(blank, value.trim());
            setOpen(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setOpen(null);
          }}
        />
      ) : (
        <button key={m.index} type="button" className="ab-blank" onClick={() => (setValue(""), setOpen(m.index))}>
          {blankPrompt(blank)}
        </button>
      )
    );
    last = m.index + blank.length;
  }
  if (last < str.length) out.push(str.slice(last));
  return <>{out}</>;
}

export function CopyTool({ text }) {
  const [copied, copy] = useCopy(text);
  return (
    <button type="button" className="mb-tool" onClick={copy}>
      {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
    </button>
  );
}

// One piece of ad copy she can edit by hand (free) or rewrite with AI (one small call).
export function CopyField({ label, head, value, edited, multiline, onSave, onReset, onRewrite, onFill, options, copy, note }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [menu, setMenu] = useState(false);
  const [own, setOwn] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const startEdit = () => {
    setDraft(value);
    setEditing(true);
    setMenu(false);
  };
  const save = () => {
    const t = draft.trim();
    if (t && t !== value) onSave(t);
    setEditing(false);
  };
  const rewrite = async (how) => {
    setMenu(false);
    setBusy(true);
    setErr("");
    try {
      await onRewrite(how);
      setOwn("");
    } catch (e) {
      setErr("That didn't work. Try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={cn("mb-field", editing && "is-editing")}>
      <div className="ab-field-head">
        <span className="ab-field-label">{label}</span>
        {head}
        <span className="mb-field-tools">
          {edited && !editing && (
            <>
              <span className="mb-edited">Edited</span>
              <button type="button" className="lp-link" onClick={onReset}>
                Reset
              </button>
            </>
          )}
          {options && options.list.length > 1 && !editing && (
            <button type="button" className="lp-link" onClick={() => setShowOptions((v) => !v)} aria-expanded={showOptions}>
              {showOptions ? "Done" : `${options.list.length - 1} more`}
            </button>
          )}
          {copy && !editing && <CopyTool text={value} />}
          {!editing && (
            <>
              <button type="button" className="mb-tool" onClick={startEdit} aria-label={`Edit the ${label.toLowerCase()}`}>
                <Pencil /> Edit
              </button>
              <button type="button" className="mb-tool" onClick={() => setMenu((v) => !v)} aria-expanded={menu} disabled={busy}>
                <Wand /> {busy ? "Rewriting..." : "Rewrite"}
              </button>
            </>
          )}
        </span>
      </div>
      {menu && (
        <div className="mb-rewrite">
          {REWRITE_OPTIONS.map((o) => (
            <button key={o.id} type="button" onClick={() => rewrite(o.ask)}>
              {o.label}
            </button>
          ))}
          <form
            className="mb-rewrite-own"
            onSubmit={(e) => {
              e.preventDefault();
              if (own.trim()) rewrite(own.trim());
            }}
          >
            <input className="input" value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Or say how: mention the free consult" aria-label="How to rewrite it" />
            <button type="submit" className="lp-link" disabled={!own.trim()}>
              Rewrite
            </button>
          </form>
        </div>
      )}
      {editing ? (
        <div className="mb-edit">
          <textarea
            className="textarea"
            rows={multiline ? Math.min(12, Math.max(4, draft.split("\n").length + 1)) : 2}
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setEditing(false);
              if (e.key === "Enter" && !multiline) (e.preventDefault(), save());
            }}
          />
          <div className="mb-edit-actions">
            <button type="button" className="lp-btn lp-btn-sm" onClick={save}>
              Save
            </button>
            <button type="button" className="lp-link" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={cn("ab-field-value", multiline && "ab-primary", busy && "is-busy")}>
          <Fillable text={value} onFill={onFill} />
        </div>
      )}
      {note && !editing && <p className="mb-field-note">{note}</p>}
      {err && <p className="lp-error">{err}</p>}
      {options && showOptions && !editing && (
        <ul className="ab-field-options">
          {options.list.map((o, i) => (
            <li key={i}>
              <button type="button" aria-pressed={i === options.selected} onClick={() => options.onPick(i)}>
                <Fillable text={o} onFill={onFill} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
