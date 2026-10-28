# Freelance HQ 3.0.0: add the Meta Ads Builder

This app already has the Freelance HQ. Add the Meta Ads Builder by copying these 15 files exactly.

## Rules (follow every one)

- Copy, don't build. Don't plan, design, redesign, improve, simplify, rename, merge or split anything.
- For every file below: open its link and create the file at exactly that path with exactly that content, character for character. If the file already exists, replace it.
- Never write your own version of a file, never summarize one, and never leave one out. If a file is long, keep going until it's complete.
- Don't create files that aren't listed, and don't change any other file in the app.
- Write each file once and move on. Don't re-check files, compute hashes or test between files. The app's Setup check does that.
- Copy all the files in one go with your bulk copy or download step (asking me to approve it once is fine), not one by one.
- This is one job. Keep going until every listed file is written. Don't stop partway to ask me to continue.
- If a link doesn't load, stop and tell me which one. Never write your own version of a file instead.
- Never create, change or delete any data records, and never run clean-ups or migrations on data. Only write the files listed here.
- Don't ask me any questions and don't suggest extra features. Just do the steps below.
- Spacing and line breaks don't matter. Images load from the internet by themselves; don't create image files.

## Files

- base44/functions/generateWithAI/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/functions/generateWithAI/entry.ts
- base44/functions/readWebsite/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/functions/readWebsite/entry.ts
- src/pages/AdsHome.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/AdsHome.jsx
- src/lib/callAI.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/callAI.js
- src/lib/adsData.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsData.js
- src/lib/adsNiches.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsNiches.js
- src/lib/adsCards.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsCards.js
- src/lib/adsAngleLibrary.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsAngleLibrary.js
- src/lib/adsBuilder.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsBuilder.js
- src/lib/adsMasterPrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsMasterPrompts.js
- src/lib/adsCreative.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsCreative.js
- src/lib/adsEngine.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsEngine.js
- src/components/ads/MetaAdsBuilder.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ads/MetaAdsBuilder.jsx
- src/pages/AdCampaign.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/AdCampaign.jsx
- src/tools/ads.ready.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/tools/ads.ready.js

## Finish

- Write src/tools/ads.ready.js last, after every other file is in.
- The base44/functions files are backend functions. Create them exactly as written, then DEPLOY them: each one (generateWithAI, readWebsite) must appear in this app's list of backend functions. The tool fails with a 404 error if a function is only written and not deployed. Don't call or test them.
- When every file is written, open /ads in the preview once and confirm it shows the Meta Ads Builder page. Don't run any other checks or tests. Then reply with exactly this and stop: "Your Meta Ads Builder is ready. Refresh the preview to use it."
