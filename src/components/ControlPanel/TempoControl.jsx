import React, { useEffect } from 'react';
import './css/TempoControl.css';

export default function TempoControl({ tempo, onTempoChange }) {
  
  // Initialize tooltips
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, []);

  const handleTempoChange = (e) => {
    const value = Number(e.target.value);
    // Ensure value is within valid range
    if (value >= 60 && value <= 200) {
      onTempoChange(value);
    } else if (e.target.value === '') {
      // Allow empty input while typing
      return;
    }
  };

  const handleBlur = (e) => {
    const value = Number(e.target.value);
    // Clamp value to valid range on blur
    if (value < 60) {
      onTempoChange(60);
    } else if (value > 200) {
      onTempoChange(200);
    } else if (isNaN(value) || e.target.value === '') {
      onTempoChange(140); // Default value
    }
  };

  return (
    <div className="tempo-control">
      <h6 className="section-title">Tempo Control</h6>
      
      <div className="tempo-input-container">
        <label 
          htmlFor="tempoInput" 
          className="form-label"
        >
          BPM:
        </label>
        
        <input 
          type="number" 
          className="form-control" 
          id="tempoInput"
          min="60" 
          max="200" 
          step="1"
          value={tempo}
          onChange={handleTempoChange}
          onBlur={handleBlur}
          data-bs-toggle="tooltip"
          title="Hold arrows to quickly change tempo"
        />
        
        <small className="text-muted d-block mt-2">
          Range: 60-200 BPM
        </small>
      </div>
    </div>
  );
}