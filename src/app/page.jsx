import React, { Suspense } from 'react';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import HeroSection from '../components/sections/HeroSection';
import PortfolioSection, { WorkGallery } from '../components/sections/PortfolioSection';
import ServicesSection from '../components/sections/ServicesSection';
import StructuredData from '../components/ui/StructuredData';
import { pageMetadata, person, siteDescription, siteUrl } from '../data/site';

const title = 'Avni Saini | Visual Designer in Greater Noida';
export const metadata = { ...pageMetadata('/', title, siteDescription), title: { absolute: title } };

export default function Home() {
  const accessKey = (process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY)?.trim();

  return (
    <main id="main-content" tabIndex={-1}>
      <StructuredData data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: siteUrl.href, mainEntity: person }} />
      <HeroSection />
      <Suspense fallback={<WorkGallery />}>
        <PortfolioSection />
      </Suspense>
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactSection accessKey={accessKey === 'YOUR_ACCESS_KEY_HERE' ? undefined : accessKey} />
    </main>
  );
}
