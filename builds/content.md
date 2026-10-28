# Freelance HQ 3.0.0: add the AI Content Creator

This app already has the Freelance HQ. Add the AI Content Creator by copying these 18 files exactly.

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
- src/pages/ContentHome.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/ContentHome.jsx
- src/lib/callAI.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/callAI.js
- src/lib/adsCards.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsCards.js
- src/lib/adsData.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsData.js
- src/lib/adsNiches.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsNiches.js
- src/lib/adsAngleLibrary.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsAngleLibrary.js
- src/lib/adsBuilder.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsBuilder.js
- src/lib/adsMasterPrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsMasterPrompts.js
- src/lib/adsCreative.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsCreative.js
- src/lib/adsEngine.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/adsEngine.js
- src/components/ads/MetaAdsBuilder.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ads/MetaAdsBuilder.jsx
- src/lib/copyVoice.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/copyVoice.js
- src/lib/contentEngine.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/contentEngine.js
- src/components/content/ContentCreator.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/content/ContentCreator.jsx
- src/pages/ContentPlan.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/ContentPlan.jsx
- src/tools/content.ready.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/tools/content.ready.js

## Finish

- Write src/tools/content.ready.js last, after every other file is in.
- The base44/functions files are backend functions. Create them exactly as written, then DEPLOY them: each one (generateWithAI, readWebsite) must appear in this app's list of backend functions. The tool fails with a 404 error if a function is only written and not deployed. Don't call or test them.
- When every file is written, open /content in the preview once and confirm it shows the Content Creator page. Don't run any other checks or tests. Then reply with exactly this and stop: "Your AI Content Creator is ready. Refresh the preview to use it."
