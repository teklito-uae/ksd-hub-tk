import { useState, useEffect, useRef } from 'react';
import { categories as staticCategories, stats, featuredSections, bucketLists } from '@/lib/dummy-data';
import api from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
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
  Mic 
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

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
  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bizRes, catRes, proRes] = await Promise.all([
          api.get('/businesses'),
          api.get('/categories'),
          api.get('/professionals')
        ]);
        setBusinesses(bizRes.data);
        if (catRes.data.length > 0) setCategories(catRes.data);
        setPros(proRes.data);
      } catch (err) {
        console.error('Failed to load landing page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <div className="overflow-x-hidden min-h-screen bg-white font-sans selection:bg-primary/20 pb-12 md:pb-24">
      
      <div className="flex flex-col">
        
        {/* ───── 1. CATEGORIES ───── */}
        <section className="container mx-auto px-4 max-w-7xl mt-4 md:mt-10 order-1 md:order-2">
          <CategoryList categories={categories} loading={loading} />
        </section>

        {/* ───── 2. HERO SECTION ───── */}
        <section className="container mx-auto px-4 max-w-7xl pt-0 md:pt-4 mt-4 md:mt-0 order-2 md:order-1">
          {loading ? (
             <div className="flex flex-col lg:flex-row gap-3 h-auto md:h-[250px]">
                <Skeleton className="lg:flex-1 w-full h-[130px] md:h-[250px] rounded-2xl md:rounded-3xl" />
                <div className="hidden lg:flex lg:w-fit flex-row gap-3 h-full">
                   {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={`hero-skel-${i}`} className="w-[170px] h-full rounded-2xl" />
                   ))}
                </div>
             </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-3 h-auto md:h-[250px]">
              {/* A. Cinematic Banner */}
              <div className="lg:flex-1 w-full h-[130px] md:h-[250px] rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
                <Carousel 
                  plugins={[Autoplay({ delay: 5000 })]}
                  opts={{ align: "start", loop: true }} 
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full ml-0">
                    <CarouselItem className="pl-0 h-[130px] md:h-[250px]">
                      <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_webflight_2024.webp" className="w-full h-full object-cover block" alt="Flight Banner" />
                    </CarouselItem>
                    <CarouselItem className="pl-0 h-[130px] md:h-[250px]">
                      <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp" className="w-full h-full object-cover block" alt="Hotels Banner" />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>

              {/* B. Hotkeys Row (Desktop Only) */}
              <div className="hidden lg:flex lg:w-fit flex-row gap-3 h-full">
                <Link to="/directory" className="shrink-0 group h-full">
                   <Card className="w-[170px] h-full bg-[#E3F2FD] p-5 rounded-3xl border-none relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all shadow-sm">
                      <div className="relative z-10">
                        <h3 className="text-blue-900 font-bold text-lg md:text-3xl leading-none mb-1 text-left">B2B</h3>
                        <p className="text-blue-700/60 text-[10px] font-bold uppercase tracking-widest text-left">Get Quotes</p>
                      </div>
                      <div className="absolute bottom-0 right-0 h-[70%] w-full flex items-end justify-end">
                         <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300" className="h-full object-cover rounded-tl-3xl opacity-90 group-hover:scale-105 transition-transform" alt="B2B" />
                      </div>
                   </Card>
                </Link>

                <Link to="/directory" className="group shrink-0 h-full">
                   <Card className="w-[170px] h-full bg-[#F5F5F5] p-5 rounded-3xl border-none relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all shadow-sm">
                      <div className="relative z-10">
                        <h3 className="text-secondary font-bold text-lg md:text-3xl leading-none mb-1 text-left">REPAIRS</h3>
                        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest text-left">Nearby Pros</p>
                      </div>
                      <div className="absolute bottom-4 right-4 text-gray-200">
                         <Hammer className="size-16" />
                      </div>
                   </Card>
                </Link>

                <Link to="/directory" className="group shrink-0 h-full">
                   <Card className="w-[170px] h-full bg-[#E8EAF6] p-5 rounded-3xl border-none relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all shadow-sm">
                      <div className="relative z-10">
                        <h3 className="text-indigo-900 font-bold text-lg md:text-3xl leading-none mb-1 text-left">REAL ESTATE</h3>
                        <p className="text-indigo-700/60 text-[10px] font-bold uppercase tracking-widest text-left">Verified</p>
                      </div>
                      <div className="absolute bottom-4 right-4 text-indigo-100">
                         <Building className="size-16" />
                      </div>
                   </Card>
                </Link>

                <Link to="/directory" className="group shrink-0 h-full">
                   <Card className="w-[170px] h-full bg-[#E8F5E9] p-5 rounded-3xl border-none relative overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all shadow-sm">
                      <div className="relative z-10">
                        <h3 className="text-emerald-900 font-bold text-lg md:text-3xl leading-none mb-1 text-left">DOCTORS</h3>
                        <p className="text-emerald-700/60 text-[10px] font-bold uppercase tracking-widest text-left">Quick Visit</p>
                      </div>
                      <div className="absolute bottom-0 right-0 h-full w-full flex items-end justify-end">
                         <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/doctor_square_hotkey.webp?w=2048&q=75" className="h-[95%] object-contain group-hover:scale-105 transition-transform origin-bottom" alt="Doctors" />
                      </div>
                   </Card>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ───── 3. EXPERT SPOTLIGHT ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 md:mt-16">
        <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
          <div className="flex flex-row items-end justify-between gap-4 mb-4 md:mb-8">
            <div className="space-y-0.5">
              <h2 className="text-lg md:text-3xl font-black text-secondary tracking-tight">Hire Verified Talent.</h2>
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
                      <Card className="p-3 md:p-5 rounded-2xl border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all group relative overflow-hidden h-full flex flex-col items-center text-center">
                        <div className="size-12 md:size-16 rounded-full overflow-hidden shadow-sm border border-gray-100 mb-2 md:mb-3 text-center">
                          <img src={pro.avatar_path || pro.avatar} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all mx-auto" alt={pro.name} />
                        </div>
                        <h4 className="text-[11px] md:text-base font-bold text-secondary group-hover:text-primary transition-colors leading-tight mb-0.5 truncate w-full">{pro.name}</h4>
                        <p className="text-[8px] md:text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate w-full">{pro.profession}</p>
                        <div className="flex items-center justify-center gap-1 mt-1.5 md:mt-2">
                          <div className="flex items-center gap-0.5 bg-primary/5 px-1 py-0.5 rounded text-[8px] md:text-[9px] font-bold text-primary">
                            <Star className="size-2 fill-current text-primary" /> {pro.rating || 5}
                          </div>
                          <span className="text-[8px] md:text-[9px] font-semibold text-muted-foreground">• {pro.experience || '3+ yrs'}</span>
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
                <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden mb-2 md:mb-3">
                  <img src={list.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={list.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 flex flex-col justify-end">
                    <Badge className="w-fit bg-primary text-white border-none text-[8px] md:text-[10px] font-bold mb-1.5">
                      {list.businessCount} PLACES
                    </Badge>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{list.title}</h3>
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
      <section className="container mx-auto px-4 max-w-7xl mt-8 mb-10 border-t border-gray-50 pt-10">
        <div className="space-y-8 pb-10">
          
          <div className="space-y-3">
            <h4 className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-widest pl-1 border-l-3 border-primary">Popular Categories</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] md:text-[12px] text-muted-foreground leading-relaxed">
              {[
                "Real Estate", "Tech", "Education", "Health", "Shopping", "Auto", "Food", "Events", "Tourism", "Build"
              ].map((link, i, arr) => (
                <span key={link} className="flex items-center">
                  <span className="hover:text-primary cursor-pointer transition-colors font-bold text-secondary/70">{link}</span>
                  {arr.length - 1 !== i && <span className="mx-1.5 text-gray-200">|</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-widest pl-1 border-l-3 border-primary/50">Trending</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-2 text-[10px] text-muted-foreground items-center">
              {[
                "Packers", "Designers", "CCTV", "Pet Shop", "Resorts", "Biryani"
              ].map((link, i, arr) => (
                <span key={link} className="flex items-center">
                  <span className="hover:text-primary cursor-pointer transition-colors font-medium">{link}</span>
                  {arr.length - 1 !== i && <span className="mx-2 text-gray-200/50">|</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
