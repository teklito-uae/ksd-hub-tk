import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ShieldCheck,
  ChevronLeft,
  Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
  { icon: Activity, label: 'Traffic & Pulse', path: '/admin/traffic' },
  { icon: Users, label: 'Registrations', path: '/admin/users' },
  { icon: Store, label: 'Businesses', path: '/admin/businesses' },
  { icon: Briefcase, label: 'Professionals', path: '/admin/pros' },
  { icon: FileText, label: 'Blog Engine', path: '/admin/blog' },
  { icon: MessageSquare, label: 'Leads & Inquiries', path: '/admin/leads' },
  { icon: Settings, label: 'System Settings', path: '/admin/settings' },
];

interface AdminSidebarProps {
  theme: 'light' | 'dark';
}

export function AdminSidebar({ theme }: AdminSidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <aside className="w-72 bg-[var(--admin-card)] border-r border-[var(--admin-border)] flex flex-col h-screen sticky top-0 overflow-hidden shadow-2xl transition-colors duration-500">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-primary to-red-800 flex items-center justify-center shadow-xl shadow-primary/20 ring-1 ring-white/10">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-[var(--admin-text)] font-black tracking-tighter text-xl uppercase leading-none">KSD HUB</h2>
            <p className="text-[10px] text-[var(--admin-muted)] font-black tracking-[0.2em] uppercase mt-1">Superuser</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-primary/5 text-primary shadow-sm" 
                  : "text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-primary/5"
              )}
            >
              <item.icon className={cn(
                "size-[18px] transition-all duration-300 group-hover:scale-110",
                isActive ? "text-primary filter drop-shadow-[0_0_8px_rgba(200,16,46,0.3)]" : "text-[var(--admin-muted)]"
              )} />
              <span className={cn(
                "text-[13px] font-bold tracking-tight transition-colors",
                isActive ? "text-[var(--admin-text)]" : "text-[var(--admin-muted)]"
              )}>{item.label}</span>
              
              {isActive && (
                <>
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(200,16,46,1)]" />
                  <div className="absolute right-4 size-1.5 rounded-full bg-primary animate-pulse" />
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-[var(--admin-border)]">
        <div className="bg-[var(--admin-bg)]/50 rounded-2xl p-5 mb-4 border border-[var(--admin-border)] backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="size-10 rounded-xl bg-[var(--admin-card)] border border-[var(--admin-border)] flex items-center justify-center text-[11px] font-black text-[var(--admin-muted)] group-hover:border-primary/50 transition-colors">
              {user?.name?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black text-[var(--admin-text)] truncate tracking-tight leading-none">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <p className="text-[10px] text-[var(--admin-muted)] font-bold uppercase tracking-widest leading-none">Operational</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[var(--admin-muted)] hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 font-black text-[11px] uppercase tracking-widest group"
        >
          <LogOut className="size-4 group-hover:-translate-x-1 transition-transform" />
          De-Authenticate
        </button>
      </div>
    </aside>
  );
}
