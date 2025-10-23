import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ onScrollToProjects }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

  return (
    <div className="hero" id="hero" onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMouse({ x, y });
    }}>
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting text */}
        <motion.div className="hero-greeting" variants={itemVariants} custom={0}>
          <h2 className="greeting-text">Hey, I'm George</h2>
        </motion.div>

        {/* Bold, colorful typography */}
        <motion.h1 className="mega-title" variants={itemVariants} custom={1}>
          <span className="word word-purple">Computer</span>
          <span className="word word-teal">Science</span>
          <span className="word word-orange">Student</span>
          <span className="word word-pink">&</span>
          <span className="word word-lime">Developer</span>
        </motion.h1>

        <motion.p className="hero-tagline" variants={itemVariants} custom={2}>
          I craft modern experiences with Java, Python, and React — from UI to systems.
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
};

export default Hero;