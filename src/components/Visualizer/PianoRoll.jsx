import React, { useRef, useEffect } from 'react';
import './PianoRoll.css';

export default function PianoRoll() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize canvas size when component mounts
    const canvas = canvasRef.current;
    if (canvas) {
      // Make canvas high resolution
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
      
      const ctx = canvas.getContext('2d');
      // Scale context to match the increased resolution
      ctx.scale(2, 2);
      
      console.log('Visualizer canvas initialized');
    }
  }, []);

  return (
    <div className="piano-roll-container">
      <canvas 
        ref={canvasRef} 
        id="visualizer-canvas" 
        className="piano-roll-canvas"
      />
    </div>
  );
}