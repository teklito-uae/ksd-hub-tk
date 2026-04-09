import { Outlet, NavLink } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { CategorySheet } from './CategorySheet';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Desktop Header Placeholder */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-14 items-center px-8 shadow-sm">
        <NavLink to="/" className="font-black text-lg text-secondary tracking-tight">
          Kasaragod<span className="text-primary italic">Hub</span>
        </NavLink>
        <nav className="ml-auto flex items-center gap-6">
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
      </header>

      <main className="md:pt-16 pb-24 md:pb-0">
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

      <BottomNav />
      <CategorySheet />
    </div>
  );
}
