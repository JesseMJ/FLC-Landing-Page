import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import logoImage from './assets/logo.png';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <img src={logoImage} alt="Friday's Lawn Care Logo" className="brand-logo" />
        </div>
        <button 
          className="header-cta" 
          onClick={() => document.getElementById('lead-form-section').scrollIntoView({ behavior: 'smooth' })}
        >
          Get a Quote
        </button>
      </header>

      <main>
        <Hero />
        <Services />
        <LeadForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
