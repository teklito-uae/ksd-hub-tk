import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import {
  Users,
  Store,
  Briefcase,
  FileText,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ExternalLink
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
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data;
    },
  });

  const { data: analytics } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data;
    },
    refetchInterval: 10000,
  });

  const chartData = analytics?.chart || [];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Intelligence</h1>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <p className="uppercase tracking-[0.2em] text-[10px] font-black text-zinc-500">Global Registry Synchronized</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/admin/traffic"
            className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-14 px-6 flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="flex flex-col items-end">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Live Pulse</p>
              <p className="text-lg font-black text-white tabular-nums">{analytics?.live_pulse?.current || 0}</p>
            </div>
            <div className={cn(
              "size-3 rounded-full animate-pulse shadow-[0_0_10px]",
              (analytics?.live_pulse?.current || 0) > 0 ? "bg-emerald-500 shadow-emerald-500/50" : "bg-zinc-700"
            )} />
          </Link>
          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-14 px-6 flex items-center gap-3">
            <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-300">System Live</span>
          </div>
        </div>
      </header>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Identity Registry" 
          value={stats?.users?.total} 
          subValue={`${stats?.users?.new_24h} new in 24h`}
          icon={Users}
          color="text-blue-400"
        />
        <StatCard 
          label="Vetted Businesses" 
          value={stats?.listings?.businesses?.approved} 
          subValue={`${stats?.listings?.businesses?.pending} awaiting review`}
          icon={Store}
          color="text-emerald-400"
        />
        <StatCard 
          label="Active Professionals" 
          value={stats?.listings?.professionals?.approved} 
          subValue={`${stats?.listings?.professionals?.pending} awaiting review`}
          icon={Briefcase}
          color="text-purple-400"
        />
        <StatCard 
          label="Knowledge Nodes" 
          value={stats?.content?.blog_posts} 
          subValue="Published insights"
          icon={FileText}
          color="text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black tracking-tight text-white">Platform Velocity</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Visitor distribution over last 24 hours</p>
            </div>
            <TrendingUp className="size-5 text-zinc-700" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8102E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C8102E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="time" stroke="#3f3f46" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#3f3f46" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#C8102E" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black tracking-tight text-white">Registry Logs</h3>
            <Activity className="size-5 text-zinc-700" />
          </div>
          <div className="space-y-6">
            {stats?.recent_activity?.map((activity: any) => (
              <div key={activity.id} className="flex gap-4 group cursor-pointer">
                <div className="mt-1 size-2 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors shadow-[0_0_8px_transparent] group-hover:shadow-primary/50" />
                <div>
                  <p className="text-[13px] font-bold text-zinc-300 tracking-tight leading-snug group-hover:text-white transition-colors">
                    {activity.message}
                  </p>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1.5 flex items-center gap-2">
                    <Clock className="size-2.5" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all active:scale-95">
            View All Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subValue, icon: Icon, color }: any) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-6 rounded-2xl group hover:border-zinc-700 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("size-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg", color)}>
          <Icon className="size-5" />
        </div>
        <ArrowUpRight className="size-4 text-zinc-700 group-hover:text-primary transition-colors" />
      </div>
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-black tabular-nums tracking-tighter text-white">{value ?? 0}</p>
      </div>
      <p className="text-[11px] font-bold text-zinc-600 mt-2 flex items-center gap-1.5">
        <div className="size-1 rounded-full bg-emerald-500" /> {subValue}
      </p>
    </div>
  );
}
