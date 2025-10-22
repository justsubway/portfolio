import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaArrowRight, FaLinkedin, FaDownload } from 'react-icons/fa';
import './Hero.css';

const overviewData = [
  { title: 'Skills', content: 'Java, Python, JavaScript, React, Spring Boot' },
  { title: 'Experience', content: 'Full-stack apps, APIs, UI/UX, Web systems' },
  { title: 'Based In', content: 'Athens, Greece' },
];

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
        whileInView="visible"
        viewport={{ amount: 0.3, once: false }}
      >
        {/* Professional title */}
        <motion.h1 className="hero-title" variants={itemVariants} custom={0}>
          George Arampatzis
        </motion.h1>

        <motion.h2 className="hero-subtitle" variants={itemVariants} custom={1}>
          Computer Science Student & Developer
        </motion.h2>

        <motion.p className="hero-tagline" variants={itemVariants} custom={2}>
          I craft modern experiences with Java, Python, and React — from UI to systems.
        </motion.p>

        {/* Professional info cards */}
        <motion.div className="hero-info" variants={itemVariants} custom={3}>
          <div className="info-grid">
            {overviewData.map((item, index) => (
              <div key={item.title} className="info-card">
                <h4 className="info-title">{item.title}</h4>
                <p className="info-content">{item.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          className="cta-button"
          onClick={onScrollToProjects}
          variants={itemVariants}
          custom={4}
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
