"use client";

import { motion } from "framer-motion";

export function MinimalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated dots */}
      <div className="flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-foreground"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        animate={{
          y: [-100, 100],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner accents */}
      {[
        "top-8 left-8",
        "top-8 right-8",
        "bottom-8 left-8",
        "bottom-8 right-8",
      ].map((position, i) => (
        <motion.div
          key={position}
          className={`absolute ${position}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <div className="w-4 h-4 border-l border-t border-foreground/30" />
        </motion.div>
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="relative">
        {/* Rotating ring */}
        <motion.div
          className="w-12 h-12 rounded-full border border-foreground/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-foreground"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}

export function GlitchLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Glitch text effect */}
        <motion.div
          className="text-4xl font-light tracking-wider"
          animate={{
            x: [0, -2, 2, 0],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          LOADING
        </motion.div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-px bg-foreground/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-foreground"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
