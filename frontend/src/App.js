import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  ServerIcon,
  CubeIcon,
  ShieldCheckIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

// Import pages
import Features from './pages/features';
import Pricing from './pages/pricing';
import Documentation from './pages/documentation';
import About from './pages/about';
import MusicPlayer from './pages/music-player';

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
            <Route path="/music-player" element={<MusicPlayer />} />
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
          <MusicalNoteIcon className="icon rotating-icon" />
          <span>React+Node.JS Lite</span>
        </div>

        <nav className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/documentation">Documentation</Link>
          <Link to="/about">About</Link>
          <Link to="/music-player">Music Player</Link>
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
           <Link to="/music-player">Music Player</Link>
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
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Build Your SaaS Faster with React+Node.JS Lite</h1>
          <p className="hero-subtitle">A minimalist, AI-friendly template for rapid SaaS development.</p>
          <div className="hero-cta">
            <Link to="/music-player" className="btn-primary btn-large">Music Player</Link>
            <Link to="/documentation" className="btn-outline btn-large">Get Started</Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img src="/undraw_code_thinking_re_gka2.svg" alt="Hero" />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <CodeBracketIcon className="feature-icon" />,
      title: 'React Frontend',
      description: 'Lightweight and performant React components for a modern UI.'
    },
    {
      icon: <ServerIcon className="feature-icon" />,
      title: 'Node.js Backend',
      description: 'Serverless functions for a scalable and cost-effective backend.'
    },
    {
      icon: <CubeIcon className="feature-icon" />,
      title: 'Database Integration',
      description: 'Easy integration with MongoDB for data persistence.'
    },
    {
      icon: <ShieldCheckIcon className="feature-icon" />,
      title: 'Authentication',
      description: 'Secure authentication with Supabase for user management.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <MusicalNoteIcon className="icon rotating-icon" />
            <span>React+Node.JS Lite</span>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Docs</Link>
            <Link to="/about">About</Link>
            <Link to="/music-player">Music Player</Link>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} React+Node.JS Lite. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
