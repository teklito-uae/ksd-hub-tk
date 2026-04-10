import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CategorySheet } from './CategorySheet';
import { motion, AnimatePresence } from 'framer-motion';
import { HubBot } from './HubBot';
import { CommunityPoll } from './CommunityPoll';
import { Footer } from './Footer';
import { PlusCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { GlobalSearch } from './GlobalSearch';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname.split('/').length > 2;

  return (
    <div className="relative min-h-screen bg-background">
      {/* Universal Header — full-width bar, centered content */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-14 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl h-full flex items-center gap-4">

          {/* Logo + back button */}
          <div className="flex items-center gap-1 shrink-0">
            {isSubPage && (
              <button
                onClick={() => navigate(-1)}
                className="md:hidden p-2 -ml-2 text-secondary active:scale-95 transition-transform"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}
            <NavLink to="/" className="font-black text-lg text-secondary tracking-tight border-none outline-none">
              Kasaragod<span className="text-primary italic">Hub</span>
            </NavLink>
          </div>

          {/* Global Search — grows to fill center space */}
          <div className="flex-1 flex items-center justify-end md:justify-start max-w-xs md:max-w-sm">
            <GlobalSearch />
          </div>

          {/* Desktop Nav — pushed to the right */}
          <nav className="hidden md:flex items-center gap-5 ml-auto shrink-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/directory"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`
              }
            >
              Directory
            </NavLink>
            <NavLink
              to="/experts"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`
              }
            >
              Experts
            </NavLink>
            <NavLink
              to="/for-businesses"
              className={({ isActive }) =>
                `text-sm font-bold transition-all px-4 py-1.5 rounded-xl ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-white hover:bg-orange-600'
                }`
              }
            >
              For Businesses
            </NavLink>
          </nav>

          {/* Mobile — register shortcut */}
          <div className="md:hidden ml-auto flex items-center gap-3">
            <NavLink
              to="/login"
              className="text-[10px] font-black uppercase tracking-widest text-secondary"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="size-9 bg-primary text-white rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            >
              <PlusCircle className="size-5" />
            </NavLink>
          </div>

        </div>
      </header>


      <main className="pt-14 md:pt-16 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
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
