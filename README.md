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
- **Respawning:** enemies placed in the map come back to where they started once they've been dead for 20s and you're far away (about 1100px) with that spot out of view, so nothing pops in in front of you. Dying at a beacon also brings them all back.
- **Murk pools:** dark spots on the ground that swallow nearby light and breed Murklings. A pool warns before spawning (a purple glow and rising eyes). Pools spawn about every 12s, limited by a global mob cap (5 alive) and a per-pool cap (2), and only happens when you're 140–640px away. Pools near a burning wick-lamp don't spawn. Burn a pool with the beam for about 2.5s of sustained light to destroy it. It slowly recovers if you look away, and it can't spawn while lit. A destroyed pool drops 3 embers (one mask) and stays gone until you die.
- **Healing (light-based, no channelled heal):**
  - *Wick-lamps*: pour oil into an unlit lamp with the beam to light it. The first lighting costs 35 oil, and each relight costs 25 more (35 → 60 → 85 → 110…). If the beam leaves the lamp or you run dry, the kindling fades within about a second. Once the cost is more than your tank can hold, the lamp stays locked until you upgrade fuel capacity (`fuelMax`). A lit lamp's warm zone restores a mask every 2.5s, up to 2 per lighting, and Murklings won't enter it. Lamps keep their state when you rest or die.
  - *Embers*: placed Murklings often drop an ember when burned, and destroyed murk pools drop 3. Spawned Murklings (from pools) drop embers at a lower 20% rate, so farming is possible but slow. Gather 3 to mend a mask.
  - *Beacons*: full restore, and they're your checkpoints.
- **Damage:** knockback, a brief control lock, i-frames, and lantern flicker.
- **Juice:** squash and stretch, plus dust when running, skidding and landing.
- **Camera:** smoothed follow with look-ahead.

Every number lives in `TDEF` at the top of the script. Press **T** in game to adjust them live with sliders. Values persist in localStorage. Use **Copy JSON** to export a set you like, then paste it back into the defaults.

## Level (the Sunken Coast slice, 200×60 tiles)

1. **Driftwood Shore:** the main band. It has two drowned gaps crossed on hidden walkways, and the climb to the pillar.
2. **Wreck Heights (optional, above):** reached by a shaft over the pillar. It holds shipwreck hulls, Gloomwings, a Shellback, and an **Oil Flask** (+25 fuel capacity) beyond a hidden walkway. The flask is what eventually lets you relight lamps that have become locked.
3. **Mirror hall:** a 3-mirror beam puzzle. Charging the crystal opens the door.
4. **Glasswater Caverns (below):** reached by dropping down a shaft past the door. It has a water pit with stepping stones, Drippers on the ceiling, Shellbacks and Gloomwings.
5. **Lamp Tower:** a 16-ledge climb to the summit beacon, which holds the Focus Lens and ends the demo.

The slice also has 6 beacons, 6 wick-lamps, 6 murk pools and 8 keeper's logs with real lighthouse and optics facts.

## Enemies

- **Murkling:** a ground walker that chases you and does a telegraphed lunge (its eyes turn orange).
- **Shellback:** armoured. Its shell deflects any beam that hits its face, and it turns slowly. Burn it from behind or from above. It drops 2 embers.
- **Gloomwing:** a flyer that hovers near its roost. Its eyes flare orange, then it swoops at you. The beam blows it around and interrupts the swoop.
- **Dripper:** hangs from ceilings and drops when you walk underneath. Shining the beam on it knocks it down early. On landing it becomes a slow crawler.
