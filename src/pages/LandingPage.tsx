import { useState, useEffect, useRef } from 'react';
import { categories, stats, featuredSections, dummyBusinesses, bucketLists, dummyPros } from '@/lib/dummy-data';
import { CategoryList } from '@/components/CategoryList';
import { BusinessCarousel } from '@/components/BusinessCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, ArrowRight, TrendingUp, CheckCircle2, Sparkles, Zap, Star, ShieldCheck, Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

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

const faqs = [
  { question: "How do I list my business on Kasaragod Hub?", answer: "Listing your business is easy and free. Click on 'List Your Business' in the navigation menu, fill in your details, and submit. Our moderation team will verify and approve your listing shortly." },
  { question: "Are local experts fully verified?", answer: "Yes, we manually verify all local masters and experts listed on our platform. We ensure their identity, location, and professional standards meet the Kasaragod Hub requirements before they appear on the site." },
  { question: "Is the platform free to use?", answer: "Yes! Exploring the directory, contacting businesses, and hiring local experts is completely free for users. We do not charge any middlemen or commission fees." },
  { question: "Can I update my business profile later?", answer: "Absolutely. Once registered, you will be given access to update your gallery, business hours, and contact details to keep your customers informed." },
  { question: "How do I contact customer support?", answer: "For any assistance or premium listing packages, you can reach out to our team directly via the 'Contact Us' page or send us a WhatsApp message linked in the footer." },
  { question: "What are the benefits of a premium listing?", answer: "Premium listings appear at the top of category search results, feature a 'Verified Affiliate' badge, and receive priority promotions in our 'Bucket List' and newsletter sections." }
];

