import { create } from 'zustand';

interface UIStore {
  categorySheetOpen: boolean;
  openCategorySheet: () => void;
  closeCategorySheet: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  categorySheetOpen: false,
  openCategorySheet: () => set({ categorySheetOpen: true }),
  closeCategorySheet: () => set({ categorySheetOpen: false }),
}));
