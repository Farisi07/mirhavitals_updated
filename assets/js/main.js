/* ==========================================================================
   Mirha Vitals Home Healthcare LLC
   main.js : site data binding, header, services dropdown, mobile menu,
             accordion, carousels, floating buttons, page transitions
   Works without GSAP or Lenis. No modules, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;
  var ROOT = html.getAttribute("data-root") || "";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts || false); }

  /* ------------------------------------------------------------------
     1. Bind SITE / FOUNDER / IMAGES values from data.js into the page
     ------------------------------------------------------------------ */
  function formatPhone(p) {
    var m = /^\+971(\d{2})(\d{3})(\d{4})$/.exec(p || "");
    return m ? "+971 " + m[1] + " " + m[2] + " " + m[3] : p;
  }
  function bookingLink(base, service) {
    if (!service) return base;
    var msg = (window.BUSINESS ? BUSINESS.bookingMessage : "Hello Mirha Vitals, I would like to book: ") + service;
    return base + (base.indexOf("?") === -1 ? "?" : "&") + "text=" + encodeURIComponent(msg);
  }
  function bindSiteData() {
    if (!window.SITE) return;
    var links = {
      // tel: "tel:" + SITE.phone,
      // mailto: "mailto:" + SITE.email,
      // whatsapp: SITE.siteWhatsApp,
      // siteWhatsApp: SITE.siteWhatsApp,
      // siteWebsite: SITE.siteWebsite,
      // siteInstagram: SITE.siteInstagram,
      // siteLinkedIn: SITE.siteLinkedIn,
      // founderWhatsApp: SITE.founderWhatsApp,
      // founderInstagram: SITE.founderInstagram,
      // founderLinkedIn: SITE.founderLinkedIn
    };
    $$("[data-link]").forEach(function (a) {
      var key = a.getAttribute("data-link");
      if (!links[key]) return;
      var href = links[key];
      if (key === "whatsapp") href = bookingLink(href, a.getAttribute("data-service"));
      a.setAttribute("href", href);
      if (/^https?:/i.test(href) && key !== "whatsapp" && key !== "siteWhatsApp") {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
    var texts = {
      licenceNo: SITE.licenceNo,
      phone: formatPhone(SITE.phone),
      email: SITE.email,
      website: SITE.siteWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")
    };
    $$("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      if (texts[key] != null) el.textContent = texts[key];
    });
    if (window.IMAGES) {
      $$("img[data-img]").forEach(function (img) {
        var path = IMAGES[img.getAttribute("data-img")];
        if (path && img.getAttribute("src") !== ROOT + path) img.setAttribute("src", ROOT + path);
      });
    }
    if (window.FOUNDER) {
      $$("img[data-img='founder']").forEach(function (img) { img.alt = FOUNDER.alt; });
    }
  }

  /* Keep clean page URLs usable when previewing the site directly from disk. */
  function fixLocalPageLinks() {
    if (window.location.protocol !== "file:") return;
    $$("a[href]").forEach(function (a) {
      var raw = a.getAttribute("href");
      if (/^[a-z]+:/i.test(raw) || raw.charAt(0) === "/" || raw.charAt(0) === "#") return;
      var parts = /^([^?#]*)([?#].*)?$/.exec(raw);
      var path = parts[1];
      var suffix = parts[2] || "";
      if (!path) return;
      if (/\/$/.test(path)) a.setAttribute("href", path + "index.html" + suffix);
      else if (!/\.[^/]+$/.test(path)) a.setAttribute("href", path + ".html" + suffix);
    });
  }

  /* MedicalBusiness structured data (home page), built from data.js */
  function injectBusinessSchema() {
    if (html.getAttribute("data-page") !== "home" || !window.SITE || !window.BUSINESS) return;
    var data = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: BUSINESS.name,
      url: SITE.siteWebsite,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.street,
        addressLocality: BUSINESS.locality,
        addressCountry: BUSINESS.country
      },
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }]
    };
    var s = doc.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(data);
    doc.head.appendChild(s);
  }

  /* ------------------------------------------------------------------
     2. Testimonials: Google review screenshots (REVIEW_SHOTS in data.js)
        Each card shows one complete screenshot, scaled to fit (never cropped).
     ------------------------------------------------------------------ */
  function renderTestimonials() {
    var track = $("#testimonial-track");
    if (!track || !window.REVIEW_SHOTS) return;
    track.innerHTML = "";
    REVIEW_SHOTS.forEach(function (r, i) {
      var card = doc.createElement("article");
      card.className = "tcard tcard--shot";
      var frame = doc.createElement("div");
      frame.className = "tcard__shot";
      var img = doc.createElement("img");
      img.src = ROOT + r.src;
      img.width = r.width;
      img.height = r.height;
      img.alt = "Google review screenshot " + (i + 1);
      img.loading = "lazy";   /* the section is far below the fold */
      img.decoding = "async";
      img.draggable = false;
      frame.appendChild(img);
      card.appendChild(frame);
      track.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------
     3. Header: glass after scroll, hide on scroll down, show on scroll up
     ------------------------------------------------------------------ */
  var header = $(".site-header");
  var progressBar = $(".progress span");
  var fab = $(".fab");
  var footerBar = $(".footer__bottom");
  var lastY = window.pageYOffset;
  var ticking = false;

  function onScrollFrame() {
    ticking = false;
    var y = window.pageYOffset;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      var menuOpen = html.classList.contains("menu-open");
      var ddOpen = !!$(".has-dd.is-open");
      if (!menuOpen && !ddOpen && y > 260 && y > lastY + 4) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= 260) header.classList.remove("is-hidden");
    }
    if (progressBar) {
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
    /* Lift the floating buttons above the footer bottom bar */
    if (fab && footerBar) {
      var overlap = window.innerHeight - footerBar.getBoundingClientRect().top;
      fab.style.setProperty("--fab-lift", Math.max(0, overlap) + "px");
    }
    lastY = y;
  }
  function requestScrollFrame() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScrollFrame); }
  }
  on(window, "scroll", requestScrollFrame, { passive: true });
  on(window, "resize", requestScrollFrame);

  /* ------------------------------------------------------------------
     4. Services dropdown
        Hover opens, leaving closes after 150ms. A click pins it open
        until a second click, a click outside, Esc, or choosing a link.
     ------------------------------------------------------------------ */
  function initDropdown() {
    var item = $(".has-dd");
    if (!item) return;
    var btn = $(".nav__dd-btn", item);
    var links = $$(".dd__link", item);
    var pinned = false;
    var closeTimer = null;

    function isOpen() { return item.classList.contains("is-open"); }
    function open() {
      window.clearTimeout(closeTimer);
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      if (header) header.classList.remove("is-hidden");
    }
    function close() {
      window.clearTimeout(closeTimer);
      pinned = false;
      item.classList.remove("is-open", "is-pinned");
      btn.setAttribute("aria-expanded", "false");
    }
    function pin() { pinned = true; item.classList.add("is-pinned"); open(); }

    if (canHover) {
      on(item, "mouseenter", function () { open(); });
      on(item, "mouseleave", function () {
        if (pinned) return;
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(function () { if (!pinned) close(); }, 150);
      });
    }
    on(btn, "click", function (e) {
      e.preventDefault();
      if (pinned) close(); else pin();
    });
    on(doc, "click", function (e) {
      if (isOpen() && !item.contains(e.target)) close();
    });
    on(doc, "keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { var had = item.contains(doc.activeElement); close(); if (had) btn.focus(); }
    });
    links.forEach(function (a) { on(a, "click", function () { close(); }); });

    function focusLink(i) {
      if (!links.length) return;
      links[(i + links.length) % links.length].focus();
    }
    on(btn, "keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); open(); focusLink(0); }
      else if (e.key === "ArrowUp") { e.preventDefault(); open(); focusLink(links.length - 1); }
    });
    links.forEach(function (a, i) {
      on(a, "keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); focusLink(i + 1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); focusLink(i - 1); }
        else if (e.key === "Home") { e.preventDefault(); focusLink(0); }
        else if (e.key === "End") { e.preventDefault(); focusLink(links.length - 1); }
      });
    });
    /* Focus leaving the button and panel closes it, unless pinned */
    on(item, "focusout", function (e) {
      if (pinned) return;
      var next = e.relatedTarget;
      if (next && item.contains(next)) return;
      window.setTimeout(function () {
        if (!pinned && !item.contains(doc.activeElement) && !item.matches(":hover")) close();
      }, 0);
    });
  }

  /* ------------------------------------------------------------------
     5. Mobile full-screen menu with services accordion
     ------------------------------------------------------------------ */
  function initMobileMenu() {
    var menu = $(".mnav");
    var burger = $(".burger");
    if (!menu || !burger) return;
    var closeBtn = $(".mnav__close", menu);
    var subBtn = $(".mnav__sub-btn", menu);
    var sub = $(".mnav__sub", menu);

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      html.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      doc.body.style.overflow = open ? "hidden" : "";
      if (window.__lenis) { if (open) window.__lenis.stop(); else window.__lenis.start(); }
      if (open) window.setTimeout(function () { if (closeBtn) closeBtn.focus(); }, 60);
      else burger.focus();
    }
    on(burger, "click", function () { setOpen(true); });
    on(closeBtn, "click", function () { setOpen(false); });
    on(doc, "keydown", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "Tab") {
        var f = $$("a[href], button", menu).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    on(subBtn, "click", function () {
      var open = subBtn.getAttribute("aria-expanded") !== "true";
      subBtn.setAttribute("aria-expanded", open ? "true" : "false");
      sub.classList.toggle("is-open", open);
      $$("a", sub).forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    });
    if (sub) $$("a", sub).forEach(function (a) { a.tabIndex = -1; });
    on(window, "resize", function () {
      if (window.innerWidth >= 1160 && menu.classList.contains("is-open")) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
     6. FAQ accordion: one open at a time
     ------------------------------------------------------------------ */
  function initAccordions() {
    $$(".faq").forEach(function (list) {
      var items = $$(".faq__item", list);
      function setItem(item, open) {
        item.classList.toggle("is-open", open);
        var b = $(".faq__btn", item);
        if (b) b.setAttribute("aria-expanded", open ? "true" : "false");
      }
      items.forEach(function (item) {
        var b = $(".faq__btn", item);
        on(b, "click", function () {
          var willOpen = !item.classList.contains("is-open");
          items.forEach(function (other) { setItem(other, false); });
          setItem(item, willOpen);
          window.setTimeout(function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 600);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     7. Carousels: arrows, drag, keyboard, optional auto-play
     ------------------------------------------------------------------ */
  function initCarousels() {
    $$("[data-carousel]").forEach(function (root) {
      var track = $(".carousel__track", root);
      if (!track) return;
      var prev = $("[data-carousel-prev]", root);
      var next = $("[data-carousel-next]", root);
      var autoplayMs = parseInt(root.getAttribute("data-autoplay") || "0", 10);
      var timer = null;
      var paused = false;

      function step() {
        var first = track.children[0];
        if (!first) return track.clientWidth;
        var gap = parseFloat(window.getComputedStyle(track).columnGap || "0") || 0;
        return first.getBoundingClientRect().width + gap;
      }
      function maxScroll() { return track.scrollWidth - track.clientWidth; }
      function update() {
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= maxScroll() - 2;
      }
      function go(dir) {
        track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
      }
      on(prev, "click", function () { go(-1); });
      on(next, "click", function () { go(1); });
      on(track, "scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
      on(window, "resize", update);
      update();

      /* Mouse drag (touch uses native scrolling) */
      var dragging = false, moved = false, startX = 0, startLeft = 0;
      on(track, "pointerdown", function (e) {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        dragging = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      });
      on(window, "pointermove", function (e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add("is-dragging"); }
        if (moved) track.scrollLeft = startLeft - dx;
      });
      function endDrag() {
        if (!dragging) return;
        dragging = false;
        if (moved) {
          track.classList.remove("is-dragging");
          var s = step();
          track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: reduceMotion ? "auto" : "smooth" });
          window.setTimeout(function () { moved = false; }, 0);
        }
      }
      on(window, "pointerup", endDrag);
      on(window, "pointercancel", endDrag);
      on(track, "click", function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); }
      }, true);
      on(track, "dragstart", function (e) { e.preventDefault(); });

      /* Auto-play (testimonials). Off for reduced motion. */
      if (autoplayMs > 0 && !reduceMotion) {
        var tick = function () {
          if (paused || dragging || doc.hidden) return;
          if (track.scrollLeft >= maxScroll() - 2) track.scrollTo({ left: 0, behavior: "smooth" });
          else go(1);
        };
        timer = window.setInterval(tick, autoplayMs);
        on(root, "mouseenter", function () { paused = true; });
        on(root, "mouseleave", function () { paused = false; });
        on(root, "focusin", function () { paused = true; });
        on(root, "focusout", function () { paused = false; });
        on(track, "touchstart", function () { paused = true; }, { passive: true });
        on(track, "touchend", function () { window.setTimeout(function () { paused = false; }, 4000); }, { passive: true });
      }
    });
  }

  /* ------------------------------------------------------------------
     8. Buttons: ripple on click, back to top, in-page anchors
     ------------------------------------------------------------------ */
  function initRipple() {
    on(doc, "click", function (e) {
      var b = e.target.closest ? e.target.closest(".btn, .round-btn") : null;
      if (!b || reduceMotion) return;
      var r = b.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2.2;
      var s = doc.createElement("span");
      s.className = "ripple";
      s.style.width = s.style.height = size + "px";
      s.style.left = (e.clientX - r.left - size / 2) + "px";
      s.style.top = (e.clientY - r.top - size / 2) + "px";
      b.appendChild(s);
      window.setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 750);
    });
  }
  function scrollToTarget(target) {
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -96 });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
  function initAnchors() {
    on($(".back-top"), "click", function (e) { e.preventDefault(); scrollToTarget(0); });
    on(doc, "click", function (e) {
      var a = e.target.closest ? e.target.closest("a[href*='#']") : null;
      if (!a || a.classList.contains("back-top")) return;
      var url;
      try { url = new URL(a.href); } catch (err) { return; }
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === "#") return;
      var target = doc.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      try { window.history.replaceState(null, "", url.hash); } catch (err2) { /* file:// */ }
    });
  }

  /* ------------------------------------------------------------------
     9. Page transitions: purple panel wipes across, next page reveals.
        Skipped for tel:, wa.me, mailto:, new-tab links and anchors.
     ------------------------------------------------------------------ */
  function initPageTransitions() {
    on(doc, "click", function (e) {
      if (reduceMotion || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      var raw = a.getAttribute("href") || "";
      if (!raw || raw.charAt(0) === "#" || /^(tel:|mailto:|sms:|whatsapp:|javascript:)/i.test(raw)) return;
      var url;
      try { url = new URL(a.href); } catch (err) { return; }
      if (url.protocol !== window.location.protocol || url.host !== window.location.host) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      try { window.sessionStorage.setItem("mv-wipe", "1"); } catch (err2) { /* storage unavailable */ }
      html.classList.remove("wipe-in");
      html.classList.add("wipe-leave");
      window.setTimeout(function () { window.location.href = a.href; }, 120);
    });
    on(window, "pageshow", function (e) {
      if (e.persisted) html.classList.remove("wipe-leave", "wipe-in");
    });
  }

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */
  bindSiteData();
  fixLocalPageLinks();
  injectBusinessSchema();
  renderTestimonials();
  initDropdown();
  initMobileMenu();
  initAccordions();
  initCarousels();
  initRipple();
  initAnchors();
  initPageTransitions();
  onScrollFrame();
})();
