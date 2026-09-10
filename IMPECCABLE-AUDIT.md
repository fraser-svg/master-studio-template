# Impeccable Audit — master-studio-template

Date: 2026-09-10
Audited against: `.impeccable.md` (masculine / tough / practical / trustworthy / plain / established)

## Score: 19/20

## What changed in this pass

The template previously shipped three token themes (Forest default, `industrial`,
`premium`) selected by a `site_theme` Custom Value. Nothing used them: `/studio`
phase 5 writes a per-client palette from the scraped brand colours, so the stock
themes were dead weight with a maintenance cost. They are gone.

There is now **one** palette, in `:root` in `src/styles.css`, deliberately neutral —
graphite, warm concrete, one restrained steel-blue accent. A client site is
re-skinned by replacing those values and the two font families. Nothing else.

- Removed `:root[data-theme="industrial"]` and `:root[data-theme="premium"]`.
- Removed `site_theme` from `src/lib/site.ts` and `src/lib/demo.ts`, and the
  `data-theme` branch in `src/routes/__root.tsx`.
- Deleted `src/tailwind.config.vibe.json` — an unimported fourth colour source.
- Renamed trade-specific token aliases to neutral ones so the base palette is not
  secretly a green roofer: `forest*` → `brand*`, `sand*` → `surface-alt*`,
  `bright-green` → `accent-strong`.
- Type: `Inter` + `Oswald` → `Barlow` + `Barlow Condensed`. One industrial signage
  superfamily; also gets the body text off the AI-default face.
- Widened the top of the type scale (`--text-step-4` now tops out at 6rem) so the
  display face carries the page, per principle 4.
- Headings to weight 800.

## P0s fixed

| Finding | Fix |
|---|---|
| Contact form faked success — `console.log` + `toast.success`, every enquiry lost | `src/routes/contact.tsx` now `await submitLead(...)` with the same `LeadError` handling as the hero form |
| `<Toaster />` was never mounted, so both quote forms succeeded and failed in total silence | mounted in `src/routes/__root.tsx`; verified at runtime — submitting the contact form with no `lead_endpoint` now shows "No lead endpoint configured…" instead of nothing |
| Hero fell back to an external `vibe.filesafe.space` URL — third-party asset on every client site's LCP | `public/hero-placeholder.svg`, local, obviously a placeholder |

## P1s fixed

| Finding | Fix |
|---|---|
| `shadow-xl` / `shadow-sm` / `hover:shadow-xs` — decoration doing work structure should do | removed; hero form card now reads as a hard 2px `border-brand-dark` block |
| `backdrop-blur-md` header, `backdrop-blur-sm` CTA — glassmorphism, an explicit anti-reference | removed; header is a solid band |

## Findings from the previous audit that no longer apply

The 2026-09-09 audit listed 66 literal `text-white`/`bg-white` utilities, a missing
`focus-visible` treatment, a hardcoded gradient in `Photo`, an emoji icon and an
`animate-ping` pill. All verified absent — fixed between that audit and this one.
`check_placeholders.sh` confirms: no raw colour values in components, no literal
white/black utilities, focus-visible present.

## Anti-slop pass (design-taste-frontend + impeccable)

