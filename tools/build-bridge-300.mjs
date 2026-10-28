// Release step for members on HQ 3.0.0: their Build screens open builds/<tool>.md under the v3.0.0 tag, and their
// Setup check reads copy-manifest.json under that tag. This writes both for the newer tools, into a folder you
// copy over the v3.0.0 files: the four tool build files (the same as this version's) and a copy-manifest.json whose
// HQ and Offer Builder lists are exactly v3.0.0's, with the other tools' lists from this version, fingerprinted the
// way the 3.0.0 Setup check does. Run after build-manifest.mjs: node tools/build-bridge-300.mjs <folder>
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fingerprint300 } from "./fingerprint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) throw new Error("Usage: node tools/build-bridge-300.mjs <folder>");

const v300 = JSON.parse(readFileSync(join(root, "tools/v3.0.0-manifest.json"), "utf8"));
const now = JSON.parse(readFileSync(join(root, "copy-manifest.json"), "utf8")).files;
const NEW_TOOLS = ["clients", "ads", "content", "buildlab"];

const files = {};
for (const [f, e] of Object.entries(v300.files)) {
  const groups = e.groups.filter((g) => !NEW_TOOLS.includes(g));
  if (groups.length) files[f] = { groups, hash: e.hash };
}
for (const [f, e] of Object.entries(now)) {
  for (const id of e.groups.filter((g) => NEW_TOOLS.includes(g))) {
    files[f] ??= { groups: [], hash: fingerprint300(readFileSync(join(root, f), "utf8"), f) };
    files[f].groups.push(id);
  }
}
mkdirSync(join(out, "builds"), { recursive: true });
writeFileSync(join(out, "copy-manifest.json"), JSON.stringify({ version: v300.version, files }, null, 2) + "\n");
for (const id of NEW_TOOLS) copyFileSync(join(root, "builds", `${id}.md`), join(out, "builds", `${id}.md`));
console.log(`v3.0.0 bridge written to ${out}: copy-manifest.json and builds/{${NEW_TOOLS.join(",")}}.md`);
