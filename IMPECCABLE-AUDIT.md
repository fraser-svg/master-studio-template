# Impeccable Audit — master-studio-template

Date: 2026-09-10
Audited against: `.impeccable.md` (masculine / tough / practical / trustworthy / plain / established)

## Score: 18/20

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
