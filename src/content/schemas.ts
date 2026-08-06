import { z } from 'astro/zod';

export const serviceSchema = z.object({
  title: z.string(),
  summary: z.string(),
  /* Meta description for the service detail page (~150 chars, unique per service).
     Falls back to `summary` when omitted; set it when summary reads awkwardly as SEO copy. */
  description: z.string().optional(),
  icon: z.string(),
  order: z.number(),
  featured: z.boolean().default(false),
  /* Optional supporting photo (added in content.config via image()) + its alt text. */
  imageAlt: z.string().optional(),
});

/* Free-form markdown pages (about, team, landing pages…), the shape WordPress
   page exports convert to. Rendered by src/pages/[...page].astro at /<slug>. */
export const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
});

/* Team members shown on /team. Adding or editing a person is a markdown file
   (Decap-editable) — no code changes. `photo` is added in content.config via
   image(); the markdown body is the bio. */
export const teamSchema = z.object({
  name: z.string(),
  role: z.string(),
  order: z.number(),
  website: z.string().url().optional(),
  linkLabel: z.string().default('Visit Website'),
  /* CMS-managed image as an absolute repo path (/src/assets/images/…) —
     Sveltia requires absolute public paths, which Astro's image() helper
     rejects, so pages resolve this via import.meta.glob instead (build
     fails on a broken path). */
  photo: z.string().startsWith('/src/assets/images/'),
});

/* Pricing tiers on the homepage #pricing section — one file per tier,
   CMS-editable. `regular` is the struck-through list price. */
export const pricingSchema = z.object({
  name: z.string(),
  price: z.string(),
  regular: z.string().optional(),
  period: z.string().default('/mo'),
  blurb: z.string().optional(),
  features: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number(),
});

export const faqSchema = z.object({
  question: z.string(),
  /* Optional astro-icon name (e.g. lucide:globe) shown in a tinted circle. */
  icon: z.string().optional(),
  order: z.number(),
});
