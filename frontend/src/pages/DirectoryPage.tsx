import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChevronRight, ChevronLeft, MapPin, Star, Phone,
  ArrowRight, LayoutGrid, RotateCcw, BadgeCheck, Shield, Crown, Award,
  Send, MessageCircle
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { useUIStore } from '@/store/useUIStore';

const ITEMS_PER_PAGE = 12;
const isValidIndianPhone = (p: string) => /^[6-9]\d{9}$/.test(p.replace(/\s/g, ''));
const maskPhone = (p: string) => { if (!p) return '••••••••••'; const c = p.replace(/[^0-9]/g, ''); return c.slice(0, 5) + '•••••'; };

// Badge config by verification_status
const BADGE_CONFIG: Record<string, { label: string; icon: any; bg: string; text: string }> = {
  premium: { label: 'Premium', icon: Crown, bg: 'bg-amber-500', text: 'text-white' },
  featured: { label: 'Featured', icon: Award, bg: 'bg-purple-500', text: 'text-white' },
  verified: { label: 'Verified', icon: BadgeCheck, bg: 'bg-blue-500', text: 'text-white' },
  unverified: { label: 'New', icon: Shield, bg: 'bg-gray-200', text: 'text-gray-600' },
};

function VerificationBadge({ status }: { status?: string }) {
  const cfg = BADGE_CONFIG[status || 'unverified'] || BADGE_CONFIG.unverified;
  return (
    <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold", cfg.bg, cfg.text)}>
      <cfg.icon className="size-2.5" /> {cfg.label}
    </span>
  );
}

