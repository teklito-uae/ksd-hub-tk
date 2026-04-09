import { categories, stats, featuredSections, dummyBusinesses, bucketLists, dummyPros } from '@/lib/dummy-data';
import { CategoryList } from '@/components/CategoryList';
import { BusinessCarousel } from '@/components/BusinessCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, ArrowRight, TrendingUp, CheckCircle2, Sparkles, Zap, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const SEO_KEYWORDS = [
  "Top Restaurant in Uppala",
  "Budget Friendly Hotels in Bekal",
  "Best Real Estate in Kanhangad",
  "Leading Builders in Kasaragod",
  "Top Schools in Nileshwar",
  "Modern Cafes in Mogral",
  "Verified Doctors in Vidyanagar",
  "Authentic Biryani in Kasaragod Town",
  "Hardware Stores in Kanhangad",
  "Luxury Resorts in Cheruvathur",
  "Mobile Repair in Mogral",
  "Bridal Wear in Kasaragod Hub",
  "Tours and Travels in Bekal",
  "Home Decor in Uppala Junction",
  "Supermarkets in Kanhangad South",
  "Dental Clinics in Kasaragod Town",
  "Automobile Service in Nileshwar",
  "Textiles and Sarees in Kumbla"
];

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ───── 1. HERO CAROUSEL ───── */}
      <section className="relative">
        <HeroCarousel />

        {/* Floating search pill over hero */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                placeholder="Search businesses, services, or locations…"
                className="border-none bg-gray-50 rounded-xl pl-10 h-11 text-sm focus-visible:ring-0 focus-visible:bg-white transition-colors"
              />
            </div>
            <Button className="rounded-xl h-11 px-5 text-sm font-semibold shrink-0">
              Search
            </Button>
          </motion.div>
        </div>
      </section>

      {/* search pill offset spacer */}
      <div className="mt-12 md:mt-16" />

      {/* ───── 2. STATS STRIP ───── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl font-black text-secondary">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── 3. CATEGORIES ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
        <div className="flex justify-between items-end mb-6 md:mb-8">
          <motion.div {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-bold text-secondary">Browse by Category</h2>
            <p className="text-muted-foreground text-[10px] md:text-xs mt-1">Discover businesses across 50+ curated sectors</p>
          </motion.div>
          <Button variant="ghost" size="sm" className="text-primary font-semibold text-xs group flex">
            All <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
        <CategoryList categories={categories} />
      </section>

      {/* ───── 4. EXPERT SPOTLIGHT (REFINED) ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px] px-4 py-1.5 uppercase tracking-widest">Master Network</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">Hire Verified Talent.</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg">Direct access to the district's top professionals, verified by our moderation team.</p>
           </div>
           <Link to="/experts" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
              Browse All Masters <ArrowRight className="size-4" />
           </Link>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 -mx-4 px-4 snap-x">
           {dummyPros.map((pro, idx) => (
             <motion.div 
               key={pro.id}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="min-w-[300px] md:min-w-[340px] snap-center shrink-0"
             >
                <Link to={`/expert/${pro.slug}`}>
                   <Card className="p-6 rounded-2xl border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all group relative overflow-hidden h-full flex flex-col">
                      {/* Top Section: Avatar & Basic Info */}
                      <div className="flex items-start gap-4 mb-6">
                         <div className="size-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                            <img src={pro.avatar} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" alt={pro.name} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-black text-secondary group-hover:text-primary transition-colors leading-tight mb-1 truncate">{pro.name}</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider truncate">{pro.profession}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                               <div className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded text-[10px] font-black text-primary">
                                  <Star className="size-3 fill-current" /> {pro.rating}
                               </div>
                               <span className="text-[10px] font-bold text-muted-foreground">• {pro.experience}</span>
                            </div>
                         </div>
                      </div>

                      {/* Middle Section: Brief Bio/Trust */}
                      <p className="text-xs text-secondary/70 leading-relaxed line-clamp-3 font-medium italic border-l-2 border-primary/20 pl-4 mb-4 flex-1">
                         {pro.bio}
                      </p>

                      {/* Verified Badge Overlay (Subtle) */}
                      <div className="absolute top-4 right-4 text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity">
                         <ShieldCheck className="size-5" />
                      </div>
                   </Card>
                </Link>
             </motion.div>
           ))}
        </div>
      </section>


      {/* ───── 5. FEATURED PARTNERS CAROUSEL ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
        <BusinessCarousel
          title="Featured Partners"
          subtitle="Verified and top-rated businesses across Kasaragod"
          businesses={dummyBusinesses.filter(b => b.is_featured)}
        />
      </section>

      {/* ───── 6. CATEGORY-BASED SECTIONS ───── */}
      {featuredSections.map((section, sIdx) => (
        <section
          key={section.id}
          className={`mt-10 md:mt-16 py-8 md:py-12 ${sIdx % 2 !== 0 ? 'bg-gray-50 border-y border-gray-100' : ''}`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <BusinessCarousel
              title={section.label}
              subtitle={`Popular ${section.label.toLowerCase()} businesses near you`}
              businesses={[
                ...section.businesses.slice(0, 3),
                ...dummyBusinesses.slice(0, 3),
              ].slice(0, 6)}
            />
          </div>
        </section>
      ))}

      {/* ───── NEW: BUCKET LIST CURATION ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-12 md:mt-24">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <Badge variant="outline" className="border-primary/30 text-primary text-[9px] md:text-[10px] mb-3 font-bold uppercase tracking-wider">Insider Guides</Badge>
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">The KSD Bucket List</h2>
          <p className="text-muted-foreground text-[10px] md:text-xs mt-2 max-w-md">Expertly curated experiences designed to help you rediscover your own neighborhood.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
           {bucketLists.map((list) => (
              <motion.div 
                key={list.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden mb-3">
                  <img 
                    src={list.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={list.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent p-4 md:p-6 flex flex-col justify-end">
                     <Badge className="w-fit bg-primary text-white border-none text-[8px] md:text-[9px] font-bold mb-2">
                        {list.businessCount} PLACES
                     </Badge>
                     <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{list.title}</h3>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 px-1">{list.description}</p>
              </motion.div>
           ))}
        </div>
      </section>

      {/* ───── 7. REFINED SEO KEYWORDS (NO CARD) ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-20 md:mt-28">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="size-8 md:size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="size-4 md:size-5" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-secondary tracking-tight">Most Searched in Kasaragod</h2>
            <p className="text-muted-foreground text-[10px] md:text-xs font-medium">Quick links to high-intent local services and popular areas</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-2.5">
          {SEO_KEYWORDS.map((keyword, idx) => (
            <Badge 
              key={idx}
              variant="outline"
              className="rounded-full px-3.5 py-1.5 border-gray-100 bg-white hover:bg-white hover:border-primary hover:text-primary transition-all cursor-pointer font-medium text-[10px] md:text-[11px] text-secondary/70 whitespace-nowrap shadow-sm"
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </section>

      {/* ───── 8. COMPACT UNIFIED CTA ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-16 md:mt-24 mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-2xl md:rounded-[3rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl shadow-secondary/10"
        >
          {/* Decorative Rings */}
          <div className="absolute top-0 right-0 size-80 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 size-48 bg-primary/5 rounded-full -ml-24 -mb-24 blur-2xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 md:space-y-5 text-center lg:text-left">
              <Badge className="bg-primary/20 text-primary border-none font-bold text-[9px] px-3 py-1 uppercase tracking-widest inline-flex">Kasaragod Hub</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Empowering the digital pulse of Kasaragod district.
              </h2>
              <p className="text-gray-400 text-[11px] md:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                Find local spots or grow your business reaching 10k+ local residents. We've built the ultimate platform for you.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-2">
                 <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70">
                    <CheckCircle2 className="size-3.5 text-primary" /> 1,200+ Listings
                 </div>
                 <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70">
                    <CheckCircle2 className="size-3.5 text-primary" /> Verified Reviews
                 </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3 md:gap-4 lg:justify-end">
               <Link to="/directory" className="w-full sm:w-auto">
                 <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl bg-primary text-white font-black hover:scale-105 active:scale-95 transition-all w-full text-sm">
                   Start Exploring <ArrowRight className="ml-2 size-4" />
                 </Button>
               </Link>
               <Link to="/for-businesses" className="w-full sm:w-auto">
                 <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold backdrop-blur-sm w-full text-sm">
                   List Your Business
                 </Button>
               </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
