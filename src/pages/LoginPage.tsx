import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Globe,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Welcome back to Kasaragod Hub!');
    // Simulation: redirect to a generic dashboard or last role
    navigate('/dashboard/business'); 
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* ── LEFT SIDE: VISUAL ── */}
      <div className="hidden md:flex md:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-lg text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="size-20 bg-primary/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl">
                 <Sparkles className="size-10 text-primary" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Unlock the <span className="text-primary italic">Best</span> of Kasaragod.
              </h2>
            </motion.div>
            
            <p className="text-lg text-white/60 font-medium leading-relaxed mb-10">
              Manage your business, connect with masters, and grow your local influence from one unified dashboard.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-left">
                  <div className="text-primary font-black text-xl mb-1">5k+</div>
                  <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Local Businesses</div>
               </div>
               <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-left">
                  <div className="text-primary font-black text-xl mb-1">200+</div>
                  <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Verified Masters</div>
               </div>
            </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 lg:p-20 pb-20 md:pb-12 mt-14 md:mt-0">
        <div className="w-full max-w-md">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black text-secondary tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sm font-medium text-muted-foreground">Please enter your details to sign in.</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">E-mail Address</Label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                   <Input 
                     required
                     type="email"
                     placeholder="name@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" 
                   />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-secondary">Password</Label>
                   <Link to="#" className="text-[10px] font-black uppercase text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                   <Input 
                     required
                     type="password"
                     placeholder="••••••••"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" 
                   />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl bg-secondary hover:bg-black font-black uppercase tracking-widest shadow-xl shadow-black/5 active:scale-[0.98] transition-all">
              Sign In <ArrowRight className="ml-2 size-4" />
            </Button>

            <div className="relative py-4 flex items-center gap-4">
               <div className="flex-1 h-px bg-gray-100" />
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Or continue with</span>
               <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Button type="button" variant="outline" className="h-14 rounded-2xl border-gray-100 font-bold text-xs gap-3 group">
                  <Globe className="size-4 group-hover:text-primary transition-colors" /> Google
               </Button>
               <Button type="button" variant="outline" className="h-14 rounded-2xl border-gray-100 font-bold text-xs gap-3 group">
                  <Phone className="size-4 group-hover:text-green-500 transition-colors" /> Phone
               </Button>
            </div>
          </form>

          <footer className="mt-12 text-center text-sm font-medium text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary font-black hover:underline ml-1">Join the Hub</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
