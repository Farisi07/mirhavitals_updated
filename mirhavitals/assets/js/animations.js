/* ==========================================================================
   Mirha Vitals Home Healthcare LLC
   animations.js : GSAP, ScrollTrigger and Lenis set-up
   If the libraries are unavailable the page simply shows without motion.
   prefers-reduced-motion: no smooth scroll, parallax, pinning, auto-play or
   cursor effects; elements use simple fades only.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;

  if (!window.gsap || !window.ScrollTrigger) {
    html.classList.remove("js-anim");
    return;
  }
  window.__animReady = true;
  window.clearTimeout(window.__animTimer);

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var EASE = "power3.out";
  var EXPO = "expo.out";

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function st(trigger, start) { return { trigger: trigger, start: start || "top 86%", once: true }; }

  /* ------------------------------------------------------------------
     Reduced motion: simple fades only
     ------------------------------------------------------------------ */
  if (reduceMotion) {
    var faders = $$("[data-reveal], [data-stagger] > *, [data-eyebrow], [data-pop] > *, [data-split], [data-draw-label], .hero__sub, .hero__actions > *, .hero__chips > *, .hero__card, .cred__plate, .page-banner .breadcrumb, .page-banner .lead, .page-banner__actions > *");
    faders.forEach(function (el) {
      gsap.to(el, { opacity: 1, duration: 0.6, ease: "none", scrollTrigger: st(el, "top 95%") });
    });
    $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
    return;
  }

  /* ------------------------------------------------------------------
     Lenis smooth scroll, driven by the GSAP ticker
     ------------------------------------------------------------------ */
  var lenis = null;
  if (window.Lenis) {
    try {
      lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    } catch (err) { lenis = null; }
  }

  /* ------------------------------------------------------------------
     Split a text-only heading into masked lines
     ------------------------------------------------------------------ */
  function splitLines(el) {
    if (el.children.length) return null;
    var original = el.textContent.replace(/\s+/g, " ").trim();
    if (!original) return null;
    var words = original.split(" ");
    el.textContent = "";
    var spans = words.map(function (w, i) {
      var s = doc.createElement("span");
      s.style.display = "inline-block";
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(doc.createTextNode(" "));
      return s;
    });
    var lines = [];
    var lastTop = null;
    spans.forEach(function (s) {
      var top = s.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 4) { lines.push([]); lastTop = top; }
      lines[lines.length - 1].push(s.textContent);
    });
    el.textContent = "";
    el.setAttribute("aria-label", original);
    var inners = lines.map(function (line) {
      var outer = doc.createElement("span");
      outer.className = "split-line";
      outer.setAttribute("aria-hidden", "true");
      var inner = doc.createElement("span");
      inner.textContent = line.join(" ");
      outer.appendChild(inner);
      el.appendChild(outer);
      return inner;
    });
    return {
      lines: inners,
      revert: function () { el.textContent = original; el.removeAttribute("aria-label"); }
    };
  }
  function revealHeading(el, delay, immediate) {
    var split = splitLines(el);
    gsap.set(el, { opacity: 1 });
    if (!split) {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: EASE, delay: delay || 0, scrollTrigger: immediate ? null : st(el) });
      return;
    }
    gsap.set(split.lines, { yPercent: 115 });
    gsap.to(split.lines, {
      yPercent: 0, duration: 1.05, ease: EXPO, stagger: 0.11, delay: delay || 0,
      scrollTrigger: immediate ? null : st(el),
      onComplete: split.revert
    });
  }

  function prepareDraw(scope) {
    var shapes = $$("path, circle, rect, line, polyline, ellipse", scope);
    shapes.forEach(function (s) { s.setAttribute("pathLength", "1"); });
    return shapes;
  }

  /* ------------------------------------------------------------------
     Build everything once fonts are ready (line breaks depend on them)
     ------------------------------------------------------------------ */
  function build() {
    var heroDelay = html.classList.contains("preload") ? 2.1 : (html.classList.contains("wipe-in") ? 0.45 : 0.1);

    /* ---- Hero (home) ---- */
    var hero = $(".hero");
    if (hero) {
      var h1 = $(".hero__title", hero);
      if (h1) revealHeading(h1, heroDelay, true);
      var tl = gsap.timeline({ delay: heroDelay + 0.35, defaults: { ease: EASE } });
      tl.fromTo(".hero__sub", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(".hero__actions > *", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.55")
        .fromTo(".hero__chips > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .fromTo(".hero__card", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.4");
      var heroImg = $(".hero__media img", hero);
      if (heroImg) {
        gsap.fromTo(heroImg, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: EXPO, delay: heroDelay });
        gsap.to(heroImg, { yPercent: 8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      }
      var beat = $(".hero__beat path", hero);
      if (beat) {
        beat.setAttribute("pathLength", "1");
        gsap.fromTo(beat, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", delay: heroDelay + 0.6 });
      }
    }

    /* ---- Page banner (inner pages) ---- */
    var banner = $(".page-banner");
    if (banner) {
      var bh = $("h1", banner);
      if (bh) revealHeading(bh, heroDelay, true);
      gsap.fromTo($$(".breadcrumb, .page-banner .eyebrow", banner), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE, delay: heroDelay });
      gsap.fromTo($$(".page-banner .lead, .page-banner__actions > *", banner), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.1, delay: heroDelay + 0.35 });
    }

    /* ---- Headings and eyebrows ---- */
    $$("[data-split]").forEach(function (el) {
      if (el.closest(".hero") || (el.closest(".page-banner") && el.tagName === "H1")) return;
      revealHeading(el, 0, false);
    });
    $$("[data-eyebrow]").forEach(function (el) {
      if (el.closest(".page-banner")) return;
      gsap.fromTo(el, { opacity: 0, letterSpacing: "0.42em" }, { opacity: 1, letterSpacing: "0.2em", duration: 1, ease: EASE, scrollTrigger: st(el) });
    });

    /* ---- Generic reveals ---- */
    $$("[data-reveal]").forEach(function (el) {
      if (el.closest(".page-banner") && (el.classList.contains("lead") || el.classList.contains("breadcrumb"))) return;
      var type = el.getAttribute("data-reveal");
      var from = { opacity: 0, y: 40 };
      if (type === "left") from = { opacity: 0, x: -60 };
      else if (type === "right") from = { opacity: 0, x: 80 };
      else if (type === "scale") from = { opacity: 0, scale: 0.9 };
      else if (type === "fade") from = { opacity: 0 };
      gsap.fromTo(el, from, {
        opacity: 1, x: 0, y: 0, scale: 1, duration: type === "right" ? 1.1 : 0.95,
        ease: type === "scale" ? EXPO : EASE,
        delay: parseFloat(el.getAttribute("data-delay") || "0"),
        scrollTrigger: st(el),
        clearProps: "transform"
      });
    });
    $$("[data-stagger]").forEach(function (group) {
      var kids = Array.prototype.slice.call(group.children);
      if (!kids.length) return;
      var mode = group.getAttribute("data-stagger");
      if (mode === "alternate") {
        kids.forEach(function (k, i) {
          gsap.fromTo(k, { opacity: 0, x: i % 2 ? 70 : -70 }, { opacity: 1, x: 0, duration: 0.95, ease: EASE, delay: i * 0.07, scrollTrigger: st(group, "top 82%"), clearProps: "transform" });
        });
        return;
      }
      gsap.fromTo(kids, { opacity: 0, y: 44 }, {
        opacity: 1, y: 0, duration: 0.95, ease: EASE, stagger: 0.09,
        scrollTrigger: st(group, "top 84%"), clearProps: "transform"
      });
    });
    $$("[data-pop]").forEach(function (group) {
      gsap.fromTo(group.children, { opacity: 0, scale: 0.4 }, {
        opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12,
        scrollTrigger: st(group, "top 92%"), clearProps: "transform"
      });
    });

    /* ---- Images: clip-path wipe with inner parallax ---- */
    $$("[data-wipe]").forEach(function (frame) {
      var fromClip = frame.getAttribute("data-wipe") === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 100% 0%)";
      var img = $("img", frame);
      gsap.fromTo(frame, { clipPath: fromClip }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EXPO, scrollTrigger: st(frame, "top 84%") });
      if (img) {
        gsap.fromTo(img, { scale: 1.16 }, { scale: 1, duration: 1.5, ease: EXPO, scrollTrigger: st(frame, "top 84%") });
        if (frame.hasAttribute("data-parallax")) {
          gsap.fromTo(img, { yPercent: -9 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
        }
      }
    });

    /* ---- Icons that draw their strokes, then labels fade up ---- */
    $$("[data-draw]").forEach(function (group) {
      var shapes = prepareDraw(group);
      var labels = $$("[data-draw-label]", group);
      gsap.set(labels, { opacity: 0, y: 14 });
      var tl = gsap.timeline({ scrollTrigger: st(group, "top 88%") });
      tl.fromTo(shapes, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.035 });
      if (labels.length) tl.to(labels, { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.09 }, "-=0.55");
    });

    /* ---- Quote mark draws in ---- */
    $$("[data-draw-solo]").forEach(function (svg) {
      var paths = prepareDraw(svg);
      gsap.fromTo(paths, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.4, scrollTrigger: st(svg, "top 88%") });
    });

    /* ---- Credentials plate: scale in, then a light sweep ---- */
    $$(".cred__plate").forEach(function (plate) {
      gsap.fromTo(plate, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1.1, ease: EXPO, scrollTrigger: st(plate, "top 82%"),
        onStart: function () { plate.classList.add("is-swept"); }
      });
    });

    /* ---- Counters (About: 24 and 7) ---- */
    $$("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var obj = { v: 0 };
      el.textContent = "0";
      gsap.to(obj, {
        v: target, duration: 1.8, ease: "power2.out", scrollTrigger: st(el, "top 88%"),
        onUpdate: function () { el.textContent = String(Math.round(obj.v)); }
      });
    });

    /* ---- CTA band photo parallax ---- */
    $$(".cta").forEach(function (cta) {
      var img = $(".cta__photo img", cta);
      if (img) gsap.fromTo(img, { yPercent: -13 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$(".page-banner__media").forEach(function (m) {
      var img = $("img", m);
      if (img) gsap.fromTo(img, { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ---- Pointer effects (desktop only) ---- */
    if (finePointer) {
      /* Magnetic buttons */
      $$(".btn, .round-btn, .social").forEach(function (b) {
        var xTo = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3.out" });
        var yTo = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3.out" });
        b.addEventListener("mousemove", function (e) {
          var r = b.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.22);
          yTo((e.clientY - r.top - r.height / 2) * 0.3);
        });
        b.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
      });

      /* Service cards: slight 3D tilt */
      $$(".svc-card").forEach(function (card) {
        card.addEventListener("mouseenter", function () { gsap.set(card, { transformPerspective: 900 }); });
        var rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        var ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 9);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
        });
        card.addEventListener("mouseleave", function () { rx(0); ry(0); });
      });

      /* Bento cards: glow follows the cursor */
      $$(".bento__card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", (e.clientX - r.left) + "px");
          card.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
      });

      /* Small cursor dot that grows over links and cards */
      var dot = doc.createElement("div");
      dot.className = "cursor-dot";
      dot.setAttribute("aria-hidden", "true");
      doc.body.appendChild(dot);
      var dx = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
      var dy = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });
      var shown = false;
      window.addEventListener("mousemove", function (e) {
        dx(e.clientX); dy(e.clientY);
        if (!shown) { shown = true; gsap.to(dot, { opacity: 0.85, duration: 0.3 }); }
      }, { passive: true });
      doc.addEventListener("mouseleave", function () { shown = false; gsap.to(dot, { opacity: 0, duration: 0.3 }); });
      doc.addEventListener("mouseover", function (e) {
        var hit = e.target.closest ? e.target.closest("a, button, .svc-card, .tcard, .bento__card, .faq__btn") : null;
        if (!shown) return;
        gsap.to(dot, { scale: hit ? 3.6 : 1, opacity: hit ? 0.35 : 0.85, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      });
    }

    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
    ScrollTrigger.refresh();
  }

  var started = false;
  function start() { if (started) return; started = true; build(); }
  if (doc.fonts && doc.fonts.ready && typeof doc.fonts.ready.then === "function") {
    doc.fonts.ready.then(start);
    window.setTimeout(start, 1400);
  } else {
    start();
  }
})();
