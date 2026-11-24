import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ProjectCover from './ProjectCover';

export default function ProjectCard({ item }) {
  return (
    <article className="project-card">
      <Link href={`/project/${item.slug}`}>
        <ProjectCover item={item} />
        <div className="project-card-details">
          <div>
            <h3>{item.title}</h3>
            <p>{item.discipline}</p>
          </div>
          <span className="icon-button project-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
        </div>
      </Link>
    </article>
  );
}
