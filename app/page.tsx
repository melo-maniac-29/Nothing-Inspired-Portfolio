'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Instagram, ExternalLink, Sparkles, Code2, Palette, Zap, Award, Calendar, Clock } from 'lucide-react';
import { AestheticBackground, FloatingOrbs, NothingGlow } from '@/components/aesthetic-background';
import { Magnetic, RevealOnScroll, StaggerChildren, fadeInUp, GlowCard } from '@/components/micro-interactions';
import { NothingText } from '@/components/nothing-text';
import {
  GlitchText,
  ShimmerText,
  RevealText,
  NeonText,
  BlurText,
  StaggerText,
  GradientText,
  FloatText
} from '@/components/text-effects';
import { useRef } from 'react';
import personalData from '@/data/personal.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import awardsData from '@/data/awards.json';
import postsData from '@/data/posts.json';
import contactData from '@/data/contact.json';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const roles = ['DEVELOPER', 'DESIGNER', 'CREATOR', 'INNOVATOR'];
  const personal = personalData;
  const projects = projectsData;
  const services = servicesData;
  const awards = awardsData;
  const posts = postsData;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AestheticBackground />
      <FloatingOrbs />
      <NothingGlow />

      {/* Hero Section - Truly Captivating */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-6">
        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-6xl w-full">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm transition-colors duration-300">
              <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-pulse" />
              <span className="text-sm font-normal text-zinc-700 dark:text-zinc-300 tracking-wide">
                AVAILABLE FOR WORK
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="text-center space-y-6 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-4">
                <NothingText texts={roles} className="text-foreground" interval={2500} />
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {personal.bio}
              </p>
            </motion.div>

            {/* CTA with Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            >
              <Magnetic>
                <Link
                  href="/projects"
                  className="group relative px-8 py-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 overflow-hidden transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="relative flex items-center gap-2 font-normal z-10">
                    View Work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/contact"
                  className="group px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 backdrop-blur-sm hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
                >
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-normal">
                    Let&apos;s Talk
                    <Mail className="w-4 h-4" />
                  </span>
                </Link>
              </Magnetic>
            </motion.div>

            {/* Social Links with Glow Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center justify-center gap-6 mt-12"
            >
              {[
                { icon: Github, href: personal.social.github, label: 'GitHub' },
                { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
                { icon: Instagram, href: personal.social.instagram, label: 'Instagram' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
              ].filter(social => social.href && social.href.trim() !== '' && !social.href.startsWith('mailto:') || social.label === 'Email').map((social, i) => (
                <Magnetic key={i}>
                  <motion.a
                    href={social.href}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <social.icon className="relative w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </motion.a>
                </Magnetic>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
