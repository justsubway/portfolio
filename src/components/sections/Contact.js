import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import ParticleLoader from '../animations/ParticleLoader';
import './Contact.css';

const Contact = () => {
  const [showForm] = useState(false);

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
              <motion.button 
                className="github-button"
                onClick={() => window.open('https://github.com/justsubway', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                <span>GitHub</span>
                <FaArrowRight className="arrow-icon" />
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: false }}
      >
        {/* Rest of the component content */}
      </motion.div>
    </div>
  );
};

export default Contact; 