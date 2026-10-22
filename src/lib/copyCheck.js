// SheFreelances OS - copy check (copyCheck.js)
// Proves a member's app is an exact copy of the template. Every source file is read as text,
// fingerprinted (whitespace ignored, so reformatting is fine) and compared with copy-manifest.json
// published in the template for this version. Loaded only on the Setup check page.

import { APP_VERSION } from "./version";
import selfSource from "./copyCheck.js?raw";

const TEMPLATE_RAW = "https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template";

const SOURCES = import.meta.glob(
  ["/src/**/*.{js,jsx,css}", "/base44/**/*.{jsonc,ts,js}", "/tailwind.config.js", "!/src/__preview/**", "!/base44/config.jsonc"],
  { query: "?raw", import: "default" }
);

async function fingerprint(text) {
  const bytes = new TextEncoder().encode(String(text).replace(/\s+/g, ""));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

async function loadManifest() {
  for (const ref of [`v${APP_VERSION}`, "main"]) {
    try {
      const res = await fetch(`${TEMPLATE_RAW}/${ref}/copy-manifest.json?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch {
      /* try the next one */
    }
  }
  throw new Error("Couldn't load the template's file list. Check your internet connection and try again.");
}

// { version, total, matched, changed: [{file, part}], missing: [{file, part}], extra: [file], parts: [n] }
export async function runCopyCheck() {
  const manifest = await loadManifest();
  const have = {};
  await Promise.all(
    Object.entries(SOURCES).map(async ([path, load]) => {
      try {
        have[path.replace(/^\//, "")] = await fingerprint(await load());
      } catch {
        /* unreadable files count as missing */
      }
    })
  );
  // A file's own list of files leaves the file out, so this one is added by hand.
  have["src/lib/copyCheck.js"] = await fingerprint(selfSource);
  const changed = [];
  const missing = [];
  let matched = 0;
  Object.entries(manifest.files).forEach(([file, { part, hash }]) => {
    if (!(file in have)) missing.push({ file, part });
    else if (have[file] !== hash) changed.push({ file, part });
    else matched += 1;
  });
  const extra = Object.keys(have).filter((f) => !(f in manifest.files) && !f.startsWith("src/__"));
  const parts = [...new Set([...changed, ...missing].map((f) => f.part))].sort((a, b) => a - b);
  return { version: manifest.version, total: Object.keys(manifest.files).length, matched, changed, missing, extra, parts };
}
