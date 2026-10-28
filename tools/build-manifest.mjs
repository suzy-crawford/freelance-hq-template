// Publish step: fingerprint every source file and group them into the HQ shell and one build per AI tool.
// Writes copy-manifest.json (the in-app Setup check compares against it), START.md (the one-message HQ
// install) and builds/<tool>.md (what each tool's Build message tells Base44 to copy).
// Run with: node tools/build-manifest.mjs   (sync_template.sh runs it for you)
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { buildLibs } from "./build-libs.mjs";
import { fingerprint, fingerprint300 } from "./fingerprint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");


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
// The template ref the install files link to: the version tag. HQ_REF=<branch> writes them for a test branch.
const REF = process.env.HQ_REF || `v${version}`;

// The tools' libraries go in one bundle the apps load at runtime (runtime/libs.js), plus src/lib/libs.js.
const libsKb = await buildLibs(REF);

// The HQ shell: sign-in, the setup questions, home, settings, setup check and the Build screens. No AI.
const SHELL_ENTRIES = [
  ...[...known].filter((f) => f.startsWith("base44/entities/")).sort(),
  "src/main.jsx", "src/App.jsx", "src/index.css",
  ...["Auth", "Onboarding", "Dashboard", "Profile", "SetupCheck"].map((p) => `src/pages/${p}.jsx`),
];
// Files every new Base44 app already has, which the HQ uses exactly as Base44 writes them. They're not copied
// (fewer files, so the install finishes in one reply); START.md links them only in case one is missing.
const STOCK = new Set([
  "src/api/base44Client.js", "src/lib/app-params.js", "src/lib/AuthContext.jsx", "src/lib/query-client.js", "src/lib/utils.js",
  "src/lib/authReturnTo.js", "src/components/AuthLayout.jsx", "src/components/GoogleIcon.jsx", "src/components/ScrollToTop.jsx",
  "src/components/ui/toaster.jsx", "src/components/ui/toast.jsx", "src/components/ui/use-toast.jsx",
]);
const shellAll = ["tailwind.config.js", ...closure(SHELL_ENTRIES)];
const shell = shellAll.filter((f) => !STOCK.has(f));
const stockUsed = shellAll.filter((f) => STOCK.has(f));
const shellSet = new Set(shell);
// Files every tool build brings even though the HQ has them too, so a tool also builds into an older HQ.
const TOOL_SHARED = ["src/lib/libs.js", "src/components/shared/ToolKit.jsx"];
const toolSkip = new Set([...shellSet, ...STOCK].filter((f) => !TOOL_SHARED.includes(f)));
const groups = { shell };
for (const tool of TOOLS) {
  const functions = tool.functions.map((fn) => `base44/functions/${fn}/entry.ts`);
  // The ready file goes last: the HQ switches the tool on only once it exists.
  groups[tool.id] = [...functions, ...closure(tool.pages.map((p) => `src/pages/${p}.jsx`), toolSkip), `src/tools/${tool.id}.ready.js`];
}

