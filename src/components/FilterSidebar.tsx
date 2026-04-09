import { categories } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MapPin, Star, ShieldCheck, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  isVerifiedOnly: boolean;
  onVerifiedToggle: (val: boolean) => void;
  priceRange: number[];
  onPriceChange: (val: number) => void;
  sortBy: 'Recommended' | 'Nearest' | 'Rating';
  onSortChange: (val: 'Recommended' | 'Nearest' | 'Rating') => void;
}

const locations = ['All Locations', 'Kasaragod Town', 'Bekal', 'Kanhangad', 'Uppala', 'Cheruvathur'];

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  isVerifiedOnly,
  onVerifiedToggle,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange
}: FilterSidebarProps) {
  return (
    <div className="space-y-8 h-full pr-4 pb-20">
      {/* ── SORT SECTION ── */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <ArrowUpDown className="size-3" /> Sort Results
        </label>
        <div className="flex flex-col gap-1.5">
          {(['Recommended', 'Nearest', 'Rating'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border",
                sort === sortBy 
                  ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/10" 
                  : "bg-white text-secondary border-gray-100 hover:border-primary/30"
              )}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRICE RANGE ── */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <DollarSign className="size-3" /> Price Range
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => onPriceChange(p)}
              className={cn(
                "flex-1 aspect-square rounded-xl flex items-center justify-center text-[10px] font-black border transition-all",
                priceRange.includes(p)
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-muted-foreground border-gray-100 hover:border-primary/40"
              )}
            >
              {'$'.repeat(p)}
            </button>
          ))}
        </div>
      </div>

      {/* ── VERIFICATION ── */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="size-3" /> Trust Status
        </label>
        <button
          onClick={() => onVerifiedToggle(!isVerifiedOnly)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all",
            isVerifiedOnly 
              ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
              : "bg-white border-gray-100 text-secondary hover:border-blue-100"
          )}
        >
          <span className="text-xs font-bold">Verified Partners Only</span>
          <div className={cn(
            "size-4 rounded-full border-2 flex items-center justify-center transition-all",
            isVerifiedOnly ? "bg-blue-600 border-blue-600" : "border-gray-200"
          )}>
            {isVerifiedOnly && <div className="size-1.5 bg-white rounded-full" />}
          </div>
        </button>
      </div>

      {/* ── SECTORS ── */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           Explore Sectors
        </label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all",
              !selectedCategory ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-gray-50 hover:text-secondary"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                selectedCategory === cat.id ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-gray-50 hover:text-secondary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── LOCATION ── */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <MapPin className="size-3" /> Location / Area
        </label>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <Badge
              key={loc}
              onClick={() => onLocationChange(loc)}
              variant={selectedLocation === loc ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-[10px] px-3 py-1 rounded-full font-bold transition-all",
                selectedLocation === loc 
                  ? "bg-secondary text-white border-secondary" 
                  : "border-gray-200 text-muted-foreground hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              {loc}
            </Badge>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost" 
        className="w-full text-xs font-bold text-primary hover:bg-primary/5 rounded-xl border border-dashed border-primary/20"
        onClick={() => {
          onCategoryChange(null);
          onLocationChange('All Locations');
          onVerifiedToggle(false);
        }}
      >
        Reset All Filters
      </Button>
    </div>
  );
}
