# Deploy the portfolio on Vercel

1. Import the repository into Vercel and select **Next.js** as the Framework Preset. Use the repository root and Vercel’s default build and output settings. If reusing the old Vite project, clear any output directory override that points to `dist`.
2. Add `SITE_URL` with the full HTTPS URL if you want to select a canonical domain explicitly. By default the app uses Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel supplies when system environment variables are enabled.
3. Add the existing portfolio Web3Forms access key as `WEB3FORMS_ACCESS_KEY` for in-page contact submissions. The previous `VITE_WEB3FORMS_ACCESS_KEY` variable also works. When neither variable is configured, the form opens a draft in the visitor’s email app.
4. Deploy and check `/sitemap.xml`, `/robots.txt`, `/resume`, and a project URL on the production domain. Check that canonical and social preview URLs use the expected domain.

The homepage, résumé, and project pages are prerendered. The production sitemap lists all public pages. Preview pages are marked `noindex`.
