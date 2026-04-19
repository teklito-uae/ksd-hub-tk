import { useState, useMemo, useEffect } from 'react';
import { proCategories } from '@/lib/dummy-data';
import api from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Search,
  MapPin,
  Star,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  MessageSquare,
  Filter,
  Code,
  HardHat,
  Stethoscope,
  Camera,
  Wrench,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';

const iconMap: Record<string, any> = {
  Code, HardHat, Stethoscope, Camera, Wrench, BookOpen
};

export function ProsPage() {
  const { setAuthModalOpen } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPros = async () => {
      try {
        setLoading(true);
        const res = await api.get('/professionals');
        setPros(res.data);
      } catch (err) {
        console.error('Failed to load professionals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPros();
  }, []);

  const filteredPros = useMemo(() => {
    return pros.filter((pro: any) => {
      const matchesSearch = pro.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.profession?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? pro.category_id?.toString() === selectedCategory.toString() : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, pros]);

  return (
    <div className="min-h-screen bg-background pb-24 text-secondary">

      {/* ── COMPACT STICKY HEADER AREA ── */}
      <section className="bg-white border-b border-gray-100 pt-6 pb-4 sticky top-14 z-30">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* ── HORIZONTAL TABS (Skills Tab) ── */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">

            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "h-9 px-4 rounded-full font-black text-[10px] whitespace-nowrap transition-all border uppercase tracking-widest shrink-0",
                !selectedCategory ? "bg-secondary text-white border-secondary shadow-md" : "bg-white border-gray-100 text-muted-foreground hover:border-primary/50"
              )}
            >
              All Skills
            </button>
            {proCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "h-9 px-4 rounded-full font-black text-[10px] whitespace-nowrap transition-all border flex items-center gap-2 uppercase tracking-widest shrink-0",
                    selectedCategory === cat.id ? "bg-secondary text-white border-secondary shadow-md" : "bg-white border-gray-100 text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <Icon className="size-3" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROS GRID ── */}
      <section className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Card key={`skel-${idx}`} className="p-4 md:p-5 flex flex-col h-[220px] md:h-[240px] rounded-[20px] gap-4">
                <div className="flex gap-3">
                  <Skeleton className="size-14 md:size-16 rounded-2xl shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="mt-auto space-y-2">
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </Card>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredPros.map((pro, idx) => (
                <motion.div
                  key={pro.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="group relative overflow-hidden rounded-[20px] border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[220px] md:min-h-[240px]">
                    <div className="p-4 md:p-5 flex flex-col h-full space-y-4">
  
                      {/* Top Row: Profile & Info */}
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className="size-14 md:size-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                            <img src={pro.avatar_path || pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
                          </div>
                          {pro.is_verified && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 className="size-4 text-blue-500 fill-blue-50" />
                            </div>
                          )}
                        </div>
  
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="bg-primary/5 rounded-md px-1.5 py-0.5 text-primary text-[9px] font-black">
                              ⭐ {pro.rating || 5}
                            </div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60 flex items-center gap-0.5">
                              <MapPin className="size-2.5" /> {pro.location_city || pro.location}
                            </p>
                          </div>
                          <Link to={`/expert/${pro.slug}`}>
                            <h3 className="text-base font-black text-secondary tracking-tight hover:text-primary transition-colors truncate">{pro.name}</h3>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest truncate">{pro.profession}</p>
                          </Link>
                        </div>
                      </div>
  
                      {/* Mid Row: Stats Chips */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-60">Experience</span>
                          <span className="text-[10px] font-black text-secondary">{pro.experience}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-60">Compl. Jobs</span>
                          <span className="text-[10px] font-black text-secondary">{pro.projects_completed ?? pro.projects ?? 0}+</span>
                        </div>
                        <div className="flex-1" />
                        <div className="flex flex-wrap gap-1 justify-end">
                          {(pro.skills || []).slice(0, 2).map((skill: any) => (
                            <Badge key={typeof skill === 'string' ? skill : skill.name} className="bg-gray-50 text-secondary text-[8px] font-bold border-none px-1.5 h-4">
                              {typeof skill === 'string' ? skill : skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
  
                      {/* Bottom Row: Actions */}
                      <div className="flex gap-2 pt-1 mt-auto">
                        <Link to={`/expert/${pro.slug}`} className="flex-1">
                          <Button className="w-full rounded-xl h-10 bg-secondary hover:bg-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/5 active:scale-95 transition-transform">
                            Profile
                          </Button>
                        </Link>
                        <a
                          href={`https://wa.me/${pro.whatsapp}?text=Hi%20${pro.name},%20I%20found%20you%20on%20Kasaragod%20Hub!`}
                          target="_blank"
                          rel="noreferrer"
                          className="size-10 rounded-xl border border-green-100 text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors shrink-0 active:scale-95 transition-transform"
                        >
                          <MessageSquare className="size-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && filteredPros.length === 0 && (
          <div className="py-20 text-center">
            <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-6 text-gray-200" />
            </div>
            <h3 className="text-base font-black text-secondary">No masters found</h3>
            <p className="text-xs text-muted-foreground mt-1">Try another category or search term.</p>
          </div>
        )}
      </section>

      {/* ── Mobile Invite CTA ── */}
      <section className="container mx-auto px-4 max-w-5xl mt-12 mb-8 md:hidden">
        <div className="bg-primary/5 rounded-[24px] p-6 text-center border border-primary/10">
          <h3 className="text-sm font-black text-secondary mb-2 uppercase tracking-widest">Join the Network</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Are you a master of your craft in Kasaragod?</p>
          <Button onClick={() => setAuthModalOpen(true)} size="sm" className="rounded-full bg-secondary font-black text-[9px] uppercase tracking-widest px-6 h-9 w-full sm:w-auto">
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
}
