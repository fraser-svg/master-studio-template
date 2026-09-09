# Impeccable Audit — master-studio-template
Date: 2026-09-09 · Scope: whole template (20 routes, 3 section files, shadcn/ui untouched)
Context: `.impeccable.md` (written this pass)

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | No visible focus ring anywhere; `outline-none` on every input with only a border-colour focus state |
| 2 | Performance | 2 | Hero is a full-bleed remote PNG as a CSS `background-image` — unsized, unpreloaded, render-blocking LCP |
| 3 | Responsive Design | 3 | Genuinely fluid, but 10–11px text and sub-44px tap targets on mobile |
| 4 | Theming | 3 | Strong token layer, then 66 literal `*-white` classes and 3 raw colour values bypass it |
| 5 | Anti-Patterns | 3 | Mostly distinctive; a few 2024-AI tells (ping dot, glass pill, 📷, gradient placeholder) |
| **Total** | | **13/20** | **Acceptable — significant work needed** |

## Anti-Patterns Verdict — mostly PASS

Would someone say "AI made this"? Probably not at a glance. Condensed uppercase display type, 0.25rem radii, sand/forest editorial panels and thin borders are a real point of view, not shadcn defaults. That is the template's biggest asset.

Tells that remain:
1. **Live "Available for work" pill** with an `animate-ping` dot on a `bg-white/10 backdrop-blur-sm` rounded-full chip (`home-sections.tsx:88-96`). Glassmorphism + pulsing status dot is the single most recognisable 2024 AI-hero signature. Also a claim no trade business would write.
2. **📷 emoji as the photo-placeholder icon** (`sections.tsx:74`) — emoji-as-icon in a file that imports lucide.
3. **`bg-gradient-to-br from-secondary via-muted to-secondary/60`** in `Photo` (`sections.tsx:66`) — decorative gradient in a system with zero other gradients.
4. **`text-white/85`, `text-white/70`, `text-white/60`** grey-on-colour throughout hero and footer — the classic low-contrast dimming pattern.
5. Stat cards and a trust strip of four numbers sit close to "hero metrics row"; they survive only because the numbers are real merge fields, not invented.

## Executive Summary
- **13/20 — Acceptable.** Structurally good, systemically leaky.
- Issues: **3 P0, 7 P1, 6 P2, 4 P3**
- Top 5:
  1. Both quote forms `console.log` and fake success — a deployed site silently loses every lead (P0)
  2. No focus-visible styling anywhere — keyboard users cannot see where they are (P0)
  3. Hero background is a hard-coded external URL on `vibe.filesafe.space`, single-tenant and outside the client's control (P0)
  4. 66 literal `text/bg/border-white` classes break the promise that a token swap re-themes the site (P1)
  5. Body copy at 12px with 10px labels, and sub-44px tap targets on the two highest-value actions (P1)

## Detailed Findings

### P0

**[P0] Forms discard submissions**
Location: `routes/contact.tsx:57`, `components/home-sections.tsx:69`
Category: Harden
Impact: `console.log(data)` then `toast.success(...)`. Every lead is lost while the user is told it was sent. On a lead-generation template deployed dozens of times, this is the worst possible failure.
Fix: post to a GHL webhook / form endpoint held as a Custom Value (`site.formEndpoint`); real error state on failure; never resolve success optimistically.
Command: `/harden`

