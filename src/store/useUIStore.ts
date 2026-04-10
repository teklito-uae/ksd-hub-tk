import { create } from 'zustand';

interface UIStore {
  categorySheetOpen: boolean;
  openCategorySheet: () => void;
  closeCategorySheet: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  categorySheetOpen: false,
  openCategorySheet: () => set({ categorySheetOpen: true }),
  closeCategorySheet: () => set({ categorySheetOpen: false }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
