import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import VideoGeneratorPage from './pages/VideoGeneratorPage';
import GalleryPage from './pages/GalleryPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-gray-950">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generate" element={<VideoGeneratorPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;