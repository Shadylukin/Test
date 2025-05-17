import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  ServerIcon,
  CubeIcon,
  ShieldCheckIcon,
  MusicalNoteIcon // New icon!
} from '@heroicons/react/24/outline';

// Import pages
import Features from './pages/features';
import Pricing from './pages/pricing';
import Documentation from './pages/documentation';
import About from './pages/about';
import MusicPlayer from './pages/music-player'; // New music player page

// Auth components
import { AuthProvider, useAuth } from './AuthContext';
import AuthModal from './components/AuthModal';
import UserDropdown from './components/UserDropdown';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About />} />
            <Route path="/music-player" element={<MusicPlayer />} /> {/* New route */}
          </Routes>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
    </>
  );
}

function AuthButtons() {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return <UserDropdown />;
  }

  return (
    <div className="auth-buttons">
      <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
      <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
    </div>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <MusicalNoteIcon className="icon rotating-icon" /> {/* Changed icon and added animation */}
          <span>React+Node.JS Lite</span>
        </div>

        <nav className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/documentation">Documentation</Link>
          <Link to="/about">About</Link>
          <Link to="/music-player">Music Player</Link> {/* Added link */}
        </nav>

        <AuthButtons />

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Documentation</Link>
            <Link to="/about">About</Link>
            <Link to="/music-player">Music Player</Link> {/* Added link */}
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span>{user.email}</span>
                </div>
                <button className="btn-secondary" onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
                <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  // ... (rest of the code)
}

function FeaturesSection() {
  // ... (rest of the code)
}

function Footer() {
  // ... (rest of the code)
}
