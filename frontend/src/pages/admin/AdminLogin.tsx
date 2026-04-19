import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      toast.success('Access granted. Welcome to the Sanctum.');
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Unauthorized access. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[400px] relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="size-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl">
            <ShieldAlert className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Kasaragod Hub</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1 uppercase tracking-[0.2em]">Super Admin Portal</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email Identifier</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                <Input
                  type="email"
                  placeholder="admin@kasaragodhub.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-zinc-950 border-zinc-800 text-white pl-12 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">Master Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-zinc-950 border-zinc-800 text-white pl-12 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-red-700 text-white font-black rounded-2xl shadow-lg shadow-primary/20 transition-all gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying Access...
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-[10px] mt-8 font-medium uppercase tracking-widest">
          Authorized Personnel Only • Secure Session • v2.0.4
        </p>
      </div>
    </div>
  );
}
