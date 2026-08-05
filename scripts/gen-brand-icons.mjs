/**
 * Regenerate the favicon set + default OG image from the client logo
 * (src/assets/images/ampolic-logo.png). Run after any logo change:
 *   node scripts/gen-brand-icons.mjs
 * Outputs: public/favicon.svg (embedded PNG — the logo has no vector source),
 * public/favicon.ico (PNG-in-ICO, 32px), public/apple-touch-icon.png (180px,
 * solid surface bg), public/og-default.png (1200x630, scrim bg + logo + name).
 * Colors here mirror the @theme tokens in src/styles/global.css (sanctioned:
 * build-time raster assets can't read CSS custom properties).
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const LOGO = new URL('../src/assets/images/ampolic-logo.png', import.meta.url).pathname;
const pub = (f) => new URL(`../public/${f}`, import.meta.url).pathname;

// favicon.svg — logo embedded as a data URI (round mark reads fine on light + dark tabs)
const png64 = await sharp(LOGO).resize(64, 64).png().toBuffer();
writeFileSync(
  pub('favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${png64.toString('base64')}"/></svg>\n`
);

// favicon.ico — a single 32px PNG entry (PNG-in-ICO is valid and universally supported)
const png32 = await sharp(LOGO).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32; header[8] = 0; header[9] = 0;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(pub('favicon.ico'), Buffer.concat([header, png32]));

// apple-touch-icon.png — logo on solid light surface (#f7fbfe), iOS ignores alpha
const mark = await sharp(LOGO).resize(140, 140).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: { r: 0xf7, g: 0xfb, b: 0xfe, alpha: 1 } } })
  .composite([{ input: mark, gravity: 'center' }])
  .png()
  .toFile(pub('apple-touch-icon.png'));

// og-default.png — 1200x630: scrim navy bg, logo, name + tagline (SVG text overlay)
const ogLogo = await sharp(LOGO).resize(220, 220).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <text x="600" y="440" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="#f4f8fc">Ampolic Digital Solutions</text>
  <text x="600" y="505" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ff9e62">Websites, SEO &amp; digital tools</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: { r: 0x06, g: 0x12, b: 0x21, alpha: 1 } } })
  .composite([{ input: ogLogo, top: 120, left: 490 }, { input: text, top: 0, left: 0 }])
  .png()
  .toFile(pub('og-default.png'));

console.log('favicon.svg, favicon.ico, apple-touch-icon.png, og-default.png regenerated from the Ampolic logo');
