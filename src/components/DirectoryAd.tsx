import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Info, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const AD_MESSAGES = [
  "Grow Your Local Business Fast",
  "Boost Sales with Hub Premium",
  "Reach 10k+ Local Residents",
  "List Your Store for Free Today"
];

export function DirectoryAd() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % AD_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-none p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden group border-l-4 border-l-primary/40">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="size-12 bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
          <span className="text-[9px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">ADS</span>
        </div>
        <div className="min-w-0 flex flex-col justify-center h-12">
          <AnimatePresence mode="wait">
            <motion.h4
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-bold text-secondary flex items-center gap-2"
            >
              {AD_MESSAGES[index]}
              <ExternalLink className="size-3 text-muted-foreground opacity-50" />
            </motion.h4>
          </AnimatePresence>
          <p className="text-[10px] text-muted-foreground truncate max-w-xs md:max-w-md uppercase tracking-wider font-semibold opacity-70">
            register your business on kasaragod hub
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="text-[9px] font-bold text-muted-foreground mr-2 hidden md:flex items-center gap-1 uppercase tracking-widest opacity-60">
          <Info className="size-3" /> Sponsored link
        </div>
        <button className="flex-1 sm:flex-none h-9 px-6 bg-secondary text-white rounded-none text-[10px] font-black hover:bg-black transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest">
          <PlusCircle className="size-3" /> Get Started
        </button>
      </div>
    </div>
  );
}