function FaqItem({ faq }: { faq: { question: string, answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl px-6 py-5 shadow-sm cursor-pointer border border-gray-100 hover:shadow-md hover:border-primary/10 transition-all duration-300"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-[13px] md:text-sm font-bold text-secondary">{faq.question}</h3>
        <div className={`size-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isOpen ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-muted-foreground border-gray-100'}`}>
          {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-xs md:text-sm text-secondary/70 leading-relaxed font-medium pr-6">{faq.answer}</p>
      </motion.div>
    </div>
  );
}

const animatedWords = ["Verified.", "Discovered.", "Simplified.", "Connected."];

function MostSearchedKeywords({ keywords }: { keywords: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleKeywords = isExpanded ? keywords : keywords.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-3">
        <AnimatePresence mode="popLayout">
          {visibleKeywords.map((keyword, idx) => (
            <motion.div
              key={keyword}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <Link to={`/directory?q=${encodeURIComponent(keyword)}`}>
                <Badge
                  variant="outline"
                  className="rounded-full px-4 md:px-5 py-2 md:py-2.5 border-gray-100 bg-white hover:bg-primary/5 hover:border-primary/30 hover:text-primary active:scale-95 transition-all duration-200 cursor-pointer font-bold text-[10px] md:text-xs text-secondary/70 shadow-sm"
                >
                  {keyword}
                </Badge>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {keywords.length > 8 && (
        <div className="flex justify-center md:justify-start">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-primary/5 rounded-full px-6"
          >
            {isExpanded ? 'Show Less' : `View All (${keywords.length})`}
            <ChevronDown className={cn("size-3.5 transition-transform duration-300", isExpanded && "rotate-180")} />
          </Button>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeBentoIndex, setActiveBentoIndex] = useState(0);
  const bentoRef = useRef<HTMLDivElement>(null);

  const handleBentoScroll = () => {
    if (!bentoRef.current) return;
    const el = bentoRef.current;
    const cardWidth = el.scrollWidth / 4; // 4 cards total
    setActiveBentoIndex(Math.min(Math.round(el.scrollLeft / cardWidth), 3));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ───── 1. BENTO HERO ───── */}
      <section className="container mx-auto px-4 max-w-7xl pt-5 md:pt-8 pb-8 md:pb-12">
        <div
          ref={bentoRef}
          onScroll={handleBentoScroll}
          className="flex md:grid flex-nowrap overflow-x-auto snap-x snap-mandatory snap-always scrollbar-hide gap-3 pb-2 -mx-4 px-4 scroll-pl-4 md:gap-4 md:mx-0 md:px-0 md:pb-0 md:scroll-pl-0 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[250px]"
        >
          {/* Main Large Card (Discover Kasaragod) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[90vw] shrink-0 snap-start md:w-auto h-[320px] md:h-auto md:col-span-2 lg:col-span-2 md:row-span-2 relative rounded-[28px] overflow-hidden group shadow-sm bg-secondary"
          >
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1593693397690-362cb9666cb3?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" alt="Aerial view of Kasaragod" />
            </div>
            {/* Primary overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />

            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <Badge className="bg-primary hover:bg-orange-600 text-white border-none w-fit mb-3 md:mb-4 text-[10px] md:text-xs px-2 md:px-3 py-1 font-bold uppercase tracking-widest shadow-md">
                The District Hub
              </Badge>
              <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight md:leading-[1.1] tracking-tight mb-3 md:mb-4 text-balance">
                Everything Kasaragod.<br className="hidden md:block" />{" "}
                <span className="text-primary italic inline-flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="inline-block pb-1 lg:pb-2"
                    >
                      {animatedWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
              <p className="text-white/80 text-sm font-medium max-w-sm hidden md:block">
                Discover top-rated local businesses, talented professionals, real estate, and verified local masters. Directly connecting you with authentic Malabar commerce.
              </p>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-3">
                <Link to="/directory" className="inline-flex items-center justify-center h-10 md:h-12 px-5 md:px-6 rounded-xl bg-primary text-white font-bold text-xs md:text-sm hover:bg-orange-600 transition-all shadow-lg shadow-primary/20 active:scale-95">
                  Explore Directory
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sub-Card 1: Food & Dining */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-[82vw] shrink-0 snap-start md:w-auto h-[320px] md:h-auto md:col-span-1 lg:col-span-1 row-span-1 relative rounded-[28px] overflow-hidden group shadow-sm"
          >
            <div className="absolute inset-0 bg-secondary">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Biryani Food" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <Link to="/directory" className="absolute inset-0 p-6 flex flex-col justify-end text-white hover:text-primary transition-colors">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight mb-1">Authentic<br />Malabar Cuisine</h3>
              <p className="text-[10px] md:text-xs text-white/80 font-medium">120+ Top Rated Restaurants <ArrowRight className="size-3 inline ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></p>
            </Link>
          </motion.div>

          {/* Sub-Card 2: Tourism & Stays */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-[82vw] shrink-0 snap-start md:w-auto h-[320px] md:h-auto md:col-span-1 lg:col-span-1 row-span-1 relative rounded-[28px] overflow-hidden group shadow-sm"
          >
            <div className="absolute inset-0 bg-secondary">
              <img src="https://images.unsplash.com/photo-1596422846543-74c6f50c0570?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 object-center" alt="Bekal Fort" />
            </div>
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply group-hover:bg-primary/20 transition-all" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <Link to="/directory" className="absolute inset-0 p-6 flex flex-col justify-end text-white hover:text-white transition-colors">
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight mb-1">Heritage<br />& Tourism</h3>
              <p className="text-[10px] md:text-xs text-white/80 font-medium">Explore Bekal & Resorts <ArrowRight className="size-3 inline ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></p>
            </Link>
          </motion.div>

          {/* Sub-Card 3: Verified Masters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-[82vw] shrink-0 snap-start md:w-auto h-[320px] md:h-auto md:col-span-2 lg:col-span-2 row-span-1 relative rounded-[28px] overflow-hidden group shadow-sm bg-gradient-to-br from-secondary to-black flex items-center p-6 md:p-8"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-full md:h-auto">
              <div className="mt-auto md:mt-0">
                <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-black tracking-widest mb-3">Skill Hub</Badge>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">Hire Local Masters</h3>
                <p className="text-xs text-gray-400 font-medium max-w-sm">Connect directly with verified talent. No middleman.</p>
              </div>
            </div>

            {/* CTA arrow — bottom-right on mobile */}
            <Link
              to="/experts"
              className="absolute bottom-5 right-5 md:hidden shrink-0 size-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95"
            >
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/experts"
              className="hidden md:flex shrink-0 size-12 rounded-full bg-white text-primary items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 shadow-lg shadow-primary/20"
            >
              <ArrowRight className="size-5" />
            </Link>
          </motion.div>

          {/* Right-edge spacer — must be INSIDE the flex scroll container to create trailing padding */}
          <div className="w-4 shrink-0 md:hidden" aria-hidden="true" />
        </div>


        {/* Mobile scroll dots — indicates swipeable bento */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300 ease-out',
                activeBentoIndex === i
                  ? 'w-5 h-1.5 bg-primary'
                  : 'size-1.5 bg-gray-300'
              )}
            />
          ))}
        </div>
      </section>

      {/* ───── 2. STATS STRIP ───── */}
      <section className="container mx-auto px-4 max-w-5xl mt-6 md:mt-10">
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
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-16">
        <div className="flex justify-between items-end mb-5 md:mb-8">
          <motion.div {...fadeIn}>
            <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground text-xs mt-1">Discover businesses across 50+ curated sectors</p>
          </motion.div>
          <Link to="/directory">
            <Button variant="ghost" size="sm" className="text-primary font-semibold text-xs group flex hover:bg-primary/10 rounded-lg">
              All <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
        <CategoryList categories={categories} />
      </section>

      {/* ───── 4. EXPERT SPOTLIGHT (REFINED) ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-20">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <div className="flex flex-row items-end justify-between gap-4 mb-5 md:mb-6">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">Hire Verified Talent.</h2>
              <p className="text-muted-foreground text-xs">Direct access to the district's top professionals, verified by our team.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-1.5">
                <CarouselPrevious variant="outline" className="static translate-y-0 translate-x-0 size-8 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-primary hover:border-primary transition-all" />
                <CarouselNext variant="default" className="static translate-y-0 translate-x-0 size-8 rounded-full border-none bg-primary text-white hover:bg-orange-600 transition-all shadow-md shadow-primary/20 hover:text-white" />
              </div>
              <Link to="/experts" className="inline-flex items-center text-xs font-semibold text-primary hover:text-orange-600 transition-colors group whitespace-nowrap">
                View all <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <CarouselContent className="-ml-3 md:-ml-4 py-4">
            {dummyPros.map((pro, idx) => (
              <CarouselItem key={pro.id} className="pl-3 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="h-full px-1 pb-1"
                >
                  <Link to={`/expert/${pro.slug}`} className="block h-full cursor-grab active:cursor-grabbing">
                    <Card className="p-4 md:p-5 rounded-2xl border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden h-full flex flex-col">
                      {/* Top Section: Avatar & Basic Info */}
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="size-14 md:size-16 rounded-full overflow-hidden shadow-sm border border-gray-100 shrink-0">
                          <img src={pro.avatar} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" alt={pro.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm md:text-base font-black text-secondary group-hover:text-primary transition-colors leading-tight mb-0.5 truncate max-w-[120px] mx-auto">{pro.name}</h4>
                          <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate mx-auto max-w-[120px]">{pro.profession}</p>
                          <div className="flex items-center justify-center gap-1.5 mt-2">
                            <div className="flex items-center gap-0.5 bg-primary/5 px-1.5 py-0.5 rounded text-[9px] font-black text-primary">
                              <Star className="size-2.5 fill-current" /> {pro.rating}
                            </div>
                            <span className="text-[9px] font-bold text-muted-foreground">• {pro.experience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge Overlay (Subtle) */}
                      <div className="absolute top-2 left-2 text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity">
                        <ShieldCheck className="size-3.5 md:size-4" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>


      {/* ───── 5. FEATURED PARTNERS CAROUSEL ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-10 md:mt-20">
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
          className={`mt-6 md:mt-14 py-8 md:py-12 ${sIdx % 2 !== 0 ? 'bg-gray-50 border-y border-gray-100' : ''}`}
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
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-20">
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <Badge variant="outline" className="border-primary/30 text-primary text-[10px] mb-3 font-bold uppercase tracking-wider">Insider Guides</Badge>
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">The KSD Bucket List</h2>
          <p className="text-muted-foreground text-xs mt-2 max-w-md">Expertly curated experiences designed to help you rediscover your own neighborhood.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {bucketLists.map((list) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer block"
            >
              <Link to="/directory">
                <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden mb-3">
                  <img
                    src={list.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={list.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent p-4 md:p-6 flex flex-col justify-end">
                    <Badge className="w-fit bg-primary text-white border-none text-[10px] font-bold mb-2">
                      {list.businessCount} PLACES
                    </Badge>
                    <h3 className="text-lg md:text-xl font-black text-white leading-tight">{list.title}</h3>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 px-1 hover:text-secondary transition-colors">{list.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ───── 8. FREQUENTLY ASKED QUESTIONS ───── */}
      <section className="bg-gray-50 border-y border-gray-100 py-10 md:py-20 mt-10 md:mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <Badge variant="outline" className="border-gray-200 text-secondary bg-white text-[10px] font-bold uppercase py-1.5 px-4 mb-4 flex items-center gap-1.5 shadow-sm rounded-full tracking-widest">
              <HelpCircle className="size-3.5 text-primary" /> FAQ
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-xs md:text-sm mt-2 max-w-lg font-medium">Answers to common questions before you get started on Kasaragod Hub.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <FaqItem faq={faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 9. COMPACT UNIFIED CTA ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-20 mb-8 md:mb-20">
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
                  <Button size="lg" className="h-12 md:h-14 px-8 md:px-10 rounded-xl bg-primary text-white font-black hover:scale-105 active:scale-95 transition-all w-full text-sm">
                    Find Services <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 md:px-10 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold backdrop-blur-sm w-full text-sm">
                    Join as Provider
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>


      {/* ───── 10. REFINED SEO KEYWORDS / POPULAR SEARCHES (PRE-FOOTER) ───── */}
      <section className="container mx-auto px-4 max-w-7xl pb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-8 border-t border-gray-100/60 pt-10 md:pt-14">
          <div className="flex items-center gap-3">
            <div className="size-10 md:size-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-colors">
              <TrendingUp className="size-5 md:size-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight leading-none">Most Searched</h2>
              <p className="text-muted-foreground text-[10px] md:text-sm font-medium mt-1">High-intent services across Kasaragod district</p>
            </div>
          </div>
        </div>

        <MostSearchedKeywords keywords={SEO_KEYWORDS} />
      </section>

    </div>
  );
}
