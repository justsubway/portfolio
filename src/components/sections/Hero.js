import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaArrowRight, FaLinkedin, FaDownload } from 'react-icons/fa';
import './Hero.css';

const overviewData = [
  { title: 'Skills', content: 'Java, Python, JavaScript, React, Spring Boot' },
  { title: 'Experience', content: 'Full-stack apps, APIs, UI/UX, Web systems' },
  { title: 'Based In', content: 'Athens, Greece' },
];

const Hero = React.memo(({ onScrollToProjects }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mouseTimeoutRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const handleMouseMove = useCallback((e) => {
    if (mouseTimeoutRef.current) {
      cancelAnimationFrame(mouseTimeoutRef.current);
    }
    mouseTimeoutRef.current = requestAnimationFrame(() => {
      if (!e.currentTarget) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMouse({ x, y });
    });
  }, []);

  // Cleanup animation frame on unmount
  React.useEffect(() => {
    return () => {
      if (mouseTimeoutRef.current) {
        cancelAnimationFrame(mouseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="hero" id="hero" onMouseMove={handleMouseMove}>
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
      >
        {/* Hey, I'm George */}
        <motion.h2 className="hey-text" variants={itemVariants} custom={0}>
          Hey, I'm George
        </motion.h2>

        {/* Bold, colorful typography */}
        <motion.h1 className="mega-title" variants={itemVariants} custom={1}>
          <span className="word word-purple">Computer</span>
          <span className="word word-teal">Science</span>
          <span className="word word-orange">Student</span>
          <span className="word word-pink">&</span>
          <span className="word word-lime">Developer</span>
        </motion.h1>

        <motion.p className="hero-tagline" variants={itemVariants} custom={2}>
            Want to learn more about me? Scroll below!
        </motion.p>

        <motion.button
          className="cta-button"
          onClick={onScrollToProjects}
          variants={itemVariants}
          custom={3}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work <FaArrowRight style={{ marginLeft: '8px' }} />
        </motion.button>
      </motion.div>
    </div>
  );
});

export default Hero;
