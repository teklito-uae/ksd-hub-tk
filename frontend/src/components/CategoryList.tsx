import { Category } from '@/types';
import * as Icons from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

interface Props {
  categories: Category[];
  loading?: boolean;
}

export function CategoryList({ categories, loading }: Props) {
  const { openCategorySheet } = useUIStore();
  const navigate = useNavigate();

  // On mobile we show exactly 15 categories + 1 "More" = 16 (4x4)
  const mobileVisible = categories.slice(0, 15);

  // Map category IDs to specific design-token tints
  const getTint = (id: string) => {
    const tints: Record<string, string> = {
      '1': 'bg-blue-50 text-blue-600',
      '2': 'bg-violet-50 text-violet-600',
      '3': 'bg-amber-50 text-amber-600',
      '4': 'bg-rose-50 text-rose-600',
      '5': 'bg-emerald-50 text-emerald-600',
      '6': 'bg-orange-50 text-orange-600',
      '7': 'bg-red-50 text-red-500',
      '8': 'bg-pink-50 text-pink-600',
      '9': 'bg-teal-50 text-teal-600',
      '10': 'bg-stone-50 text-stone-600',
      '11': 'bg-cyan-50 text-cyan-600',
      '12': 'bg-lime-50 text-lime-600',
      '13': 'bg-red-50 text-red-600',
      '14': 'bg-fuchsia-50 text-fuchsia-600',
      '15': 'bg-green-50 text-green-600',
      '16': 'bg-sky-50 text-sky-600',
      '17': 'bg-indigo-50 text-indigo-600',
      '18': 'bg-blue-50 text-blue-700',
      '19': 'bg-yellow-50 text-yellow-700',
      '20': 'bg-orange-50 text-orange-700',
    };
    return tints[id] || 'bg-gray-50 text-secondary';
  };

  if (loading) {
    return (
      <>
        {/* Mobile Skeleton */}
        <div className="md:hidden grid grid-cols-4 gap-x-2 gap-y-5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Skeleton className="size-12.5 rounded-2xl" />
              <Skeleton className="h-2.5 w-10" />
            </div>
          ))}
        </div>
        {/* Desktop Skeleton */}
        <div className="hidden md:grid grid-cols-10 gap-x-4 gap-y-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Skeleton className="w-full aspect-square rounded-[1.5rem]" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* ──── MOBILE: 4x4 icon grid ──── */}
      <div className="md:hidden grid grid-cols-4 gap-x-2 gap-y-5">
        {mobileVisible.map((cat) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const tint = getTint(cat.id);

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/directory?category=${cat.id}`)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className={cn("w-12.5 aspect-square rounded-2xl flex items-center justify-center mx-auto border border-white shadow-sm", tint)}>
                <Icon className="size-5.5 stroke-[1.25]" />
              </div>
              <span className="text-[9.5px] font-bold text-secondary/80 text-center leading-tight w-full px-0.5 line-clamp-2">
                {cat.name}
              </span>
            </motion.button>
          );
        })}

        {/* mobile "More" card */}
        <motion.button
          onClick={openCategorySheet}
          className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
        >
          <div className="w-12.5 aspect-square rounded-2xl flex items-center justify-center mx-auto bg-gray-900 border border-gray-900 shadow-sm">
            <LayoutGrid className="size-5.5 stroke-[1.25] text-white" />
          </div>
          <span className="text-[9.5px] font-bold text-secondary text-center leading-tight">
            More
          </span>
        </motion.button>
      </div>

      {/* ──── DESKTOP: 20 icons in 2 rows ──── */}
      <div className="hidden md:grid grid-cols-10 gap-x-4 gap-y-12">
        {categories.slice(0, 20).map((cat) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const tint = getTint(cat.id);

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate(`/directory?category=${cat.id}`)}
              className="group flex flex-col items-center gap-4"
            >
              <div className={cn("w-full aspect-square rounded-[1.5rem] border border-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300", tint)}>
                <Icon className="size-8 stroke-[1.25] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}


