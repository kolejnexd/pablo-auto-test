# CODEX MASTER PROMPT — Pablo e.U. Blog (SEO 2025/2026 + AI Search + UX + Internal Linking)
You are an elite production engineer (Next.js App Router + Tailwind + Contentlayer2/MDX) and a Technical SEO strategist for 2025/2026. Execute without commentary. Implement, verify, commit.

## PROJECT FACTS (DO NOT CHANGE)
- Framework: Next.js App Router
- Styling: Tailwind
- Content: MDX + Contentlayer2
- Locales: DE default `/`, PL `/pl`, EN `/en`
- Domain: https://pablo-auto.at
- Blog routes already exist:
  - /blog, /blog/[category], /blog/[category]/[slug]
  - /pl/blog/...
  - /en/blog/...
- Existing components/utilities:
  - components: MDXContent.tsx, RelatedPosts.tsx, PostCard.tsx, MobileStickyBar.tsx, JsonLd.tsx
  - lib/seo/*, lib/blog/*, app/sitemap.ts, lib/routes.ts
- Phone CTA: +43 664 1261735
- Business: Pablo e.U. Autohandel & Abschleppdienst (Sollenau / Wiener Neustadt / A2)

## PRIMARY GOAL
Turn the blog into the core of Topical Authority and outrank competitors:
- Perfect technical SEO: canonical + hreflang + metadata + schema (BlogPosting + FAQPage + BreadcrumbList)
- Strong internal linking architecture sitewide
- UX layout that boosts trust/EEAT and AI Search extraction (Key Takeaways, tables, FAQ)
- Zero sitemap duplicates + valid RSS feeds per locale
- Clean codebase: remove unused stuff, fix warnings that affect build

## REQUIRED BLOG SEO (METADATA)
Use these as defaults for DE blog index; localize for PL/EN equivalents.
- Meta Title (DE): Mobilitäts-Ratgeber Pablo e.U. | Abschleppdienst & Autohandel Blog
- Meta Description (DE): Experten-Tipps zu Pannenhilfe auf der A2, Gebrauchtwagenkauf in Niederösterreich und Fahrzeugankauf. Ihr Partner für Mobilität in Sollenau.
- URL structure: https://pablo-auto.at/blog/... (NO /de prefix)
- PL: https://pablo-auto.at/pl/blog/...
- EN: https://pablo-auto.at/en/blog/...

## STRATEGIC TOPIC CLUSTERS (CATEGORIES) — MUST MATCH ROUTES + CONTENTLAYER
DE clusters (slugs):
1) pannenhilfe (24/7 Abschlepp- & Pannenhilfe-Ratgeber)
2) ratgeber-kauf (Gebrauchtwagen-Markt & Trends)
3) autoankauf (Autoankauf & Wertermittlung)
4) mobilitaet (Mobilität & Mietwagen)
5) logistik-recht (Logistik & Grenzüberschreitendes AT-PL)

PL clusters (slugs):
1) pomoc-drogowa
2) poradnik-kupujacy
3) sprzedaz-skup
4) wynajem-mobilnosc
5) logistyka-przepisy

EN clusters (slugs):
1) roadside-assistance
2) buying-guide
3) car-selling
4) mobility-rental
5) logistics-law

Create/maintain a single source-of-truth mapping object (e.g., lib/blog/config.ts) with:
- label per locale
- slug per locale
- which service page each cluster must link to (internal linking “money pages”)

## UX/UI SPEC (BLOG PAGES) — MUST IMPLEMENT
### 1) Blog Index / Archive Page
- Add a fast search input (client-side filter) for posts by title/excerpt/tags
- Featured Post section (full width) for “isFeatured” post; if none, newest post
- Grid of cards: rounded-xl + subtle shadow (shadow-soft) consistent with site
- Each card shows:
  - language badge (DE/PL/EN)
  - cluster badge
  - title, excerpt, date, image

### 2) Post Page (EEAT + SGE)
- Author Box:
  - DE: “Geschrieben von Paweł Bogusław Ferdynus – Experte für Mobilität seit 2018”
  - PL/EN localized equivalents
- Key Takeaways block near the top (“Zusammenfassung / Najważniejsze / Key takeaways”)
  - Extract from MDX frontmatter if present (takeaways array); fallback to auto summary stub
- FAQ section at bottom (rendered + JSON-LD FAQPage if exists)
- Sticky CTA (mobile):
  - DE: “24/7 Notruf wählen”
  - PL: “Zadzwoń 24/7”
  - EN: “Call 24/7”
  - tel:+436641261735
- Related posts at end (same cluster/locale)

## INTERNAL LINKING ARCHITECTURE — MUST IMPLEMENT SITEWIDE
Add blog entry points everywhere:

1) Header:
- Add nav item:
  - DE: “Ratgeber”
  - PL: “Poradnik”
  - EN: “Guides”
- Link to localized blog index

2) Homepage:
- Add “Aktuelle Tipps / Aktualne porady / Latest guides” section:
  - 3 newest posts for current locale
  - cards with subtle shadow
  - CTA to blog index
- Place under car offers or before “Why us” section (pick best existing section location)

3) Service pages contextual box:
Add a reusable component (e.g., components/blog/BlogTeaserBox.tsx) and insert:
- Abschleppdienst pages: show 1–3 posts from roadside assistance cluster
- Autohandel pages: show 1–3 posts from buying/selling clusters
- Vermietung pages: show 1–3 posts from mobility-rental cluster
- Transport/Logistik pages: show 1–3 posts from logistics cluster

4) Footer:
Add “Warto wiedzieć / Wissen / Useful” column:
- link to blog index
- link to top 3 cluster hubs (locale-aware)

5) 404 page:
Instead of plain 404, show:
- quick links + 3 newest/popular posts (locale-aware)
- link to blog index and clusters

6) Optional conversion placements:
After demonstrate: add blog link on contact form success/confirmation area:
“Während Sie warten: Lesen Sie unseren Ratgeber” (localized)

## TECHNICAL SEO — MUST IMPLEMENT
### Canonical + hreflang
For every page type (index/category/post):
- generateMetadata returns absolute canonical (https://pablo-auto.at/...)
- alternates.languages includes: de, pl, en, x-default
- x-default -> DE canonical
- NO incorrect /de prefix

### OpenGraph/Twitter
- Posts: openGraph type “article”
- Use post image else /og-image.png
- twitter card summary_large_image

### JSON-LD schema
For post page include (no duplicates):
- BlogPosting
- BreadcrumbList
- FAQPage when FAQ exists
Include Organization publisher for Pablo e.U.
Add address/service area in Organization/LocalBusiness schema if already available in lib/siteConfig.ts; reuse it.

### Sitemap & duplicates
- Update app/sitemap.ts
- Ensure it includes:
  - main pages (DE/PL/EN)
  - service pages
  - vehicles pages
  - blog index/category/post pages for all locales
- MUST dedupe by URL at the end (Set / map)
- Ensure no duplicates like repeated /autohandel-gebrauchtwagen etc.

### RSS feeds
- Ensure /blog/rss.xml, /pl/blog/rss.xml, /en/blog/rss.xml are valid XML
- Only that locale’s posts
- Use canonical URLs
- Include correct language code and lastBuildDate

## CONTENTLAYER / MDX MODEL — MUST BE ROBUST
Standardize frontmatter fields:
- title (required)
- excerpt (required)
- date (required)
- lastModified (optional)
- heroImage (optional)
- locale (enum de/pl/en)
- category (enum per locale mapping)
- tags (optional)
- takeaways (optional string[])
- faq (optional array of FAQItem { question, answer })
Fix any Contentlayer nested type issues:
- Ensure FAQItem is properly defined and used (no “undefined” type errors)
- If any MDX has wrong frontmatter, fix MDX too

## “MISSING ELEMENTS” — ADD THESE
Add a localized mini FAQ (site-level) somewhere relevant (blog index footer or sidebar) answering:
1) DE/PL/EN: Where is the HQ in Sollenau? (Use data from lib/siteConfig.ts)
2) Payment forms after service (cash/card/transfer if known; if unknown: add neutral “cash and common cards” only if already used elsewhere; otherwise add “ask driver”)
3) Supported languages (DE/PL/EN)
4) What exactly covers 24/7 assistance on A2 (towing, jump start, tire change, transport) — align with existing service content

## CLEANUP / QUALITY
- Remove unused files/components/utilities introduced during blog work
- Fix broken image reference: /images/blog/a2-laweta.webp 404 (either add the file in public/images/blog/ or update MDX to a valid existing image)
- Fix runtime/dev warnings that affect build quality:
  - If framer-motion complains about missing dependency (@emotion/is-prop-valid), add dependency OR refactor to remove that import path usage. Ensure build passes.
- Run: npm run build — must pass
- Run: npm run lint — fix critical issues if present

## OUTPUT REQUIREMENTS
1) Implement everything above in code.
2) Add a concise verification doc: BLOG_AUDIT.md
   - commands to run
   - URLs to check (index/category/post per locale)
   - how to verify canonical/hreflang (view-source)
   - how to validate schema (Rich Results Test / Schema validator)
3) Commit with message:
   feat(blog): SEO hardening + UX + internal linking + sitemap/rss cleanup

## IMPLEMENTATION ORDER (DO NOT SKIP)
1) Fix sitemap duplicates + include blog URLs
2) Canonical/hreflang for blog index/category/post
3) Schema (BlogPosting + BreadcrumbList + FAQPage)
4) Blog UX layout (index + post enhancements)
5) Internal linking placements (header/home/service/footer/404)
6) Fix images + dependencies (404 and framer-motion warning)
7) Final build + smoke test

GO.
