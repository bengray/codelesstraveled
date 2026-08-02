/* ============================================================
   codelesstraveled.com
   Two jobs. The page works without either.
   ============================================================ */

/* ---- 1. Draw the l of "less" as the fork -------------------

   The letter has to keep its advance, its stem weight and its
   height, or the word visibly respaces around it.

   Everything here is measured, but not the way it was the first
   time, which produced a stroke far too heavy. Three things had to
   change:

   - The weight comes from font-variation-settings, not font-weight.
     The title renders at wght 800 through the variable axis while
     its computed font-weight is still 400, so building a canvas
     font from font-weight measured the wrong master entirely.

   - The stem is found by rasterising the letter and scanning
     pixels, rather than by asking TextMetrics. Engines disagree
     about whether actualBoundingBoxLeft/Right describe the ink or
     the advance box; where an engine returns the advance, the
     "stem" comes back about as wide as the whole letter. Counting
     pixels cannot be misread.

   - The advance is measured from the DOM, because canvas cannot
     apply the wdth axis and this face is set at wdth 92.

   --fork-weight in the CSS trims the stroke optically. A diagonal
   at the same width as a vertical always looks heavier than it is;
   type designers cut them thinner for exactly that reason.
   ------------------------------------------------------------ */
(function () {
  var RUN = 1.6;     // branch travel as a multiple of its rise
  var PROBE = 100;   // measure at 100px, so results are hundredths of an em

  var host = document.getElementById("fork");
  if (!host) return;

  function inkBox(ctx, ch, ox, oy, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(ch, ox, oy);
    var d;
    try { d = ctx.getImageData(0, 0, w, h).data; } catch (e) { return null; }
    var minX = 1e9, maxX = -1e9, minY = 1e9;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] > 40) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
        }
      }
    }
    if (maxX < 0) return null;
    return { left: minX - ox, right: maxX + 1 - ox, top: oy - minY };
  }

  function draw() {
    var cs = getComputedStyle(host);

    // the weight actually being rendered — axis first, property second
    var axis = /['"]?wght['"]?\s+(\d+)/.exec(cs.fontVariationSettings || "");
    var weight = axis ? axis[1] : (cs.fontWeight || "400");

    var W = 300, H = 300, OX = 80, OY = 230;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.font = weight + " " + PROBE + "px " + cs.fontFamily;

    var boxL = inkBox(ctx, "l", OX, OY, W, H);
    var boxX = inkBox(ctx, "x", OX, OY, W, H);
    if (!boxL || !boxX) return;

    // advance from the DOM: canvas cannot apply the wdth axis
    var probe = document.createElement("span");
    probe.textContent = "l";
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;" +
      "font:" + cs.font + ";font-variation-settings:" + cs.fontVariationSettings +
      ";letter-spacing:0;font-size:" + PROBE + "px";
    host.parentNode.appendChild(probe);
    var adv = probe.getBoundingClientRect().width;
    if (probe.parentNode) probe.parentNode.removeChild(probe);
    if (!(adv > 0)) adv = ctx.measureText("l").width;

    // correct the horizontal figures for the width axis canvas ignored
    var kx = adv / Math.max(ctx.measureText("l").width, 0.001);
    var stem = (boxL.right - boxL.left) * kx;
    var left = boxL.left * kx;
    var asc = boxL.top;
    var xh = boxX.top;
    if (!(stem > 0 && asc > 0 && xh > 0 && asc > xh)) return;

    // Sanity: a stem falls somewhere between 6% and 22% of an em. If the
    // measurement lands outside that, something lied — leave the plain
    // letter alone rather than draw a slab.
    if (stem < PROBE * 0.06 || stem > PROBE * 0.22) return;

    var trim = parseFloat(cs.getPropertyValue("--fork-weight")) || 0.88;
    var w = stem * trim;

    var cx = left + stem / 2;
    var run = (asc - xh) * RUN;
    var endX = cx - run;
    var over = Math.max(0, -(endX - w));
    var boxW = over + adv;

    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", (-over) + " " + (-asc) + " " + boxW + " " + asc);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", w);
    svg.setAttribute("aria-hidden", "true");
    svg.style.width = (boxW / PROBE) + "em";
    svg.style.height = (asc / PROBE) + "em";
    svg.style.marginLeft = (-over / PROBE) + "em";

    // the road everybody else stays on
    var ghost = document.createElementNS(NS, "path");
    ghost.setAttribute("class", "fork__ghost");
    ghost.setAttribute("d", "M" + cx + " " + (-xh) + " L" + cx + " " + (-asc));

    // the one that leaves. Round join, not miter: between a vertical and
    // a shallow diagonal a miter throws a long spike, and the spike is
    // most of what read as "too fat".
    var road = document.createElementNS(NS, "path");
    road.setAttribute("class", "fork__road");
    road.setAttribute("stroke-linejoin", "round");
    road.setAttribute("stroke-linecap", "butt");
    road.setAttribute("d", "M" + cx + " 0 L" + cx + " " + (-xh) + " L" + endX + " " + (-asc));

    svg.appendChild(ghost);
    svg.appendChild(road);
    host.textContent = "";
    host.appendChild(svg);
    host.style.verticalAlign = "baseline";
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  else window.addEventListener("load", draw);
})();

