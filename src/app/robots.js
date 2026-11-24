import { isPreview, siteUrl } from '../data/site';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: isPreview ? undefined : new URL('/sitemap.xml', siteUrl).href,
  };
}