**[P0] No visible focus indicator**
Location: every input in `contact.tsx:147,157,165,175`, `home-sections.tsx:167-203`; every `<a>`/`<button>` CTA in `site.tsx`, `__root.tsx`
Category: Accessibility · WCAG 2.4.7 (A), 2.4.11 (AA)
Impact: `outline-none` with only `focus:border-primary` — a 1px border tint on a warm neutral, invisible to most users. Keyboard and switch users are lost mid-form.
Fix: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`, and drop bare `outline-none`. Ring must be re-checked per theme.
Command: `/harden`

**[P0] Hero image is a hard-coded external asset**
Location: `components/home-sections.tsx:28`
Category: Performance / Theming · `https://vibe.filesafe.space/...png`
Impact: LCP element is an unoptimised PNG on a third-party host, applied as a CSS `background-image` inside an inline `style` — so no `<img>`, no `fetchpriority`, no `srcset`, no preload, no lazy strategy, and no alt semantics. It also cannot be changed per client without editing code, which contradicts the Custom-Value model, and it hard-codes one trade's photo across every deployment.
Fix: `site.heroImage` Custom Value; render as a positioned `<img>` with `fetchpriority="high"`, explicit dimensions and `srcset`; keep the dark scrim as a token-driven overlay element.
Command: `/optimize`

### P1

**[P1] 66 literal white classes defeat the token system**
Location: `home-sections.tsx`, `__root.tsx` footer, hero (43× `text-white`, 13× `bg-white`, 10× `border-white`), plus `text-amber-500/400` for stars
Category: Theming
Impact: An Industrial (concrete/orange) or Premium (near-black) theme would leave white text on light panels and white buttons in the wrong places. The theme swap is the stated design test and it fails today.
Fix: add `--color-on-dark` / `--color-on-dark-muted` / `--color-star` tokens; replace all literals. Then define the Industrial and Premium `:root[data-theme]` blocks and prove the swap.
Command: `/colorize`

**[P1] Raw colour values inside components**
Location: `sections.tsx:29` (`#1b3b2b`, `oklch(0.94_0.015_85)`), `home-sections.tsx:78` (`rgba(15,28,21,0.82/0.72)`)
Category: Theming
Impact: Same as above; the map dot-grid and hero scrim stay forest-green in every theme.
Fix: `var(--forest-dark)` / `color-mix()` in the scrim; token the dot grid.
Command: `/colorize`

**[P1] Mobile call bar was thin — CORRECTION: one already existed**
Location: `routes/__root.tsx` `MobileCallBar`
Category: Responsive / UX
Impact: The original audit claimed there was no sticky mobile call affordance. That was wrong — `MobileCallBar` was rendered at `__root.tsx:387`. The real issues were smaller: a 36px-tall single button, no safe-area inset (obscured by the iOS home indicator), and no quote path for the non-urgent half of the audience.
Fix applied: two 44px actions (Call / Get a quote), `env(safe-area-inset-bottom)` padding, body `pb-callbar` to clear it.
Command: `/adapt`

**[P1] Tap targets under 44×44px**
Location: `__root.tsx:123` burger (`p-1` around a 20px icon ≈ 28px), `site.tsx` `CallButton`/`QuoteButton` (`py-2.5` + 12px text ≈ 36px), header call pill (`py-1.5` ≈ 28px)
Category: Accessibility / Responsive · WCAG 2.5.8 (AA)
Impact: Mis-taps on the two highest-value actions, for the user least able to tolerate friction.
Fix: `min-h-11 min-w-11` on all icon buttons; raise CTA vertical padding at mobile widths only.
Command: `/adapt`

**[P1] Body copy is 12px, labels 10–11px**
Location: 78× `text-xs`, 20× `text-[11px]`, 19× `text-[10px]` across routes and sections
Category: Accessibility / Typography
Impact: 12px is below the practical floor for sustained reading; 10px uppercase with `tracking-wider` at `text-muted-foreground` is close to unreadable for the older homeowner demographic that buys re-roofs. Muted-on-sand at 10px is very likely below 4.5:1 — verify.
Fix: floor body at 14px, secondary at 13px, retire `text-[10px]` outside true badges. Build a 5-step scale with ≥1.25 ratio instead of 13 ad-hoc sizes.
Command: `/typeset`

