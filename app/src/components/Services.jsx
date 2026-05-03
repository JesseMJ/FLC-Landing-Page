import React from 'react';
import { Scissors, TreeDeciduous, Route, SprayCan } from 'lucide-react';
import './Services.css';

export default function Services() {
  const services = [
    {
      title: 'Precision Mowing',
      description: 'Exacting standards for turf health.',
      icon: <Scissors size={32} />
    },
    {
      title: 'Weed Trimming',
      description: 'Complete perimeter control.',
      icon: <TreeDeciduous size={32} />
    },
    {
      title: 'Sidewalk Edging',
      description: 'Sharp, defined property lines.',
      icon: <Route size={32} />
    },
    {
      title: 'Seasonal Spraying',
      description: 'Targeted chemical application for weed prevention.',
      icon: <SprayCan size={32} />
    }
  ];

  return (
    <section className="services-section">
      <h2 className="services-heading">Core Operations</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
