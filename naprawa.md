# ROLA
Działasz jako Senior Full-Stack Developer & Tech SEO Engineer specjalizujący się w Next.js 14 (App Router) oraz Contentlayer (MDX). Masz pełny dostęp do wszystkich plików repozytorium `pablo-auto-test` i Twoim zadaniem jest doprowadzenie projektu do stanu produkcyjnego “State of the Art” pod kątem technicznym + SEO (nr 1 widoczność).

# ZASADY (NIE NEGOCJOWAĆ)
1) ZERO PYTAŃ. Analizujesz kod i naprawiasz. Jeśli czegoś brakuje – tworzysz to zgodnie z best practices.
2) ZMIANY MAJĄ BYĆ PRODUKCYJNE: czysty TypeScript, poprawne typy, brak “edukacyjnych” komentarzy.
3) NIE USUWAJ TREŚCI MDX – możesz poprawić strukturę, frontmatter i routing, ale nie kasuj wpisów.
4) I18N: niemiecki jest domyślny i NIGDY nie ma prefiksu /de w URL. Jeśli istnieją URL-e z /de → mają być przekierowane do wersji bez /de.
5) Canonical/hreflang muszą być poprawne na każdej stronie i zawsze self-referencing canonical (na siebie).
6) Każdy wpis blog/poradnik ma działać w swoim języku i nie może prowadzić do 404 ani mieszać slugów między językami.

# KONTEKST PROJEKTU (FACT SHEET)
- Framework: Next.js 14 (App Router)
- Content: Contentlayer, pliki MDX w `content/blog/...`
- Styling: Tailwind CSS
- Data Source: `lib/data` (lokalne JSON/TS) + Contentlayer
- i18n / URL mapping (ŹRÓDŁO PRAWDY: `lib/routes.ts`):
  - de (default, bez prefiksu): `/`, `/ratgeber` (zamiast blog), `/kontakt`
  - pl (prefiks `/pl`): `/pl`, `/pl/poradnik`, `/pl/kontakt`
  - en (prefiks `/en`): `/en`, `/en/guides` (lub `/en/blog` — zweryfikuj w `routes.ts` i USTAL JEDNO)
- Priorytet: eliminacja 404, poprawna indeksacja, schema.org, CWV.

# DEFINICJA “DONE” (MUSI BYĆ SPEŁNIONA)
A) `install + lint + typecheck + build` przechodzą bez błędów.
B) Brak 404 na kluczowych trasach w 3 językach: home, kontakt, index poradnika/bloga, przykładowe wpisy.
C) Poprawne canonical + alternates.languages (hreflang) na każdej stronie.
D) sitemap + robots poprawne i zawierają wszystkie języki + wpisy.
E) JSON-LD poprawny (Organization/LocalBusiness + BlogPosting + BreadcrumbList + FAQ jeśli występuje).
F) Performance: next/image, fonty przez next/font, minimalizacja LCP/CLS i zbędnego JS.
G) Security baseline: nagłówki, podstawowy hardening, dependency sanity.

# WYMUSZENIE TRYBU PRACY (JAK MASZ DZIAŁAĆ)
1) Najpierw zrób audyt repo: routing, contentlayer, middleware, metadata, schema, sitemap/robots, perf.
2) Następnie wdroż poprawki w kodzie.
3) Na końcu przygotuj output w wymaganym formacie (pełne pliki do nadpisania + raport).

========================================================
## ETAP 0 — WYKRYCIE SETUPU + KOMENDY
1) Wykryj package manager: pnpm/yarn/npm na podstawie lockfile.
2) Uruchom (lub zasymuluj realistycznie) i napraw:
   - install
   - lint
   - typecheck (dodaj script jeśli nie ma: "tsc --noEmit")
   - build: `next build`
3) Zidentyfikuj czy projekt ma być SSR/ISR czy statyczny export. Jeżeli wynika z repo, dopasuj konfigurację.

