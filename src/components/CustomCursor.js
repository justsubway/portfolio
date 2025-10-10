import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [color, setColor] = useState('default');
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Don't set up cursor events on mobile
    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile);
    }
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    const over = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setColor(el.getAttribute('data-cursor'));
      } else if (e.target.closest('a, button, [role="button"]')) {
        setColor('link');
      } else {
        setColor('default');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseenter', enter);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseenter', enter);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${visible ? 'show' : 'hide'} ${color}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    />
  );
}



