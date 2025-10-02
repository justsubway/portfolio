import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaDownload, FaChevronDown } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const techStack = [
    // Languages & Frameworks
    { 
      icon: '☕', 
      name: 'Java', 
      description: 'Enterprise-grade backend development',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '🐍', 
      name: 'Python', 
      description: 'Data science and automation',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '⚡', 
      name: 'JavaScript', 
      description: 'The language that powers the web',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '⚛️', 
      name: 'React', 
      description: 'Building dynamic user interfaces',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '🚀', 
      name: 'Spring Boot', 
      description: 'Rapid Java application development',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '📱', 
      name: 'React Native', 
      description: 'Cross-platform mobile development',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '🟢', 
      name: 'Node.js', 
      description: 'JavaScript on the server side',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '🎨', 
      name: 'Three.js', 
      description: '3D graphics in the browser',
      category: 'Languages & Frameworks'
    },
    { 
      icon: '🔷', 
      name: 'TypeScript', 
      description: 'JavaScript but better',
      category: 'Languages & Frameworks'
    },
    
    // Web & Tools
    { 
      icon: '🌐', 
      name: 'HTML5', 
      description: 'The foundation of the web',
      category: 'Web & Tools'
    },
    { 
      icon: '🎨', 
      name: 'CSS3', 
      description: 'Making websites beautiful',
      category: 'Web & Tools'
    },
    { 
      icon: '🔥', 
      name: 'Firebase', 
      description: 'Backend-as-a-Service platform',
      category: 'Web & Tools'
    },
    { 
      icon: '📦', 
      name: 'Tailwind CSS', 
      description: 'Utility-first CSS framework',
      category: 'Web & Tools'
    },
    { 
      icon: '🗄️', 
      name: 'MySQL', 
      description: 'Relational database management',
      category: 'Web & Tools'
    },
    { 
      icon: '🍃', 
      name: 'MongoDB', 
      description: 'NoSQL document database',
      category: 'Web & Tools'
    },
    { 
      icon: '🔧', 
      name: 'Git', 
      description: 'Version control made simple',
      category: 'Web & Tools'
    },
    { 
      icon: '🐙', 
      name: 'GitHub', 
      description: 'Code collaboration platform',
      category: 'Web & Tools'
    },
    
    // Creative Tools
    { 
      icon: '🛍️', 
      name: 'Shopify', 
      description: 'E-commerce platform development',
      category: 'Creative Tools'
    },
    { 
      icon: '🎨', 
      name: 'Photoshop', 
      description: 'Digital image editing mastery',
      category: 'Creative Tools'
    },
    { 
      icon: '🎬', 
      name: 'Premiere Pro', 
      description: 'Professional video editing',
      category: 'Creative Tools'
    }
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
                           <div className="tech-stack-cards">
                             {['Languages & Frameworks', 'Web & Tools', 'Creative Tools'].map((category) => (
                               <div key={category} className="tech-category">
                                 <h4 className="tech-category-title">{category}</h4>
                                 <div className="tech-cards-grid">
                                   {techStack
                                     .filter(tech => tech.category === category)
                                     .map((tech, index) => (
                                       <motion.div
                                         key={tech.name}
                                         className="tech-card"
                                         initial={{ opacity: 0, y: 20 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         transition={{ duration: 0.4, delay: index * 0.1 }}
                                         whileHover={{ scale: 1.05, y: -5 }}
                                       >
                                         <div className="tech-card-icon">{tech.icon}</div>
                                         <div className="tech-card-content">
                                           <h5 className="tech-card-name">{tech.name}</h5>
                                           <p className="tech-card-description">{tech.description}</p>
                                         </div>
                                       </motion.div>
                                     ))}
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

        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;