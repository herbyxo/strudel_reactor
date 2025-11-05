import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TuneProvider } from './context/TuneContext';
import Layout from './components/Layout/Layout';
import EditorPage from './pages/EditorPage';
import VisualiserPage from './pages/VisualiserPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <TuneProvider>

      <Layout>
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/visualizer" element={<VisualiserPage />} />
        </Routes>
      </Layout>
     
      </TuneProvider>
    </Router>
  );
}