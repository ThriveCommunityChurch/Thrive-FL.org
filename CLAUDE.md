# Thrive-FL.org

Next.js 16 public marketing + sermon browsing site. Static-first, SEO-optimized, AWS Amplify.

## Commands

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # static export — must be clean before PR
npm run lint
```

## Rules

- Static-first — prefer SSG; dynamic routes only when necessary
- No server state — all data from ThriveChurchOfficialAPI or static files
- No custom auth — public site, no login
- Minimal dependencies — bundle size matters for CDN delivery
- `NEXT_PUBLIC_*` only for browser-accessible vars; sensitive keys server-side only
- CSS Modules for component styles; `app.css` for global resets only

## Docs
- `Docs/Shared/Naming-Conventions.md` — TypeScript conventions
