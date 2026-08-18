#!/usr/bin/env python3
"""
Normalise public/sprite/*.png into one sprite sheet the SpriteAvatar can address.

Each source is a 4x2 contact sheet of independently drawn desk frames, and every
frame is enclosed in a thin drawn rectangle. Those rules must not survive into
the animation, so this script finds each panel, crops *inside* its border, and
re-composes the panels on a uniform grid.

The panels are whole scenes rather than cut-out figures — keying the paper to
alpha would eat the wall and window shading and leave a ragged silhouette — so
frames stay opaque on their paper and SpriteAvatar blends that paper away.

    python3 scripts/build-intro-sprite.py
"""

from PIL import Image
import numpy as np
import glob
import os

SRC_GLOB = "public/sprite/*.png"
OUT = "public/intro-sprite.webp"

COLS = 4               # panels per row within a single source sheet
ROWS = 2               # panel rows within a single source sheet
CELL_W = 300           # width each panel is normalised to in the sheet
INK_LUM = 235          # darker than this counts as drawn ink
BORDER_COVER = 0.80    # a row/col this full of ink is the panel's rule
BORDER_SEARCH = 14     # how far in from the panel edge the rule can sit
BORDER_BLEED = 3       # extra px trimmed to clear the rule's anti-aliasing


def bands(mask: np.ndarray, min_len: int):
    """Contiguous runs of True at least `min_len` long."""
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


def inner_edge(cover: np.ndarray, from_start: bool) -> int:
    """Where the panel content begins, just past the drawn rule.

    `cover` is the per-row (or per-column) ink fraction across the panel. The
    rule shows up as one or two near-solid lines at the very edge; content
    lines never span the full panel that close to it.
    """
    n = len(cover)
    idx = range(min(BORDER_SEARCH, n)) if from_start else range(n - 1, max(n - 1 - BORDER_SEARCH, -1), -1)
    hit = None
    for i in idx:
        if cover[i] >= BORDER_COVER:
            hit = i
    if hit is None:
        return BORDER_BLEED if from_start else n - 1 - BORDER_BLEED
    return hit + 1 + BORDER_BLEED if from_start else hit - 1 - BORDER_BLEED


def panels(path: str):
    """Crop the frames out of one contact sheet, borders excluded."""
    rgb = np.array(Image.open(path).convert("RGB")).astype(int)
    ink = rgb.mean(axis=2) < INK_LUM

    row_bands = bands(ink.any(axis=1), min_len=40)
    col_bands = bands(ink.any(axis=0), min_len=40)
    if len(row_bands) != ROWS or len(col_bands) != COLS:
        raise SystemExit(
            f"{path}: expected a {COLS}x{ROWS} grid, found "
            f"{len(col_bands)}x{len(row_bands)}"
        )

    out = []
    for top, bottom in row_bands:
        for left, right in col_bands:
            cell = ink[top:bottom + 1, left:right + 1]
            h, w = cell.shape
            y0 = inner_edge(cell.sum(axis=1) / w, True)
            y1 = inner_edge(cell.sum(axis=1) / w, False)
            x0 = inner_edge(cell.sum(axis=0) / h, True)
            x1 = inner_edge(cell.sum(axis=0) / h, False)
            out.append(rgb[top + y0:top + y1 + 1, left + x0:left + x1 + 1])
    return out


def main():
    sources = sorted(glob.glob(SRC_GLOB))
    if not sources:
        raise SystemExit(f"no sources matched {SRC_GLOB}")

    frames = []
    for path in sources:
        cropped = panels(path)
        print(f"{path}: {len(cropped)} panels, "
              f"sizes {[f'{c.shape[1]}x{c.shape[0]}' for c in cropped]}")
        frames.extend(cropped)

    rows = len(frames) // COLS
    # The crops land within a couple of px of each other; snapping them all to
    # one cell registers the scene so the desk and window don't jitter.
    aspect = np.median([f.shape[1] / f.shape[0] for f in frames])
    cell_w, cell_h = CELL_W, round(CELL_W / aspect)
    print(f"\n{len(frames)} frames, cell {cell_w}x{cell_h} "
          f"(aspect {cell_w / cell_h:.4f})")

    sheet = Image.new("RGB", (COLS * cell_w, rows * cell_h), (255, 255, 255))
    for i, frame in enumerate(frames):
        img = Image.fromarray(frame.astype(np.uint8)).resize(
            (cell_w, cell_h), Image.LANCZOS
        )
        sheet.paste(img, ((i % COLS) * cell_w, (i // COLS) * cell_h))

    sheet.save(OUT, quality=80, method=6)
    print(f"wrote {OUT}  {sheet.size[0]}x{sheet.size[1]}  "
          f"{os.path.getsize(OUT) / 1024:.0f} KB")
    print(f"\ncols={COLS} rows={rows} frameAspect={cell_w / cell_h:.4f}")


if __name__ == "__main__":
    main()
