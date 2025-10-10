import React, { useState, useCallback } from 'react';
import LenisProvider from './components/LenisProvider';
// import Intro from './components/Intro';
import Hero from './components/Hero';
import VirtualPC from './components/VirtualPC';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import GreetingOverlay from './components/GreetingOverlay';
import CustomCursor from './components/CustomCursor';
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
        <CustomCursor />
        <GreetingOverlay onDone={handleOverlayDone} />
        <Navbar onNavigate={handleNavigate} />
        <Hero onScrollToProjects={() => handleNavigate('projects')} />
        <Projects />
        <VirtualPC />
        <Contact />
      </div>
    </LenisProvider>
  );
}

export default App;
