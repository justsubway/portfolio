import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const techStack = {
    languages: [
      { name: 'Java', badge: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white' },
      { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
      { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
      { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
      { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
      { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' }
    ],
    tools: [
      { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
      { name: 'Docker', badge: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
      { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
      { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white' },
      { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white' },
      { name: 'AWS', badge: 'https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white' }
    ],
    creative: [
      { name: 'Figma', badge: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' },
      { name: 'Photoshop', badge: 'https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?style=for-the-badge&logo=Adobe%20Photoshop&logoColor=white' },
      { name: 'Premiere Pro', badge: 'https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF?style=for-the-badge&logo=Adobe%20Premiere%20Pro&logoColor=white' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
          {/* Hero Section */}
          <motion.div className="hero-section" variants={itemVariants}>
            <div className="hero-content">
              <div className="profile-section">
                <div className="profile-image-wrapper">
                  <img src="/portfolio/professional_pfp.jpg" alt="George Arampatzis" className="profile-image" />
                  <div className="profile-glow"></div>
                </div>
                <div className="profile-info">
                  <h1 className="hero-title">George Arampatzis</h1>
                  <p className="hero-subtitle">Computer Science Student & Developer</p>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Available for opportunities</span>
                  </div>
                </div>
              </div>
              
              <div className="overview-cards">
                <div className="overview-card">
                  <h3>Skills</h3>
                  <p>Java, Python, JavaScript, React, Spring Boot</p>
                </div>
                <div className="overview-card">
                  <h3>Experience</h3>
                  <p>Full-stack apps, APIs, UI/UX, Web systems</p>
                </div>
                <div className="overview-card">
                  <h3>Based In</h3>
                  <p>Athens, Greece</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div className="about-content" variants={itemVariants}>
            <div className="content-grid">
              <div className="main-content">
                <div className="content-card">
                  <h3>About Me</h3>
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
                </div>

                <div className="content-card">
                  <h3>Community Impact</h3>
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
              </div>

              <div className="sidebar-content">
                <div className="tech-stack">
                  <h4>Languages & Frameworks</h4>
                  <div className="tech-badges">
                    {techStack.languages.map(tech => (
                      <img 
                        key={tech.name}
                        src={tech.badge}
                        alt={tech.name}
                        className="tech-badge"
                      />
                    ))}
                  </div>
                </div>

                <div className="tech-stack">
                  <h4>Tools & Databases</h4>
                  <div className="tech-badges">
                    {techStack.tools.map(tech => (
                      <img 
                        key={tech.name}
                        src={tech.badge}
                        alt={tech.name}
                        className="tech-badge"
                      />
                    ))}
                  </div>
                </div>

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
                  <a href="/portfolio/George_Arampatzis.pdf" download="George_Arampatzis_Resume.pdf" className="contact-link" title="Download Resume">
                    <FaDownload />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Assessments Section */}
          <motion.div className="assessments-section" variants={itemVariants}>
            <h3 className="assessments-title">Cognitive & Personality Assessments</h3>
            <div className="assessments-grid">
              <div className="assessment-card">
                <h4>Alva Labs Logic Test</h4>
                <div className="assessment-score">
                  <div className="score-circle">
                    <span className="score-number">85%</span>
                  </div>
                </div>
                <p className="assessment-description">
                  Strong analytical and problem-solving abilities with excellent logical reasoning skills.
                </p>
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
                <h4>Alva Labs Personality Test</h4>
                <div className="assessment-score">
                  <div className="score-circle">
                    <span className="score-number">92%</span>
                  </div>
                </div>
                <p className="assessment-description">
                  High emotional intelligence, strong communication skills, and excellent team collaboration abilities.
                </p>
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
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
