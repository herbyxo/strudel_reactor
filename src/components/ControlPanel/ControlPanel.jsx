import React from 'react';
import TransportControls from './TransportControls';
import InstrumentControls from './InstrumentControls';
import './ControlPanel.css';

export default function ControlPanel({ 
  controls, 
  onControlChange, 
  onPlay, 
  onStop, 
  onProcess, 
  onProcessAndPlay,
  instruments  
}) {
  return (
    <div className="control-panel">
      <h5>Controls</h5>
      
      <TransportControls
        onPlay={onPlay}
        onStop={onStop}
        onProcess={onProcess}
        onProcessAndPlay={onProcessAndPlay}
      />
      
      <hr />
      
      <InstrumentControls
        controls={controls}
        onControlChange={onControlChange}
        instruments={instruments} 
      />
    </div>
  );
}