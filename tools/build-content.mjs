// Publish step: bump the content revision, then write content.json from the bundled libraries.
// Run with: npx tsx tools/build-content.mjs   (sync_template.sh runs it for you)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const revFile = join(root, "src/lib/contentRev.js");
const current = Number(readFileSync(revFile, "utf8").match(/BUNDLED_CONTENT_REV = (\d+)/)[1]);
const rev = current + 1;
writeFileSync(revFile, readFileSync(revFile, "utf8").replace(/BUNDLED_CONTENT_REV = \d+/, `BUNDLED_CONTENT_REV = ${rev}`));

const { buildContent } = await import(join(root, "src/lib/liveContent.js"));
const { APP_VERSION } = await import(join(root, "src/lib/version.js"));
const content = buildContent(APP_VERSION, rev);
writeFileSync(join(root, "content.json"), JSON.stringify(content, null, 2) + "\n");
console.log(`content.json written: rev ${rev}, ${Object.keys(content).length - 4} sections`);