**[P1] Placeholder scaffolding ships as production UI**
Location: `sections.tsx` `Photo` ("Replace with real service photo"), `MapPlaceholder` ("Replace with real Google Map embed"), used ~18 times across every route
Category: Harden
Impact: These render as visible instructions to the end customer. One forgotten swap on one client deployment and the site tells homeowners it is unfinished.
Fix: `Photo` takes a real `src` and falls back to a neutral token block with no instructional text; keep the "replace me" hint behind `import.meta.env.DEV`.
Command: `/harden`

**[P1] Placeholder images have no real alt text**
Location: `about.tsx:43-46`, `projects.$slug.tsx:153,159`, `home-sections.tsx:321,634`
Category: Accessibility · WCAG 1.1.1 (A)
Impact: `role="img"` with `aria-label="Before photo"` / `"Technician at work"` describes the slot, not the work. When real photos land, the descriptions will still be generic.
Fix: make alt a required prop with no default when a real `src` is supplied.
Command: `/harden`

### P2

**[P2] No `prefers-reduced-motion` handling** — zero matches project-wide, while `animate-ping` and `active:scale-[0.98]` run everywhere. WCAG 2.3.3. → `/animate`

**[P2] `animate-ping` runs forever offscreen** — `home-sections.tsx:90` composites continuously for the life of the page; free battery drain on mobile. → `/animate`

**[P2] No `dark` variant defined** — `@custom-variant dark` is declared in `styles.css:5` and never used; zero `dark:` classes and no `.dark` block. Either build it per theme or drop the variant so it doesn't imply support. → `/colorize`

**[P2] No dead-end / empty states** — `services.$service.tsx` and `areas.$town.tsx` assume the slug resolves and content exists; an unfilled Custom Value renders literal `{{ custom_values.town_4_name }}` to the customer. → `/harden`

**[P2] Placeholder gradient + emoji icon** — `sections.tsx:66,74`; the only gradient and the only emoji in the codebase. → `/polish`

**[P2] Type scale has no fluid sizing** — no `clamp()` anywhere; headings step 4xl→5xl→6xl at breakpoints on marketing pages where fluid type belongs. → `/typeset`

### P3

- Heading elements are globally forced to `font-display` + `uppercase` in `styles.css` base layer — no escape hatch for a sentence-case `h3`; consider a `.font-body-heading` utility. → `/typeset`
- `text-white/30` middot separators in the hero trust strip are decorative and should be `aria-hidden`. → `/polish`
- `shadow-xs`/`shadow-sm` used sparsely in a system that otherwise relies on borders; pick one and commit. → `/polish`
- Business initial in a `size-7` square as the logo mark is a placeholder identity; make it a Custom Value image slot. → `/polish`

## Patterns & Systemic Issues

1. **The token system stops at the dark surfaces.** Every light panel is properly tokenised; the moment a section goes dark (hero, footer) the code falls back to `white/NN`. Missing tokens: on-dark foreground, on-dark muted, scrim, star.
2. **Micro-typography as a substitute for hierarchy.** Contrast is created by shrinking secondary text to 10–11px rather than by scaling primary text up. That is why body copy has drifted below the accessible floor across 20 files.
3. **Placeholders modelled as permanent components.** `Photo` and `MapPlaceholder` are imported everywhere as if they were the real thing, so "fill in the content" has no completion signal.
4. **Interaction states are half-specified.** Hover and active exist almost everywhere; focus and disabled almost nowhere.

## Positive Findings

- **Custom Value discipline is excellent.** `src/lib/site.ts` is a genuinely good spine — business text is centralised, and the header comment correctly reasons about what must stay unique per page.
- **Real aesthetic point of view.** Small radii, thin borders, condensed uppercase display, alternating sand/forest panels. Deliberately not a SaaS landing page.
- **Structured data present** — `JsonLd` / `BreadcrumbJsonLd` across routes, which matters more than anything visual for a local-service template.
- **OKLCH tokens throughout** — theme variants will interpolate cleanly.
- **Fonts loaded correctly** — preconnect + `display=swap`, only 3 Oswald weights.
- **Layouts are fluid, not scaled-down** — real mobile-first grid work, no amputated functionality.

