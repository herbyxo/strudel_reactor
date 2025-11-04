import React from 'react';

export default function InstrumentControls({ controls, onControlChange }) {
  return (
    <div className="instrument-controls">
      
      {/* P1 - Bass Line */}
      <h6>Bass Line</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1Control"
          id="p1-on"
          value="on"
          checked={controls.p1 === 'on'}
          onChange={(e) => onControlChange('p1', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p1-on">ON</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1Control"
          id="p1-hush"
          value="hush"
          checked={controls.p1 === 'hush'}
          onChange={(e) => onControlChange('p1', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p1-hush">HUSH</label>
      </div>

      {/* P2 - Main Arp */}
      <h6 style={{ marginTop: '1rem' }}>Main Arpeggio</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p2Control"
          id="p2-on"
          value="on"
          checked={controls.p2 === 'on'}
          onChange={(e) => onControlChange('p2', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p2-on">ON</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p2Control"
          id="p2-hush"
          value="hush"
          checked={controls.p2 === 'hush'}
          onChange={(e) => onControlChange('p2', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p2-hush">HUSH</label>
      </div>

      {/* P3 - Kick Drum */}
      <h6 style={{ marginTop: '1rem' }}>Kick Drum</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p3Control"
          id="p3-on"
          value="on"
          checked={controls.p3 === 'on'}
          onChange={(e) => onControlChange('p3', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p3-on">ON</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p3Control"
          id="p3-hush"
          value="hush"
          checked={controls.p3 === 'hush'}
          onChange={(e) => onControlChange('p3', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p3-hush">HUSH</label>
      </div>

      {/* P4 - Shaker */}
      <h6 style={{ marginTop: '1rem' }}>Shaker</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p4Control"
          id="p4-on"
          value="on"
          checked={controls.p4 === 'on'}
          onChange={(e) => onControlChange('p4', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p4-on">ON</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p4Control"
          id="p4-hush"
          value="hush"
          checked={controls.p4 === 'hush'}
          onChange={(e) => onControlChange('p4', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p4-hush">HUSH</label>
      </div>

      {/* P5 - Hi-Hats */}
      <h6 style={{ marginTop: '1rem' }}>Hi-Hats</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p5Control"
          id="p5-on"
          value="on"
          checked={controls.p5 === 'on'}
          onChange={(e) => onControlChange('p5', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p5-on">ON</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p5Control"
          id="p5-hush"
          value="hush"
          checked={controls.p5 === 'hush'}
          onChange={(e) => onControlChange('p5', e.target.value)}
        />
        <label className="form-check-label" htmlFor="p5-hush">HUSH</label>
      </div>
      
    </div>
  );
}