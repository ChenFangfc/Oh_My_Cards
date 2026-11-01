/* film.js — the Oh My Cards film, about 32 s.
 *
 * The rule: a frame is a pure function of time. FILM.seek(t) sets every
 * moving property for t seconds — no CSS transitions, timers or randomness —
 * so the renderer can capture frames in any order, in parallel, and always
 * get the same film.
 *
 * Scenes (120 BPM, a bar is 2 s):
 *   0   Five real cards fan out. "Which one pays you most?"
 *   4.5 The chosen card flies into the menu bar and becomes its icon.
 *   6.5 The panel opens; a purchase is typed, ranked and logged.
 *   11  The panel becomes the app window: Smart Suggest, then the wallet.
 *   20  Activity, then the card library.
 *   23  The window folds into a laptop with a lock: the data stays here.
 *   27  The mark and the name.
 */
(function () {
  "use strict";

  const q = new URLSearchParams(location.search);
  const LANG = q.get("lang") === "zh" ? "zh" : "en";
  const RENDER = q.has("render");
  document.documentElement.lang = LANG;
  if (RENDER) document.documentElement.classList.add("render");
  const S = window.STR[LANG];
  const DURATION = 32;
  const FPS = 30;

  /* ── maths ─────────────────────────────────────────────────────────── */
  const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = {
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    inCubic: (x) => x * x * x,
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outQuint: (x) => 1 - Math.pow(1 - x, 5),
    inOutQuint: (x) => (x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2),
    outBack: (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2),
  };
  /** Fades in over [a, a+d], out over [b-d, b]. */
  const span = (t, a, b, d = 0.3) => seg(t, a, a + d) * (1 - seg(t, b - d, b));
  const f2 = (v) => (Math.abs(v) < 1e-4 ? 0 : +v.toFixed(3));

  /** Interpolates keyframes [[t, {..numbers}], ...] with an ease between each pair. */
  function track(keys, t, fn = ease.inOutCubic) {
    if (t <= keys[0][0]) return { ...keys[0][1] };
    for (let i = 0; i < keys.length - 1; i++) {
      const [ta, a] = keys[i];
      const [tb, b] = keys[i + 1];
      if (t <= tb) {
        const p = fn(seg(t, ta, tb));
        const out = {};
        for (const k in a) out[k] = lerp(a[k], b[k] ?? a[k], p);
        return out;
      }
    }
    return { ...keys[keys.length - 1][1] };
  }

  /* ── DOM ───────────────────────────────────────────────────────────── */
  const stage = document.getElementById("stage");
  function h(tag, cls, parent, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    (parent || stage).appendChild(e);
    return e;
  }
  function img(src, cls, parent) {
    const e = h("img", cls, parent);
    e.decoding = "sync";
    e.src = src;
    return e;
  }
  function put(e, o) {
    const tr = [];
    if (o.x || o.y) tr.push(`translate(${f2(o.x || 0)}px,${f2(o.y || 0)}px)`);
    if (o.r) tr.push(`rotate(${f2(o.r)}deg)`);
    if (o.s != null && o.s !== 1) tr.push(`scale(${f2(o.s)})`);
    e.style.transform = tr.join(" ");
    if (o.o != null) {
      const op = clamp(o.o);
      e.style.opacity = f2(op);
      e.style.visibility = op <= 0.002 ? "hidden" : "";
    }
    if (o.b != null) e.style.filter = o.b > 0.05 ? `blur(${f2(o.b)}px)` : "";
  }
  const hide = (e) => (e.style.visibility = "hidden");
  /** Opacity only, leaving the transform alone. */
  function fade(e, o) {
    const op = clamp(o);
    e.style.opacity = f2(op);
    e.style.visibility = op <= 0.002 ? "hidden" : "";
  }

  /* ── assets ────────────────────────────────────────────────────────── */
  const REPO = "../../";
  // The opening's cards — the demo wallet — left to right once fanned; the
  // middle one is the answer. SVG redrawings of the real designs
  // (scripts/cards.py), rasterised at 2080 px: the issuers' own art is too
  // small for 4K.
  const CARDS = [
    "amex-platinum",
    "chase-sapphire-reserve",
    "citi-custom-cash",
    "amex-gold",
    "capital-one-venture-x",
  ];
  const CAP = `captures/${LANG}/`;

  /* ── captions ──────────────────────────────────────────────────────── */
  const CJK = /[㐀-鿿　-〿＀-￯]/;
  function caption(key, cls, top, size) {
    const el = h("div", "cap " + (cls || ""));
    el.style.top = top + "px";
    el.style.fontSize = size + "px";
    const toks = [];
    const text = S[key];
    const parts = [];
    let last = 0;
    for (const m of text.matchAll(/\[\[([\s\S]*?)\]\]/g)) {
      parts.push([text.slice(last, m.index), false], [m[1], true]);
      last = m.index + m[0].length;
    }
    parts.push([text.slice(last), false]);
    for (const [body, acc] of parts) {
      for (const piece of body.split(/(\n)/)) {
        if (piece === "\n") { h("br", null, el); continue; }
        for (const tk of piece.match(/[㐀-鿿　-〿＀-￯]|[^\s㐀-鿿　-〿＀-￯]+|\s+/g) || []) {
          if (/^\s+$/.test(tk)) { el.appendChild(document.createTextNode(" ")); continue; }
          const s = h("span", "tk" + (acc ? " acc" : ""), el);
          s.textContent = tk;
          toks.push(s);
        }
      }
    }
    el._toks = toks;
    return el;
  }
  function showCaption(el, t, tin, tout) {
    if (t < tin - 0.02 || t > tout + 0.4) { hide(el); return; }
    el.style.visibility = "";
    const stagger = LANG === "zh" ? 0.026 : 0.055;
    const out = ease.inCubic(seg(t, tout, tout + 0.32));
    el._toks.forEach((tk, i) => {
      const a = tin + i * stagger;
      const p = ease.outCubic(seg(t, a, a + 0.45));
      tk.style.transform = `translateY(${f2((1 - p) * 28 - out * 16)}px)`;
      tk.style.opacity = f2(p * (1 - out));
      tk.style.filter = p < 0.995 ? `blur(${f2((1 - p) * 9)}px)` : "";
    });
  }

  /* ── build ─────────────────────────────────────────────────────────── */
  const studio = h("div", "full", stage); studio.id = "studio";
  const desktop = h("div", "full", stage); desktop.id = "desktop";

  // Scene 1: the cards.
  const cards = CARDS.map((name, i) => {
    const c = h("div", "card abs");
    // Stacked like a hand: the middle card on top, each side card above
    // its outer neighbour, so every card shows its own outer edge.
    c.style.zIndex = [1, 2, 10, 4, 3][i];
    img(`cards/${name}.png`, null, c);
    return c;
  });
  const chip = h("div", "chip abs", stage, S.chip);
  chip.style.zIndex = 11;

  // Scene 2: menu bar and panel.
  const menubar = h("div", "abs");
  menubar.id = "menubar";
  const tray = h("div", "item", menubar);
  tray.id = "tray";
  const trayHi = h("div", null, tray); trayHi.id = "trayHi";
  // The app's menu bar glyph (icons/tray-template.png), redrawn as a vector.
  h("span", "glyph", tray, `<svg viewBox="0 0 22 16"><rect x="1.2" y="1.2" width="19.6" height="13.6" rx="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="1.2" y="4.6" width="19.6" height="2.6" fill="currentColor"/><rect x="4" y="9.8" width="5.2" height="1.8" rx=".9" fill="currentColor"/></svg>`);
  h("span", "count", tray, "1");
  h("div", "item", menubar, `<svg width="22" height="16" viewBox="0 0 22 16"><path d="M11 15.2 7.6 11.7a4.8 4.8 0 0 1 6.8 0z" fill="currentColor"/><path d="M4.4 8.5a9.3 9.3 0 0 1 13.2 0" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M1.2 5.2a13.8 13.8 0 0 1 19.6 0" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`);
  h("div", "item", menubar, `<svg width="30" height="15" viewBox="0 0 30 15"><rect x="0.8" y="0.8" width="25" height="13.4" rx="3.6" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.4"/><rect x="2.9" y="2.9" width="17.5" height="9.2" rx="2" fill="currentColor"/><rect x="27.3" y="5" width="1.9" height="5" rx="1" fill="currentColor" fill-opacity=".45"/></svg>`);
  const now = new Date();
  const clock = new Intl.DateTimeFormat(LANG === "zh" ? "zh-CN" : "en-US", { weekday: "short", month: "short", day: "numeric" }).format(now);
  h("div", "item", menubar, `${clock}&nbsp;&nbsp;9:41${LANG === "zh" ? "" : " AM"}`);

  const panel = h("div", "panel abs");
  const boxes = {};
  const panelFrames = [];
  let panelLogged = null;
  const pring = h("div", "ring abs");
  const plus = h("div", "plus abs", stage, S.plus);

  // Scenes 3–5: the app window.
  const K = 0.88;
  const TB = 34;
  const win = h("div", "window abs");
  win.style.width = 1440 * K + 2 + "px";
  win.style.height = 900 * K + TB + 2 + "px";
  const titlebar = h("div", "titlebar", win, `<div class="lights"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>Oh My Cards`);
  const viewport = h("div", "viewport", win);
  viewport.style.width = 1440 * K + "px";
  viewport.style.height = 900 * K + "px";
  const pages = {};

  // Pointer.
  const ripple = h("div", "abs"); ripple.id = "ripple";
  const pointer = h("div", "abs", stage, `<svg width="30" height="44" viewBox="0 0 30 44"><path d="M3 3v31.5l7.6-7.3 5.2 12.1 5.6-2.4-5.1-11.8h10.6z" fill="#111" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/></svg>`);
  pointer.id = "pointer";
  pointer.style.zIndex = 50; ripple.style.zIndex = 49;

  // Scene 6: a laptop with a lock.
  const device = h("div", "abs");
  device.id = "device";
  device.innerHTML = `<svg width="520" height="360" viewBox="0 0 520 360">
    <rect x="70" y="18" width="380" height="250" rx="22" fill="#fffdf9" stroke="#18202a" stroke-width="9"/>
    <path d="M24 296h472l-22 34a22 22 0 0 1-18.6 10.3H64.6A22 22 0 0 1 46 330z" fill="#18202a"/>
    <g id="lock" transform="translate(260 150)">
      <circle r="92" fill="#0e8a80" opacity=".12" id="glow"/>
      <path id="shackle" d="M-34 -6v-26a34 34 0 0 1 68 0v26" fill="none" stroke="#0e8a80" stroke-width="15" stroke-linecap="round"/>
      <rect x="-54" y="-10" width="108" height="86" rx="18" fill="#0e8a80"/>
      <circle cx="0" cy="24" r="10" fill="#fffdf9"/>
      <rect x="-4" y="26" width="8" height="22" rx="4" fill="#fffdf9"/>
    </g>
  </svg>`;
  const lock = device.querySelector("#lock");
  const shackle = device.querySelector("#shackle");
  const glow = device.querySelector("#glow");

  // Scene 7: the mark and the name.
  const icon = img(REPO + "docs/assets/Oh_My_Cards_icon.png", "abs");
  icon.id = "icon";
  const nameClip = h("div", "abs");
  nameClip.id = "nameClip";
  const name = h("div", null, nameClip, S.name);
  name.id = "name";
  const sub = h("div", "sub abs", stage, S.sub);
  const url = h("div", "url abs", stage, S.url);

  // Captions, in the order they appear.
  const C = {
    a: caption("a", "", 772, 72),
    b: caption("b", "", 772, 72),
    c: caption("c", "left", 470, 78),
    d: caption("d", "left", 430, 78),
    e: caption("e", "", 922, 52),
    f: caption("f", "", 922, 52),
    g: caption("g", "", 922, 52),
    h: caption("h", "", 922, 52),
    i: caption("i", "", 922, 52),
    j: caption("j", "", 922, 52),
    k: caption("k", "", 742, 70),
    l: caption("l", "", 742, 70),
  };

  /* ── layout that depends on measurement (done once, after fonts) ─────── */
  let TRAY_X = 1500, PX = 1300, NAME_W = 600;
  const PS = 1.42; // panel scale on screen
  const PY = 56;
  const WIN_X = Math.round((1920 - (1440 * K + 2)) / 2);
  const WIN_Y = 46;

  function measure() {
    const r = tray.getBoundingClientRect();
    const st = stage.getBoundingClientRect();
    const scale = st.width / 1920;
    TRAY_X = (r.left - st.left + r.width / 2) / scale;
    PX = Math.min(TRAY_X - (380 * PS) / 2, 1920 - 380 * PS - 30);
    NAME_W = name.scrollWidth;
  }

  function buildPages() {
    const B = boxes;
    for (const key of ["suggest", "wallet", "activity", "cards"]) {
      const box = B[key];
      const page = h("div", "page", viewport);
      img(CAP + key + ".png", "base", page);
      const strip = h("div", "strip", page);
      strip.style.left = box.main.x + "px";
      strip.style.width = box.main.w + "px";
      const im = img(CAP + key + "-main.png", null, strip);
      im.style.width = box.main.w + "px";
      im.style.height = box.height + "px";
      pages[key] = { page, strip: im, box, rings: {} };
    }
    for (let i = 0; i < B.panel.frames; i++) {
      panelFrames.push(img(`${CAP}panel-${String(i).padStart(2, "0")}.png`, null, panel));
    }
    panelLogged = img(CAP + "panel-logged.png", null, panel);
  }

  /* ── scene helpers ─────────────────────────────────────────────────── */
  const cardPos = (cx, cy) => ({ x: cx - 260, y: cy - 164 });
  const STACK = CARDS.map((_, i) => ({ dx: (i - 2) * 9, dy: (i - 2) * 7, r: (i - 2) * 2.4 }));
  const FAN = [
    { dx: -372, dy: 56, r: -20 },
    { dx: -186, dy: 14, r: -10 },
    { dx: 0, dy: 0, r: 0 },
    { dx: 186, dy: 14, r: 10 },
    { dx: 372, dy: 56, r: 20 },
  ];

  /** Viewport camera: zoom z on focus point (fx, fy), clamped to the page. */
  function camera(pg, cam) {
    const z = cam.z;
    const vw = 1440 / z, vh = 900 / z;
    const vx = clamp(cam.fx - vw / 2, 0, 1440 - vw);
    const vy = clamp(cam.fy - vh / 2, 0, 900 - vh);
    pg.page.style.transform = `translate(${f2(-vx * K * z)}px,${f2(-vy * K * z)}px) scale(${f2(K * z)})`;
    pg.strip.style.top = f2(-cam.s) + "px";
  }
  /** A box from the page's <main> strip, in viewport CSS px at scroll s. */
  const inMain = (pg, b, s) => ({ x: pg.box.main.x + b.x, y: b.y - s, w: b.w, h: b.h, r: b.r });
  const centre = (b) => ({ fx: b.x + b.w / 2, fy: b.y + b.h / 2 });
  function ringAt(el, b, o, s = 1, pad = 8, radius = null) {
    el.style.left = f2(b.x - pad) + "px";
    el.style.top = f2(b.y - pad) + "px";
    el.style.width = f2(b.w + pad * 2) + "px";
    el.style.height = f2(b.h + pad * 2) + "px";
    // Concentric with the element's own corners.
    el.style.borderRadius = f2(radius ?? Math.max(6, (b.r || 0) + pad)) + "px";
    put(el, { s, o });
  }
  /**
   * A ring that settles on one element and leaves again — never sliding to the
   * next, which would cross whatever lies between. `pad` < 0 draws it inside
   * an element that runs edge to edge in its card.
   */
  function ringOn(pg, key, box, t, a, b, pad = 8, radius = null) {
    const el = pg.rings[key] || (pg.rings[key] = h("div", "ring abs", pg.page));
    const o = seg(t, a, a + 0.16) * (1 - seg(t, b - 0.16, b));
    if (o <= 0) { hide(el); return; }
    ringAt(el, box, o, 1 + 0.045 * (1 - ease.outBack(seg(t, a, a + 0.35))), pad, radius);
  }
  const union = (a, b) => {
    const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
    return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y };
  };
  const panelBox = (b) => ({ x: PX + b.x * PS, y: PY + b.y * PS, w: b.w * PS, h: b.h * PS });

  /* ── the timeline ──────────────────────────────────────────────────── */
  const TYPE0 = 7.25, TYPE1 = 8.55;

  function seek(t) {
    t = clamp(t, 0, DURATION);

    // Backgrounds.
    const deskO = seg(t, 5.0, 5.7) * (1 - seg(t, 11.2, 11.9));
    put(desktop, { o: deskO });
    put(studio, { o: 1 });

    /* Scene 1 — the cards. */
    const CX = 960, CY = 420;
    const fan = ease.outBack(seg(t, 2.0, 2.75));
    const pick = ease.outCubic(seg(t, 3.5, 4.1));
    const gather = ease.inOutCubic(seg(t, 4.45, 4.95));
    cards.forEach((card, i) => {
      if (t > 5.6) { hide(card); return; }
      const rise = ease.outQuint(seg(t, 0.25 + i * 0.07, 1.0 + i * 0.07));
      const wob = Math.sin((t - 2.9) * 7 + i * 1.7) * 1.4 * span(t, 2.85, 3.6, 0.25);
      let dx = lerp(STACK[i].dx, FAN[i].dx, fan);
      let dy = lerp(STACK[i].dy, FAN[i].dy, fan) + (1 - rise) * 170;
      let r = lerp(STACK[i].r, FAN[i].r, fan) + wob;
      let s = 1, o = rise;
      if (i === 2) {
        dy -= 58 * pick;
        s = 1 + 0.07 * pick;
        // Off to the menu bar, shrinking into the icon.
        const fly = ease.inOutQuint(seg(t, 4.55, 5.45));
        const from = { x: CX + dx, y: CY + dy };
        const to = { x: TRAY_X, y: 22 };
        const cx = lerp(from.x, to.x, fly);
        const cy = lerp(from.y, to.y, fly) - Math.sin(Math.PI * fly) * 60;
        s = lerp(s, 0.042, ease.inCubic(fly) * 0.35 + fly * 0.65);
        o = rise * (1 - seg(t, 5.3, 5.48));
        put(card, { ...cardPos(cx, cy), r: r * (1 - fly), s, o });
        card.style.borderRadius = f2(24 + fly * 120) + "px";
        card.style.filter = "";
        return;
      }
      dy += 22 * pick;
      s = 1 - 0.04 * pick;
      o = rise;
      // Out of focus rather than see-through: fading them would let the
      // cards beneath show through each other.
      card.style.filter = pick > 0.005
        ? `blur(${f2(2.4 * pick)}px) saturate(${f2(1 - 0.45 * pick)}) brightness(${f2(1 + 0.1 * pick)})`
        : "";
      // Gather behind the chosen card and fade.
      dx = lerp(dx, 0, gather);
      dy = lerp(dy, -40, gather);
      r = lerp(r, 0, gather);
      o *= 1 - gather;
      put(card, { ...cardPos(CX + dx, CY + dy), r, s, o });
    });
    {
      const p = ease.outBack(seg(t, 3.75, 4.15));
      const o = seg(t, 3.75, 3.95) * (1 - seg(t, 4.45, 4.65));
      const w = chip.offsetWidth || 220;
      put(chip, { x: CX - w / 2, y: CY - 164 * 1.07 - 58 - 78 + (1 - p) * 16, s: 0.7 + 0.3 * p, o });
    }
    showCaption(C.a, t, 0.6, 2.3);
    showCaption(C.b, t, 2.6, 4.55);

    /* Scene 2 — the menu bar. */
    {
      const o = seg(t, 5.05, 5.55) * (1 - seg(t, 11.0, 11.5));
      put(menubar, { y: (1 - ease.outCubic(seg(t, 5.05, 5.55))) * -44, o });
      const trayIcon = tray.querySelector(".glyph");
      trayIcon.style.opacity = f2(0.85 * seg(t, 5.32, 5.5));
      trayHi.style.opacity = f2(seg(t, 6.48, 6.55) * (1 - seg(t, 10.9, 11.1)));
    }
    if (t >= 6.55 && t <= 11.6) {
      const open = ease.outCubic(seg(t, 6.6, 6.92));
      const close = ease.inCubic(seg(t, 11.0, 11.5));
      // Scaled about its top centre (CSS), so it hangs from the menu bar.
      put(panel, { x: PX + (380 * PS - 380) / 2, y: PY, s: PS * (0.965 + 0.035 * open) * (1 - 0.06 * close), o: open * (1 - close) });
      const n = panelFrames.length - 1;
      const k = t < TYPE0 ? 0 : t >= TYPE1 ? n : Math.min(n, 1 + Math.floor(seg(t, TYPE0, TYPE1) * n));
      const logged = t >= 10.02;
      panelFrames.forEach((f, i) => (f.style.visibility = !logged && i === k ? "" : "hidden"));
      panelLogged.style.visibility = logged ? "" : "hidden";
    } else hide(panel);

    {
      const o = span(t, 8.75, 10.05, 0.18) * (1 - seg(t, 9.95, 10.05));
      const best = boxes.panel.best;
      if (o > 0) ringAt(pring, panelBox(best), o, 1 + 0.06 * (1 - ease.outBack(seg(t, 8.75, 9.1))), 7, ((best.r || 10) + 5) * PS);
      else hide(pring);
    }
    {
      const p = ease.outCubic(seg(t, 10.1, 10.45));
      const o = seg(t, 10.1, 10.25) * (1 - seg(t, 10.85, 11.05));
      // Beside the panel, level with the "Logged" line, drifting outwards.
      const sb = panelBox(boxes.panel.status);
      const w = plus.offsetWidth || 150;
      if (o > 0) put(plus, { x: PX - w - 26 - p * 22, y: sb.y + sb.h / 2 - 32, s: 0.8 + 0.2 * ease.outBack(seg(t, 10.1, 10.4)), o });
      else hide(plus);
    }
    showCaption(C.c, t, 7.0, 8.7);
    showCaption(C.d, t, 8.9, 10.95);

    // The pointer: click the icon, later the Log button.
    {
      const logBtn = panelBox(boxes.panel.log);
      const keys = [
        [5.85, { x: 1180, y: 640 }],
        [6.45, { x: TRAY_X - 3, y: 18 }],
        [9.3, { x: TRAY_X - 3, y: 18 }],
        [9.32, { x: logBtn.x + logBtn.w * 0.42 + 120, y: logBtn.y + 170 }],
        [9.9, { x: logBtn.x + logBtn.w * 0.42, y: logBtn.y + logBtn.h * 0.45 }],
      ];
      const p = track(keys, t);
      const o = span(t, 5.85, 6.95, 0.2) + span(t, 9.3, 10.7, 0.2);
      const press = Math.max(span(t, 6.46, 6.62, 0.06), span(t, 9.96, 10.12, 0.06));
      put(pointer, { x: p.x, y: p.y, s: 1 - 0.14 * press, o });
      const rp = Math.max(seg(t, 6.5, 6.9) * (t < 7 ? 1 : 0), seg(t, 10.0, 10.4) * (t > 9.9 ? 1 : 0));
      const at = t < 8 ? { x: TRAY_X - 3, y: 18 } : keys[4][1];
      if (rp > 0 && rp < 1) put(ripple, { x: at.x - 23, y: at.y - 23, s: 0.4 + rp * 1.2, o: 1 - rp });
      else hide(ripple);
    }

    /* Scenes 3–5 — the window. */
    if (t >= 11.3 && t <= 23.9) {
      const enter = ease.outQuint(seg(t, 11.35, 12.2));
      const leave = ease.inOutCubic(seg(t, 23.0, 23.75));
      const s = lerp(0.94, 1, enter) * lerp(1, 0.33, leave);
      const winH = 900 * K + TB + 2;
      // Scaled about its centre; on the way out it sinks to where the laptop appears.
      win.style.transformOrigin = "50% 50%";
      put(win, {
        x: WIN_X,
        y: WIN_Y + (1 - enter) * 70 + leave * (400 - (WIN_Y + winH / 2)),
        s,
        o: enter * (1 - seg(t, 23.4, 23.75)),
      });

      // Suggest.
      const P = pages;
      const sug = P.suggest, sb = sug.box;
      const sBest = inMain(sug, sb.best, 0);
      const sBetter = inMain(sug, sb.better, 260);
      const camS = track([
        [12.2, { z: 1, fx: 720, fy: 450, s: 0 }],
        [12.7, { z: 1, fx: 720, fy: 450, s: 0 }],
        [13.45, { z: 1.5, ...centre(sBest), s: 0 }],
        [14.0, { z: 1.5, ...centre(sBest), s: 0 }],
        [14.75, { z: 1.42, ...centre(sBetter), s: 260 }],
        [16.3, { z: 1.42, ...centre(sBetter), s: 260 }],
      ], t);
      camera(sug, camS);
      fade(sug.page, 1 - seg(t, 16.0, 16.3));
      ringOn(sug, "best", inMain(sug, sb.best, camS.s), t, 13.42, 14.02);
      ringOn(sug, "better", inMain(sug, sb.better, camS.s), t, 14.78, 15.85);

      // Wallet.
      const wal = P.wallet, wb = wal.box;
      const S1 = 430;
      const wCome = inMain(wal, wb.comingUp, 0);
      const wPair = union(inMain(wal, wb.due, S1), inMain(wal, wb.fee, S1));
      const camW = track([
        [16.0, { z: 1, fx: 720, fy: 450, s: 0 }],
        [16.35, { z: 1, fx: 720, fy: 450, s: 0 }],
        [16.95, { z: 1.16, ...centre(wCome), s: 0 }],
        [17.45, { z: 1.16, ...centre(wCome), s: 0 }],
        [18.25, { z: 1.45, ...centre(wPair), s: S1 }],
        [20.3, { z: 1.45, ...centre(wPair), s: S1 }],
      ], t);
      camera(wal, camW);
      fade(wal.page, seg(t, 16.0, 16.3) * (1 - seg(t, 20.0, 20.3)));
      ringOn(wal, "comingUp", inMain(wal, wb.comingUp, camW.s), t, 16.95, 17.48);
      // The due banner runs edge to edge in its card: ring it from inside.
      ringOn(wal, "due", inMain(wal, wb.due, camW.s), t, 18.27, 18.95, -7, 12);
      ringOn(wal, "fee", inMain(wal, wb.fee, camW.s), t, 18.98, 19.9, 6);

      // Activity, then the library.
      const act = P.activity;
      camera(act, track([[20.0, { z: 1, fx: 720, fy: 450, s: 0 }], [21.8, { z: 1.12, fx: 700, fy: 360, s: 0 }]], t, ease.outCubic));
      fade(act.page, seg(t, 20.0, 20.3) * (1 - seg(t, 21.5, 21.8)));
      const lib = P.cards;
      camera(lib, track([[21.5, { z: 1, fx: 720, fy: 450, s: 0 }], [23.3, { z: 1, fx: 720, fy: 450, s: 640 }]], t, ease.inOutCubic));
      fade(lib.page, seg(t, 21.5, 21.8));
    } else hide(win);

    showCaption(C.e, t, 12.35, 14.0);
    showCaption(C.f, t, 14.15, 15.85);
    showCaption(C.g, t, 16.25, 18.15);
    showCaption(C.h, t, 18.35, 19.9);
    showCaption(C.i, t, 20.1, 21.4);
    showCaption(C.j, t, 21.6, 22.95);

    /* Scene 6 — the lock. */
    if (t >= 23.2 && t <= 27.6) {
      const ins = ease.outQuint(seg(t, 23.35, 24.0));
      const out = ease.inCubic(seg(t, 26.95, 27.4));
      put(device, { x: 960 - 260, y: 400 - 180 + (1 - ins) * 30, s: (0.86 + 0.14 * ins) * (1 - 0.15 * out), o: ins * (1 - out) });
      const lp = ease.outBack(seg(t, 23.9, 24.35));
      lock.setAttribute("transform", `translate(260 150) scale(${f2(0.4 + 0.6 * lp)})`);
      lock.setAttribute("opacity", f2(seg(t, 23.9, 24.05)));
      const close = ease.outBack(seg(t, 24.5, 24.78));
      shackle.setAttribute("transform", `translate(0 ${f2(-16 * (1 - close))})`);
      glow.setAttribute("opacity", f2(0.08 + 0.1 * (0.5 + 0.5 * Math.sin((t - 24.8) * 3.2)) * seg(t, 24.8, 25.2)));
    } else hide(device);
    showCaption(C.k, t, 23.55, 25.1);
    showCaption(C.l, t, 25.25, 26.95);

    /* Scene 7 — the mark and the name. */
    {
      const gap = 40;
      const total = 220 + gap + NAME_W;
      const left = 960 - total / 2;
      const slide = ease.inOutQuint(seg(t, 27.75, 28.55));
      const iconCX = lerp(960, left + 110, slide);
      const pop = ease.outBack(seg(t, 27.1, 27.6));
      const end = 1 - seg(t, 31.45, 32.0);
      put(icon, { x: iconCX - 110, y: 404 - 110, s: 0.78 + 0.22 * pop, o: seg(t, 27.1, 27.35) * end });
      const reveal = ease.outQuint(seg(t, 28.0, 28.8));
      nameClip.style.width = f2(NAME_W * reveal + 4) + "px";
      put(nameClip, { x: left + 220 + gap, y: 404 - 70, o: seg(t, 28.0, 28.1) * end });
      put(name, { x: (1 - reveal) * -60 });
      const subW = sub.offsetWidth, urlW = url.offsetWidth;
      put(sub, { x: 960 - subW / 2, y: 560 + (1 - ease.outCubic(seg(t, 28.85, 29.35))) * 18, o: seg(t, 28.85, 29.2) * end });
      put(url, { x: 960 - urlW / 2, y: 622 + (1 - ease.outCubic(seg(t, 29.3, 29.8))) * 18, o: seg(t, 29.3, 29.65) * end });
    }

    hud.textContent = `${LANG}  ${t.toFixed(2)}s / ${DURATION}s`;
  }

  /* ── music cues (read by scripts/music.py through render.mjs) ───────── */
  function cues() {
    const out = [
      { t: 0.25, k: "rise" },
      { t: 2.0, k: "fan" },
      { t: 3.75, k: "chip" },
      { t: 4.55, k: "whoosh" },
      { t: 5.4, k: "land" },
      { t: 6.5, k: "click" },
      { t: 8.75, k: "ring" },
      { t: 10.0, k: "click" },
      { t: 10.1, k: "coin" },
      { t: 11.35, k: "whoosh" },
      { t: 13.2, k: "ring" },
      { t: 14.75, k: "ring" },
      { t: 16.0, k: "page" },
      { t: 16.85, k: "ring" },
      { t: 18.3, k: "ring" },
      { t: 20.0, k: "page" },
      { t: 21.5, k: "page" },
      { t: 23.0, k: "whoosh" },
      { t: 24.5, k: "lock" },
      { t: 27.1, k: "logo" },
    ];
    const n = (boxes.panel?.frames || 18) - 1;
    for (let i = 0; i < n; i++) out.push({ t: TYPE0 + (i * (TYPE1 - TYPE0)) / n, k: "key" });
    return out.sort((a, b) => a.t - b.t);
  }

  /* ── boot, preview player ──────────────────────────────────────────── */
  const hud = document.getElementById("hud");
  function loadBoxes() {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = CAP + "boxes.js";
      s.onload = () => resolve(window.BOXES[LANG]);
      s.onerror = () => reject(new Error(`missing ${CAP}boxes.js — run scripts/capture.mjs`));
      document.head.appendChild(s);
    });
  }

  const ready = (async () => {
    Object.assign(boxes, await loadBoxes());
    buildPages();
    await document.fonts.ready;
    await Promise.all([...stage.querySelectorAll("img")].map((im) => im.decode().catch(() => {})));
    fit();
    measure();
    seek(Number(q.get("t") || 0));
  })();

  function fit() {
    if (RENDER) return;
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `scale(${s})`;
    document.body.style.width = 1920 * s + "px";
    document.body.style.height = 1080 * s + "px";
  }
  addEventListener("resize", () => { fit(); });

  let playing = false, t0 = 0, at = Number(q.get("t") || 0);
  const audio = RENDER ? null : new Audio(`../out/soundtrack-${LANG}.wav`);
  function tick() {
    if (!playing) return;
    at = (performance.now() - t0) / 1000;
    if (at >= DURATION) { at = 0; t0 = performance.now(); if (audio) { audio.currentTime = 0; } }
    seek(at);
    requestAnimationFrame(tick);
  }
  addEventListener("keydown", (e) => {
    if (RENDER) return;
    if (e.code === "Space") {
      e.preventDefault();
      playing = !playing;
      if (playing) {
        t0 = performance.now() - at * 1000;
        if (audio) { audio.currentTime = at; audio.play().catch(() => {}); }
        requestAnimationFrame(tick);
      } else if (audio) audio.pause();
    }
    if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
      const step = e.shiftKey ? 1 / FPS : 1;
      at = clamp(at + (e.code === "ArrowRight" ? step : -step), 0, DURATION);
      t0 = performance.now() - at * 1000;
      if (audio) audio.currentTime = at;
      seek(at);
    }
  });

  window.FILM = { duration: DURATION, fps: FPS, lang: LANG, seek, ready, cues: () => cues() };
})();
