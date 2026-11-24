import { contact } from './resume';

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  process.env.SITE_URL || (productionDomain ? `https://${productionDomain}` : 'http://localhost:3000')
);
export const siteTitle = 'Avni Saini';
export const siteDescription = 'Explore Avni Saini’s brand identities, event graphics, and software projects. Avni is a visual designer and computer science student at Bennett University in Greater Noida.';
export const isPreview = process.env.VERCEL_ENV === 'preview';

export const person = {
  '@type': 'Person',
  '@id': new URL('/#avni-saini', siteUrl).href,
  name: siteTitle,
  url: siteUrl.href,
  image: new URL('/profile-image.jpeg', siteUrl).href,
  jobTitle: 'Visual designer',
  alumniOf: { '@type': 'School', name: 'Pinewood School' },
  sameAs: [contact.linkedin, contact.github, contact.instagram],
  knowsAbout: ['Visual design', 'Brand identity', 'Event graphics', 'Computer science'],
};

export function pageMetadata(path, title, description) {
  const socialTitle = path === '/' ? title : `${title} | ${siteTitle}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: siteTitle,
      locale: 'en_IN',
      title: socialTitle,
      description,
      url: path,
      images: [{
        url: '/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Avni Saini, visual designer',
      }],
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: ['/social-preview.png'] },
  };
}
