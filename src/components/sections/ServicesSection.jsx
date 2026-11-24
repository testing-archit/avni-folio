import React from 'react';
import { Aperture, Layers, Megaphone } from 'lucide-react';

const services = [
  { title: 'Brand identity', description: 'Logos and visual systems for apps, clubs, and emerging brands.', Icon: Aperture },
  { title: 'Event graphics', description: 'Posters, banners, and digital displays that carry an event’s identity across formats.', Icon: Layers },
  { title: 'Social campaigns', description: 'Social graphics for recruitment, promotions, and creative communities.', Icon: Megaphone },
];

export default function ServicesSection() {
  return (
    <section className="services-band" aria-labelledby="services-title">
      <div className="wrap section">
        <div className="section-heading"><h2 id="services-title">What I do</h2></div>
        <div className="services-grid">
          {services.map(({ title, description, Icon }) => (
            <article key={title} className="service">
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
