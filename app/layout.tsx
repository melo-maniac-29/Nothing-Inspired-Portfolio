import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { MinimalNav } from '@/components/minimal-nav';
import { LoadingProvider } from '@/components/loading-provider';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import personalData from '@/data/personal.json';

export const metadata: Metadata = {
  title: `${personalData.name} - ${personalData.title}`,
  description: personalData.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LoadingProvider>
            <div className="flex flex-col min-h-screen">
              <MinimalNav />
              
              <main className="flex-grow">
                {children}
              </main>
              
              {/* Minimal Footer */}
              <footer className="border-t border-border py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-sm font-mono text-muted-foreground">
                    <span>© 2024 {personalData.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {personalData.social.github && (
                      <Link 
                        href={personalData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github size={20} />
                      </Link>
                    )}
                    {personalData.social.linkedin && (
                      <Link 
                        href={personalData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin size={20} />
                      </Link>
                    )}
                    {personalData.email && (
                      <Link 
                        href={`mailto:${personalData.email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail size={20} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </footer>
          </div>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