// ── Enquiry Modal ──
function EnquiryModal({ open, onClose, business }: { open: boolean; onClose: () => void; business: any }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (!isValidIndianPhone(form.phone)) { setError('Enter valid 10-digit Indian phone number'); return; }
    setSending(true);
    try {
      await api.post('/inquiries', { business_id: business?.id, customer_name: form.name, customer_phone: form.phone, notes: form.message });
      setSent(true);
      setTimeout(() => { onClose(); setSent(false); setForm({ name: '', phone: '', message: '' }); setError(''); }, 1500);
    } catch { setError('Failed to send'); } finally { setSending(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-red-600 p-5 text-white">
          <DialogHeader><DialogTitle className="text-lg font-extrabold text-white">Quick Enquiry</DialogTitle></DialogHeader>
          <p className="text-[12px] text-white/70 mt-1">{business?.name}</p>
        </div>
        {sent ? (
          <div className="p-8 text-center">
            <BadgeCheck className="size-12 text-green-500 mx-auto mb-2" />
            <p className="font-bold text-secondary">Enquiry Sent!</p>
            <p className="text-xs text-gray-400 mt-1">The business will contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <Input placeholder="Your Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-11 rounded-xl" />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] select-none">🇮🇳</span>
              <Input placeholder="Phone Number *" type="tel" maxLength={10} value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9]/g, '') }))} className="h-11 rounded-xl pl-10" />
            </div>
            <textarea placeholder="Brief message (optional)" value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full h-20 px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none" />
            {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
            <Button type="submit" disabled={sending} className="w-full h-11 rounded-xl bg-primary hover:bg-red-700 font-bold gap-2">
              <Send className="size-4" /> {sending ? 'Sending...' : 'Send Enquiry'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Business Card ──
function CompactBusinessCard({ business, distance, onEnquire, onAuthRequired, isLoggedIn }: {
  business: any; distance: string | null; onEnquire: () => void; onAuthRequired: () => void; isLoggedIn: boolean;
}) {
  const phone = business.phone || '';
  const whatsapp = business.whatsapp || phone;
  const handleCall = () => { if (!isLoggedIn) { onAuthRequired(); return; } window.open(`tel:${phone}`, '_self'); };
  const handleWhatsApp = () => {
    if (!isLoggedIn) { onAuthRequired(); return; }
    const n = (whatsapp.replace(/[^0-9]/g, '')); window.open(`https://wa.me/${n.startsWith('91') ? n : '91' + n}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all p-3 flex gap-3 group">
      <div className="w-[72px] h-[72px] md:w-24 md:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
        <img src={business.logo_path || business.cover_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(business.name)}&background=C8102E&color=fff&size=200`}
          alt={business.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <h3 className="text-[13px] font-bold text-secondary truncate max-w-[60%]">{business.name}</h3>
            <VerificationBadge status={business.verification_status} />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
            {business.category?.name && <span className="text-primary font-semibold">{business.category.name}</span>}
            <span className="flex items-center gap-0.5"><MapPin className="size-2.5" />{business.location || business.location_city || 'Kasaragod'}</span>
            {distance && <span>· {distance}km</span>}
            {business.rating > 0 && <span className="flex items-center gap-0.5 text-amber-600 font-bold"><Star className="size-2.5 fill-amber-400 text-amber-400" />{business.rating}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          {phone && (
            <button onClick={handleCall} className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold hover:bg-green-100 transition-colors">
              <Phone className="size-3" /> <span className="hidden md:inline">{isLoggedIn ? phone : maskPhone(phone)}</span><span className="md:hidden">Call</span>
            </button>
          )}
          {whatsapp && (
            <button onClick={handleWhatsApp} className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold hover:bg-emerald-100 transition-colors">
              <MessageCircle className="size-3" /> <span className="hidden md:inline">WhatsApp</span><span className="md:hidden">WA</span>
            </button>
          )}
          <button onClick={onEnquire} className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/5 text-primary text-[10px] font-bold hover:bg-primary/10 transition-colors ml-auto">
            <Send className="size-3" /> Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

export function DirectoryPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('Recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlugCategory, setActiveSlugCategory] = useState<any>(null);
  const [enquiryBusiness, setEnquiryBusiness] = useState<any>(null);
  const { setAuthModalOpen } = useUIStore();

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/places')])
      .then(([c, p]) => { setCategories(c.data); setPlaces(p.data); }).catch(() => { });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    const search = searchParams.get('search');
    const loc = searchParams.get('location');
    if (slug) params.category_slug = slug;
    if (search) params.search = search;
    if (loc) params.location_city = loc;
    else if (selectedLocation !== 'All Locations') params.location_city = selectedLocation;
    if (isVerifiedOnly) params.verified = 'true';
    api.get('/businesses', { params }).then(r => setBusinesses(r.data)).catch(() => setBusinesses([])).finally(() => setLoading(false));
  }, [slug, searchParams, selectedLocation, isVerifiedOnly]);

  useEffect(() => {
    if (!slug || categories.length === 0) { setActiveSlugCategory(null); return; }
    for (const cat of categories) {
      if (cat.slug === slug) { setActiveSlugCategory(cat); return; }
      for (const child of (cat.children || [])) { if (child.slug === slug) { setActiveSlugCategory(child); return; } }
    }
    setActiveSlugCategory(null);
  }, [slug, categories]);

  const { calculateDistance } = useGeolocation();

  const filteredBusinesses = useMemo(() => {
    let r = [...businesses];
    if (priceRange) r = r.filter(b => (b.price_range || 1) <= priceRange);
    if (sortBy === 'Nearest') r.sort((a, b) => parseFloat(calculateDistance(a.latitude || 0, a.longitude || 0) || '9999') - parseFloat(calculateDistance(b.latitude || 0, b.longitude || 0) || '9999'));
    else if (sortBy === 'Rating') r.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return r;
  }, [businesses, priceRange, sortBy, calculateDistance]);

  useEffect(() => { setCurrentPage(1); }, [filteredBusinesses.length]);
  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
  const paginatedBusinesses = filteredBusinesses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const pageTitle = activeSlugCategory?.name || (searchParams.get('search') ? `Results for "${searchParams.get('search')}"` : 'All Businesses');
  const subcategories = activeSlugCategory?.children || [];
  const resetFilters = () => { setSelectedLocation('All Locations'); setIsVerifiedOnly(false); setPriceRange(null); setSortBy('Recommended'); };
  const hasActiveFilters = selectedLocation !== 'All Locations' || isVerifiedOnly || priceRange !== null || sortBy !== 'Recommended';

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 md:pb-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-3 md:py-4">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-1">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/directory" className="hover:text-primary">Directory</Link>
            {activeSlugCategory && (<><ChevronRight className="size-3" /><span className="text-secondary font-semibold">{activeSlugCategory.name}</span></>)}
          </div>
          <h1 className="text-base md:text-xl font-extrabold text-secondary tracking-tight">{pageTitle}</h1>
          <p className="text-[10px] md:text-[11px] text-gray-400 font-medium">{loading ? 'Loading...' : `${filteredBusinesses.length} results`}</p>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-[56px] md:top-[104px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl py-2">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {subcategories.map((sub: any) => {
              const Icon = (Icons as any)[sub.icon] || Icons.Circle;
              return (
                <Link key={sub.id} to={`/directory/${sub.slug}`}
                  className={cn("flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[10px] font-semibold whitespace-nowrap shrink-0",
                    slug === sub.slug ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-600 hover:text-primary"
                  )}>
                  <Icon className="size-3" /> {sub.name}
                </Link>
              );
            })}
            {subcategories.length > 0 && <div className="w-px h-4 bg-gray-200 shrink-0" />}

            {(['Recommended', 'Rating', 'Nearest'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                className={cn("px-2.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0",
                  sortBy === s ? "bg-secondary text-white" : "bg-white border border-gray-200 text-gray-500"
                )}>{s}</button>
            ))}

            <div className="w-px h-4 bg-gray-200 shrink-0" />

            <button onClick={() => setIsVerifiedOnly(!isVerifiedOnly)}
              className={cn("flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0",
                isVerifiedOnly ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-500"
              )}><BadgeCheck className="size-3" /> Verified</button>

            {[1, 2, 3, 4].map(p => (
              <button key={p} onClick={() => setPriceRange(priceRange === p ? null : p)}
                className={cn("px-2 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0",
                  priceRange === p ? "bg-emerald-500 text-white" : "bg-white border border-gray-200 text-gray-500"
                )}>{'₹'.repeat(p)}</button>
            ))}

            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}
              className="h-7 pl-2 pr-5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 bg-white appearance-none cursor-pointer outline-none shrink-0">
              <option value="All Locations">📍 All Areas</option>
              {places.map((p: any) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>

            {hasActiveFilters && (
              <button onClick={resetFilters} className="flex items-center gap-1 px-2 py-1.5 rounded-full text-[10px] font-bold text-primary shrink-0 whitespace-nowrap">
                <RotateCcw className="size-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 min-w-0">
            {/* Mobile: horizontal category chips (replaces sidebar on mobile) */}
            {categories.length > 0 && (
              <div className="lg:hidden flex items-center gap-2 overflow-x-auto scrollbar-hide mb-4 -mx-1 px-1">
                {categories.slice(0, 10).map((cat: any) => {
                  const Icon = (Icons as any)[cat.icon] || Icons.LayoutGrid;
                  return (
                    <Link key={cat.id} to={`/directory/${cat.slug}`}
                      className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold whitespace-nowrap shrink-0",
                        slug === cat.slug ? "bg-primary/10 text-primary border-primary/30" : "bg-white border-gray-200 text-gray-500 hover:text-primary"
                      )}>
                      <Icon className="size-3" /> {cat.name}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 flex gap-3 animate-pulse">
                    <Skeleton className="w-[72px] h-[72px] rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2 pt-1"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-1/2" /><Skeleton className="h-3 w-1/3" /></div>
                  </div>
                ))
              ) : paginatedBusinesses.length > 0 ? (
                <>
                  {paginatedBusinesses.map((biz, idx) => (
                    <motion.div key={biz.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 6) * 0.03 }}>
                      <CompactBusinessCard business={biz} distance={calculateDistance(biz.latitude || 0, biz.longitude || 0)}
                        onEnquire={() => setEnquiryBusiness(biz)} onAuthRequired={() => setAuthModalOpen(true)} isLoggedIn={!!user} />
                    </motion.div>
                  ))}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5 py-5">
                      <Button variant="outline" size="icon" className="rounded-xl size-8" disabled={currentPage === 1} onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <ChevronLeft className="size-4" />
                      </Button>
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                        <Button key={i + 1} variant={currentPage === i + 1 ? 'secondary' : 'ghost'} className={cn("rounded-xl size-8 font-bold text-xs", currentPage === i + 1 ? "bg-secondary text-white" : "text-gray-500")}
                          onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{i + 1}</Button>
                      ))}
                      <Button variant="outline" size="icon" className="rounded-xl size-8" disabled={currentPage === totalPages} onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl p-10 text-center border border-dashed border-gray-200">
                  <LayoutGrid className="size-8 text-gray-200 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-secondary mb-1">No results found</h3>
                  <p className="text-gray-400 text-[11px]">Try broadening your filters.</p>
                  <Button className="mt-3 rounded-xl text-xs font-bold" size="sm" onClick={resetFilters}>Reset</Button>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:flex w-[260px] shrink-0 flex-col gap-4 sticky top-[160px] h-fit">
            <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Ad</span>
              <div className="mt-3 mb-3"><span className="text-lg font-black bg-gradient-to-br from-primary to-orange-400 bg-clip-text text-transparent">KasaragodHub</span></div>
              <p className="text-xs text-gray-400 mb-3">Reach thousands of local customers.</p>
              <Button size="sm" className="rounded-xl font-bold text-xs px-5">Advertise</Button>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm text-secondary mb-3">Categories</h3>
              <div className="space-y-0.5">
                {categories.slice(0, 10).map((cat: any) => {
                  const Icon = (Icons as any)[cat.icon] || Icons.LayoutGrid;
                  return (
                    <Link key={cat.id} to={`/directory/${cat.slug}`}
                      className={cn("flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] font-semibold transition-all",
                        slug === cat.slug ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      )}><Icon className="size-3.5 shrink-0" /> {cat.name} <span className="ml-auto text-[10px] text-gray-400">{cat.children?.length || 0}</span></Link>
                  );
                })}
                <Link to="/directory" className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-bold text-primary hover:underline">View all <ArrowRight className="size-3" /></Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <EnquiryModal open={!!enquiryBusiness} onClose={() => setEnquiryBusiness(null)} business={enquiryBusiness} />
    </div>
  );
}
