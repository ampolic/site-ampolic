# Image Credits

All photography must be recorded here: photographer/source. Download into
`src/assets/images/` (never hotlink); serve only via `astro:assets` `<Image />`
with explicit dimensions.

All current assets are client-provided (Ampolic Digital Solutions, 2026-08) —
no stock photography in use.

| File | Source | Notes |
|---|---|---|
| `src/assets/images/hero.jpg` | Client-provided (`assets/images/hero.webp`) | Homepage hero background. Supplied file was JPEG data with a `.webp` extension — renamed `.jpg` to match its real format. |
| `src/assets/images/ampolic-logo.png` | Client-provided | Header logo; also the source for `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, and `og-default.png` (regenerate via `node scripts/gen-brand-icons.mjs`). |
| `src/assets/images/sam-scherf.jpg` | Client-provided (`Sam Scherf.jpg`) | Team page portrait. |
| `src/assets/images/dylan-logan.jpeg` | Client-provided (`Dylan Logan.jpeg`) | Team page portrait. |
| `src/assets/images/work/food-for-thought-toledo.jpeg` | Client-provided | /our-work card image. |
| `src/assets/images/work/bernal-professional-services.webp` | Client-provided | /our-work card image. |
| `src/assets/images/work/kalyn-orrin.webp` | Client-provided | /our-work card image. |
| `src/icons/services/*.svg` (6) | Client-provided (Bootstrap Icons glyphs, `currentColor`) | Solutions section icons, rendered via astro-icon local icons (`services/<name>`); replaced the Lucide guesses. |
