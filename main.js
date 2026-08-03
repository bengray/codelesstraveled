/* ============================================================
   codelesstraveled.com
   Two jobs. The page works without either.
   ============================================================ */
/* ---- 0. scroll correctly to each stop ---------------------

    // Calculate the scroll position to center the element
    // (rect.top + rect.height / 2) is the center of the element
    // (viewportHeight / 2) is the center of the viewport
    // Subtracting offset moves the element down by that many pixels*/

function scrollElementToMiddleWithOffset(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const offset = 80; // Adjust this value to control how far down the element appears

  // Calculate the scroll position to center the element
  // (rect.top + rect.height / 2) is the center of the element
  // (viewportHeight / 2) is the center of the viewport
  // Subtracting offset moves the element down by that many pixels
  const targetPosition = rect.top - viewportHeight / 2 + offset;
  console.log("Scrolling to:", targetPosition, "for element:", element);
  window.scrollBy({
    top: targetPosition,
    behavior: "smooth", // Use 'auto' for instant scrolling
  });
}
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
  var RUN = 1.6; // branch travel as a multiple of its rise
  var PROBE = 100; // measure at 100px, so results are hundredths of an em

  var host = document.getElementById("fork");
  if (!host) return;

  function inkBox(ctx, ch, ox, oy, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(ch, ox, oy);
    var d;
    try {
      d = ctx.getImageData(0, 0, w, h).data;
    } catch (e) {
      return null;
    }
    var minX = 1e9,
      maxX = -1e9,
      minY = 1e9;
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
    var weight = axis ? axis[1] : cs.fontWeight || "400";

    var W = 300,
      H = 300,
      OX = 80,
      OY = 230;
    var cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
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
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;" +
      "font:" +
      cs.font +
      ";font-variation-settings:" +
      cs.fontVariationSettings +
      ";letter-spacing:0;font-size:" +
      PROBE +
      "px";
    host.parentNode.appendChild(probe);
    var adv = probe.getBoundingClientRect().width;
    if (probe.parentNode) probe.parentNode.removeChild(probe);
    if (!(adv > 0)) adv = ctx.measureText("l").width;

    // correct the horizontal figures for the width axis canvas ignored
    var kx = adv / Math.max(ctx.measureText("l").width, 0.001);
    var stem = (boxL.right - boxL.left) * kx;
    var left = boxL.left * kx;
    var asc = boxL.top;
    var ascGhost = boxX.top;
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
    svg.setAttribute("viewBox", -over + " " + -asc + " " + boxW + " " + asc);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", w);
    svg.setAttribute("aria-hidden", "true");
    svg.style.width = boxW / PROBE + "em";
    svg.style.height = asc / PROBE + "em";
    svg.style.marginLeft = -over / PROBE + "em";

    // the road everybody else stays on
    var ghost = document.createElementNS(NS, "path");
    ghost.setAttribute("class", "fork__ghost");
    ghost.setAttribute("d", "M" + cx + " " + -xh + " L" + cx + " " + -90);

    // the one that leaves. Round join, not miter: between a vertical and
    // a shallow diagonal a miter throws a long spike, and the spike is
    // most of what read as "too fat".
    var road = document.createElementNS(NS, "path");
    road.setAttribute("class", "fork__road");
    road.setAttribute("stroke-linejoin", "round");
    road.setAttribute("stroke-linecap", "butt");
    road.setAttribute(
      "d",
      "M" + cx + " 0 L" + cx + " " + -xh + " L" + endX + " " + -asc,
    );

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
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* how far the land wanders over the whole page. Small on purpose. */
  var DRIFT_X = 90,
    DRIFT_Y = 130,
    DRIFT_R = 1.6;

  function buildPins() {
    if (!done || !stopsG || !done.getTotalLength) return;
    len = done.getTotalLength();
    done.style.strokeDasharray = len;
    done.style.strokeDashoffset = len;

    var doc = document.documentElement;
    var pageTop = route.getBoundingClientRect().top + window.scrollY;
    var pageH = Math.max(route.offsetHeight, 1);

    stops.forEach(function (stop, i) {
      var at =
        (stop.getBoundingClientRect().top + window.scrollY - pageTop) / pageH;
      at = Math.max(0, Math.min(1, at));
      var p = done.getPointAtLength(at * len);

      var NS = "http://www.w3.org/2000/svg";
      var a = document.createElementNS(NS, "a");
      a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + stop.id);
      a.setAttribute("href", "#" + stop.id);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          scrollElementToMiddleWithOffset(targetElement);
        }
      });
      a.setAttribute(
        "aria-label",
        "Stop " + (i + 1) + ": " + (stop.dataset.name || ""),
      );

      var hit = document.createElementNS(NS, "circle");
      hit.setAttribute("class", "strip__hit");
      hit.setAttribute("cx", p.x);
      hit.setAttribute("cy", p.y);
      hit.setAttribute("r", 9);

      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("class", "strip__stop");
      dot.setAttribute("cx", p.x);
      dot.setAttribute("cy", p.y);
      dot.setAttribute("r", 3);

      a.appendChild(hit);
      a.appendChild(dot);
      stopsG.appendChild(a);
      pins.push(dot);
    });
    if (strip) strip.classList.add("is-ready");
  }

  var ticking = false;

  function frame() {
    ticking = false;
    var box = route.getBoundingClientRect();
    var ref = window.innerHeight * 0.45;
    var pct = Math.max(
      0,
      Math.min(1, (ref - box.top) / Math.max(box.height, 1)),
    );

    route.style.setProperty("--progress", (pct * 100).toFixed(2) + "%");

    for (var i = 0; i < stops.length; i++) {
      var passed = stops[i].getBoundingClientRect().top <= ref;
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
      s.setProperty(
        "--drift-x",
        (Math.sin(pct * Math.PI * 1.7) * DRIFT_X).toFixed(1) + "px",
      );
      s.setProperty("--drift-y", (-pct * DRIFT_Y).toFixed(1) + "px");
      s.setProperty(
        "--drift-r",
        (Math.sin(pct * Math.PI * 1.1 + 0.4) * DRIFT_R).toFixed(2) + "deg",
      );
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
    if (stopsG) stopsG.innerHTML = "";
    buildPins();
    onScroll();
  });
})();

(function () {
  var year = document.getElementById("current-year");
  if (!year) return;
  year.textContent = new Date().getFullYear();
})();
