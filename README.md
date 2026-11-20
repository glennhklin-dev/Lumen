# Lumen — prototype

A 2D side-view action-exploration game set on the Sunken Coast. You are a lantern keeper relighting the Great Lighthouse. It's a single self-contained file: open `index.html` in a browser.

## Controls

| Action | Keyboard | Gamepad |
|---|---|---|
| Move | ← → / A D | Stick / D-pad |
| Aim up / down | ↑ ↓ / W S | Stick / D-pad |
| Jump (hold for higher) | Space / Z / K | A |
| Flash (↑ up, ↓ down in air = pogo) | X / J | X |
| Read lore / turn mirror | E / C | Y |
| Heal (hold, costs 1 oil) | F / L | B |
| Pause | Esc / P | Start |
| Feel tuning panel | T | — |

Touch buttons appear on touch devices.

## Feel systems

- **Movement:** separate ground and air acceleration/deceleration, a turn-around boost, coyote time, jump buffering, variable jump height (release cut), apex hang, heavier fall gravity, and ceiling corner correction.
- **Combat:** buffered Flash with directional hitboxes, hit-stop (heavier on kills), enemy knockback, player recoil, down-flash pogo, screen shake, a light burst on every Flash, and a telegraphed Murkling lunge (eyes turn orange).
- **Damage:** knockback, a brief control lock, i-frames, and lantern flicker.
- **Juice:** squash and stretch, plus dust when running, skidding and landing.
- **Camera:** smoothed follow with look-ahead.

Every number lives in `TDEF` at the top of the script. Press **T** in game to adjust them live with sliders. Values persist in localStorage. Use **Copy JSON** to export a set you like, then paste it back into the defaults.

## Level (Driftwood Hollow slice)

The slice has 5 masks and 3 oil pips, Murklings, two drowned gaps crossed on hidden walkways that only exist in lantern light, 4 beacons (checkpoints), 5 keeper's logs with real lighthouse and optics facts, and a 3-mirror beam puzzle. The puzzle charges a crystal, which opens the way to the final beacon and the Focus Lens.
