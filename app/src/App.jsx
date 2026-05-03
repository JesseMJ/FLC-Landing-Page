import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="landing-page">
      <header className="main-header">
        <div className="logo-placeholder">
          {/* Using FLC text placeholder until we load the actual image */}
          <span className="logo-f">F</span>
          <span className="logo-l">L</span>
          <span className="logo-c">C</span>
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
