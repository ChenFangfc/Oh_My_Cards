// cards-png.mjs — rasterises src/cards/*.svg to 2080 px PNGs for the film.
//
//   python3 scripts/cards.py && node scripts/cards-png.mjs
//
// 2080 px is twice what the cards occupy in a 4K frame, so they are only
// ever scaled down.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "src/cards");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1040, height: 656 }, deviceScaleFactor: 2 });
// Each card is drawn by an <img> of fixed size in its own page: opening the
// SVG itself and resizing it in place proved unreliable (one came out tiled).
const shell = path.join(DIR, ".rasterise.html");
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".svg"))) {
  fs.writeFileSync(
    shell,
    `<!doctype html><html><body style="margin:0;background:transparent"><img id="c" src="${file}" width="1040" height="656" style="display:block"></body></html>`,
  );
  await page.goto(pathToFileURL(shell).href + `?v=${Date.now()}`, { waitUntil: "load" });
  await page.evaluate(() => document.getElementById("c").decode());
  const out = path.join(DIR, file.replace(/\.svg$/, ".png"));
  await page.locator("#c").screenshot({ path: out, omitBackground: true });
  console.log(path.relative(ROOT, out));
}
fs.unlinkSync(shell);
await browser.close();
