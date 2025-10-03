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
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem('ga_seen_greeting') !== '1';
    } catch (_) {
      return true;
    }
  });
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const durationMs = 700; // fade in/out duration
  const holdMs = 400;     // time fully visible

  const totalPerGreeting = useMemo(() => durationMs * 2 + holdMs, [durationMs, holdMs]);

  useEffect(() => {
    if (!visible) return;
    if (finished) return;

    const timer = setTimeout(() => {
      if (index < GREETINGS.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setFinished(true);
        setTimeout(() => {
          setVisible(false);
          try { localStorage.setItem('ga_seen_greeting', '1'); } catch (_) {}
          if (onDone) onDone();
        }, durationMs); // allow final fade
      }
    }, totalPerGreeting);

    return () => clearTimeout(timer);
  }, [visible, finished, index, totalPerGreeting, durationMs, onDone]);

  if (!visible) return null;

  return (
    <motion.div
      className="greeting-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: finished ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="greeting-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={GREETINGS[index]}
            className="greeting-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: durationMs / 1000, ease: 'easeInOut' }}
          >
            {GREETINGS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


