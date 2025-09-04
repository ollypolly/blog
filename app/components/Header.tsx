'use client';

import Link from 'next/link';
import { DARK, useThemeStore } from '../store/theme';

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === DARK;

  return (
    <header className="text-center py-8">
      <div className="flex justify-between items-center gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            blog
          </span>
          <span className="text-gray-900 dark:text-gray-100">.olly.live</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
