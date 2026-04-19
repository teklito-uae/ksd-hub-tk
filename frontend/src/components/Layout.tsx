import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CategorySheet } from './CategorySheet';
import { motion, AnimatePresence } from 'framer-motion';
import { HubBot } from './HubBot';
import { AuthModal } from './AuthModal';

import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  ChevronLeft, ChevronDown, PlusCircle, Bell, MapPin,
  User as UserIcon, Search, LayoutGrid, ChevronRight, X, ArrowRight
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import api from '@/lib/axios';
import { useUIStore } from '@/store/useUIStore';

// ── Mega Menu Dropdown ──
function MegaMenuDropdown({ cat, onClose }: { cat: Category; onClose: () => void }) {
  if (!cat.children || cat.children.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 min-w-[260px]"
    >
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-100 z-10" />
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/12 border border-gray-100 py-2 px-2">
        <div className="px-3 pb-2 pt-1 border-b border-gray-50 mb-1">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{cat.name}</p>
        </div>
        <div className="flex flex-col">
          {cat.children.map((child) => {
            const Icon = (Icons as any)[child.icon] || Icons.Circle;
            return (
              <NavLink
                key={child.id}
                to={`/directory/${child.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-secondary hover:text-primary group transition-all duration-150"
                onClick={onClose}
              >
                <div className="size-7 rounded-lg bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors shrink-0">
                  <Icon className="size-3.5" />
                </div>
                <span className="text-[13px] font-semibold">{child.name}</span>
              </NavLink>
            );
          })}
        </div>
        <div className="border-t border-gray-50 mt-1 pt-1.5 px-1">
          <NavLink
            to={`/directory/${cat.slug}`}
            className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-primary hover:bg-red-50 rounded-xl transition-colors"
            onClick={onClose}
          >
            All {cat.name} <ChevronRight className="size-3.5" />
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
}

function NavCategoryItem({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={`/directory/${cat.slug}`}
        className={cn(
          "flex items-center gap-1 text-[13px] font-semibold py-3 border-b-2 transition-all duration-150 whitespace-nowrap",
          open ? "text-primary border-primary" : "text-secondary/80 border-transparent hover:text-primary hover:border-gray-200"
        )}
      >
        {cat.name}
        {cat.children && cat.children.length > 0 && (
          <ChevronDown className={cn("size-3 transition-transform duration-200 shrink-0", open && "rotate-180")} />
        )}
      </NavLink>
      <AnimatePresence>
        {open && <MegaMenuDropdown cat={cat} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ── All Categories Right Drawer ──
function AllCategoriesDrawer({ categories, open, onClose }: { categories: Category[]; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full w-80 md:w-96 bg-white z-[201] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-extrabold text-secondary">All Categories</h2>
                <p className="text-[11px] text-gray-400 font-medium">Browse {categories.length} categories</p>
              </div>
              <button onClick={onClose} className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="size-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {categories.map((cat, idx) => {
                const Icon = (Icons as any)[cat.icon] || Icons.LayoutGrid;
                return (
                  <div key={cat.id}>
                    <NavLink to={`/directory/${cat.slug}`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 hover:text-primary text-secondary group transition-all">
                      <div className="size-8 rounded-lg bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors shrink-0">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-[13px] font-bold flex-1">{cat.name}</span>
                      <ArrowRight className="size-3.5 text-gray-300 group-hover:text-primary/50 transition-colors" />
                    </NavLink>
                    {cat.children && cat.children.length > 0 && (
                      <div className="ml-11 mt-0.5 mb-1 grid grid-cols-2 gap-0.5">
                        {cat.children.map((child) => (
                          <NavLink key={child.id} to={`/directory/${child.slug}`} onClick={onClose} className="text-[11px] font-medium text-gray-500 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-red-50">
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                    {idx < categories.length - 1 && <div className="border-b border-gray-50 my-1" />}
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-100">
              <NavLink to="/directory" onClick={onClose}>
                <Button className="w-full h-10 rounded-full bg-primary hover:bg-red-700 text-white font-bold text-sm gap-2">
                  <Search className="size-4" /> Search All Businesses
                </Button>
              </NavLink>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Animated search placeholders ──
const searchPlaceholders = [
  'Search "Best Restaurants"...',
  'Search "Plumbers near me"...',
  'Search "Wedding Halls"...',
  'Search "AC Repair"...',
  'Search "Hospitals in Kanhangad"...',
  'Search "Interior Designers"...',
];

// ── Mobile Search Bottom Sheet ──
const popularSearches = ['Restaurants', 'Hospitals', 'AC Repair', 'Plumbers', 'Beauty Salon', 'Interior Design', 'Supermarket', 'Taxi'];

function MobileSearchSheet({ open, onClose, placeholder, places, navigate }: {
  open: boolean; onClose: () => void; placeholder: string; places: any[]; navigate: (path: string) => void;
}) {
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()} repositionInputs={false}>
      <DrawerContent className="rounded-t-[2rem] outline-none">
        <div className="p-5 pb-8 max-h-[85vh] overflow-y-auto w-full">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5 shrink-0" />
          <h3 className="text-base font-extrabold text-secondary mb-4">Search Kasaragod</h3>
          {/* Search input */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              autoFocus
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 text-[14px] font-medium text-secondary outline-none transition-all placeholder:text-gray-400"
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                  onClose();
                  navigate(`/directory?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                }
              }}
            />
          </div>
          {/* Location select */}
          <div className="relative mb-5">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            <select
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-bold text-secondary appearance-none cursor-pointer outline-none focus:border-primary"
              defaultValue="all"
            >
              <option value="all">All Kasaragod</option>
              {places.map((p: any) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          {/* Popular chips */}
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map(s => (
              <button
                key={s}
                onClick={() => { onClose(); navigate(`/directory?search=${encodeURIComponent(s)}`); }}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
              >{s}</button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// ── Layout ──
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { categorySheetOpen, searchOpen, setSearchOpen, authModalOpen, setAuthModalOpen } = useUIStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);

  const isSubPage = location.pathname.split('/').length > 2;
  const navCategories = categories.slice(0, 5);

  useEffect(() => {
    api.get('/categories').then(res => {
      const data = res.data;
      setCategories(Array.isArray(data) ? data : (data?.data ?? []));
    }).catch(() => {});
    api.get('/places').then(res => {
      const data = res.data;
      setPlaces(Array.isArray(data) ? data : (data?.data ?? []));
    }).catch(() => {});
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  // Cycle search placeholders every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchPlaceholderIndex(i => (i + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background font-sans">

      {/* ───── HEADER ───── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">

        {/* TOP BAR */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl h-[56px] md:h-[60px] flex items-center">

          {/* ── SECTION 1: Logo (left) ── */}
          <div className="flex items-center shrink-0 md:w-[180px]">
            {isSubPage && (
              <button onClick={() => navigate(-1)} className="md:hidden p-1.5 -ml-1.5 mr-1 text-secondary active:scale-95 transition-transform">
                <ChevronLeft className="size-5" />
              </button>
            )}
            <NavLink to="/" className="flex items-center transition-opacity hover:opacity-90">
              <img src="/assets/logo/kasaragodHub-logo.png" alt="KasaragodHub" className="h-5 md:h-6 w-auto object-contain" />
            </NavLink>
          </div>

          {/* ── SECTION 2: Search + Location (center, desktop only) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 z-10" />
              <input
                type="text"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 text-[13px] font-medium text-secondary outline-none transition-all placeholder:text-gray-400"
                placeholder={searchPlaceholders[searchPlaceholderIndex]}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                    navigate(`/directory?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                  }
                }}
              />
            </div>
            <select
              onChange={(e) => {
                if (e.target.value !== 'all') navigate(`/directory?location=${encodeURIComponent(e.target.value)}`);
              }}
              className="h-10 pl-3 pr-7 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-[12px] font-bold text-secondary appearance-none cursor-pointer outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all w-[140px] shrink-0"
              defaultValue="all"
            >
              <option value="all">📍 All Areas</option>
              {places.map((p: any) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Mobile spacer */}
          <div className="flex-1 md:hidden" />

          {/* ── SECTION 3: Auth + CTA (right, desktop) ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0 md:w-[180px] justify-end">
            {user ? (
              <>
                <NavLink to={user.role === 'pro' ? '/dashboard/pro' : '/dashboard/business'} className="flex items-center gap-2 text-[13px] font-semibold text-secondary hover:text-primary transition-colors">
                  <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs uppercase overflow-hidden border border-primary/20">
                    {(user as any).avatar ? <img src={(user as any).avatar} className="w-full h-full object-cover" alt="avatar" /> : user.name[0]}
                  </div>
                </NavLink>
                <button onClick={() => logout()} className="text-[11px] font-bold text-gray-400 hover:text-primary transition-colors">Sign out</button>
              </>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" title="Log In">
                <UserIcon className="size-4" />
              </button>
            )}
            <NavLink to="/for-businesses">
              <Button className="h-9 px-4 rounded-full bg-primary hover:bg-red-700 text-white text-[13px] font-bold shadow-sm shadow-primary/30 transition-all active:scale-95 gap-1.5">
                <PlusCircle className="size-3.5" /> Add Listing
              </Button>
            </NavLink>
          </div>

          {/* Mobile: icon row */}
          <div className="md:hidden flex items-center gap-0.5 shrink-0">
            <button className="p-2 text-secondary/60 relative active:scale-90 transition-transform">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 size-1.5 bg-primary rounded-full" />
            </button>
            {user ? (
              <NavLink to={user.role === 'pro' ? '/dashboard/pro' : '/dashboard/business'} className="p-1 ml-0.5">
                <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary/50 overflow-hidden border border-gray-200">
                  <span className="text-xs font-black text-secondary uppercase">{user.name[0]}</span>
                </div>
              </NavLink>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="p-1 ml-0.5 outline-none focus:outline-none">
                <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary/50 overflow-hidden border border-gray-200">
                  <UserIcon className="size-4" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY NAV BAR — Desktop only */}
        {navCategories.length > 0 && (
          <div className="hidden md:block border-t border-gray-100 bg-white">
            <div className="container mx-auto px-6 max-w-7xl flex items-center gap-8">
              {navCategories.map((cat) => (
                <NavCategoryItem key={cat.id} cat={cat} />
              ))}
              {categories.length > 5 && <div className="w-px h-4 bg-gray-200 shrink-0" />}
              <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-1.5 text-[13px] font-semibold py-3 text-gray-500 hover:text-primary transition-colors ml-auto shrink-0">
                <LayoutGrid className="size-3.5" /> All Categories <ChevronRight className="size-3 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </header>

      <AllCategoriesDrawer categories={categories} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className={cn(
        "bg-white min-h-screen",
        navCategories.length > 0 ? "pt-[56px] md:pt-[104px]" : "pt-[56px] md:pt-[60px]"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pb-[76px] md:pb-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── MOBILE SEARCH BOTTOM SHEET ── */}
      <MobileSearchSheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        placeholder={searchPlaceholders[searchPlaceholderIndex]}
        places={places}
        navigate={navigate}
      />

      <Footer />
      <BottomNav />
      <CategorySheet />
      <HubBot />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
