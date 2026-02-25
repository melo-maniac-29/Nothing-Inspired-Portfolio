"use client";

import { useState, useEffect } from "react";
import { MinimalLoader } from "./minimal-loader";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <MinimalLoader />;
  }

  return <>{children}</>;
}
