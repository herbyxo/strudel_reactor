import React from 'react';
import PianoRoll from '../components/Visualizer/PianoRoll';

export default function VisualizerPage() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <div className="container-fluid py-4">
        <h2 className="mb-4">Visualizer</h2>
        
        <div className="row">
          <div className="col-12">
            <div className="card bg-darker-grey shadow-sm">
              <div className="card-header bg-dark-grey">
                <strong className="text-light">Piano Roll</strong>
              </div>
              <div className="card-body">
                <PianoRoll />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}