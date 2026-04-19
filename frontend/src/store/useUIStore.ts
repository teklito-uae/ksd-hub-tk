import { create } from 'zustand';

interface UIState {
  categorySheetOpen: boolean;
  searchOpen: boolean;
  authModalOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  openCategorySheet: () => void;
  closeCategorySheet: () => void;
  setSearchOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  initTheme: () => void;
}

const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('ksd-theme') as 'light' | 'dark' | 'system') || 'light';
};

const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  const root = document.documentElement;
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useUIStore = create<UIState>((set) => ({
  categorySheetOpen: false,
  searchOpen: false,
  authModalOpen: false,
  theme: getInitialTheme(),
  openCategorySheet: () => set({ categorySheetOpen: true }),
  closeCategorySheet: () => set({ categorySheetOpen: false }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  setTheme: (theme) => {
    localStorage.setItem('ksd-theme', theme);
    applyTheme(theme);
    set({ theme });
  },
  initTheme: () => {
    const theme = getInitialTheme();
    applyTheme(theme);
    set({ theme });
  },
}));
