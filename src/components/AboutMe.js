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
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 
      name: 'Java', 
      description: 'Enterprise backend',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 
      name: 'Python', 
      description: 'Data science & automation',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 
      name: 'JavaScript', 
      description: 'Web development',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 
      name: 'React', 
      description: 'UI framework',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 
      name: 'Spring Boot', 
      description: 'Java framework',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 
      name: 'React Native', 
      description: 'Mobile development',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 
      name: 'Node.js', 
      description: 'Server-side JS',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', 
      name: 'Three.js', 
      description: '3D graphics',
      category: 'Languages & Frameworks'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
      name: 'TypeScript', 
      description: 'JS with types',
      category: 'Languages & Frameworks'
    },
    
    // Web & Tools
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 
      name: 'HTML5', 
      description: 'Web markup',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 
      name: 'CSS3', 
      description: 'Web styling',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', 
      name: 'Firebase', 
      description: 'Backend platform',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 
      name: 'Tailwind CSS', 
      description: 'Utility CSS',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 
      name: 'MySQL', 
      description: 'SQL database',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 
      name: 'MongoDB', 
      description: 'NoSQL database',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 
      name: 'Git', 
      description: 'Version control',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 
      name: 'GitHub', 
      description: 'Code platform',
      category: 'Web & Tools'
    },
    
    // Creative Tools
    { 
      icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg', 
      name: 'Shopify', 
      description: 'E-commerce platform',
      category: 'Creative Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobephotoshop.svg', 
      name: 'Photoshop', 
      description: 'Image editing',
      category: 'Creative Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobepremierepro.svg', 
      name: 'Premiere Pro', 
      description: 'Video editing',
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
                      <a 
                        href="https://beacons.ai/subwayy" 
                      <a 
                        href="https://beacons.ai/subwayy" 
                      <a 
                        href="https://beacons.ai/subwayy" 
                      <a 
                        href="https://beacons.ai/subwayy" 
                      <a 
                        href="https://beacons.ai/subwayy" 
                      <a 
                        href="https://beacons.ai/subwayy" 
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
                                         <div className="tech-card-icon">
                                           <img src={tech.icon} alt={tech.name} />
                                         </div>
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
                        href={process.env.PUBLIC_URL + "/Alva Labs Logic Test Report - George Arampatzis.pdf"} 
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
                        href={process.env.PUBLIC_URL + "/Alva Labs Personality Test Report - George Arampatzis.pdf"} 
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
              href={process.env.PUBLIC_URL + "/George_Arampatzis.pdf"} 
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