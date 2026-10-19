# Isaac Ng's portfolio

A personal, non-commercial React SPA about desktop development, business software, and knowledge tools. The folding workspace introduces three disciplines; a separate project collection carries the work.

```sh
npm ci
npm run dev
npm run check
npm run build
```

## Add a project

Edit `src/projects.js` and add a record to `projects`. Use a unique, URL-safe `id`, a discipline from `areas`, and the same content fields as the existing entries. Titles, technologies, summaries, roles and notes are ordinary content. Only add public repository links when available. The first project in each discipline supplies the opening feature. Adding projects does not add faces to the 3D object.

`npm run check` validates project content and tests combined filtering/search against a 120-entry collection. Browser interactions were separately checked in the in-app browser; see `design-qa.md`.

## Interaction and accessibility

The Three.js scene loads separately from the text/UI bundle. Drag horizontally to turn/fold it, click a panel, or focus the canvas and use Left/Right/Home. The three ordinary discipline buttons offer the same content navigation. Vertical touch scrolling is retained. Reduced motion makes state changes immediate. The static generated poster and working HTML controls remain available when WebGL cannot initialize or its context is lost.

Rendering pauses offscreen and in a hidden tab, reuses static shadow maps, and refreshes an idle visible scene at 4fps. The 3D chunk is about 138 KB gzip, separate from the initial UI. `public/assets/fold-fallback.png` is a generated fallback; provenance is documented beside it.

No analytics, contact backend, public email, or fabricated employment metrics. Fonts are self-hosted under their included SIL Open Font License.

## Hosting

Vercel imports this repository into `isaacng` and deploys `main` with the Vite preset (`npm run build`, output `dist`). The custom domain is https://isaacng.is-a.dev/; the default URL is https://isaacng.vercel.app/. The existing Actions workflow also publishes a GitHub Pages mirror.

Production updates are deployed from main after the build and browser checks pass. Hash anchors keep navigation and refreshes compatible with all three hosts.
