import { ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'business' | 'pro';
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: `/dashboard/${role}` },
    { icon: MessageSquare, label: 'Requests', href: `/dashboard/${role}/requests` },
    { icon: BarChart3, label: 'Analytics', href: `/dashboard/${role}/analytics` },
    { icon: UserCircle, label: 'Profile', href: `/dashboard/${role}/profile` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex text-secondary font-sans overflow-x-hidden">

      {/* ── SIDEBAR (Desktop) ── */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-100 sticky top-0 h-screen">
        <div className="p-8">
          <NavLink to="/" className="font-black text-xl tracking-tighter">
            Kasaragod<span className="text-primary italic font-black">Hub</span>
          </NavLink>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all",
                isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-gray-50 hover:text-secondary"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-gray-50">
          <div className="bg-secondary/5 rounded-2xl p-5 mb-6">
            <p className="text-[9px] font-black text-secondary uppercase tracking-widest mb-1 opacity-60">Status</p>
            <p className="text-xs font-black text-primary mb-3">Community Free</p>
            <Button size="sm" className="w-full rounded-xl bg-secondary text-[10px] font-black uppercase h-9 hover:bg-black transition-colors">Upgrade</Button>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-red-500 transition-colors font-black text-[11px] uppercase tracking-widest"
          >
            <LogOut className="size-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0">

        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40">
          {/* Mobile Menu Icon / Title */}
          <div className="flex items-center gap-3 lg:hidden">
            <NavLink to="/" className="font-black text-lg tracking-tighter shrink-0">
              K<span className="text-primary italic font-black">H</span>
            </NavLink>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary truncate max-w-[100px]">{role} Desk</span>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-primary transition-colors" />
              <Input placeholder="Search your listings..." className="border-none bg-gray-50 rounded-xl h-11 pl-12 focus-visible:bg-white focus-visible:ring-primary/10 transition-all font-medium" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <button className="size-10 md:size-11 rounded-xl bg-gray-50 flex items-center justify-center text-secondary hover:bg-white border-transparent hover:border-gray-100 border transition-all relative">
              <Bell className="size-5" />
              <div className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-white" />
            </button>

            <div className="hidden md:block h-8 w-px bg-gray-100 mx-2" />

            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black tracking-tight leading-none mb-0.5">Profile</p>
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Settings</p>
              </div>
              <div className="size-9 md:size-11 rounded-xl bg-gradient-to-tr from-secondary to-gray-800 border-2 border-white shadow-md" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-10 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>

      {/* ── MOBILE NAV (Bottom Bar) ── */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-secondary/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-2 flex items-center justify-around z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "size-12 flex items-center justify-center rounded-xl transition-all",
                isActive ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" : "text-white/40 hover:text-white"
              )}
            >
              <item.icon className="size-5" />
            </NavLink>
          );
        })}
        <div className="w-px h-6 bg-white/10" />
        <button className="size-12 flex items-center justify-center rounded-xl text-white/40 hover:text-white active:scale-90 transition-all">
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  );
}
