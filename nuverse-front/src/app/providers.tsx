"use client";

import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Providers Component
 * 
 * Wraps the application with necessary providers including
 * error boundaries and theme enforcement.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // Always enforce dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
