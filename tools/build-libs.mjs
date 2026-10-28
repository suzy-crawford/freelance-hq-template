// Publish step: bundle the AI tools' libraries (src/lib/runtime.js) into runtime/libs.js, and write src/lib/libs.js,
// the file screens import them from. Members' apps load the bundle from the template when a tool opens, so a
// tool's build copies only its screens. build-manifest.mjs runs this first; run alone with: node tools/build-libs.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { build } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ref: the template tag (or test branch) whose runtime/libs.js this app loads. Written into libs.js, so a tool built
// into an older HQ still loads the libraries it was built with.
export async function buildLibs(ref) {
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
  const groups = order.map((lib) => {
    const specs = Object.keys(bundle[lib]).sort().map((n) => (taken.has(n) ? `${n}: ${lib}_${n}` : (taken.add(n), n)));
    return { lib, specs, names: specs.map((s) => s.split(": ").pop()) };
  });
  const own = ["LIBS_REF", "SF_REPO", "SF_LOCAL", "sfFill", "sfImportBundle", "sfLoading", "libsReady", "loadLibs"];
  const clash = own.filter((n) => taken.has(n));
  if (clash.length) throw new Error(`A library exports a name libs.js uses itself: ${clash.join(", ")}`);
  const hub = [
    "// SheFreelances OS - the AI tools' libraries (libs.js)",
    "// Written by tools/build-libs.mjs from src/lib/runtime.js. Don't edit it by hand.",
    "// The libraries are one bundle in the template (runtime/libs.js). loadLibs() loads it (withLibs in ToolKit.jsx",
    "// calls it before a tool page shows), then fills in the names below. An app that has src/lib/runtime.js (the",
    "// master app) loads the library files from there instead. A name two libraries share keeps its plain name for",
    "// the first library in runtime.js; the other is <library>_<name>.",
    `export const LIBS_REF = ${JSON.stringify(ref)};`,
    'const SF_REPO = "suzy-crawford/freelance-hq-template";',
    'const SF_LOCAL = import.meta.glob("./runtime.js");',
    "",
    ...groups.map((g) => `export let ${g.names.join(", ")};`),
    "",
    "function sfFill(L) {",
    ...groups.map((g) => `  ({ ${g.specs.join(", ")} } = L.${g.lib});`),
    "}",
    "",
    "async function sfImportBundle() {",
    "  try {",
    "    return await import(/* @vite-ignore */ `https://cdn.jsdelivr.net/gh/${SF_REPO}@${LIBS_REF}/runtime/libs.js`);",
    "  } catch {",
    "    // The CDN is down or blocked: read the same file from GitHub and load it from memory.",
    "    const res = await fetch(`https://raw.githubusercontent.com/${SF_REPO}/${LIBS_REF}/runtime/libs.js`);",
    "    if (!res.ok) throw new Error(`Couldn't load the AI tools (${res.status}). Check your internet connection and refresh.`);",
    '    const url = URL.createObjectURL(new Blob([await res.text()], { type: "text/javascript" }));',
    "    try {",
    "      return await import(/* @vite-ignore */ url);",
    "    } finally {",
    "      URL.revokeObjectURL(url);",
    "    }",
    "  }",
    "}",
    "",
    "let sfLoading = null;",
    "export let libsReady = false;",
    "export function loadLibs() {",
    '  sfLoading ??= (SF_LOCAL["./runtime.js"] ? SF_LOCAL["./runtime.js"]() : sfImportBundle()).then(',
    "    (m) => {",
    "      sfFill(m);",
    "      libsReady = true;",
    "      m.startLiveContent?.();",
    "    },",
    "    (e) => {",
    "      sfLoading = null;",
    "      throw e;",
    "    }",
    "  );",
    "  return sfLoading;",
    "}",
    "",
  ].join("\n");
  writeFileSync(join(root, "src/lib/libs.js"), hub);
  return Math.round(readFileSync(join(root, "runtime/libs.js")).length / 1024);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) console.log(`runtime/libs.js: ${await buildLibs(process.env.HQ_REF || `v${JSON.parse(readFileSync(join(root, "version.json"), "utf8")).hq}`)} KB`);
