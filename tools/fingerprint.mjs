// Setup check fingerprints, shared by build-manifest.mjs and build-bridge-300.mjs.
import { createHash } from "node:crypto";

// The same rule as src/lib/copyCheck.js: code is compared as its words and symbols, sorted, so spacing and
// order (Base44 sometimes reorders a tag's attributes) don't count, but a missing or changed word does.
// Data entities are compared as data (Base44 reformats them when it saves), with keys in a fixed order.
const sortKeys = (v) => (Array.isArray(v) ? v.map(sortKeys) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v);
const normalize = (text, path) => {
  if (path.endsWith(".jsonc")) {
    try {
      return JSON.stringify(sortKeys(JSON.parse(text)));
    } catch {
      /* fall back to text */
    }
  }
  return (text.match(/[\w$]+|\S/gu) || []).sort().join(" ");
};
// The 3.0.0 Setup check's rule (whitespace ignored), for comparing with the v3.0.0 file list.
export const fingerprint300 = (text, path = "") =>
  createHash("sha256").update(path.endsWith(".jsonc") ? normalize(text, path) : text.replace(/\s+/g, "")).digest("hex").slice(0, 16);
export const fingerprint = (text, path = "") => createHash("sha256").update(normalize(text, path)).digest("hex").slice(0, 16);
