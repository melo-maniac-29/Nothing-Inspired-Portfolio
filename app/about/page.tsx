"use client";

import { motion } from "framer-motion";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import { Code2, Briefcase, Mail, Download, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import personalData from "@/data/personal.json";
import aboutData from "@/data/about.json";

export default function AboutPage() {
  const personal = personalData;
  const about = aboutData;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AestheticBackground />
      
      <div className="relative pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-24">
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
                    About
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mt-6">
                    {personal.bio}
                  </p>
                </div>
                {/* Quick Contact */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden lg:flex flex-col gap-3 px-6 py-6 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-muted-foreground">{personal.location}</span>
                  </div>
                  <Magnetic>
                    <a
                      href={personal.resumeUrl}
                      download
                      className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 transition-colors text-sm font-mono"
                    >
                      <Download className="w-4 h-4" />
                      <span>CV</span>
                    </a>
                  </Magnetic>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Headline & Description */}
          <RevealOnScroll delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
              
              <div className="relative space-y-8 p-8 md:p-12 group-hover:bg-background/50 backdrop-blur-sm transition-colors duration-300">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                <div className="absolute top-6 right-6 text-8xl font-light text-foreground/[0.02] group-hover:text-foreground/[0.04] transition-colors">
                  01
                </div>

                {/* Profile Image - Integrated */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative">
                  <div className="flex-1 space-y-6 w-full">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight relative">
                      {about.headline}
                    </h2>
                    
                    <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent max-w-md" />
                    
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl relative">
                      {about.description}
                    </p>
                  </div>

                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative shrink-0 w-full md:w-auto flex justify-center md:justify-end"
                  >
                    <div className="relative w-full max-w-xs md:w-72 aspect-square">
                      {/* Frame corners */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-foreground/30" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-foreground/30" />
                      <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-foreground/30" />
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-foreground/30" />
                      
                      {/* Image container */}
                      <div className="relative w-full h-full overflow-hidden group/img">
                        <Image
                          src={personal.image}
                          alt={personal.name}
                          fill
                          className="object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700"
                          priority
                          sizes="(max-width: 768px) 256px, 288px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-transparent opacity-60 group-hover/img:opacity-0 transition-opacity duration-500" />
                        
                        {/* Scan line effect */}
                        <motion.div
                          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
                          animate={{ y: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Skills */}
          <RevealOnScroll delay={0.3}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Code2 className="w-8 h-8 text-foreground" strokeWidth={1} />
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  Skills & Expertise
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {about.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group/skill relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover/skill:opacity-100 blur-lg transition-opacity duration-300" />
                    
                    <div className="relative px-4 py-4 border border-zinc-200 dark:border-zinc-800 group-hover/skill:border-foreground/20 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono tracking-wider">
                          {skill}
                        </span>
                        <motion.span
                          className="text-xs font-light text-foreground/10 group-hover/skill:text-foreground/20"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {(index + 1).toString().padStart(2, '0')}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Experience */}
          <RevealOnScroll delay={0.4}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8 text-foreground" strokeWidth={1} />
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  Experience
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />
              </div>

              <div className="space-y-6">
                {about.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group/exp relative"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover/exp:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 group-hover/exp:border-foreground/40 pl-8 py-6 transition-all duration-300 space-y-3">
                      {/* Timeline Dot */}
                      <motion.div
                        className="absolute -left-1.5 top-8 w-3 h-3 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-background group-hover/exp:border-foreground group-hover/exp:bg-foreground transition-all"
                        whileHover={{ scale: 1.5 }}
                      />

                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <h4 className="text-xl md:text-2xl font-light tracking-tight">
                            {exp.role}
                          </h4>
                          <p className="text-muted-foreground font-mono text-sm">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 w-fit">
                          {exp.period}
                        </span>
                      </div>
                      
                      <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent max-w-md" />
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* CTA */}
          <RevealOnScroll delay={0.5}>
            <div className="relative group py-16">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
              
              <div className="relative text-center space-y-6 p-12 border border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/20 transition-colors">
                <h3 className="text-3xl md:text-4xl font-light">
                  Let&apos;s work together
                </h3>
                
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Interested in collaborating? I&apos;m always open to discussing new projects and opportunities.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="font-normal">GET IN TOUCH</span>
                    </Link>
                  </Magnetic>

                  <Magnetic>
                    <a
                      href={personal.resumeUrl}
                      download
                      className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 transition-all backdrop-blur-sm"
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-normal">DOWNLOAD CV</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
