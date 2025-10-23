import React, { useState, useCallback } from 'react';
import LenisProvider from './components/layout/LenisProvider';
// import Intro from './components/legacy/Intro';
import Hero from './components/sections/Hero';
import VirtualPC from './components/ui/VirtualPC';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Navbar from './components/ui/Navbar';
import GreetingOverlay from './components/animations/GreetingOverlay';
import './App.css';

function App() {
  const [overlayDone, setOverlayDone] = useState(false);
  const handleOverlayDone = useCallback(() => setOverlayDone(true), []);
  const smoothScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use Lenis for smooth scrolling
      const lenis = window.lenis;
      if (lenis) {
        lenis.scrollTo(section, {
          offset: -80, // Account for navbar height
          duration: 1.5, // Slower, more buttery scroll
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        });
      } else {
        // Fallback to native smooth scroll
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleNavigate = (sectionId) => {
    smoothScrollTo(sectionId);
  };

  return (
    <LenisProvider>
      <div className="App">
        <GreetingOverlay onDone={handleOverlayDone} />
        <Navbar onNavigate={handleNavigate} />
        <Hero onScrollToProjects={() => handleNavigate('projects')} />
        <Projects />
        <Certifications />
        <VirtualPC />
        <Contact />
      </div>
    </LenisProvider>
  );
}

export default App;
