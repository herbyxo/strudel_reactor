import React from 'react';

export default function TransportControls({ onPlay, onStop, onProcess, onProcessAndPlay }) {
  return (
    <nav className="transport-controls">
      <div className="btn-group-vertical" role="group" style={{ width: '100%' }}>
        <button 
          onClick={onProcess} 
          className="btn btn-outline-primary"
        >
          Preprocess
        </button>
        <button 
          onClick={onProcessAndPlay} 
          className="btn btn-outline-success"
        >
          Proc & Play
        </button>
        <button 
          onClick={onPlay} 
          className="btn btn-outline-primary"
        >
          Play
        </button>
        <button 
          onClick={onStop} 
          className="btn btn-outline-danger"
        >
          Stop
        </button>
      </div>
    </nav>
  );
}