import React, { useState, useEffect } from 'react';
import './FileManager.css';

export default function FileManager({ currentTune, onLoadTune }) {
  const [savedTunes, setSavedTunes] = useState([]);
  const [tuneName, setTuneName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Load saved tunes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedTunes');
    if (saved) {
      setSavedTunes(JSON.parse(saved));
    }
  }, []);

  // Save current tune
  const handleSave = () => {
    if (!tuneName.trim()) {
      alert('Please enter a name for the tune');
      return;
    }

    const newTune = {
      name: tuneName,
      code: currentTune,
      date: new Date().toISOString()
    };

    const updatedTunes = [...savedTunes, newTune];
    setSavedTunes(updatedTunes);
    localStorage.setItem('savedTunes', JSON.stringify(updatedTunes));
    setTuneName('');
    alert(`Tune "${tuneName}" saved!`);
  };

  // Load a tune
  const handleLoad = (tune) => {
    setIsOpen(false);
    if (window.confirm(`Load tune "${tune.name}"?`)) {
      onLoadTune(tune.code);
    }
  };

  // Delete a tune
  const handleDelete = (index, event) => {
    event.stopPropagation(); // Prevent dropdown from closing
    if (window.confirm(`Delete tune "${savedTunes[index].name}"?`)) {
      const updatedTunes = savedTunes.filter((_, i) => i !== index);
      setSavedTunes(updatedTunes);
      localStorage.setItem('savedTunes', JSON.stringify(updatedTunes));
    }
  };

  return (
    <div className="file-manager">
      {/* Dropdown showing saved tunes */}
      <div className="dropdown">
        <button 
          className="btn btn-sm btn-outline-secondary dropdown-toggle" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          Saved Tunes ({savedTunes.length})
        </button>
        
        {isOpen && (
          <ul className="dropdown-menu dropdown-menu-dark show">
            {savedTunes.length === 0 ? (
              <li><span className="dropdown-item-text">No saved tunes</span></li>
            ) : (
              savedTunes.map((tune, index) => (
                <li key={index}>
                  <div className="dropdown-item-custom">
                    <button 
                      className="btn btn-sm btn-link text-light"
                      onClick={() => handleLoad(tune)}
                    >
                      {tune.name}
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(index, e)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Save new tune */}
      <div className="save-tune-section mt-2">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Enter tune name..."
          value={tuneName}
          onChange={(e) => setTuneName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
        />
        <button 
          className="btn btn-sm btn-success mt-1"
          onClick={handleSave}
        >
          Save Current Tune
        </button>
      </div>
    </div>
  );
}