"""cards.py — the opening's five cards, drawn as SVG.

    python3 scripts/cards.py        # writes src/cards/*.svg; render.mjs --cards rasterises them

The issuers' own card art is 250–480 px wide, too small for a 4K film, so
these are vector redrawings of the real designs: Amex Platinum and Gold,
Chase Sapphire Reserve, Citi Custom Cash and Capital One Venture X.
856 × 540 units (the card's 85.6 × 54 mm, ×10).
"""
import math
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "cards"
W, H, R = 856, 540, 38
SANS = "Helvetica Neue, Helvetica, Arial, sans-serif"


def chip(x, y, metal="silver"):
    a, b, c = ("#f1f2f4", "#c3c7cd", "#9ba1a9") if metal == "silver" else ("#f6e1a1", "#d5b064", "#a8822f")
    line = "#80868e" if metal == "silver" else "#7d5f22"
    return f'''<g transform="translate({x} {y})">
  <defs><linearGradient id="chip{x}{y}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{a}"/><stop offset=".55" stop-color="{b}"/><stop offset="1" stop-color="{c}"/></linearGradient></defs>
  <rect width="86" height="66" rx="13" fill="url(#chip{x}{y})" stroke="{line}" stroke-width="1.6"/>
  <path d="M29 0v19q0 4 4 4h20q4 0 4-4V0M29 66V47q0-4 4-4h20q4 0 4 4v19M0 23h25M0 43h25M61 23h25M61 43h25M25 23v20M61 23v20M33 23v20M53 23v20" fill="none" stroke="{line}" stroke-width="1.8"/>
</g>'''


def contactless(x, y, color, size=1.0, opacity=0.9):
    return f'''<g transform="translate({x} {y}) scale({size})" fill="none" stroke="{color}" stroke-width="3.4" stroke-linecap="round" opacity="{opacity}">
  <path d="M2 14a11 11 0 0 1 0 16"/><path d="M10 8a19 19 0 0 1 0 28"/><path d="M18 2a27 27 0 0 1 0 40"/>
</g>'''


