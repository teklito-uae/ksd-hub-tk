import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CategorySheet } from './CategorySheet';
import { motion, AnimatePresence } from 'framer-motion';
import { HubBot } from './HubBot';
import { CommunityPoll } from './CommunityPoll';
import { Footer } from './Footer';
import { PlusCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname.split('/').length > 2;

  return (
    <div className="relative min-h-screen bg-background">
      {/* Universal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-14 items-center flex px-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-2 mr-auto">
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
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Home</NavLink>
          <NavLink to="/directory" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Directory</NavLink>
          <NavLink
            to="/for-businesses"
            className={({ isActive }) =>
              `text-sm font-semibold transition-all px-4 py-2 rounded-xl ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-primary text-white hover:bg-orange-600'
              }`
            }
          >
            For Businesses
          </NavLink>
        </nav>

        {/* Mobile Action (e.g. Profile or Suggest) */}
        <div className="md:hidden flex items-center gap-2">
           <NavLink to="/register" className="size-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <PlusCircle className="size-5" />
           </NavLink>
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
