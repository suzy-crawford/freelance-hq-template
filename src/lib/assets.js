// SheFreelances OS - images (assets.js)
// Images load from the member template for this app version, so every member's copy shows the
// same images without copying image files into Base44.
import { APP_VERSION } from "./version";

export const asset = (path) => `https://cdn.jsdelivr.net/gh/suzy-crawford/freelance-hq-template@v${APP_VERSION}/public${path}`;
