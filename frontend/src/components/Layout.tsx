import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CategorySheet } from './CategorySheet';
import { motion, AnimatePresence } from 'framer-motion';
import { HubBot } from './HubBot';
import { CommunityPoll } from './CommunityPoll';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeft, PlusCircle, Bell, MapPin, User as UserIcon } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { scrollY } = useScrollDirection();
  
  const isSubPage = location.pathname.split('/').length > 2;

  return (
    <div className="relative min-h-screen bg-background font-sans">
      
      {/* ───── MOBILE & DESKTOP HEADER ───── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 md:h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl w-full">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. BRAND LOGO */}
            <div className="flex items-center gap-1 shrink-0">
              {isSubPage && (
                <button
                  onClick={() => navigate(-1)}
                  className="md:hidden p-2 -ml-2 text-secondary active:scale-95 transition-transform"
                >
                  <ChevronLeft className="size-5" />
                </button>
              )}
              <NavLink to="/" className="font-black text-lg md:text-xl text-secondary tracking-tighter">
                Kasaragod<span className="text-primary italic">Hub</span>
              </NavLink>
            </div>

            {/* 2. DESKTOP SEARCH (Hidden on Mobile) */}
            <div className="hidden md:block flex-1 max-w-sm ml-8">
              <GlobalSearch />
            </div>

            {/* 3. DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-6 shrink-0 ml-auto">
              {['Home', 'Directory', 'Experts'].map((item) => (
                <NavLink
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`
                  }
                >
                  {item}
                </NavLink>
              ))}
              {user ? (
                <NavLink
                  to={user.role === 'pro' ? '/dashboard/pro' : '/dashboard/business'}
                  className="text-sm font-black text-primary px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all font-sans"
                >
                  Hi, {user.name.split(' ')[0]}
                </NavLink>
              ) : (
                <NavLink
                  to="/for-businesses"
                  className="text-sm font-bold transition-all px-5 py-2 rounded-xl bg-primary text-white hover:bg-orange-600 shadow-md shadow-primary/20"
                >
                  List Business
                </NavLink>
              )}
              {user && (
                <button onClick={() => logout()} className="text-[10px] font-black uppercase text-muted-foreground hover:text-red-500 transition-colors">
                  Logout
                </button>
              )}
            </nav>

            {/* 4. MOBILE UTILITY ICONS (Right side) */}
            <div className="md:hidden flex items-center gap-1.5 shrink-0">
               {/* Location / Region shortcut */}
               <button className="p-2 text-secondary/60 active:scale-90 transition-transform">
                 <MapPin className="size-5" />
               </button>
               {/* Notifications */}
               <button className="p-2 text-secondary/60 relative active:scale-90 transition-transform">
                 <Bell className="size-5" />
                 <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-white" />
               </button>
               {/* Profile / Account */}
               <NavLink 
                 to={user ? (user.role === 'pro' ? '/dashboard/pro' : '/dashboard/business') : "/login"}
                 className="ml-1 p-0.5 rounded-full border border-gray-100 bg-gray-50 active:scale-90 transition-transform overflow-hidden"
               >
                 {user ? (
                   <div className="size-8 bg-secondary text-white flex items-center justify-center font-black text-[10px] uppercase">
                     {user.name[0]}
                   </div>
                 ) : (
                   <div className="size-8 flex items-center justify-center text-secondary/40">
                     <UserIcon className="size-5" />
                   </div>
                 )}
               </NavLink>
            </div>

          </div>
        </div>
      </header>


      <main className="bg-white min-h-screen pt-14 md:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pb-24 md:pb-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BottomNav />
      <CategorySheet />
      <HubBot />
      <CommunityPoll />
    </div>
  );
}
