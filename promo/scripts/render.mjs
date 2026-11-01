// render.mjs — the film, frame by frame.
//
//   node scripts/render.mjs --lang en                 # out/oh-my-cards.en.mp4
//   node scripts/render.mjs --lang zh --stills 3,9.2  # out/stills/zh-03.00.png …
//   node scripts/render.mjs --lang en --cues          # out/cues-en.json, for music.py
//
// Each worker owns a run of frames and a headless Chrome page: it seeks the
// film to t = frame / fps and captures it. Nothing is captured in real time,
// so a slow machine renders the same film as a fast one. ffmpeg then encodes
// the frames and lays the soundtrack (out/soundtrack-<lang>.wav) under them.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const lang = opt("--lang", "en");
const workers = Number(opt("--workers", 4));
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(ROOT, "out");
fs.mkdirSync(OUT, { recursive: true });

async function openFilm() {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const url = pathToFileURL(path.join(ROOT, "src/film.html")).href + `?lang=${lang}&render`;
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => window.FILM.ready);
  if (errors.length) throw new Error(errors.join("\n"));
  return { browser, page };
}

function run(cmd, argv) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err = (err + d).slice(-4000)));
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err}`))));
  });
}

if (args.includes("--cues")) {
  const { browser, page } = await openFilm();
  const cues = await page.evaluate(() => window.FILM.cues());
  const duration = await page.evaluate(() => window.FILM.duration);
  fs.writeFileSync(path.join(OUT, `cues-${lang}.json`), JSON.stringify({ duration, cues }, null, 1));
  await browser.close();
  console.log(`wrote out/cues-${lang}.json (${cues.length} cues)`);
  process.exit(0);
}

if (args.includes("--stills")) {
  const dir = path.join(OUT, "stills");
  fs.mkdirSync(dir, { recursive: true });
  const { browser, page } = await openFilm();
  for (const t of opt("--stills", "0").split(",").map(Number)) {
    await page.evaluate((t) => window.FILM.seek(t), t);
    const file = path.join(dir, `${lang}-${t.toFixed(2).padStart(5, "0")}.png`);
    await page.screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
  process.exit(0);
}

// The whole film.
const { browser: probe, page: first } = await openFilm();
const fps = await first.evaluate(() => window.FILM.fps);
const duration = await first.evaluate(() => window.FILM.duration);
await probe.close();

const frames = path.join(OUT, `.frames-${lang}`);
fs.rmSync(frames, { recursive: true, force: true });
fs.mkdirSync(frames, { recursive: true });
const total = Math.round(duration * fps);
const per = Math.ceil(total / workers);
let done = 0;
const started = Date.now();

async function worker(w) {
  const a = w * per, b = Math.min(total, a + per);
  if (a >= b) return;
  const { browser, page } = await openFilm();
  const cdp = await page.context().newCDPSession(page);
  for (let f = a; f < b; f++) {
    await page.evaluate((t) => window.FILM.seek(t), f / fps);
    const { data } = await cdp.send("Page.captureScreenshot", {
      format: "png",
      optimizeForSpeed: true,
      // Without a clip, headless Chrome captures its window, not the 1920×1080 viewport.
      clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 },
    });
    fs.writeFileSync(path.join(frames, `f-${String(f).padStart(5, "0")}.png`), Buffer.from(data, "base64"));
    if (++done % 30 === 0) {
      const rate = done / ((Date.now() - started) / 1000);
      process.stdout.write(`\r  ${lang}: ${done}/${total} frames, ${rate.toFixed(1)} fps   `);
    }
  }
  await browser.close();
}

console.log(`render ${lang}: ${total} frames at ${fps} fps, ${workers} workers`);
await Promise.all([...Array(workers).keys()].map(worker));
process.stdout.write("\n");

const audio = path.join(OUT, `soundtrack-${lang}.wav`);
const master = path.join(OUT, `oh-my-cards.${lang}.mp4`);
const hasAudio = fs.existsSync(audio);
await run("ffmpeg", [
  "-y", "-loglevel", "error",
  "-framerate", String(fps), "-i", path.join(frames, "f-%05d.png"),
  ...(hasAudio ? ["-i", audio] : []),
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
  "-profile:v", "high", "-movflags", "+faststart",
  "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
  ...(hasAudio ? ["-c:a", "aac", "-b:a", "160k", "-shortest"] : []),
  master,
]);
console.log(`wrote ${path.relative(ROOT, master)}${hasAudio ? "" : " (silent: no soundtrack yet)"} in ${((Date.now() - started) / 1000).toFixed(0)}s`);
// A finished browser can leave a handle open; the film is written, so leave.
process.exit(0);
