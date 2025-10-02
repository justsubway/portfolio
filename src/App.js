import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import AssessmentsSection from './components/AssessmentsSection';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
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

  const scrollToProjects = () => {
    smoothScrollTo('projects');
  };

  const handleNavigate = (sectionId) => {
    smoothScrollTo(sectionId);
  };

  return (
    <div className="App">
      <Background3D />
      <Navbar onNavigate={handleNavigate} />
      <Hero onScrollToProjects={scrollToProjects} />
      <About />
      <Projects />
      <AssessmentsSection lang="en" />
      <Contact />
    </div>
  );
}

export default App;
