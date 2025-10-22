import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TerminalContent.css';

const TerminalContent = ({ onScrollToProjects }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    { text: 'whoami', type: 'command', delay: 1000 },
    { text: 'George Arampatzis', type: 'output', delay: 1500 },
    { text: '', type: 'empty', delay: 500 },
    { text: 'cat about.txt', type: 'command', delay: 1000 },
    { text: 'Computer Science Student & Developer', type: 'output', delay: 2000 },
    { text: 'Based in Athens, Greece', type: 'output', delay: 1000 },
    { text: 'Specializing in Java, Python, JavaScript, React', type: 'output', delay: 1500 },
    { text: '', type: 'empty', delay: 500 },
    { text: 'ls projects/', type: 'command', delay: 1000 },
    { text: 'SuperChat    Georythm    Chomp    Resumind', type: 'output', delay: 2000 },
    { text: 'Thewria.com  Forthelocals  Weather App', type: 'output', delay: 1000 },
    { text: 'Hub Greece   InNeed   Chat App   ServerMall', type: 'output', delay: 1000 },
    { text: '', type: 'empty', delay: 500 },
    { text: 'git status', type: 'command', delay: 1000 },
    { text: 'On branch main', type: 'output', delay: 800 },
    { text: 'Your branch is up to date with origin/main', type: 'output', delay: 1000 },
    { text: 'nothing to commit, working tree clean', type: 'output', delay: 1000 },
    { text: '', type: 'empty', delay: 500 },
    { text: 'npm run portfolio', type: 'command', delay: 1000 },
    { text: '> Portfolio server starting...', type: 'output', delay: 800 },
    { text: '> Server running on port 3000', type: 'output', delay: 800 },
    { text: '> Ready to showcase my work!', type: 'output', delay: 1000 },
    { text: '', type: 'empty', delay: 500 },
    { text: 'echo "Ready to connect?"', type: 'command', delay: 1000 },
    { text: 'Ready to connect?', type: 'output', delay: 1000 },
  ];

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    const line = terminalLines[currentLine];
    if (line.type === 'empty') {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayedText('');
      }, line.delay);
      return;
    }

    let charIndex = 0;
    const text = line.text;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, line.delay);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLine, terminalLines]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const getLineClass = (lineIndex) => {
    if (lineIndex > currentLine) return 'terminal-line hidden';
    if (lineIndex === currentLine) return 'terminal-line typing';
    return 'terminal-line visible';
  };

  const getTextClass = (lineIndex) => {
    const line = terminalLines[lineIndex];
    if (lineIndex > currentLine) return '';
    if (lineIndex === currentLine) {
      return line.type === 'command' ? 'command-text' : 'output-text';
    }
    return line.type === 'command' ? 'command-text' : 'output-text';
  };

  return (
    <div className="terminal-content-container">
      <div className="terminal-content">
        {terminalLines.map((line, index) => (
          <div key={index} className={getLineClass(index)}>
            {index < currentLine ? (
              <span className={getTextClass(index)}>{line.text}</span>
            ) : index === currentLine ? (
              <span className={getTextClass(index)}>
                {displayedText}
                {showCursor && <span className="cursor">█</span>}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      
      {!isTyping && (
        <motion.div 
          className="terminal-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="cta-prompt">
            <span className="prompt-symbol">$</span>
            <span className="prompt-text">View my projects</span>
          </div>
          <motion.button
            className="terminal-cta-button"
            onClick={onScrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-text">Execute</span>
            <span className="button-arrow">→</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default TerminalContent;
