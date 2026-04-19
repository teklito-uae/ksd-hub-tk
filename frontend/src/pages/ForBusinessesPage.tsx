import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle2, TrendingUp, MessageSquare, Shield, Globe, Zap, Star,
  BarChart3, MapPin, Phone, Users, ArrowRight, Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats, testimonials } from '@/lib/dummy-data';
import { useUIStore } from '@/store/useUIStore';

const benefits = [
  {
    icon: Globe,
    title: 'Get Found Online',
    desc: 'Appear in local searches and category pages instantly. Customers looking for your services find you first.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MessageSquare,
    title: 'Direct WhatsApp Leads',
    desc: 'Customers contact you directly via WhatsApp and phone — no middlemen, no commissions, no delays.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    desc: 'A verification badge on your profile builds immediate trust with potential customers.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: BarChart3,
    title: 'Profile Analytics',
    desc: 'Track how many people viewed your profile, clicked your number, and sent inquiries each week.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: MapPin,
    title: 'Location Discovery',
    desc: 'Show up when locals search for services near them in Kanhangad, Bekal, Kasaragod town, and beyond.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Zap,
    title: '2-Minute Setup',
    desc: 'No technical knowledge needed. Fill a simple form and your business is live within minutes.',
    color: 'bg-orange-50 text-orange-600',
  },
];

const steps = [
  { num: '01', title: 'Create Your Profile', desc: 'Fill in your business name, category, contact details, photos, and a short description.' },
  { num: '02', title: 'Get Verified', desc: 'Our team quickly reviews and verifies your listing to add a trust badge to your profile.' },
  { num: '03', title: 'Start Receiving Leads', desc: 'Customers discover your business and reach out directly via WhatsApp or phone.' },
];

const planFeatures = [
  'Business profile page',
  'WhatsApp & phone CTA buttons',
  'Category & location listing',
  'Customer inquiry form',
  'Verified badge (post review)',
  'Weekly visitor analytics',
  'Photo gallery (up to 10 images)',
  'Priority support',
];

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function ForBusinessesPage() {
  const { setAuthModalOpen } = useUIStore();

  return (
    <div className="overflow-hidden pb-20">

      {/* ── HERO ── */}
      <section className="relative bg-secondary overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=600&fit=crop&q=80"
            alt="Business growth"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 size-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center text-white">
          <motion.div {...fadeIn}>
            <Badge className="mb-5 bg-primary/20 text-primary border-primary/30 px-3 py-1 text-xs font-bold">
              🚀 Free for All Kasaragod Businesses
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-[1.15] tracking-tight">
              Grow Your Business with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Kasaragod Hub
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 1,200+ local businesses already connecting with high-intent customers across Kasaragod district — at zero cost, forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setAuthModalOpen(true)}
                size="lg"
                className="bg-primary hover:bg-orange-600 rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/30 transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Register for Free <ArrowRight className="ml-2 size-4" />
              </Button>
              <Link to="/business/zero-gravity-studio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-8 w-full sm:w-auto"
                >
                  See Sample Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="container mx-auto px-4 max-w-4xl -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center"
            >
              <div className="text-2xl font-black text-secondary">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section className="container mx-auto px-4 max-w-5xl mt-20">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Why List on Kasaragod Hub?</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
            Everything you need to establish a strong local digital presence — in one free profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className={`size-11 rounded-xl flex items-center justify-center mb-4 ${b.color}`}>
                <b.icon className="size-5 stroke-[1.75]" />
              </div>
              <h3 className="text-sm font-bold text-secondary mb-2">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mt-12 md:mt-20 bg-gray-50 border-y border-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Up & Running in 3 Steps</h2>
            <p className="text-muted-foreground text-sm mt-2">No tech skills needed. Your profile goes live in minutes.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-dashed border-t-2 border-dashed border-gray-200 z-0" />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative z-10 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="size-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-primary/20">
                  <span className="text-white font-black text-lg">{s.num}</span>
                </div>
                <h3 className="text-sm font-bold text-secondary mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED (Pricing) ── */}
      <section className="container mx-auto px-4 max-w-4xl mt-10 md:mt-16">
        <motion.div {...fadeIn} className="text-center mb-10">
          <Badge variant="outline" className="border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider mb-3">
            Always Free
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Everything You Need, Included</h2>
          <p className="text-muted-foreground text-sm mt-2">No hidden fees. No premium tiers. No commissions on leads.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-white">₹0</span>
                <span className="text-gray-400 text-sm">/ forever</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                We believe every local business deserves a strong online presence regardless of budget.
              </p>
              <Button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-primary hover:bg-orange-600 rounded-xl h-11 px-8 font-bold transition-transform hover:scale-105"
              >
                Create Free Profile <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {planFeatures.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span className="text-sm text-gray-300">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mt-12 md:mt-20 bg-gray-50 border-y border-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeIn} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Business Owners Love It</h2>
            <p className="text-muted-foreground text-sm mt-2">Real results from real businesses in Kasaragod.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl border border-gray-100 shadow-sm bg-white h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="size-3.5 fill-primary text-primary" />)}
                    </div>
                    <p className="text-xs text-secondary/70 leading-relaxed flex-1 italic mb-5">"{t.content}"</p>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                      <img src={t.avatar} alt={t.name} className="size-9 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-secondary">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="container mx-auto px-4 max-w-5xl mt-10 md:mt-20 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 size-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 size-[300px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Join the movement</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4 leading-tight">
                Start Growing <br /> Your Business <br /> <span className="text-primary">Today.</span>
              </h2>

              <p className="text-white/70 text-sm mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                Kasaragod Hub is more than a directory. It’s a growth engine for local stores, restaurants, and professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  size="lg"
                  className="bg-primary hover:bg-orange-600 rounded-xl px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-white w-full sm:w-auto"
                >
                  Register Now — It's Free
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="size-10 rounded-full border-2 border-secondary shadow-md object-cover"
                    />
                  ))}
                  <div className="size-10 rounded-full border-2 border-secondary bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                    +1.2k
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white leading-none">Loved by 1,200+</p>
                  <p className="text-[10px] text-white/50">Business owners in Kasaragod</p>
                </div>
              </div>
            </div>

            {/* Right Illustration/Mockup */}
            <div className="relative hidden lg:block">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 bg-white rounded-3xl p-6 shadow-2xl text-secondary max-w-[340px] mx-auto border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    K
                  </div>
                  <div>
                    <h4 className="font-bold text-base leading-tight">Your Business Name</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Category • Location</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="h-10 rounded-xl bg-primary/5 border border-primary/10" />
                  <div className="h-10 rounded-xl bg-primary/5 border border-primary/10" />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Verified Listing</span>
                  </div>
                  <Star className="size-4 text-primary fill-primary" />
                </div>
              </motion.div>

              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-primary/30 rounded-full blur-[80px] pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full scale-110 pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
