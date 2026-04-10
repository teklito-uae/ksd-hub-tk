import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Star,
  Plus,
  ArrowRight,
  MousePointerClick,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function BusinessDashboard() {
  const stats = [
    { label: 'Profile Views', value: '1,284', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Lead Clicks', value: '342', icon: MousePointerClick, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Total Leads', value: '86', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  const recentRequests = [
    { id: '1', user: 'Rahman K.', type: 'Inquiry', product: 'Traditional Interior Design', time: '2 hrs ago', status: 'new' },
    { id: '2', user: 'Sara James', type: 'Quote', product: 'Premium Wedding Catering', time: '5 hrs ago', status: 'viewed' },
    { id: '3', user: 'Anil Kumar', type: 'Booking', product: 'Executive Suite - 2 Nights', time: '1 day ago', status: 'responded' },
  ];

  return (
    <DashboardLayout role="business">
      <div className="space-y-10">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-3xl font-black text-secondary tracking-tight">Enterprise Overview</h1>
              <p className="text-sm font-medium text-muted-foreground italic">"Leading with excellence in Kasaragod."</p>
           </div>
           <div className="flex gap-3">
              <Button className="rounded-2xl h-12 px-6 font-black text-xs uppercase tracking-widest bg-secondary hover:bg-black transition-all shadow-xl shadow-black/5">
                <Plus className="size-4 mr-2" /> New Service
              </Button>
           </div>
        </div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat) => (
             <Card key={stat.label} className="p-6 rounded-2xl border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className={cn("size-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.bg)}>
                   <stat.icon className={cn("size-6", stat.color)} />
                </div>
                <div className="space-y-1 relative z-10">
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-2xl font-black text-secondary tracking-tight">{stat.value}</h3>
                </div>
                {/* Visual Accent */}
                <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <stat.icon className="size-24 text-secondary rotate-12" />
                </div>
             </Card>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           {/* ── RECENT INBOX ── */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-black text-secondary tracking-tight">Recent Leads</h2>
                 <Button variant="ghost" className="text-xs font-black text-primary uppercase tracking-widest h-8">View All <ArrowRight className="size-3 ml-2" /></Button>
              </div>

              <div className="space-y-3">
                 {recentRequests.map((req) => (
                   <div key={req.id} className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center font-black text-secondary text-base shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                         {req.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-secondary text-sm tracking-tight truncate">{req.user}</h4>
                            {req.status === 'new' && <Badge className="bg-primary text-white text-[8px] font-black uppercase h-4 px-1.5 rounded-sm">NEW</Badge>}
                         </div>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{req.type} for <span className="text-primary">{req.product}</span></p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                         <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase whitespace-nowrap">
                            <Clock className="size-3" /> {req.time}
                         </div>
                         <Button size="sm" className="rounded-xl h-9 bg-secondary text-[10px] font-black uppercase px-4">View Details</Button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* ── QUICK STATS ── */}
           <div className="space-y-6">
              <h2 className="text-xl font-black text-secondary tracking-tight">Traffic Growth</h2>
              <Card className="rounded-2xl bg-secondary p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                       <TrendingUp className="size-5 text-primary" />
                       <span className="text-xs font-black uppercase tracking-widest text-white/60">+12.4%</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-8">Weekly Engagement</h3>
                    
                    <div className="flex items-end gap-2 h-32 mb-6">
                       {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                         <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group transition-all hover:bg-primary">
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 rounded-t-lg transition-opacity" style={{ height: `${h}%` }} />
                            <div className="w-full bg-white/20 rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                         </div>
                       ))}
                    </div>

                    <div className="flex justify-between text-[8px] font-black text-white/40 uppercase tracking-widest px-1">
                       <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                 </div>
              </Card>

              <Card className="rounded-2xl border-primary/20 bg-primary/5 p-6 border-2 border-dashed flex flex-col items-center text-center">
                 <div className="size-12 bg-primary rounded-xl flex items-center justify-center mb-4 text-white">
                    <MapPin className="size-6" />
                 </div>
                 <h4 className="text-sm font-black text-secondary tracking-tight mb-2">Reach Local Clients</h4>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-4 tracking-wider">Expand your listing to Bevinje areas for +20% visibility.</p>
                 <Button variant="link" className="text-primary font-black text-[10px] uppercase tracking-widest p-0 h-auto">Optimize Location</Button>
              </Card>
           </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
