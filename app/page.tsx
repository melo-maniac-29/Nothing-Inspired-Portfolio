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
import { useRef, useMemo } from 'react';
import personalData from '@/data/personal.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import awardsData from '@/data/awards.json';
import postsData from '@/data/posts.json';
import contactData from '@/data/contact.json';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize scroll values to prevent unnecessary re-renders
  const { scrollYProgress } = useMemo(() => useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  }), [containerRef]);

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
          {/* ...rest of the component remains unchanged... */}
        </motion.div>
      </section>

      {/* Remaining sections remain unchanged */}
    </main>
  );
}