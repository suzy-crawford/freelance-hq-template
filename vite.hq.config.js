// Builds the whole HQ as one hosted bundle. Members' apps only hold a small loader (hq/loader-main.jsx),
// their data tables and their backend functions; the loader passes in the app's Base44 settings.
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const env = (name) => `globalThis.__HQ_ENV__.${name}`;

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  base: "./",
  define: {
    "import.meta.env.VITE_BASE44_APP_ID": env("VITE_BASE44_APP_ID"),
    "import.meta.env.VITE_BASE44_FUNCTIONS_VERSION": env("VITE_BASE44_FUNCTIONS_VERSION"),
    "import.meta.env.VITE_BASE44_APP_BASE_URL": env("VITE_BASE44_APP_BASE_URL"),
  },
  build: {
    outDir: "hq-dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/main.jsx",
      preserveEntrySignatures: "exports-only",
      output: { entryFileNames: "hq.js", chunkFileNames: "chunks/[name]-[hash].js", assetFileNames: (a) => (a.name?.endsWith(".css") ? "hq.css" : "assets/[name]-[hash][extname]") },
    },
  },
});
