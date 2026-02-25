"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { AestheticBackground } from "@/components/aesthetic-background";
import { RevealOnScroll, Magnetic } from "@/components/micro-interactions";
import personalData from "@/data/personal.json";
import contactData from "@/data/contact.json";
import { useState } from "react";

export default function ContactPage() {
  const personal = personalData;
  const contact = contactData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AestheticBackground />
      
      <div className="relative pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-foreground to-transparent mx-auto"
              />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter">
                Let&apos;s Talk
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                {contact.subtitle}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <RevealOnScroll delay={0.2}>
                <div className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                    Get in Touch
                  </h2>

                  <div className="space-y-6">
                    {/* Email */}
                    <motion.div
                      className="group relative"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      
                      <div className="relative flex items-start gap-4 p-4 border-l-2 border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/40 transition-colors">
                        <Mail className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                        <div>
                          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1">
                            Email
                          </p>
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-sm md:text-base hover:underline font-mono"
                          >
                            {contact.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      className="group relative"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      
                      <div className="relative flex items-start gap-4 p-4 border-l-2 border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/40 transition-colors">
                        <Phone className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                        <div>
                          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1">
                            Phone
                          </p>
                          <a 
                            href={`tel:${contact.phone}`}
                            className="text-sm md:text-base hover:underline font-mono"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                      className="group relative"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      
                      <div className="relative flex items-start gap-4 p-4 border-l-2 border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/40 transition-colors">
                        <MapPin className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                        <div>
                          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1">
                            Location
                          </p>
                          <p className="text-sm md:text-base font-mono">{personal.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="pt-4">
                    <div className="h-px bg-gradient-to-r from-muted-foreground/20 to-transparent mb-6" />
                    <p className="text-sm text-muted-foreground font-mono">
                      {contact.availability}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4">
                    <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4">
                      Connect
                    </p>
                    <div className="flex items-center gap-4">
                      {[
                        { icon: Github, href: personal.social.github },
                        { icon: Linkedin, href: personal.social.linkedin },
                        { icon: Twitter, href: personal.social.twitter },
                        { icon: Instagram, href: personal.social.instagram }
                      ].filter(social => social.href && social.href.trim() !== '').map((social, i) => (
                        <Magnetic key={i}>
                          <motion.a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 hover:border-foreground/40 flex items-center justify-center transition-colors group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                          </motion.a>
                        </Magnetic>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll delay={0.4}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-zinc-200/0 via-zinc-200/5 to-zinc-200/0 dark:from-zinc-800/0 dark:via-zinc-800/10 dark:to-zinc-800/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
                  
                  <form onSubmit={handleSubmit} className="relative space-y-6 p-8 md:p-10 border border-zinc-200 dark:border-zinc-800 group-hover:border-foreground/20 transition-colors backdrop-blur-sm">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    <div className="relative">
                      <label htmlFor="name" className="block text-xs font-mono tracking-widest uppercase mb-2 text-muted-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-foreground outline-none transition-colors font-light"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-xs font-mono tracking-widest uppercase mb-2 text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-foreground outline-none transition-colors font-light"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-xs font-mono tracking-widest uppercase mb-2 text-muted-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:border-foreground outline-none transition-colors resize-none font-light"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <Magnetic>
                      <motion.button
                        type="submit"
                        className="w-full px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 flex items-center justify-center gap-3 font-normal"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </motion.button>
                    </Magnetic>
                  </form>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
