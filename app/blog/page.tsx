"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Filter, BookOpen } from "lucide-react";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import postsData from "@/data/posts.json";


export default function BlogPage() {
  const posts = postsData;
  const [filter, setFilter] = useState("all");
  
  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(p => p.category === filter);

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
                    Blog
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-6">
                    Thoughts on design, development, and building better digital experiences.
                  </p>
                </div>
                {/* Post Count */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex flex-col items-center gap-2 px-6 py-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <BookOpen className="w-6 h-6 text-muted-foreground" strokeWidth={1} />
                  <span className="text-3xl font-light">{filteredPosts.length}</span>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {filter === "all" ? "POSTS" : filter.toUpperCase()}
                  </span>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Category Filter */}
          <RevealOnScroll delay={0.2}>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Category:</span>
              </div>
              {categories.map((category) => (
                <Magnetic key={category}>
                  <motion.button
                    onClick={() => setFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-2.5 text-sm font-mono tracking-wider transition-all duration-300 ${
                      filter === category
                        ? "bg-foreground text-background border border-foreground"
                        : "border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 backdrop-blur-sm"
                    }`}
                  >
                    {category.toUpperCase()}
                    {filter === category && (
                      <motion.div
                        layoutId="activeCategoryFilter"
                        className="absolute inset-0 bg-foreground -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </Magnetic>
              ))}
            </div>
          </RevealOnScroll>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block relative h-full group-hover:bg-background/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300 border border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/20"
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
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex flex-col items-center gap-4 p-12 border border-zinc-200 dark:border-zinc-800">
                <BookOpen className="w-12 h-12 text-muted-foreground/50" strokeWidth={1} />
                <p className="text-xl text-muted-foreground font-light">
                  No posts found in this category.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="text-sm font-mono text-foreground underline hover:no-underline"
                >
                  View all posts
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
