# Lumen — prototype

A 2D side-view action-exploration game set on the Sunken Coast. You are a lantern keeper relighting the Great Lighthouse. It's a single self-contained file: open `index.html` in a browser.

## Controls

| Action | Keyboard | Gamepad |
|---|---|---|
| Move | ← → / A D | Stick / D-pad |
| Aim up / down | ↑ ↓ / W S | Stick / D-pad |
| Jump (hold for higher) | Space / Z / K | A |
| Lantern beam (hold; aim with arrows) | X / J | X |
| Read lore / turn mirror | E / C | Y |
| Pause | Esc / P | Start |
| Feel tuning panel | T | — |

Touch buttons appear on touch devices.

## Feel systems

- **Movement:** separate ground and air acceleration/deceleration, a turn-around boost, coyote time, jump buffering, variable jump height (release cut), apex hang, heavier fall gravity, and ceiling corner correction.
- **Lantern beam:** hold to pour a cone of light that burns fuel. Fuel regenerates after a short pause. Arrows aim the beam, and it sweeps toward the new angle rather than snapping (turning around sweeps over your head). Murklings in the cone burn and are pushed along it. Walls block the light. The beam reveals hidden walkways at range and narrows the lantern's glow while lit. Emptying the tank causes a burnout: the lantern dims and can't relight until fuel recovers. Pogo is kept behind `ABILITIES.pogo` for a later unlock.
- **Murklings:** a telegraphed lunge (eyes turn orange), cancelled by the beam.
- **Healing:** beacons only, for now.
- **Damage:** knockback, a brief control lock, i-frames, and lantern flicker.
- **Juice:** squash and stretch, plus dust when running, skidding and landing.
- **Camera:** smoothed follow with look-ahead.

Every number lives in `TDEF` at the top of the script. Press **T** in game to adjust them live with sliders. Values persist in localStorage. Use **Copy JSON** to export a set you like, then paste it back into the defaults.

## Level (Driftwood Hollow slice)

The slice has 5 masks, a fuel gauge, Murklings, two drowned gaps crossed on hidden walkways that only exist in lantern light, 4 beacons (checkpoints), 5 keeper's logs with real lighthouse and optics facts, and a 3-mirror beam puzzle. The puzzle charges a crystal, which opens the way to the final beacon and the Focus Lens.
