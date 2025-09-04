import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const DARK = 'dark';
export const LIGHT = 'light';
export const SYSTEM = 'system';

type Theme = typeof LIGHT | typeof DARK | typeof SYSTEM;

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: SYSTEM,
      setTheme: (theme: Theme) => {
        set({ theme });
      },
      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === DARK ? LIGHT : DARK });
      },
    }),
    { name: 'theme-storage' }
  )
);
