# PLAN.md — Upgrade projektu do Next.js 16 + FULL LATEST (Vercel-first)

Projekt: pablo-auto (Next.js App Router)  
Cel: pełny upgrade do Next.js 16 + maksymalna kompatybilność z Vercel i Turbopack + stabilne SEO (canonical/hreflang per-strona) + testy E2E SEO.

---

## 0) Założenia i dlaczego ta ścieżka

### Dlaczego wywalamy Contentlayer2?
- Next.js 16 używa Turbopack jako domyślnego bundlera i Webpack-owe pluginy/ścieżki potrafią się gryźć.
- Istnieją realne zgłoszenia problemów Contentlayer2 z Turbopack (import alias / contentlayer/generated) :contentReference[oaicite:3]{index=3}.
**Decyzja:** usuwamy `contentlayer2` i `next-contentlayer2` i przechodzimy na rozwiązanie, które nie wymaga Webpack integracji.

### Co zamiast Contentlayer2?
**Velite** — type-safe content pipeline (MD/MDX → wygenerowane moduły TS) + integracja z Next bez pluginu Webpack (rozwiązanie pod Turbopack) :contentReference[oaicite:4]{index=4}.

### Największe ryzyko upgrade’u (i jak je neutralizujemy)
1) **Async Request APIs** (cookies/headers itd.) → naprawiamy codemodem Next (Next 16) :contentReference[oaicite:5]{index=5}.  
2) **middleware.ts → proxy.ts** (nowa konwencja) → migrujemy (codemod / ręcznie) :contentReference[oaicite:6]{index=6}.  
3) **Linting**: `next lint` jest usunięte w Next 16 → przechodzimy na Biome (nowocześnie, szybko, prosto) :contentReference[oaicite:7]{index=7}.

---

## 1) Target: wersje i runtime

### Runtime (Vercel)
- Ustaw Node.js **24.x** w Vercel (Settings → Build & Deployment → Node.js Version) :contentReference[oaicite:8]{index=8}.
- Node 24 jest GA na Vercel dla buildów i functions :contentReference[oaicite:9]{index=9}.

### Next.js / React
- Next.js: **^16.x** (np. najnowszy 16.1.x na moment wdrożenia)
- React: **^19.x**
- TypeScript: najnowszy stable (≥ wymagań Next) :contentReference[oaicite:10]{index=10}.
- `@types/react` i `@types/react-dom` muszą być w wersji zgodnej z React 19 (np. 19.x) :contentReference[oaicite:11]{index=11}.

---

## 2) Branch, snapshot i zasady bezpieczeństwa

1) Utwórz branch:
   - `git checkout -b chore/upgrade-next16-full-latest`

2) Snapshot obecnego stanu:
   - `npm ci`
   - `npm run build`
   - `npm run typecheck`
   - `npm run validate:blog`

3) Na czas migracji blokujemy regresje:
   - dodamy E2E testy Playwright (SEO + routing).

---

## 3) Zmiany w package.json (FULL LATEST)

### 3.1 Usuń (wywalamy)
- `contentlayer2`
- `next-contentlayer2`
- `eslint`
- `eslint-config-next`
- (opcjonalnie) wszystko, co było specyficzne pod Contentlayer (jeśli nieużywane)

Powód: Contentlayer↔Turbopack tarcia :contentReference[oaicite:12]{index=12}, `next lint` usunięte w Next 16 :contentReference[oaicite:13]{index=13}.

### 3.2 Dodaj
- `velite` + `zod` (schematy treści)
- `@biomejs/biome` (lint/format)
- `@playwright/test` (E2E)
- (opcjonalnie) `depcheck` do czyszczenia nieużywanych paczek

### 3.3 Update kluczowych
- `next` → ^16.x :contentReference[oaicite:14]{index=14}  
- `react`, `react-dom` → ^19.x
- `tailwindcss` → v4 (z migracją configu; patrz sekcja 7) :contentReference[oaicite:15]{index=15}

### 3.4 Skrypty (docelowo)
- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `typecheck`: `tsc --noEmit`
- `lint`: `biome check .`
- `format`: `biome format . --write`
- `test:e2e`: `playwright test`
- `validate:blog`: zostaje

Uwaga: `next lint` nie istnieje w Next 16 :contentReference[oaicite:16]{index=16}.

---

## 4) Upgrade Next.js → 16 (codemods)

1) Upgrade Next:
   - `npx @next/codemod@latest upgrade latest` :contentReference[oaicite:17]{index=17}

2) Async Request APIs codemod:
   - `npx @next/codemod@latest next-async-request-api .` :contentReference[oaicite:18]{index=18}
   Cel: automatycznie dodać `await` tam, gdzie Next 16 tego wymaga (cookies/headers itd.).

3) Proxy (migracja middleware):
   - jeśli w repo jest `middleware.ts`, migrujemy do `proxy.ts` (nowa konwencja) :contentReference[oaicite:19]{index=19}
   - ręcznie: przenieś logikę 1:1, zachowaj matcher.

4) Build test:
   - `npm run build`
   - `npm run typecheck`

---

## 5) Migracja treści: Contentlayer → Velite (MDX pipeline zgodny z Turbopack)

### 5.1 Usuń Contentlayer
- Usuń pliki: `contentlayer.config.ts`
- Usuń integrację z `next.config.mjs`:
  - usuń `withContentlayer(...)`
  - usuń import `next-contentlayer2`

