import { useState, useMemo } from 'react';
import { dummyPros, proCategories, dummyBusinesses } from '@/lib/dummy-data';
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

const iconMap: Record<string, any> = {
  Code, HardHat, Stethoscope, Camera, Wrench, BookOpen
};

export function ProsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPros = useMemo(() => {
    return dummyPros.filter(pro => {
      const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           pro.profession.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? pro.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FBFCFE] pt-20 pb-24">
      {/* ── HEADER SECTION ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
             <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-4 py-1 uppercase tracking-widest">Experts Network</Badge>
             <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">Hire Local Masters.</h1>
             <p className="text-muted-foreground text-sm max-w-md font-medium">Connect with top-rated professionals across Kasaragod. Get free digital portfolios and direct access to masters in every skill.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <Button className="rounded-xl h-12 px-8 font-bold bg-secondary hover:bg-black active:scale-95 transition-all">
                Create Free Portfolio
             </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-10 relative group max-w-2xl">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
           <Input 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search by name, skill, or profession..." 
             className="h-14 pl-12 pr-4 bg-white border-gray-100 rounded-2xl shadow-xl shadow-secondary/5 focus-visible:ring-primary text-base"
           />
        </div>
      </section>

      {/* ── CATEGORY BAR ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2">
           <button 
             onClick={() => setSelectedCategory(null)}
             className={cn(
               "h-12 px-6 rounded-2xl font-bold text-xs whitespace-nowrap transition-all border",
               !selectedCategory ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20" : "bg-white border-gray-100 text-muted-foreground hover:border-primary/50"
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
                    "h-12 px-6 rounded-2xl font-bold text-xs whitespace-nowrap transition-all border flex items-center gap-2",
                    selectedCategory === cat.id ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20" : "bg-white border-gray-100 text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <Icon className="size-4" />
                  {cat.label}
                </button>
              );
           })}
        </div>
      </section>

      {/* ── PROS GRID ── */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPros.map((pro, idx) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group relative overflow-hidden rounded-[2rem] border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="size-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                           <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
                        </div>
                        {pro.is_verified && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="size-5 text-blue-500 fill-blue-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1 bg-primary/5 rounded-lg px-2 py-1 text-primary text-[10px] font-black">
                            <Star className="size-3 fill-current" />
                            {pro.rating}
                         </div>
                         <p className="text-[10px] font-bold text-muted-foreground mt-2 flex items-center gap-1 uppercase tracking-wider">
                            <MapPin className="size-3" /> {pro.location}
                         </p>
                      </div>
                    </div>

                    <Link to={`/expert/${pro.slug}`} className="mb-4 block">
                      <h3 className="text-xl font-black text-secondary tracking-tight hover:text-primary transition-colors">{pro.name}</h3>
                      <p className="text-xs font-bold text-primary active:opacity-80 transition-opacity">{pro.profession}</p>
                    </Link>

                    {/* Stats Strip */}
                    <div className="flex items-center gap-4 py-3 border-y border-gray-50 mb-4">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Exp</span>
                          <span className="text-xs font-black text-secondary">{pro.experience}</span>
                       </div>
                       <div className="w-px h-6 bg-gray-100" />
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Projects</span>
                          <span className="text-xs font-black text-secondary">{pro.projects}+</span>
                       </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                       {pro.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-gray-50 text-secondary text-[9px] font-bold border-none px-2 rounded-lg">
                             {skill}
                          </Badge>
                       ))}
                       {pro.skills.length > 3 && (
                         <span className="text-[9px] font-bold text-muted-foreground ml-1">+{pro.skills.length - 3}</span>
                       )}
                    </div>

                    {/* Portfolio Preview */}
                    {pro.portfolio.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {pro.portfolio.map((img, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                             <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Work" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CLUBBED BUSINESSES */}
                    {pro.business_ids && pro.business_ids.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-1">Co-Signed by</p>
                        <div className="flex flex-wrap gap-2">
                          {pro.business_ids.map(bid => {
                            const biz = dummyBusinesses.find(b => b.id === bid);
                            if (!biz) return null;
                            return (
                              <Link key={bid} to={`/business/${biz.slug}`} className="flex items-center gap-1.5 bg-secondary/5 hover:bg-secondary/10 px-2 py-1 rounded-lg border border-secondary/5 transition-colors">
                                <div className="size-4 rounded shadow-sm overflow-hidden bg-white">
                                  <img src={biz.logo_url} className="w-full h-full object-cover" alt="logo" />
                                </div>
                                <span className="text-[9px] font-bold text-secondary truncate max-w-[80px]">{biz.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                       <Link to={`/expert/${pro.slug}`} className="flex-1">
                          <Button className="w-full rounded-xl h-11 bg-secondary hover:bg-black font-bold text-xs">
                             View Portfolio
                          </Button>
                       </Link>
                       <a 
                         href={`https://wa.me/${pro.whatsapp}`}
                         target="_blank"
                         rel="noreferrer"
                         className="size-11 rounded-xl border border-green-100 text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors shadow-sm"
                       >
                          <MessageSquare className="size-5" />
                       </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPros.length === 0 && (
          <div className="py-20 text-center">
             <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="size-8 text-gray-200" />
             </div>
             <h3 className="text-xl font-bold text-secondary">No masters found</h3>
             <p className="text-muted-foreground text-sm mt-1">Try another category or search term.</p>
          </div>
        )}
      </section>

      {/* ───── Pro Network CTA ───── */}
      <section className="container mx-auto px-4 max-w-6xl mt-24 mb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden flex flex-col items-center text-center">
           <div className="relative z-10 max-w-2xl">
              <Badge className="bg-primary text-white border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest mb-6">Professional Outreach</Badge>
              <h2 className="text-2xl md:text-4xl font-black text-secondary tracking-tight mb-4">Are you a skill master in Kasaragod?</h2>
              <p className="text-secondary/70 text-sm md:text-base leading-relaxed mb-8">
                Join our premium community of experts. Get a verified portfolio page, reach thousands of local clients, and build your digital brand—completely free.
              </p>
              <Button size="lg" className="rounded-2xl px-10 h-14 bg-secondary hover:bg-black font-black shadow-xl shadow-secondary/20 active:scale-95 transition-all outline-none">
                Claim Your Free Portfolio <ArrowRight className="ml-2 size-5" />
              </Button>
           </div>
           
           {/* Decor */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 opacity-10 hidden lg:block">
              <Code className="size-48 text-primary" />
           </div>
           <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-20 opacity-10 hidden lg:block">
              <HardHat className="size-48 text-primary" />
           </div>
        </div>
      </section>
    </div>
  );
}
