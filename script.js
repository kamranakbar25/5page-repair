/* ═══════════════════════════════════════════════════════
   QUICKFIX MOBILES — script.js
   Diagnostic Workbench OS — GSAP Animation System
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── Register GSAP plugins ────────────────────────── */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ── Global State ─────────────────────────────────── */
const IS_MOBILE        = window.innerWidth < 768;
const REDUCED_MOTION   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WHATSAPP_NUMBER  = '918340130295'; // ← Replace with real number

/* ─────────────────────────────────────────────────────
   PRELOADER
───────────────────────────────────────────────────── */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('pl-fill');
  const status    = document.getElementById('pl-status');
  const badge     = document.getElementById('pl-badge');
  const sub       = document.getElementById('pl-sub');
  const logo      = document.getElementById('pl-logo');

  if (!preloader) return;

  const messages = [
    'LOADING DIAGNOSTIC MODULES...',
    'SYNCING REPAIR DATABASE...',
    'CALIBRATING INTERFACE...',
    'MOUNTING SERVICE MANIFEST...',
    'SYSTEM READY.',
  ];

  /* Animate badge + sub in */
  gsap.to([badge, sub], {
    opacity: 1, y: 0, duration: 0.6,
    stagger: 0.15, ease: 'power2.out', delay: 0.2,
  });

  /* Logo wipe up */
  gsap.from(logo, {
    y: '100%', duration: 0.9, ease: 'expo.out', delay: 0.3,
  });

  /* Progress bar animation */
  let progress = 0;
  let msgIdx = 0;
  const DURATION = 1800; // ms total
  const TICK = 60;       // ms per tick

  const interval = setInterval(() => {
    const step = (TICK / DURATION) * 100 * (0.8 + Math.random() * 0.4);
    progress = Math.min(progress + step, 100);
    fill.style.width = progress + '%';

    const newIdx = Math.min(
      Math.floor((progress / 100) * messages.length),
      messages.length - 1
    );
    if (newIdx > msgIdx) {
      msgIdx = newIdx;
      status.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      status.textContent = 'SYSTEM READY.';
      setTimeout(revealPage, 450);
    }
  }, TICK);

  function revealPage() {
    gsap.to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete() {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        initHeroTimeline();
      },
    });
  }
}

