// Publish step: fingerprint every source file and split them into copy parts for members.
// Writes copy-manifest.json, which the in-app Copy check compares against.
// Run with: node tools/build-manifest.mjs   (sync_template.sh runs it for you)
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
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

const files = [
  "tailwind.config.js",
  // base44/config.jsonc holds each app's own project name, so it's left out.
  ...walk(join(root, "base44"), [".jsonc", ".ts", ".js"]).filter((f) => !f.endsWith("config.jsonc")),
  ...walk(join(root, "src"), [".js", ".jsx", ".css"]),
].sort((a, b) => {
  // Order: setup files, the backend, shared libraries, components, then pages and the app shell.
  const rank = (f) => (f.startsWith("base44/") ? 1 : f.startsWith("src/lib/") || f.startsWith("src/brand/") || f.startsWith("src/api/") || f.startsWith("src/utils/") || f.startsWith("src/hooks/") ? 2 : f.startsWith("src/components/") ? 3 : f.startsWith("src/pages/") ? 4 : f.startsWith("src/") ? 5 : 0);
  return rank(a) - rank(b) || a.localeCompare(b);
});

// Parts of about 180 KB each, so each Base44 message stays a manageable size.
const LIMIT = 180_000;
let part = 1;
let size = 0;
const entries = {};
for (const f of files) {
  const text = readFileSync(join(root, f), "utf8");
  if (size && size + text.length > LIMIT) {
    part += 1;
    size = 0;
  }
  size += text.length;
  entries[f] = { part, hash: fingerprint(text, f) };
}

const { version } = JSON.parse(readFileSync(join(root, "version.json"), "utf8"));
writeFileSync(join(root, "copy-manifest.json"), JSON.stringify({ version, parts: part, files: entries }, null, 2) + "\n");
console.log(`copy-manifest.json written: ${files.length} files in ${part} parts`);

// COPY.md: the copy instructions Base44 follows, one part per member message.
const RAW = `https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v${version}`;
const SETUP = ["package.json", "vite.config.js", "jsconfig.json", "postcss.config.js", "components.json"];
const lines = [
  `# Copy instructions for Freelance HQ ${version}`,
  "",
  "This repository is a finished, tested app. Your job is to copy it into this Base44 app exactly, one part at a time.",
  "",
  "## Rules (follow every one)",
  "",
  "- Copy, don't build. Do not plan, design, redesign, improve, simplify, rename, merge or split anything.",
  "- For every file in the part you're asked to do: open its link, and create the file at exactly that path with exactly that content, character for character.",
  "- Never write your own version of a file, never summarize a file, and never leave a file out. If a file is long, keep going until it's complete.",
  "- Don't create files that aren't listed, and don't change files from other parts.",
  "- Only do the part the user asks for, then stop and say which files you created.",
  "- The data entities are in base44/entities and the backend functions are in base44/functions. Create them exactly as written.",
  "- Images load from the internet by themselves. Don't create or download image files.",
  "- Spacing, line breaks and a missing final newline don't matter (the check ignores them), and Base44 reformatting entity files is fine. Don't spend time on those.",
  "",
  `There are ${part} parts. After the last part, the user opens My Profile, then Check my setup. Its Copy check compares every file with this list and names any file that isn't an exact copy.`,
  "",
];
for (let n = 1; n <= part; n++) {
  lines.push(`## Part ${n}`, "");
  if (n === 1) {
    lines.push("First make sure these setup files match (install every package listed in package.json):", "");
    SETUP.forEach((f) => lines.push(`- ${f}: ${RAW}/${f}`));
    lines.push("", "Then create these files:", "");
  }
  Object.entries(entries)
    .filter(([, e]) => e.part === n)
    .forEach(([f]) => lines.push(`- ${f}: ${RAW}/${f}`));
  lines.push("");
}
writeFileSync(join(root, "COPY.md"), lines.join("\n"));
console.log(`COPY.md written: ${part} parts`);
