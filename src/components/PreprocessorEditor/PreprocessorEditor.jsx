import React from 'react';
import './PreprocessorEditor.css';

export default function PreprocessorEditor({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="preprocessor-editor">
      <label htmlFor="preprocessor-textarea" className="form-label">
        Text to preprocess:
      </label>
      <textarea
        className="form-control"
        id="preprocessor-textarea"
        rows="15"
        value={value}
        onChange={handleChange}
        placeholder="Enter your Strudel code with preprocessor tags..."
      />
    </div>
  );
}