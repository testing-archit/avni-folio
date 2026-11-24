import React from 'react';
import { Plus } from 'lucide-react';
import { employment, leadership } from '../../data/resume';

const previousRoles = [
  {
    title: 'Core Team Member, Design',
    subtitle: 'SPARK, E-Cell',
    period: 'Jul – Nov 2025',
    points: ['Designed branding and promotional materials for campus entrepreneurship events, workshops, and competitions.'],
  },
  {
    title: 'Junior Core Member, Design',
    subtitle: 'Bennett Undergraduate Research Society',
    period: 'Nov 2024 – May 2025',
    points: ['Designed visuals and digital content for research events, workshops, and outreach campaigns.'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="wrap section experience-layout" aria-labelledby="experience-title">
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
        <p>Work and campus leadership.</p>
      </div>
      <div className="experience-list">
        {[...employment, ...leadership, ...previousRoles].map(({ title, subtitle, period, points }) => (
          <details className="experience-item" key={title}>
            <summary>
              <span className="experience-role"><strong>{title}</strong><span>{subtitle}</span></span>
              <span className="experience-period">{period}</span>
              <Plus size={19} aria-hidden="true" />
            </summary>
            <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
          </details>
        ))}
      </div>
    </section>
  );
}
