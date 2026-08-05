import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  serviceSchema,
  pageSchema,
  teamSchema,
  testimonialSchema,
  faqSchema,
} from './content/schemas';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/[^_]*.{md,mdx}' }),
  schema: ({ image }) => serviceSchema.extend({ image: image().optional() }),
});
/* Free-form markdown pages — the landing spot for WordPress page exports.
   Each file becomes a route at /<slug> via src/pages/[...page].astro; static
   .astro routes always win over this dynamic route on slug collision. */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/[^_]*.{md,mdx}' }),
  schema: pageSchema,
});
const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/[^_]*.{md,mdx}' }),
  schema: ({ image }) => teamSchema.extend({ photo: image() }),
});
const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/[^_]*.{md,mdx}' }),
  schema: testimonialSchema,
});
const faq = defineCollection({
  loader: glob({ base: './src/content/faq', pattern: '**/[^_]*.{md,mdx}' }),
  schema: faqSchema,
});

export const collections = { services, pages, team, testimonials, faq };
