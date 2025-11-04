import React from 'react';
import './css/TransportControls.css';

export default function TransportControls({ onPlay, onStop, onProcess, onProcessAndPlay }) {
  return (
    <nav className="transport-controls">
      <div className="btn-group-vertical" role="group" style={{ width: '100%' }}>
        <button 
          onClick={onProcess} 
          className="btn btn-transport btn-transport-blue"
        >
          Preprocess
        </button>
        <button 
          onClick={onProcessAndPlay} 
          className="btn btn-transport btn-transport-green"
        >
          Proc & Play
        </button>
        <button 
          onClick={onPlay} 
          className="btn btn-transport btn-transport-green"
        >
          Play
        </button>
        <button 
          onClick={onStop} 
          className="btn btn-transport btn-transport-red"
        >
          Stop
        </button>
      </div>
    </nav>
  );
}