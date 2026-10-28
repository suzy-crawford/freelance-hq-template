# Freelance HQ 3.0.1: add the AI Client Finder

This app already has the Freelance HQ. Add the AI Client Finder by copying these 14 files exactly.

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

- base44/functions/findBusinesses/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/base44/functions/findBusinesses/entry.ts
- base44/functions/findEmail/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/base44/functions/findEmail/entry.ts
- base44/functions/generateWithAI/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/base44/functions/generateWithAI/entry.ts
- src/lib/ai.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/lib/ai.js
- src/components/shared/EmptyState.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/shared/EmptyState.jsx
- src/lib/libs.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/lib/libs.js
- src/components/shared/ToolKit.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/shared/ToolKit.jsx
- src/components/shared/CopyIcon.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/shared/CopyIcon.jsx
- src/components/clients/ContactRow.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/clients/ContactRow.jsx
- src/pages/GetClients.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/pages/GetClients.jsx
- src/components/builds/BuildsPanel.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/builds/BuildsPanel.jsx
- src/components/clients/LeadWorkspace.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/components/clients/LeadWorkspace.jsx
- src/pages/ProspectDetail.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/pages/ProspectDetail.jsx
- src/tools/clients.ready.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/test-3.0.1/src/tools/clients.ready.js

## Finish

- Write src/tools/clients.ready.js last, after every other file is in.
- The base44/functions files are backend functions. Create them exactly as written, then DEPLOY them: each one (findBusinesses, findEmail, generateWithAI) must appear in this app's list of backend functions. The tool fails with a 404 error if a function is only written and not deployed. Don't call or test them.
- When every file is written, open /clients in the preview once and confirm it shows the Client Finder page with a Find businesses button. Don't run any other checks or tests. Then reply with exactly this and stop: "Your AI Client Finder is ready. Refresh the preview to use it."
