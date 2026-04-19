import { Category } from '@/types';
import * as Icons from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

interface Props {
  categories: Category[];
  loading?: boolean;
}

// Refined brand-aligned palette: subtle light bg + themed icon
const TINTS = [
  { bg: 'bg-red-50',     icon: 'text-red-600',     hover: 'group-hover:bg-red-100'     },
  { bg: 'bg-rose-50',    icon: 'text-rose-600',    hover: 'group-hover:bg-rose-100'    },
  { bg: 'bg-orange-50',  icon: 'text-orange-600',  hover: 'group-hover:bg-orange-100'  },
  { bg: 'bg-amber-50',   icon: 'text-amber-600',   hover: 'group-hover:bg-amber-100'   },
  { bg: 'bg-emerald-50', icon: 'text-emerald-700', hover: 'group-hover:bg-emerald-100' },
  { bg: 'bg-teal-50',    icon: 'text-teal-700',    hover: 'group-hover:bg-teal-100'    },
  { bg: 'bg-sky-50',     icon: 'text-sky-600',     hover: 'group-hover:bg-sky-100'     },
  { bg: 'bg-blue-50',    icon: 'text-blue-600',    hover: 'group-hover:bg-blue-100'    },
  { bg: 'bg-violet-50',  icon: 'text-violet-600',  hover: 'group-hover:bg-violet-100'  },
  { bg: 'bg-purple-50',  icon: 'text-purple-600',  hover: 'group-hover:bg-purple-100'  },
  { bg: 'bg-pink-50',    icon: 'text-pink-600',    hover: 'group-hover:bg-pink-100'    },
  { bg: 'bg-slate-100',  icon: 'text-slate-600',   hover: 'group-hover:bg-slate-200'   },
  { bg: 'bg-lime-50',    icon: 'text-lime-700',    hover: 'group-hover:bg-lime-100'    },
  { bg: 'bg-cyan-50',    icon: 'text-cyan-700',    hover: 'group-hover:bg-cyan-100'    },
];

function getTint(index: number) {
  return TINTS[index % TINTS.length];
}

export function CategoryList({ categories, loading }: Props) {
  const { openCategorySheet } = useUIStore();

  // Flatten: parent + all subcategories, each with slug-based URL
  const allItems = categories.flatMap((cat, parentIdx) => {
    const parentItem = { ...cat, _tintIdx: parentIdx * 2 };
    const children = (cat.children || []).map((child, childIdx) => ({
      ...child,
      _tintIdx: parentIdx * 2 + childIdx + 1,
    }));
    return [parentItem, ...children];
  });

  // Desktop: 10 per row, show up to 20 items (2 rows)
  const desktopItems = allItems.slice(0, 20);

  // Mobile: 4 per row, show up to 11 items + 1 "More" = 12 (3 rows of 4)
  const mobileItems = allItems.slice(0, 11);

  if (loading) {
    return (
      <>
        {/* Mobile Skeleton */}
        <div className="md:hidden grid grid-cols-4 gap-x-3 gap-y-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="size-14 rounded-2xl" />
              <Skeleton className="h-2.5 w-12" />
            </div>
          ))}
        </div>
        {/* Desktop Skeleton */}
        <div className="hidden md:grid grid-cols-10 gap-x-3 gap-y-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5">
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* ──── MOBILE: 4-col icon grid ──── */}
      <div className="md:hidden grid grid-cols-4 gap-x-3 gap-y-5">
        {mobileItems.map((cat, i) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const tint = getTint(cat._tintIdx ?? i);

          return (
            <Link
              key={cat.id}
              to={`/directory/${cat.slug}`}
              className="group flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className={cn(
                "size-14 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-200",
                tint.bg, tint.hover
              )}>
                <Icon className={cn("size-6 stroke-[1.4]", tint.icon)} />
              </div>
              <span className="text-[10px] font-semibold text-secondary/75 text-center leading-tight w-full px-0.5 line-clamp-2">
                {cat.name}
              </span>
            </Link>
          );
        })}

        {/* "More" card */}
        <button
          onClick={openCategorySheet}
          className="group flex flex-col items-center gap-2 active:scale-95 transition-transform"
        >
          <div className="size-14 rounded-2xl flex items-center justify-center mx-auto bg-gray-900 group-hover:bg-secondary transition-colors duration-200">
            <LayoutGrid className="size-6 stroke-[1.4] text-white" />
          </div>
          <span className="text-[10px] font-semibold text-secondary text-center leading-tight">
            More
          </span>
        </button>
      </div>

      {/* ──── DESKTOP: 10-per-row, 2 rows ──── */}
      <div className="hidden md:grid grid-cols-10 gap-x-3 gap-y-6">
        {desktopItems.map((cat, i) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const tint = getTint(cat._tintIdx ?? i);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
            >
              <Link
                to={`/directory/${cat.slug}`}
                className="group flex flex-col items-center gap-2.5"
              >
                <div className={cn(
                  "w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-200 shadow-sm",
                  tint.bg, tint.hover,
                  "group-hover:shadow-md group-hover:scale-105"
                )}>
                  <Icon className={cn("size-7 stroke-[1.25] group-hover:scale-110 transition-transform duration-200", tint.icon)} />
                </div>
                <span className="text-[11px] font-semibold text-secondary/75 group-hover:text-primary transition-colors duration-150 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
