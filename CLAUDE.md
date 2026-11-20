# Lumen — notes for Claude

- The whole game is `index.html` (canvas + vanilla JS, no build step). GitHub Pages deploys it from `main`.
- **Bump `VERSION` near the top of the script on every change** (semver-ish: minor for features, patch for fixes). It's shown on the title and pause screens so the user can confirm the live site updated.
- Feel/balance numbers live in `TDEF` (live-editable in game with T). Bump the `TKEY` suffix when defaults change meaningfully.
- Design intent: inspired by Hollow Knight but not a copy. No swipe attack, no pogo (locked ability flag only), no channelled heal. Light is the core verb.
