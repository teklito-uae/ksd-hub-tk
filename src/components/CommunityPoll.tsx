import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Vote, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { weeklyPoll } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

export function CommunityPoll() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyVoted = localStorage.getItem('ksd_polled');
      if (!alreadyVoted) {
        setIsVisible(true);
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleVote = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setHasVoted(true);
      localStorage.setItem('ksd_polled', 'true');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[90] w-[calc(100%-2rem)] md:w-[320px] bg-secondary text-white rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="size-4" />
            </Button>

            {!hasVoted ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Vote className="size-4 text-primary" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Community Poll</h4>
                </div>
                
                <h3 className="text-base font-bold mb-5 pr-6 leading-tight">
                  {weeklyPoll.question}
                </h3>

                <div className="space-y-2">
                  {weeklyPoll.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleVote(opt.label)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98]",
                        selectedOption === opt.label && "border-primary bg-primary/10 text-primary"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Thanks for voting!</h3>
                <p className="text-white/60 text-xs mb-4">Your opinion helps us curate better results for everyone.</p>
                <div className="space-y-3">
                  {weeklyPoll.options.map((opt) => {
                    const percentage = Math.round((opt.votes / weeklyPoll.totalVotes) * 100);
                    return (
                      <div key={opt.label} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span>{opt.label}</span>
                          <span className={opt.label === selectedOption ? "text-primary" : ""}>{percentage}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className={cn("h-full", opt.label === selectedOption ? "bg-primary" : "bg-white/20")}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button 
                  onClick={() => setIsVisible(false)}
                  className="mt-6 w-full rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
