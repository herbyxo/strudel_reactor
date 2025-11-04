import React, { useEffect } from 'react';
import { drawPianoroll } from '@strudel/draw';
import './PianoRoll.css';

export default function PianoRoll() {
  useEffect(() => {
    const canvas = document.getElementById('roll');
    if (!canvas) return;

   
    const width = canvas.clientWidth || 800;
    const height = 200;

    canvas.width = width * 2;   // hi-res
    canvas.height = height * 2;

    const ctx = canvas.getContext('2d');

    const handleDraw = (event) => {
      const { haps, time, drawTime = [-2, 2] } = event.detail || {};
      if (!ctx || !haps) return;

      // Clear previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPianoroll({
        haps,
        time,
        ctx,
        drawTime,
        fold: 0,
      });
    };

    window.addEventListener('strudelDraw', handleDraw);
    return () => window.removeEventListener('strudelDraw', handleDraw);
  }, []);

  return (
    <div className="piano-roll-container">
      <canvas id="roll" className="piano-roll-canvas"></canvas>
    </div>
  );
}
