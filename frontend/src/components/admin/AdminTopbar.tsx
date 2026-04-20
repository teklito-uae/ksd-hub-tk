import { useAuth } from '@/context/AuthContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  Search,
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface AdminTopbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function AdminTopbar({ theme, setTheme }: AdminTopbarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="h-20 bg-[var(--admin-bg)]/80 backdrop-blur-xl border-b border-[var(--admin-border)] sticky top-0 z-40 flex items-center justify-between px-8 transition-colors duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--admin-muted)]">
        <Link to="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
        {pathnames.slice(1).map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
          const isLast = index === pathnames.slice(1).length - 1;
          return (
            <div key={name} className="flex items-center gap-2">
              <ChevronRight className="size-3 text-[var(--admin-border)]" />
              {isLast ? (
                <span className="text-[var(--admin-text)]">{name}</span>
              ) : (
                <Link to={routeTo} className="hover:text-primary transition-colors">{name}</Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[var(--admin-muted)] group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence..." 
            className="h-9 w-64 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl pl-10 pr-4 text-[11px] font-bold focus:outline-none focus:border-primary/50 transition-all text-[var(--admin-text)] placeholder:text-zinc-600"
          />
        </div>

        <div className="h-6 w-px bg-[var(--admin-border)] mx-2" />

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="size-10 rounded-xl bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-primary transition-all active:scale-95"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="size-10 rounded-xl bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-primary relative transition-all active:scale-95"
        >
          <Bell className="size-4" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary border-2 border-[var(--admin-bg)]" />
        </Button>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black text-[var(--admin-text)] leading-none uppercase tracking-tight">{user?.name}</p>
            <p className="text-[9px] text-[var(--admin-muted)] font-bold uppercase tracking-widest mt-1">Master Access</p>
          </div>
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-lg shadow-primary/10 border border-white/10 overflow-hidden">
            <User className="size-5 text-white/80" />
          </div>
        </div>
      </div>
    </header>
  );
}
