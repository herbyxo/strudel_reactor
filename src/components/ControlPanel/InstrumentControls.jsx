import React from 'react';
import './InstrumentControls.css';

export default function InstrumentControls({ controls, onControlChange }) {
  return (
    <div className="instrument-controls">
      <h6 className="section-title">Instrument Controls</h6>
      
      <div className="instruments-grid">
        {/* Row 1 */}
        <div className="instrument-item">
          <div className="instrument-label">Bass Line</div>
          <div className="radio-group-horizontal">
            <div className="form-check form-check-inline">
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
            <div className="form-check form-check-inline">
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
          </div>
        </div>

        <div className="instrument-item">
          <div className="instrument-label">Arpeggio</div>
          <div className="radio-group-horizontal">
            <div className="form-check form-check-inline">
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
            <div className="form-check form-check-inline">
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
        </div>

        <div className="instrument-item">
          <div className="instrument-label">Kick Drum</div>
          <div className="radio-group-horizontal">
            <div className="form-check form-check-inline">
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
            <div className="form-check form-check-inline">
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
          </div>
        </div>

        {/* Row 2 */}
        <div className="instrument-item">
          <div className="instrument-label">Shaker</div>
          <div className="radio-group-horizontal">
            <div className="form-check form-check-inline">
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
            <div className="form-check form-check-inline">
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
          </div>
        </div>

        <div className="instrument-item">
  <div className="instrument-label">Hi-Hats (Fast)</div>  {/* Changed this */}
  <div className="radio-group-horizontal">
    <div className="form-check form-check-inline">
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
    <div className="form-check form-check-inline">
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
</div>
      </div>
    </div>
  );
}