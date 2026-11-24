import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { portfolioItems } from '../../data/constants';
import { achievements, contact, education, employment, interests, leadership, skills } from '../../data/resume';

import { pageMetadata } from '../../data/site';

export const metadata = pageMetadata('/resume', 'Résumé', 'Avni Saini’s experience, design leadership, education, technical projects, and downloadable résumé.');

const sections = {
  experience: 'Experience',
  leadership: 'Leadership',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  achievements: 'Achievements',
  additional: 'Additional information',
};

const resumeProjects = portfolioItems.filter((item) => item.resumePoints).map((item) => ({
  title: item.title,
  href: `/project/${item.slug}`,
  subtitle: item.discipline,
  period: item.year,
  points: item.resumePoints,
  tools: item.tags.join(', '),
}));

function ResumeSection({ name, children }) {
  const id = `resume-${name}`;
  const title = sections[name];
  return (
    <section id={id} className="resume-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

function ResumeEntry({ entry }) {
  const { title, subtitle, period, location, points, tools } = entry;
  return (
    <article className="resume-entry">
      <div className="resume-entry-header">
        <div><h3>{entry.href ? <Link href={entry.href} className="resume-project-link">{title}</Link> : title}</h3><p>{subtitle}</p></div>
        <div className="resume-entry-meta"><p>{period}</p>{location && <p>{location}</p>}</div>
      </div>
      {tools && <p className="resume-tools">{tools}</p>}
      {points && <ul className="resume-list">{points.map((point) => <li key={point}>{point}</li>)}</ul>}
    </article>
  );
}

export default function Resume() {
  return (
    <main id="main-content" className="wrap subpage resume-page" tabIndex={-1}>
      <Link href="/" className="text-link back-link"><ArrowLeft size={18} aria-hidden="true" /> Back to home</Link>
      <header className="resume-header">
        <div>
          <p className="project-discipline">Résumé</p>
          <h1>Avni Saini</h1>
          <p>Computer science and engineering student</p>
        </div>
        <a className="button button-primary" href="/resume.pdf" download="Avni_Saini_Resume.pdf">
          Download PDF <Download size={18} aria-hidden="true" />
        </a>
      </header>
      <div className="resume-contact">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>{contact.phone}</a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <div className="resume-layout">
        <nav className="resume-index" aria-label="Résumé sections">
          {Object.entries(sections).map(([name, label]) => <a href={`#resume-${name}`} key={name}>{label}</a>)}
        </nav>
        <div className="resume-content">
          <ResumeSection name="experience">
            {employment.map((entry) => <ResumeEntry key={entry.title} entry={entry} />)}
          </ResumeSection>
          <ResumeSection name="leadership">
            {leadership.map((entry) => <ResumeEntry key={entry.title} entry={entry} />)}
          </ResumeSection>
          <ResumeSection name="projects">
            {resumeProjects.map((entry) => <ResumeEntry key={entry.title} entry={entry} />)}
          </ResumeSection>
          <ResumeSection name="education">
            {education.map((entry) => <ResumeEntry key={entry.title} entry={entry} />)}
          </ResumeSection>
          <ResumeSection name="skills">
            <dl className="resume-skills">
              {skills.map(({ title, items }) => (
                <div key={title}><dt>{title}</dt><dd>{items.join(', ')}</dd></div>
              ))}
            </dl>
          </ResumeSection>
          <ResumeSection name="achievements">
            <ul className="resume-list">{achievements.map((item) => <li key={item}>{item}</li>)}</ul>
          </ResumeSection>
          <ResumeSection name="additional">
            <ul className="resume-list">{interests.map((item) => <li key={item}>{item}</li>)}</ul>
          </ResumeSection>
        </div>
      </div>
    </main>
  );
}
