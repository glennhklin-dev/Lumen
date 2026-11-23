# Lumen — notes for Claude

- The whole game is `index.html` (canvas + vanilla JS, no build step). GitHub Pages deploys it from `main`.
- **Bump `VERSION` near the top of the script on every change** (semver-ish: minor for features, patch for fixes). It's shown on the title and pause screens so the user can confirm the live site updated.
- Feel/balance numbers live in `TDEF` (live-editable in game with T). Bump the `TKEY` suffix when defaults change meaningfully.
- Design intent: inspired by Hollow Knight but not a copy. No swipe attack, no pogo (locked ability flag only), no channelled heal. Light is the core verb.
- **Always merge automatically** (user's standing instruction): after pushing, open a PR to `main` and merge it yourself.
- The map is data: `buildOfficialGrid()` + the `*_DEF` lists form `officialMap()`; `loadMap()` loads any map. The in-game editor (M) saves a custom map to localStorage (`lumen.map.v1`) which overrides the official one in that browser. To adopt a user's exported map as official, replace the official data with it.
