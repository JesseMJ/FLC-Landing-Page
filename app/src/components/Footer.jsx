import React from 'react';
import './Footer.css';
import squareLogo from '../assets/square-logo.png';

export default function Footer() {
  return (
    <footer className="minimal-footer">
      <div className="footer-content">
        <img src={squareLogo} alt="FLC Icon" className="footer-logo" />
        <p>Serving Southwest Louisiana</p>
        <p className="powered-by">Powered by The Friday Institute</p>
      </div>
    </footer>
  );
}
