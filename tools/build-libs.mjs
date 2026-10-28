// Publish step: bundle the AI tools' libraries (src/lib/runtime.js) into runtime/libs.js, and write src/lib/libs.js,
// the file screens import them from. Members' apps load the bundle from the template when a tool opens, so a
// tool's build copies only its screens. build-manifest.mjs runs this first; run alone with: node tools/build-libs.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { build } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export async function buildLibs() {
  await build({
    configFile: false,
    root,
    logLevel: "warn",
    resolve: { alias: { "@": join(root, "src") } },
    build: {
      lib: { entry: join(root, "src/lib/runtime.js"), formats: ["es"], fileName: () => "libs.js" },
      outDir: join(root, "runtime"),
      emptyOutDir: true,
      minify: true,
      copyPublicDir: false,
    },
  });
  // The bundle has no imports of its own, so Node can load it to list what each library exports.
  const bundle = await import(`${pathToFileURL(join(root, "runtime/libs.js")).href}?t=${Date.now()}`);
  const order = [...readFileSync(join(root, "src/lib/runtime.js"), "utf8").matchAll(/export \* as (\w+) from/g)].map((m) => m[1]);
  const taken = new Set();
  const lines = order.map((lib) => {
    const names = Object.keys(bundle[lib]).sort();
    const specs = names.map((n) => (taken.has(n) ? `${n}: ${lib}_${n}` : (taken.add(n), n)));
    return `export const { ${specs.join(", ")} } = L.${lib};`;
  });
  const hub = [
    "// SheFreelances OS - the AI tools' libraries (libs.js)",
    "// Written by tools/build-libs.mjs from src/lib/runtime.js. Don't edit it by hand.",
    "// The libraries load when a tool page opens (loadLibs in hq.js), before any screen that imports this file.",
    "// A name two libraries share keeps its plain name for the first library in runtime.js; the other is <library>_<name>.",
    "const L = globalThis.__sfLibs;",
    'if (!L) throw new Error("The tool libraries haven\'t loaded yet. Refresh the page.");',
    "",
    ...lines,
    "",
  ].join("\n");
  writeFileSync(join(root, "src/lib/libs.js"), hub);
  return Math.round(readFileSync(join(root, "runtime/libs.js")).length / 1024);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) console.log(`runtime/libs.js: ${await buildLibs()} KB`);
