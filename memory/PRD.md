# PRD — Jucăuș Magazine

## Original problem statement
User (Romanian): "fa un site interactiv". Clarified: Blog/content site, scroll & hover animations, theme chosen by designer, frontend-only interactive (no auth/payments), colorful & playful style.

## Product
"Jucăuș" — an Awwwards-level, colorful & playful editorial magazine about visual culture (art, fashion, architecture, design). Neo-brutalist pop art direction with kinetic motion.

## Architecture
- **Backend**: FastAPI + MongoDB (motor). Routes under `/api`: `GET /posts` (+category/featured filters), `GET /categories`, `GET /posts/{slug}`, `POST /newsletter`. Seeds 6 posts on startup.
- **Frontend**: React 19, react-router (`/` and `/articol/:slug`), framer-motion (reveals, parallax, masked hero), Lenis smooth scroll, react-fast-marquee, sonner toasts, Tailwind. Fonts: Clash Display / Satoshi / Cabinet Grotesk.

## User personas
- Curious readers of culture/design content.
- Visitors wanting an inspiring, interactive browsing experience.

## Core requirements (static)
- Interactive animated blog, colorful & playful, frontend-only interactivity, no auth.

## Implemented (2026-06)
- Kinetic hero with masked line-by-line reveal + parallax floating images.
- Editorial marquee, category-filterable article grid (tetris layout), manifesto chapters with giant parallax numbers, rubrici section, neo-brutalist newsletter form, footer.
- Single article view: full-bleed cover, drop cap, quote blocks, reading progress bar, related posts.
- Backend posts API + newsletter subscribe. Verified 100% by testing agent (backend 9/9, frontend all flows).

## Backlog (P1/P2)
- P1: Search across articles; individual author pages.
- P2: Pagination for posts; dark-mode toggle; article social share; bookmark/save.
- P2: Admin/CMS to author posts; tighten CORS for production.

## Next tasks
- Optional enhancements above; currently MVP complete and verified.
