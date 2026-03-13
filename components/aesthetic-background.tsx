'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';


export function AestheticBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orb following mouse */}
      <motion.div
        style={{ x, y }}
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-0 bg-accent/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const randomX = (i * 137.5) % dimensions.width;
        const randomY = (i * 47.3) % dimensions.height;
        const targetY = ((i * 73.7) % dimensions.height);
        
        return (
          <motion.div
            key={i}
            initial={{
              x: randomX,
              y: randomY,
              scale: 0,
            }}
            animate={{
              y: [randomY, targetY, randomY],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3 + 1) * 5 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: (i * 0.3) % 5,
            }}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${(i * 3.7) % 100}%`,
            }}
          />
        );
      })}

      {/* Accent Lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-right"
      />

      {/* Corner Accents */}
      <svg className="absolute top-0 left-0 w-32 h-32 text-accent/20" viewBox="0 0 100 100">
        <motion.path
          d="M 0 0 L 100 0 L 100 100"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
      <svg className="absolute bottom-0 right-0 w-32 h-32 text-accent/20 rotate-180" viewBox="0 0 100 100">
        <motion.path
          d="M 0 0 L 100 0 L 100 100"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
    </div>
  );
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-[100px]"
      />
    </div>
  );
}

export function NothingGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed w-[600px] h-[600px] pointer-events-none -z-10 opacity-20 transition-opacity duration-300"
      style={{
        left: position.x - 300,
        top: position.y - 300,
        background: 'radial-gradient(circle, rgba(128,128,128,0.12) 0%, transparent 70%)',
      }}
    />
  );
}
