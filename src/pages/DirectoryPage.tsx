import { useState, useMemo } from 'react';
import { categories, dummyBusinesses } from '@/lib/dummy-data';
import { BusinessCard } from '@/components/BusinessCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, MapPin, X, ArrowUpDown, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { KGDMap } from '@/components/KGDMap';

// Helper locations for filter
const locations = ['All Locations', 'Kasaragod Town', 'Bekal', 'Kanhangad', 'Uppala', 'Cheruvathur'];

export function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredBusinesses = useMemo(() => {
    return dummyBusinesses.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? b.category_id === selectedCategory : true;
      const matchesLocation =
        selectedLocation === 'All Locations' ? true : b.location === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden">
      {/* ── SEARCH HEADER ── */}
      <section className="bg-secondary pt-10 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Business Directory</h1>
            <p className="text-gray-400 text-sm">Find the best local services in Kasaragod</p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, service or keywords..."
                className="h-12 border-none bg-white/5 text-white placeholder:text-gray-500 rounded-xl pl-11 focus-visible:ring-1 focus-visible:ring-primary/50 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
            <Button
              className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <SlidersHorizontal className="size-4 mr-2" />
              Filters
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS SECTION ── */}
      <div className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Category Scroll */}
          <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex overflow-x-auto scrollbar-hide gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                !selectedCategory ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-50 text-muted-foreground hover:bg-gray-100"
              )}
            >
              All Sectors
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  selectedCategory === cat.id ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-50 text-muted-foreground hover:bg-gray-100"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1 shrink-0">
             <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn("rounded-xl h-9 px-4 font-bold text-xs", viewMode === 'grid' && "bg-secondary text-white hover:bg-black")}
                onClick={() => setViewMode('grid')}
             >
                <LayoutGrid className="size-3.5 mr-2" /> Grid
             </Button>
             <Button
                variant={viewMode === 'map' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn("rounded-xl h-9 px-4 font-bold text-xs", viewMode === 'map' && "bg-secondary text-white hover:bg-black")}
                onClick={() => setViewMode('map')}
             >
                <MapIcon className="size-3.5 mr-2" /> Map View
             </Button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              {/* ... (Existing Filter Logic - same as before) ... */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <MapPin className="size-3" /> Location
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {locations.map((loc) => (
                      <Badge
                        key={loc}
                        variant={selectedLocation === loc ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer text-[10px] px-2.5 py-1 rounded-lg transition-all",
                          selectedLocation === loc ? "bg-secondary text-white" : "border-gray-200 text-muted-foreground hover:bg-gray-50"
                        )}
                        onClick={() => setSelectedLocation(loc)}
                      >
                        {loc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <ArrowUpDown className="size-3" /> Sort By
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Popularity', 'Rating', 'Newest'].map((s) => (
                      <Badge key={s} variant="outline" className="cursor-pointer text-[10px] px-2.5 py-1 rounded-lg border-gray-200 text-muted-foreground hover:bg-gray-50">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:bg-primary/5" onClick={() => { setSelectedCategory(null); setSelectedLocation('All Locations'); }}>Reset Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CONTENT RENDERING ── */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm font-semibold text-secondary">
            Found {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'service' : 'services'} in Kasaragod
          </p>
        </div>

        {filteredBusinesses.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBusinesses.map((business, idx) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <BusinessCard business={business} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[600px] w-full"
            >
               <KGDMap businesses={filteredBusinesses} className="h-full shadow-2xl" />
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200"
          >
            <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">No results found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Try adjusting your filters or search keywords.</p>
            <Button className="mt-6 rounded-xl font-bold" onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedLocation('All Locations'); }}>Clear All</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

