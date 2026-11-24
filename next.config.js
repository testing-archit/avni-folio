import { portfolioItems } from './src/data/constants.js';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default {
  async redirects() {
    return portfolioItems.map(({ id, slug }) => ({
      source: `/project/${id}`,
      destination: `/project/${slug}`,
      permanent: true,
    }));
  },
  turbopack: { root },
  outputFileTracingRoot: root,
};