/* ─────────────────────────────────────────────────
   HERO ANIMATION TIMELINE
───────────────────────────────────────────────── */
function initHeroTimeline() {

  /* Set initial hidden states that CSS can’t guarantee with GSAP overriding */
  gsap.set('#hero-ticket-tag', { opacity: 0, y: 12 });
  gsap.set('#hero-badge',      { opacity: 0, y: 12 });
  gsap.set('#hero-sub',        { opacity: 0, y: 20 });
  gsap.set('#hero-ctas',       { opacity: 0, y: 20 });
  gsap.set('#hero-stats',      { opacity: 0, y: 20 });
  gsap.set(['.card-ticket','.card-diag','.card-estimate','.card-queue'], { opacity: 0, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  /* Navbar slides down */
  tl.to('#navbar', { y: 0, duration: 0.8 }, 0);

  /* Ticket tag */
  tl.to('#hero-ticket-tag', { opacity: 1, y: 0, duration: 0.6 }, 0.15);

  /* Badge */
  tl.to('#hero-badge', { opacity: 1, y: 0, duration: 0.6 }, 0.2);

  /* Headline line-by-line mask reveal */
  tl.to('.h-inner', {
    y: 0,
    duration: 1.0,
    stagger: 0.09,
    ease: 'expo.out',
  }, 0.3);

  /* Sub + CTAs + Stats */
  tl.to('#hero-sub',   { opacity: 1, y: 0, duration: 0.7 }, 0.65);
  tl.to('#hero-ctas',  { opacity: 1, y: 0, duration: 0.7 }, 0.78);
  tl.to('#hero-stats', { opacity: 1, y: 0, duration: 0.7 }, 0.88);

  /* Phone SVG draw */
  if (!REDUCED_MOTION) {
    tl.call(animateSVGDraw, [], 0.4);
  }

  /* Floating cards stagger in */
  tl.to(['.card-ticket', '.card-diag', '.card-estimate', '.card-queue'], {
    opacity: 1, y: 0,
    duration: 0.8, stagger: 0.12,
    ease: 'back.out(1.2)',
  }, 0.7);

  /* Continuous float after enter */
  if (!IS_MOBILE && !REDUCED_MOTION) {
    tl.call(initFloatingCards, [], 1.2);
  }
}

/* ─────────────────────────────────────────────────────
   SVG PHONE SCHEMATIC DRAW
───────────────────────────────────────────────────── */
function animateSVGDraw() {
  const els = document.querySelectorAll('.svg-el');

  els.forEach(el => {
    /* Set initial dash state */
    el.style.strokeDasharray  = '900';
    el.style.strokeDashoffset = '900';
  });

  gsap.to(els, {
    strokeDashoffset: 0,
    duration: 1.6,
    stagger: 0.06,
    ease: 'power2.inOut',
  });

  /* Annotation dots */
  gsap.to('.svg-ann-dot', {
    opacity: 0.8,
    duration: 0.5,
    stagger: 0.15,
    delay: 0.8,
    ease: 'power2.out',
  });

  /* Labels */
  gsap.to('.ann', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.12,
    delay: 1.1,
    ease: 'power2.out',
  });
}

/* ─────────────────────────────────────────────────────
   FLOATING CARD LEVITATION
───────────────────────────────────────────────────── */
function initFloatingCards() {
  const cards = [
    { el: '#fc1', yAmp: 14, dur: 3.2 },
    { el: '#fc2', yAmp: -11, dur: 2.8 },
    { el: '#fc3', yAmp: 12, dur: 3.6 },
    { el: '#fc4', yAmp: -10, dur: 3.0 },
  ];

  cards.forEach(({ el, yAmp, dur }, i) => {
    const node = document.querySelector(el);
    if (!node) return;
    gsap.to(node, {
      y: yAmp,
      duration: dur,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.2,
    });
  });
}

/* ─────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────── */
function initCursor() {
  if (IS_MOBILE || window.matchMedia('(hover: none)').matches) return;

  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!dot || !ring || !label) return;

  /* QuickTo for smooth following */
  const moveDot  = { x: gsap.quickTo(dot,   'x', { duration: 0.08, ease: 'none' }), y: gsap.quickTo(dot,   'y', { duration: 0.08, ease: 'none' }) };
  const moveRing = { x: gsap.quickTo(ring,  'x', { duration: 0.32, ease: 'power2.out' }), y: gsap.quickTo(ring,  'y', { duration: 0.32, ease: 'power2.out' }) };
  const moveLbl  = { x: gsap.quickTo(label, 'x', { duration: 0.15, ease: 'power2.out' }), y: gsap.quickTo(label, 'y', { duration: 0.15, ease: 'power2.out' }) };

  window.addEventListener('mousemove', e => {
    moveDot.x(e.clientX);  moveDot.y(e.clientY);
    moveRing.x(e.clientX); moveRing.y(e.clientY);
    moveLbl.x(e.clientX + 18); moveLbl.y(e.clientY);
  });

  /* Interactive elements */
  document.querySelectorAll('a, button, .cl-item, .faq-q, .topt, .magnetic-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hover');
      const lbl = el.dataset.cursorLabel;
      if (lbl) {
        label.textContent = lbl;
        label.classList.add('is-visible');
      }
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hover');
      label.classList.remove('is-visible');
    });
  });
}

/* ─────────────────────────────────────────────────────
   MAGNETIC BUTTONS
───────────────────────────────────────────────────── */
function initMagnetic() {
  if (IS_MOBILE) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.28;
      const y = (e.clientY - r.top  - r.height / 2) * 0.28;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
    });
  });
}

/* ─────────────────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
───────────────────────────────────────────────────── */
function initScrollReveal() {
  if (REDUCED_MOTION) return;

  const observe = (selector, options = {}) => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || '0px' });

    els.forEach((el, i) => {
      if (options.staggerDelay) {
        el.style.transitionDelay = (i * options.staggerDelay) + 's';
      }
      io.observe(el);
    });
  };

  observe('.section-tag');
  observe('.sf-item');
  observe('.service-ticket',  { staggerDelay: 0.08 });
  observe('.journey-step',    { staggerDelay: 0.12 });
  observe('.cl-item',         { staggerDelay: 0.07 });
  observe('.faq-item',        { staggerDelay: 0.07 });
  observe('.pnote',           { staggerDelay: 0.1 });
  observe('.rcpt-line',       { staggerDelay: 0.1, threshold: 0.05 });
}

/* ─────────────────────────────────────────────────────
   NAVBAR SCROLL BEHAVIOUR
───────────────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
    lastScroll = y;
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────
   STICKY WHATSAPP CTA
───────────────────────────────────────────────────── */
function initStickyWA() {
  const wa = document.getElementById('sticky-wa');
  if (!wa) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    onEnter()    { wa.classList.add('is-visible'); },
    onLeaveBack(){ wa.classList.remove('is-visible'); },
  });
}

