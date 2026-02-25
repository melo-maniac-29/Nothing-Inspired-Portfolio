"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    conclusion: string;
  };
}

interface BlogPostClientProps {
  post: Post;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AestheticBackground />

      <div className="relative pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Magnetic>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-mono">Back to Blog</span>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Article Header */}
          <RevealOnScroll>
            <header className="space-y-8 mb-16">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800"
              >
                <BookOpen className="w-4 h-4 text-muted-foreground" strokeWidth={1} />
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Meta Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={1} />
                  <span className="font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" strokeWidth={1} />
                  <span className="font-mono">{post.readTime}</span>
                </div>
              </motion.div>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-muted-foreground font-light leading-relaxed max-w-3xl"
              >
                {post.excerpt}
              </motion.p>
            </header>
          </RevealOnScroll>

          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <RevealOnScroll delay={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {post.content.introduction}
                </p>
              </motion.div>
            </RevealOnScroll>

            {/* Content Sections */}
            {post.content.sections.map((section, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6 relative">
                    <span className="relative z-10">{section.title}</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-foreground to-transparent" />
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {section.content.split('. ').map((sentence, i) => (
                      <p key={i} className="text-lg">
                        {sentence.trim()}{sentence.trim() && '.'}
                      </p>
                    ))}
                  </div>
                </motion.section>
              </RevealOnScroll>
            ))}

            {/* Conclusion */}
            <RevealOnScroll delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 p-8 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="text-xl font-light mb-4">Conclusion</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.content.conclusion}
                </p>
              </motion.div>
            </RevealOnScroll>
          </article>

          {/* Article Footer */}
          <RevealOnScroll delay={0.3}>
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-t border-zinc-200 dark:border-zinc-800 pt-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-mono">
                    Published on {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {post.readTime} • {post.category}
                  </p>
                </div>

                <Magnetic>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 transition-colors group">
                    <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1} />
                    <span className="text-sm font-mono">Share</span>
                  </button>
                </Magnetic>
              </div>
            </motion.footer>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}