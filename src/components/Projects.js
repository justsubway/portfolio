import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: 'SuperChat',
      image: 'https://i.imgur.com/VgZfwTI.png',
      link: 'https://github.com/justsubway/discord-clone',
      description: 'Discord clone with real-time messaging'
    },
    {
      title: 'Georythm',
      image: 'https://camo.githubusercontent.com/18ea1ccb9cb4eab34da9099fbaeff0139b7f4f094ac12bcff78f94afd1f169c9/68747470733a2f2f692e696d6775722e636f6d2f54577361494e4a2e706e67',
      link: 'https://justsubway.github.io/GeoRythm/',
      description: 'Music visualization platform'
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
      image: 'https://camo.githubusercontent.com/d80e3286e94d36874f8d51a97dd1208d152b8184154b8e4b1cdec3867c526603/68747470733a2f2f692e696d6775722e636f6d2f6f3178644b51522e706e67',
      link: 'https://thewria.com',
      description: 'Study platform for Greek students'
    },
    {
      title: 'Forthelocals',
      image: 'https://i.imgur.com/VXHDsiP.png',
      link: 'https://forthelocalsclth.com',
      description: 'E-commerce platform'
    }
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="projects-section" id="projects">
      <div className="projects-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.div 
          className="projects-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-item"
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                <span className="project-title">{project.title}</span>
                <span className="project-description">{project.description}</span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {!showAll && (
          <motion.button
            className="show-all-button"
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show All Projects
          </motion.button>
        )}

        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="project-preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePosition.x - 200,
                y: mousePosition.y - 150
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.title}
                className="preview-image"
              />
              <div className="preview-overlay">
                <h3 className="preview-title">{hoveredProject.title}</h3>
                <p className="preview-description">{hoveredProject.description}</p>
                <div className="preview-links">
                  <a 
                    href={hoveredProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="preview-link"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;