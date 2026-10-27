// Freelance HQ starter. SheFreelances hosts the HQ and keeps it up to date; this file starts it in your app
// with your app's own Base44 settings, so your data and your account stay yours.
const REPO = "suzy-crawford/freelance-hq-template";

globalThis.__HQ_ENV__ = {
  VITE_BASE44_APP_ID: import.meta.env.VITE_BASE44_APP_ID,
  VITE_BASE44_FUNCTIONS_VERSION: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
  VITE_BASE44_APP_BASE_URL: import.meta.env.VITE_BASE44_APP_BASE_URL,
};

const root = document.getElementById("root");
root.innerHTML = '<div style="font-family:Inter,system-ui,sans-serif;color:#6b6b7b;text-align:center;padding:96px 24px">Opening your Freelance HQ...</div>';

const addStyle = (href) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

fetch(`https://raw.githubusercontent.com/${REPO}/main/hq-dist/latest.json?t=${Date.now()}`, { cache: "no-store" })
  .then((res) => res.json())
  .then(({ build }) => {
    const base = `https://cdn.jsdelivr.net/gh/${REPO}@${build}/hq-dist/`;
    addStyle("https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");
    addStyle(base + "hq.css");
    return import(/* @vite-ignore */ base + "hq.js");
  })
  .catch(() => {
    root.innerHTML = '<div style="font-family:Inter,system-ui,sans-serif;text-align:center;padding:96px 24px">Your Freelance HQ couldn\'t open. Check your internet connection and refresh the page.</div>';
  });
