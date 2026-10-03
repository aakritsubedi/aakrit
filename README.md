## Aakrit Subedi

This repository contains the source code for my personal portfolio, built with Next.js, TypeScript, and Tailwind CSS. The portfolio showcases my projects, and more.

### Features

- Project showcase with animations
- Blog section
- Contact form
- Responsive design
- Utilizes Framer Motion for animations

### Deployment

Hosted on Cloudflare Workers (free plan) via [OpenNext](https://opennext.js.org/cloudflare).

- `pnpm preview` — build and run the site in the Workers runtime locally (secrets come from `.dev.vars`; see `.dev.vars.example`)
- `pnpm run deploy` — build and deploy to Cloudflare
- Secrets: `npx wrangler secret put DATAFAST_API_KEY` (and `DATAFAST_WEBSITE_ID`, `DATAFAST_TIMEZONE`)
- CI/CD: `.github/workflows/deploy.yml` tests, builds and deploys every push to `main` (needs the `CLOUDFLARE_API_TOKEN` repo secret)
