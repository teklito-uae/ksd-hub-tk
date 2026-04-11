import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { 
  User, 
  MessageCircle, 
  Star, 
  Calendar, 
  MapPin, 
  Share2,
  CheckCircle2,
  Clock,
  Briefcase,
  ExternalLink,
  Zap,
  Plus,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function ProDashboard() {
  const stats = [
    { label: 'Profile Clicks', value: '452', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'WA Direct', value: '128', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Verified Rating', value: '4.9', icon: Star, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Jobs Completed', value: '34', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const ongoingJobs = [
    { id: '1', title: 'Modern Villa Wiring', client: 'Ahmed Ibrahim', timeline: 'Due in 2 days', status: 'active' },
    { id: '2', title: 'Bakery Logo Design', client: 'Crust & Crumbs', timeline: 'Reviewing', status: 'review' },
    { id: '3', title: 'Home Automation', client: 'Private Client', timeline: 'Starts Tomorrow', status: 'pending' },
  ];

  return (
    <DashboardLayout role="pro">
      <div className="space-y-8 md:space-y-10">
        
        {/* ── MINIMAL PROFESSIONAL HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center gap-5 md:gap-6 relative z-10">
              <div className="size-16 md:size-20 rounded-2xl bg-secondary overflow-hidden border-2 border-white shadow-xl relative shrink-0">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Pro" />
                  <div className="absolute bottom-1 right-1 size-4 bg-green-500 border-2 border-white rounded-full" title="Available Now" />
              </div>
              <div className="space-y-0.5 md:space-y-1">
                 <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-black text-secondary tracking-tight">Kiran Kumar</h1>
                    <Badge className="bg-blue-500 text-white border-none text-[7px] md:text-[8px] font-black px-1.5 h-3.5 md:h-4 tracking-widest uppercase rounded-sm">Verified</Badge>
                 </div>
                 <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-widest">Electrical Master</p>
                 <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    <MapPin className="size-3" /> Kasaragod Town
                 </div>
              </div>
           </div>
           
           <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
              <Button variant="outline" className="flex-1 sm:flex-none rounded-xl h-11 px-4 font-black text-[10px] uppercase tracking-widest border-gray-100 gap-2">
                <Settings className="size-3.5" /> Edit Profile
              </Button>
              <Link to="/expert/kiran-kumar" className="flex-1 sm:flex-none">
                <Button className="w-full rounded-xl h-11 px-6 font-black text-[10px] uppercase tracking-widest bg-secondary text-white hover:bg-black transition-all shadow-lg gap-2">
                  <ExternalLink className="size-3.5" /> Public Link
                </Button>
              </Link>
           </div>
           
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
        </div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
           {stats.map((stat) => (
             <Card key={stat.label} className="p-4 md:p-6 rounded-2xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group">
                <div className={cn("size-10 md:size-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105", stat.bg)}>
                   <stat.icon className={cn("size-4 md:size-5", stat.color)} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-xl md:text-2xl font-black text-secondary tracking-tight">{stat.value}</h3>
                </div>
             </Card>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
           
           {/* ── ACTIVE TASKS / JOB LOG ── */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-lg md:text-xl font-black text-secondary tracking-tight uppercase tracking-widest text-[13px] md:text-base">Current Assignments</h2>
                 <Button className="rounded-xl h-9 bg-primary/10 text-primary hover:bg-primary/20 font-black text-[9px] uppercase tracking-widest px-4 shadow-none">
                    <Plus className="size-3.5 mr-1.5" /> Add Log
                 </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {ongoingJobs.map((job) => (
                   <Card key={job.id} className="p-5 md:p-6 rounded-2xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-4">
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm",
                           job.status === 'active' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                         )}>
                           {job.status}
                         </span>
                         <Clock className="size-3.5 text-muted-foreground opacity-40" />
                      </div>
                      <h4 className="font-black text-secondary tracking-tight text-sm md:text-base mb-1 truncate">{job.title}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4 tracking-wider truncate">Client: {job.client}</p>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                         <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-widest">
                            <Calendar className="size-3.5 text-primary" /> {job.timeline}
                         </div>
                         <Button variant="ghost" className="size-8 p-0 hover:bg-gray-100 text-muted-foreground group-hover:text-secondary">
                            <ArrowRight className="size-4" />
                         </Button>
                      </div>
                   </Card>
                 ))}
                 <button className="h-full min-h-[140px] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-50 hover:border-primary/40 transition-all gap-2 group p-6">
                    <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                       <Plus className="size-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Register New Project</span>
                 </button>
              </div>
           </div>

           {/* ── QUICK NETWORK ── */}
           <div className="space-y-6">
              <h2 className="text-xl font-black text-secondary tracking-tight">Hub Presence</h2>
              <div className="space-y-4">
                 <div className="p-6 bg-secondary rounded-2xl text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col items-center text-center">
                       <div className="size-12 rounded-xl bg-primary flex items-center justify-center mb-4 rotate-3 shadow-lg">
                          <Share2 className="size-6 text-white" />
                       </div>
                       <h4 className="text-sm font-black tracking-tight mb-2 uppercase tracking-widest text-[13px]">Grow Your Reach</h4>
                       <p className="text-[10px] text-white/50 font-bold uppercase leading-relaxed mb-4 tracking-wide">Share your digital portfolio to WhatsApp groups to gain 2x more visibility.</p>
                       <Button className="w-full rounded-xl h-10 bg-white text-secondary hover:bg-gray-100 font-black uppercase text-[9px] tracking-widest">Copy Profile Link</Button>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 to-transparent opacity-30 pointer-events-none" />
                 </div>
                 
                 <Card className="p-6 rounded-2xl border-gray-100 bg-white shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Star className="size-5" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-secondary tracking-tight leading-none mb-1">Verify Skills</p>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Get Hub Badge</p>
                       </div>
                    </div>
                    <ArrowRight className="size-4 text-gray-300 group-hover:text-primary transition-all" />
                 </Card>
              </div>
           </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
