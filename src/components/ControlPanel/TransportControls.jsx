import React, { useEffect } from 'react';
import './css/TransportControls.css';

export default function TransportControls({ onPlay, onStop }) {
  
  // Initialize tooltips
  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, []);

  return (
    <nav className="transport-controls">
      <div className="btn-group-vertical" role="group" style={{ width: '100%' }}>
        <button 
          onClick={onPlay} 
          className="btn btn-transport btn-transport-green"
          data-bs-toggle="tooltip"
          title="Process code and start playback"
        >
          Play
        </button>
        <button 
          onClick={onStop} 
          className="btn btn-transport btn-transport-red"
          data-bs-toggle="tooltip"
          title="Stop playback"
        >
          Stop
        </button>
      </div>
    </nav>
  );
}