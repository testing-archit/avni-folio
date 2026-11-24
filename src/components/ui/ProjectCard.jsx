import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ProjectCover from './ProjectCover';
import ProjectMotion from './ProjectMotion';

export default function ProjectCard({ item }) {
  return (
    <article className="project-card">
      {item.motion && <ProjectMotion project={item} />}
      <Link href={`/project/${item.slug}`}>
        {!item.motion && <ProjectCover item={item} />}
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