Design read: redesign-preserve of a local trade services site for homeowners,
trust-first language. Dials `DESIGN_VARIANCE 5 / MOTION_INTENSITY 3 / VISUAL_DENSITY 5`
(trust-first overrides the 8/6/4 baseline; a roofer's site should not animate at 6).

Mechanical failures found and fixed:

| Check | Before | After |
|---|---|---|
| Em-dash / en-dash ban (zero allowed anywhere visible) | 96 across `src/` | 0 |
| Eyebrow count, homepage (max `ceil(sections/3)` = 4) | 8 | 4 |
| Identical `sm:grid-cols-2 lg:grid-cols-3` equal-card grids | 4 | 1 |
| Hero text elements (max 4) | 6 - pill, headline, subtext, CTAs, 5-item trust strip | 4 |
| `01 / 02 / 03` step numbering (banned generic step labels) | 6 | 0 |
| Middle dots per line (max 1) | hero pill had 2 | 0 |
| Duplicate CTA intent ("Request Quote" vs "Request a Quote", "Get a quote") | 3 labels, 1 intent | 1 label |

What actually changed on the page:

- **Hero.** The 5-item trust micro-strip is gone. It duplicated `HomeTrustBar`
  directly below it verbatim, and the hero is one moment, not a feature list.
- **"Field proof" eyebrow** renamed. Performative-craftsman labels ("field notes",
  "from the field", "on the bench") are an explicit AI tell.
- **Why choose us** was six bordered cards in a 3-up grid, each stamped `01`-`06`.
  Now a two-column list with hairlines between rows. Nothing is boxed. The numbers
  are gone; they carried no information.
- **Areas we cover** was six equal cards, the same layout family as the services
  grid two sections up. Now a divided two-column town list.
- **What customers say** was six cards, each with an identical five-star row and a
  letter-monogram avatar. Now four quotes at `text-step-1` in a divided two-column
  layout. The rating is already stated in the trust bar; repeating five stars six
  times is decoration, and initial-in-a-circle avatars are the "Jane Doe" tell.

The homepage now uses nine distinct layout families across eleven sections. The
services grid is the only card grid left, which is the right component for
image + label + link items.

Fixed while verifying: the new areas list overflowed the viewport horizontally at
390px (`shrink-0` on the distance column). All routes now report no horizontal
overflow at 390px.

## Open

- **Equal three-card rows** in services / reviews / FAQ sections remain, and the
  brief lists them as an anti-reference. Left deliberately: section composition and
  order is per-client work in `/studio` phase 5, and the kit needs a regular grid to
  compose from. A client build that ships three equal cards straight through has
  skipped its design pass.
- **Base palette is intentionally quiet.** It should never ship to a client as-is.

## Verified

- `bun run lint` — 0 errors, 10 pre-existing react-refresh warnings in `ui/`.
- `bun run build` — clean.
- Contact form submitted in a real browser with `lead_endpoint` unset: error toast
  shown, form not reset. The old code showed a success toast and cleared the form.
- Repaint test: changing only `--primary`, `--brand`, `--brand-dark`, `--accent` and
  `--dark-surface` re-skinned the whole site (header, hero, buttons, icons, forms,
  bands) with no component edits. Reverted.

---

# Pass 2 — three styles, band rhythm, type volume

Date: 2026-09-10
Audited against: `.impeccable.md` (rewritten in this pass)

## Why there was a second pass at 19/20

The previous pass scored 19/20 and the page still read as AI-made. That is the
finding, not a contradiction: the audit checked mechanical anti-slop rules (dash
count, eyebrow count, duplicate grid families, banned step numbering) and passed,
while the page **as a whole** was one flat beige field of nine identically-built
sections with every heading shouting at the same volume.

Measured on the rendered page at 1440px, not read out of the source:

| Finding | Evidence | Fix |
|---|---|---|
| No contrast rhythm | 13 `bg-secondary/40` uses against `--background` (0.876 vs 0.917 lightness, invisible) and only 3 `bg-brand-dark` across the whole site | New `Band` primitive with solid `light` / `alt` / `deep` / `dark` tones and `tight` / `normal` / `tall` sizes. Homepage now runs three dark bands. Opacity tones are banned. |
| Monotone shouting | `h1, h2, h3` forced to condensed uppercase 800 globally; `.heading-plain` escape hatch used nowhere | Global heading rule deleted. The display voice is opt-in via `.display`; `h3` returns to the body face in sentence case. |
| The metronome | Nine sections, all `max-w-6xl px-5 py-16 sm:py-24 border-b`, heading-left / link-right | Band sizes vary; `BandHead` is one component so the furniture cannot drift; a full-bleed photograph runs under the hero and is the only edge-to-edge element on the page. |
| Scale never reached | `--text-step-4` used once, so widening it did nothing | Hero h1 at step 4, everything else at step 3 or below. Exactly one step-4 element per page is now a checked rule. |
| Placeholders read as broken | `MapPlaceholder`'s dotted radial grid shipped twice on the homepage | Solid brand block with the address in type, and a documented slot for the real embed. |
| Icon-row slop | `TrustStrip` was five lucide glyphs separated by middle dots | Four facts set as type on a divided rail. No icons. |
| Reviews repeated a layout | Four quotes in the same two-column hairline list already used by why-choose-us and areas | One customer, at display scale, on a dark band. |

## Three styles

The template now ships `steel` (default), `ink` and `board`, selected by the
`site_style` Custom Value and applied as `data-style` on `<html>`. Every
difference is a token value in `src/styles.css`; no component branches on the
style.

This deliberately reverses part of pass 1, which deleted three `site_theme`
palettes. Those were unused colour swaps that phase 5 repainted over. These are
drawn, reviewed designs that differ in type, rule weight, band rhythm and colour
stance, and phase 3 now chooses one per client. `.impeccable.md` says so, so the
next audit does not delete them again.

Two token groups were added because a style difference cannot live in a component:
`--header-bg` / `--hero-bg` and friends (ink runs a paper masthead and a paper
hero; steel and board run dark ones), and `--mark`, a text-safe accent, because
board's yellow is a field colour that cannot carry text on a light ground.

## The constraint that shaped the fix

Tailwind compiles `@theme` entries into utility classes with the value inlined at
build time, so `:root[data-style]` overrides never reach them. Verified in the
browser before any code was written: overriding `--font-display` and `--font-body`
under `data-style="ink"` swapped `body` (raw `font-family: var(--body-family)`) to
the serif, while `<h1 class="font-display">` stayed on the old face.

Hence `.display`, `.rule-*`, `.band-pad*`, `.header-surface`, `.hero-surface` and
`.text-mark` are raw CSS in `@layer base` / `@layer utilities`. `font-display` is
gone from the codebase and must not come back.

## Verified

- `bun run lint` — 0 errors, 10 pre-existing react-refresh warnings in `ui/`.
- `bun run build` — clean.
- `grep -rn 'siteStyle\|data-style' src/components/` — 0 hits.
- `grep -rn 'font-display' src/` — 0 hits.
- `check_placeholders.sh` — no raw colour values, no literal white/black utilities.
- **Band and volume assertions, per style** (`getComputedStyle` over the homepage's
  sections): steel 3 distinct band tones, ink 3, board 3, each including a dark
  one; exactly 1 element at `--text-step-4` in all three.
- **Repaint test, per style**: overriding `--accent`, `--brand`, `--brand-dark`,
  `--dark-surface`, `--primary`, `--header-bg`, `--hero-bg`, `--background` and
  `--surface-alt` re-skinned header, hero, buttons, bands and marks with no
  component edits, in all three styles.
- One Google Fonts stylesheet requested per style, confirmed in the DOM: Anton +
  Archivo (steel), Archivo Narrow + Source Serif 4 (ink), Archivo Black + Archivo
  (board).
- No horizontal overflow at 390px on `/`, `/services`, `/about`,
  `/areas/sheffield`, `/projects`, `/reviews`, `/contact`, `/faqs` in all three
  styles. Board's hero overflowed at first (`CONTRACTORS` at 48px in Archivo Black
  is wider than a 390px viewport); fixed by lowering the step-4 floor to 2.25rem
  and adding `hyphens: auto` to `.display`.
- Contact form submitted in a real browser with `lead_endpoint` unset: error toast
  shown, form not reset. The P0 fixed in pass 1 still holds.

## Open

- **Inner routes inherit, they were not hand-tuned.** All 13 compose from the same
  primitives, so they picked up the band system, the display voice and the rule
  weights. They have been checked for overflow and for style correctness, not
  designed section by section.
- **Each style's palette is a starting point.** None should ship to a client as-is.
