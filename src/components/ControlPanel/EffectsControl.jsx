import React, { useEffect } from 'react';
import './css/EffectsControl.css';

export default function EffectsControl({ volume, reverb, delay, onVolumeChange, onReverbChange, onDelayChange }) {
  
  // Initialize tooltips
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, []);

  return (
    <div className="effects-control">
      <h6 className="section-title">Effects & Volume</h6>
      
      {/* Master Volume */}
      <div className="effect-slider-container">
        <label 
          htmlFor="volumeRange" 
          className="form-label"
          data-bs-toggle="tooltip"
          title="Master volume control - adjusts overall output level"
        >
          🔊 Volume: <strong>{volume}%</strong>
        </label>
        <input 
          type="range" 
          className="form-range" 
          id="volumeRange"
          min="0" 
          max="100" 
          step="5"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <small className="text-muted">Silent</small>
          <small className="text-muted">Normal</small>
          <small className="text-muted">Loud</small>
        </div>
      </div>

      {/* Reverb */}
      <div className="effect-slider-container">
        <label 
          htmlFor="reverbRange" 
          className="form-label"
          data-bs-toggle="tooltip"
          title="Room reverb effect - adds space and depth to the sound"
        >
          Reverb: <strong>{reverb}%</strong>
        </label>
        <input 
          type="range" 
          className="form-range" 
          id="reverbRange"
          min="0" 
          max="100" 
          step="5"
          value={reverb}
          onChange={(e) => onReverbChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <small className="text-muted">Dry</small>
          <small className="text-muted">Wet</small>
        </div>
      </div>

      {/* Delay/Echo */}
      <div className="effect-slider-container">
        <label 
          htmlFor="delayRange" 
          className="form-label"
          data-bs-toggle="tooltip"
          title="Delay/echo effect - creates repeating echoes"
        >
          Delay: <strong>{delay}%</strong>
        </label>
        <input 
          type="range" 
          className="form-range" 
          id="delayRange"
          min="0" 
          max="100" 
          step="5"
          value={delay}
          onChange={(e) => onDelayChange(Number(e.target.value))}
        />
        <div className="slider-labels">
          <small className="text-muted">None</small>
          <small className="text-muted">Echo</small>
        </div>
      </div>
    </div>
  );
}