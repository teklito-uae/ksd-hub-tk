import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Command Center</h1>
            <p className="text-zinc-500 mt-1 uppercase tracking-widest text-xs font-bold">God Mode Activated</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-[10px] text-zinc-500 font-medium">SUPER ADMIN</p>
            </div>
            <div className="size-10 rounded-full bg-primary flex items-center justify-center font-black text-xs">
              SA
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Live Users</p>
            <p className="text-4xl font-black">--</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Pending Listings</p>
            <p className="text-4xl font-black">--</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Inquiries (24h)</p>
            <p className="text-4xl font-black">--</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-600 font-medium text-sm">Dashboard data currently being integrated with Laravel API...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
