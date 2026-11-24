import { portfolioItems } from '../data/constants';
import { siteUrl } from '../data/site';

export default function sitemap() {
  return ['/', '/resume', ...portfolioItems.map(({ id }) => `/project/${id}`)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
