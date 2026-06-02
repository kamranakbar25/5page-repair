# QuickFix Mobiles — Demo Website

**5Page Demo** · Award-winning interactive website for mobile, laptop and electronics repair shops.

---

## 🔧 What This Is

A high-quality demo website built for **QuickFix Mobiles**, a mobile/laptop repair service in Patna, Bihar. This is a **5Page demo** — a productized web design package for local Indian service businesses.

---

## ✨ Design Direction: "Diagnostic Workbench OS"

A fusion of three creative directions:
- **Thermal Terminal** — repair tickets, monospace typography, electric green + thermal yellow
- **Technician's Workbench** — SVG phone schematic that draws itself, blueprint annotation style
- **Service OS** — OS window chrome, terminal dialog UI, pipeline progress interface

### What makes it unique:
- No glassmorphism, no generic SaaS gradients, no repeated 3-column feature grids
- Physical-world repair metaphors: perforated thermal tickets, OS terminal chrome, blueprint annotations
- Matte graphite dark mode with electric green + thermal yellow accents only
- Every section feels like part of a real repair management system

---

## 🎬 Animations Included

| Animation | Implementation |
|---|---|
| Fast tech preloader | Terminal boot with progress bar |
| Hero timeline | GSAP staggered line-mask reveal |
| SVG phone schematic | stroke-dashoffset draw animation |
| Blueprint annotations | Staggered opacity reveals |
| Floating status cards | Continuous sine-wave levitation |
| Service ticket stagger | IntersectionObserver + CSS transitions |
| Horizontal service strip | GSAP ScrollTrigger pin + scrub |
| Repair journey pipeline | Staggered scroll reveals |
| Thermal receipt print | Staggered line-by-line fade |
| Custom cursor | GSAP quickTo with label states |
| Magnetic buttons | Mouse-offset attraction + elastic release |
| WhatsApp diagnosis builder | Terminal dialog with ticket generation |
| FAQ accordion | GSAP maxHeight animation |
| Sticky WhatsApp CTA | ScrollTrigger visibility toggle |
| Reduced motion | Full support via `prefers-reduced-motion` |

---

## 📂 File Structure

```
quickfix-mobiles/
├── index.html    ← Complete HTML (all 12 sections)
├── style.css     ← Custom CSS design system
├── script.js     ← GSAP animation engine
└── README.md     ← This file
```

---

## 🚀 Sections

1. **Preloader** — "QuickFix Mobiles · Repair • Diagnose • Restore"
2. **Navbar** — Sticky + blur, mobile-responsive, WhatsApp CTA
3. **Hero** — Asymmetric composition with SVG phone + 4 floating cards
4. **Trust Strip** — Infinite marquee ticker
5. **Services** — 6 thermal service tickets with perforated edges + barcodes
6. **Horizontal Strip** — 8-card GSAP-pinned horizontal scroll
7. **Diagnosis Journey** — 5-stage alternating pipeline
8. **Pricing** — Cream thermal receipt with print animation
9. **Issue Checklist** — Interactive toggle checklist
10. **WhatsApp Builder** — Terminal-style diagnosis ticket generator
11. **FAQ** — GSAP accordion
12. **Final CTA** — Cinematic stamp with oversized background type
13. **Footer** — Receipt-style with 5Page demo badge

---

## ⚙️ Tech Stack

- **HTML5** — Semantic, SEO-ready, ARIA labels
- **Tailwind CSS v3** — via CDN, custom color/font config
- **Custom CSS** — Full design system in `style.css`
- **GSAP 3.12** — ScrollTrigger, TextPlugin
- **IntersectionObserver** — Scroll reveals (no heavy scroll-jacking)
- **Vanilla JS** — No frameworks, no backend

---

## 🌐 Deploy on Netlify

1. Drag-and-drop this folder into [app.netlify.com](https://app.netlify.com)
2. Or push to GitHub → connect repo in Netlify

No build step. No dependencies to install. Pure static files.

---

## 🔧 Before Going Live

1. **Replace WhatsApp number** in `script.js` line 13:
   ```js
   const WHATSAPP_NUMBER = '919100000000'; // ← Replace with real number
   ```
   Format: country code (91 for India) + 10-digit number, no spaces or +

2. **Update business details** in `index.html`:
   - Address in the footer
   - Hours of operation
   - Any other contact info

3. **Remove the demo badge** from footer if making it live for a real client.

---

## 📱 Mobile

- Full responsive layout (mobile-first breakpoints)
- Floating hero cards hidden on mobile for clean layout
- Custom cursor disabled on touch devices
- Horizontal scroll becomes touch-scrollable on mobile
- Magnetic buttons disabled on mobile
- Hamburger menu with smooth animation

---

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support on checklist items
- `prefers-reduced-motion` fully respected — all animations disabled, content instantly visible
- Semantic HTML throughout (nav, section, article, footer, role attributes)
- Screen reader safe (aria-hidden on decorative elements)

---

## 📝 License

**5Page Demo** — Built to show repair shop owners what a professional website looks like.
Not for redistribution. Customize and deploy for real clients with a 5Page license.

---

*Built with ❤️ by [5Page](https://5page.in) — Web design for local businesses*
