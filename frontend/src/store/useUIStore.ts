import { create } from 'zustand';

interface UIState {
  categorySheetOpen: boolean;
  searchOpen: boolean;
  authModalOpen: boolean;
  openCategorySheet: () => void;
  closeCategorySheet: () => void;
  setSearchOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  categorySheetOpen: false,
  searchOpen: false,
  authModalOpen: false,
  openCategorySheet: () => set({ categorySheetOpen: true }),
  closeCategorySheet: () => set({ categorySheetOpen: false }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
}));
