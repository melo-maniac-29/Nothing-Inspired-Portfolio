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
              ].filter(social => social.href && social.href.trim() !== '' && social.href !== 'mailto:').map((social, i) => (
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

        {/* Scroll Indicator - Centered & Aesthetic */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            {/* Animated Dots */}
            <div className="flex flex-col gap-1.5">
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="w-1 h-1 rounded-full bg-muted-foreground mx-auto"
              />
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="w-1 h-1 rounded-full bg-muted-foreground mx-auto"
              />
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="w-1 h-1 rounded-full bg-muted-foreground mx-auto"
              />
            </div>

            {/* Text */}
            <span className="text-xs font-mono text-muted-foreground tracking-widest">
              SCROLL
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="relative py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm font-normal tracking-widest mb-4 text-muted-foreground">
                SELECTED WORK
              </p>
              <h2 className="text-4xl md:text-5xl font-light">
                Featured Projects
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-20">
            {projects.filter(p => p.featured).sort((a, b) => a.order - b.order).map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 0.1}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                  <div className="relative group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 lg:p-12 overflow-hidden transition-colors duration-300">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] dark:opacity-[0.03]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    <div className="relative flex flex-col lg:flex-row gap-8 md:gap-12">
                      {/* Content */}
                      <div className="flex-1 space-y-6">
                        {/* Project Number */}
                        <div className="flex items-center gap-4">
                          <motion.span
                            className="text-5xl md:text-6xl font-light text-muted-foreground/30"
                            whileHover={{ scale: 1.1 }}
                          >
                            {project.order.toString().padStart(2, '0')}
                          </motion.span>
                          <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-light tracking-tight group-hover:tracking-wide transition-all duration-300">
                          {project.title}
                        </h3>

                        {/* Category */}
                        <p className="text-xs tracking-widest text-muted-foreground uppercase">
                          {project.category}
                        </p>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed max-w-xl">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-1.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-foreground transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-6 pt-4">
                          {project.liveUrl && project.liveUrl.trim() !== '' && (
                            <Magnetic>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link flex items-center gap-2 text-sm font-mono hover:text-foreground transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                <span>View Live</span>
                              </a>
                            </Magnetic>
                          )}
                          {project.githubUrl && project.githubUrl.trim() !== '' && (
                            <Magnetic>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link flex items-center gap-2 text-sm font-mono hover:text-foreground transition-colors"
                              >
                                <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                                <span>Source</span>
                              </a>
                            </Magnetic>
                          )}
                        </div>
                      </div>

                      {/* Visual Element */}
                      <div className="lg:w-80 xl:w-96">
                        <div className="aspect-square bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden group/img">
                          {/* Project Image */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
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
                              opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />

                          {/* Center Number */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                              className="text-9xl font-light text-foreground/5 group-hover/img:text-foreground/10 transition-colors duration-500"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {project.order.toString().padStart(2, '0')}
                            </motion.span>
                          </div>

                          {/* Hover Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-foreground/0 to-foreground/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24 px-4 md:px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm font-normal tracking-widest mb-4 text-muted-foreground">
                WHAT I DO
              </p>
              <h2 className="text-4xl md:text-5xl font-light">
                Services
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => {
              const IconComponent = service.icon === 'code' ? Code2 : service.icon === 'palette' ? Palette : Zap;
              return (
                <RevealOnScroll key={i} delay={i * 0.15}>
                  <motion.div
                    className="group relative h-full"
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Animated Border */}
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
                    />

                    <div className="relative h-full group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 lg:p-10 transition-colors duration-300">
                      {/* Background Number */}
                      <div className="absolute top-4 right-4 text-7xl font-light text-foreground/[0.02] group-hover:text-foreground/[0.04] transition-colors duration-500">
                        0{i + 1}
                      </div>

                      <div className="relative space-y-6">
                        {/* Icon with Animation */}
                        <div className="relative w-16 h-16">
                          <motion.div
                            className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                          <IconComponent
                            className="relative w-16 h-16 text-foreground group-hover:scale-110 transition-transform duration-300"
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-light tracking-tight group-hover:tracking-wide transition-all duration-300">
                          {service.title}
                        </h3>

                        {/* Divider */}
                        <motion.div
                          className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2, duration: 0.8 }}
                        />

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>

                        {/* Hover Arrow */}
                        <motion.div
                          className="flex items-center gap-2 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <span>Learn more</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="relative py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm font-normal tracking-widest mb-4 text-muted-foreground">
                RECOGNITION
              </p>
              <h2 className="text-4xl md:text-5xl font-light">
                Awards & Achievements
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {awards.filter(a => a.featured).map((award, i) => (
              <RevealOnScroll key={award.id} delay={i * 0.1}>
                <motion.div
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative h-full group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                      }} />
                    </div>

                    <div className="relative space-y-4">
                      {/* Award Icon */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className="w-12 h-12 flex items-center justify-center"
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Award className="w-12 h-12 text-foreground" strokeWidth={1} />
                        </motion.div>
                        <span className="text-4xl font-light text-foreground/5">
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

                      {/* Year Badge */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span className="text-xs tracking-widest text-muted-foreground">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="relative py-24 px-4 md:px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm font-normal tracking-widest mb-4 text-muted-foreground">
                THOUGHTS & INSIGHTS
              </p>
              <h2 className="text-4xl md:text-5xl font-light">
                Recent Posts
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.filter(p => p.featured).map((post, i) => (
              <RevealOnScroll key={post.id} delay={i * 0.1}>
                <motion.article
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative h-full group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300"
                  >
                    {/* Background Number */}
                    <div className="absolute top-4 right-4 text-6xl font-light text-foreground/[0.02] group-hover:text-foreground/[0.04] transition-colors duration-500">
                      {post.order.toString().padStart(2, '0')}
                    </div>

                    <div className="relative space-y-4 h-full flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="inline-block px-3 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
                        {post.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-light tracking-tight group-hover:tracking-wide transition-all duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />

                      {/* Read More */}
                      <motion.div
                        className="flex items-center gap-2 text-sm font-mono group-hover:gap-3 transition-all duration-300"
                      >
                        <span>Read more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
                {contactData.title}
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {contactData.subtitle}
              </p>

              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background font-normal hover:bg-foreground/90 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    START PROJECT
                  </span>
                </Link>
              </Magnetic>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>


