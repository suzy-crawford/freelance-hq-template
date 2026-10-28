// SheFreelances OS - copy check (copyCheck.js)
// Proves a member's app is an exact copy of the template. Every app source file is read as text,
// fingerprinted (whitespace and word order ignored, so reformatting is fine) and compared with copy-manifest.json
// published in the template for this version. Loaded only on the Setup check page, one piece at a time.

import { TEMPLATE_REF } from "./version";
import selfSource from "./copyCheck.js?raw";

const TEMPLATE_RAW = "https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template";

const SOURCES = import.meta.glob(
  ["/src/**/*.{js,jsx,css}", "/tailwind.config.js", "!/src/__preview/**"],
  { query: "?raw", import: "default" }
);

// Same rule as tools/build-manifest.mjs: data entities are compared as data. Code is compared as its words and
// symbols, sorted: spacing and order don't count (Base44 sometimes reorders a tag's attributes when it saves),
// but a missing, extra or changed word does.
const sortKeys = (v) => (Array.isArray(v) ? v.map(sortKeys) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v);
function normalize(text, path) {
  if (path.endsWith(".jsonc")) {
    try {
      return JSON.stringify(sortKeys(JSON.parse(text)));
    } catch {
      /* fall back to text */
    }
  }
  return (String(text).match(/[\w$]+|\S/gu) || []).sort().join(" ");
}

async function fingerprint(text, path = "") {
  const bytes = new TextEncoder().encode(normalize(text, path));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

async function loadManifest() {
  for (const ref of [TEMPLATE_REF, "main"]) {
    try {
      const res = await fetch(`${TEMPLATE_RAW}/${ref}/copy-manifest.json?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch {
      /* try the next one */
    }
  }
  throw new Error("Couldn't load the template's file list. Check your internet connection and try again.");
}

// Checks one piece of the app ("shell" or a tool id from tools.js), only when the member clicks Check.
// { version, total, matched, changed: [file], missing: [file], raw }
export async function runCopyCheck(group) {
  const manifest = await loadManifest();
  // Backend files (data entities and server functions) can't be read from the browser, and contentRev.js is a
  // counter that goes up with every live content update, so neither is compared.
  const checked = Object.entries(manifest.files).filter(
    ([file, e]) => (e.groups || []).includes(group) && !file.startsWith("base44/") && file !== "src/lib/contentRev.js"
  );
  const have = {};
  await Promise.all(
    checked.map(async ([file]) => {
      if (file === "src/lib/copyCheck.js") {
        have[file] = await fingerprint(selfSource);
        return;
      }
      const load = SOURCES[`/${file}`];
      if (!load) return;
      try {
        have[file] = await fingerprint(await load(), file);
      } catch {
        /* unreadable files count as missing */
      }
    })
  );
  const changed = [];
  const missing = [];
  let matched = 0;
  checked.forEach(([file, { hash }]) => {
    if (!(file in have)) missing.push(file);
    else if (have[file] !== hash) changed.push(file);
    else matched += 1;
  });
  return { version: manifest.version, total: checked.length, matched, changed, missing, raw: `${TEMPLATE_RAW}/${TEMPLATE_REF}` };
}
