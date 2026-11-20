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

**Touch (phones/tablets):** twin floating joysticks. Put a thumb down anywhere on the left side and drag to move. Do the same on the right side to aim the lantern beam at any angle; it shines while you hold. A tap without dragging shines the way you face. Jump, E and pause are buttons.

## Feel systems

- **Movement:** separate ground and air acceleration/deceleration, a turn-around boost, coyote time, jump buffering, variable jump height (release cut), apex hang, heavier fall gravity, and ceiling corner correction.
- **Lantern beam:** hold to pour a soft cone of light that burns fuel and lights up the rock it falls on. Fuel regenerates after a short pause. Arrows aim the beam, and it sweeps toward the new angle rather than snapping (turning around sweeps over your head). Murklings in the cone burn and are pushed along it. Walls block the light. The beam reveals hidden walkways at range and narrows the lantern's glow while lit. Emptying the tank causes a burnout: the lantern dims and can't relight until fuel recovers. Pogo is kept behind `ABILITIES.pogo` for a later unlock.
- **Murklings:** a telegraphed lunge (eyes turn orange), cancelled by the beam.
- **Healing (light-based, no channelled heal):**
  - *Wick-lamps*: pour oil into an unlit lamp with the beam to light it. The first lighting costs 35 oil, and each relight costs 25 more (35 → 60 → 85 → 110…). If the beam leaves the lamp or you run dry, the kindling fades within about a second. Once the cost is more than your tank can hold, the lamp stays locked until you upgrade fuel capacity (`fuelMax`). A lit lamp's warm zone restores a mask every 2.5s, up to 2 per lighting, and Murklings won't enter it. Lamps keep their state when you rest or die.
  - *Embers*: Murklings burned by your beam often drop an ember. Gather 3 to mend a mask.
  - *Beacons*: full restore, and they're your checkpoints.
- **Damage:** knockback, a brief control lock, i-frames, and lantern flicker.
- **Juice:** squash and stretch, plus dust when running, skidding and landing.
- **Camera:** smoothed follow with look-ahead.

Every number lives in `TDEF` at the top of the script. Press **T** in game to adjust them live with sliders. Values persist in localStorage. Use **Copy JSON** to export a set you like, then paste it back into the defaults.

## Level (Driftwood Hollow slice)

The slice has 5 masks, a fuel gauge, Murklings, two drowned gaps crossed on hidden walkways that only exist in lantern light, 4 beacons (checkpoints), 5 keeper's logs with real lighthouse and optics facts, and a 3-mirror beam puzzle. The puzzle charges a crystal, which opens the way to the final beacon and the Focus Lens.
