/* ============================================================
   SCRIPT.JS — Premium Portfolio 2026
   GSAP · ScrollTrigger · Lenis · Custom Cursor · Loader
   ============================================================ */

"use strict";

/* ============================================================
   1. LOADER
   ============================================================ */
(function initLoader() {
  const loader     = document.getElementById("loader");
  const fill       = document.querySelector(".loader-fill");
  const pct        = document.querySelector(".loader-pct");
  const logo       = document.querySelector(".loader-logo");

  let progress = 0;
  const target = 100;

  // Animate logo letters in
  gsap.fromTo(logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

  const ticker = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress >= target) {
      progress = target;
      clearInterval(ticker);
      setTimeout(dismissLoader, 350);
    }
    fill.style.width = progress + "%";
    pct.textContent  = Math.round(progress) + "%";
  }, 60);

  function dismissLoader() {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = "none";
        initAll();
      }
    });
  }
})();

/* ============================================================
   2. MAIN INIT — called after loader
   ============================================================ */
function initAll() {
  initLenis();
  initCursor();
  initMouseGlow();
  initNavbar();
  initHeroAnimations();
  initScrollAnimations();
  initCounters();
  initMagneticButtons();
  initBackToTop();
  initContactForm();
  initActiveNav();
}

/* ============================================================
   3. LENIS SMOOTH SCROLL
   ============================================================ */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
  });

  // GSAP ScrollTrigger integration
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ============================================================
   4. CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const dot  = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display  = "none";
    ring.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

