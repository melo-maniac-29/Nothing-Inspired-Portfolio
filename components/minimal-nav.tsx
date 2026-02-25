"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Awards", href: "/awards" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function MinimalNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/0 backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: `hsl(var(--background) / ${backgroundOpacity})`,
        borderBottomColor: `hsl(var(--border) / ${borderOpacity})`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <motion.div
              className="text-xl font-light tracking-tight font-mono"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="relative text-foreground">
                ALLEN
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link
                      href={item.href}
                      className="relative group px-4 py-2"
                    >
                      <span className={`text-sm font-mono tracking-wider transition-colors ${
                        isActive ? 'text-foreground font-normal' : 'text-muted-foreground hover:text-foreground'
                      }`}>
                        {item.name.toUpperCase()}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 border border-zinc-300 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-900/50"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile: Menu + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-foreground"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with Stunning Animation */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-8 pb-6 border-t border-border/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-2 pt-6">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative group block"
                    >
                      <div className={`px-4 py-3 transition-all ${
                        isActive ? 'border-l-2 border-foreground bg-zinc-100 dark:bg-zinc-900' : 'border-l-2 border-transparent hover:border-muted-foreground'
                      }`}>
                        <span className={`text-lg font-mono tracking-wider ${
                          isActive ? 'text-foreground font-normal' : 'text-muted-foreground'
                        }`}>
                          {item.name.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
