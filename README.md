# Avni Saini’s portfolio

A Next.js portfolio for Avni’s design and development work. The homepage, project pages, and résumé are prerendered. Project filtering runs in the browser.

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build` and `npm start` to test the production build locally.

## Update the site

- Edit projects and featured project IDs in `src/data/constants.js`.
- Edit résumé and contact details in `src/data/resume.js`. Replace `public/resume.pdf` whenever the résumé PDF changes.
- Add original project artwork under `public/images/projects/` and reference it using the project’s `image` or `gallery` fields.
- Update shared styles in `src/app/globals.css`.

The site runs independently of the legacy Express and PostgreSQL service. See [the backend README](server/README.md) if you need to run that service separately.

## Deploy

See the [Vercel deployment guide](VERCEL_DEPLOY.md) for production settings.
