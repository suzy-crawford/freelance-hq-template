// SheFreelances OS - HQ basics (hq.js)
// Images, the brand stylesheets, the theme and the setup answers' options.
import { TEMPLATE_REPO, TEMPLATE_REF } from "./version";

const REPO = TEMPLATE_REPO.replace("https://github.com/", "");
const CDN = `https://cdn.jsdelivr.net/gh/${REPO}@${TEMPLATE_REF}`;

// ---------- Images ----------
// Images load from the member template for this app version, so every member's copy shows the
// same images without copying image files into Base44.
export const asset = (path) => `${CDN}/public${path}`;

// ---------- Brand stylesheets ----------
// The brand look lives in six stylesheets in src/brand. They are loaded here rather than from index.css, so
// a member's new app looks right from the very first install message: until all six files have been
// copied in, the app loads the same files from the public template (pinned to this app's version).
const FILES = ["tokens.css", "app.css", "brand2-1.css", "brand2-2.css", "brand2-3.css", "brand2-4.css"];

// Order matters (tokens first, the brand 2.0 restyle last), so each group is its own import.
const tokens = import.meta.glob("../brand/tokens.css", { eager: true });
const app = import.meta.glob("../brand/app.css", { eager: true });
const brand2 = import.meta.glob("../brand/brand2-*.css", { eager: true });

const present = new Set([...Object.keys(tokens), ...Object.keys(app), ...Object.keys(brand2)].map((p) => p.split("/").pop()));

export function loadBrandStyles() {
  if (FILES.every((f) => present.has(f))) return;
  const base = `${CDN}/src/brand/`;
  // Prepend in reverse, so the files end up first in <head> in their normal order, before the app's own styles.
  [...FILES].reverse().forEach((file) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = base + file;
    document.head.prepend(link);
  });
}

// ---------- Theme ----------
// Day / Night / Auto (APP-UI: respect the OS setting, offer a toggle). Auto follows the device setting.
const THEME_KEY = "sf-theme";

export function getThemeChoice() {
  try {
    return localStorage.getItem(THEME_KEY) || "auto";
  } catch {
    return "auto";
  }
}

export function applyTheme(choice) {
  const root = document.documentElement;
  if (choice === "light" || choice === "dark") root.setAttribute("data-theme", choice);
  else root.removeAttribute("data-theme");
}

export function setThemeChoice(choice) {
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch {
    /* storage unavailable */
  }
  applyTheme(choice);
}

// ---------- Setup answers ----------
export const INCOME_PRESETS = [1000, 3000, 5000];

export const EXPERIENCE_OPTIONS = [
  { value: "brand_new", title: "Brand new", description: "I'm still learning the skill." },
  { value: "no_clients", title: "No paying clients yet", description: "I've practiced, but nobody has paid me yet." },
  { value: "has_clients", title: "I have paying clients", description: "At least one business has paid me for marketing work." },
];

export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Ireland",
  "South Africa",
  "Nigeria",
  "Kenya",
  "India",
  "Philippines",
  "Pakistan",
  "Bangladesh",
  "United Arab Emirates",
  "Saudi Arabia",
  "Singapore",
  "Malaysia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Other",
];
// Where members go to keep learning. Placeholder: the SheFreelances AI Skool group doesn't exist yet,
// so both point at the F2CEO group for now. Update when the SheFreelances AI links are ready.
export const LEARNING_LINKS = {
  course: "https://www.skool.com/freelancer-to-ceo-6523",
  community: "https://www.skool.com/freelancer-to-ceo-6523",
};
