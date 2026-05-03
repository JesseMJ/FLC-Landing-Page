import React, { useState } from 'react';
import { supabase } from '../supabase';
import './LeadForm.css';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    lotSize: 'Standard Subdivision'
  });
  
  const [services, setServices] = useState({
    'Precision Mowing': false,
    'Weed Trimming': false,
    'Sidewalk Edging': false,
    'Seasonal Spraying': false
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (serviceName) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const requestedServices = Object.keys(services).filter(s => services[s]);

    if (!formData.fullName || !formData.address || !formData.email || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please fill out all required contact fields.');
      return;
    }

    if (requestedServices.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one service.');
      return;
    }

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          full_name: formData.fullName,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          lot_size: formData.lotSize,
          services_requested: requestedServices
        }
      ]);

    if (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Failed to submit your request. Please try again later.');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <section id="lead-form-section" className="form-section success-state">
        <div className="form-container text-center">
          <h2>Request Received</h2>
          <p>Thank you for choosing Friday's Lawn Care. We will review your property digitally and reach out shortly with your rapid estimate.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form-section" className="form-section">
      <div className="form-container">
        <h2 className="form-title">Property Assessment & Estimate</h2>
        <p className="form-subtext">Enter your property details to secure your spot in our June routing schedule. We will review the site digitally and provide a rapid estimate.</p>
        
        {status === 'error' && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit} className="lead-form">
          <div className="input-group">
            <label>First & Last Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
          </div>
          
          <div className="input-group">
            <label>Service Address *</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <label>Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <label>Estimated Lot Size</label>
            <select name="lotSize" value={formData.lotSize} onChange={handleInputChange}>
              <option value="Standard Subdivision">Standard Subdivision</option>
              <option value="Half-Acre">Half-Acre</option>
              <option value="Acre+">Acre+</option>
            </select>
          </div>

          <div className="services-checklist">
            <label className="checklist-label">Services Requested *</label>
            {Object.keys(services).map(service => (
              <label key={service} className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={services[service]} 
                  onChange={() => handleCheckboxChange(service)} 
                />
                <span className="checkmark"></span>
                {service}
              </label>
            ))}
          </div>

          <button type="submit" className="submit-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Initiate Service Request'}
          </button>
        </form>
      </div>
    </section>
  );
}
