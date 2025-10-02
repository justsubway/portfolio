import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDownload, FaLinkedin } from 'react-icons/fa';
import './Intro.css';

const Intro = () => {
  const quickStats = [
    { label: 'Repositories', value: '20+' },
    { label: 'Experience', value: '5+ years' },
    { label: 'Logic Score', value: '95%' },
    { label: 'Community', value: '150k+' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="intro-section" id="intro">
      <div className="intro-container">
        <motion.div
          className="intro-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {/* Profile Section */}
          <motion.div className="profile-section" variants={itemVariants}>
            <div className="profile-image-wrapper">
              <img src="/portfolio/professional_pfp.jpg" alt="George Arampatzis" className="profile-image" />
              <div className="profile-glow"></div>
            </div>
            <div className="profile-info">
              <h1 className="intro-title">George Arampatzis</h1>
              <p className="intro-subtitle">Computer Science Student & Developer</p>
              <div className="location-info">
                <FaMapMarkerAlt className="location-icon" />
                <span>Athens, Greece</span>
              </div>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">Available for opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="stats-grid" variants={itemVariants}>
            {quickStats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="stat-card"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="action-buttons" variants={itemVariants}>
            <a 
              href="/portfolio/George_Arampatzis.pdf" 
              download="George_Arampatzis_Resume.pdf" 
              className="primary-button"
            >
              <FaDownload />
              <span>Download Resume</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/γιώργος-αραμπατζής-80a32b331" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-button"
            >
              <FaLinkedin />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
