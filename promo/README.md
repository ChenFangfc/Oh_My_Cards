# Oh My Cards — the film

A 32-second film, written as code. The picture is an HTML page in which every
frame is a pure function of time; the app's pages are real screenshots of the
app running on a demo wallet; the soundtrack is synthesised with numpy; headless
Chrome and ffmpeg turn both into an MP4. No stock footage, no editing timeline.

```
../docs/promo/oh-my-cards.<lang>.mp4   1920×1080, 30 fps, H.264 + AAC (en, zh)
../docs/promo/preview.<lang>.webp      960×540, 15 fps, silent, for the README
STORYBOARD.md                          the script, scene by scene
```

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
| what is typed, which pages are shot | `scripts/capture.mjs` |
| the music | `scripts/music.py` — `PLAN` is the chord and density per bar |

Sound effects follow the film's own cues (`cues()` in `film.js`), so moving a
moment moves its sound with it.

## Build

```sh
npm install                      # playwright-core
# in another terminal, the app:  PORT=19957 BASE_PATH=/ pnpm --dir ../artifacts/card-organizer dev
./build.sh                       # both languages, about a minute each
```

`node scripts/render.mjs --lang en --stills 3,9.4` writes single frames to
`out/stills/` for checking by eye.

Requirements: Node 18+, Google Chrome (`CHROME=` to point elsewhere), ffmpeg
with libx264, `img2webp` (libwebp), Python 3 with numpy and scipy.

The cards in the opening are the issuers' card art the app already ships.
