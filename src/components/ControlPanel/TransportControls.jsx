import React, { useEffect } from 'react';
import './css/TransportControls.css';

export default function TransportControls({ onPlay, onStop, onProcess, onProcessAndPlay }) {
  
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
          onClick={onProcess} 
          className="btn btn-transport btn-transport-blue"
          data-bs-toggle="tooltip"
          title="Process code with current settings"
        >
          Preprocess
        </button>
        <button 
          onClick={onProcessAndPlay} 
          className="btn btn-transport btn-transport-green"
          data-bs-toggle="tooltip"
          title="Process and start playing"
        >
          Proc & Play
        </button>
        <button 
          onClick={onPlay} 
          className="btn btn-transport btn-transport-green"
          data-bs-toggle="tooltip"
          title="Start playback"
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