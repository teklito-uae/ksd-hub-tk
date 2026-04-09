import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Business } from '@/types';
import { BusinessCard } from './BusinessCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  businesses: Business[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  className?: string;
}

export function BusinessCarousel({ businesses, title, subtitle, viewAllHref = '#', className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!businesses.length) return null;

  return (
    <div className={cn('', className)}>
      {/* Header */}
      <div className="flex items-end justify-between mb-5 px-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-1.5">
            <button
              onClick={scrollPrev}
              className="size-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={scrollNext}
              className="size-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-md shadow-primary/20"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <a
              href={viewAllHref}
              className="inline-flex items-center text-xs font-semibold text-primary hover:text-orange-600 transition-colors group"
            >
              View all <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden -mx-1 pb-8 -mb-8">
        <div className="flex gap-4 px-1 py-1">
          {businesses.map((business, idx) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="shrink-0 w-[280px] md:w-[300px]"
            >
              <BusinessCard business={business} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
