import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, portfolioItems } from '../../data/constants';
import { pageMetadata } from '../../data/site';

export const metadata = pageMetadata('/work', 'Design and development projects', 'Browse Avni Saini’s design and development portfolio, from app logos and campus event campaigns to railway safety and blockchain projects.');

export default function Work() {
  return (
    <main className="wrap subpage" id="main-content" tabIndex={-1}>
      <header className="project-header">
        <h1>Project index</h1>
        <p>Avni Saini’s work in visual design and software development.</p>
      </header>
      {categories.filter((category) => category !== 'All').map((category) => (
        <section key={category} className="work-index-group">
          <h2>{category}</h2>
          <ul>
            {portfolioItems.filter((project) => project.category === category).map((project) => (
              <li key={project.slug}>
                <Link href={`/project/${project.slug}`}>
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                  <ArrowUpRight aria-hidden="true" size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
