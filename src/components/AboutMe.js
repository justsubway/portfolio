import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload, FaChevronDown, FaCode, FaRocket, FaBrain, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const techStack = [
    { name: 'Java', level: 95, color: '#ED8B00' },
    { name: 'Python', level: 92, color: '#3776AB' },
    { name: 'JavaScript', level: 88, color: '#F7DF1E' },
    { name: 'React', level: 85, color: '#61DAFB' },
    { name: 'Django', level: 80, color: '#092E20' },
    { name: 'Node.js', level: 78, color: '#339933' },
    { name: 'TypeScript', level: 75, color: '#007ACC' },
    { name: 'Unity', level: 70, color: '#000000' }
  ];

  const quickStats = [
    { icon: FaCode, label: 'Repositories', value: '25+', color: '#00B8D9' },
    { icon: FaRocket, label: 'Experience', value: '5+ years', color: '#7C5CFF' },
    { icon: FaBrain, label: 'Logic Score', value: '95%', color: '#00B8D9' },
    { icon: FaHeart, label: 'Community', value: '150k+', color: '#7C5CFF' }
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
    <div className="about-me-section" id="about">
      <div className="about-me-container">
        <motion.div
          className="about-me-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {/* Hero Section - Compact Layout */}
          <motion.div className="hero-section-compact" variants={itemVariants}>
            <div className="hero-grid">
              {/* Left Side - Profile */}
              <div className="profile-section-compact">
                <div className="profile-image-wrapper">
                  <img src="/portfolio/professional_pfp.jpg" alt="George Arampatzis" className="profile-image" />
                  <div className="profile-glow"></div>
                </div>
                <div className="profile-info">
                  <h1 className="hero-title">George Arampatzis</h1>
                  <p className="hero-subtitle">Computer Science Student & Developer</p>
                  <div className="location-info">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>Athens, Greece</span>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Available for opportunities</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Quick Stats */}
              <div className="stats-section-compact">
                {quickStats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="stat-card-compact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className="stat-icon" style={{ color: stat.color }} />
                    <div className="stat-content">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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

          {/* Expandable Sections */}
          <motion.div className="expandable-sections" variants={itemVariants}>
            {/* About Section */}
            <div className="expandable-card">
              <button 
                className="expandable-header"
                onClick={() => setShowAbout(!showAbout)}
              >
                <div className="header-content">
                  <h3>About Me</h3>
                  <p>My story, passion, and journey in tech</p>
                </div>
                <motion.div
                  animate={{ rotate: showAbout ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {showAbout && (
                  <motion.div
                    className="expandable-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="content-text">
                      <p>
                        I'm an 18-year-old Computer Science student with a strong passion for building impactful software. 
                        My main focus is Java & Python development, and I enjoy creating full-stack applications that solve 
                        real-world problems with clean, efficient code.
                      </p>
                      <p>
                        Currently, I'm working on exciting projects like <strong>SuperChat</strong> (Discord clone), 
                        <strong> Georythm</strong> (music visualization), <strong>Chomp</strong> (food app), and 
                        <strong> Resumind</strong> (AI resume analyzer). I'm always eager to explore new technologies 
                        and deepen my understanding of modern software development practices.
                      </p>
                      <p>
                        Since the age of 13 I have been part of the coding community and contributed to tens of projects. 
                        I have also contributed as a moderator in large communities (totaling over <strong>150.000+</strong> members). 
                        During that time, I have also developed large amounts of code for most of these communities, with a 
                        special contribution to the <strong>Minecraft World</strong> where I have created multiple plugins 
                        and content for Minecraft Servers.
                      </p>
                      <a 
                        href="https://beacons.ai/subwayy" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="experience-link"
                      >
                        View Detailed Experience →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tech Stack Section */}
            <div className="expandable-card">
              <button 
                className="expandable-header"
                onClick={() => setShowTechStack(!showTechStack)}
              >
                <div className="header-content">
                  <h3>Tech Stack</h3>
                  <p>Languages, frameworks, and tools I work with</p>
                </div>
                <motion.div
                  animate={{ rotate: showTechStack ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {showTechStack && (
                  <motion.div
                    className="expandable-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="tech-stack-grid">
                      {techStack.map((tech, index) => (
                        <div key={tech.name} className="tech-item">
                          <div className="tech-header">
                            <span className="tech-name">{tech.name}</span>
                            <span className="tech-level">{tech.level}%</span>
                          </div>
                           <div className="tech-bar">
                             <motion.div 
                               className="tech-progress"
                               initial={{ width: 0 }}
                               animate={{ width: `${tech.level}%` }}
                               transition={{ duration: 0.8, delay: index * 0.1 }}
                               style={{ background: tech.color }}
                             />
                           </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Assessments Section */}
            <div className="expandable-card">
              <button 
                className="expandable-header"
                onClick={() => setShowAssessments(!showAssessments)}
              >
                <div className="header-content">
                  <h3>Assessments</h3>
                  <p>Cognitive and personality test results</p>
                </div>
                <motion.div
                  animate={{ rotate: showAssessments ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {showAssessments && (
                  <motion.div
                    className="expandable-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="assessments-grid">
                       <div className="assessment-card">
                         <div className="assessment-header">
                           <h4>Logic Test</h4>
                           <div className="score-circle">
                             <span>95%</span>
                           </div>
                         </div>
                         <p>Exceptional analytical and problem-solving abilities with outstanding logical reasoning skills.</p>
                         <a 
                           href="/portfolio/Alva Labs Logic Test Report - George Arampatzis.pdf" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="assessment-link"
                         >
                           View Report →
                         </a>
                       </div>

                       <div className="assessment-card">
                         <div className="assessment-header">
                           <h4>Personality Test</h4>
                           <div className="score-circle">
                             <span>92%</span>
                           </div>
                         </div>
                         <p>High emotional intelligence, strong communication skills, and excellent team collaboration abilities.</p>
                         <a 
                           href="/portfolio/Alva Labs Personality Test Report - George Arampatzis.pdf" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="assessment-link"
                         >
                           View Report →
                         </a>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div className="contact-section" variants={itemVariants}>
            <div className="contact-links">
              <a href="https://github.com/justsubway" target="_blank" rel="noopener noreferrer" className="contact-link" title="GitHub">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/γιώργος-αραμπατζής-80a32b331" target="_blank" rel="noopener noreferrer" className="contact-link" title="LinkedIn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:ritualhere2@gmail.com" className="contact-link" title="Email">
                <FaEnvelope />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;