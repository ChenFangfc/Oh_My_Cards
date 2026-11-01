// capture.mjs — photographs the real app for the film.
//
//   CAPTURE_BASE=http://127.0.0.1:19957 node scripts/capture.mjs [--lang en|zh]
//
// Runs against a dev server of the app, seeded with .cache/demo-state.json
// (scripts/demo-data.mts). For each language it saves 2x screenshots into
// src/captures/<lang>/ and the boxes (CSS px) of the elements the film rings
// or points at into src/captures/<lang>/boxes.json, so re-capturing after a
// UI change re-aims the film.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.CAPTURE_BASE || "http://127.0.0.1:19957";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const args = process.argv.slice(2);
const only = args.includes("--lang") ? [args[args.indexOf("--lang") + 1]] : ["en", "zh"];
const state = fs.readFileSync(path.join(ROOT, ".cache/demo-state.json"), "utf8");

// What gets typed, per language.
const SCRIPT = {
  en: { quick: "45 dinner at nopa", suggest: "United flight to Tokyo booked direct", quarter: "This Quarter" },
  zh: { quick: "在 Nopa 吃晚饭 45", suggest: "直接在 United 官网订去东京的机票", quarter: "本季度" },
};

// The box (CSS px) and corner radius of an element, so a ring drawn around
// it can follow its corners.
const boxOf = async (locator) => {
  const el = locator.first();
  const b = await el.boundingBox();
  if (!b) throw new Error(`no box for ${locator}`);
  const r = await el.evaluate((node) => parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0);
  return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), r };
};

async function context(browser, lang, viewport) {
  const ctx = await browser.newContext({
    viewport,
    // 3x, so the film can zoom in 1.5x and still render at 4K without upscaling.
    deviceScaleFactor: 3,
    colorScheme: "light",
    locale: lang === "zh" ? "zh-CN" : "en-US",
    reducedMotion: "reduce",
  });
  await ctx.addInitScript(({ s, locale }) => {
    localStorage.setItem("oh-my-card:local-state:v1", s);
    localStorage.setItem("oh-my-card:locale:v1", locale);
    localStorage.setItem("theme", "light");
    localStorage.setItem("smart-suggest:show-upgrades", "true");
  }, { s: state, locale: lang === "zh" ? "zh-CN" : "en" });
  return ctx;
}

async function capture(browser, lang) {
  const out = path.join(ROOT, "src/captures", lang);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const boxes = {};
  const say = SCRIPT[lang];

  // The menu bar panel, one frame per typed character.
  {
    const ctx = await context(browser, lang, { width: 380, height: 560 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?view=quick`, { waitUntil: "networkidle" });
    const input = page.locator("input").first();
    await input.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(out, "panel-00.png") });
    const chars = [...say.quick];
    for (let i = 0; i < chars.length; i++) {
      await page.keyboard.insertText(chars[i]);
      await page.waitForTimeout(160);
      await page.screenshot({ path: path.join(out, `panel-${String(i + 1).padStart(2, "0")}.png`) });
    }
    boxes.panel = {
      frames: chars.length + 1,
      input: await boxOf(input),
      best: await boxOf(page.locator("[role=radio][aria-checked=true]")),
      log: await boxOf(page.locator("button", { hasText: /Log \$|记 \$/ })),
    };
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(out, "panel-logged.png") });
    boxes.panel.status = await boxOf(page.locator("[role=status]").filter({ hasText: /Logged|已记录/ }));
    await ctx.close();
  }

  // The main window pages. Each is saved twice: the window as it opens
  // (<name>.png), and the whole scrolling <main> as one tall strip
  // (<name>-main.png), so the film can scroll the content under a fixed
  // sidebar the way the app does.
  const ctx = await context(browser, lang, { width: 1440, height: 900 });
  const page = await ctx.newPage();
  const shootPage = async (name, marks) => {
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    const main = await boxOf(page.locator("main"));
    // Let <main> grow to its content, then photograph just that column.
    await page.addStyleTag({
      content: ".h-dvh{height:auto!important;overflow:visible!important} main{overflow:visible!important;flex:none!important}",
    });
    await page.waitForTimeout(300);
    const full = await boxOf(page.locator("main"));
    // The camera never scrolls past ~1,600 px; a full 5,000 px library at 3x
    // would only cost memory in every render worker.
    const height = Math.min(full.h, 2400);
    await page.screenshot({
      path: path.join(out, `${name}-main.png`),
      fullPage: true,
      clip: { x: full.x, y: full.y, width: full.w, height },
    });
    const box = { main, height };
    for (const [key, locator] of Object.entries(marks)) {
      const b = await boxOf(locator);
      box[key] = { x: b.x - full.x, y: b.y - full.y, w: b.w, h: b.h, r: b.r };
    }
    return box;
  };
  const card = (text) =>
    page.locator("div", { hasText: text }).locator("xpath=ancestor-or-self::div[contains(@class,'rounded-[22px]')][1]").first();

  await page.goto(`${BASE}/suggest`, { waitUntil: "networkidle" });
  await page.fill("#description", say.suggest);
  await page.fill("#amount", "1200");
  await page.locator("form button[type=submit]").click();
  await page.waitForTimeout(600);
  boxes.suggest = await shootPage("suggest", {
    form: page.locator("form"),
    best: page.locator("text=/Best in your wallet|钱包里的最佳选择/").locator("xpath=ancestor::div[contains(@class,'rounded-[2')][1]"),
    better: page.locator("text=/Not in wallet|不在钱包中/").locator("xpath=ancestor::div[contains(@class,'rounded-[2')][1]"),
  });

  await page.goto(`${BASE}/wallet`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  boxes.wallet = await shootPage("wallet", {
    tiles: page.locator("main .grid").first(),
    comingUp: page.locator("h3", { hasText: /Coming up|即将到期/ }).locator("xpath=ancestor::div[contains(@class,'rounded')][1]"),
    due: page.locator("button[aria-label*='Billing settings for'], button[aria-label*='账单设置']").first(),
    fee: page.locator("text=/^(Annual fee progress|年费回本进度)$/").first().locator("xpath=ancestor::div[contains(@class,'rounded-md')][1]"),
    firstCard: page.locator("button[aria-label*='Billing settings for'], button[aria-label*='账单设置']").first().locator("xpath=ancestor::div[contains(@class,'relative flex flex-col overflow-hidden')][1]"),
  });

  await page.goto(`${BASE}/activity`, { waitUntil: "networkidle" });
  await page.getByRole("tab", { name: say.quarter }).click();
  await page.waitForTimeout(600);
  boxes.activity = await shootPage("activity", {
    summary: page.locator("main section").first(),
    chart: page.locator(".recharts-responsive-container").first(),
  });

  await page.goto(`${BASE}/cards`, { waitUntil: "networkidle" });
  boxes.cards = await shootPage("cards", {});

  await ctx.close();
  fs.writeFileSync(path.join(out, "boxes.json"), JSON.stringify(boxes, null, 2));
  // The film opens from disk, where fetch() is blocked: it loads this instead.
  fs.writeFileSync(
    path.join(out, "boxes.js"),
    `window.BOXES = window.BOXES || {};\nwindow.BOXES.${lang} = ${JSON.stringify(boxes)};\n`,
  );
  console.log(`${lang}: ${fs.readdirSync(out).length} files`, JSON.stringify(boxes.panel.best), JSON.stringify(boxes.wallet.due));
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
for (const lang of only) await capture(browser, lang);
await browser.close();
