import { describe, it, expect } from "vitest";
// Vitest runs in the Workers pool (no filesystem) — all repo files are pulled
// in at bundle time via ?raw / import.meta.glob instead of node:fs.
import config from "../public/admin/config.yml?raw";
import contentConfig from "../src/content.config.ts?raw";

/* Gate for CMS misconfigurations that only surface at runtime in /admin
   (Sveltia renders them as errors editors hit in production). */

const assetFiles = new Set(
  Object.keys(import.meta.glob("/src/assets/images/**/*")),
);
const contentFiles = import.meta.glob("/src/content/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const get = (key: string) =>
  config.match(new RegExp(`^${key}: *(.+)$`, "m"))?.[1]?.trim();
const cmsCollections = () =>
  [...config.matchAll(/^  - name: *(\S+)/gm)].map((m) => m[1]);
const codeCollections = () =>
  (contentConfig.match(/export const collections = \{ ([^}]+) \}/)?.[1] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const cmsFieldBlocks = () => {
  const blocks: string[] = [];
  let current: string[] | null = null;
  for (const line of config.split("\n")) {
    if (/^      - \{/.test(line)) {
      if (current) blocks.push(current.join("\n"));
      current = [line];
    } else if (current && /^      /.test(line)) {
      current.push(line);
    } else if (current) {
      blocks.push(current.join("\n"));
      current = null;
    }
  }
  if (current) blocks.push(current.join("\n"));
  return blocks;
};

describe("CMS config", () => {
  it("public_folder is an absolute path (Sveltia rejects relative ones)", () => {
    expect(get("public_folder")).toMatch(/^\//);
  });

  it("keeps CMS collections, folders, and Astro collections aligned", () => {
    const cms = cmsCollections().sort();
    const code = codeCollections().sort();
    expect(cms).toEqual(code);

    const folders = [...config.matchAll(/^\s*folder: *(\S+)/gm)].map(
      (m) => m[1],
    );
    expect(folders).toHaveLength(cms.length);
    for (const folder of folders) {
      expect(
        code,
        `CMS folder ${folder} has no matching Astro collection`,
      ).toContain(folder.split("/").at(-1));
    }
  });

  it("fields with a default are not required (Sveltia blocks saves otherwise)", () => {
    const offenders = cmsFieldBlocks().filter(
      (field) =>
        /\bdefault:/.test(field) &&
        // Boolean checkboxes always have a value; other defaulted fields must
        // be optional or Sveltia can block saves after their value is cleared.
        !/widget:\s*boolean/.test(field) &&
        !/required:\s*false/.test(field),
    );
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("absolute image paths in content frontmatter resolve to real files", () => {
    for (const [file, text] of Object.entries(contentFiles)) {
      for (const [, p] of text.matchAll(
        /^(?:photo|image|cover): *(\/src\/\S+)$/gm,
      )) {
        expect(assetFiles.has(p), `${file}: missing ${p}`).toBe(true);
      }
    }
  });
});
