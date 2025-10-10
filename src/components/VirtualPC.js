import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaSquare, FaFolder, FaFolderOpen, FaPlay, FaCalculator, FaFileAlt, FaCog, FaPowerOff, FaQuestionCircle } from 'react-icons/fa';
import './VirtualPC.css';

const VirtualPC = () => {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [draggedWindow, setDraggedWindow] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isScreenVisible, setIsScreenVisible] = useState(true);
  const screenRef = useRef(null);

  const folders = [
    {
      id: 'about',
      name: 'About Me',
      icon: FaFolder,
      openIcon: FaFolderOpen,
      color: '#FFD700'
    },
    {
      id: 'tech',
      name: 'Tech Stack',
      icon: FaFolder,
      openIcon: FaFolderOpen,
      color: '#FFD700'
    },
    {
      id: 'assessments',
      name: 'Assessments',
      icon: FaFolder,
      openIcon: FaFolderOpen,
      color: '#FFD700'
    }
  ];

  const startMenuItems = [
    { id: 'settings', name: 'Settings', icon: FaCog },
    { id: 'shutdown', name: 'Shutdown', icon: FaPowerOff }
  ];

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
      description: 'Code repository',
      category: 'Web & Tools'
    },
    { 
      icon: 'https://seekicon.com/free-icon-download/shopify_1.svg', 
      name: 'Shopify', 
      description: 'E-commerce platform',
      category: 'Web & Tools'
    },
    
    // Creative Tools
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', 
      name: 'Photoshop', 
      description: 'Image editing',
      category: 'Creative Tools'
    },
    { 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg', 
      name: 'Premiere Pro', 
      description: 'Video editing',
      category: 'Creative Tools'
    }
  ];

  const assessments = [
    {
      title: 'Alva Labs Logic Test',
      score: '85%',
      description: 'Cognitive reasoning and problem-solving abilities',
      category: 'Cognitive'
    },
    {
      title: 'Alva Labs Personality Test',
      score: 'Analytical',
      description: 'Personality traits and work style preferences',
      category: 'Personality'
    }
  ];

  const handleFolderDoubleClick = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;

    // Check if window already exists
    const existingWindow = windows.find(w => w.id === folderId);
    if (existingWindow) {
      // Bring to front
      bringToFront(folderId);
      return;
    }

    // Create new window
    const newWindow = {
      id: folderId,
      title: folder.name,
      x: Math.random() * 200 + 50, // Random position within screen
      y: Math.random() * 200 + 50,
      zIndex: nextZIndex,
      isMinimized: false
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const handleStartMenuItemClick = (itemId) => {
    setShowStartMenu(false);
    
    if (itemId === 'shutdown') {
      // Smooth shutdown - just close the screen
      setIsShutdown(true);
      setTimeout(() => {
        setIsScreenVisible(false);
        setWindows([]);
      }, 1000); // 1 second delay for smooth transition
      return;
    }

    // Check if window already exists
    const existingWindow = windows.find(w => w.id === itemId);
    if (existingWindow) {
      bringToFront(itemId);
      return;
    }

    // Create new window
    const newWindow = {
      id: itemId,
      title: startMenuItems.find(item => item.id === itemId)?.name || itemId,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      zIndex: nextZIndex,
      isMinimized: false
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setIsScreenVisible(true);
    setTimeout(() => {
      setIsShutdown(false);
      setWindows([]);
      setNextZIndex(10);
    }, 500); // Small delay for smooth transition
  };

  const handleScrollableContentWheel = (e) => {
    // Prevent the wheel event from bubbling up to the page
    e.stopPropagation();
  };

  const handleScrollableContentTouch = (e) => {
    // Prevent touch events from bubbling up to the page
    e.stopPropagation();
  };


  const bringToFront = (windowId) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, zIndex: nextZIndex, isMinimized: false }
          : w
      )
    );
    setNextZIndex(prev => prev + 1);
  };

  const handleCloseWindow = (windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const handleMinimizeWindow = (windowId) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, isMinimized: !w.isMinimized }
          : w
      )
    );
  };

  const handleMouseDown = (e, windowId) => {
    e.preventDefault();
    const window = windows.find(w => w.id === windowId);
    if (!window) return;

    setDraggedWindow(windowId);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y
    });
    bringToFront(windowId);
  };

  const handleMouseMove = (e) => {
    if (!draggedWindow) return;

    const screenRect = screenRef.current?.getBoundingClientRect();
    if (!screenRect) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep window within screen bounds
    const maxX = screenRect.width - 400; // Window width
    const maxY = screenRect.height - 300; // Window height

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    setWindows(prev => 
      prev.map(w => 
        w.id === draggedWindow 
          ? { ...w, x: constrainedX, y: constrainedY }
          : w
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedWindow(null);
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (draggedWindow) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedWindow, dragOffset]);

  const renderWindowContent = (windowId) => {
    switch (windowId) {
      case 'about':
        return (
          <div className="window-content">
            <div className="content-header">
              <h3>About Me</h3>
            </div>
            <div 
              className="scrollable-content"
              onWheel={handleScrollableContentWheel}
              onTouchMove={handleScrollableContentTouch}
            >
              <div className="about-content">
                <p>
                  I'm a passionate Computer Science student from Athens, Greece, with a deep love for creating 
                  innovative solutions through code. My journey in tech began with curiosity and has evolved 
                  into a drive to build meaningful applications that solve real-world problems.
                </p>
                <p>
                  I specialize in full-stack development, working with Java, Python, and JavaScript to create 
                  everything from web applications to mobile apps. What excites me most is the intersection 
                  of technology and user experience - crafting solutions that are both powerful and intuitive.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community. I'm always eager to learn and 
                  take on new challenges that push the boundaries of what's possible.
                </p>
                <p>
                  My goal is to create technology that makes a positive impact on people's lives, whether that's 
                  through elegant user interfaces, efficient algorithms, or innovative problem-solving approaches.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'tech':
        return (
          <div className="window-content">
            <div className="content-header">
              <h3>Tech Stack</h3>
            </div>
            <div 
              className="scrollable-content"
              onWheel={handleScrollableContentWheel}
              onTouchMove={handleScrollableContentTouch}
            >
              {['Languages & Frameworks', 'Web & Tools', 'Creative Tools'].map((category, categoryIndex) => (
                <div key={category} className="tech-category-section">
                  <h4 className="category-title">{category}</h4>
                  <div className="tech-grid">
                    {techStack
                      .filter(tech => tech.category === category)
                      .map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className="tech-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (categoryIndex * 0.2) + (index * 0.05) }}
                        >
                          <img src={tech.icon} alt={tech.name} className="tech-icon" />
                          <span className="tech-name">{tech.name}</span>
                          <span className="tech-description">{tech.description}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'assessments':
        return (
          <div className="window-content">
            <div className="content-header">
              <h3>Professional Assessments</h3>
            </div>
            <div 
              className="scrollable-content"
              onWheel={handleScrollableContentWheel}
              onTouchMove={handleScrollableContentTouch}
            >
              <div className="assessments-grid">
                {assessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.title}
                    className="assessment-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="assessment-header">
                      <h4>{assessment.title}</h4>
                      <span className="assessment-score">{assessment.score}</span>
                    </div>
                    <p className="assessment-description">{assessment.description}</p>
                    <span className="assessment-category">{assessment.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="window-content">
            <div className="content-header">
              <h3>Settings</h3>
            </div>
            <div 
              className="scrollable-content"
              onWheel={handleScrollableContentWheel}
              onTouchMove={handleScrollableContentTouch}
            >
              <div className="settings-content">
                <h4>Virtual PC Settings</h4>
                <p>This is a virtual computer simulation within George's portfolio.</p>
                <p>You can explore the folders to learn more about his skills and experience.</p>
                <div className="settings-info">
                  <p><strong>Version:</strong> 1.0.0</p>
                  <p><strong>Developer:</strong> George Arampatzis</p>
                  <p><strong>Status:</strong> Running</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="virtual-pc-section" id="about">
      <div className="pc-container">
        {/* PC Screen Frame */}
        <div className="pc-screen">
          <div className="screen-header">
            <div className="screen-controls">
              <div className="control-dot red"></div>
              <div className="control-dot yellow"></div>
              <div className="control-dot green"></div>
            </div>
            <div className="screen-title">George's Portfolio Desktop</div>
          </div>
          
          {!isScreenVisible ? (
            <div className="shutdown-screen">
              <div className="shutdown-content">
                <div className="shutdown-icon">
                  <FaPowerOff size={64} />
                </div>
                <h2>System Shutdown</h2>
                <p>George's Virtual PC has been shut down.</p>
                <button className="restart-button" onClick={handleRestart}>
                  <FaPlay size={16} />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="desktop" ref={screenRef}>
              {/* Desktop Background */}
              <div className="desktop-background"></div>
              
              {/* Folder Icons */}
              <div className="desktop-icons">
                {folders.map((folder, index) => (
                  <motion.div
                    key={folder.id}
                    className="desktop-icon"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onDoubleClick={() => handleFolderDoubleClick(folder.id)}
                  >
                    <div className="icon-wrapper">
                      <folder.icon size={48} className="folder-icon" />
                    </div>
                    <span className="icon-label">{folder.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Taskbar */}
              <div className="taskbar">
                <button 
                  className="start-button"
                  onClick={() => setShowStartMenu(!showStartMenu)}
                >
                  <FaPlay size={12} />
                  <span>Start</span>
                </button>
                
                {/* Start Menu */}
                <AnimatePresence>
                  {showStartMenu && (
                    <motion.div
                      className="start-menu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {startMenuItems.map((item, index) => (
                        <button
                          key={item.id}
                          className="start-menu-item"
                          onClick={() => handleStartMenuItemClick(item.id)}
                        >
                          <item.icon size={16} />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            {/* Windows */}
            <AnimatePresence>
              {windows.map((window) => (
                <motion.div
                  key={window.id}
                  className={`window ${window.isMinimized ? 'minimized' : ''}`}
                  style={{
                    left: window.x,
                    top: window.y,
                    zIndex: window.zIndex
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: window.isMinimized ? 0.8 : 1, 
                    y: window.isMinimized ? 50 : 0 
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div 
                    className="window-header"
                    onMouseDown={(e) => handleMouseDown(e, window.id)}
                  >
                    <div className="window-title">{window.title}</div>
                    <div className="window-controls">
                      <button 
                        className="control-btn minimize"
                        onClick={() => handleMinimizeWindow(window.id)}
                      >
                        <FaMinus size={10} />
                      </button>
                      <button 
                        className="control-btn maximize"
                      >
                        <FaSquare size={10} />
                      </button>
                      <button 
                        className="control-btn close"
                        onClick={() => handleCloseWindow(window.id)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="window-body">
                    {renderWindowContent(window.id)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualPC;
