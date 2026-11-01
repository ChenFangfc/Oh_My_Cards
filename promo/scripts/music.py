"""music.py — the film's soundtrack, synthesised.

    python3 scripts/music.py --lang en      # reads out/cues-en.json, writes out/soundtrack-en.wav

120 BPM in D major, written to picture: a bar is 2 s, and PLAN gives each
bar its chord and how much plays. Sound effects sit on the film's own cues
(render.mjs --cues), so moving a moment in film.js moves its sound with it.
Everything is numpy/scipy: additive pads, plucked arpeggios, a sine bass,
soft drums, and a synthetic room. Deterministic: same input, same file.
"""
import argparse
import json
import pathlib
import wave

import numpy as np
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48_000
BEAT = 0.5
BAR = 2.0
ROOT = pathlib.Path(__file__).resolve().parent.parent
rng = np.random.default_rng(7)


def hz(note: str) -> float:
    names = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
    name, octave = note[:-1], int(note[-1])
    return 440.0 * 2 ** ((names[name] + 12 * (octave + 1) - 69) / 12)


# Chord tones per bar (mid register), bass root, and density:
# 0 = pad only, 1 = + plucks, 2 = + light beat, 3 = full beat.
CH = {
    "Dmaj9": (["D4", "F#4", "A4", "C#5", "E5"], "D2"),
    "Bm9": (["B3", "D4", "F#4", "A4", "C#5"], "B1"),
    "Gmaj7": (["G3", "B3", "D4", "F#4", "A4"], "G1"),
    "A6": (["A3", "C#4", "E4", "F#4", "A4"], "A1"),
    "F#m7": (["F#3", "A3", "C#4", "E4", "A4"], "F#1"),
    "Em9": (["E3", "G3", "B3", "D4", "F#4"], "E2"),
    "Asus": (["A3", "D4", "E4", "A4", "B4"], "A1"),
}
PLAN = [
    ("Dmaj9", 0), ("Bm9", 1), ("Gmaj7", 1),        # 0–6   the cards
    ("Dmaj9", 2), ("F#m7", 2), ("Gmaj7", 2),       # 6–12  the menu bar
    ("Dmaj9", 3), ("Bm9", 3), ("Gmaj7", 3),        # 12–18 suggest, wallet
    ("A6", 3), ("Bm9", 3), ("Gmaj7", 2),           # 18–24 wallet, montage
    ("Em9", 0), ("Asus", 1),                       # 24–28 the lock: a breath
    ("Dmaj9", 2), ("Dmaj9", 0),                    # 28–32 the name
]


def env(n, attack, release, total=None):
    """Linear attack, exponential tail over n samples."""
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    r = np.exp(-t / max(release, 1e-4)) if total is None else np.clip((total - t) / max(release, 1e-4), 0, 1)
    return a * r


def place(buf, start, sig, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= buf.shape[1]:
        return
    sig = sig[: buf.shape[1] - i]
    left, right = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i : i + len(sig)] += sig * gain * left * 1.41
    buf[1, i : i + len(sig)] += sig * gain * right * 1.41


def lowpass(x, cutoff, order=2):
    return sosfilt(butter(order, cutoff, "low", fs=SR, output="sos"), x)


def highpass(x, cutoff, order=2):
    return sosfilt(butter(order, cutoff, "high", fs=SR, output="sos"), x)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def tone(freq, dur, harmonics=6, detune=0.0, bright=1.0):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for k in range(1, harmonics + 1):
        out += np.sin(2 * np.pi * freq * k * (1 + detune) * t) / (k ** (1.6 / bright))
    return out


def pad(chord, start, dur, gain):
    notes, _ = CH[chord]
    n = int((dur + 0.9) * SR)
    for j, note in enumerate(notes):
        f = hz(note)
        for det, pan in ((-0.0023, -0.55), (0.0023, 0.55)):
            sig = tone(f, n / SR, harmonics=7, detune=det)
            e = env(n, 0.45, 0.7, total=dur + 0.7)
            sig = lowpass(sig * e, 1700 + 220 * j)
            place(BUF, start, sig, gain / len(notes), pan)


