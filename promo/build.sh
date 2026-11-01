#!/usr/bin/env bash
# build.sh — demo data → captures → cues → soundtrack → frames → MP4 → web copies.
#
#   ./build.sh            # both languages
#   LANGS=en ./build.sh   # one
#
# Needs: a dev server of the app on $CAPTURE_BASE (default http://127.0.0.1:19957),
# Google Chrome, ffmpeg (libx264, libsvtav1), img2webp, Python 3 with numpy
# and scipy, and `npm install` in this folder (playwright-core).
# The 4K masters stay in out/; attach them to a release rather than to git.
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
  node scripts/render.mjs --lang "$lang"            # out/oh-my-cards.<lang>.mp4, 3840×2160 master

  # Web copy: 1080p supersampled from the master, under GitHub's 10 MB video
  # limit, for Pages and for dragging into a GitHub comment.
  ffmpeg -v error -y -i "out/oh-my-cards.$lang.mp4" -vf "scale=1920:1080:flags=lanczos" \
    -c:v libx264 -preset slow -crf 19 -profile:v high -pix_fmt yuv420p -x264-params aq-mode=3 \
    -c:a aac -b:a 128k -movflags +faststart "out/web.$lang.mp4"

  # README preview: animated AVIF, 1080p at 30 fps (~3 MB), with a WebP
  # fallback for browsers without animated AVIF. WebP keyframes at least
  # every 16 frames, or lossy deltas leave stale background behind.
  ffmpeg -v error -y -i "out/oh-my-cards.$lang.mp4" -vf "scale=1920:1080:flags=lanczos,fps=30" -an \
    -c:v libsvtav1 -preset 5 -crf 31 -svtav1-params tune=0 -pix_fmt yuv420p "out/preview.$lang.avif"
  rm -rf "out/.preview-$lang" && mkdir -p "out/.preview-$lang"
  ffmpeg -v error -y -i "out/oh-my-cards.$lang.mp4" -vf "fps=20,scale=1280:720:flags=lanczos" "out/.preview-$lang/p-%04d.png"
  img2webp -loop 0 -lossy -q 72 -m 4 -kmin 8 -kmax 16 -d 50 "out/.preview-$lang"/p-*.png -o "out/preview.$lang.webp"
  rm -rf "out/.preview-$lang"

  cp "out/web.$lang.mp4" "../docs/promo/oh-my-cards.$lang.mp4"
  cp "out/preview.$lang.avif" "out/preview.$lang.webp" ../docs/promo/
done
ls -la ../docs/promo
