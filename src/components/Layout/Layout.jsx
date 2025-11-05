import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTune } from '../../context/TuneContext';
import FileManager from '../FileManager/FileManager';
import './Layout.css';

export default function Layout({ children }) {
  const location = useLocation();
  const { rawText, setRawText } = useTune();

  const handleLoadTune = (tuneCode) => {
    setRawText(tuneCode);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-darker-grey border-bottom border-secondary">
        <div className="container-fluid">
          <span className="navbar-brand">Strudel Reactor</span>
          
          <div className="d-flex align-items-center gap-3 ms-auto">
            <div className="navbar-nav d-flex flex-row gap-3">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Editor
              </Link>
              <Link 
                to="/visualizer" 
                className={`nav-link ${location.pathname === '/visualizer' ? 'active' : ''}`}
              >
                Visualizer
              </Link>
            </div>
            
            <FileManager 
              currentTune={rawText}
              onLoadTune={handleLoadTune}
            />
          </div>
        </div>
      </nav>
      
      {children}
    </div>
  );
}