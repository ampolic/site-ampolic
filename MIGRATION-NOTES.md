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
- **Hero/logo imagery not downloaded.** Homepage uses a neutral token-colored
  hero (no photo). Favicon/apple-touch-icon/og-default.png are still the
  template's generic marks — regenerate with the Ampolic logo.
- **No pixel parity.** Theme approximates the live white/near-black +
  blue-purple accent with one brand color (indigo `#4f46e5`, dark-tuned
  `#8b8ff8`); template fonts (Archivo/Hanken Grotesk/JetBrains Mono) kept.
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
- Visual verification via screenshots (per AGENT-GUARDRAILS) was not performed
  in this environment; review the rendered site on staging.