### 5.2 Dodaj Velite
1) Dodaj `velite.config.ts` (lub `velite.config.js`) opisujący kolekcję bloga:
   - źródło: `content/blog/**`
   - locale: z folderu (`de|pl|en`)
   - category: z podfolderu (np. `pannenhilfe`, `pomoc-drogowa`) jeśli występuje
   - slug: z nazwy pliku
   - url: mapowanie:
     - DE: `/ratgeber/[slug]`
     - PL: `/pl/poradnik/[slug]`
     - EN: `/en/guides/[slug]`

2) Wymuś unikalność slugów w obrębie locale:
   - jeśli masz duplikaty jak `awaria-a2.mdx` w dwóch miejscach, pipeline ma wywalić błąd (fail build).

3) Integracja z Next (bez Webpack pluginu):
   - użyj metody “Start Velite with Next.js Config” (top-level await w next.config) — jest to wprost zaprojektowane pod Turbopack :contentReference[oaicite:20]{index=20}.

### 5.3 Rendering MDX
Velite wspiera MDX i generuje skompilowany kod (MDX → JSX) :contentReference[oaicite:21]{index=21}.

Docelowo:
- Zmieniamy `components/mdx/MDXRenderer.tsx` tak, aby renderował kod z Velite (podobnie jak `useMDXComponent(code)` — wykonanie kodu po stronie serwera).
- Zachowujemy Twoje custom komponenty MDX (Link/Image/Callouts itd.).

---

## 6) Routing & “Semantic Localized URLs” — sanity check po upgrade

Twoja struktura już wygląda dobrze:
- DE: `/ratgeber/...`
- PL: `/pl/poradnik/...`
- EN: `/en/guides/...`

Kroki:
1) Usuń martwe/legacy route’y, które duplikują blog (np. `app/[locale]/blog/...` jeśli już niepotrzebne).
2) Zostaw redirecty legacy w `next.config` (masz je już: `/blog → /ratgeber`, itd.).
3) Upewnij się, że **routes.ts = single source of truth** i wszystko w app/ to odzwierciedla.

---

## 7) Tailwind v4 (FULL LATEST)

1) Upgrade Tailwind do v4 (wg przewodnika Next/Tailwind) :contentReference[oaicite:22]{index=22}.
2) Zaktualizuj PostCSS/Tailwind config zgodnie z wymaganiami v4 (często dochodzi `@tailwindcss/postcss` zależnie od konfiguracji projektu).
3) Odpal:
   - `npm run build`
   - sprawdź, czy klasy i typography działają.

---

## 8) SEO: per-page canonical + hreflang + OG (to jest MUST)

### Zasada
W Next App Router canonical/hreflang muszą być generowane **per-strona**, nie globalnie w root layout.

Implementacja:
1) `app/layout.tsx`:
   - zostaw `metadataBase`, szablon title, domyślne OG images
   - usuń globalne `alternates.canonical` i globalne `alternates.languages`

2) `lib/metadata.ts`:
   - `constructMetadata({ locale, routeKey, params })`
   - generuje:
     - canonical = dokładny URL tej strony
     - alternates.languages = odpowiedniki DE/PL/EN dla tej samej strony
     - openGraph.url = self URL
     - noindex dla technicznych stron (np. error, not-found)

3) W każdej stronie (home/contact/listing/category/post) dodaj `generateMetadata()` i wywołaj helper.

---

## 9) Sitemap & robots (prod correctness)

1) `app/sitemap.ts`:
   - użyj danych z Velite (zamiast Contentlayer)
   - generuj wszystkie języki (DE bez prefixu) + wszystkie posty
2) `app/robots.ts`:
   - upewnij się, że wskazuje sitemap

Po deploy:
- sprawdź na PROD:
  - `https://pablo-auto.at/sitemap.xml`
  - `https://pablo-auto.at/robots.txt`

---

## 10) Testy E2E (Playwright) — blokada regresji SEO

Dodaj `e2e/seo.spec.ts`:

Minimalny zakres:
1) Status 200 dla:
   - `/`, `/pl`, `/en`
   - `/kontakt`, `/pl/kontakt`, `/en/contact`
   - `/ratgeber`, `/pl/poradnik`, `/en/guides`
   - 1 przykładowy post per język

2) W HTML sprawdź:
   - canonical == self URL
   - hreflang zawiera de, pl, en, x-default
   - JSON-LD: `script[type="application/ld+json"]` istnieje i `JSON.parse` działa

W pipeline:
- `npm run test:e2e` jako wymagane przed mergem do main.

---

## 11) Vercel: ustawienia i rollout

1) Ustaw Node 24.x w Vercel :contentReference[oaicite:23]{index=23}
2) Deploy Preview z brancha `chore/upgrade-next16-full-latest`
3) Smoke test:
   - home + 1 post + sitemap + robots
4) Merge do main → Prod deploy

---

## 12) Definition of Done (DOD)

- ✅ `npm run build` przechodzi
- ✅ `npm run typecheck` przechodzi
- ✅ `npm run validate:blog` przechodzi
- ✅ Playwright E2E SEO przechodzi
- ✅ canonical/hreflang są per-strona
- ✅ sitemap/robots poprawne na PROD
- ✅ brak Contentlayer/next-contentlayer2 w repo
- ✅ proxy.ts działa (redirect www, /de → /, cookie locale)

---

## Appendix: pliki, które NA PEWNO dotykamy

- package.json (duże zmiany)
- next.config.mjs (usunąć withContentlayer + dodać Velite integration + zostawić redirects/headers)
- (rename) middleware.ts → proxy.ts
- lib/metadata.ts (constructMetadata)
- app/**/page.tsx (generateMetadata per route)
- app/sitemap.ts + app/robots.ts
- components/mdx/MDXRenderer.tsx (Velite MDX rendering)
- velite.config.ts (nowe)

