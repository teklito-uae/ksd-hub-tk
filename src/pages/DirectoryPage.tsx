import { useState, useMemo, useEffect } from 'react';
import { categories, dummyBusinesses } from '@/lib/dummy-data';
import { HorizontalBusinessCard } from '@/components/HorizontalBusinessCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { DirectoryAd } from '@/components/DirectoryAd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  Map as MapIcon, 
  ChevronRight,
  SlidersHorizontal,
  Home,
  ArrowLeft,
  ChevronLeft,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { KGDMap } from '@/components/KGDMap';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Link } from 'react-router-dom';
import { useGeolocation } from '@/hooks/useGeolocation';

const ITEMS_PER_PAGE = 15;

export function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [priceRanges, setPriceRanges] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'Recommended' | 'Nearest' | 'Rating'>('Recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const { calculateDistance } = useGeolocation();

  const activeCategory = useMemo(() => 
    categories.find(c => c.id === selectedCategory), 
  [selectedCategory]);

  const filteredBusinesses = useMemo(() => {
    let results = dummyBusinesses.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? b.category_id === selectedCategory : true;
      const matchesLocation =
        selectedLocation === 'All Locations' ? true : b.location === selectedLocation;
      const matchesVerified = isVerifiedOnly ? b.is_verified : true;
      const matchesPrice = priceRanges.length > 0 ? priceRanges.includes(b.price_range || 1) : true;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesVerified && matchesPrice;
    });

    if (sortBy === 'Nearest') {
      results = [...results].sort((a, b) => {
        const distA = parseFloat(calculateDistance(a.latitude || 0, a.longitude || 0) || '9999');
        const distB = parseFloat(calculateDistance(b.latitude || 0, b.longitude || 0) || '9999');
        return distA - distB;
      });
    } else if (sortBy === 'Rating') {
      results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return results;
  }, [searchQuery, selectedCategory, selectedLocation, isVerifiedOnly, priceRanges, sortBy, calculateDistance]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, isVerifiedOnly, priceRanges, sortBy]);

  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBusinesses, currentPage]);

  const togglePriceRange = (range: number) => {
    setPriceRanges(prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* ── BREADCRUMBS & COMPACT HEADER ── */}
      <section className="bg-white border-b border-gray-100 pt-4 md:pt-6 pb-4 md:pb-6 lg:mt-6">
        <div className="container mx-auto px-4 max-w-[1600px]">
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 md:mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="size-3" /> Home
            </Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className={cn(activeCategory ? "text-muted-foreground" : "text-primary")}>Directory</span>
            {activeCategory && (
              <>
                <ChevronRight className="size-3 shrink-0" />
                <span className="text-primary">{activeCategory.name}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
               <Link to="/" className="lg:hidden p-2 rounded-xl bg-muted text-secondary active:scale-95 transition-transform">
                  <ArrowLeft className="size-4" />
               </Link>
               <div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-black text-secondary tracking-tight">
                  {activeCategory ? activeCategory.name : "Directory"}
                </h1>
                <p className="text-[10px] md:text-xs text-muted-foreground font-medium opacity-80">
                  {filteredBusinesses.length} results found
                </p>
              </div>
            </div>

            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4 stroke-[1.5]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="h-10 md:h-11 border-gray-100 bg-gray-50/50 rounded-xl pl-10 focus-visible:ring-primary focus-visible:bg-white transition-all text-sm shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500">
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE ── */}
      <div className="container mx-auto max-w-[1700px] px-0 md:px-6 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          <aside className="hidden lg:block w-[260px] shrink-0 sticky top-24 h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide">
            <FilterSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              isVerifiedOnly={isVerifiedOnly}
              onVerifiedToggle={setIsVerifiedOnly}
              priceRange={priceRanges}
              onPriceChange={togglePriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </aside>

          <main className="flex-1 px-4 md:px-0">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex-1 rounded-xl h-11 border-gray-200 font-bold text-xs bg-white shadow-sm">
                    <SlidersHorizontal className="size-3.5 mr-2" /> Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="p-6 rounded-t-[2.5rem] outline-none">
                   <div className="max-h-[80vh] overflow-y-auto py-4 scrollbar-hide">
                      <div className="mb-6 flex justify-between items-center px-1">
                        <h2 className="text-xl font-black text-secondary tracking-tight">Refine Results</h2>
                        <Badge variant="outline" className="border-primary text-primary font-bold">
                          {filteredBusinesses.length} items
                        </Badge>
                      </div>
                      <FilterSidebar 
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedLocation={selectedLocation}
                        onLocationChange={setSelectedLocation}
                        isVerifiedOnly={isVerifiedOnly}
                        onVerifiedToggle={setIsVerifiedOnly}
                        priceRange={priceRanges}
                        onPriceChange={togglePriceRange}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                      />
                   </div>
                </DrawerContent>
              </Drawer>
              <div className="bg-white p-1 rounded-xl border border-gray-100 flex items-center shadow-sm">
                <Button 
                  size="sm" 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  className={cn("rounded-lg h-9 px-4 font-bold text-xs", viewMode === 'list' ? "bg-secondary text-white shadow-sm" : "text-muted-foreground")}
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button 
                  size="sm" 
                  variant={viewMode === 'map' ? 'secondary' : 'ghost'} 
                  className={cn("rounded-lg h-9 px-4 font-bold text-xs", viewMode === 'map' ? "bg-secondary text-white shadow-sm" : "text-muted-foreground")}
                  onClick={() => setViewMode('map')}
                >
                   <MapIcon className="size-3 mr-1" /> Map
                </Button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {(selectedCategory || selectedLocation !== 'All Locations' || isVerifiedOnly || priceRanges.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="hidden md:flex flex-wrap gap-2 mb-6"
                >
                  {selectedCategory && (
                    <Badge className="bg-primary/5 text-primary border-primary/20 rounded-full px-4 py-1.5 font-bold text-[10px] flex items-center gap-2">
                      {activeCategory?.name}
                      <X onClick={() => setSelectedCategory(null)} className="size-3 cursor-pointer" />
                    </Badge>
                  )}
                  {selectedLocation !== 'All Locations' && (
                    <Badge className="bg-secondary/5 text-secondary border-secondary/20 rounded-full px-4 py-1.5 font-bold text-[10px] flex items-center gap-2">
                      {selectedLocation}
                      <X onClick={() => setSelectedLocation('All Locations')} className="size-3 cursor-pointer" />
                    </Badge>
                  )}
                  {isVerifiedOnly && (
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 rounded-full px-4 py-1.5 font-bold text-[10px] flex items-center gap-2">
                      Verified Only
                      <X onClick={() => setIsVerifiedOnly(false)} className="size-3 cursor-pointer" />
                    </Badge>
                  )}
                  <button onClick={() => { setSelectedCategory(null); setSelectedLocation('All Locations'); setIsVerifiedOnly(false); setPriceRanges([]); }} className="text-[10px] font-bold text-muted-foreground hover:text-primary ml-2 uppercase tracking-widest">
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn("flex flex-col gap-6", viewMode === 'map' && "lg:flex hidden")}>
              {paginatedBusinesses.length > 0 ? (
                <>
                  {paginatedBusinesses.flatMap((business, idx) => {
                    const elements = [
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (idx % 5) * 0.04 }}
                      >
                        <HorizontalBusinessCard 
                          business={business} 
                          distance={calculateDistance(business.latitude || 0, business.longitude || 0)} 
                        />
                      </motion.div>
                    ];
                    if ((idx + 1) % 5 === 0) {
                      elements.push(<DirectoryAd key={`ad-${idx}`} />);
                    }
                    return elements;
                  })}

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-10">
                      <Button variant="outline" size="icon" className="rounded-xl" disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <ChevronLeft className="size-4" />
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button key={i + 1} variant={currentPage === i + 1 ? 'secondary' : 'ghost'} className={cn("rounded-xl w-10 font-bold", currentPage === i + 1 ? "bg-secondary text-white" : "text-muted-foreground")} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                          {i + 1}
                        </Button>
                      ))}
                      <Button variant="outline" size="icon" className="rounded-xl" disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  )}

                  {/* ───── Refined CTA Section ───── */}
                  <div className="mt-12 mb-10">
                    <div className="bg-secondary p-8 md:p-12 rounded-2xl text-center flex flex-col items-center gap-6 border border-gray-100 shadow-lg">
                      <div className="size-14 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <PlusCircle className="size-7" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          Can't find the business you're looking for?
                        </h2>
                        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                          Help grow our directory by suggesting missing places. Join as a Hub Partner to showcase your own brand to the local community across Kasaragod.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Link to="/register" className="flex-1 sm:flex-none">
                          <Button size="lg" className="h-12 px-10 rounded-xl font-bold bg-primary hover:bg-orange-600 transition-colors w-full">
                            Suggest a Listing
                          </Button>
                        </Link>
                        <Link to="/for-businesses" className="flex-1 sm:flex-none">
                          <Button size="lg" variant="outline" className="h-12 px-10 rounded-xl font-bold border-white/20 text-white hover:bg-white/10 w-full">
                            Business Solutions
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl p-24 text-center border border-dashed border-gray-200">
                  <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="size-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Zero matches found</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Try broading your filters or search keywords.
                  </p>
                  <Button className="mt-8 rounded-xl font-bold" onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedLocation('All Locations'); setIsVerifiedOnly(false); setPriceRanges([]); }}>
                    Reset Experience
                  </Button>
                </div>
              )}
            </div>

            {viewMode === 'map' && (
              <div className="lg:hidden h-[calc(100vh-280px)] rounded-2xl overflow-hidden border border-gray-100">
                 <KGDMap businesses={filteredBusinesses} className="h-full" />
              </div>
            )}
          </main>

          <aside className="hidden lg:block w-[420px] xl:w-[500px] shrink-0 sticky top-24 h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-white shadow-xl">
            <KGDMap businesses={filteredBusinesses} className="h-full" />
          </aside>
        </div>
      </div>
    </div>
  );
}
