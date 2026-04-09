import { categories, stats, testimonials, featuredSections, dummyBusinesses, bucketLists, weeklyPoll } from '@/lib/dummy-data';
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
                ...dummyBusinesses.slice(0, 3),
              ].slice(0, 6)}
            />
          </div>
        </section>
      ))}

      {/* ───── NEW: BUCKET LIST CURATION ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-24">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="border-primary/30 text-primary text-[10px] mb-3 font-bold uppercase tracking-wider">Insider Guides</Badge>
          <h2 className="text-3xl font-black text-secondary tracking-tight">The KSD Bucket List</h2>
          <p className="text-muted-foreground text-xs mt-2 max-w-md">Expertly curated experiences designed to help you rediscover your own neighborhood.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {bucketLists.map((list) => (
              <motion.div 
                key={list.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                  <img 
                    src={list.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={list.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent p-6 flex flex-col justify-end">
                     <Badge className="w-fit bg-primary text-white border-none text-[9px] font-bold mb-2">
                        {list.businessCount} PLACES
                     </Badge>
                     <h3 className="text-xl font-bold text-white leading-tight">{list.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 px-1">{list.description}</p>
              </motion.div>
           ))}
        </div>
      </section>

      {/* ───── 7. COMMUNITY PULSE (REVIEWS) ───── */}
      <section className="mt-24 pt-16 pb-20 bg-gray-50/50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl mb-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div {...fadeIn}>
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-3 py-1 mb-3 uppercase tracking-widest">Global Feedback</Badge>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Kasaragod is Talking.</h2>
                <p className="text-muted-foreground text-sm mt-1">Real stories from real locals using the hub every day.</p>
              </motion.div>
              <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs border-gray-200">
                Write a Review
              </Button>
           </div>
        </div>

        <div className="flex flex-col gap-10 w-full mask-fade-edges py-10">
          {/* Row 1: Left to Right */}
          <div className="flex gap-6 animate-marquee py-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <Card key={i} className="min-w-[320px] rounded-[2rem] border-none shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="size-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-[8px] border-green-100 text-green-600 font-bold bg-green-50/50">VERIFIED</Badge>
                  </div>
                  <p className="text-xs text-secondary/80 leading-relaxed italic mb-4">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="size-10 rounded-2xl overflow-hidden shadow-sm">
                    <img src={t.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-secondary">{t.name}</p>
                     <p className="text-[10px] text-primary font-medium">Review for {dummyBusinesses[i % dummyBusinesses.length].name}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Row 2: Right to Left */}
          <div className="flex gap-6 animate-marquee-reverse py-4">
            {[...testimonials, ...testimonials].reverse().map((t, i) => (
              <Card key={i} className="min-w-[320px] rounded-[2rem] border-none shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="size-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-[8px] border-blue-100 text-blue-600 font-bold bg-blue-50/50">TOP USER</Badge>
                  </div>
                  <p className="text-xs text-secondary/80 leading-relaxed italic mb-4">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="size-10 rounded-2xl overflow-hidden shadow-sm">
                    <img src={t.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-secondary">{t.name}</p>
                     <p className="text-[10px] text-primary font-medium">Verified Customer</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 8. DUAL-PATH CTA (ECOSYSTEM) ───── */}
      <section className="container mx-auto px-4 max-w-7xl mt-24 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Path 1: For Users */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#F8FAFC] rounded-[3rem] p-10 md:p-14 overflow-hidden border border-gray-100"
          >
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <Search className="size-48" />
             </div>
             <div className="relative z-10 h-full flex flex-col">
                <Badge variant="outline" className="w-fit border-secondary/20 text-secondary text-[10px] font-bold mb-6">FOR THE COMMUNITY</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight mb-4">
                  Find the soul of <br />
                  <span className="text-primary italic">Kasaragod Hub.</span>
                </h2>
                <p className="text-secondary/60 text-sm max-w-xs mb-10 leading-relaxed">
                  Discover over 1,200+ local services, shops, and hidden gems in your neighborhood.
                </p>
                <div className="mt-auto">
                  <Link to="/directory">
                    <Button size="lg" className="rounded-2xl px-10 h-14 font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      Start Exploring <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </Link>
                </div>
             </div>
          </motion.div>

          {/* Path 2: For Owners */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-secondary rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl shadow-secondary/20"
          >
             <div className="absolute bottom-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Star className="size-48 text-primary" />
             </div>
             <div className="relative z-10 h-full flex flex-col">
                <Badge className="w-fit bg-primary text-white border-none text-[10px] font-bold mb-6">FOR BUSINESS OWNERS</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                  Scale your brand <br />
                  <span className="text-primary underline underline-offset-8 decoration-4">exponentially.</span>
                </h2>
                <p className="text-white/50 text-sm max-w-xs mb-10 leading-relaxed">
                  Join the district's largest digital network. Get verified, get leads, get growing.
                </p>
                <div className="mt-auto">
                  <Link to="/for-businesses">
                    <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100 rounded-2xl px-10 h-14 font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                      List Your Business <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </Link>
                </div>
             </div>
          </motion.div>
        </div>
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