def pluck(freq, start, gain, pan=0.0, decay=0.32):
    n = int(1.2 * SR)
    t = np.arange(n) / SR
    sig = (np.sin(2 * np.pi * freq * t) * np.exp(-t / decay)
           + 0.45 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t / (decay * 0.45))
           + 0.2 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-t / (decay * 0.25)))
    sig *= np.clip(t / 0.004, 0, 1)
    place(BUF, start, lowpass(sig, 5200), gain, pan)


def bell(freq, start, gain, pan=0.0, decay=1.1):
    n = int(2.5 * SR)
    t = np.arange(n) / SR
    sig = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t / (decay / r ** 0.6))
              for r, a in ((1, 1.0), (2.76, 0.42), (5.4, 0.2), (8.93, 0.08)))
    sig *= np.clip(t / 0.002, 0, 1)
    place(BUF, start, sig, gain, pan)


def kick(start, gain):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 46 + 70 * np.exp(-t / 0.045)
    sig = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    sig += 0.25 * lowpass(rng.standard_normal(n) * np.exp(-t / 0.006), 3000)
    place(BUF, start, np.tanh(sig * 1.3), gain)


def hat(start, gain, pan=0.0, length=0.035):
    n = int(0.2 * SR)
    t = np.arange(n) / SR
    sig = highpass(rng.standard_normal(n), 7500) * np.exp(-t / length)
    place(BUF, start, sig, gain, pan)


def clap(start, gain):
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    burst = sum(np.exp(-np.clip(t - d, 0, None) / 0.012) * (t >= d) for d in (0, 0.011, 0.022))
    sig = bandpass(rng.standard_normal(n), 900, 5000) * (burst * 0.6 + np.exp(-t / 0.09) * 0.4)
    place(BUF, start, sig, gain)


