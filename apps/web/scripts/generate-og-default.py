"""Generate the default Open Graph image (1200×630) for the site.

Used by build-metadata.ts as the site-level fallback og:image when a
detail page has no hero image of its own. Designed to fit the
industrial visual language of the BAIN BOILER site:
  - dark slate background (no glassmorphism, no gradient)
  - the company wordmark in white, with a single yellow accent rule
  - a 256×256 logo glyph on the right
"""
from PIL import Image, ImageDraw, ImageFont
import os
import sys

# Try to find suitable fonts on this server.
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]

def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

ROOT = os.path.dirname(os.path.abspath(__file__))
# scripts/ -> apps/web/ -> public/brand/
PUBLIC = os.path.normpath(os.path.join(ROOT, "..", "public", "brand"))
OUT_PATH = os.path.join(PUBLIC, "og-default.webp")
LOGO_PATH = os.path.join(PUBLIC, "logo.webp")

W, H = 1200, 630
BG = (15, 23, 42, 255)            # slate-950
WHITE = (248, 250, 252, 255)      # slate-50
YELLOW = (250, 204, 21, 255)      # amber-400 (logo yellow)
GREY = (148, 163, 184, 255)       # slate-400

img = Image.new("RGBA", (W, H), BG)
draw = ImageDraw.Draw(img)

# Subtle top rule
draw.rectangle([(80, 78), (320, 86)], fill=YELLOW)

# Title
title_font = load_font(86)
draw.text((80, 110), "BAIN BOILER", fill=WHITE, font=title_font)

# Subtitle
sub_font = load_font(36)
draw.text((80, 220), "Industrial boiler systems", fill=WHITE, font=sub_font)
draw.text((80, 268), "& thermal solutions", fill=WHITE, font=sub_font)

# Tagline
tag_font = load_font(24)
draw.text(
    (80, 380),
    "Steam  ·  Hot water  ·  Thermal oil",
    fill=GREY,
    font=tag_font,
)
draw.text(
    (80, 416),
    "Engineered from China. Delivered worldwide.",
    fill=GREY,
    font=tag_font,
)

# Brand line bottom
brand_font = load_font(20)
draw.text(
    (80, H - 80),
    "bainboiler.com",
    fill=YELLOW,
    font=brand_font,
)

# Logo on the right side, centered vertically
if os.path.exists(LOGO_PATH):
    logo = Image.open(LOGO_PATH).convert("RGBA")
    # Fit logo into a 280×280 box
    target = 280
    ratio = min(target / logo.width, target / logo.height)
    new_size = (int(logo.width * ratio), int(logo.height * ratio))
    logo = logo.resize(new_size, Image.LANCZOS)
    # Paste onto a circular dark backdrop
    pad = 24
    backdrop = Image.new(
        "RGBA",
        (new_size[0] + pad * 2, new_size[1] + pad * 2),
        (30, 41, 59, 255),  # slate-800
    )
    mask = Image.new("L", backdrop.size, 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([(0, 0), backdrop.size], fill=255)
    backdrop.paste(logo, (pad, pad), logo)
    # Circle mask
    final = Image.new("RGBA", backdrop.size, (0, 0, 0, 0))
    final.paste(backdrop, (0, 0), mask)
    img.paste(
        final,
        (W - new_size[0] - pad * 2 - 80, (H - backdrop.size[1]) // 2),
        final,
    )

img.save(OUT_PATH, "WEBP", quality=88, method=6)
print(f"Wrote {OUT_PATH} ({os.path.getsize(OUT_PATH)} bytes)")
