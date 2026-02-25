'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';

// Glitch text effect
export function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <motion.span
      className={`inline-block relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-accent opacity-70"
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-accent/50 opacity-70"
        animate={{
          x: [0, 2, -2, 1, -1, 0],
          y: [0, -1, 1, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.1,
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

// Gradient shimmer text
export function ShimmerText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer ${className}`}
      style={{
        backgroundSize: '200% auto',
        animation: 'shimmer 3s linear infinite',
      }}
    >
      {children}
    </span>
  );
}

// Character reveal animation
export function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  const characters = children.split('');
  
  return (
    <span className="inline-flex flex-wrap">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98],
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

// Typewriter with enhanced effect
export function TypewriterText({ children, speed = 50, delay = 0 }: { children: string; speed?: number; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < children.length) {
        setDisplayText(children.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay * 1000 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, children, speed, delay]);

  return (
    <span className="inline-flex items-baseline">
      <span className="font-mono">{displayText}</span>
      {currentIndex < children.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-accent ml-1"
        />
      )}
    </span>
  );
}

// Floating text
export function FloatText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
}

// Gradient animate text
export function GradientText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% auto',
      }}
      animate={{
        backgroundPosition: ['0% center', '200% center', '0% center'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

// Stagger fade in
export function StaggerText({ children, stagger = 0.05 }: { children: string; stagger?: number }) {
  const words = children.split(' ');
  
  return (
    <span className="inline-flex flex-wrap gap-[0.25em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * stagger,
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Neon glow text
export function NeonText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{
        textShadow: [
          '0 0 10px rgba(255,60,60,0.5), 0 0 20px rgba(255,60,60,0.3)',
          '0 0 20px rgba(255,60,60,0.8), 0 0 40px rgba(255,60,60,0.5)',
          '0 0 10px rgba(255,60,60,0.5), 0 0 20px rgba(255,60,60,0.3)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
}

// Blur to focus
export function BlurText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        delay,
        duration: 1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

// Scale text
export function ScaleText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
    </motion.span>
  );
}

// Rotate in text
export function RotateText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.span>
  );
}
