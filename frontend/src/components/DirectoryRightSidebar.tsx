import { Badge } from '@/components/ui/badge';
import { FilterSidebar } from './FilterSidebar';
import { TrendingUp, Search, ChevronRight } from 'lucide-react';

interface DirectoryRightSidebarProps {
  categoryName?: string;
  location?: string;
  onKeywordClick: (keyword: string) => void;
  // props for FilterSidebar
  categories: any[];
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  isVerifiedOnly: boolean;
  onVerifiedToggle: (val: boolean) => void;
  priceRange: number[];
  onPriceChange: (val: number) => void;
  sortBy: any;
  onSortChange: (val: any) => void;
}

export function DirectoryRightSidebar(props: DirectoryRightSidebarProps) {
  const currentCategory = props.categoryName || 'businesses';
  const currentLocation = props.location === 'All Locations' ? 'Kasaragod' : props.location;

  const relatedKeywords = [
    `Best ${currentCategory.toLowerCase()} in ${currentLocation}`,
    `Top rated ${currentCategory.toLowerCase()} near me`,
    `Affordable ${currentCategory.toLowerCase()} in ${currentLocation}`,
    `24/7 ${currentCategory.toLowerCase()} in Kasaragod`,
  ];

  const popularSearches = [
    "Hospitals in Kasaragod",
    "Best Restaurants",
    "AC Repair",
    "Taxi Services",
    "Plumbers in Uppala",
    "Supermarkets"
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Existing Filters - Hidden on mobile as it's in the drawer */}
      <div className="hidden lg:block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
        <FilterSidebar 
          categories={props.categories}
          selectedCategory={props.selectedCategory}
          onCategoryChange={props.onCategoryChange}
          selectedLocation={props.selectedLocation}
          onLocationChange={props.onLocationChange}
          isVerifiedOnly={props.isVerifiedOnly}
          onVerifiedToggle={props.onVerifiedToggle}
          priceRange={props.priceRange}
          onPriceChange={props.onPriceChange}
          sortBy={props.sortBy}
          onSortChange={props.onSortChange}
        />
      </div>
        
      {/* Related Keywords & Popular Searches Container */}
      <div className="lg:hidden flex flex-col gap-6">
        {/* Related Keywords */}
        <div className="bg-[#f4f7fe] rounded-2xl p-6 border border-blue-100 shadow-sm">
          <h3 className="font-bold text-sm tracking-tight text-secondary mb-4">
            {currentCategory === 'businesses' ? 'Best Services' : `Best ${currentCategory}`} in {currentLocation}
          </h3>
          <div className="flex flex-col">
            {relatedKeywords.map((keyword, idx) => (
              <button
                key={idx}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  props.onKeywordClick(keyword);
                }}
                className="flex items-center justify-between text-left text-[11px] font-medium text-gray-600 hover:text-primary transition-colors py-3 border-b border-blue-200/50 last:border-0"
              >
                {keyword}
                <ChevronRight className="size-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-secondary">
            <TrendingUp className="size-4" />
            <h3 className="font-bold text-sm tracking-tight">Popular Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer text-[10px] font-semibold py-1.5 px-3 rounded-full border border-gray-100 transition-colors"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  props.onKeywordClick(search);
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop version for Keywords and Popular Searches (inside the sticky container) */}
      <div className="hidden lg:flex flex-col gap-6">
         {/* Related Keywords */}
         <div className="bg-[#f4f7fe] rounded-2xl p-6 border border-blue-100 shadow-sm">
          <h3 className="font-bold text-sm tracking-tight text-secondary mb-4">
            {currentCategory === 'businesses' ? 'Best Services' : `Best ${currentCategory}`} in {currentLocation}
          </h3>
          <div className="flex flex-col">
            {relatedKeywords.map((keyword, idx) => (
              <button
                key={idx}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  props.onKeywordClick(keyword);
                }}
                className="flex items-center justify-between text-left text-[12px] font-medium text-gray-600 hover:text-primary transition-colors py-3 border-b border-blue-200/50 last:border-0"
              >
                {keyword}
                <ChevronRight className="size-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-secondary">
            <TrendingUp className="size-4" />
            <h3 className="font-bold text-sm tracking-tight">Popular Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer text-[10px] font-semibold py-1.5 px-3 rounded-full border border-gray-100 transition-colors"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  props.onKeywordClick(search);
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
