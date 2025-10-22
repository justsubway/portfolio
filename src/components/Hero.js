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
        {/* Bold, colorful typography */}
        <motion.h1 className="mega-title" variants={itemVariants} custom={0}>
          <span className="word word-purple">Computer</span>
          <span className="word word-teal">Science</span>
          <span className="word word-orange">Student</span>
          <span className="word word-pink">&</span>
          <span className="word word-lime">Developer</span>
        </motion.h1>

        <motion.p className="hero-tagline" variants={itemVariants} custom={1}>
          I craft modern experiences with Java, Python, and React — from UI to systems.
        </motion.p>

        {/* Floating labels / tags with light parallax */}
        <div className="floating-labels">
          {[
            { text: 'Hello, I\'m George',        cls: 'pill-pink',  x: '8%',  y: '15%',  mx: 12, my: 8 },
            { text: 'CS Student',                cls: 'pill-blue',  x: '85%',  y: '20%',  mx: -15, my: 6 },
            { text: 'Athens, Greece',            cls: 'pill-green', x: '5%',  y: '85%',  mx: 10, my: -6 },
            { text: '@justsubway',               cls: 'pill-orange',x: '88%',  y: '80%',  mx: -12, my: -8 },
            { text: 'Developer',                 cls: 'pill-purple',x: '12%',  y: '45%',  mx: 8, my: -5 },
            { text: 'React & Java',              cls: 'pill-cyan',  x: '82%',  y: '50%',  mx: -10, my: 7 },
          ].map((pill, i) => (
            <motion.span
              key={pill.text}
              className={`floating-pill ${pill.cls}`}
              style={{
                left: pill.x,
                top: pill.y,
                transform: `translate(${Math.round(mouse.x * pill.mx)}px, ${Math.round(mouse.y * pill.my)}px)`
              }}
              data-cursor={pill.cls.replace('pill-','')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            >
              {pill.text}
            </motion.span>
          ))}
        </div>

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
      </motion.div>
    </div>
  );
};

export default Hero;