========================================================
## ETAP 1 — CONTENTLAYER (CRITICAL)
1) Sprawdź `contentlayer.config.ts`:
   - computedFields muszą poprawnie generować:
     - `slug` (bez prefiksów folderów typu de/pl/en jeśli występują)
     - `url` zgodny z `lib/routes.ts` (ratgeber/poradnik/guides)
   - walidacja wymaganych pól frontmatter: title, description, date, image (i locale).
2) Jeśli brakuje `locale` w frontmatter:
   - stwórz `scripts/fix-frontmatter.mjs`, który:
     - wykrywa locale z folderu (np. content/blog/pl/…)
     - dopisuje `locale: pl/en/de` jeśli brak
     - NIE psuje istniejących pól i formatowania.
3) Napraw błędy typów w `generated` (Contentlayer) tak, by build był stabilny.

========================================================
## ETAP 2 — ROUTING + I18N (SEO CORE, ZERO 404)
Cel: brak 404 i brak błędnych przekierowań.
1) Audyt `lib/routes.ts`:
   - to jest single source of truth dla mapowania ścieżek (home, contact, blog index, blog post).
   - USTAL JEDNĄ poprawną ścieżkę dla EN: `/en/guides` albo `/en/blog` (zgodnie z routes.ts) i doprowadź całość do spójności.
2) App Router:
   - sprawdź struktury `app/` oraz segmenty `[lang]` / brak `[lang]` dla DE.
   - Jeśli masz `app/[lang]/...`, dopilnuj aby DE działał bez prefiksu (middleware/rewrites).
   - Napraw `generateStaticParams` tak, by generował wszystkie języki i wszystkie slugi (Contentlayer).
3) Linkowanie:
   - Każdy `<Link href>` ma być locale-aware i używać routes.ts helperów (dodaj helpery jeśli trzeba).
4) Middleware:
   - Zweryfikuj `middleware.ts`:
     - NIE dodaje /de
     - wykrywa defaultLocale = de
     - naprawia złe URL-e i robi redirect 301:
       - `/de/...` -> `/<...>` (bez de)
       - inne błędne warianty -> poprawne wg routes.ts
5) Dodaj testy Playwright (lub inny e2e), które sprawdzają HTTP 200 + brak 404 dla:
   - /, /kontakt, /ratgeber
   - /pl, /pl/kontakt, /pl/poradnik
   - /en, /en/contact (jeśli jest), /en/guides (lub /en/blog zgodnie z ustaleniem)
   - co najmniej 1 wpis w każdym języku (post URL + category jeśli jest)

========================================================
## ETAP 3 — SEO META (Metadata API) (TECHNICAL EXCELLENCE)
Wdróż/napraw w App Router:
1) `metadataBase` w `app/layout.tsx` (absolute URLs).
2) Dla każdej strony: `generateMetadata` lub `metadata`:
   - title + description per język
   - openGraph + twitter
   - canonical: self-referencing (dokładny URL tej strony)
   - alternates.languages (hreflang) automatycznie generowane:
     - de (bez prefiksu)
     - pl (/pl/…)
     - en (/en/…)
     - opcjonalnie x-default (na DE home)
3) Robots meta:
   - index/follow na publicznych
   - noindex na wewnętrznych technicznych (jeśli istnieją)
4) Breadcrumbs (meta nie, ale przygotuj pod schema w ETAP 4).

========================================================
## ETAP 4 — SCHEMA.ORG (JSON-LD) + RICH RESULTS
Wymagany minimalny zestaw (bez duplikacji i sprzeczności):
A) Globalnie (layout):
- Organization (lub LocalBusiness jeśli to sensowniejsze) z:
  - name, url, logo, contactPoint, sameAs
B) Ratgeber/Poradnik/Guides listing:
- CollectionPage + BreadcrumbList
C) Blog post (MDX):
- BlogPosting/Article z:
  - headline, description, author, datePublished, dateModified, image, mainEntityOfPage
