'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '../ui/ProjectCard';
import { categories, featuredProjectIds, portfolioItems } from '../../data/constants';

const featuredProjects = featuredProjectIds.map((id) => portfolioItems.find((item) => item.id === id));
const allProjects = [...featuredProjects, ...portfolioItems.filter(({ id }) => !featuredProjectIds.includes(id))];

export function WorkGallery({ filter = 'All', expanded = false, chooseFilter, toggleAll }) {
  const projects = filter === 'All'
    ? (expanded ? allProjects : featuredProjects)
    : allProjects.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="wrap section work-section" aria-labelledby="work-title">
      <div className="section-heading work-heading">
        <h2 id="work-title">Selected work</h2>
        <p>Brand identities, campus campaigns, and digital products.</p>
      </div>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} onClick={() => chooseFilter?.(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="project-count" role="status">{projects.length} of {allProjects.length} projects</p>
      </div>
      <div id="project-grid" className="project-grid">
        {projects.map((item) => <ProjectCard key={item.id} item={item} />)}
      </div>
      {filter === 'All' && (
        <div className="work-more">
          <button className="button button-outline" type="button" onClick={toggleAll} aria-expanded={expanded} aria-controls="project-grid">
            {expanded ? 'Show featured projects' : `View all ${allProjects.length} projects`}
            {expanded ? <ArrowUp size={17} aria-hidden="true" /> : <ArrowDown size={17} aria-hidden="true" />}
          </button>
        </div>
      )}
    </section>
  );
}

export default function PortfolioSection() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const filter = categories.includes(category) ? category : 'All';
  const expanded = searchParams.get('all') === '1';

  function updateSearch(params) {
    const { pathname, hash } = window.location;
    const query = params.size ? `?${params}` : '';
    window.history.replaceState(null, '', `${pathname}${query}${hash}`);
  }

  function chooseFilter(nextFilter) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('all');
    if (nextFilter === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', nextFilter);
    }
    updateSearch(nextParams);
  }

  function toggleAll() {
    const nextParams = new URLSearchParams(searchParams);
    if (expanded) {
      nextParams.delete('all');
      document.getElementById('portfolio')?.scrollIntoView();
    } else {
      nextParams.set('all', '1');
    }
    updateSearch(nextParams);
  }

  return <WorkGallery filter={filter} expanded={expanded} chooseFilter={chooseFilter} toggleAll={toggleAll} />;
}
