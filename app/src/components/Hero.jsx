import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('lead-form-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-headline">We Drop In. We Clear the Turf. You Keep Your Weekend.</h1>
        <p className="hero-subheadline">
          Rapid, Reliable, Precision Lawn Care for Southwest Louisiana. No Friction, Just Results.
        </p>
        <button onClick={scrollToForm} className="cta-button">
          Secure Your June Slot
        </button>
      </div>
    </section>
  );
}
