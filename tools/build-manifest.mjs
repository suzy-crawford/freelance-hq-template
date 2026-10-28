// Publish step: fingerprint every source file and group them into the HQ shell and one build per AI tool.
// Writes copy-manifest.json (the in-app Setup check compares against it), START.md (the one-message HQ
// install) and builds/<tool>.md (what each tool's Build message tells Base44 to copy).
// Run with: node tools/build-manifest.mjs   (sync_template.sh runs it for you)
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// The same rule as src/lib/copyCheck.js: ignore all whitespace, so harmless reformatting still matches.
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
  return text.replace(/\s+/g, "");
};
export const fingerprint = (text, path = "") => createHash("sha256").update(normalize(text, path)).digest("hex").slice(0, 16);

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith("__") || name === "node_modules") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(relative(root, full));
  }
  return out;
}

const known = new Set([...walk(join(root, "src"), [".js", ".jsx", ".css"]), ...walk(join(root, "base44"), [".jsonc", ".ts"])]);
const resolveImport = (from, spec) => {
  const base = spec.startsWith("@/") ? `src/${spec.slice(2)}` : spec.startsWith(".") ? join(dirname(from), spec) : null;
  if (!base) return null;
  return ["", ".js", ".jsx", ".ts", ".css", "/index.js", "/index.jsx"].map((ext) => base + ext).find((p) => known.has(p)) || null;
};

