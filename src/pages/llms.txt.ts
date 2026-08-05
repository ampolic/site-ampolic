import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

/**
 * /llms.txt — a plain-text map of the site for AI crawlers and answer engines.
 * Follows the llmstxt.org convention: an H1 name, a one-line summary blockquote,
 * then linked sections. Summaries come straight from config + content frontmatter
 * so this stays accurate with zero extra maintenance.
 */
export const GET: APIRoute = async ({ site: siteUrl }) => {
  const base = siteUrl ?? new URL(site.url);
  const abs = (path: string) => new URL(path, base).href;

  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);

  const owner = site.credentials.owner;
  const years = new Date().getFullYear() - site.trust.established;

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} — ${site.primaryService} in ${site.city}, ${site.address.region}. `
      + `Established ${site.trust.established} (${years} years). Serving ${site.serviceArea}; works with businesses anywhere. `
      + `Phone ${site.phone}.`,
    '',
    '## Key pages',
    `- [Services](${abs('/services')}): ${site.description}`,
    `- [Our Work](${abs('/our-work')}): Websites built by ${site.name} for businesses and organizations.`,
    `- [Team](${abs('/team')}): ${owner.name}, ${owner.title}, and Dylan Logan, CTO / Co-Owner.`,
    `- [Contact](${abs('/#contact')}): Reach ${site.name} about a new or existing website.`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.data.title}](${abs(`/services/${s.id}`)}): ${s.data.summary}`),
    '',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
