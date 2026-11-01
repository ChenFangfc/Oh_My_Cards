# Oh My Cards — the film

A 32-second film, written as code. The picture is an HTML page in which every
frame is a pure function of time; the app's pages are real screenshots of the
app running on a demo wallet; the soundtrack is synthesised with numpy; headless
Chrome and ffmpeg turn both into an MP4. No stock footage, no editing timeline.

```
out/oh-my-cards.<lang>.mp4             3840×2160 master, 30 fps, H.264 + AAC (en, zh; not in git)
../docs/promo/oh-my-cards.<lang>.mp4   1080p web copy (< 10 MB), played from GitHub Pages
../docs/promo/preview.<lang>.avif      1080p, 30 fps, silent, the README preview (~3 MB)
../docs/promo/preview.<lang>.webp      720p fallback for browsers without animated AVIF
STORYBOARD.md                          the script, scene by scene
```

The masters are attached to the v1.2.0 release (`Oh-My-Cards-film-4K.<lang>.mp4`).

## Preview and edit

Open `src/film.html` from disk (after one build, so the captures exist).
`?lang=zh` for Chinese, `?t=12` starts at 12 s. Space plays and pauses;
← → step a second (Shift: one frame). With `out/soundtrack-<lang>.wav` present
it plays in sync.

| To change | Edit |
|---|---|
| any words on screen | `src/strings.js` |
| timing, camera, rings | `src/film.js` — the timeline is one `seek(t)` |
| colours, type | `src/film.css` |
| the demo wallet | `scripts/demo-data.mts` |
| the cards in the opening | `scripts/cards.py` |
| what is typed, which pages are shot | `scripts/capture.mjs` |
| the music | `scripts/music.py` — `PLAN` is the chord and density per bar |

Sound effects follow the film's own cues (`cues()` in `film.js`), so moving a
moment moves its sound with it.

## Build

```sh
npm install                      # playwright-core
# in another terminal, the app:  PORT=19957 BASE_PATH=/ pnpm --dir ../artifacts/card-organizer dev
./build.sh                       # both languages, a few minutes each
```

`node scripts/render.mjs --lang en --stills 3,9.4` writes single 4K frames to
`out/stills/` for checking by eye (`--dsf 1` for 1080p, faster).

The app is captured at 3× so the film can zoom in 1.5× and still render 4K
without upscaling. The opening's five cards (Amex Platinum, Chase Sapphire
Reserve, Citi Custom Cash, Amex Gold, Capital One Venture X — also the demo
wallet) are SVG redrawings of the real designs in `scripts/cards.py`,
rasterised at 2080 px by `scripts/cards-png.mjs`: the issuers' own art is only
250–480 px wide.

Requirements: Node 18+, Google Chrome (`CHROME=` to point elsewhere), ffmpeg
with libx264, `img2webp` (libwebp), Python 3 with numpy and scipy.

Rings are drawn concentric with the element they mark (corner radius measured
at capture), and fade off one element before appearing on the next: a ring
that slid between targets crossed whatever lay in between.
