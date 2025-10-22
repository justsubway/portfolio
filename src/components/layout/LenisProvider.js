import React, { useEffect } from 'react';
import Lenis from 'lenis';

const LenisProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis with inertia-based smooth scrolling
    const lenis = new Lenis({
      duration: 1.4, // Slower scroll speed for heavy, buttery feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for buttery feel
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Slightly slower mouse scroll
      smoothTouch: true, // Enable smooth touch on mobile
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1, // Lower lerp for more inertia
    });

    // Make Lenis available globally for navigation
    window.lenis = lenis;

    // Animation frame loop for smooth scrolling
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
