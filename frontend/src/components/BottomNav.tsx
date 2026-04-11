import { Home, Search, LayoutGrid, Briefcase, CircleUser } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navItems = [
  { icon: Home,       label: 'Home',       path: '/',          action: null },
  { icon: LayoutGrid, label: 'Explore',    path: null,         action: 'categories' },
  { icon: Search,     label: 'Search',     path: null,         action: 'search' },
  { icon: Briefcase,  label: 'Masters',    path: '/experts',   action: null },
  { icon: CircleUser, label: 'Profile',    path: '/login',     action: null },
];

export function BottomNav() {
  const { openCategorySheet, setSearchOpen } = useUIStore();
  const location = useLocation();
  const { direction } = useScrollDirection();

  const isVisible = direction !== 'down';

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-6 md:hidden pointer-events-none">
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="pointer-events-auto flex items-center justify-between gap-1 bg-white/95 backdrop-blur-2xl border border-gray-100 p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-sm"
      >
        {navItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path
            : false;

          const content = (
            <div
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-2xl transition-all min-w-[60px]',
                isActive ? 'text-primary' : 'text-gray-400 hover:text-secondary'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 bg-primary/5 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn('size-5.5 z-10 stroke-[1.5]', isActive && 'scale-110')} />
              <span className={cn(
                "text-[9.5px] z-10 tracking-tight font-black transition-all",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </div>
          );

          if (item.action === 'categories') {
            return (
              <button key={item.label} onClick={openCategorySheet} className="outline-none focus:outline-none">
                {content}
              </button>
            );
          }

          if (item.action === 'search') {
            return (
              <button key={item.label} onClick={() => setSearchOpen(true)} className="outline-none focus:outline-none">
                {content}
              </button>
            );
          }

          return (
            <NavLink key={item.path || item.label} to={item.path!} className="outline-none focus:outline-none">
              {content}
            </NavLink>
          );
        })}
      </motion.nav>
    </div>
  );
}
