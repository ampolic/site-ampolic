# MIGRATION-NOTES — ampolic.com port (2026-08)

Things skipped, approximated, or needing human review when generating this repo
from `ampolic-astro-template` and porting the live ampolic.com content.

## Needs human / content review

- **Contact email is a placeholder.** `src/config/site.ts` uses
  `claude@ampolic.com` (TODO comments in place). Confirm the real public
  contact address before launch.
- **Contact form env vars.** `/api/contact` (Cloudflare Pages Function) needs
  `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL` set in Cloudflare, and `site.form.turnstileSiteKey` is
  still the Turnstile test key. Form will not deliver email until configured.
  **Status 2026-08-05: all set in Pages EXCEPT `RESEND_API_KEY` — intentionally
  skipped at launch, so the form submits but does not deliver email yet.**
- **Legal pages.** `legal.effectiveDate` / `lastReviewed` are set to the
  generation date (TODO in site.ts); privacy/terms text needs counsel review.
  Jurisdiction set to Ohio.
- **Business hours** in site.ts are a Mon–Fri 9–5 assumption (TODO); only used
  in LocalBusiness JSON-LD now (removed from footer).
- **Address/JSON-LD.** No street address is published; LocalBusiness JSON-LD
  uses Toledo, OH with empty street/postal code and city-center geo
  coordinates (TODO in site.ts). Consider switching JSON-LD to
  `ProfessionalService`/`Organization` later if desired.
- **Decap CMS** (`public/admin/config.yml`): repo set to `ampolic/site-ampolic`,
  branch `dev`; OAuth proxy (base_url/auth_endpoint) still needs per-repo setup
  per the comments in that file.

## Skipped / approximated vs the live site

- **Team resume-download CTA** on the live site was skipped (per brief); team
  cards link to samscherf.com / dylanlogan.xyz instead.
- **RESOLVED (2026-08 design pass): hero/logo imagery + favicons.** Client
  assets are now integrated: homepage photo hero (`src/assets/images/hero.jpg`
  behind the scrim gradient), header logo, team portraits, /our-work
  screenshots, and the six provided service icons (`src/icons/services/`,
  replacing the Lucide guesses). Favicon set + `og-default.png` are generated
  from the logo via `scripts/gen-brand-icons.mjs` (replaces
  `gen-apple-touch-icon.mjs`). Sources recorded in `docs/IMAGE-CREDITS.md`.
  Note: the provided `hero.webp` was JPEG data — stored as `hero.jpg`.
- **RESOLVED (2026-08 design pass): palette approximation.** Tokens now measure
  from the live site: burnt-orange brand `#bb4900` (dark-tuned `#ff9e62`),
  blue-tinted surfaces (`#f7fbfe`/`#edf4fa`), navy ink `#101c2e`, navy footer
  on the constant `--color-scrim` `#061221`, radius 0.75rem. Fonts remain the
  template's Archivo/Hanken Grotesk/JetBrains Mono (live site uses a plain
  grotesque; deliberate keep, not pixel parity).
- **Nav pill styling** approximates the live pill nav (rounded link group +
  phone pill + orange CTA); buttons use `--radius-base` (0.75rem), not the live
  site's full pills, because `@ampolic/ui@0.1.0` Button derives radius from the
  token shared with cards.
- **About/Contact are homepage anchors** (`/#about`, `/#contact`) like the live
  site; the template's `/about` and `/contact` pages were deleted and 301'd in
  `public/_redirects`. `ServiceAreaMap.astro` and `ContactBlock.astro`
  (storefront-specific) were deleted with them.
- **Contact form fields** are the template's Name/Email/Message (not the live
  site's First/Last split) — sanctioned by the brief.
- **Pricing** lives in `site.ts` (`pricing` array) rendered by
  `src/components/PricingTiers.astro`.

## Empty collections / dormant infrastructure

- **Blog**: no posts. `/blog`, tags, RSS, and OG-image routes build fine with
  the empty collection and are kept, but nothing links to them from the nav.
- **Testimonials**: empty collection kept; the homepage testimonial section was
  removed (restore from template + `TestimonialCard` when reviews exist).
- **Pages collection**: empty (demo example page removed).
- `site.trust` rating/license/dispatch and `credentials` licenses/
  certifications are unused placeholder slots (no published rating/licenses).

## Verification caveats

- `pnpm test:a11y` (Playwright a11y suite) was NOT run — needs Playwright
  browsers installed. Run it before launch.
- Visual verification via screenshots WAS performed in the 2026-08 design pass:
  live-vs-rebuild comparisons at 1440px/375px are saved in
  `docs/design-review/`. Remaining known differences: buttons are rounded-xl
  rather than full pills, fonts differ slightly from live, and the template's
  extra sections (spec strip, process cards, CTA bands, theme toggle, footer
  legal links) have no live-site counterpart — intentional "same brand, but
  cleaner".
