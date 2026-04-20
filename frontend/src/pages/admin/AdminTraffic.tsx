import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import {
  Activity,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  Globe,
  MapPin,
  TrendingUp
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function AdminTraffic() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data;
    },
    refetchInterval: 5000, // 5-second pulse
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="size-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 animate-pulse">Establishing Telemetry Link...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Live Pulse</h1>
          <div className="flex items-center gap-2">
            <div className={cn(
              "size-2 rounded-full animate-pulse shadow-[0_0_12px]",
              analytics?.live_pulse?.status === 'active' ? "bg-emerald-500 shadow-emerald-500/50" : "bg-zinc-700"
            )} />
            <p className="uppercase tracking-[0.2em] text-[10px] font-black text-zinc-500">
              {analytics?.live_pulse?.current} Synchronized Identities Detected
            </p>
          </div>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl px-5 py-3 flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Global Status</p>
            <p className="text-xs font-bold text-white uppercase">{analytics?.live_pulse?.status}</p>
          </div>
          <Globe className="size-5 text-zinc-700" />
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Unique Visitors" 
          value={analytics?.metrics?.visitors} 
          change="+12.5%" 
          icon={Users} 
          color="text-blue-400"
        />
        <MetricCard 
          label="Total Pageviews" 
          value={analytics?.metrics?.pageviews} 
          change="+23.9%" 
          icon={Eye} 
          color="text-emerald-400"
        />
        <MetricCard 
          label="Bounce Rate" 
          value={`${analytics?.metrics?.bounce_rate}%`} 
          change="-4.2%" 
          icon={TrendingUp} 
          color="text-amber-400"
          isNegative
        />
        <MetricCard 
          label="Avg. Duration" 
          value={analytics?.metrics?.avg_duration} 
          change="+18s" 
          icon={Clock} 
          color="text-purple-400"
        />
      </div>

      {/* Main Pulse Chart */}
      <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-black tracking-tight text-white">Traffic Trajectory</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Real-time Visitor Distribution (24h Window)</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Telemetry</span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics?.chart}>
              <defs>
                <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8102E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C8102E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#3f3f46" 
                fontSize={10} 
                fontWeight="bold" 
                tickLine={false} 
                axisLine={false}
                interval={2}
              />
              <YAxis 
                stroke="#3f3f46" 
                fontSize={10} 
                fontWeight="bold" 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px', fontSize: '10px', fontWeight: 'bold' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="#C8102E" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#pulseGradient)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-8">
          <h3 className="text-lg font-black tracking-tight text-white mb-8">Node Distribution</h3>
          <div className="space-y-6">
            {analytics?.top_pages?.map((page: any, i: number) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-zinc-700 w-4">{i + 1}</span>
                  <div>
                    <p className="text-[13px] font-bold text-zinc-300 group-hover:text-primary transition-colors cursor-pointer">{page.path}</p>
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mt-0.5">Active Path</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(page.views / analytics.metrics.pageviews) * 100}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-black text-white tabular-nums">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Breakdown */}
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-8">
          <h3 className="text-lg font-black tracking-tight text-white mb-8">Segment Intelligence</h3>
          <div className="grid grid-cols-2 gap-6">
            {analytics?.user_breakdown?.map((segment: any, i: number) => (
              <div key={i} className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-xl hover:border-primary/30 transition-all group">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{segment.user_type}</p>
                <p className="text-3xl font-black text-white tabular-nums">{segment.count}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-600">Total Reach</span>
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, icon: Icon, color, isNegative }: any) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-6 rounded-2xl group hover:border-zinc-700 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("size-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg", color)}>
          <Icon className="size-5" />
        </div>
        <div className={cn(
          "text-[10px] font-black px-2 py-1 rounded-lg",
          isNegative ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
        )}>
          {change}
        </div>
      </div>
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-3xl font-black tabular-nums tracking-tighter text-white">{value}</p>
    </div>
  );
}
