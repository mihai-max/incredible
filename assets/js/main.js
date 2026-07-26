/* =========================================================
   incredible.website — interactions
   Vanilla JS, no dependencies. Everything degrades gracefully:
   with JS off you still get the full page, just without the
   reveal animations and client-side form validation.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------
     Footer year
     ------------------------------------------------------ */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------
     Nav — condense on scroll
     ------------------------------------------------------ */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------
     Mobile menu
     ------------------------------------------------------ */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobile-menu");

  var setMenu = function (open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  };

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  // Close the mobile menu if the viewport grows into desktop layout.
  window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  /* ------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------ */
  var revealables = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ------------------------------------------------------
     Scrollspy — highlight the section you're reading
     ------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------------------------------------
     Hero parallax — the dunes drift slightly slower than
     the page. Skipped entirely for reduced-motion users.
     ------------------------------------------------------ */
  var scene = document.querySelector(".hero__scene");

  if (scene && !reduceMotion) {
    var ticking = false;

    var parallax = function () {
      var offset = Math.min(window.scrollY, window.innerHeight) * 0.18;
      scene.style.transform = "translate3d(0," + offset + "px,0)";
      ticking = false;
    };

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(parallax);
    }, { passive: true });
  }

  /* ------------------------------------------------------
     Contact form
     No backend here — the form validates, then hands off to
     the visitor's mail client. Swap the handler for a POST
     to Formspree / Basin / your own endpoint when ready.
     ------------------------------------------------------ */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var STUDIO_EMAIL = "hello@incredible.website";

  if (form) {
    var isEmail = function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); };

    var invalidate = function (field, bad) {
      field.setAttribute("aria-invalid", String(bad));
    };

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") invalidate(e.target, false);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var brief = form.elements.brief;
      var budget = form.elements.budget;

      var missing = [];
      var malformed = [];

      if (!name.value.trim()) { invalidate(name, true); missing.push(name); }
      if (!brief.value.trim()) { invalidate(brief, true); missing.push(brief); }

      if (!email.value.trim()) {
        invalidate(email, true);
        missing.push(email);
      } else if (!isEmail(email.value.trim())) {
        invalidate(email, true);
        malformed.push(email);
      }

      if (missing.length || malformed.length) {
        status.textContent = missing.length
          ? "Please fill in the highlighted fields."
          : "That email address doesn't look right.";
        (missing[0] || malformed[0]).focus();
        return;
      }

      var subject = "New project enquiry — " + name.value.trim();
      var body =
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n" +
        "Budget: " + budget.value + "\n\n" +
        brief.value.trim();

      window.location.href =
        "mailto:" + STUDIO_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent = "Opening your email client — send it and we'll reply within a day.";
      form.reset();
    });
  }
})();
