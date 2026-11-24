import { portfolioItems } from '../data/constants';
import { siteUrl } from '../data/site';

export default function sitemap() {
  return ['/', '/work', '/resume', ...portfolioItems.map(({ slug }) => `/project/${slug}`)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
