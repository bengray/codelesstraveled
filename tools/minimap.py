#!/usr/bin/env python3
"""
Draw the strip map that runs down the side of codelesstraveled.com.

    python3 tools/minimap.py

A strip map is a real thing: a long thin map of a route, carried by
walkers and printed in trail guides, showing the way and nothing on
either side of it. This is that — a wandering line with the page's
stops on it, over a scrap of the same terrain as the background.

Emits two pieces into index.html between the MINIMAP markers:
  - contour fragments, so the strip reads as ground and not as a
    progress bar
  - the route itself, as one path. main.js walks it with
    getPointAtLength, so the marker sits exactly on the line however
    it wanders, and the covered part is revealed with a dash offset.

No dependencies. Standard library only.
"""

import math
import os
import re
import sys

VB_W, VB_H = 64, 560          # the strip, in its own coordinates
GW, GH = 26, 190              # terrain grid
SX, SY = VB_W / (GW - 1), VB_H / (GH - 1)
LEVELS = 9

# hills kept to the flanks so the route has clear ground to run through
HILLS = [
    (2,  26, 12, 0.90), (25, 58, 13, 0.72),
    (1,  96, 11, 0.66), (26, 132, 12, 0.80),
    (3, 168, 12, 0.58), (24, 20, 10, 0.44),
]


def height(x, y):
    v = 0.0
    for hx, hy, r, a in HILLS:
        v += a * math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * r * r))
    return v + 0.10 * math.sin(x * 0.4 + y * 0.07)


def _interp(p1, p2, v1, v2, t):
    f = (t - v1) / (v2 - v1) if v2 != v1 else 0.5
    return (p1[0] + (p2[0] - p1[0]) * f, p1[1] + (p2[1] - p1[1]) * f)


def isoline(field, t):
    segs = []
    for y in range(GH - 1):
        for x in range(GW - 1):
            corner = [(x, y), (x + 1, y), (x + 1, y + 1), (x, y + 1)]
            v = [field[y][x], field[y][x + 1], field[y + 1][x + 1], field[y + 1][x]]
            if sum(1 for q in v if q > t) in (0, 4):
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
                segs.append([edge[0], edge[1]])
                segs.append([edge[2], edge[3]])
    return segs


def _key(p):
    return (round(p[0], 4), round(p[1], 4))


def chain(segs):
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


def terrain():
    field = [[height(x, y) for x in range(GW)] for y in range(GH)]
    lo, hi = min(map(min, field)), max(map(max, field))
    out = []
    for i in range(1, LEVELS):
        t = lo + (hi - lo) * i / LEVELS
        for line in chain(isoline(field, t)):
            if len(line) < 6:
                continue
            pts = line[::2] if len(line) > 40 else line
            d = "M" + " L".join(f"{p[0]*SX:.1f} {p[1]*SY:.1f}" for p in pts)
            out.append(d)
    return out


def route():
    """A line that wanders. Not decoration: the wander is what makes it
    read as ground covered rather than as a loading bar."""
    top, bottom = 26.0, VB_H - 26.0
    mid = VB_W / 2
    pts = []
    N = 120
    for i in range(N + 1):
        t = i / N
        y = top + (bottom - top) * t
        x = (mid
             + 13.0 * math.sin(t * math.pi * 3.1 + 0.6)
             + 5.5 * math.sin(t * math.pi * 7.3 + 2.1)
             + 2.2 * math.sin(t * math.pi * 13.0))
        pts.append((x, y))

    # smooth through the samples so the corners are turns, not kinks
    d = "M%.1f %.1f" % pts[0]
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i > 0 else pts[i]
        p1, p2 = pts[i], pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else pts[i + 1]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += "C%.1f %.1f %.1f %.1f %.1f %.1f" % (c1 + c2 + p2)
    return d


def build():
    lines = terrain()
    out = [f'<svg class="strip__svg" viewBox="0 0 {VB_W} {VB_H}" fill="none"'
           ' preserveAspectRatio="xMidYMid meet" aria-hidden="true">']
    out.append('<g class="strip__land">')
    for d in lines:
        out.append(f'<path d="{d}" stroke="currentColor" stroke-width="0.8"/>')
    out.append('</g>')
    r = route()
    out.append(f'<path class="strip__ahead" d="{r}"/>')
    out.append(f'<path class="strip__done" id="stripDone" d="{r}"/>')
    out.append('<g id="stripStops"></g>')
    out.append('<circle class="strip__here" id="stripHere" r="3.6" cx="-99" cy="-99"/>')
    out.append('</svg>')
    return "\n".join(out), len(lines)


def main():
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    svg, n = build()

    index = os.path.join(here, "index.html")
    with open(index) as f:
        html = f.read()

    pat = re.compile(r"(<!--MINIMAP-->).*?(<!--/MINIMAP-->)", re.S)
    if not pat.search(html):
        print("MINIMAP markers not found in index.html", file=sys.stderr)
        return 1
    html = pat.sub(lambda m: m.group(1) + "\n" + svg + "\n" + m.group(2), html)
    with open(index, "w") as f:
        f.write(html)
    print(f"strip map: {n} contour fragments + route -> index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
