import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { categories as staticCategories, Professional } from '@/lib/dummy-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Clock,
  ChevronLeft,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { InquiryModal } from '@/components/InquiryModal';
import { KGDMap } from '@/components/KGDMap';

export function BusinessProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [business, setBusiness] = useState<any>(null);
  const [categoriesList, setCategoriesList] = useState<any[]>(staticCategories);
  const [relatedBusinesses, setRelatedBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        const [bizRes, catRes] = await Promise.all([
          api.get(`/businesses/${slug}`),
          api.get('/categories')
        ]);
        const bizData = bizRes.data;
        setBusiness(bizData);
        if (catRes.data.length > 0) setCategoriesList(catRes.data);

        // Fetch related businesses
        if (bizData.category_id) {
          const relatedRes = await api.get(`/businesses?category_id=${bizData.category_id}`);
          setRelatedBusinesses(relatedRes.data.filter((b: any) => b.id !== bizData.id).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load business profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-gray-50/50 min-h-screen pb-32 md:pb-20">
        <Skeleton className="h-[300px] md:h-[450px] w-full" />
        <div className="container mx-auto px-4 max-w-5xl -mt-8 md:mt-12 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-64 w-full rounded-3xl" />
              <Skeleton className="h-48 w-full rounded-3xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-96 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If business doesn't exist, show error
  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="size-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-secondary">Business Not Found</h2>
        <p className="text-muted-foreground text-sm mt-1 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/directory')} className="rounded-xl">
          Back to Directory
        </Button>
      </div>
    );
  }

  const category = categoriesList.find(c => c.id.toString() === business.category_id?.toString());
  // In a real app, experts would be fetched from a relationship, for now we can mock or fetch if endpoint exists
  const experts: any[] = []; 


  return (
    <div className="bg-gray-50/50 min-h-screen pb-32 md:pb-20">
      {/* Gallery Section */}
      <section className="relative h-[300px] md:h-[450px] w-full bg-secondary overflow-hidden">
        {/* Share Button (Mobile Only, Non-fixed) */}
        <button className="md:hidden absolute top-4 right-4 z-20 size-10 rounded-xl bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform">
          <Share2 className="size-5" />
        </button>

        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {(business.images && business.images.length > 0 ? business.images : [
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'
            ]).map((img: string, i: number) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img src={img} alt={business.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Info (Desktop) */}
        <div className="hidden md:block absolute bottom-12 left-0 right-0 z-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="size-24 rounded-3xl bg-secondary border-4 border-white shadow-2xl overflow-hidden shrink-0">
                  <img src={business.logo_url} className="w-full h-full object-cover" alt="Logo" />
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-white border-none hover:bg-primary">{category?.name}</Badge>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-lg px-2 py-0.5 text-white text-xs font-bold border border-white/20">
                      <Star className="size-3 fill-primary text-primary" />
                      {business.rating}
                    </div>
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-md">{business.name}</h1>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 max-w-5xl -mt-8 md:mt-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Info) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Header (Mobile Only) */}
            <Card className="md:hidden rounded-2xl p-5 shadow-xl border-none">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-2xl bg-secondary overflow-hidden shadow-inner font-bold text-white flex items-center justify-center">
                    {business.logo_url ? (
                      <img src={business.logo_url} className="w-full h-full object-cover" alt="Logo" />
                    ) : (
                      business.name[0]
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-secondary leading-tight">{business.name}</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">{category?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Star className="size-4 fill-current" />
                  <span className="text-sm font-bold">{business.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                <MapPin className="size-3.5 text-primary" />
                {business.location}
              </div>
            </Card>

            {/* Description */}
            <Card className="rounded-3xl p-6 md:p-8 border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-secondary">About This Business</h2>
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <p className="text-secondary/70 text-sm leading-relaxed mb-8">
                {business.description}
                <br /><br />
                Established as a cornerstone of the {business.location} community, {business.name} continues to set the benchmark for excellence in the {category?.name} sector. We pride ourselves on delivering premium quality and unyielding professional standards to all our clients across the Kasaragod district.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                  <p className="text-xs text-green-600 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" /> Verified Listing
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Experience</p>
                  <p className="text-xs text-secondary font-bold">12+ Years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Availability</p>
                  <p className="text-xs text-secondary font-bold flex items-center gap-1.5">
                    <Clock className="size-3.5" /> 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </Card>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-secondary px-2">Services & Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Home Delivery Available', 'Verified Professional Staff', '24/7 Support Channel', 'Quality Guaranteed'].map(f => (
                  <div key={f} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-xs font-semibold text-secondary">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experts Spotlight */}
            {experts.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-bold text-secondary">Verified Experts at this Location</h3>
                  <Badge variant="outline" className="text-[9px] font-black uppercase text-primary border-primary/20 bg-primary/5">Clubbed Masters</Badge>
                </div>
                <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 px-1">
                   {experts.map((pro) => (
                      <Link key={pro.id} to={`/expert/${pro.slug}`} className="min-w-[200px] block group">
                         <Card className="p-4 rounded-2xl border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all bg-white relative overflow-hidden">
                            <div className="flex items-center gap-3">
                               <div className="size-10 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                  <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="min-w-0">
                                  <p className="text-xs font-bold text-secondary truncate group-hover:text-primary transition-colors">{pro.name}</p>
                                  <p className="text-[10px] text-muted-foreground truncate">{pro.profession}</p>
                               </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold">
                               <span className="text-primary">{pro.experience} Exp</span>
                               <div className="flex items-center gap-1 text-secondary">
                                  <Star className="size-2.5 fill-primary text-primary" /> {pro.rating}
                               </div>
                            </div>
                         </Card>
                      </Link>
                   ))}
                </div>
              </div>
            )}

            {/* Photo Gallery Grid */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-secondary px-2">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 group border border-gray-100">
                    <img
                      src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?w=400&h=400&fit=crop&q=80`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={`Gallery ${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-secondary">Recent Reviews</h3>
                <Button variant="ghost" className="text-xs text-primary font-bold">Write a Review</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sameer K.', date: '2 days ago', content: 'Excellent service and very professional staff. Highly recommended for anyone in Kasaragod Town.' },
                  { name: 'Fathima R.', date: '1 week ago', content: 'Very reliable and reasonably priced. The WhatsApp communication was very fast.' }
                ].map((r, i) => (
                  <Card key={i} className="rounded-2xl p-5 border-gray-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-secondary text-xs">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-secondary">{r.name}</p>
                          <p className="text-[10px] text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="size-3 fill-primary text-primary" />)}
                      </div>
                    </div>
                    <p className="text-xs text-secondary/70 leading-relaxed italic">"{r.content}"</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <Card className="rounded-3xl p-6 border-gray-100 shadow-sm sticky top-20">
              <h3 className="text-base font-bold text-secondary mb-5">Contact Details</h3>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4 group">
                  <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</p>
                    <p className="text-sm font-bold text-secondary">{business.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address</p>
                    <p className="text-sm font-bold text-secondary leading-tight">{business.address}</p>
                  </div>
                </div>

                {business.whatsapp && (
                  <div className="flex gap-4 group">
                    <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MessageSquare className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                      <p className="text-sm font-bold text-secondary">+{business.whatsapp}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full bg-secondary text-white hover:bg-black rounded-xl h-12 font-bold shadow-lg transition-transform active:scale-95"
                >
                  Send Inquiry Message
                </Button>
                <div className="grid grid-cols-2 gap-2">
                   <a
                    href={`tel:${business.phone}`}
                    className="flex items-center justify-center gap-2 border border-border rounded-xl h-11 text-xs font-bold hover:bg-gray-50 transition-colors"
                   >
                    <Phone className="size-3.5" /> Call
                   </a>
                   <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 border border-green-100 text-green-600 rounded-xl h-11 text-xs font-bold hover:bg-green-50 transition-colors"
                   >
                    <MessageSquare className="size-3.5" /> WhatsApp
                   </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                {business.latitude && business.longitude ? (
                  <KGDMap 
                    latitude={business.latitude} 
                    longitude={business.longitude} 
                    businessName={business.name}
                    logoUrl={business.logo_url}
                    className="h-64"
                  />
                ) : (
                  <div className="bg-gray-100 rounded-2xl h-48 w-full flex items-center justify-center relative overflow-hidden group">
                    <MapPin className="size-8 text-gray-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-blue-500/5" />
                    <p className="absolute bottom-4 text-[10px] font-bold text-gray-400">Map Coordinates Coming Soon</p>
                  </div>
                )}
                {business.latitude && business.longitude && (
                   <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full h-11 bg-primary/5 text-primary rounded-xl text-xs font-bold hover:bg-primary/10 transition-colors"
                   >
                     <ExternalLink className="size-3.5" /> Get Directions
                   </a>
                )}
              </div>
            </Card>

            <div className="bg-primary/10 p-5 rounded-2xl border border-primary/20">
               <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="size-5 text-primary" />
                  <h4 className="text-sm font-bold text-secondary">Safety Tip</h4>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Kasaragod Hub recommends visiting the physical location before any major transactions. Always verify service details directly with the provider.
               </p>
            </div>
          </div>
        </div>

        {/* ── RELATED BUSINESSES ── */}
        <div className="mt-20 pt-12 border-t border-gray-100">
           <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-secondary">Similar Listings</h3>
                <p className="text-xs text-muted-foreground mt-1">Found in {category?.name} category</p>
              </div>
           </div>
            <div className="flex overflow-x-auto scrollbar-hide gap-5 pb-4 px-1">
             {relatedBusinesses.map((b: any) => (
                <div key={b.id} className="min-w-[280px] md:min-w-[320px]">
                   <Card className="overflow-visible group hover:shadow-xl transition-all border border-gray-100 rounded-2xl bg-white relative pt-12 p-5 h-full flex flex-col">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-2xl border-4 border-white bg-secondary shadow-lg overflow-hidden shrink-0">
                         {(b.logo_path || b.logo_url) && <img src={b.logo_path || b.logo_url} className="w-full h-full object-cover" alt="Logo" />}
                      </div>
                      <div className="flex-1 text-center pt-2">
                        <h4 className="font-bold text-secondary mb-1 line-clamp-1">{b.name}</h4>
                        <div className="flex items-center justify-center gap-1 text-primary text-[10px] mb-3">
                          <Star className="size-3 fill-current" />
                          <span className="font-black">{b.rating}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed mb-4">{b.description}</p>
                      </div>
                      <Link to={`/business/${b.slug}`}>
                        <Button variant="outline" className="w-full rounded-xl text-xs font-bold border-gray-100 hover:text-primary hover:border-primary group-hover:bg-primary/5">
                          View Profile
                        </Button>
                      </Link>
                   </Card>
                </div>
             ))}
            </div>
        </div>
      </div>

      {/* ── MOBILE ACTION BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.1)]">
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsInquiryOpen(true)}
            className="flex-1 bg-secondary text-white h-12 rounded-xl font-bold"
          >
            Send Message
          </Button>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            className="size-12 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
          >
            <MessageSquare className="size-6" />
          </a>
          <a
            href={`tel:${business.phone}`}
            className="size-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            <Phone className="size-6" />
          </a>
        </div>
      </div>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        businessName={business.name} 
      />
    </div>
  );
}
