import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GreetingOverlay.css';

const GREETINGS = [
  'Hello',
  'Hola',
  'Bonjour',
  'Ciao',
  'Γεια',
  'こんにちは',
  '안녕하세요',
  'مرحبا'
];

export default function GreetingOverlay({ onDone }) {
  // Always show on load
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Ultra-fast timings to keep total 1–2s
  const greetings = useMemo(() => GREETINGS.slice(0, 4), []); // show fewer for speed
  const durationMs = 120; // fade in/out duration
  const holdMs = 80;      // time fully visible

  const totalPerGreeting = useMemo(() => durationMs * 2 + holdMs, [durationMs, holdMs]);

  useEffect(() => {
    if (!visible) return;
    if (finished) return;

    const timer = setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setFinished(true);
        // slide transition handled by container; remove element shortly after
        setTimeout(() => {
          setVisible(false);
          if (onDone) onDone();
        }, 550);
      }
    }, totalPerGreeting);

    return () => clearTimeout(timer);
  }, [visible, finished, index, totalPerGreeting, greetings.length, onDone]);

  if (!visible) return null;

  return (
    <motion.div
      className="greeting-overlay"
      initial={{ y: 0 }}
      animate={{ y: finished ? '-100%' : 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="greeting-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={greetings[index]}
            className="greeting-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: durationMs / 1000, ease: 'easeInOut' }}
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


