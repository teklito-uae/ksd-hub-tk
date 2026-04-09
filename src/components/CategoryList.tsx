import { Category } from '@/types';
import * as Icons from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

interface Props {
  categories: Category[];
}

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

// Show 7 categories then "More" card = 8 total = 2 rows of 4 on mobile
const MOBILE_LIMIT = 7;

export function CategoryList({ categories }: Props) {
  const { openCategorySheet } = useUIStore();
  const mobileVisible = categories.slice(0, MOBILE_LIMIT);

  return (
    <>
      {/* ──── MOBILE: 4‑column icon grid ──── */}
      <div className="md:hidden grid grid-cols-4 gap-3">
        {mobileVisible.map((cat, i) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const accent = accentColors[cat.slug] ?? 'bg-gray-50 text-gray-600';

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className={cn('w-full aspect-square max-w-[68px] rounded-2xl flex items-center justify-center mx-auto', accent)}>
                <Icon className="size-6 stroke-[1.75]" />
              </div>
              <span className="text-[10px] font-semibold text-secondary text-center leading-tight w-full px-1 line-clamp-2">
                {cat.name}
              </span>
            </motion.button>
          );
        })}

        {/* "More" card */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: MOBILE_LIMIT * 0.04 }}
          onClick={openCategorySheet}
          className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
        >
          <div className="w-full aspect-square max-w-[68px] rounded-2xl flex items-center justify-center mx-auto bg-secondary/8 border-2 border-dashed border-gray-200">
            <LayoutGrid className="size-6 stroke-[1.5] text-gray-400" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground text-center leading-tight">
            More
          </span>
        </motion.button>
      </div>

      {/* ──── DESKTOP: compact 5‑col pill grid ──── */}
      <div className="hidden md:grid grid-cols-5 gap-2.5">
        {categories.map((cat, i) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const accent = accentColors[cat.slug] ?? 'bg-gray-50 text-gray-600';

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ y: -2 }}
              className="group flex items-center gap-3 bg-white border border-gray-100 hover:border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className={cn('size-9 rounded-xl flex items-center justify-center shrink-0', accent)}>
                <Icon className="size-4 stroke-[1.75]" />
              </div>
              <span className="text-xs font-semibold text-secondary leading-tight">{cat.name}</span>
            </motion.button>
          );
        })}

        {/* Desktop "More" pill */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categories.length * 0.04, duration: 0.3 }}
          whileHover={{ y: -2 }}
          onClick={openCategorySheet}
          className="flex items-center gap-3 bg-white border border-dashed border-gray-200 hover:border-primary/40 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="size-9 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 group-hover:bg-primary/10 transition-colors">
            <LayoutGrid className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
            All Categories
          </span>
        </motion.button>
      </div>
    </>
  );
}
