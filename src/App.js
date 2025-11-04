import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EditorPage from './pages/EditorPage';
import VisualiserPage from './pages/VisualiserPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/visualizer" element={<VisualiserPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}