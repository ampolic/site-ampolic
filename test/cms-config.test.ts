import { describe, it, expect } from 'vitest';
// Vitest runs in the Workers pool (no filesystem) — all repo files are pulled
// in at bundle time via ?raw / import.meta.glob instead of node:fs.
import config from '../public/admin/config.yml?raw';
import contentConfig from '../src/content.config.ts?raw';

/* Gate for CMS misconfigurations that only surface at runtime in /admin
   (Sveltia renders them as errors editors hit in production). */

const assetFiles = new Set(Object.keys(import.meta.glob('/src/assets/images/**/*')));
const contentFiles = import.meta.glob('/src/content/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const get = (key: string) => config.match(new RegExp(`^${key}: *(.+)$`, 'm'))?.[1]?.trim();

describe('CMS config', () => {
  it('public_folder is an absolute path (Sveltia rejects relative ones)', () => {
    expect(get('public_folder')).toMatch(/^\//);
  });

  it('every CMS collection folder has content in the repo', () => {
    const folders = [...config.matchAll(/^\s*folder: *(\S+)/gm)].map((m) => m[1]);
    expect(folders.length).toBeGreaterThan(0);
    const present = new Set(Object.keys(contentFiles).map((p) => p.replace(/^\/|\/[^/]+$/g, '')));
    for (const f of folders) {
      // Folders may legitimately be empty (pages); only flag typos — a folder
      // that has no entries AND isn't a known collection dir name.
      if (present.size && [...present].some((p) => f.endsWith(p))) continue;
      expect(f, `CMS folder ${f} has no entries — empty collection or a typo?`).toMatch(
        /^src\/content\/(pages|services|team|pricing|faq)$/
      );
    }
  });

  it('CMS collections and content.config collections agree', () => {
    const cms = [...config.matchAll(/^  - name: *(\S+)/gm)].map((m) => m[1]).sort();
    const code = (contentConfig.match(/export const collections = \{ ([^}]+) \}/)?.[1] ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .sort();
    expect(cms).toEqual(code);
  });

  it('fields with a default are not required (Sveltia blocks saves otherwise)', () => {
    const offenders = [...config.matchAll(/^.*default:(?!.*required: false).*$/gm)]
      .map((m) => m[0])
      // boolean defaults are fine — checkboxes always have a value
      .filter((l) => !/widget: boolean/.test(l));
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('absolute image paths in content frontmatter resolve to real files', () => {
    for (const [file, text] of Object.entries(contentFiles)) {
      for (const [, p] of text.matchAll(/^(?:photo|image|cover): *(\/src\/\S+)$/gm)) {
        expect(assetFiles.has(p), `${file}: missing ${p}`).toBe(true);
      }
    }
  });
});
