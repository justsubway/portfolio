import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      title: 'SuperChat',
      description: 'A modern, real-time chat application built with React and Firebase, featuring a Discord-inspired interface with advanced guest user support. Complete Discord clone with three-panel layout, real-time messaging, and unique guest authentication system.',
      image: 'https://i.imgur.com/VgZfwTI.png',
      tags: ['Web App'],
      techStack: ['React', 'Firebase', 'Firestore', 'Authentication', 'CSS3', 'Real-time Messaging'],
      liveLink: null,
      githubLink: 'https://github.com/justsubway/discord-clone',
      features: ['Discord-inspired UI', 'Real-time messaging', 'Guest user system', 'Google authentication', 'Channel management', 'Custom avatars']
    },
    {
      title: 'Chomp',
      description: 'A comprehensive food delivery and restaurant discovery app with modern UI/UX design. Features include restaurant browsing, menu viewing, order tracking, and user reviews.',
      image: 'https://i.imgur.com/9jHtQDp.png',
      tags: ['Web App'],
      techStack: ['React', 'JavaScript', 'CSS3', 'API Integration', 'Responsive Design'],
      liveLink: null,
      githubLink: 'https://github.com/justsubway/food-app',
      features: ['Restaurant discovery', 'Menu browsing', 'Order tracking', 'User reviews', 'Responsive design', 'Modern interface']
    },
    {
      title: 'Georythm',
      description: 'An interactive music visualization platform that creates unique visual patterns based on your music. Features real-time audio analysis and dynamic 3D visualizations.',
      image: 'https://camo.githubusercontent.com/18ea1ccb9cb4eab34da9099fbaeff0139b7f4f094ac12bcff78f94afd1f169c9/68747470733a2f2f692e696d6775722e636f6d2f54577361494e4a2e706e67',
      tags: ['Web App'],
      techStack: ['React', 'Three.js', 'Web Audio API', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
      liveLink: 'https://justsubway.github.io/GeoRythm/',
      githubLink: 'https://github.com/justsubway/GeoRythm',
      features: ['Real-time audio analysis', 'Dynamic 3D visualizations', 'Interactive controls', 'Responsive design']
    },
    {
      title: 'Resumind',
      description: 'An AI-powered resume analyzer that provides ATS scores and custom feedback for job applications. Features easy authentication, resume upload & storage, and intelligent matching against job listings.',
      image: 'https://i.imgur.com/nI1HcQJ.png',
      tags: ['Web App'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Puter.js', 'AI Integration'],
      liveLink: null,
      githubLink: 'https://github.com/justsubway/ai-resume-analyser',
      features: ['AI resume analysis', 'ATS scoring', 'Job matching', 'Resume storage', 'Modern UI/UX', 'Cross-device compatibility']
    },
    {
      title: 'Forhtelocals',
      description: 'An e-commerce platform built with Shopify for local business. Features include product management, shopping cart, and secure checkout.',
      image: 'https://i.imgur.com/VXHDsiP.png',
      tags: ['Web App'],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Shopify', 'Responsive Design'],
      liveLink: 'https://forthelocalsclth.com',
      githubLink: null,
      features: ['Product management', 'Shopping cart', 'Secure checkout', 'Order tracking']
    },
    {
      title: 'Thewria.com',
      description: 'A modern web platform for studying and helping Greek Students with their Panhellenic Exams. It acts like TikTok with scrolling abilities but displays proper study content.',
      image: 'https://camo.githubusercontent.com/d80e3286e94d36874f8d51a97dd1208d152b8184154b8e4b1cdec3867c526603/68747470733a2f2f692e696d6775722e636f6d2f6f3178644b51522e706e67',
      tags: ['Web App'],
      techStack: ['HTML5', 'Node.js', 'JavaScript', 'CSS3'],
      liveLink: 'https://thewria.com',
      githubLink: null,
      features: ['Responsive design', 'Scrolling Animations', 'Content management', 'Multiple Subjects']
    },
    {
      title: 'Weather App',
      description: 'A weather application that provides real-time weather information and forecasts. Features include location-based weather and a search for specific locations using API.',
      image: 'https://raw.githubusercontent.com/justsubway/weather-app/refs/heads/main/src/assets/demo.png',
      tags: ['App'],
      techStack: ['Java', 'OpenWeather API', 'Geolocation API', 'Context API'],
      liveLink: null,
      githubLink: 'https://github.com/justsubway/weather-app',
      features: ['Real-time weather', 'Location-based', 'Search Bar']
    },
    {
      title: 'Hub Greece',
      description: 'Website like AirBnB created specifically for digital nomads. Offering temporary housing options including booking and searching per area. Also created under a Entrepreneurship Contest.',
      image: 'https://i.imgur.com/GlnOXVU.png',
      tags: ['Web App'],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Geolocation API', 'MySQL'],
      liveLink: null,
      githubLink: null,
      features: ['Reservations/Bookings', 'Search by location', 'Location Tracker', 'Algorithm for suggestions']
    },
    {
      title: 'InNeed',
      description: 'A platform created to supply the elderly with assistants (to help with groceries, or any other need they have, hence InNeed). The app was created under a Entrepreneurship Contest',
      image: 'https://i.imgur.com/X8NZtMa.png',
      tags: ['Web App'],
      techStack: ['HTML5', 'CSS3'],
      liveLink: null,
      githubLink: null,
      features: ['Responsive design', 'User authentication', 'Content management', 'API integration']
    },
    {
      title: 'Chat App',
      description: 'A real-time chat application with user authentication and message persistence. Features include real-time messaging, user profiles, and message history.',
      image: 'https://i.imgur.com/4SmvSQw.png',
      tags: ['Web App'],
      techStack: ['React', 'Firebase', 'Tailwind CSS', 'Firestore', 'Authentication', 'Cloud Functions'],
      liveLink: 'https://chat-app-dc6f4.web.app',
      githubLink: 'https://github.com/justsubway/chat-app',
      features: ['Real-time messaging', 'User authentication', 'Message history']
    },
    {
      title: 'Server Mall',
      description: 'A comprehensive Minecraft server management plugin built with Java and Spigot API. Features include server shop systems, economy management, and advanced player interactions.',
      image: 'https://i.imgur.com/DNwAuUt.jpeg',
      tags: ['Plugin'],
      techStack: ['Java', 'Spigot API', 'MySQL', 'Economy System'],
      liveLink: null,
      githubLink: null,
      features: ['Server shop system', 'Economy management', 'Player interactions', 'Database integration', 'Custom commands', 'Admin tools']
    },
    {
      title: 'Elo PvP',
      description: 'An advanced PvP ranking system plugin for Minecraft servers. Implements ELO rating system for competitive player rankings, tournaments, and skill-based matchmaking.',
      image: 'https://i.imgur.com/c22Fm0G.jpeg',
      tags: ['Plugin'],
      techStack: ['Java', 'Spigot API', 'MySQL', 'ELO Algorithm'],
      liveLink: null,
      githubLink: null,
      features: ['ELO rating system', 'Tournament support', 'Skill-based matchmaking', 'Leaderboards', 'Statistics tracking', 'Competitive gameplay']
    },
    {
      title: 'ChatGames',
      description: 'A Minecraft plugin that brings engaging chat-based minigames to the server, similar to Kixs Chat Games. Players compete to solve word puzzles, math problems, and typing challenges.',
      image: 'https://i.imgur.com/SfGcoZF.png',
      tags: ['Plugin'],
      techStack: ['Java', 'Spigot API'],
      liveLink: null,
      githubLink: null,
      features: ['Multiple game types', 'Custom rewards', 'Leaderboard system', 'Configurable messages']
    },
    {
      title: 'PinataParty',
      description: 'A Minecraft plugin inspired by the official Piñata Party event. Players gather to hit a colorful piñata that drops rewards when destroyed, encouraging server-wide collaboration.',
      image: 'https://i.imgur.com/7Dk46nd.png',
      tags: ['Plugin'],
      techStack: ['Java', 'Spigot API'],
      liveLink: null,
      githubLink: null,
      features: ['Timed events', 'Custom loot tables', 'Animated piñata', 'Broadcast support']
    },
    {
      title: 'Akra',
      description: 'A space-themed Minecraft parkour plugin that challenges players to jump through a floating obstacle course in zero gravity aesthetics. Great for hubs or adventure servers.',
      image: 'https://i.imgur.com/pkdXCBG.png',
      tags: ['Plugin'],
      techStack: ['Java', 'Spigot API'],
      liveLink: null,
      githubLink: null,
      features: ['Checkpoint system', 'Timer and records', 'Custom space visuals', 'Leaderboard support']
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const filterButtonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = (index) => {
    if (window.innerWidth <= 768) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setActiveCard(null); // Reset active card when changing filter
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-content">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="filter-buttons"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          <motion.button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
            variants={filterButtonVariants}
          >
            All
          </motion.button>
          <motion.button 
            className={`filter-button ${filter === 'Web App' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Web App')}
            variants={filterButtonVariants}
          >
            Web Apps
          </motion.button>
          <motion.button 
            className={`filter-button ${filter === 'App' ? 'active' : ''}`}
            onClick={() => handleFilterChange('App')}
            variants={filterButtonVariants}
          >
            Apps
          </motion.button>
          <motion.button 
            className={`filter-button ${filter === 'Plugin' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Plugin')}
            variants={filterButtonVariants}
          >
            Plugins
          </motion.button>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          key={filter} // Add key to force re-render when filter changes
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className={`project-card ${activeCard === index ? 'active' : ''}`}
              variants={cardVariants}
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              whileTap={!isMobile ? { scale: 0.98 } : {}}
              onClick={() => handleCardClick(index)}
            >
              <div className="project-card-inner">
                <div className="project-card-front">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tech-stack">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="tech-tag more">+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-card-back">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-features">
                    <h4>Key Features</h4>
                    <ul>
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-tech-stack-full">
                    <h4>Tech Stack</h4>
                    <div className="tech-tags">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="live-demo-note">
                    {project.liveLink ? (
                      <span className="has-demo">Click anywhere to view live demo</span>
                    ) : (
                      <span className="no-demo">No live demo available</span>
                    )}
                  </div>
                  <div className="project-links">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 