// Every file a set of entry files needs, dependencies first, so Base44 writes a file only after what it imports.
// Pages, brand stylesheets and live content are loaded with import.meta.glob, which this doesn't follow on purpose:
// the brand stylesheets load from the template, and each tool page arrives with its own build.
function closure(entries, skip = new Set()) {
  const out = [];
  const seen = new Set();
  const visit = (f) => {
    if (seen.has(f) || skip.has(f)) return;
    seen.add(f);
    if (/\.(jsx?|ts)$/.test(f)) {
      const text = readFileSync(join(root, f), "utf8");
      for (const [, spec] of text.matchAll(/(?:import|from)\s*\(?\s*["']([^"'?]+)["']/g)) {
        const dep = resolveImport(f, spec);
        if (dep && !dep.endsWith(".css")) visit(dep);
      }
    }
    out.push(f);
  };
  entries.forEach(visit);
  return out;
}

const { TOOLS } = await import(join(root, "src/lib/tools.js"));
const versionInfo = JSON.parse(readFileSync(join(root, "version.json"), "utf8"));
const version = versionInfo.hq || versionInfo.version;

// The HQ shell: sign-in, the setup questions, home, settings, setup check and the Build screens. No AI.
const SHELL_ENTRIES = [
  ...[...known].filter((f) => f.startsWith("base44/entities/")).sort(),
  "src/main.jsx", "src/App.jsx", "src/index.css",
  ...["Login", "Register", "ForgotPassword", "ResetPassword", "Onboarding", "Dashboard", "Profile", "SetupCheck"].map((p) => `src/pages/${p}.jsx`),
];
const shell = ["tailwind.config.js", ...closure(SHELL_ENTRIES)];
const shellSet = new Set(shell);
const groups = { shell };
for (const tool of TOOLS) {
  const functions = tool.functions.map((fn) => `base44/functions/${fn}/entry.ts`);
  groups[tool.id] = [...functions, ...closure(tool.pages.map((p) => `src/pages/${p}.jsx`), shellSet)];
}

// Guard: a page that loads on demand must not use a package the app doesn't already load at startup.
// Base44's preview prepares packages when the app starts; a package first needed later makes it rebuild them
// mid-session, which can leave the page stuck on "Failed to fetch dynamically imported module".
const packagesOf = (list) =>
  new Set(
    list
      .filter((f) => /\.(jsx?|ts)$/.test(f) && f.startsWith("src/"))
      .flatMap((f) => [...readFileSync(join(root, f), "utf8").matchAll(/(?:import|from)\s*\(?\s*["']([^"'./@][^"']*|@(?!\/)[^/"']+\/[^"']+)["']/g)].map((m) => m[1]))
  );
const atStartup = packagesOf(closure(["src/main.jsx"]));
const pages = readdirSync(join(root, "src/pages")).filter((f) => f.endsWith(".jsx"));
const late = pages.flatMap((p) => [...packagesOf(closure([`src/pages/${p}`]))].filter((pkg) => !atStartup.has(pkg)).map((pkg) => `${p} uses ${pkg}`));
if (late.length) {
  console.error(`Not published. These pages use packages the app doesn't load at startup:\n  ${late.join("\n  ")}`);
  process.exit(1);
}

const entries = {};
for (const [id, list] of Object.entries(groups)) {
  for (const f of list) {
    entries[f] ??= { groups: [], hash: fingerprint(readFileSync(join(root, f), "utf8"), f) };
    entries[f].groups.push(id);
  }
}
// tailwind.config.js is copied with the shell but not checked: Base44's newer app setup may need to adjust it.
const checkedEntries = Object.fromEntries(Object.entries(entries).filter(([f]) => f !== "tailwind.config.js"));
writeFileSync(join(root, "copy-manifest.json"), JSON.stringify({ version, files: checkedEntries }, null, 2) + "\n");

const RAW = `https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v${version}`;
const kb = (list) => Math.round(list.reduce((n, f) => n + readFileSync(join(root, f), "utf8").length, 0) / 1024);
const RULES = [
  "## Rules (follow every one)",
  "",
  "- Copy, don't build. Don't plan, design, redesign, improve, simplify, rename, merge or split anything.",
  "- For every file below: open its link and create the file at exactly that path with exactly that content, character for character. If the file already exists, replace it.",
  "- Never write your own version of a file, never summarize one, and never leave one out. If a file is long, keep going until it's complete.",
  "- Don't create files that aren't listed, and don't change any other file in the app.",
  "- Write each file once and move on. Don't re-check files, compute hashes or test between files. The app's Setup check does that.",
  "- Read each link directly with your web reader, one file at a time. Don't download files with commands, scripts or bulk downloads.",
  "- If a link doesn't load, stop and tell me which one. Never write your own version of a file instead.",
  "- Never create, change or delete any data records, and never run clean-ups or migrations on data. Only write the files listed here.",
  "- Don't ask me any questions and don't suggest extra features. Just do the steps below.",
  "- Spacing and line breaks don't matter. Images load from the internet by themselves; don't create image files.",
  "",
];

const start = [
  `# Freelance HQ ${version}: install the HQ`,
  "",
  "This repository is a finished, tested app. Copy its HQ into this Base44 app exactly, in one go. The AI tools are added later, one at a time, from inside the app.",
  "",
  ...RULES,
  "## Setup",
  "",
  "Install every package listed in the template's package.json. Keep this app's own package.json, vite.config.js and other setup files (only add missing packages). For reference:",
  "",
  ...["package.json", "vite.config.js", "jsconfig.json", "postcss.config.js", "components.json"].map((f) => `- ${f}: ${RAW}/${f}`),
  "",
  `If this app has no index.html in its root folder, create it exactly from ${RAW}/index.html.`,
  "",
  "## Files",
  "",
  ...shell.map((f) => `- ${f}: ${RAW}/${f}`),
  "",
  "## Finish",
  "",
  "- Data entities: make sure each entity's stored schema in this app matches its base44/entities file exactly (re-register it from the file if it's older or different).",
  "- A new Base44 app already has some of these files (for example src/lib/app-params.js, src/api/base44Client.js and the files in src/components/ui). Replace the listed ones with the repo's version anyway.",
  "- If this app uses Base44's newer app setup and the preview can't load these files, add the small bridge its setup needs so src/main.jsx and src/App.jsx run. Only change setup files that aren't listed above.",
  "- Last step: open the preview once and confirm it shows the Welcome screen. Don't run any other checks or tests. Then reply with exactly this and stop: \"Your Freelance HQ is ready. Answer the 3 setup questions in the preview, then open Offer Builder.\"",
  "",
];
writeFileSync(join(root, "START.md"), start.join("\n"));

mkdirSync(join(root, "builds"), { recursive: true });
for (const tool of TOOLS) {
  const list = groups[tool.id];
  const md = [
    `# Freelance HQ ${version}: add the ${tool.name}`,
    "",
    `This app already has the Freelance HQ. Add the ${tool.name} by copying these ${list.length} files exactly.`,
    "",
    ...RULES,
    "## Files",
    "",
    ...list.map((f) => `- ${f}: ${RAW}/${f}`),
    "",
    "## Finish",
    "",
    tool.functions.length ? "- The base44/functions files are backend functions. Create them exactly as written and deploy them. Don't call or test them." : null,
    `- When every file is written, open ${tool.route} in the preview once and confirm it shows ${tool.check}. Don't run any other checks or tests. Then reply with exactly this and stop: "Your ${tool.name} is ready. Refresh the preview to use it."`,
    "",
  ].filter((l) => l !== null);
  writeFileSync(join(root, "builds", `${tool.id}.md`), md.join("\n"));
}

console.log(`v${version}: HQ shell ${shell.length} files (${kb(shell)} KB)`);
for (const tool of TOOLS) console.log(`  ${tool.id}: ${groups[tool.id].length} files (${kb(groups[tool.id])} KB)`);
