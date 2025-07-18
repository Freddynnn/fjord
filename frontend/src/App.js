// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MediaManager from './pages/MediaManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MediaManager />} />
      </Routes>
    </Router>
  );
}

export default App;