def card(body, defs=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
  <clipPath id="shape"><rect width="{W}" height="{H}" rx="{R}"/></clipPath>
  <filter id="brush" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.55" numOctaves="2" seed="7"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
  </filter>
  {defs}
</defs>
<g clip-path="url(#shape)">
{body}
</g>
</svg>'''


# The centurion, facing right, filling a 208 × 308 oval centred on (0, 0).
def centurion(face, helmet, crest, line, light, shade):
    return f'''
  <defs>
    <linearGradient id="helm-{helmet[1:]}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{light}"/><stop offset=".45" stop-color="{helmet}"/><stop offset="1" stop-color="{shade}"/></linearGradient>
    <linearGradient id="face-{face[1:]}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{light}"/><stop offset=".6" stop-color="{face}"/><stop offset="1" stop-color="{helmet}"/></linearGradient>
  </defs>
  <g stroke="{line}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" transform="translate(2 8) scale(1.05)">
    <!-- shoulders and armour -->
    <path d="M-120 168 C-96 128 -60 116 -18 112 C30 108 74 116 120 150 L120 200 L-120 200 Z" fill="url(#helm-{helmet[1:]})"/>
    <path d="M-92 150 C-56 130 -14 126 26 126 C62 126 92 136 112 154" fill="none" stroke-width="1.6" opacity=".7"/>
    <!-- neck -->
    <path d="M-32 36 C-24 64 -24 94 -34 120 C-4 128 26 126 50 116 C40 98 38 82 42 64 Z" fill="url(#face-{face[1:]})"/>
    <path d="M28 82 C24 96 26 108 32 118" fill="none" stroke-width="1.5" opacity=".6"/>
    <!-- plume: sweeps from above the brow, over the crown, down the back -->
    <path d="M44 -112 C28 -150 -40 -168 -84 -124 C-110 -96 -118 -40 -110 22 C-102 -2 -96 -44 -82 -74 C-62 -112 -6 -124 44 -112 Z" fill="{crest}"/>
    <g fill="none" stroke="{light}" stroke-width="1.7" opacity=".6">
      <path d="M34 -120 C8 -146 -42 -146 -74 -112"/><path d="M22 -128 C-6 -150 -56 -140 -86 -98"/>
      <path d="M8 -134 C-22 -152 -70 -132 -96 -80"/><path d="M-8 -138 C-40 -150 -84 -120 -104 -58"/>
      <path d="M-26 -140 C-58 -144 -96 -104 -108 -30"/>
    </g>
    <!-- helmet bowl with the neck guard flaring at the back -->
    <path d="M62 -52 C66 -92 36 -122 -6 -122 C-50 -122 -78 -90 -80 -46 L-84 8 C-96 22 -100 34 -94 42 C-80 46 -62 40 -50 30 L-40 -6 L20 -12 L36 -48 Z" fill="url(#helm-{helmet[1:]})"/>
    <path d="M-62 -60 C-60 -90 -36 -110 -4 -112" fill="none" stroke="{light}" stroke-width="2" opacity=".55"/>
    <!-- brim over the brow -->
    <path d="M70 -50 C56 -40 34 -40 14 -46 L18 -58 C36 -52 54 -54 66 -62 Z" fill="url(#helm-{helmet[1:]})"/>
    <!-- face in profile, with the cheek: brow, nose, lips, chin, jaw -->
    <path d="M12 -46 C24 -46 32 -46 38 -44 C47 -42 53 -36 51 -28 C59 -16 69 -4 75 6 C69 10 63 11 57 9 C59 14 65 18 63 22 C59 24 57 26 61 30 C59 36 55 38 53 40 C59 48 59 58 49 66 C38 72 20 70 8 62 C0 40 2 0 12 -46 Z" fill="url(#face-{face[1:]})"/>
    <path d="M24 10 C30 26 38 36 50 42" fill="none" stroke-width="1.4" opacity=".5"/>
    <!-- cheek guard: a narrow plate over the ear -->
    <path d="M-6 -42 L14 -44 C20 -16 20 12 14 36 C8 46 -6 48 -14 42 C-18 14 -16 -16 -6 -42 Z" fill="url(#helm-{helmet[1:]})"/>
    <circle cx="4" cy="-28" r="3" fill="{line}" stroke="none"/><circle cx="4" cy="28" r="3" fill="{line}" stroke="none"/>
    <!-- eye, brow, nostril, mouth -->
    <path d="M38 -22 C43 -26 49 -25 52 -21" fill="none" stroke-width="2"/>
    <path d="M40 -18 C44 -15 48 -15 51 -18" fill="none" stroke-width="1.6"/>
    <path d="M58 4 C61 6 64 6 66 5" fill="none" stroke-width="1.6"/>
    <path d="M54 25 C57 26 59 26 61 25" fill="none" stroke-width="1.6"/>
    <path d="M30 6 C34 22 40 34 50 42" fill="none" stroke-width="1.4" opacity=".55"/>
  </g>'''


def amex(name, metal, digits):
    if metal == "platinum":
        stops = ["#f4f5f7", "#c7ccd2", "#eff1f3", "#b1b7bf", "#e1e4e8"]
        ink, border, oval_bg = "#2c3137", "#7b818a", ["#f3f4f6", "#c9ced4"]
        figure = dict(face="#dde1e5", helmet="#9ea5ae", crest="#6c737c", line="#30353b", light="#f7f8f9", shade="#5d646d")
        chip_metal = "silver"
    else:
        stops = ["#f7e6ad", "#d4ab58", "#f4dd95", "#b98a34", "#ead08a"]
        ink, border, oval_bg = "#3b2c10", "#8b6a2a", ["#f8e9b8", "#d6b264"]
        figure = dict(face="#f2dea8", helmet="#c79d4f", crest="#8c682a", line="#43300f", light="#fff5d6", shade="#7a5a22")
        chip_metal = "silver"
    grad = "".join(f'<stop offset="{i / (len(stops) - 1):.2f}" stop-color="{c}"/>' for i, c in enumerate(stops))
    defs = f'''<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">{grad}</linearGradient>
  <radialGradient id="ovalbg" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="{oval_bg[0]}"/><stop offset="1" stop-color="{oval_bg[1]}"/></radialGradient>
  <clipPath id="oval"><ellipse cx="0" cy="0" rx="104" ry="154"/></clipPath>
  <path id="since" d="M600 384 A72 72 0 0 1 730 384"/>'''
    engraving = "".join(
        f'<line x1="-110" y1="{y}" x2="110" y2="{y}" stroke="{border}" stroke-width=".9" opacity=".28"/>'
        for y in range(-160, 162, 7)
    )
    body = f'''
  <rect width="{W}" height="{H}" fill="url(#metal)"/>
  <rect width="{W}" height="{H}" filter="url(#brush)"/>
  <rect x="22" y="22" width="812" height="496" rx="24" fill="none" stroke="{border}" stroke-width="2.6"/>
  <rect x="31" y="31" width="794" height="478" rx="18" fill="none" stroke="{border}" stroke-width="1.1" opacity=".75"/>
  <text x="428" y="100" text-anchor="middle" font-family="{SANS}" font-weight="800" font-size="47" letter-spacing="1.5" fill="{ink}">AMERICAN EXPRESS</text>
  {chip(92, 180, chip_metal)}
  <g transform="translate(440 328)">
    <ellipse rx="108" ry="158" fill="{ink}"/>
    <ellipse rx="104" ry="154" fill="url(#ovalbg)"/>
    <g clip-path="url(#oval)">{engraving}{centurion(**figure)}</g>
    <ellipse rx="104" ry="154" fill="none" stroke="{ink}" stroke-width="2"/>
  </g>
  {contactless(586, 282, ink, 0.9, 0.85) if metal == "gold" else ""}
  <text x="{640 if metal == "gold" else 612}" y="318" font-family="{SANS}" font-weight="500" font-size="36" letter-spacing="1" fill="{ink}">{digits}</text>
  <text font-family="{SANS}" font-weight="700" font-size="15" letter-spacing="2.2" fill="{ink}"><textPath href="#since" startOffset="50%" text-anchor="middle">MEMBER SINCE</textPath></text>
  <text x="665" y="420" text-anchor="middle" font-family="{SANS}" font-weight="500" font-size="34" fill="{ink}">09</text>
  <text x="66" y="488" font-family="{SANS}" font-weight="500" font-size="36" letter-spacing="1.5" fill="{ink}">{name}</text>
  <text x="428" y="524" text-anchor="middle" font-family="{SANS}" font-weight="600" font-size="11" fill="{ink}" opacity=".8">© AMEX</text>'''
    return card(body, defs)


def chase_logo(cx, cy, r, color):
    """The Chase octagon: four pieces around a square, split by pinwheel slits."""
    pts = " ".join(f"{cx + r * math.cos(math.radians(22.5 + 45 * k)):.2f},{cy + r * math.sin(math.radians(22.5 + 45 * k)):.2f}" for k in range(8))
    a, s = r * 0.32, r * 0.13
    slits = [
        f'<rect x="{cx - r}" y="{cy - a - s / 2}" width="{r - a}" height="{s}"/>',  # from top-left corner, left
        f'<rect x="{cx + a - s / 2}" y="{cy - r}" width="{s}" height="{r - a}"/>',  # from top-right corner, up
        f'<rect x="{cx + a}" y="{cy + a - s / 2}" width="{r - a}" height="{s}"/>',  # from bottom-right corner, right
        f'<rect x="{cx - a - s / 2}" y="{cy + a}" width="{s}" height="{r - a}"/>',  # from bottom-left corner, down
    ]
    return f'''<mask id="chase"><polygon points="{pts}" fill="#fff"/><g fill="#000"><rect x="{cx - a}" y="{cy - a}" width="{2 * a}" height="{2 * a}"/>{"".join(slits)}</g></mask>
  <rect x="{cx - r}" y="{cy - r}" width="{2 * r}" height="{2 * r}" fill="{color}" mask="url(#chase)"/>'''


def sapphire_reserve():
    defs = '''<linearGradient id="bg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#03060d"/><stop offset=".55" stop-color="#0a1630"/><stop offset="1" stop-color="#1c3560"/></linearGradient>
  <radialGradient id="glow" cx="1" cy="0" r=".62"><stop offset="0" stop-color="#e2c27c" stop-opacity=".75"/><stop offset=".35" stop-color="#8a7a5c" stop-opacity=".28"/><stop offset="1" stop-color="#0a1630" stop-opacity="0"/></radialGradient>
  <pattern id="lattice" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H22M0 0V22" stroke="#e7cf96" stroke-width="1.1" fill="none"/></pattern>
  <radialGradient id="fade" cx="1" cy="0" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".6" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <mask id="latticeMask"><rect width="856" height="540" fill="url(#fade)"/></mask>'''
    body = f'''
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  <rect width="{W}" height="{H}" fill="url(#glow)"/>
  <rect width="{W}" height="{H}" fill="url(#lattice)" mask="url(#latticeMask)"/>
  <rect width="{W}" height="{H}" filter="url(#brush)" opacity=".5"/>
  {chase_logo(84, 86, 30, "#f2f4f7")}
  <text x="134" y="98" font-family="{SANS}" font-weight="400" font-size="44" letter-spacing="5" fill="#eef2f6">SAPPHIRE</text>
  <text x="136" y="132" font-family="{SANS}" font-weight="500" font-size="22" letter-spacing="6" fill="#c9d1db">RESERVE</text>
  {chip(118, 232)}'''
    return card(body, defs)


def custom_cash():
    rings = "".join(
        f'<circle cx="640" cy="470" r="{r}" fill="none" stroke="#bfe9ff" stroke-opacity="{o}" stroke-width="{w}"/>'
        for r, o, w in [(110, .22, 18), (175, .16, 10), (240, .2, 22), (310, .12, 8), (380, .16, 18), (455, .1, 10), (530, .12, 16), (610, .08, 8)]
    )
    defs = '''<radialGradient id="bg" cx=".72" cy=".86" r=".95"><stop offset="0" stop-color="#5fd0f6"/><stop offset=".35" stop-color="#1f95e2"/><stop offset=".75" stop-color="#1167cc"/><stop offset="1" stop-color="#0b4fae"/></radialGradient>
  <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".25" stop-color="#fff"/><stop offset=".75" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'''
    body = f'''
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  {rings}
  <path d="M410 188 C460 120 600 116 650 186" fill="none" stroke="url(#arc)" stroke-width="15" stroke-linecap="round"/>
  <text x="52" y="100" font-family="{SANS}" font-weight="600" font-size="62" letter-spacing="-1" fill="#fff">citi</text>
  <path d="M86 58 C102 40 128 40 146 58" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  {contactless(70, 210, "#fff", 0.95)}
  {chip(116, 196)}
  <text x="410" y="262" font-family="{SANS}" font-weight="500" font-size="44" letter-spacing="4" fill="#fff">CUSTOM</text>
  <text x="592" y="302" font-family="{SANS}" font-weight="500" font-size="44" letter-spacing="4" fill="#fff">CASH</text>
  <text x="56" y="486" font-family="{SANS}" font-weight="500" font-size="34" letter-spacing="1.5" fill="#fff">ALEX MORGAN</text>
  <g opacity=".92"><circle cx="694" cy="440" r="44" fill="#e9eef3" fill-opacity=".85"/><circle cx="752" cy="440" r="44" fill="#c9d2dc" fill-opacity=".85"/>
  <path d="M723 406 a44 44 0 0 1 0 68 a44 44 0 0 1 0 -68z" fill="#aab6c3"/></g>
  <text x="723" y="512" text-anchor="middle" font-family="{SANS}" font-weight="500" font-size="17" fill="#eaf2f9">mastercard</text>'''
    return card(body, defs)


def venture_x():
    defs = '''<linearGradient id="bg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#081a33"/><stop offset=".55" stop-color="#0f2f55"/><stop offset="1" stop-color="#1f5a8a"/></linearGradient>
  <radialGradient id="sheen" cx=".85" cy=".1" r=".6"><stop offset="0" stop-color="#7fb3dd" stop-opacity=".35"/><stop offset="1" stop-color="#7fb3dd" stop-opacity="0"/></radialGradient>'''
    body = f'''
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  <rect width="{W}" height="{H}" fill="url(#sheen)"/>
  <rect width="{W}" height="{H}" filter="url(#brush)" opacity=".45"/>
  <text x="790" y="92" text-anchor="end" font-family="{SANS}" font-style="italic" font-weight="700" font-size="40" letter-spacing="-.5" fill="#fff">Capital <tspan font-weight="600">One</tspan></text>
  <path d="M610 64 C660 30 760 28 806 52" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>
  {chip(96, 216)}
  {contactless(196, 226, "#d9e3ee", 0.85, 0.8)}
  <text x="92" y="382" font-family="{SANS}" font-weight="300" font-size="44" letter-spacing="13" fill="#d4dde8">VENTURE X</text>'''
    return card(body, defs)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    files = {
        "amex-platinum.svg": amex("ALEX MORGAN", "platinum", "1005"),
        "chase-sapphire-reserve.svg": sapphire_reserve(),
        "citi-custom-cash.svg": custom_cash(),
        "amex-gold.svg": amex("ALEX MORGAN", "gold", "3007"),
        "capital-one-venture-x.svg": venture_x(),
    }
    for name, svg in files.items():
        (OUT / name).write_text(svg)
        print("wrote", f"src/cards/{name}")


if __name__ == "__main__":
    main()