;

  // Smooth ring follow
  function followRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px, ${ringY - ring.offsetHeight / 2}px)`;
    requestAnimationFrame(followRing);
  }
  followRing();

  // Hover states
  const hoverTargets = document.querySelectorAll(
    "a, button, .skill-card, .service-card, .project-card, .testimonial-card, .magnetic-btn, input, textarea"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
  });

  document.addEventListener("mousedown", () => ring.classList.add("cursor-click"));
  document.addEventListener("mouseup",   () => ring.classList.remove("cursor-click"));
}

/* ============================================================
   5. MOUSE GLOW EFFECT
   ============================================================ */
function initMouseGlow() {
  const glow = document.getElementById("mouse-glow");
  let glowX = 0, glowY = 0;

  document.addEventListener("mousemove", (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
    gsap.to(glow, {
      x: glowX,
      y: glowY,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}

/* ============================================================
   6. NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById("mainNav");

  ScrollTrigger.create({
    start: "top -80px",
    onEnter:      () => nav.classList.add("scrolled"),
    onLeaveBack:  () => nav.classList.remove("scrolled"),
  });

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("navbarNav");
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}

/* ============================================================
   7. ACTIVE NAV LINK
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: () => {
      let current = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ============================================================
   8. HERO ANIMATIONS
   ============================================================ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Lines stagger in
  const lines = document.querySelectorAll(".hero-title .line");
  tl.fromTo(lines,
    { y: "110%", opacity: 0 },
    { y: "0%",   opacity: 1, duration: 1.1, stagger: 0.14 }
  );

  // Badge
  tl.to("#availBadge", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");

  // Subtitle
  tl.fromTo("#heroSub",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8 },
    "-=0.4"
  );

  // CTA
  tl.fromTo("#heroCta",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7 },
    "-=0.3"
  );

  // Stats
  tl.fromTo("#heroStats",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7 },
    "-=0.2"
  );

  // Blobs gentle rotation
  gsap.to(".blob-1", {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%",
  });
}

/* ============================================================
   9. SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ============================================================ */
function initScrollAnimations() {
  // Generic fade-up
  document.querySelectorAll("[data-gsap='fade-up']").forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0);
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // Fade-right
  document.querySelectorAll("[data-gsap='fade-right']").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -70 },
      {
        opacity: 1, x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // Fade-left
  document.querySelectorAll("[data-gsap='fade-left']").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 70 },
      {
        opacity: 1, x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // Skill cards stagger
  const skillCards = document.querySelectorAll(".skill-card");
  if (skillCards.length) {
    gsap.fromTo(skillCards,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: skillCards[0].closest(".row"),
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }

  // Bento grid stagger
  const bentoCards = document.querySelectorAll(".bento-card");
  if (bentoCards.length) {
    gsap.fromTo(bentoCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }

  // Service cards stagger
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length) {
    gsap.fromTo(serviceCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: serviceCards[0].closest(".row"),
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }

  // Timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, i) => {
    const dir = i % 2 === 0 ? -50 : 50;
    gsap.fromTo(item,
      { opacity: 0, x: dir },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // Testimonials stagger
  const testiCards = document.querySelectorAll(".testimonial-card");
  if (testiCards.length) {
    gsap.fromTo(testiCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testiCards[0].closest(".row"),
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }

  // About avatar
  const avatarWrap = document.querySelector(".about-avatar-wrap");
  if (avatarWrap) {
    gsap.fromTo(avatarWrap,
      { opacity: 0, scale: 0.88, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: avatarWrap,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }

  // Contact form & info
  const contactInfo = document.querySelector(".contact-info");
  const contactForm = document.querySelector(".contact-form");
  if (contactInfo && contactForm) {
    gsap.fromTo(contactInfo,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contactInfo, start: "top 85%", toggleActions: "play none none none" }
      }
    );
    gsap.fromTo(contactForm,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contactForm, start: "top 85%", toggleActions: "play none none none" }
      }
    );
  }

  // Footer
  const footer = document.querySelector(".site-footer");
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 95%", toggleActions: "play none none none" }
      }
    );
  }
}

/* ============================================================
   10. COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-count]");
  if (!counters.length) return;

  ScrollTrigger.create({
    trigger: "#heroStats",
    start: "top 85%",
    once: true,
    onEnter: () => {
      counters.forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        gsap.fromTo(el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].textContent);
            }
          }
        );
      });
    }
  });
}

/* ============================================================
   11. MAGNETIC BUTTONS
   ============================================================ */
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const magnets = document.querySelectorAll(".magnetic-btn");

  magnets.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.35;
      const dy     = (e.clientY - cy) * 0.35;

      gsap.to(btn, {
        x: dx, y: dy,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
}

/* ============================================================
   12. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  ScrollTrigger.create({
    start: "top -300px",
    onEnter:     () => btn.classList.add("visible"),
    onLeaveBack: () => btn.classList.remove("visible"),
  });

  btn.addEventListener("click", () => {
    lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  });
}

/* ============================================================
   13. CONTACT FORM
   ============================================================ */
function initContactForm() {
  const sendBtn = document.getElementById("sendBtn");
  if (!sendBtn) return;

  sendBtn.addEventListener("click", () => {
    const fname   = document.getElementById("fname").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fname || !email || !message) {
      // Shake animation
      gsap.fromTo(sendBtn,
        { x: 0 },
        { x: [-8, 8, -6, 6, -3, 3, 0], duration: 0.5, ease: "none" }
      );
      sendBtn.textContent = "Fill in required fields";
      sendBtn.style.background = "linear-gradient(135deg, #991b1b, #dc2626)";
      setTimeout(() => {
        sendBtn.innerHTML = 'Send Message <i class="bi bi-send ms-2"></i>';
        sendBtn.style.background = "";
      }, 2000);
      return;
    }

    // Success state
    sendBtn.innerHTML = '<i class="bi bi-check2 me-2"></i> Message Sent!';
    sendBtn.style.background = "linear-gradient(135deg, #065f46, #10b981)";
    sendBtn.style.boxShadow  = "0 0 30px rgba(16,185,129,0.4)";

    gsap.fromTo(sendBtn,
      { scale: 0.96 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );

    setTimeout(() => {
      sendBtn.innerHTML = 'Send Message <i class="bi bi-send ms-2"></i>';
      sendBtn.style.background = "";
      sendBtn.style.boxShadow  = "";
      ["fname","lname","email","subject","message"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
    }, 3500);
  });
}

/* ============================================================
   14. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = anchor.getAttribute("href");
    if (target === "#") return;
    const el = document.querySelector(target);
    if (!el) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.3 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ============================================================
   15. SECTION TITLE HIGHLIGHT REVEAL
   ============================================================ */
document.querySelectorAll(".section-title").forEach((title) => {
  ScrollTrigger.create({
    trigger: title,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );
    }
  });
});

/* ============================================================
   16. HORIZONTAL SCROLL — floating chip parallax
   ============================================================ */
gsap.to(".chip-1", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: "#about",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  }
});
gsap.to(".chip-2", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: "#about",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  }
});

/* ============================================================
   17. PAGE REVEAL ON LOAD
   ============================================================ */
window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
