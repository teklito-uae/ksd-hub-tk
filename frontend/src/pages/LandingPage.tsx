import { useState, useEffect, useRef } from 'react';
import { categories as staticCategories, stats, featuredSections, bucketLists } from '@/lib/dummy-data';
import api from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead } from '@/components/SEOHead';
import { CategoryList } from '@/components/CategoryList';
import { BusinessCarousel } from '@/components/BusinessCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Search,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Zap,
  Star,
  ShieldCheck,
  Plus,
  Minus,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Stethoscope,
  Hammer,
  Building,
  MapPin,
  Mic,
  Users,
  Store,
  Award,
  UtensilsCrossed,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Car,
  Palmtree,
  Wrench,
  HardHat,
  Banknote,
  CalendarDays
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.4 },
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
const kasaragodPlaces = ["Uppala", "Kanhangad", "Kumbla", "Nileshwar", "Bekal", "Vidyanagar"];

const heroQuickCategories = [
  { label: "Restaurants",   icon: UtensilsCrossed, color: "text-red-500 bg-red-50",     slug: "restaurants"   },
  { label: "Real Estate",   icon: Building,         color: "text-blue-600 bg-blue-50",   slug: "real-estate"   },
  { label: "Health",        icon: HeartPulse,        color: "text-rose-500 bg-rose-50",   slug: "health-beauty" },
  { label: "Home Services", icon: Wrench,            color: "text-violet-600 bg-violet-50", slug: "home-services" },
  { label: "Auto",          icon: Car,               color: "text-orange-600 bg-orange-50", slug: "auto-services" },
  { label: "Tourism",       icon: Palmtree,          color: "text-teal-600 bg-teal-50",   slug: "tourism"       },
  { label: "Construction",  icon: HardHat,           color: "text-amber-600 bg-amber-50", slug: "construction"  },
  { label: "Finance",       icon: Banknote,          color: "text-green-600 bg-green-50", slug: "finance"       },
];

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
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(staticCategories);
  const [places, setPlaces] = useState<any[]>([]);
  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Banner slider
  const bannerImages = [
    '/assets/banners/banner_webflight_2024.webp',
    '/assets/banners/banner_interiordesigners_2024.webp',
    '/assets/banners/banner_packersmovers_2024.webp',
    '/assets/banners/banner_bills_2024.webp',
  ];
  const [bannerSlide, setBannerSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bizRes, catRes, proRes, placesRes] = await Promise.all([
          api.get('/businesses'),
          api.get('/categories'),
          api.get('/professionals'),
          api.get('/places')
        ]);
        setBusinesses(bizRes.data);
        if (catRes.data.length > 0) setCategories(catRes.data);
        setPros(proRes.data);
        setPlaces(placesRes.data);
      } catch (err) {
        console.error('Failed to load landing page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-advance banner slider every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerSlide(i => (i + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-primary/20 pb-[76px] md:pb-24">
      <SEOHead />
      <div className="flex flex-col">

        {/* ───── HERO BENTO BANNER ───── */}
        <section className="container mx-auto px-4 max-w-7xl pt-4 md:pt-6">
          <div className="flex gap-3 md:gap-4">

            {/* SLIDER CARD — visible on all sizes */}
            <div className="w-full md:flex-[3] h-[160px] md:h-[220px] rounded-2xl overflow-hidden relative shrink-0 cursor-pointer bg-gray-100">
              {/* Slides */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={bannerSlide}
                  src={bannerImages[bannerSlide]}
                  alt="Banner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {bannerImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBannerSlide(i)}
                    className={cn(
                      "h-[5px] rounded-full transition-all duration-300",
                      i === bannerSlide
                        ? "w-5 bg-primary/80"
                        : "w-[5px] bg-white/50 hover:bg-white/70"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* BENTO CARDS — hidden on mobile */}
            <Link to="/directory/restaurants" className="hidden md:flex md:flex-[0.7] h-[220px] rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#2d0a12] p-5 flex-col justify-between text-white relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative z-10"><Icons.UtensilsCrossed className="size-8 md:size-10 text-white/80 stroke-[1.5]" /></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight leading-tight">FOOD &<br/>DINING</h3>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-0.5">Top Rated</p>
              </div>
            </Link>

            <Link to="/directory/home-services" className="hidden md:flex md:flex-[0.7] h-[220px] rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#0a1a2d] p-5 flex-col justify-between text-white relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-colors" />
              <div className="relative z-10"><Icons.Wrench className="size-8 md:size-10 text-white/80 stroke-[1.5]" /></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight leading-tight">REPAIRS</h3>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-0.5">Nearby Pros</p>
              </div>
            </Link>

            <Link to="/directory/real-estate" className="hidden md:flex md:flex-[0.7] h-[220px] rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#0a2d1a] p-5 flex-col justify-between text-white relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-colors" />
              <div className="relative z-10"><Icons.Home className="size-8 md:size-10 text-white/80 stroke-[1.5]" /></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight leading-tight">REAL<br/>ESTATE</h3>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-0.5">Verified</p>
              </div>
            </Link>

            <Link to="/directory/health-beauty" className="hidden md:flex md:flex-[0.7] h-[220px] rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#1a0a2d] p-5 flex-col justify-between text-white relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl group-hover:bg-violet-400/20 transition-colors" />
              <div className="relative z-10"><Icons.Stethoscope className="size-8 md:size-10 text-white/80 stroke-[1.5]" /></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight leading-tight">DOCTORS</h3>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-0.5">Quick Visit</p>
              </div>
            </Link>

          </div>
        </section>

        {/* ───── CATEGORIES SECTION ───── */}
        <section className="container mx-auto px-4 max-w-7xl mt-6 md:mt-10">
          <div className="flex items-end justify-between mb-5 md:mb-7">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">Browse by Category</h2>
              <p className="text-[11px] md:text-sm text-gray-400 mt-0.5 font-medium">Find what you need, instantly</p>
            </div>
            <Link to="/directory">
              <Button variant="ghost" size="sm" className="text-primary font-bold text-xs group flex items-center hover:bg-primary/5 rounded-xl px-3 h-9 gap-1">
                View All <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <CategoryList categories={categories} loading={loading} />
        </section>
      </div>


      {/* ───── 3. EXPERT SPOTLIGHT ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-16">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <div className="flex flex-row items-end justify-between gap-4 mb-4 md:mb-8">
            <div className="space-y-0.5">
              <h2 className="text-lg md:text-2xl font-bold text-secondary tracking-tight">Hire Verified Talent.</h2>
              <p className="text-muted-foreground text-[10px] md:text-sm font-medium">District's top professionals, verified by our team.</p>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/experts">
                <Button variant="ghost" size="sm" className="text-primary font-bold text-[10px] md:text-xs group flex items-center hover:bg-primary/5 rounded-xl px-2 h-8">
                  View All <ArrowRight className="ml-1 size-3 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4 py-1">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem key={`skel-pro-${i}`} className="pl-2 md:pl-4 basis-5/12 md:basis-1/4 lg:basis-1/5">
                  <Card className="p-3 rounded-2xl h-[160px] md:h-[200px] flex flex-col items-center justify-center gap-2">
                    <Skeleton className="size-12 md:size-16 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-2 w-10" />
                  </Card>
                </CarouselItem>
              ))
            ) : (
              pros.map((pro) => (
                <CarouselItem key={pro.id} className="pl-2 md:pl-4 basis-[45%] md:basis-1/4 lg:basis-1/5">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="h-full px-0.5 pb-0.5"
                  >
                    <Link to={`/expert/${pro.slug}`} className="block h-full cursor-grab active:cursor-grabbing">
                      <Card className="p-3 md:p-5 rounded-[1.5rem] border-gray-100 bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden h-full flex flex-col items-center text-center">
                        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-primary/5 to-transparent"></div>
                        <div className="size-14 md:size-20 rounded-full overflow-hidden shadow-sm border-4 border-white mb-3 md:mb-4 text-center z-10 relative">
                          <img src={pro.avatar_path || pro.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mx-auto" alt={pro.name} />
                        </div>
                        <h4 className="text-[12px] md:text-base font-extrabold text-secondary group-hover:text-primary transition-colors leading-tight mb-1 truncate w-full z-10">{pro.name}</h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest truncate w-full mb-3 z-10">{pro.profession}</p>
                        <div className="flex items-center justify-center gap-1.5 mt-auto z-10">
                          <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-amber-600">
                            <Star className="size-2.5 fill-current text-amber-500" /> {pro.rating || 5.0}
                          </div>
                          <span className="text-[9px] font-semibold text-gray-400">• {pro.experience || '3+ yrs'}</span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </section>

      {/* ───── 4. PARTNERS CAROUSEL ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-6 md:mt-12">
        {loading ? (
          <div className="flex justify-center gap-3 py-2">
            <Skeleton className="h-[200px] md:h-[250px] w-full max-w-[300px] rounded-2xl" />
            <Skeleton className="h-[200px] md:h-[250px] w-full max-w-[300px] rounded-2xl" />
          </div>
        ) : (
          <BusinessCarousel
            title="Featured Partners"
            subtitle="Verified and top-rated in Kasaragod"
            businesses={businesses.filter(b => b.is_featured)}
          />
        )}
      </section>

      {/* ───── 5. CATEGORY-BASED SECTIONS ───── */}
      {featuredSections.map((section, sIdx) => (
        <section
          key={section.id}
          className={`mt-4 md:mt-8 py-4 md:py-10 ${sIdx % 2 !== 0 ? 'bg-gray-50 border-y border-gray-100' : ''}`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            {loading ? (
              <div className="flex justify-center gap-3 py-4">
                <Skeleton className="h-[180px] md:h-[200px] w-full rounded-2xl" />
              </div>
            ) : (
              <BusinessCarousel
                title={section.label}
                subtitle={`Popular ${section.label.toLowerCase()} near you`}
                businesses={[
                  ...section.businesses.slice(0, 3),
                  ...businesses.slice(0, 3),
                ].slice(0, 6)}
              />
            )}
          </div>
        </section>
      ))}

      {/* ───── 6. BUCKET LIST ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-6 md:mt-14">
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <Badge variant="outline" className="border-primary/30 text-primary text-[8px] md:text-[10px] mb-2 font-bold uppercase tracking-wider">District Curations</Badge>
          <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">The KSD Bucket List</h2>
          <p className="text-muted-foreground text-[10px] md:text-xs mt-1 md:mt-2 max-w-md">Discovery local secrets of Kasaragod.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {bucketLists.map((list) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer block"
            >
              <Link to="/directory">
                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-2 md:mb-3 shadow-sm group-hover:shadow-2xl transition-all duration-300">
                  <img src={list.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={list.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 md:p-6 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                      <Badge className="w-fit bg-white/90 backdrop-blur-sm text-secondary border-none text-[9px] md:text-[10px] font-black mb-2 uppercase shadow-sm">
                        {list.businessCount} PLACES
                      </Badge>
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{list.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── 7. FAQ ───── */}
      <section className="bg-gray-50 border-y border-gray-100 py-10 md:py-20 mt-8 md:mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-secondary tracking-tight">FAQ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── 8. CTA SECTION ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-14 mb-8 md:mb-14">
        <div className="bg-secondary rounded-2xl md:rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden text-center lg:text-left shadow-2xl shadow-secondary/10">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">Grow with the Hub.</h2>
              <p className="text-gray-400 text-[11px] md:text-sm max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">Join thousands of local businesses and professionals on the district's largest digital hub.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Button size="lg" className="bg-primary text-white font-black h-12 md:h-14 px-8 rounded-xl md:rounded-2xl text-xs md:text-sm">List Your Business</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white h-12 md:h-14 px-8 rounded-xl md:rounded-2xl hover:bg-white/10 text-xs md:text-sm font-bold">Find Services</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 9. MOST SEARCHED (SEO LINKS) ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 mb-10 border-t border-gray-100 pt-10">
        <div className="space-y-6 pb-10">

          <div className="space-y-3">
            <h4 className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-widest pl-1 border-l-[3px] border-primary">Popular Categories</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] md:text-[12px] text-muted-foreground leading-relaxed">
              {[
                "Restaurants in Kasaragod", "Hospitals in Kanhangad", "Real Estate Nileshwar", "Schools in Cheruvathur",
                "Car Service Centers Uppala", "Salons & Beauty Parlours Manjeshwar", "Wedding Halls Kumbla", "Ayurveda Centers Badiyadka",
                "Hotels & Resorts Trikaripur", "Software Companies Udma", "Grocery Stores Kanhangad",
                "Plumbers in Kasaragod Town", "Electricians Nileshwar", "Jewellery Shops Cheruvathur",
                "Driving Schools Uppala", "Lawyers in Manjeshwar", "Architects Kumbla",
                "Interior Designers Badiyadka", "Tour Operators Trikaripur", "Coaching Centers Udma",
                "Dentists Kasaragod", "Pharmacy near Kanhangad", "Banks in Nileshwar", "Insurance Agents Cheruvathur",
                "Homestays near Uppala", "Builders Manjeshwar", "Hardware Stores Kumbla",
                "Textile Shops Badiyadka", "Electronics Shops Trikaripur", "Supermarkets in Udma",
              ].map((link, i, arr) => (
                <span key={link} className="flex items-center">
                  <Link to="/directory" className="hover:text-primary transition-colors font-semibold text-secondary/70">{link}</Link>
                  {arr.length - 1 !== i && <span className="mx-1.5 text-gray-200">|</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-widest pl-1 border-l-[3px] border-primary/50">Trending Searches</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-2 text-[10px] md:text-[11px] text-muted-foreground items-center">
              {[
                "Malabar Biryani in Kasaragod", "Best CCTV installation Kanhangad", "Bekal Fort resorts",
                "AC repair Nileshwar", "Packers and movers Cheruvathur", "Web design company Uppala",
                "Marriage hall booking Manjeshwar", "Ayurvedic spa in Kumbla", "Kindergarten school Badiyadka",
                "Pet shop Trikaripur", "Ranipuram trek packages", "Organic farm products Udma",
                "Boat house Valiyaparamba", "Photography studio Kasaragod", "Bike service center Kanhangad",
                "Gold jewellery shop Nileshwar", "Mobile repair Cheruvathur", "Flower shop Uppala",
                "Catering service Manjeshwar", "Event management Kumbla", "Pest control service Badiyadka",
                "House painting Trikaripur", "Solar panel installation Udma", "CBSE school Kasaragod",
                "Physiotherapy clinic Kanhangad", "Eye specialist Nileshwar", "Car rental Cheruvathur",
                "Tuition center Uppala", "Yoga class Manjeshwar", "Gym in Kumbla",
                "Real estate agent Badiyadka", "Plot for sale Trikaripur", "Commercial space rent Udma",
                "Wax museum Kasaragod", "Sea food restaurant Kanhangad", "Kerala thali Nileshwar",
                "Baby store Cheruvathur", "Home cleaning service Uppala", "Laptop repair Manjeshwar",
                "Printing shop Kumbla", "Bakery Badiyadka", "Cake shop Trikaripur",
                "Coffee shop Udma", "AC servicing Kasaragod", "RO water purifier service Kanhangad",
                "DTH service Nileshwar", "Hair salon men Cheruvathur", "Bridal makeup Uppala",
                "Nursery plants Manjeshwar", "Fish market Kumbla", "Cashew factory Badiyadka",
                "Halwa shop Trikaripur", "Beef biryani Udma", "Ayurveda massage Kasaragod",
                "Villa for sale Kanhangad", "Houseboat Nileshwar", "Travel agent Cheruvathur",
                "Hotel near Uppala", "Budget hotel Manjeshwar", "Family restaurant Kumbla",
                "CBSE tuition Badiyadka", "Home nursing Trikaripur", "Medical lab Udma",
                "Diagnostic center Kasaragod", "Blood bank Kanhangad", "Orthopedic hospital Nileshwar",
                "Courier service Cheruvathur", "Speed post Uppala", "Notary Manjeshwar",
                "Chartered accountant Kumbla", "GST filing Badiyadka", "Business registration Trikaripur",
                "Company formation Udma", "Tax consultant Kasaragod", "Loan service Kanhangad",
                "Chit fund Nileshwar", "Mutual fund agent Cheruvathur", "Life insurance Uppala",
                "Vehicle insurance Manjeshwar", "Property registration Kumbla",
              ].map((link, i, arr) => (
                <span key={link} className="flex items-center">
                  <Link to="/directory" className="hover:text-primary transition-colors font-medium">{link}</Link>
                  {arr.length - 1 !== i && <span className="mx-2 text-gray-200/50">|</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ───── 10. FEATURED IN MEDIA ───── */}
      <section className="py-10 md:py-14 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">As Seen In</p>
            <h2 className="text-xl md:text-2xl font-bold text-secondary tracking-tight">Trusted by Kerala's Leading Media</h2>
            <p className="text-[12px] text-gray-400 mt-1 font-medium">Recognised and featured across top regional news channels & publications</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              { name: 'Mathrubhumi', abbr: 'MB' },
              { name: 'Manorama', abbr: 'MM' },
              { name: 'Asianet News', abbr: 'AN' },
              { name: 'Media One', abbr: 'MO' },
              { name: 'Janam TV', abbr: 'JN' },
              { name: 'Reporter TV', abbr: 'RT' },
              { name: 'Suprabhatham', abbr: 'SP' },
              { name: 'Kerala Kaumudi', abbr: 'KK' },
              { name: 'Madhyamam', abbr: 'MD' },
              { name: 'Deepika', abbr: 'DK' },
              { name: 'DC Books', abbr: 'DC' },
              { name: 'Chandrika', abbr: 'CH' },
            ].map((media) => (
              <div key={media.name}
                className="flex flex-col items-center justify-center gap-1.5 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-default group">
                <div className="size-12 md:size-14 rounded-2xl bg-secondary/5 group-hover:bg-primary/10 border border-gray-100 group-hover:border-primary/20 flex items-center justify-center transition-all">
                  <span className="text-[11px] font-black text-secondary group-hover:text-primary tracking-tight">{media.abbr}</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 group-hover:text-secondary transition-colors whitespace-nowrap">{media.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
