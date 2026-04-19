import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { categories } from '@/lib/dummy-data';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';

const accentColors: Record<string, string> = {
  'real-estate':   'bg-blue-50 text-blue-600',
  'tech-it':       'bg-violet-50 text-violet-600',
  'education':     'bg-amber-50 text-amber-600',
  'healthcare':    'bg-rose-50 text-rose-600',
  'shopping':      'bg-emerald-50 text-emerald-600',
  'automobile':    'bg-orange-50 text-orange-600',
  'food-dining':   'bg-red-50 text-red-500',
  'events':        'bg-pink-50 text-pink-600',
  'tourism':       'bg-teal-50 text-teal-600',
  'construction':  'bg-stone-50 text-stone-600',
};

export function CategorySheet() {
  const { categorySheetOpen, closeCategorySheet } = useUIStore();

  return (
    <Drawer open={categorySheetOpen} onOpenChange={(open) => !open && closeCategorySheet()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between px-5 pt-4 pb-2">
          <DrawerTitle className="text-base font-bold text-secondary">All Categories</DrawerTitle>
          <DrawerClose asChild>
            <button
              onClick={closeCategorySheet}
              className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="size-4 text-gray-500" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Scrollable grid */}
        <div className="px-5 pb-8 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3 pt-2">
            {categories.map((cat) => {
              const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
              const accent = accentColors[cat.slug] ?? 'bg-gray-50 text-gray-600';
              return (
                <Link
                  key={cat.id}
                  to={`/directory/${cat.slug}`}
                  onClick={closeCategorySheet}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm active:scale-95 transition-all"
                >
                  <div className={cn('size-11 rounded-xl flex items-center justify-center', accent)}>
                    <Icon className="size-5 stroke-[1.75]" />
                  </div>
                  <span className="text-[10px] font-semibold text-secondary text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
