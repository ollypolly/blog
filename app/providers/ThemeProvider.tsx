'use client';

import { useEffect } from 'react';
import { DARK, LIGHT, SYSTEM, useThemeStore } from '../store/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    
    // Remove any existing theme classes
    html.classList.remove('dark');
    
    if (theme === DARK) {
      html.classList.add('dark');
    } else if (theme === LIGHT) {
      // Light mode - no class needed, default styles
    } else if (theme === SYSTEM) {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      }
    }
  }, [theme]);

  return <>{children}</>;
}