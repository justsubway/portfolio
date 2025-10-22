import React from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      title: 'Alva Labs Logic Test',
      image: '/certification1.png',
      description: 'Advanced logical reasoning and problem-solving certification'
    },
    {
      title: 'Alva Labs Personality Test',
      image: '/certification2.png',
      description: 'Professional personality assessment and behavioral analysis certification'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="certifications-section" id="certifications">
      <div className="certifications-container">
        <motion.div 
          className="certifications-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
        >
          <motion.h2 className="certifications-title" variants={itemVariants}>
            Certifications
          </motion.h2>
          
          <motion.div 
            className="certifications-grid"
            variants={itemVariants}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="certification-card"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="certification-image-container">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="certification-image"
                  />
                </div>
                <div className="certification-info">
                  <h3 className="certification-title">{cert.title}</h3>
                  <p className="certification-description">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
