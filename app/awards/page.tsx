"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Star, Filter } from "lucide-react";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import awardsData from "@/data/awards.json";
import { useState } from "react";

export default function AwardsPage() {
  const awards = awardsData;
  const [filter, setFilter] = useState("all");
  
  const years = ["all", ...Array.from(new Set(awards.map(a => a.year)))].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;
    return b.localeCompare(a);
  });
  
  const filteredAwards = filter === "all" 
    ? awards 
    : awards.filter(a => a.year === filter);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AestheticBackground />
      
      <div className="relative pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <RevealOnScroll>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-foreground to-transparent"
              />
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter">
                    Awards
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-6">
                    Recognition for excellence in design, development, and innovation.
                  </p>
                </div>
                {/* Awards Count */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex flex-col items-center gap-2 px-6 py-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <Trophy className="w-6 h-6 text-muted-foreground" strokeWidth={1} />
                  <span className="text-3xl font-light">{filteredAwards.length}</span>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {filter === "all" ? "TOTAL" : filter}
                  </span>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Year Filter */}
          <RevealOnScroll delay={0.2}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Year:</span>
              </div>
              {years.map((year) => (
                <Magnetic key={year}>
                  <motion.button
                    onClick={() => setFilter(year)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-2.5 text-sm font-mono tracking-wider transition-all duration-300 ${
                      filter === year
                        ? "bg-foreground text-background border border-foreground"
                        : "border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 backdrop-blur-sm"
                    }`}
                  >
                    {year.toUpperCase()}
                    {filter === year && (
                      <motion.div
                        layoutId="activeYearFilter"
                        className="absolute inset-0 bg-foreground -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </Magnetic>
              ))}
            </div>
          </RevealOnScroll>

          {/* Awards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredAwards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                  
                  <div className="relative h-full flex flex-col group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300 border border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/20">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                      }} />
                    </div>

                    <div className="relative space-y-4 flex-1">
                      {/* Award Icon & Year */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className="w-12 h-12 flex items-center justify-center"
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Award className="w-12 h-12 text-foreground" strokeWidth={1} />
                        </motion.div>
                        <span className="text-5xl font-light text-foreground/5 group-hover:text-foreground/10 transition-colors">
                          {award.year}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="inline-block px-3 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        {award.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-light tracking-tight group-hover:tracking-wide transition-all duration-300">
                        {award.title}
                      </h3>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />

                      {/* Organization */}
                      <p className="text-sm text-muted-foreground font-mono">
                        {award.organization}
                      </p>

                      {/* Project */}
                      <p className="text-sm text-muted-foreground/70">
                        for <span className="text-foreground font-light">{award.project}</span>
                      </p>

                      {/* Order Badge */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span className="text-xs tracking-widest text-muted-foreground font-mono">
                          #{award.order.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredAwards.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex flex-col items-center gap-4 p-12 border border-zinc-200 dark:border-zinc-800">
                <Trophy className="w-12 h-12 text-muted-foreground/50" strokeWidth={1} />
                <p className="text-xl text-muted-foreground font-light">
                  No awards found for this year.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="text-sm font-mono text-foreground underline hover:no-underline"
                >
                  View all awards
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
