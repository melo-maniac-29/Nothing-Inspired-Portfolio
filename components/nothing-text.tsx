'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NothingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export function NothingText({ texts, className = '', interval = 3000 }: NothingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, currentIndex, isDeleting, texts]);

  useEffect(() => {
    if (isDeleting && charIndex === texts[currentIndex].length) {
      const delayTimeout = setTimeout(() => setCharIndex(charIndex - 1), interval);
      return () => clearTimeout(delayTimeout);
    }
  }, [isDeleting, charIndex, currentIndex, texts, interval]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="font-mono tracking-tight">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block w-[3px] h-[1em] bg-accent"
      />
    </div>
  );
}

export function GlitchText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`inline-block ${className}`}
      style={{
        animation: 'glitchText 3s infinite',
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </motion.span>
  );
}

export function FadeInText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

export function SlideText({ children, className = '', delay = 0, direction = 'left' }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  direction?: 'left' | 'right';
}) {
  return (
    <motion.div
      initial={{ x: direction === 'left' ? -50 : 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ children, className = '', delay = 0 }: { children: string; className?: string; delay?: number }) {
  const characters = children.split('');
  
  return (
    <span className={`inline-flex ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * 0.03,
            duration: 0.4,
            ease: 'easeOut',
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function MatrixText({ children, className = '' }: { children: string; className?: string }) {
  const [revealed, setRevealed] = useState(false);
  const [text, setText] = useState(children);
  
  useEffect(() => {
    const chars = '01';
    let iterations = 0;
    const maxIterations = children.length;
    
    const interval = setInterval(() => {
      setText(current =>
        current
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return children[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iterations += 1/3;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setText(children);
        setRevealed(true);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [children]);
  
  return (
    <span className={`font-mono tracking-tight ${className}`}>
      {text}
    </span>
  );
}

export function NothingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        className="w-1.5 h-1.5 rounded-full bg-accent"
      />
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="w-1.5 h-1.5 rounded-full bg-accent"
      />
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="w-1.5 h-1.5 rounded-full bg-accent"
      />
    </div>
  );
}