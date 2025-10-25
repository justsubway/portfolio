import React from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      title: 'Responsive Web Design',
      image: '/certification1.png',
      description: 'FreeCodeCamp certification in responsive web development and modern CSS techniques'
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      image: '/certification2.png',
      description: 'FreeCodeCamp certification in JavaScript programming and data structure implementation'
    },
    {
      title: 'Scientific Computing with Python',
      image: '/certification3.png',
      description: 'FreeCodeCamp certification in Python programming for scientific computing and data analysis'
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
