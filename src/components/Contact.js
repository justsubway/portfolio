import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ParticleLoader from './ParticleLoader';
import './Contact.css';

const Contact = () => {
  const [showForm] = useState(false);
  
  // Email protection - construct email dynamically
  const getEmail = () => {
    const parts = ['geoara07', '@', 'gmail.com'];
    return parts.join('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5
  //     }
  //   }
  // };

  const slideVariants = {
    initial: { x: 0 },
    exit: { x: '-100%' }
  };

  return (
    <div className="contact" id="contact">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div 
            className="particle-section"
            variants={slideVariants}
            initial="initial"
            exit="exit"
          >
            <div className="particle-container">
              <ParticleLoader />
            </div>
            <div className="particle-caption">
              <div className="contact-buttons">
                <motion.button 
                  className="contact-button github"
                  onClick={() => window.open('https://github.com/justsubway', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                  <span>GitHub</span>
                  <FaArrowRight className="arrow-icon" />
                </motion.button>
                
                <motion.button 
                  className="contact-button linkedin"
                  onClick={() => window.open('https://www.linkedin.com/in/γιώργος-αραμπατζής-80a32b331/', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                  <FaArrowRight className="arrow-icon" />
                </motion.button>
                
                <motion.button 
                  className="contact-button email"
                  onClick={() => window.open(`mailto:${getEmail()}`, '_self')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope />
                  <span>Email</span>
                  <FaArrowRight className="arrow-icon" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Contact; 