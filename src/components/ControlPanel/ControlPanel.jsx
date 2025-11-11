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
  tempo,
  onTempoChange,
  volume,
  onVolumeChange,
  reverb,
  onReverbChange
}) {
  return (
    <div className="control-panel">
      <h5>Controls</h5>
      
      {/* Bootstrap Accordion */}
      <div className="accordion accordion-dark" id="controlAccordion">
        
        {/* Transport Controls */}
        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingTransport">
            <button 
              className="accordion-button bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseTransport" 
              aria-expanded="true" 
              aria-controls="collapseTransport"
            >
              Playback
            </button>
          </h2>
          <div 
            id="collapseTransport" 
            className="accordion-collapse collapse show" 
            aria-labelledby="headingTransport" 
            data-bs-parent="#controlAccordion"
          >
            <div className="accordion-body">
              <TransportControls
                onPlay={onPlay}
                onStop={onStop}
              />
            </div>
          </div>
        </div>

        {/* Tempo Control */}
        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingTempo">
            <button 
              className="accordion-button collapsed bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseTempo" 
              aria-expanded="false" 
              aria-controls="collapseTempo"
            >
              Tempo
            </button>
          </h2>
          <div 
            id="collapseTempo" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingTempo" 
            data-bs-parent="#controlAccordion"
          >
            <div className="accordion-body">
              <TempoControl
                tempo={tempo}
                onTempoChange={onTempoChange}
              />
            </div>
          </div>
        </div>

        {/* Effects Control */}
        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingEffects">
            <button 
              className="accordion-button collapsed bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseEffects" 
              aria-expanded="false" 
              aria-controls="collapseEffects"
            >
              Effects & Volume
            </button>
          </h2>
          <div 
            id="collapseEffects" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingEffects" 
            data-bs-parent="#controlAccordion"
          >
            <div className="accordion-body">
              <EffectsControl
                volume={volume}
                onVolumeChange={onVolumeChange}
                reverb={reverb}
                onReverbChange={onReverbChange}
              />
            </div>
          </div>
        </div>

        {/* Instrument Controls */}
        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingInstruments">
            <button 
              className="accordion-button collapsed bg-dark text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseInstruments" 
              aria-expanded="false" 
              aria-controls="collapseInstruments"
            >
              Instruments
            </button>
          </h2>
          <div 
            id="collapseInstruments" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingInstruments" 
            data-bs-parent="#controlAccordion"
          >
            <div className="accordion-body">
              <InstrumentControls
                controls={controls}
                onControlChange={onControlChange}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}