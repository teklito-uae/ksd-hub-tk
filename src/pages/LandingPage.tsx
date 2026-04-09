import { categories, stats, testimonials, featuredSections, dummyBusinesses } from '@/lib/dummy-data';
import { CategoryList } from '@/components/CategoryList';
import { BusinessCarousel } from '@/components/BusinessCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Search, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ───── 1. HERO CAROUSEL ───── */}
      <section className="relative">
        <HeroCarousel />

        {/* Floating search pill over hero */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                placeholder="Search businesses, services, or locations…"
                className="border-none bg-gray-50 rounded-xl pl-10 h-11 text-sm focus-visible:ring-0 focus-visible:bg-white transition-colors"
              />
            </div>
            <Button className="rounded-xl h-11 px-5 text-sm font-semibold shrink-0">
              Search
            </Button>
          </motion.div>
        </div>
      </section>

      {/* search pill offset spacer */}
      <div className="mt-16" />

      {/* ───── 2. STATS STRIP ───── */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl font-black text-secondary">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── 3. CATEGORIES ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-20">
        <div className="flex justify-between items-end mb-8">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold text-secondary">Browse by Category</h2>
            <p className="text-muted-foreground text-xs mt-1">Discover businesses across 50+ curated sectors</p>
          </motion.div>
          <Button variant="ghost" size="sm" className="text-primary font-semibold text-xs group hidden md:flex">
            All Categories <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
        <CategoryList categories={categories} />
      </section>


      {/* ───── 5. FEATURED PARTNERS CAROUSEL ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-20">
        <BusinessCarousel
          title="Featured Partners"
          subtitle="Verified and top-rated businesses across Kasaragod"
          businesses={dummyBusinesses.filter(b => b.is_featured)}
        />
      </section>

      {/* ───── 6. CATEGORY-BASED SECTIONS ───── */}
      {featuredSections.map((section, sIdx) => (
        <section
          key={section.id}
          className={`mt-16 py-12 ${sIdx % 2 !== 0 ? 'bg-gray-50 border-y border-gray-100' : ''}`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <BusinessCarousel
              title={section.label}
              subtitle={`Popular ${section.label.toLowerCase()} businesses near you`}
              businesses={[
                ...section.businesses,
                // Pad with all businesses if section has few entries for demo
                ...dummyBusinesses.slice(0, 3),
              ].slice(0, 6)}
            />
          </div>
        </section>
      ))}

      {/* ───── 7. TESTIMONIALS ───── */}
      <section className="mt-20 bg-gray-50 border-y border-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeIn} className="text-center mb-10">
            <Badge variant="outline" className="border-primary/30 text-primary text-[10px] mb-3 font-bold uppercase tracking-wider">
              Community Reviews
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">What People Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl border border-gray-100 shadow-sm bg-white h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="size-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-secondary/70 leading-relaxed mb-5 flex-1 italic">
                      "{t.content}"
                    </p>
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

      {/* ───── 8. CTA ───── */}
      <section className="container mx-auto px-4 max-w-5xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl px-8 md:px-16 py-12 text-center text-white relative overflow-hidden shadow-[0_16px_48px_-8px_rgba(255,122,0,0.35)]"
        >
          <div className="absolute -top-20 -right-20 size-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-60 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">
              Ready to grow your Kasaragod business?
            </h2>
            <p className="text-white/70 text-sm mb-7 max-w-md mx-auto">
              Join 1,200+ business owners already benefiting from our platform. Always free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/for-businesses">
                <Button className="bg-white text-primary hover:bg-gray-50 rounded-xl px-8 h-11 font-bold shadow-lg text-sm transition-transform hover:scale-105 active:scale-95">
                  Get Listed — It's Free
                </Button>
              </Link>
              <span className="text-white/50 text-xs flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-white/60" /> No credit card required
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ───── 9. FOOTER ───── */}
      <footer className="mt-20 bg-secondary text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Main footer grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-lg font-black tracking-tight mb-3">
                Kasaragod<span className="text-primary italic">Hub</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Northern Kerala's most trusted business discovery platform. Connecting communities, enabling commerce.
              </p>
              <div className="flex gap-3">
                {['FB', 'IG', 'WA'].map(s => (
                  <div key={s} className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-primary hover:border-primary hover:text-white cursor-pointer transition-all">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore</p>
              <ul className="space-y-2.5">
                {['Business Directory', 'Real Estate', 'Food & Dining', 'Healthcare', 'Tourism'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Businesses */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">For Businesses</p>
              <ul className="space-y-2.5">
                {[['Register Now', '/for-businesses'], ['How It Works', '/for-businesses'], ['Pricing', '/for-businesses'], ['Success Stories', '/for-businesses'], ['FAQs', '#']].map(([l, href]) => (
                  <li key={l}>
                    <Link to={href} className="text-xs text-gray-400 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Stay Updated</p>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Get weekly updates on new businesses and local deals.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/8 border border-white/10 rounded-lg text-xs px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary min-w-0"
                />
                <button className="bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors shrink-0">
                  Go
                </button>
              </div>
              <div className="mt-5 space-y-1.5">
                <p className="text-[10px] text-gray-500">📍 Kasaragod, Kerala – 671121</p>
                <p className="text-[10px] text-gray-500">📧 hello@kasaragodhub.in</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[10px] text-gray-500">
              &copy; 2026 Kasaragod Hub · Built by <span className="text-primary font-semibold">Archi Studio</span>
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
                <a key={l} href="#" className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
