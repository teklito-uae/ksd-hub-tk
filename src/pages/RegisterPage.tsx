import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Lock,
  Mail,
  CheckCircle2,
  Undo2,
  HardHat,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Role = 'pro' | 'business' | null;

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration successful! Welcome to the Hub.');
    if (role === 'pro') navigate('/dashboard/pro');
    else navigate('/dashboard/business');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* ── LEFT SIDE: PROGRESS & VISUAL ── */}
      <div className="hidden md:flex md:w-[40%] bg-secondary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-sm">
           <Link to="/" className="inline-block mb-16">
              <h1 className="text-2xl font-black text-white tracking-tighter">Kasaragod<span className="text-primary italic">Hub</span></h1>
           </Link>

           <div className="space-y-12">
              <div className="flex gap-4">
                 <div className={cn("size-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all", step >= 1 ? "bg-primary text-white" : "bg-white/10 text-white/40")}>1</div>
                 <div>
                    <h3 className={cn("font-black text-xs uppercase tracking-widest transition-colors", step >= 1 ? "text-white" : "text-white/40")}>Selection</h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Choose your path</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className={cn("size-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all", step >= 2 ? "bg-primary text-white" : "bg-white/10 text-white/40")}>2</div>
                 <div>
                    <h3 className={cn("font-black text-xs uppercase tracking-widest transition-colors", step >= 2 ? "text-white" : "text-white/40")}>Information</h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Basic identification</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className={cn("size-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all", step >= 3 ? "bg-primary text-white" : "bg-white/10 text-white/40")}>3</div>
                 <div>
                    <h3 className={cn("font-black text-xs uppercase tracking-widest transition-colors", step >= 3 ? "text-white" : "text-white/40")}>Launch</h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Enter your dashboard</p>
                 </div>
              </div>
           </div>

           <div className="mt-24 pt-12 border-t border-white/5">
              <p className="text-white/40 text-xs leading-relaxed font-medium">
                "Kasaragod's ecosystem for businesses and individuals to thrive together."
              </p>
           </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: DYNAMIC FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 lg:p-20 pt-10 md:pt-12 overflow-y-auto pb-24 md:pb-12 mt-12 md:mt-0">
        <div className="w-full max-w-xl">
          
          <AnimatePresence mode="wait">
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <header className="mb-8 text-center md:text-left">
                  <h1 className="text-3xl font-black text-secondary tracking-tight mb-2">Join the Hub</h1>
                  <p className="text-sm font-medium text-muted-foreground">First, tell us who you are.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                   <button 
                     onClick={() => { setRole('pro'); setStep(2); }}
                     className={cn(
                       "group p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-300 active:scale-95",
                       role === 'pro' ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-gray-100 hover:border-primary/50 hover:bg-gray-50/50"
                     )}
                   >
                      <div className="size-12 md:size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                         <HardHat className="size-6 md:size-8 text-primary" />
                      </div>
                      <h3 className="text-base md:text-lg font-black text-secondary tracking-tight mb-1 md:mb-2 uppercase">I am a Professional</h3>
                      <p className="text-[11px] md:text-xs text-muted-foreground font-medium leading-relaxed">For masters, freelancers, and skilled individuals offering expertise.</p>
                   </button>

                   <button 
                     onClick={() => { setRole('business'); setStep(2); }}
                     className={cn(
                       "group p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-300 active:scale-95",
                       role === 'business' ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-gray-100 hover:border-primary/50 hover:bg-gray-50/50"
                     )}
                   >
                      <div className="size-12 md:size-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                         <ShoppingBag className="size-6 md:size-8 text-secondary" />
                      </div>
                      <h3 className="text-base md:text-lg font-black text-secondary tracking-tight mb-1 md:mb-2 uppercase">I am a Business</h3>
                      <p className="text-[11px] md:text-xs text-muted-foreground font-medium leading-relaxed">For shops, showrooms, resorts, and organized commercial entities.</p>
                   </button>
                </div>

                <div className="text-center md:text-left">
                   <p className="text-sm font-medium text-muted-foreground">
                     Already have an account? <Link to="/login" className="text-primary font-black ml-1">Log In</Link>
                   </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: MINIMAL INFO */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center md:justify-start gap-2 md:gap-4 mb-8">
                   <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full h-8 px-2 text-muted-foreground hover:text-primary border border-transparent md:hover:border-gray-100 bg-gray-50 md:bg-transparent">
                      <Undo2 className="size-4 mr-2" /> Change Role
                   </Button>
                   <div className="hidden md:block h-4 w-px bg-gray-200" />
                   <Badge className="bg-primary/10 text-primary border-none shadow-none font-black uppercase tracking-widest text-[9px] px-2 py-0.5">
                     Registering as {role}
                   </Badge>
                </div>

                <header className="mb-8 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight mb-2">Identity Details</h1>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Fast setup. You can add images & bio later.</p>
                </header>

                <form onSubmit={handleRegister} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">{role === 'pro' ? 'Full Name' : 'Business Name'}</Label>
                        <Input required placeholder={role === 'pro' ? "Your name" : "Official business name"} className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">WhatsApp Number</Label>
                        <Input required type="tel" placeholder="+91 00000 00000" className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">E-mail</Label>
                        <Input required type="email" placeholder="hello@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Create Password</Label>
                        <div className="relative">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                           <Input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 focus-visible:bg-white focus-visible:ring-primary/20 transition-all font-medium" />
                        </div>
                      </div>
                   </div>

                   <Button type="submit" className="w-full h-14 rounded-2xl bg-secondary hover:bg-black font-black uppercase tracking-widest shadow-xl shadow-black/5 active:scale-[0.98] transition-all">
                      Create My Account <CheckCircle2 className="ml-2 size-4" />
                   </Button>

                   <p className="text-[11px] text-center text-muted-foreground font-medium px-4 leading-relaxed">
                      By clicking create account, you agree to our <Link to="#" className="text-secondary font-bold underline">Terms of Service</Link> and our local community <Link to="#" className="text-secondary font-bold underline">Partner Guidelines</Link>.
                   </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
