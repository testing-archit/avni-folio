import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectCover from '../../../components/ui/ProjectCover';
import ProjectGallery from '../../../components/ui/ProjectGallery';
import StructuredData from '../../../components/ui/StructuredData';
import { portfolioItems } from '../../../data/constants';
import { pageMetadata, person, siteUrl } from '../../../data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = portfolioItems.find((item) => item.slug === slug);

  if (!project) notFound();

  return pageMetadata(`/project/${slug}`, `${project.title} — ${project.discipline}`, project.description);
}

export default async function ProjectDetails({ params }) {
  const { slug } = await params;
  const index = portfolioItems.findIndex((item) => item.slug === slug);
  const project = portfolioItems[index];

  if (!project) notFound();

  const next = portfolioItems[(index + 1) % portfolioItems.length];
  const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];

  return (
    <main id="main-content" className="wrap subpage project-page" tabIndex={-1}>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: new URL(`/project/${slug}`, siteUrl).href,
        creator: { '@id': person['@id'], '@type': 'Person', name: person.name },
        ...(project.image && { image: new URL(project.image, siteUrl).href }),
      }} />
      <Link href="/#portfolio" className="text-link back-link"><ArrowLeft size={18} aria-hidden="true" /> Back to work</Link>
      <header className="project-header">
        <p className="project-discipline">{project.discipline}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>
      <figure className="project-feature">
        <ProjectCover item={project} eager />
        <figcaption>{project.image ? 'Project artwork' : 'Editorial cover'}</figcaption>
      </figure>
      <div className="project-story">
        <section aria-labelledby="project-overview">
          <h2 id="project-overview">Overview</h2>
          {project.overview
            ? <p>{project.overview}</p>
            : <ul>{project.resumePoints.map((point) => <li key={point}>{point}</li>)}</ul>}
        </section>
        <section aria-labelledby="project-focus">
          <h2 id="project-focus">{project.year ? 'Technologies' : 'Project focus'}</h2>
          <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </section>
      </div>
      {project.caseStudy && (
        <section className="project-story" aria-labelledby="design-process">
          <div>
            <h2 id="design-process">Design process</h2>
            <p>{project.caseStudy.process}</p>
          </div>
          <div>
            <h2>My role</h2>
            <p>{project.caseStudy.role}<br />{project.caseStudy.duration}</p>
          </div>
        </section>
      )}
      {images.length > 0 && <ProjectGallery key={project.id} project={project} images={images} />}
      <nav aria-label="Next project">
        <Link className="next-project" href={`/project/${next.slug}`}>
          <div><span>Next project <ArrowRight size={15} aria-hidden="true" /></span><strong>{next.title}</strong></div>
          <span className="icon-button" aria-hidden="true"><ArrowUpRight size={26} /></span>
        </Link>
      </nav>
    </main>
  );
}