def bass(note, start, dur, gain):
    f = hz(note)
    n = int((dur + 0.2) * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(2 * np.pi * f * 2 * t)
    sig *= env(n, 0.02, 0.15, total=dur)
    place(BUF, start, np.tanh(sig * 1.4), gain)


def noise_sweep(start, dur, gain, up=True):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    # Crossfade three bands for a cheap moving filter.
    lo, mid, hi = bandpass(x, 300, 900), bandpass(x, 900, 3000), bandpass(x, 3000, 9000)
    p = t / dur if up else 1 - t / dur
    sig = lo * (1 - p) + mid * (1 - abs(2 * p - 1)) + hi * p
    sig *= np.sin(np.pi * t / dur) ** 2
    place(BUF, start, sig, gain)


def tick(start, gain, pan=0.0, f_lo=1800, f_hi=6000, length=0.012):
    n = int(0.08 * SR)
    t = np.arange(n) / SR
    sig = bandpass(rng.standard_normal(n), f_lo, f_hi) * np.exp(-t / length)
    place(BUF, start, sig, gain, pan)


def build(cues, duration):
    global BUF
    BUF = np.zeros((2, int((duration + 0.5) * SR)))

    for i, (chord, density) in enumerate(PLAN):
        start = i * BAR
        notes, root = CH[chord]
        pad(chord, start, BAR, 0.2 if density == 0 else 0.17 if density < 3 else 0.15)
        if density >= 1:
            # Arpeggio: quarters when sparse, eighths when the beat is in.
            step = BEAT if density == 1 else BEAT / 2
            order = [0, 2, 4, 3, 1, 3, 2, 4]
            for k in range(int(BAR / step)):
                note = notes[order[k % len(order)]]
                f = hz(note) * 2
                pluck(f, start + k * step, 0.11 if density < 3 else 0.09, pan=-0.35 if k % 2 else 0.35)
        if density >= 2:
            bass(root, start, BAR * 0.95, 0.16)
            for b in range(4):
                if density == 3 or b % 2 == 0:
                    kick(start + b * BEAT, 0.34 if density == 3 else 0.27)
            for k in range(8):
                hat(start + k * BEAT / 2, 0.05 if k % 2 else 0.035, pan=0.3)
        if density == 3:
            clap(start + BEAT, 0.12)
            clap(start + 3 * BEAT, 0.12)

    # Sound effects on the film's cues.
    for cue in cues:
        t, k = cue["t"], cue["k"]
        if k == "rise":
            noise_sweep(t, 1.0, 0.05, up=True)
        elif k == "fan":
            for j in range(5):
                tick(t + j * 0.045, 0.12, pan=-0.6 + 0.3 * j, f_lo=1200, f_hi=5000, length=0.02)
            for j, note in enumerate(["D5", "F#5", "A5", "C#6"]):
                pluck(hz(note), t + 0.05 + j * 0.06, 0.07, pan=-0.3 + 0.2 * j, decay=0.5)
        elif k == "chip":
            bell(hz("A6"), t, 0.09, pan=0.1)
        elif k == "whoosh":
            noise_sweep(t - 0.1, 0.8, 0.07, up=False)
        elif k == "land":
            tick(t, 0.1, pan=0.6, f_lo=2500, f_hi=8000, length=0.008)
        elif k == "click":
            tick(t, 0.22, pan=0.5, f_lo=2000, f_hi=7000, length=0.006)
            tick(t + 0.05, 0.12, pan=0.5, f_lo=1500, f_hi=5000, length=0.005)
        elif k == "key":
            tick(t, 0.07 + 0.03 * rng.random(), pan=0.4, f_lo=1800 + 600 * rng.random(), f_hi=6500, length=0.007)
        elif k == "ring":
            bell(hz("E6"), t, 0.05, pan=0.2, decay=0.6)
        elif k == "coin":
            bell(hz("B6"), t, 0.1, pan=0.3, decay=0.7)
            bell(hz("E7"), t + 0.09, 0.08, pan=0.35, decay=0.9)
        elif k == "page":
            noise_sweep(t - 0.05, 0.35, 0.035, up=True)
        elif k == "lock":
            tick(t, 0.2, f_lo=600, f_hi=2500, length=0.02)
            tick(t + 0.07, 0.16, f_lo=900, f_hi=3500, length=0.015)
            bell(hz("D6"), t + 0.1, 0.06, decay=0.8)
        elif k == "logo":
            bell(hz("D6"), t, 0.12, decay=1.6)
            bell(hz("A6"), t + 0.12, 0.08, decay=1.4)
            bell(hz("F#6"), t + 0.9, 0.06, decay=1.4)

    # A room: stereo noise tail, mixed in.
    n = int(1.4 * SR)
    t = np.arange(n) / SR
    ir = np.stack([lowpass(rng.standard_normal(n), 6000) * np.exp(-t / 0.42) for _ in range(2)])
    ir /= np.abs(ir).sum(axis=1, keepdims=True) ** 0.5 * 30
    wet = np.stack([fftconvolve(BUF[c], ir[c])[: BUF.shape[1]] for c in range(2)])
    mix = BUF + 0.32 * wet

    # Master: gentle saturation, fades, -1 dBFS peak.
    mix = np.tanh(mix * 1.15)
    total = int(duration * SR)
    mix = mix[:, :total]
    fade_in = np.clip(np.arange(total) / (0.05 * SR), 0, 1)
    fade_out = np.clip((total - np.arange(total)) / (1.4 * SR), 0, 1)
    mix *= fade_in * fade_out
    mix *= 10 ** (-1 / 20) / np.abs(mix).max()
    return mix


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="en")
    args = ap.parse_args()
    data = json.loads((ROOT / "out" / f"cues-{args.lang}.json").read_text())
    mix = build(data["cues"], data["duration"])
    out = ROOT / "out" / f"soundtrack-{args.lang}.wav"
    pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
    with wave.open(str(out), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    rms = 20 * np.log10(np.sqrt((mix ** 2).mean()) + 1e-9)
    print(f"wrote {out.relative_to(ROOT)}  {data['duration']:.1f}s  rms {rms:.1f} dBFS")


if __name__ == "__main__":
    main()
