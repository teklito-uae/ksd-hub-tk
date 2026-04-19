import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '@/types';
import api from '@/lib/axios';

export function HeaderMegaMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleMouseEnter = (id: string) => {
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <div className="hidden md:flex items-center gap-6 justify-center mt-2 relative">
      {categories.slice(0, 6).map((cat) => (
        <div
          key={cat.id}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(cat.id)}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink
            to={`/directory?category=${cat.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary pb-2 border-b-2 border-transparent hover:border-primary transition-colors"
          >
            {cat.name}
            <ChevronDown className={`size-3 transition-transform duration-200 ${activeMenu === cat.id ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
          </NavLink>

          {/* Megamenu Dropdown */}
          <AnimatePresence>
            {activeMenu === cat.id && cat.children && cat.children.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 pt-2 w-64 z-50"
              >
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 grid gap-1 overflow-hidden">
                  {cat.children.map((child) => {
                    const Icon = (Icons as any)[child.icon] || Icons.Circle;
                    return (
                      <NavLink
                        key={child.id}
                        to={`/directory?category=${child.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-secondary hover:text-primary transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="size-8 rounded-md bg-gray-50/50 flex items-center justify-center text-muted-foreground group-hover/link:text-primary">
                          <Icon className="size-4" />
                        </div>
                        <span className="text-sm font-medium">{child.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