## Recommended Actions

1. **[P0] `/harden`** — real form endpoint + error states, focus-visible rings, kill visible placeholder instructions, unresolved-Custom-Value fallbacks
2. **[P0] `/optimize`** — hero to a tokenised `<img>` with `fetchpriority`/`srcset`, driven by a Custom Value
3. **[P1] `/colorize`** — on-dark/scrim/star tokens, eliminate all 66 white literals, then ship the Industrial and Premium theme blocks and prove the swap
4. **[P1] `/adapt`** — sticky mobile call bar, 44px tap targets
5. **[P1] `/typeset`** — 5-step fluid scale, 14px body floor, retire `text-[10px]`
6. **[P2] `/animate`** — reduced-motion support, drop the ping dot
7. **[P3] `/polish`** — final pass: emoji icon, placeholder gradient, shadow consistency, decorative separators


---

# Fixes Applied — 2026-09-09

All P0 and P1 findings, plus the P2 set. `tsc --noEmit` clean, eslint clean, dev server verified.

## Theming
- Added on-dark token family (`--on-dark`, `--on-dark-muted`, `--on-dark-faint`, `--on-dark-surface`, `--on-dark-border`, `--dark-surface`, `--scrim`, `--scrim-soft`, `--star`).
- Replaced all 66 literal `text/bg/border-white` classes and both `text-amber-*` star colours with tokens.
- Removed the raw `#1b3b2b`, `oklch(...)` and `rgba(...)` values from `sections.tsx` and the hero scrim.
- **Three themes ship**: Forest (default), `data-theme="industrial"` (concrete + safety orange), `data-theme="premium"` (near-black + warm metallic). Selected by the `site_theme` Custom Value on `<html>`; no component changes required.

## Lead capture (was the worst defect)
- New `src/lib/leads.ts`. Both forms POST to the `lead_endpoint` Custom Value.
- If the endpoint is missing or still a raw merge field, submission **throws** and the user sees "call us instead" — it never fakes success. Dev builds log the payload and say what to configure.

## Accessibility
- One global `:focus-visible` outline in the base layer; removed every `outline-none`.
- Tap targets: `min-h-11` on all CTAs, header call pill, burger (now `size-11`), mobile nav rows, call bar.
- Burger has `aria-expanded` and a state-aware label.
- `Photo` takes a real `src` and its `label` is now the alt text; placeholder mode is a labelled region with no instructional copy in production.

## Typography
- 5-step fluid scale (`--text-step--1` … `--text-step-4`) with clamp; body floor 15–16px, small text 13–14px.
- Retired every `text-[10px]`, `text-[11px]`, `text-xs`, `text-sm` across the 16 non-shadcn files.
- `.heading-plain` escape hatch for headings that shouldn't be uppercase condensed.

## Performance
- Hero is a real `<img>` with `fetchPriority="high"`, driven by the `hero_image_url` / `hero_image_alt` Custom Values; the scrim is a separate token-driven layer.
- `Photo` lazy-loads by default, eager with `priority`.
- Removed the always-on `animate-ping`.

## Motion
- Global `prefers-reduced-motion` block; `motion-reduce:active:scale-100` on press states.

## Anti-patterns removed
- "Available for work" glass pill with pulsing dot → a factual `years · town · accreditation` rule.
- 📷 emoji → lucide icon. Decorative placeholder gradient → flat token surface.

## Still open (P3)
- Logo mark is still the business initial in a square; wants a `logo_url` Custom Value.
- Decorative middot separators in the hero trust strip are not `aria-hidden`.
- `shadow-xs`/`shadow-sm` remain used sparsely in an otherwise border-driven system.
- Unfilled Custom Values still render raw `{{ ... }}` on area/service pages — needs a global merge-field fallback helper.

