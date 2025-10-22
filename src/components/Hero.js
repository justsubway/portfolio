import React from 'react';
import { motion } from 'framer-motion';
import TerminalContent from './TerminalContent';
import './Hero.css';

const Hero = ({ onScrollToProjects }) => {
  return (
    <div className="hero" id="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TerminalContent onScrollToProjects={onScrollToProjects} />
      </motion.div>
    </div>
  );
};

export default Hero;
