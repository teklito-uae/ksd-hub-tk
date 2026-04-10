import { Home, Search, LayoutGrid, Briefcase, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

const navItems = [
  { icon: Home,       label: 'Home',       path: '/',          action: null },
  { icon: LayoutGrid, label: 'Categories', path: null,         action: 'categories' },
  { icon: Search,     label: 'Search',     path: null,         action: 'search' },
  { icon: Briefcase,  label: 'Masters',    path: '/experts',   action: null },
  {icon: User, label: 'Account', path: '/login', action: null},
];

import { useScrollDirection } from '@/hooks/useScrollDirection';

export function BottomNav() {
  const { openCategorySheet, setSearchOpen } = useUIStore();
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const isVisible = scrollDirection !== 'down';

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 bg-secondary/95 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl shadow-black/40"
      >
        {navItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path
            : false;

          const content = (
            <div
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all min-w-[52px]',
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white/8 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <item.icon className={cn('size-5 z-10 transition-transform', isActive && 'scale-110')} />
              <span className="text-[9px] font-bold z-10 tracking-wide">{item.label}</span>
            </div>
          );

          if (item.action === 'categories') {
            return (
              <button key={item.label} onClick={openCategorySheet} className="outline-none">
                {content}
              </button>
            );
          }

          if (item.action === 'search') {
            return (
              <button key={item.label} onClick={() => setSearchOpen(true)} className="outline-none">
                {content}
              </button>
            );
          }

          return (
            <NavLink key={item.path} to={item.path!} className="outline-none">
              {content}
            </NavLink>
          );
        })}
      </motion.nav>
    </div>
  );
}
