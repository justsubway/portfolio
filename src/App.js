import React from 'react';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const smoothScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const currentPosition = window.pageYOffset;
      const targetPosition = section.offsetTop;
      const distance = targetPosition - currentPosition;
      const duration = 800;
      const startTime = performance.now();

      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, currentPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const handleNavigate = (sectionId) => {
    smoothScrollTo(sectionId);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} />
      <AboutMe />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