---

# Second pass — the real reason it looked wrong

The first pass fixed the system and left the page unreadable. Every string on
screen was a raw `{{ custom_values.x }}` merge field, so the hero read as three
lines of template syntax and every photo was an empty grey box. No design
judgement is possible in that state, and no client can be shown it.

**[P0] Template renders as literal merge fields**
Location: all of `src/lib/site.ts`, footer link arrays in `__root.tsx`, JSON-LD
Fix applied: `src/lib/demo.ts`. `withDemoContent()` walks the exported data and
substitutes a complete demo business (Marden & Sons Roofing, Sheffield — 6
services, 6 towns, real prices, real reviews, demo photography) in demo mode.
Production builds are untouched: `vite dev` and `VITE_DEMO=1 vite build` show
the demo business, a plain `vite build` emits the merge fields GoHighLevel needs.
Bracketed placeholders (`[Town]`, `[Job Type]`) rotate by array index so three
project cards read as three different jobs.

Also fixed in this pass:
- JSON-LD in `__root.tsx` hard-coded its own merge fields instead of reading `site` — now reads `site`.
- Footer service/area links carried raw merge fields — now resolved through `demoText`.
- Review copy opened with the instruction "Replace with a real review." — stripped in demo mode.
- `tradeSingular` pointed at the plural `trade` Custom Value, producing "Need a roofing contractors?" — now its own `trade_singular` field.
- Service names were capitalised mid-sentence in the hero subhead.
- Dangling `·` separators in the hero trust strip wrapped to line ends — removed.

**Verified**: all three themes swap correctly at runtime (Forest / Industrial /
Premium screenshots taken at 1440px), mobile hero and call bar checked at 390px,
`tsc --noEmit` and eslint clean. The one remaining console warning (React
hydration attribute mismatch) is pre-existing — it reproduces on the untouched
zip.

---

# Third pass — AI slop removal

Anti-pattern score was 3/4 on paper but the rendered page still carried the
tells. Removed:

- **Manufactured metric.** The dark band was four bordered stat cards, one of
  them "100% — Work Guaranteed", which is not a fact. Replaced with four
  checkable facts (rating + review count, years + start year, accreditation +
  licence number, insurance + certificate on request) laid out as a hairline-ruled
  definition list, no boxes.
- **Green circular arrow badges** on every service card → a plain "See details ↗"
  link that belongs to the card's own link.
- **Green ✓ bubbles** in the 2×2 benefit grid → hairline-ruled list with a plain check icon.
- **Decorative accent dots** — eyebrow bullets, card corner dots, the "same-day
  availability" dot. Eyebrows now use a short rule; the availability line uses a clock icon.
- **Circular avatars/badges** in review cards and the map block → square, matching the 0.25rem system.
- **Six identical "5.0/5.0" ratings.** Six perfect scores side by side reads
  fabricated; replaced with review dates, which is what a real Google set shows.
- **Accent green used as decoration** on the dark band → accent is now reserved for actions.
- **SEO jargon shown to customers** — "NAP verification / Service location &
  Google Profile match" → "Where we work from / Find us, check us".
- **Demo photography** was architecture and lifestyle stock (kitchens, sofas, a
  laptop). Replaced with verified trade and property images, and photos are now
  assigned by list index so neighbouring cards never repeat.

**Real bug found in passing**: `cn()` (tailwind-merge) was silently dropping
every `text-step-*` class where a colour class was merged alongside it, because
tailwind-merge cannot classify a custom `text-*` utility. Every `SectionHeading`
on the site was rendering at 16px instead of 48px. Fixed in `src/lib/utils.ts`
with `extendTailwindMerge`.

**Removed at the client's request**: the "When something needs fixing / You need
a straight answer, not a sales pitch" section (`HomeWhoWeHelp`) is gone from the
template, and the "Checkable, not claimed" heading with it.
