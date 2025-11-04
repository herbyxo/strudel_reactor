import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-darker-grey border-bottom border-secondary">
        <div className="container-fluid">
          <span className="navbar-brand">Strudel Reactor</span>
          
          <div className="navbar-nav ms-auto">
            <Link 
              to="/" 
              className="nav-link active">
              Editor
            </Link>
            <Link 
              to="/visualizer" 
              className="nav-link">
              Visualizer
            </Link>
          </div>
        </div>
      </nav>
      
      {children}
    </div>
  );
}