import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GreetingOverlay.css';

const GREETINGS = [
  'Hello',      // English
  'Hola',       // Spanish
  'Bonjour',    // French
  'Ciao',       // Italian
  'Γεια',       // Greek
  'Olá',        // Portuguese
  'Hallo',      // German
  'Hej',        // Swedish/Danish
  'Merhaba',    // Turkish
  'Selam',      // Amharic/Informal
  'Shalom',     // Hebrew
  'नमस्ते',      // Hindi
  'Здравствуйте', // Russian
  'こんにちは',     // Japanese
  '안녕하세요',      // Korean
  'مرحبا',       // Arabic
  'Sveiki',     // Latvian
  'Sawubona'    // Zulu
];

export default function GreetingOverlay({ onDone }) {
  // Always show on load
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Ultra-fast timings (~1.5s total for 10 greetings)
  const greetings = useMemo(() => GREETINGS.slice(0, 10), []);
  const durationMs = 60; // fade in/out duration per item
  const holdMs = 30;     // time fully visible per item

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
        <AnimatePresence mode="popLayout">
          <motion.span
            key={greetings[index]}
            className="greeting-text"
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0.6 }}
            transition={{ duration: durationMs / 1000, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