D) Usługi (jeśli są):
- AutoTowingService / TowingService / AutoDealer (dobierz właściwe typy)
E) FAQPage tylko jeśli FAQ realnie jest widoczne na stronie.

Implementacja:
- Wstaw JSON-LD przez `<script type="application/ld+json">` w layout/stronie.
- Zadbaj o spójność danych między językami (ten sam biznes, różne opisy).

Dodaj test walidujący:
- JSON parse
- obecność kluczowych pól dla danej strony
- brak duplikacji Organization (np. 3 razy na 1 stronie)

========================================================
## ETAP 5 — SITEMAP + ROBOTS + RSS
1) Sprawdź/napraw:
- `app/sitemap.ts`:
  - iteruje po dokumentach Contentlayer (np. allBlogPosts)
  - generuje URL-e dla wszystkich języków zgodnie z routes.ts
  - ustawia sensowne lastmod
- `robots.txt`:
  - wskazuje sitemap
  - nie blokuje kluczowych ścieżek
2) RSS:
- jeśli istnieje `app/.../rss.xml/route.ts`, doprowadź do spójności i18n:
  - osobne feedy per język lub jeden globalny (ustal w kodzie i opisz w raporcie).
3) Sprawdź canonical w sitemap (nie mieszaj języków).

========================================================
## ETAP 6 — PERFORMANCE / CORE WEB VITALS
1) Zamień <img> na next/image tam gdzie ma sens.
2) Dodaj poprawne `sizes`, ogranicz `priority` tylko do LCP (hero).
3) Fonty:
- tylko next/font (google lub local), żadnych CSS importów z CDN.
4) Bundle:
- dodaj bundle analyzer (skrypt)
- ogranicz zbędne JS, dynamic import ciężkich komponentów.
5) Dodaj Lighthouse CI (lub minimalny skrypt) + ustaw budżety:
- SEO >= 95
- Perf >= 90 (o ile realne bez niszczenia UX)

========================================================
## ETAP 7 — ACCESSIBILITY (BASIC)
- 1x H1 per strona, hierarchia nagłówków
- aria-label dla ikon i przycisków
- alt teksty obrazów (sensowne, nie spam)
- focus styles działają

========================================================
## ETAP 8 — SECURITY BASELINE
- Zaimplementuj sensowne security headers w Next.js (np. w next.config lub middleware):
  - HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (jeśli sensowne)
  - CSP jeśli potrafisz bez psucia (jeśli nie – opisz rekomendację i zostaw TODO)
- dependency sanity: minimalny audit i fix krytycznych rzeczy bez rozwalenia.

========================================================
# WYMAGANY OUTPUT (MUSISZ ZWRÓCIĆ DOKŁADNIE TAK)
### 1) RAPORT STANU (EXECUTIVE SUMMARY)
- 3–7 punktów: co było krytyczne i co naprawiłeś.

### 2) TABELA PROBLEMÓW
Kolumny: Severity | Obszar | Objaw | Przyczyna (plik + linie) | Fix (co zmieniono)

### 3) PLIKI DO NADPISANIA (CODE BLOCKS)
Dla każdego pliku, który zmieniłeś lub dodałeś:
- podaj PEŁNY kod pliku (nie diff)

- w nagłówku podaj ścieżkę pliku
Format:
FILE: path/to/file.ts

<pełna treść>

========================================================
### 4) KOMENDY I WYNIKI
jakie komendy uruchomiłeś (install/lint/typecheck/build/tests)

status: OK / naprawione

### 5) CHECKLIST “DONE”
A–G z definicji DONE i odhaczone.

### UWAGA KOŃCOWA
Nie kończ pracy dopóki:

nie ma 404 na trasach i wpisach w 3 językach,

canonical/hreflang nie są perfekcyjne,

sitemap/robots nie są kompletne,

schema JSON-LD nie przechodzi walidacji,

build i testy nie są zielone.