#!/usr/bin/env python3
"""
Normalise public/intro.png into a sprite sheet the SpriteAvatar can address.

The source is a 6x6 contact sheet of independently drawn frames on white:
rows are separated by clear gutters, but frames within a row often touch, and
every frame sits at a slightly different size and offset. This script lifts
the white background to real alpha, finds each frame, and re-composes them on
a uniform grid anchored at the desk line so the figure holds still as the
animation plays.

    python3 scripts/build-intro-sprite.py
"""

from PIL import Image
import numpy as np
from scipy import ndimage
import os

SRC = "public/intro.png"
OUT = "public/intro-sprite.webp"

COLS = 6
PAD = 6                # transparent margin around the composed cell
MIN_COMPONENT = 400    # drop specks; real frames are far larger
BG_LUM = 238           # anything lighter than this is candidate background


def alpha_from_white(rgb: np.ndarray) -> np.ndarray:
    """White background -> transparent, via a flood fill from the borders.

    A flat "white is background" test would also punch holes in the striped
    shirt, the laptop and the mug, so only white *connected to the edge* of
    the sheet is removed.
    """
    lum = rgb.mean(axis=2)
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    light = (lum > BG_LUM) & (sat < 24)

    labels, _ = ndimage.label(light)
    edge = set(labels[0, :]) | set(labels[-1, :])
    edge |= set(labels[:, 0]) | set(labels[:, -1])
    edge.discard(0)

    alpha = np.where(np.isin(labels, list(edge)), 0, 255).astype(np.uint8)

    # Remove leftover speckle so it can't distort the frame bounds.
    comp, n = ndimage.label(alpha > 0)
    if n:
        areas = ndimage.sum(alpha > 0, comp, range(1, n + 1))
        keep = [i + 1 for i, a in enumerate(areas) if a >= MIN_COMPONENT]
        alpha = np.where(np.isin(comp, keep), alpha, 0)
    return alpha


def bands(mask: np.ndarray, min_len: int):
    out, start = [], None
    for i, v in enumerate(mask):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start >= min_len:
                out.append((start, i - 1))
            start = None
    if start is not None and len(mask) - start >= min_len:
        out.append((start, len(mask) - 1))
    return out


def split_to(segments, want: int, counts: np.ndarray):
    """Force `want` frames out of detected segments.

    Adjacent frames sometimes touch and merge into one wide segment. Splitting
    at the midpoint would slice through a figure, so cut at the thinnest
    column in the middle of the segment — the pinch point where two drawings
    just barely meet.
    """
    segs = list(segments)
    while len(segs) < want:
        i = max(range(len(segs)), key=lambda k: segs[k][1] - segs[k][0])
        a, b = segs.pop(i)
        lo, hi = a + (b - a) // 3, b - (b - a) // 3
        cut = lo + int(np.argmin(counts[lo:hi + 1]))
        segs[i:i] = [(a, cut), (cut + 1, b)]
    return sorted(segs)[:want]


def main():
    rgb = np.array(Image.open(SRC).convert("RGB")).astype(int)
    alpha = alpha_from_white(rgb)
    rgba = np.dstack([rgb, alpha]).astype(np.uint8)
    solid = alpha > 40

    rows = bands(solid.any(axis=1), min_len=40)
    print(f"{len(rows)} rows detected")

    frames = []  # [row][col] -> cropped RGBA
    for r, (top, bottom) in enumerate(rows):
        strip = solid[top:bottom + 1]
        counts = strip.sum(axis=0)
        segs = split_to(bands(strip.any(axis=0), min_len=30), COLS, counts)

        row_frames = []
        for (x0, x1) in segs:
            cell = rgba[top:bottom + 1, x0:x1 + 1]
            ys, xs = np.where(cell[..., 3] > 40)
            row_frames.append(cell[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
        frames.append(row_frames)
        print(f"  row {r}: {len(row_frames)} frames, "
              f"sizes {[f'{f.shape[1]}x{f.shape[0]}' for f in row_frames]}")

    cell_w = max(f.shape[1] for row in frames for f in row) + PAD * 2
    cell_h = max(f.shape[0] for row in frames for f in row) + PAD * 2
    print(f"\ncell {cell_w}x{cell_h} (aspect {cell_w / cell_h:.4f})")

    sheet = Image.new("RGBA", (COLS * cell_w, len(frames) * cell_h), (0, 0, 0, 0))
    for r, row in enumerate(frames):
        for c, frame in enumerate(row):
            img = Image.fromarray(frame)
            # Bottom-centred: anchors every frame on the desk line, so the
            # figure doesn't bob as arms and props change the bounding box.
            sheet.paste(
                img,
                (c * cell_w + (cell_w - img.width) // 2,
                 r * cell_h + cell_h - PAD - img.height),
            )

    sheet.save(OUT, quality=90, method=6)
    print(f"wrote {OUT}  {sheet.size[0]}x{sheet.size[1]}  "
          f"{os.path.getsize(OUT) / 1024:.0f} KB")
    print(f"\ncols={COLS} rows={len(frames)} "
          f"frameAspect={cell_w / cell_h:.4f}")


if __name__ == "__main__":
    main()
