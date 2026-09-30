# Isaac Ng's portfolio

A personal, non-commercial React SPA about desktop development, business software, and knowledge tools.

```sh
npm ci
npm run dev
npm run build
```

GitHub Actions builds `dist` and deploys it to GitHub Pages. In repository Settings → Pages, select **GitHub Actions** as the source.

The site uses hash anchors for navigation, so refreshes work on GitHub Pages without a router or server rewrite. Fonts are self-hosted under their included SIL Open Font License. The site has no analytics, contact backend, or public email.

After the is-a.dev registration PR is merged, set the Pages custom domain to `isaacng.is-a.dev` and enable HTTPS. Leave the default GitHub Pages URL active during review.

Run the browser check against the preview server using a Playwright installation:

```sh
npm run preview
# In another terminal, with Playwright available:
npm run check
```

If Playwright is bundled outside the project, set `PLAYWRIGHT_MODULE` to its absolute `index.mjs` path. This keeps browser tooling out of the deployed app's dependencies.
