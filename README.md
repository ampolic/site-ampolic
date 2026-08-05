# site-ampolic

The [ampolic.com](https://ampolic.com) website — Ampolic Digital Solutions' own site,
generated from `ampolic-astro-template` (Astro 5 + Tailwind v4 + `@ampolic/ui`).

- **Staging** = Cloudflare Pages `dev` branch
- **Production** = `main` branch (merge `dev` → `main` via PR; never push `main` directly)

## Local development

```sh
pnpm install
pnpm dev       # dev server
pnpm check     # astro check (type/content errors)
pnpm build     # production build
pnpm test      # vitest unit tests
```

Business facts live in `src/config/site.ts`; theming tokens in `src/styles/global.css`.
Agent rules: `CLAUDE.md` and `docs/AGENT-GUARDRAILS.md`. Migration caveats: `MIGRATION-NOTES.md`.
