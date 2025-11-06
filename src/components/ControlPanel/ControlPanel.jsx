import React from 'react';
import TransportControls from './TransportControls';
import InstrumentControls from './InstrumentControls';
import TempoControl from './TempoControl';
import EffectsControl from './EffectsControl';
import './css/ControlPanel.css';

export default function ControlPanel({ 
  controls, 
  onControlChange, 
  onPlay, 
  onStop, 
  onProcess, 
  onProcessAndPlay,
  tempo,
  onTempoChange,
  volume,
  onVolumeChange,
  reverb,
  onReverbChange,
  delay,
  onDelayChange
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
      
      <TempoControl
        tempo={tempo}
        onTempoChange={onTempoChange}
      />
      
      <hr />
      
      <EffectsControl
        volume={volume}
        onVolumeChange={onVolumeChange}
        reverb={reverb}
        onReverbChange={onReverbChange}
        delay={delay}
        onDelayChange={onDelayChange}
      />
      
      <hr />
      
      <InstrumentControls
        controls={controls}
        onControlChange={onControlChange}
      />
    </div>
  );
}