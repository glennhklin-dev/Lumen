// Usage: node tools/check-progression.js  (needs Playwright + Chromium)
// Ability-aware progression check: which pickups/beacons are reachable at each stage, at low and high tide.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(800);
  const D = await p.evaluate(() => { const L = window.__lumen; L.newGame(); L.enterEditor(); const m = L.ed.map; const W = 400, H = 200; const rows = [];
    for (let y = 0; y < H; y++) { let r = ''; for (let x = 0; x < W; x++) r += L.tile(x, y); rows.push(r); }
    return { rows, spawn: m.spawn, ups: m.upgrades, beacons: m.beacons, tides: m.tides || [], areas: m.areas }; });
  await b.close();
  const W = 400, H = 200, g = D.rows;
  const reach2 = ab => {           // fixpoint over both tides: wherever you can be, you can wait for the water to change
    const lo = reach(ab, 'low', []), hi = reach(ab, 'high', []);
    for (let it = 0; it < 6; it++) {
      const a = lo.size, bb = hi.size;
      for (const c of reach(ab, 'high', [...lo].map(k => floatUp(k, 'high'))).keys()) hi.add(c);
      for (const c of reach(ab, 'low', [...hi].map(k => sinkDown(k))).keys()) lo.add(c);
      if (lo.size === a && hi.size === bb) break;
    }
    return { lo, hi };
  };
  let floatUp, sinkDown;
  const reach = (ab, tide, seeds) => {
    const water = (x, y) => { for (const t of D.tides) if (x >= t.x0 && x <= t.x1 && y >= t.y0 && y <= t.y1) return y >= (tide === 'high' ? t.high : t.low); return false; };
    const tc = (x, y) => x < 0 || y < 0 || x >= W || y >= H ? '#' : g[y][x];
    const solid = (x, y) => { const c = tc(x, y); return c === '#' || c === 'I' || c === 'G' || c === 'w' || ((c === 'R' || c === 'B') && !ab.prism); };
    const open = (x, y) => !solid(x, y) && tc(x, y) !== '~' && tc(x, y) !== 'S';
    const plat = (x, y) => solid(x, y) || tc(x, y) === '=' || tc(x, y) === 'S';
    const wet = (x, y) => open(x, y) && water(x, y);
    const stand = (x, y) => open(x, y) && !wet(x, y) && ((plat(x, y + 1) && tc(x, y + 1) !== '~') || wet(x, y + 1));
    const land = (x, y) => { while (y < H - 1) { if (!open(x, y) || wet(x, y)) return -1; if (stand(x, y)) return y * W + x; if (tc(x, y + 1) === '~') return -1; y++; } return -1; };
    const U0 = ab.dash && ab.updraft ? 10 : ab.dash ? 8 : ab.updraft ? 6 : 3, G0 = ab.dash ? 8 : ab.updraft ? 6 : 4;
    const nb = k => { const x = k % W, y = (k - x) / W, out = [], add = q => { if (q >= 0) out.push(q); };
      const onWater = wet(x, y + 1), U = onWater ? (ab.updraft ? 5 : 2) + (ab.dash ? 4 : 0) : U0, G = G0;
      for (const dx of [-1, 1]) if (open(x + dx, y)) { if (stand(x + dx, y)) add(y * W + x + dx); else add(land(x + dx, y)); }
      for (let up = 0; up <= U; up++) {
        let ok = true; for (let k2 = 0; k2 <= up; k2++) if (!open(x, y - k2)) { ok = false; break; } if (!ok) break;
        const ty = y - up;
        for (const dx of [-1, 1]) for (let d = 1; d <= G; d++) { if (!open(x + dx * d, ty)) break; const tx = x + dx * d; if (stand(tx, ty)) add(ty * W + tx); add(land(tx, ty)); }
        if (up > 0 && stand(x, ty)) add(ty * W + x);
      }
      return out; };
    floatUp = k => { const x = k % W; let y = (k - x) / W; while (y > 0 && wet(x, y) && open(x, y - 1)) y--; return stand(x, y) ? y * W + x : -1; };
    sinkDown = k => { const x = k % W, y = (k - x) / W; return land(x, y); };
    const start = land(D.spawn.x, D.spawn.gy - 1), seen = new Set([start, ...seeds.filter(q => q >= 0)]), q = [...seen];
    while (q.length) { const c = q.pop(); for (const n of nb(c)) if (!seen.has(n)) { seen.add(n); q.push(n); } }
    return seen;
  };
  const areaOf = (x, y) => (D.areas.find(a => x >= a.x0 && x <= a.x1 && y >= a.y0 && y <= a.y1) || { name: '-' }).name;
  const items = [...D.ups.map(u => ({ n: u.name, x: u.x, y: u.gy - 1 })), ...D.beacons.map(bb => ({ n: 'beacon', x: bb.x, y: bb.gy - 1 }))];
  const stages = [['none', {}], ['dash', { dash: 1 }], ['dash+updraft', { dash: 1, updraft: 1 }], ['dash+prism', { dash: 1, prism: 1 }], ['all', { dash: 1, updraft: 1, prism: 1 }]];
  const first = {};
  for (const [nm, ab] of stages) { const rr = reach2(ab); for (const tide of ['low', 'high']) {
    const s = tide === 'low' ? rr.lo : rr.hi;
    for (const it of items) { const key = `${it.n} @${it.x},${it.y + 1} [${areaOf(it.x, it.y)}]`; if (s.has(it.y * W + it.x) && !first[key]) first[key] = `${nm}/${tide}`; }
  } }
  for (const it of items) { const key = `${it.n} @${it.x},${it.y + 1} [${areaOf(it.x, it.y)}]`; console.log((first[key] || 'NEVER').padEnd(18), key); }
  console.log(errs);
})();