/* ─────────────────────────────────────────────────
   HORIZONTAL SCROLL STRIP (GSAP pin)
───────────────────────────────────────────────────── */
function initHScroll() {
  const outer   = document.querySelector('.hscroll-outer');
  const viewport = document.getElementById('hscroll-viewport');
  const track   = document.getElementById('hscroll-track');
  if (!outer || !viewport || !track) return;

  /* On mobile → just overflow scroll */
  if (IS_MOBILE) {
    viewport.style.overflowX = 'auto';
    return;
  }

  /* Desktop: proper GSAP horizontal scroll — gsap.to with scrollTrigger */
  gsap.to(track, {
    x: () => -(track.scrollWidth - viewport.offsetWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: outer,
      start: 'top top',
      end: () => '+=' + (track.scrollWidth - viewport.offsetWidth),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

/* ─────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────── */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    /* Wrap answer content for clean height animation */
    const inner = document.createElement('div');
    inner.className = 'faq-a-inner';
    inner.innerHTML = ans.innerHTML;
    ans.innerHTML = '';
    ans.appendChild(inner);

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      /* Close all */
      items.forEach(i => {
        i.classList.remove('is-open');
        const a = i.querySelector('.faq-a');
        if (a) gsap.to(a, { maxHeight: 0, duration: 0.35, ease: 'power2.in' });
        const b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      /* Open if was closed */
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        gsap.to(ans, {
          maxHeight: inner.scrollHeight + 32,
          duration: 0.45,
          ease: 'power2.out',
        });
      }
    });
  });
}

