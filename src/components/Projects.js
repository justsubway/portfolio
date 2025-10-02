import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [previousProjectIndex, setPreviousProjectIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const previewRef = useRef(null);

  const projects = [
    {
      title: 'SuperChat',
      image: 'https://i.imgur.com/VgZfwTI.png',
      link: 'https://github.com/justsubway/discord-clone',
      description: 'Discord clone with real-time messaging'
    },
    {
      title: 'Georythm',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/georythm',
      description: 'Music visualization app'
    },
    {
      title: 'Chomp',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/food-app',
      description: 'Food delivery app'
    },
    {
      title: 'Resumind',
      image: 'https://i.imgur.com/nI1HcQJ.png',
      link: 'https://github.com/justsubway/ai-resume-analyser',
      description: 'AI resume analyzer'
    },
    {
      title: 'Thewria.com',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/thewria',
      description: 'Educational platform'
    },
    {
      title: 'Forthelocals',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/forthelocals',
      description: 'Local business platform'
    },
    {
      title: 'Weather App',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/weather-app',
      description: 'Weather forecasting app'
    },
    {
      title: 'Hub Greece',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/hub-greece',
      description: 'Greek tech community hub'
    },
    {
      title: 'InNeed',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/inneed',
      description: 'Community help platform'
    },
    {
      title: 'Chat App',
      image: 'https://i.imgur.com/9jHtQDp.png',
      link: 'https://github.com/justsubway/chat-app',
      description: 'Real-time chat application'
    },
    {
      title: 'ServerMall',
      image: 'https://i.imgur.com/DNwAuUt.jpeg',
      link: 'https://github.com/justsubway/servermall',
      description: 'Minecraft server marketplace'
    },
    {
      title: 'EloPvP',
      image: 'https://i.imgur.com/c22Fm0G.jpeg',
      link: 'https://github.com/justsubway/elopvp',
      description: 'Minecraft PvP ranking system'
    }
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      console.log('Mouse position:', e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectHover = (project, index) => {
    if (!isMobile) {
      // Get current index before updating hoveredProject
      const currentIndex = hoveredProject ? projects.findIndex(p => p.title === hoveredProject.title) : -1;
      setPreviousProjectIndex(currentIndex);
      setHoveredProject(project);
      setIsHovering(true);
      console.log('Hovering project:', project.title, 'isHovering:', true);
    }
  };

  const handleProjectLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
      // Delay clearing hoveredProject to allow smooth transition
      setTimeout(() => {
        setHoveredProject(null);
        setPreviousProjectIndex(null);
      }, 200);
    }
  };

  const getCurrentProjectIndex = () => {
    if (!hoveredProject) return -1;
    return projects.findIndex(p => p.title === hoveredProject.title);
  };

  const getSlideDirection = () => {
    const currentIndex = getCurrentProjectIndex();
    if (previousProjectIndex === null || currentIndex === -1 || previousProjectIndex === -1) return 0;
    return currentIndex > previousProjectIndex ? 1 : -1;
  };

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
    <div className="projects-section" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          <motion.h2 className="projects-title" variants={itemVariants}>
            Featured Projects
          </motion.h2>
          
          <motion.div className="projects-list" variants={itemVariants}>
            {displayedProjects.map((project, index) => (
              <motion.h3
                key={project.title}
                className="project-title-item"
                onMouseEnter={() => handleProjectHover(project, index)}
                onMouseLeave={handleProjectLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {project.title}
                </a>
              </motion.h3>
            ))}
          </motion.div>

          {!showAll && (
            <motion.button
              className="show-all-button"
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              Show All Projects
            </motion.button>
          )}
        </motion.div>

        {/* Persistent Preview Container */}
        <AnimatePresence>
          {isHovering && hoveredProject && !isMobile && (
            <motion.div
              ref={previewRef}
              className="project-preview-container"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onAnimationStart={() => console.log('Preview animating in')}
            >
              <div className="project-preview-content">
                <motion.div
                  className="project-preview-image-container"
                  key={hoveredProject.title}
                  initial={{ 
                    y: getSlideDirection() * 100,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: 0,
                    opacity: 1 
                  }}
                  exit={{ 
                    y: getSlideDirection() * -100,
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  onAnimationComplete={() => {
                    setPreviousProjectIndex(getCurrentProjectIndex());
                  }}
                >
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="project-preview-image"
                  />
                </motion.div>
                
                <motion.div
                  className="project-preview-info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h4 className="project-preview-title">{hoveredProject.title}</h4>
                  <p className="project-preview-description">{hoveredProject.description}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;