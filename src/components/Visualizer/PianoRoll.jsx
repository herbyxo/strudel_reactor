import React from 'react';
import './PianoRoll.css';

export default function PianoRoll() {
  return (
    <div className="piano-roll-container">
      <canvas id="roll" className="piano-roll-canvas"></canvas>
    </div>
  );
}