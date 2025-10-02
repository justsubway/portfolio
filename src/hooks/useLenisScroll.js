import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export const useLenisScroll = () => {
  const [lenis, setLenis] = useState(null);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    // Wait for Lenis to be available
    const checkLenis = () => {
      if (window.lenis) {
        setLenis(window.lenis);
        
        // Listen to Lenis scroll events
        const unsubscribe = window.lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
          scrollY.set(scroll);
          scrollYProgress.set(progress);
        });

        return unsubscribe;
      } else {
        // Retry after a short delay
        setTimeout(checkLenis, 100);
      }
    };

    const unsubscribe = checkLenis();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [scrollY, scrollYProgress]);

  // Create spring-based values for smoother animations
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const scrollYProgressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return {
    lenis,
    scrollY: scrollYSpring,
    scrollYProgress: scrollYProgressSpring,
    scrollYRaw: scrollY,
    scrollYProgressRaw: scrollYProgress,
  };
};