/* ---- 2. Where you are, on the page and on the map ----------

   Three things move together off one number, the scroll progress
   through the route:

   - the rail down the page: covered ground inked in, waypoints
     filling as they are passed
   - the strip map: the marker walks the wandering line, and the
     covered part of it is revealed
   - the land itself, drifting a little

   The marker is placed with getPointAtLength, so it sits exactly on
   the route however that line bends — no approximating the curve
   with maths that would have to be kept in step with the generator.

   The reference point is 45% up the viewport rather than its top
   edge, so it tracks roughly where a reader is looking.

   All of it is decorative. Without this script the rail is a solid
   line and the strip map shows the whole route undrawn, which is
   still a picture of where the page goes.
   ------------------------------------------------------------ */
(function () {
  var route = document.getElementById("route");
  if (!route) return;

  var stops = [].slice.call(route.querySelectorAll(".stop"));
  var drift = document.getElementById("drift");

  var done = document.getElementById("stripDone");
  var here = document.getElementById("stripHere");
  var stopsG = document.getElementById("stripStops");
  var strip = document.getElementById("strip");

  var len = 0;
  var pins = [];
  var fracs = [];          // scroll fraction at which each stop is reached
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scrollMax() {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight, 1);
  }

  /* The land holds still.

     An earlier version drifted it as you scrolled — 90px sideways,
     130px up, 1.6 degrees of tilt over the length of the page. It made
     people seasick, which is the predictable result of moving a
     background independently of the content laid over it, and it
     fought the stillness that makes the vellum sheets work.

     Set these above zero to bring it back. Anything past about 30 and
     half a degree gets unpleasant quickly. */
  var DRIFT_X = 0, DRIFT_Y = 0, DRIFT_R = 0;

  function buildPins() {
    if (!done || !stopsG || !done.getTotalLength) return;
    len = done.getTotalLength();
    done.style.strokeDasharray = len;
    done.style.strokeDashoffset = len;

    /* Waypoints sit at the SCROLL FRACTION at which each stop crosses
       the reading line — the same number the marker is driven by. They
       used to be placed by their position within the route element,
       which is a different measure, so the two only agreed by luck. */
    var max = scrollMax();
    var ref = window.innerHeight * 0.45;
    fracs = [];

    stops.forEach(function (stop, i) {
      var docTop = stop.getBoundingClientRect().top + window.scrollY;
      var at = Math.max(0, Math.min(1, (docTop - ref) / max));
      fracs.push(at);
      var p = done.getPointAtLength(at * len);

      var NS = "http://www.w3.org/2000/svg";
      var a = document.createElementNS(NS, "a");
      a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + stop.id);
      a.setAttribute("href", "#" + stop.id);
      a.setAttribute("aria-label", "Stop " + (i + 1) + ": " + (stop.dataset.name || ""));

      var hit = document.createElementNS(NS, "circle");
      hit.setAttribute("class", "strip__hit");
      hit.setAttribute("cx", p.x); hit.setAttribute("cy", p.y); hit.setAttribute("r", 9);

      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("class", "strip__stop");
      dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y); dot.setAttribute("r", 3);

      a.appendChild(hit); a.appendChild(dot);
      stopsG.appendChild(a);
      pins.push(dot);
    });
    if (strip) strip.classList.add("is-ready");
  }

  var ticking = false;

  function frame() {
    ticking = false;

    /* Progress is the plain scroll fraction: 0 at the top, 1 at the
       bottom, by definition.

       It used to be how far a reading line had travelled through the
       route element, which could never reach 1 — at maximum scroll the
       route still sits below that line, so the last 8-12% of the trail
       was unreachable, and the exact figure moved about with viewport
       height and page length. */
    var pct = Math.min(1, Math.max(0, window.scrollY / scrollMax()));

    route.style.setProperty("--progress", (pct * 100).toFixed(2) + "%");
    route.classList.toggle("is-arrived", pct >= 0.999);

    /* Passed-state comes off the same number that placed the waypoints,
       so the marker and the filled dots agree by construction. */
    for (var i = 0; i < stops.length; i++) {
      var passed = pct >= fracs[i];
      stops[i].classList.toggle("is-passed", passed);
      if (pins[i]) pins[i].classList.toggle("is-passed", passed);
    }

    if (len && done && here) {
      done.style.strokeDashoffset = len * (1 - pct);
      var p = done.getPointAtLength(pct * len);
      here.setAttribute("cx", p.x);
      here.setAttribute("cy", p.y);
    }

    if (drift && !reduceMotion) {
      /* two different periods, so the land never simply slides: it
         wanders, changing direction as you go */
      var s = drift.style;
      s.setProperty("--drift-x", (Math.sin(pct * Math.PI * 1.7) * DRIFT_X).toFixed(1) + "px");
      s.setProperty("--drift-y", (-pct * DRIFT_Y).toFixed(1) + "px");
      s.setProperty("--drift-r", (Math.sin(pct * Math.PI * 1.1 + 0.4) * DRIFT_R).toFixed(2) + "deg");
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  route.classList.add("has-marker");
  buildPins();
  frame();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    pins = [];
    fracs = [];
    if (stopsG) stopsG.innerHTML = "";
    buildPins();
    onScroll();
  });
})();
