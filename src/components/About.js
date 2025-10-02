import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = () => {
  const techStack = {
    languages: [
      { name: 'Java', badge: 'https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white' },
      { name: 'Python', badge: 'https://img.shields.io/badge/Python-3670A0?logo=python&logoColor=ffdd54' },
      { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black' },
      { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB' },
      { name: 'Spring Boot', badge: 'https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white' }
    ],
    tools: [
      { name: 'HTML5', badge: 'https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white' },
      { name: 'CSS3', badge: 'https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white' },
      { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black' },
      { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white' },
      { name: 'GitHub', badge: 'https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white' }
    ],
    creative: [
      { name: 'Photoshop', badge: 'https://img.shields.io/badge/Photoshop-31A8FF?logo=adobephotoshop&logoColor=white' },
      { name: 'Premiere Pro', badge: 'https://img.shields.io/badge/Premiere%20Pro-9999FF?logo=adobepremierepro&logoColor=white' }
    ]
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="about" id="about">
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>About Me</motion.h2>
        
        <div className="about-layout">
          {/* Hero Profile Section */}
          <motion.div className="profile-hero" variants={itemVariants}>
            <div className="profile-container">
              <div className="profile-image-wrapper">
                <img src="/portfolio/professional_pfp.jpg" alt="George Arampatzis" className="profile-image" />
                <div className="profile-glow"></div>
              </div>
              <div className="profile-info">
                <h3 className="profile-name">George Arampatzis</h3>
                <p className="profile-title">Computer Science Student & Developer</p>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">Available for opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* Main Content */}
            <motion.div className="main-content" variants={itemVariants}>
              <div className="content-card">
                <h4 className="content-title">About Me</h4>
                <div className="content-text">
                  <p>
                    I'm an 18-year-old Computer Science student with a strong passion for building impactful software. My main focus is Java & Python development, and I enjoy creating full-stack applications that solve real-world problems with clean, efficient code.
                  </p>
                  <p>
                    Currently, I'm working on exciting projects like <strong>GeoRythm</strong> (a music player web app with real-time API data), <strong>food-app</strong>, <strong>ai-resume-analyser</strong>, and <strong>discord-clone</strong>. I'm always eager to explore new technologies and deepen my understanding of modern software development practices.
                  </p>
                </div>
              </div>

              <div className="content-card">
                <h4 className="content-title">Community Impact</h4>
                <div className="content-text">
                  <p>
                    Since the age of 13 I have been part of the coding community and contributed to tens of projects. I have also contributed as a moderator in large communities (totaling over <strong>150.000+</strong> members). During that time, I have also developed large amounts of code for most of these communities, with a special contribution to the <strong>Minecraft World</strong> where I have created multiple plugins and content for Minecraft Servers.
                  </p>
                </div>
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

            {/* Tech Stack Sidebar */}
            <motion.div className="tech-sidebar" variants={itemVariants}>
              <div className="tech-card">
                <h4 className="tech-title">Languages & Frameworks</h4>
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

              <div className="tech-card">
                <h4 className="tech-title">Web & Tools</h4>
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

              <div className="tech-card">
                <h4 className="tech-title">Creative Tools</h4>
                <div className="tech-badges">
                  {techStack.creative.map(tech => (
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
                <a href="mailto:ritualhere2@gmail.com" className="contact-link" title="Email">
                  <FaEnvelope />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 