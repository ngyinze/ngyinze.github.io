# Isaac Ng's portfolio

A personal, non-commercial React SPA about desktop development, business software, and knowledge tools.

```sh
npm ci
npm run dev
npm run build
```

Vercel imports this repository into the `isaacng` project and deploys `main` automatically using the Vite preset (`npm run build`, output `dist`). The live preview is https://isaacng.vercel.app/. The existing GitHub Actions workflow also builds `dist` and deploys a GitHub Pages mirror.

The site uses hash anchors for navigation, so refreshes work on GitHub Pages without a router or server rewrite. Fonts are self-hosted under their included SIL Open Font License. The site has no analytics, contact backend, or public email.

The production custom domain `isaacng.is-a.dev` is added to Vercel without a www redirect. The registration branch includes Vercel's assigned A record and `_vercel.isaacng` TXT verification record. Once the registration PR is merged, Vercel can verify DNS and issue HTTPS. Keep the `vercel.app` preview available during review.

Run the browser check against the preview server using a Playwright installation:

```sh
npm run preview
# In another terminal, with Playwright available:
npm run check
```

If Playwright is bundled outside the project, set `PLAYWRIGHT_MODULE` to its absolute `index.mjs` path. This keeps browser tooling out of the deployed app's dependencies.
