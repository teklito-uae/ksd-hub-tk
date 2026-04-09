import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a594?w=1400&h=500&fit=crop&q=80',
    tag: 'Real Estate',
    title: 'Find Your Dream Property in Kasaragod',
    subtitle: 'Explore luxury villas, apartments, and commercial spaces.',
    cta: 'Browse Listings',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1562181946-a73d1bb63b4a?w=1400&h=500&fit=crop&q=80',
    tag: 'Food & Dining',
    title: 'Authentic Malabar Cuisine, Near You',
    subtitle: 'From spicy biryani to fresh seafood — discover the best local restaurants.',
    cta: 'Explore Eateries',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&h=500&fit=crop&q=80',
    tag: 'Tourism & Stays',
    title: 'Explore Bekal\'s Coastal Luxury',
    subtitle: 'Book stays at handpicked resorts right on the Arabian Sea.',
    cta: 'See Resorts',
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-b-3xl shadow-2xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative shrink-0 w-full min-h-[480px] md:min-h-[540px] flex items-center">
              {/* BG */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl py-16">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-white"
                >
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-3 py-1 rounded-lg mb-4">
                    {slide.tag}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] mb-4 tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <button className="bg-primary hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/30">
                    {slide.cta}
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-primary/80 backdrop-blur-md border border-primary/30 flex items-center justify-center text-white hover:bg-primary transition-all"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
