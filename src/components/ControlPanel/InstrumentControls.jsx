import React from 'react';

export default function InstrumentControls({ controls, onControlChange, instruments = [] }) {
  return (
    <div className="instrument-controls">
      {/* P1 Controls */}
      <h6>Instrument P1</h6>
      
      {/* P1 Dropdown */}
      <div className="mb-2">
        <label htmlFor="p1-select" className="form-label small">Select Instrument:</label>
        <select
          className="form-select form-select-sm"
          id="p1-select"
          value={controls.p1_instrument || 'drums'}
          onChange={(e) => onControlChange('p1_instrument', e.target.value)}
        >
          {instruments.map(inst => (
            <option key={inst.id} value={inst.id}>{inst.name}</option>
          ))}
        </select>
      </div>
      
      {/* P1 Radio Buttons */}
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

      {/* P2 Controls */}
      <h6 style={{ marginTop: '1.5rem' }}>Instrument P2</h6>
      
      {/* P2 Dropdown */}
      <div className="mb-2">
        <label htmlFor="p2-select" className="form-label small">Select Instrument:</label>
        <select
          className="form-select form-select-sm"
          id="p2-select"
          value={controls.p2_instrument || 'drums2'}
          onChange={(e) => onControlChange('p2_instrument', e.target.value)}
        >
          {instruments.map(inst => (
            <option key={inst.id} value={inst.id}>{inst.name}</option>
          ))}
        </select>
      </div>
      
      {/* P2 Radio Buttons */}
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
    </div>
  );
}