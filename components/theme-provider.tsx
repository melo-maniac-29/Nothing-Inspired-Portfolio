"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface CustomThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<CustomThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<string>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NextThemesProvider {...props} attribute="class" defaultTheme={theme}>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}