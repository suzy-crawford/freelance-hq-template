var e=`import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function EditableText({ value, placeholder, onSave, className, style, as = "p", multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  const ref = useRef(null);

  useEffect(() => {
    setDraft(value || "");
  }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      if (typeof ref.current.setSelectionRange === "function") {
        const len = ref.current.value.length;
        ref.current.setSelectionRange(len, len);
      }
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if ((draft || "") !== (value || "")) onSave(draft || "");
  };

  if (editing) {
    const Comp = multiline ? "textarea" : "input";
    return (
      <Comp
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !multiline) {
            e.preventDefault();
            commit();
          } else if (e.key === "Escape") {
            setDraft(value || "");
            setEditing(false);
          }
        }}
        rows={multiline ? 3 : undefined}
        className={cn(
          "editable-input w-full bg-transparent border-0 outline-none p-0 m-0 resize-none",
          className
        )}
        style={style}
      />
    );
  }

  const Tag = as;
  return (
    <Tag
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEditing(true);
        }
      }}
      className={cn("editable-text cursor-text rounded-sm", className)}
      style={style}
    >
      {value ? value : <span className="opacity-45">{placeholder}</span>}
    </Tag>
  );
}`;export{e as default};