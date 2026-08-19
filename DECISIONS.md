# Workido — Design & Engineering Decisions

This document outlines the core architecture and product decisions for **Workido** (*Part 2 — Premium Home Page*), built for the Acdyon Technologies Frontend Challenge. The objective was to create a human, practical, and visually distinctive landing page that clearly demonstrates how college students turn learned skills into paid freelance projects, verified portfolios, and career proof.

## 1. Why This Approach

*(Note: Adapted from the Part 1 scraper ingestion question to the primary frontend and product design strategy for Part 2.)*

Instead of building a conventional marketing landing page with stock photography, abstract illustrations, and exaggerated claims, I chose a **product-first, interactive demonstration model built with vanilla HTML, CSS, and JavaScript**.

The obvious alternative was using a modern framework (like Next.js with Tailwind) paired with static screenshot mockups. I rejected that alternative for two deliberate reasons:
1. **Zero runtime bloat & instant responsiveness:** Pure browser-native code (CSS Grid/Flexbox and `IntersectionObserver`) yields sub-second load times, smooth 60fps transitions, and zero build dependency overhead.
2. **Product demonstration over marketing claims:** Students and founders evaluate platforms on utility, not buzzwords. The live DOM-rendered console in the hero, the switchable 4-stage transformation engine (*Learn → Work → Earn → Grow*), and the realistic project discovery cards with INR (₹) milestone budgets communicate how Workido actually works far more effectively than static illustrations.

I intentionally avoided fake social proof, fabricated student counts, or fake company logos. The product interface itself proves the two-sided marketplace value. The layout was built mobile-first and tested from **390px mobile** (stacked cards, off-canvas drawer) up to **1440px desktop** without horizontal overflow.

## 2. Trade-Off Under the Time Limit

**The Trade-Off:** I prioritized polishing the frontend craft, typographic hierarchy, responsive layout, and client-side interactive state simulation over building a partial full-stack backend. All demo data is held in a clean, structured client store (`data.js`).

Under the challenge's time constraint, delivering an intuitive, accessible, and complete landing page experience was far more valuable than a half-implemented CRUD database.

**What I would build with a real week:**
- **Authentication & College Verification:** Student login supporting `.edu`/university email verification and GitHub/portfolio linking.
- **Backend API & Database:** A Node.js/PostgreSQL backend with REST endpoints for live project posting, proposal submissions, and filter indexing.
- **Milestone Escrow Integration:** Sandbox payment integration (e.g. Razorpay Route or Stripe Connect) to hold funds in escrow until milestone deliverables are signed off.
- **Direct Messaging:** An in-app messaging drawer for scope clarification and deliverable handoffs.

## 3. AI Usage and Personal Verification

I used AI as an exploratory tool to brainstorm section structures, generate initial boilerplate scaffolding, and test copy variations for the student career progression storyline.

**What I personally verified, tuned, and changed:**
- **Eliminated AI visual clichés:** I removed all generic AI trends (purple/neon gradients, floating blobs, sparkles, holographic glassmorphism) and established a grounded palette: warm off-white canvas (`#F7F6F2`), deep charcoal text (`#151515`), and a career-oriented emerald accent (`#185E42`).
- **Responsive layout & spacing:** I manually refined CSS breakpoints (390px, 768px, 1024px, 1200px) to ensure clean card wrapping, touch-target sizing, and zero layout shifting.
- **Interaction & accessibility:** I verified that modal dialogs handle keyboard traps and `Escape` dismissals cleanly, focus outlines remain visible, and all transitions respect `prefers-reduced-motion`.
- **Copy and content integrity:** I audited every section to ensure realistic, student-appropriate milestone scopes without hype or unsubstantiated metrics.
