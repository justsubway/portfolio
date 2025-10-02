import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import './Hero.css';

const overviewData = [
  { title: 'Skills', content: 'Java, Python, JavaScript, React, Spring Boot' },
  { title: 'Experience', content: 'Full-stack apps, APIs, UI/UX, Web systems' },
  { title: 'Based In', content: 'Athens, Greece' },
];

const Hero = ({ onScrollToProjects }) => {
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
    <div className="hero" id="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <motion.h1 className="hero-title" variants={itemVariants} custom={0}>
          Hey, I'm George
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants} custom={1}>
          18 y/o developer building web experiences with React & code that clicks
        </motion.p>

        <motion.button
          className="cta-button"
          onClick={onScrollToProjects}
          variants={itemVariants}
          custom={2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work <FaArrowRight style={{ marginLeft: '8px' }} />
        </motion.button>

        <motion.div className="quick-overview" variants={itemVariants} custom={3}>
          <div className="overview-card">
            <h3>Quick Overview</h3>
            <div className="overview-content">
              {overviewData.map((item, i) => (
                <div className="overview-section" key={i}>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>

            <div className="overview-links">
              <a
                href="https://github.com/justsubway"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:geoara07@gmail.com
                "
                target="_blank"
                rel="noopener noreferrer"
                title="Email"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
