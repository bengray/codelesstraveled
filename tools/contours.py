#!/usr/bin/env python3
"""
Redraw the terrain behind codelesstraveled.com.

    python3 tools/contours.py

Builds a height field from a handful of gaussian hills plus a couple of
sine ridges, traces isolines through it with marching squares, chains the
segments into polylines, and writes the result straight into index.html
between the CONTOURS markers.

The contours are inline rather than an <img> because they are stroked
with currentColor — the CSS decides what colour the land is printed in,
and an external file could not participate in that.

No dependencies. Standard library only.
"""

import math
import os
import re
import sys

# ---- the land ------------------------------------------------------------

W, H = 132, 78          # grid resolution
SX, SY = 12.0, 12.0     # user units per cell in the output
LEVELS = 22             # contour intervals; every 5th is drawn heavier

HILLS = [
    # x,   y,   radius, height
    (28,  30,  26, 1.00),
    (78,  22,  30, 0.86),
    (104, 52,  24, 0.72),
    (46,  62,  30, 0.66),
    (12,  58,  20, 0.44),
    (92,  70,  22, 0.38),
]


def height(x, y):
    v = 0.0
    for hx, hy, r, a in HILLS:
        v += a * math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * r * r))
    v += 0.16 * math.sin(x * 0.075 + y * 0.045)   # a long ridge
    v += 0.07 * math.sin(x * 0.21 - y * 0.17)     # broken ground
    return v


# ---- marching squares ----------------------------------------------------

def _interp(p1, p2, v1, v2, t):
    f = (t - v1) / (v2 - v1) if v2 != v1 else 0.5
    return (p1[0] + (p2[0] - p1[0]) * f, p1[1] + (p2[1] - p1[1]) * f)


def isoline(field, t):
    segs = []
    for y in range(H - 1):
        for x in range(W - 1):
            corner = [(x, y), (x + 1, y), (x + 1, y + 1), (x, y + 1)]
            v = [field[y][x], field[y][x + 1], field[y + 1][x + 1], field[y + 1][x]]
            above = sum(1 for q in v if q > t)
            if above in (0, 4):
                continue
            edge = {}
            for i in range(4):
                j = (i + 1) % 4
                if (v[i] > t) != (v[j] > t):
                    edge[i] = _interp(corner[i], corner[j], v[i], v[j], t)
            k = sorted(edge)
            if len(k) == 2:
                segs.append([edge[k[0]], edge[k[1]]])
            elif len(k) == 4:
                # saddle: two separate crossings through one cell
                segs.append([edge[0], edge[1]])
                segs.append([edge[2], edge[3]])
    return segs


def _key(p):
    return (round(p[0], 4), round(p[1], 4))


def chain(segs):
    """Join loose segments end to end into polylines."""
    adj = {}
    for i, (a, b) in enumerate(segs):
        adj.setdefault(_key(a), []).append(i)
        adj.setdefault(_key(b), []).append(i)

    used = [False] * len(segs)
    lines = []
    for i in range(len(segs)):
        if used[i]:
            continue
        used[i] = True
        line = list(segs[i])
        for forward in (True, False):
            while True:
                tip = line[-1] if forward else line[0]
                nxt = None
                for j in adj.get(_key(tip), []):
                    if used[j]:
                        continue
                    a, b = segs[j]
                    nxt = (j, b if _key(a) == _key(tip) else a)
                    break
                if not nxt:
                    break
                j, p = nxt
                used[j] = True
                line.append(p) if forward else line.insert(0, p)
        lines.append(line)
    return lines


# ---- output --------------------------------------------------------------

def build():
    field = [[height(x, y) for x in range(W)] for y in range(H)]
    lo = min(map(min, field))
    hi = max(map(max, field))

    paths = []
    for i in range(1, LEVELS):
        t = lo + (hi - lo) * i / LEVELS
        for line in chain(isoline(field, t)):
            if len(line) < 8:
                continue
            pts = line[::2] if len(line) > 70 else line
            d = "M" + " L".join(f"{p[0]*SX:.0f} {p[1]*SY:.0f}" for p in pts)
            paths.append((i, d))

    vb_w, vb_h = int((W - 1) * SX), int((H - 1) * SY)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}"'
           f' fill="none" preserveAspectRatio="xMidYMid slice">']
    for i, d in paths:
        width = 3.4 if i % 5 == 0 else 1.6      # index contours print heavier
        out.append(f'<path d="{d}" stroke="currentColor" stroke-width="{width}"/>')
    out.append("</svg>")
    return "\n".join(out), len(paths)


def main():
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    svg, count = build()

    with open(os.path.join(here, "contours.svg"), "w") as f:
        f.write(svg)

    index = os.path.join(here, "index.html")
    with open(index) as f:
        html = f.read()

    pattern = re.compile(r"(<!--CONTOURS-->).*?(<!--/CONTOURS-->)", re.S)
    if not pattern.search(html):
        print("markers not found in index.html; wrote contours.svg only", file=sys.stderr)
        return 1

    html = pattern.sub(lambda m: m.group(1) + "\n" + svg + "\n" + m.group(2), html)
    with open(index, "w") as f:
        f.write(html)

    print(f"{count} contours across {LEVELS - 1} levels -> contours.svg + index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
