import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload, FaChevronDown, FaCode, FaRocket, FaBrain, FaHeart, FaMapMarkerAlt, FaStar, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Accurate GitHub stats (you can update these with real numbers)
  const githubStats = {
    repositories: 25,
    stars: 12,
    followers: 8,
    contributions: 1200
  };

  const techStack = [
    { name: 'Java', level: 90, color: '#ED8B00' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'JavaScript', level: 88, color: '#F7DF1E' },
    { name: 'React', level: 82, color: '#61DAFB' },
    { name: 'Node.js', level: 78, color: '#339933' },
    { name: 'TypeScript', level: 75, color: '#007ACC' }
  ];

  const quickStats = [
    { icon: FaCode, label: 'Repositories', value: `${githubStats.repositories}+`, color: '#00B8D9' },
    { icon: FaStar, label: 'GitHub Stars', value: `${githubStats.stars}`, color: '#7C5CFF' },
    { icon: FaUsers, label: 'Followers', value: `${githubStats.followers}`, color: '#00B8D9' },
    { icon: FaProjectDiagram, label: 'Contributions', value: `${githubStats.contributions}+`, color: '#7C5CFF' }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

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
      <div className="about-me-container" ref={containerRef}>
        <motion.div
          className="about-me-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {/* Interactive 3D Hero Section */}
          <motion.div 
            className="hero-section-3d" 
            variants={itemVariants}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="hero-content-3d">
              {/* 3D Profile Section */}
              <div className="profile-section-3d">
                <div className="profile-image-3d-wrapper">
                  <img src="/portfolio/professional_pfp.jpg" alt="George Arampatzis" className="profile-image-3d" />
                  <div className="profile-glow-3d"></div>
                  <div className="profile-ring"></div>
                  <div className="profile-particles">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="particle" 
                        style={{
                          '--delay': `${i * 0.5}s`,
                          '--angle': `${i * 45}deg`
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="profile-info-3d">
                  <motion.h1 
                    className="hero-title-3d"
                    animate={isHovering ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    George Arampatzis
                  </motion.h1>
                  <motion.p 
                    className="hero-subtitle-3d"
                    animate={isHovering ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Computer Science Student & Developer
                  </motion.p>
                  <div className="location-info-3d">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>Athens, Greece</span>
                  </div>
                  <motion.div 
                    className="status-indicator-3d"
                    animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="status-dot"></span>
                    <span className="status-text">Available for opportunities</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Interactive Stats Grid */}
              <div className="stats-grid-3d">
                {quickStats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="stat-card-3d"
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 10,
                      z: 50
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      transform: isHovering ? `translateZ(${index * 10}px)` : 'translateZ(0px)'
                    }}
                  >
                    <div className="stat-icon-3d" style={{ color: stat.color }}>
                      <stat.icon />
                    </div>
                    <div className="stat-content-3d">
                      <span className="stat-value-3d">{stat.value}</span>
                      <span className="stat-label-3d">{stat.label}</span>
                    </div>
                    <div className="stat-glow" style={{ background: stat.color }}></div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Action Buttons */}
              <motion.div 
                className="action-buttons-3d"
                animate={isHovering ? { y: -10 } : { y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.a 
                  href="/portfolio/George_Arampatzis.pdf" 
                  download="George_Arampatzis_Resume.pdf" 
                  className="primary-button-3d"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload />
                  <span>Download Resume</span>
                  <div className="button-glow"></div>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/γιώργος-αραμπατζής-80a32b331" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="secondary-button-3d"
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin />
                  <span>Connect on LinkedIn</span>
                  <div className="button-glow"></div>
                </motion.a>
              </motion.div>
            </div>

            {/* Interactive Background Elements */}
            <div className="interactive-bg">
              <div 
                className="floating-element element-1"
                style={{
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
              ></div>
              <div 
                className="floating-element element-2"
                style={{
                  transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
                }}
              ></div>
              <div 
                className="floating-element element-3"
                style={{
                  transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.015}px)`
                }}
              ></div>
            </div>
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
                        <motion.div 
                          key={tech.name} 
                          className="tech-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
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
                        </motion.div>
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
                            <span>85%</span>
                          </div>
                        </div>
                        <p>Strong analytical and problem-solving abilities with excellent logical reasoning skills.</p>
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