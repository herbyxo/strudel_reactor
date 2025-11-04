import React from 'react';

export default function InstrumentControls({ controls, onControlChange }) {
  const handleP1Change = (e) => {
    const value = e.target.value;
    onControlChange('p1', value);
  };

  return (
    <div className="instrument-controls">
      <h6>Instrument P1</h6>
      
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1Control"
          id="p1-on"
          value="on"
          checked={controls.p1 === 'on'}
          onChange={handleP1Change}
        />
        <label className="form-check-label" htmlFor="p1-on">
          p1: ON
        </label>
      </div>
      
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1Control"
          id="p1-hush"
          value="hush"
          checked={controls.p1 === 'hush'}
          onChange={handleP1Change}
        />
        <label className="form-check-label" htmlFor="p1-hush">
          p1: HUSH
        </label>
      </div>
    </div>
  );
}