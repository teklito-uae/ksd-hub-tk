import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Lock, User, Mail, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Mode = 'login' | 'register';

interface Props {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const PHONE_RE = /^[6-9]\d{9}$/;

export function AuthModal({ open, onClose, message }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [registerStep, setRegisterStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const switchMode = (m: Mode) => { setMode(m); setError(''); setForm({ name: '', email: '', phone: '', password: '', role: 'user' }); setRegisterStep(1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'register') {
      if (!form.name.trim()) { setError('Full name is required'); return; }
      if (!PHONE_RE.test(form.phone)) { setError('Enter a valid 10-digit Indian mobile number'); return; }
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role });
      }
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const perks = ['Access business contact info', 'Save & bookmark listings', 'Post reviews & ratings'];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-[1.75rem] border-0 shadow-2xl">

        {/* ── HEADER ── */}
        <div className="relative bg-gradient-to-br from-[#C8102E] via-[#a50d26] to-[#1a1a2e] px-7 pt-8 pb-7 text-white overflow-hidden">
          {/* noise overlay */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
          <button onClick={onClose} className="absolute top-4 right-4 size-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10">
            <X className="size-3.5 text-white" />
          </button>

          {/* Logo */}
          <img src="/assets/logo/kasaragodHub-logo.png" alt="KasaragodHub" className="h-7 w-auto object-contain mb-5 relative z-10" />

          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              {mode === 'login' ? 'Welcome back!' : 'Join the Hub.'}
            </h2>
            <p className="text-white/60 text-[13px] font-medium mt-1.5">
              {mode === 'login'
                ? 'Log in to access contact details & manage listings.'
                : 'Connect with 1,000+ local businesses in Kasaragod.'}
            </p>
            {message && (
              <div className="mt-3 px-3 py-2 bg-white/10 rounded-xl text-[12px] font-semibold text-white/80 border border-white/10">
                🔒 {message}
              </div>
            )}
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="px-7 pt-5 pb-7 bg-white">

          {/* Perks (register mode) */}
          {mode === 'register' && registerStep === 1 && (
            <div className="mb-5 space-y-1.5">
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest text-center">How do you want to use Kasaragod Hub?</p>
              <div className="grid grid-cols-1 gap-3">
                <button type="button" onClick={() => { setForm(f => ({ ...f, role: 'user'})); setRegisterStep(2); }} className="p-3 border border-gray-200 bg-gray-50 hover:bg-primary/5 rounded-xl text-left hover:border-primary/50 transition-all flex flex-col items-start outline-none">
                  <h4 className="font-black text-[13px] text-secondary">🔍 Explore Services</h4>
                  <p className="text-[11px] text-gray-500">I want to find local businesses and professionals</p>
                </button>
                <button type="button" onClick={() => { setForm(f => ({ ...f, role: 'business'})); setRegisterStep(2); }} className="p-3 border border-gray-200 bg-gray-50 hover:bg-primary/5 rounded-xl text-left hover:border-primary/50 transition-all flex flex-col items-start outline-none">
                  <h4 className="font-black text-[13px] text-secondary">🏪 List My Business</h4>
                  <p className="text-[11px] text-gray-500">I own a shop, restaurant, hospital, or local enterprise</p>
                </button>
                <button type="button" onClick={() => { setForm(f => ({ ...f, role: 'pro'})); setRegisterStep(2); }} className="p-3 border border-gray-200 bg-gray-50 hover:bg-primary/5 rounded-xl text-left hover:border-primary/50 transition-all flex flex-col items-start outline-none">
                  <h4 className="font-black text-[13px] text-secondary">💼 List as Expert</h4>
                  <p className="text-[11px] text-gray-500">I am a freelancer, tradesperson, or professional</p>
                </button>
              </div>

              <p className="text-center text-[12px] text-gray-400 mt-6">
                Already have an account? 
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-primary font-black hover:underline ml-1"
                >
                  Log in
                </button>
              </p>
            </div>
          )}

          {(mode === 'login' || (mode === 'register' && registerStep === 2)) && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Full Name *"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="h-11 rounded-xl pl-10 border-gray-200 focus:border-primary text-[13px]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] select-none">🇮🇳</span>
                  <span className="absolute left-9 top-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-400 select-none">+91</span>
                  <Input
                    placeholder="10-digit mobile number *"
                    required
                    type="tel"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                    className="h-11 rounded-xl pl-[4.5rem] border-gray-200 focus:border-primary text-[13px]"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Email address"
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="h-11 rounded-xl pl-10 border-gray-200 focus:border-primary text-[13px]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Password"
                type="password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="h-11 rounded-xl pl-10 border-gray-200 focus:border-primary text-[13px]"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red-500 font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                ⚠️ {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary hover:bg-red-700 font-black text-[14px] shadow-lg shadow-primary/25 mt-1 gap-2"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
              {!loading && <ArrowRight className="size-4" />}
            </Button>
          </form>
          )}

          {/* Mode switch */}
          {(mode === 'login' || (mode === 'register' && registerStep === 2)) && (
          <p className="text-center text-[12px] text-gray-400 mt-4">
            {mode === 'login' ? "New to KasaragodHub? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary font-black hover:underline"
            >
              {mode === 'login' ? 'Create free account →' : 'Log in'}
            </button>
          </p>
          )}

          <p className="text-center text-[10px] text-gray-300 mt-3">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
