#!/usr/bin/env bash
# build.sh — demo data → captures → cues → soundtrack → frames → MP4 → web copies.
#
#   ./build.sh            # both languages
#   LANGS=en ./build.sh   # one
#
# Needs: a dev server of the app on $CAPTURE_BASE (default http://127.0.0.1:19957),
# Google Chrome, ffmpeg (libx264), img2webp, Python 3 with numpy and scipy,
# and `npm install` in this folder (playwright-core).
set -euo pipefail
cd "$(dirname "$0")"
LANGS=${LANGS:-"en zh"}
TSX=../lib/api-client-react/node_modules/.bin/tsx

mkdir -p .cache out ../docs/promo
"$TSX" scripts/demo-data.mts > .cache/demo-state.json
for lang in $LANGS; do
  node scripts/capture.mjs --lang "$lang"
  node scripts/render.mjs --lang "$lang" --cues
  python3 scripts/music.py --lang "$lang"
  node scripts/render.mjs --lang "$lang"

  # README preview: 960 px, 15 fps, silent. Keyframes at least every 12
  # frames, or lossy deltas leave stale background behind.
  rm -rf "out/.preview-$lang" && mkdir -p "out/.preview-$lang"
  ffmpeg -v error -y -i "out/oh-my-cards.$lang.mp4" -vf "fps=15,scale=960:540:flags=lanczos" "out/.preview-$lang/p-%04d.png"
  img2webp -loop 0 -lossy -q 68 -m 4 -kmin 6 -kmax 12 -d 67 "out/.preview-$lang"/p-*.png -o "out/preview.$lang.webp"

  cp "out/oh-my-cards.$lang.mp4" "out/preview.$lang.webp" ../docs/promo/
done
ls -la ../docs/promo
