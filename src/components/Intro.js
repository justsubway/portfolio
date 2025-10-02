import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Intro.css';

const Intro = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 3D Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Color transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      'radial-gradient(circle at 20% 50%, rgba(0, 184, 217, 0.15) 0%, rgba(124, 92, 255, 0.1) 50%, #0B1220 100%)',
      'radial-gradient(circle at 50% 30%, rgba(124, 92, 255, 0.2) 0%, rgba(0, 184, 217, 0.15) 50%, #0B1220 100%)',
      'radial-gradient(circle at 80% 70%, rgba(0, 184, 217, 0.25) 0%, rgba(124, 92, 255, 0.2) 50%, #0B1220 100%)',
      'radial-gradient(circle at 30% 80%, rgba(124, 92, 255, 0.3) 0%, rgba(0, 184, 217, 0.25) 50%, #0B1220 100%)'
    ]
  );

  // Text animations
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0]);
  
  // Floating elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 1 : -1) * 100]),
    y: useTransform(scrollYProgress, [0, 1], [0, (i % 3 === 0 ? 1 : -1) * 80]),
    rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.5]),
    opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 0.8, 0.4, 0])
  }));

  return (
    <div className="intro-section" id="intro" ref={containerRef}>
      {/* Dynamic Background */}
      <motion.div 
        className="intro-background"
        style={{ background: backgroundColor }}
      />
      
      {/* 3D Container */}
      <motion.div 
        className="intro-3d-container"
        style={{
          rotateX,
          rotateY,
          scale,
          translateZ,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Main Content */}
        <motion.div 
          className="intro-content"
          style={{
            y: textY,
            opacity: textOpacity
          }}
        >
          <motion.h1 
            className="intro-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Building the Future
          </motion.h1>
          
          <motion.p 
            className="intro-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            One line of code at a time
          </motion.p>
          
          <motion.div 
            className="intro-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <p>
              Welcome to my digital universe, where creativity meets technology 
              and innovation drives every solution. I'm George, a passionate 
              developer crafting experiences that matter.
            </p>
          </motion.div>

          <motion.div 
            className="intro-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div 
              className="scroll-indicator"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="scroll-arrow"></div>
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`floating-element element-${element.id + 1}`}
            style={{
              x: element.x,
              y: element.y,
              rotate: element.rotate,
              scale: element.scale,
              opacity: element.opacity
            }}
          />
        ))}

        {/* 3D Grid */}
        <motion.div 
          className="intro-grid"
          style={{
            rotateX: useTransform(scrollYProgress, [0, 1], [0, 10]),
            rotateY: useTransform(scrollYProgress, [0, 1], [0, -5])
          }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <motion.div
              key={i}
              className="grid-cell"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.05]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8])
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Parallax Layers */}
      <motion.div 
        className="parallax-layer layer-1"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.1])
        }}
      />
      <motion.div 
        className="parallax-layer layer-2"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.05])
        }}
      />
    </div>
  );
};

export default Intro;