// Guard: the libraries in src/lib/runtime.js load from the bundle. A screen that imports one directly would copy it
// into the member's app as a second, separate copy (and make the build bigger), so screens use src/lib/libs.js.
const bundled = new Set(closure(["src/lib/runtime.js"]));
const direct = Object.entries(groups).flatMap(([id, list]) => list.filter((f) => bundled.has(f) && f !== "src/lib/leadStatus.js").map((f) => `${id}: ${f}`));
if (direct.length) {
  console.error(`Not published. These files belong in the runtime bundle; import them from @/lib/libs instead:\n  ${direct.join("\n  ")}`);
  process.exit(1);
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

// Guard: members on 3.0.0 build the newer tools into their 3.0.0 HQ (the v3.0.0 build files point at these).
// So a tool build must not change any file a 3.0.0 app already has (its Setup check compares those with the v3.0.0
// list), and may only lean on HQ files every 3.0.0 app has. tools/v3.0.0-manifest.json is that list.
const v300 = JSON.parse(readFileSync(join(root, "tools/v3.0.0-manifest.json"), "utf8")).files;
const v300Base = Object.entries(v300).filter(([, e]) => e.groups.some((g) => g === "shell" || g === "offer"));
const v300Shell = new Set([...v300Base.filter(([, e]) => e.groups.includes("shell")).map(([f]) => f), ...STOCK]);
const clashes = [];
for (const [id, list] of Object.entries(groups)) {
  if (id === "shell" || id === "offer") continue;
  for (const f of list) {
    const old = v300[f];
    if (old && old.groups.some((g) => g === "shell" || g === "offer") && !f.startsWith("base44/") && fingerprint300(readFileSync(join(root, f), "utf8"), f) !== old.hash)
      clashes.push(`${id} changes ${f}, which 3.0.0 apps already have`);
  }
  const own = new Set(list);
  for (const f of list.filter((f) => /\.jsx?$/.test(f))) {
    for (const [, spec] of readFileSync(join(root, f), "utf8").matchAll(/(?:import|from)\s*\(?\s*["']([^"'?]+)["']/g)) {
      const dep = resolveImport(f, spec);
      if (dep && !own.has(dep) && !v300Shell.has(dep)) clashes.push(`${id}: ${f} imports ${dep}, which 3.0.0 apps don't have`);
    }
  }
}
if (clashes.length) {
  console.error(`Not published. A tool build wouldn't work in a 3.0.0 HQ:\n  ${[...new Set(clashes)].join("\n  ")}`);
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

const RAW = `https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/${REF}`;
const kb = (list) => Math.round(list.reduce((n, f) => n + readFileSync(join(root, f), "utf8").length, 0) / 1024);
const RULES = [
  "## Rules (follow every one)",
  "",
  "- Copy, don't build. Don't plan, design, redesign, improve, simplify, rename, merge or split anything.",
  "- For every file below: open its link and create the file at exactly that path with exactly that content, character for character. If the file already exists, replace it.",
  "- Never write your own version of a file, never summarize one, and never leave one out. If a file is long, keep going until it's complete.",
  "- Don't create files that aren't listed, and don't change any other file in the app.",
  "- Write each file once and move on. Don't re-check files, compute hashes or test between files. The app's Setup check does that.",
  "- Copy all the files in one go with your bulk copy or download step (asking me to approve it once is fine), not one by one.",
  "- This is one job. Keep going until every listed file is written. Don't stop partway to ask me to continue.",
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
  "Install every package listed in the template's package.json. Keep this app's own package.json, vite.config.js and other setup files (only add missing packages). One exception: set zod and vite to at least the versions in the template's package.json (older ones have known security problems). For reference:",
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
  "- A new Base44 app already has the files below. Keep them as they are. Only if one is missing, create it exactly from its link:",
  ...stockUsed.map((f) => `  - ${f}: ${RAW}/${f}`),
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
    `- Write src/tools/${tool.id}.ready.js last, after every other file is in.`,
    tool.functions.length ? `- The base44/functions files are backend functions. Create them exactly as written, then DEPLOY them: each one (${tool.functions.join(", ")}) must appear in this app's list of backend functions. The tool fails with a 404 error if a function is only written and not deployed. Don't call or test them.` : null,
    `- When every file is written, open ${tool.route} in the preview once and confirm it shows ${tool.check}. Don't run any other checks or tests. Then reply with exactly this and stop: "Your ${tool.name} is ready. Refresh the preview to use it."`,
    "",
  ].filter((l) => l !== null);
  writeFileSync(join(root, "builds", `${tool.id}.md`), md.join("\n"));
}

console.log(`v${version} (links to ${REF}): HQ shell ${shell.length} files (${kb(shell)} KB), runtime/libs.js ${libsKb} KB`);
for (const tool of TOOLS) console.log(`  ${tool.id}: ${groups[tool.id].length} files (${kb(groups[tool.id])} KB)`);
