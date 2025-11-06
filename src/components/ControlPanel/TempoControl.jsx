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

  return (
    <div className="tempo-control">
      <h6 className="section-title">Tempo Control</h6>
      
      <div className="tempo-slider-container">
        <label 
          htmlFor="tempoRange" 
          className="form-label"
          data-bs-toggle="tooltip"
          title="Adjust the tempo (speed) of the music in beats per minute"
        >
          BPM: <strong>{tempo}</strong>
        </label>
        
        <input 
          type="range" 
          className="form-range" 
          id="tempoRange"
          min="60" 
          max="200" 
          step="5"
          value={tempo}
          onChange={(e) => onTempoChange(Number(e.target.value))}
          data-bs-toggle="tooltip"
          title={`Set tempo to ${tempo} BPM`}
        />
        
        <div className="tempo-labels">
          <small className="text-muted">60</small>
          <small className="text-muted">Slow</small>
          <small className="text-muted">Normal</small>
          <small className="text-muted">Fast</small>
          <small className="text-muted">200</small>
        </div>
      </div>
    </div>
  );
}