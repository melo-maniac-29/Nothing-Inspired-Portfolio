"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Filter, Layers } from "lucide-react";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import projectsData from "@/data/projects.json";
import { useState } from "react";

export default function ProjectsPage() {
  const projects = projectsData;
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  // Sort projects by order, then by title for consistent ordering
  const sortedProjects = [...projects].sort((a, b) => {
    // Primary sort: by order (ascending)
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    // Secondary sort: by title (alphabetical) for consistent ordering
    return a.title.localeCompare(b.title);
  });

  const filteredProjects = (filter === "all"
    ? sortedProjects
    : sortedProjects.filter(p => p.category === filter));

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
                    Projects
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-6">
                    A collection of work showcasing clean code, thoughtful design, and attention to detail.
                  </p>
                </div>
                {/* Project Count */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex flex-col items-center gap-2 px-6 py-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <Layers className="w-6 h-6 text-muted-foreground" strokeWidth={1} />
                  <span className="text-3xl font-light">{filteredProjects.length}</span>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {filter === "all" ? "TOTAL" : filter.toUpperCase()}
                  </span>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Filter */}
          <RevealOnScroll delay={0.2}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              {categories.map((category) => (
                <Magnetic key={category}>
                  <motion.button
                    onClick={() => setFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-2.5 text-sm font-mono tracking-wider transition-all duration-300 ${filter === category
                        ? "bg-foreground text-background border border-foreground"
                        : "border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 backdrop-blur-sm"
                      }`}
                  >
                    {category.toUpperCase()}
                    {filter === category && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-foreground -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </Magnetic>
              ))}
            </div>
          </RevealOnScroll>

          {/* Projects Grid with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                  <div className="relative h-full flex flex-col">
                    {/* Project Image/Visual */}
                    <div className="relative aspect-[4/3] bg-zinc-50 dark:bg-zinc-950 overflow-hidden group-hover:bg-background/50 transition-colors duration-300">
                      {/* Project Image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-zinc-900/60 dark:from-zinc-950/40 dark:to-zinc-950/80" />

                      {/* Animated Grid Overlay */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />

                      {/* Corner Accent */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-foreground/20 group-hover:border-foreground/40 transition-colors" />

                      {/* Center Number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-8xl font-light text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {project.order.toString().padStart(2, '0')}
                        </motion.span>
                      </div>

                      {/* Hover Overlay with Links */}
                      <motion.div
                        className="absolute inset-0 bg-foreground/95 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="flex gap-4">
                          {project.liveUrl && (
                            <Magnetic>
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 border border-background flex items-center justify-center hover:bg-background transition-colors group/btn"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ExternalLink size={20} className="text-background group-hover/btn:text-foreground transition-colors" />
                              </motion.a>
                            </Magnetic>
                          )}
                          {project.githubUrl && (
                            <Magnetic>
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 border border-background flex items-center justify-center hover:bg-background transition-colors group/btn"
                                whileHover={{ scale: 1.1, rotate: 12 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Github size={20} className="text-background group-hover/btn:text-foreground transition-colors" />
                              </motion.a>
                            </Magnetic>
                          )}
                        </div>
                        <span className="text-xs font-mono text-background/80 tracking-widest">VIEW PROJECT</span>
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 space-y-4 pt-6 group-hover:bg-background/30 backdrop-blur-sm p-6 transition-colors duration-300">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                            {project.category}
                          </p>
                          <h3 className="text-2xl font-light tracking-tight group-hover:tracking-wide transition-all duration-300">
                            {project.title}
                          </h3>
                        </div>
                        <motion.div
                          className="text-4xl font-light text-foreground/5 group-hover:text-foreground/10 transition-colors"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                        >
                          {project.order.toString().padStart(2, '0')}
                        </motion.div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            className="text-xs font-mono px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex flex-col items-center gap-4 p-12 border border-zinc-200 dark:border-zinc-800">
                <Layers className="w-12 h-12 text-muted-foreground/50" strokeWidth={1} />
                <p className="text-xl text-muted-foreground font-light">
                  No projects found in this category.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="text-sm font-mono text-foreground underline hover:no-underline"
                >
                  View all projects
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