/* ─────────────────────────────────────────────────────
   CHECKLIST INTERACTION
───────────────────────────────────────────────────── */
function initChecklist() {
  document.querySelectorAll('.cl-item').forEach(item => {
    const activate = () => {
      const checked = item.classList.toggle('is-checked');
      item.setAttribute('aria-checked', checked.toString());
    };
    item.addEventListener('click', activate);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}

/* ─────────────────────────────────────────────────────
   WHATSAPP BUILDER
───────────────────────────────────────────────────── */
function initWABuilder() {
  let selDevice   = '';
  let selIssue    = '';
  let selUrgency  = '';

  /* Option selection */
  document.querySelectorAll('.topt').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.topt[data-group="${group}"]`).forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      if (group === 'device')  selDevice  = btn.dataset.value;
      if (group === 'issue')   selIssue   = btn.dataset.value;
      if (group === 'urgency') selUrgency = btn.dataset.value;
    });
  });

  /* Generate */
  const genBtn   = document.getElementById('generate-btn');
  const preview  = document.getElementById('term-preview');
  const ticketEl = document.getElementById('ticket-text');
  const sendBtn  = document.getElementById('wa-send-btn');

  if (!genBtn) return;

  genBtn.addEventListener('click', () => {
    if (!selDevice || !selIssue) {
      /* Shake */
      gsap.to(genBtn, {
        keyframes: [
          { x: -8, duration: 0.06 },
          { x:  8, duration: 0.06 },
          { x: -6, duration: 0.06 },
          { x:  6, duration: 0.06 },
          { x:  0, duration: 0.06 },
        ],
        ease: 'none',
      });
      const prev = genBtn.textContent;
      genBtn.textContent = 'Select device + issue first!';
      setTimeout(() => (genBtn.textContent = prev), 2000);
      return;
    }

    const name = (document.getElementById('user-name')?.value.trim()) || 'Customer';

    const deviceLabel = {
      smartphone: 'Smartphone',
      laptop:     'Laptop',
      tablet:     'Tablet',
      other:      'Other Device',
    }[selDevice] || selDevice;

    const issueLabel = {
      screen:      'Screen broken / cracked display',
      battery:     'Battery draining / not charging properly',
      charging:    'Charging port issue',
      software:    'Software / OS issue',
      overheating: 'Overheating',
      data:        'Data backup needed',
    }[selIssue] || selIssue;

    const urgencyLabel = {
      urgent:   '🔴 URGENT — Need it today',
      soon:     '🟡 SOON — This week',
      flexible: '⚪ FLEXIBLE — No rush',
    }[selUrgency] || 'Not specified';

    const ticketNum = `QFM-${Math.floor(Math.random() * 9000) + 1000}`;

    const message =
`🔧 *QUICKFIX MOBILES — REPAIR REQUEST*

━━━━━━━━━━━━━━━━━━━━━
*TICKET #${ticketNum}*
━━━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${name}
📱 *Device:* ${deviceLabel}
🔍 *Issue:* ${issueLabel}
⚡ *Priority:* ${urgencyLabel}

📍 *Location:* Patna, Bihar

Please share an estimate. Thank you!

_Generated via QuickFix Mobiles website_`;

    ticketEl.textContent = message;
    preview.style.display = 'block';

    gsap.from(preview, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' });

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    sendBtn.href = waUrl;
    sendBtn.style.display = 'inline-flex';

    gsap.from(sendBtn, { scale: 0.85, opacity: 0, duration: 0.4, ease: 'back.out(1.8)' });

    genBtn.textContent = '✓ Ticket Generated';
    genBtn.classList.add('is-done');
  });
}

/* ─────────────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────────────── */
function initMobileMenu() {
  const ham    = document.getElementById('hamburger');
  const menu   = document.getElementById('mobile-menu');
  if (!ham || !menu) return;

  let open = false;

  ham.addEventListener('click', () => {
    open = !open;
    ham.classList.toggle('is-open', open);
    ham.setAttribute('aria-expanded', open.toString());
    menu.setAttribute('aria-hidden', (!open).toString());

    if (open) {
      const inner = menu.querySelector('.mobile-menu-inner');
      menu.style.maxHeight = (inner?.scrollHeight ?? 400) + 'px';
    } else {
      menu.style.maxHeight = '0';
    }
  });

  /* Close on link click */
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      ham.classList.remove('is-open');
      ham.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.style.maxHeight = '0';
    });
  });
}

/* ─────────────────────────────────────────────────────
   DRAG SCROLL on horizontal strip (mobile/tablet)
───────────────────────────────────────────────────── */
function initDragScroll() {
  const viewport = document.getElementById('hscroll-viewport');
  if (!viewport || !IS_MOBILE) return;

  let isDown  = false;
  let startX  = 0;
  let scrollL = 0;

  viewport.addEventListener('mousedown',  e => { isDown = true; startX = e.pageX - viewport.offsetLeft; scrollL = viewport.scrollLeft; });
  viewport.addEventListener('mouseleave', () => { isDown = false; });
  viewport.addEventListener('mouseup',    () => { isDown = false; });
  viewport.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    viewport.scrollLeft = scrollL - (x - startX);
  });
}

/* ─────────────────────────────────────────────────────
   REDUCED MOTION — instant reveal
───────────────────────────────────────────────────── */
function revealAllImmediate() {
  /* Hide preloader instantly */
  const pre = document.getElementById('preloader');
  if (pre) pre.style.display = 'none';

  /* Show navbar */
  const nav = document.getElementById('navbar');
  if (nav) nav.style.transform = 'none';

  /* Hero text */
  document.querySelectorAll('.h-inner').forEach(el => el.style.transform = 'none');
  [
    '#hero-ticket-tag','#hero-badge','#hero-sub',
    '#hero-ctas','#hero-stats',
    '#fc1','#fc2','#fc3','#fc4',
  ].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.style.opacity = '1';
  });

  /* Section reveals */
  document.querySelectorAll(
    '.section-tag,.sf-item,.service-ticket,.journey-step,.cl-item,.faq-item,.rcpt-line'
  ).forEach(el => {
    el.style.opacity    = '1';
    el.style.transform  = 'none';
  });

  document.querySelectorAll('.svg-el').forEach(el => {
    el.style.strokeDashoffset = '0';
  });
  document.querySelectorAll('.svg-ann-dot').forEach(el => {
    el.style.opacity = '0.8';
  });
  document.querySelectorAll('.ann').forEach(el => {
    el.style.opacity = '1';
  });

  const stickyWA = document.getElementById('sticky-wa');
  if (stickyWA) stickyWA.classList.add('is-visible');
}

/* ─────────────────────────────────────────────────────
   BOOT
───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  if (REDUCED_MOTION) {
    revealAllImmediate();
    initScrollReveal(); /* still activate (already no-ops for reduced motion) */
  } else {
    initPreloader();
    initScrollReveal();
  }

  initCursor();
  initMagnetic();
  initNavbar();
  initStickyWA();
  initHScroll();
  initFAQ();
  initChecklist();
  initWABuilder();
  initMobileMenu();
  initDragScroll();

  /* Refresh ScrollTrigger on resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });

  /* Safety fallback: if JS fails to show content after 4s, force reveal */
  setTimeout(() => {
    document.querySelectorAll('.sf-item, .section-tag, .service-ticket, .journey-step').forEach(el => {
      if (window.getComputedStyle(el).opacity === '0') {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      }
    });
  }, 4000);
});
