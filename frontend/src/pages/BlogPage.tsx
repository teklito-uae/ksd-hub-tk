import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import {
  Clock, ArrowRight, TrendingUp, MapPin, Calendar,
  Utensils, Building2, Palmtree, Heart, Briefcase, GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Blog Post Data ──
export const blogPosts = [
  {
    id: '1',
    slug: 'top-10-restaurants-kasaragod',
    title: 'Top 10 Must-Visit Restaurants in Kasaragod District',
    excerpt: 'From authentic Malabar biryani to seafood joints by the Arabian Sea — discover the best places to eat across Kasaragod, Kanhangad, and Bekal.',
    content: `Kasaragod district is a hidden culinary paradise of Kerala. The unique blend of Tulu, Kannada, and Malayalam food cultures creates a dining experience unlike anywhere else in India.\n\n## 1. Bekal Fort Restaurant\nPerched overlooking the iconic Bekal Fort, this restaurant serves authentic Kerala thalis with a stunning ocean backdrop. Their fish curry is legendary among locals.\n\n## 2. Hotel Prasanth, Kanhangad\nA decades-old institution known for its fluffy appam and rich chicken stew. Breakfast here is a ritual for many Kanhangad residents.\n\n## 3. Al-Bake Arabian Kitchen, Kasaragod Town\nThe go-to spot for shawarma and Al Faham chicken. Their Malabar biryani on Fridays draws crowds from across the district.\n\n## 4. Chakra Residency, Uppala\nMore than just a hotel — their multi-cuisine restaurant blends North Indian, Kerala, and Chinese dishes with consistent quality.\n\n## 5. Seabreeze, Bekal\nA beachside eatery where the catch of the day is grilled right in front of you. Perfect for a sunset dinner.\n\n## 6. Malabar Spice, Nileshwar\nSpecializing in traditional Mappila cuisine, their pathiri and beef fry combo is a weekend favourite.\n\n## 7. Café Culture, Kanhangad\nThe town's first specialty coffee shop, serving single-origin pour-overs alongside loaded sandwiches and cheesecakes.\n\n## 8. Grand Pavilion, Cheruvathur\nA family restaurant known for generous portions and their signature prawn masala that keeps people coming back.\n\n## 9. Bamboo Grove, Ranipuram Road\nAn eco-restaurant using locally sourced organic ingredients. Their bamboo chicken is a must-try experience.\n\n## 10. Street Food Lane, Kasaragod Town\nNot a single restaurant but an entire stretch near the old bus stand — from banana chips to pazham pori, this is street food heaven.`,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
    category: 'Food & Dining',
    categoryIcon: Utensils,
    readTime: '5 min read',
    date: 'April 15, 2026',
    author: 'Kasaragod Hub Team',
    featured: true,
  },
  {
    id: '2',
    slug: 'real-estate-guide-kasaragod-2026',
    title: 'Kasaragod Real Estate: A Complete Buyer\'s Guide for 2026',
    excerpt: 'Property prices, best localities, RERA compliance, and investment hotspots — everything you need to know before buying land or a flat in Kasaragod.',
    content: `The Kasaragod real estate market is witnessing unprecedented growth in 2026, driven by infrastructure development and increased connectivity.\n\n## Current Market Overview\nProperty prices in Kasaragod town have appreciated by 15-20% over the past two years. Kanhangad and Bekal are emerging as premium residential zones.\n\n## Top Investment Areas\n- **Bekal**: Tourism-driven growth, resort development\n- **Kanhangad South**: IT corridor proposal, educational institutions\n- **Nileshwar**: Affordable plots, agricultural potential\n- **Uppala Junction**: Commercial hub, highway connectivity\n\n## What to Check Before Buying\n1. RERA registration status\n2. Land use classification (residential vs agricultural)\n3. Road access and widening plans\n4. Water and electricity connectivity\n5. Panchayat/Municipality approval\n\n## Price Range Guide\n| Location | Per Cent Rate |\n|----------|---------------|\n| Kasaragod Town | ₹8-15 Lakhs |\n| Kanhangad | ₹6-12 Lakhs |\n| Bekal | ₹10-20 Lakhs |\n| Nileshwar | ₹4-8 Lakhs |\n| Uppala | ₹5-10 Lakhs |`,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    category: 'Real Estate',
    categoryIcon: Building2,
    readTime: '7 min read',
    date: 'April 10, 2026',
    author: 'Kasaragod Hub Team',
    featured: true,
  },
  {
    id: '3',
    slug: 'hidden-gems-kasaragod-tourism',
    title: '12 Hidden Gems in Kasaragod That Tourists Don\'t Know About',
    excerpt: 'Beyond Bekal Fort — discover waterfalls, caves, backwaters, and ancient temples that make Kasaragod a secret paradise.',
    content: `While Bekal Fort attracts thousands of tourists every year, Kasaragod district has dozens of unexplored destinations that rival Kerala's most famous spots.\n\n## 1. Ranipuram Hills\nOften called the "Ooty of Kerala," this hill station at 750m altitude offers trekking trails through shola forests with breathtaking views.\n\n## 2. Valiyaparamba Backwaters\nThe longest backwater chain in Kerala, stretching 30km. Far less crowded than Alleppey, with equally stunning houseboat experiences.\n\n## 3. Kottancherry Hills\nA sunrise point that locals swear by. The panoramic view of the Arabian Sea and Western Ghats from here is unforgettable.\n\n## 4. Possadigumpe Viewpoint\nA lesser-known viewpoint near Sullia border offering views of multiple Karnataka and Kerala districts simultaneously.\n\n## 5. Chandragiri Fort\nAn ancient fort on the banks of Chandragiri River, dating back to the 17th century. Far less crowded than Bekal.\n\n## 6. Ananthapura Lake Temple\nThe only lake temple in Kerala, believed to be the original seat of Lord Ananthpadmanabha. A vegetarian crocodile named Babia is said to guard the temple.`,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    category: 'Tourism',
    categoryIcon: Palmtree,
    readTime: '6 min read',
    date: 'April 5, 2026',
    author: 'Kasaragod Hub Team',
    featured: false,
  },
  {
    id: '4',
    slug: 'best-hospitals-kasaragod',
    title: 'Best Hospitals & Clinics in Kasaragod: A Health Directory',
    excerpt: 'From multi-specialty hospitals to Ayurvedic clinics — a comprehensive guide to healthcare services across the district.',
    content: `Access to quality healthcare is critical, and Kasaragod district has seen significant improvements in medical infrastructure over the past decade.\n\n## Top Multi-Specialty Hospitals\n1. **District Hospital, Kasaragod** — Government facility with 400+ beds\n2. **KIMS, Kanhangad** — Private multi-specialty with 24/7 emergency\n3. **Cooperative Hospital, Taliparamba** — Affordable quality care\n\n## Specialist Clinics\n- Dental: Dr. Sujith's Dental Clinic, Kasaragod Town\n- Eye Care: Nethra Eye Hospital, Kanhangad\n- Ortho: Bone & Joint Clinic, Uppala\n\n## Ayurveda & Wellness\nKasaragod is famous for its Ayurvedic traditions. The district has over 50 registered Ayurvedic clinics.`,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
    category: 'Healthcare',
    categoryIcon: Heart,
    readTime: '4 min read',
    date: 'March 28, 2026',
    author: 'Kasaragod Hub Team',
    featured: false,
  },
  {
    id: '5',
    slug: 'freelancers-guide-kasaragod',
    title: 'Remote Work & Freelancing in Kasaragod: The Complete Guide',
    excerpt: 'Co-working spaces, internet connectivity, freelancer meetups, and why Kasaragod is becoming a digital nomad destination.',
    content: `With improving internet infrastructure and affordable living costs, Kasaragod is emerging as an unlikely but compelling destination for remote workers.\n\n## Internet Connectivity\nJioFiber and BSNL FTTH are available in most urban areas. Speeds of 100-300 Mbps are common in Kasaragod town and Kanhangad.\n\n## Co-Working Spaces\n1. HubSpace Kasaragod — Air-conditioned, 24/7 access, meeting rooms\n2. The Startup Café, Kanhangad — Affordable daily passes\n\n## Cost of Living\nA comfortable lifestyle in Kasaragod costs roughly ₹15,000-25,000/month including rent, food, and transport — a fraction of Bangalore or Kochi.\n\n## Community\nMonthly freelancer meetups happen at various cafés. The Kasaragod Hub platform connects local professionals.`,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    category: 'Business',
    categoryIcon: Briefcase,
    readTime: '5 min read',
    date: 'March 20, 2026',
    author: 'Kasaragod Hub Team',
    featured: false,
  },
  {
    id: '6',
    slug: 'best-schools-kasaragod-2026',
    title: 'Top 15 Schools in Kasaragod District: CBSE, ICSE & State Board',
    excerpt: 'A parent\'s guide to choosing the right school — fees, facilities, results, and student reviews across all major boards.',
    content: `Choosing the right school is one of the most important decisions for families in Kasaragod. Here's our comprehensive review.\n\n## CBSE Schools\n1. Kendriya Vidyalaya, Kasaragod — Central government school with excellent results\n2. Chinmaya Vidyalaya, Kanhangad — Strong extracurricular focus\n3. Amrita Vidyalayam, Kasaragod — Known for discipline and academics\n\n## ICSE Schools\n1. St. Mary's School — One of the oldest English-medium schools\n2. Holy Cross School — Strong arts and sports programs\n\n## State Board (Malayalam Medium)\nNumerous high-performing government schools with excellent pass rates in SSLC and Plus Two examinations.`,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
    category: 'Education',
    categoryIcon: GraduationCap,
    readTime: '6 min read',
    date: 'March 15, 2026',
    author: 'Kasaragod Hub Team',
    featured: false,
  },
];

const categories = ['All', 'Food & Dining', 'Real Estate', 'Tourism', 'Healthcare', 'Business', 'Education'];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
  const featured = blogPosts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-24 md:pb-12">
      <SEOHead
        title="Blog — Local Stories & Guides"
        description="Discover the best of Kasaragod through curated guides, top-10 lists, local insights, and expert recommendations."
        url="/blog"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-8 pb-10 md:pt-12 md:pb-16 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="border-primary/30 text-primary text-[9px] font-black uppercase tracking-widest">
              KSD Stories
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-secondary dark:text-white tracking-tight">
              The Kasaragod Blog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto font-medium">
              Local guides, district insights, and curated recommendations from the heart of Kerala's northernmost district.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all duration-200",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-gray-800 text-secondary/70 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'All' && (
        <section className="container mx-auto px-4 max-w-6xl mt-10 md:mt-14">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="text-lg font-bold text-secondary dark:text-white">Featured Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-3xl overflow-hidden h-[280px] md:h-[340px] shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <Badge className="bg-primary text-white border-none text-[9px] font-bold mb-3">{post.category}</Badge>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2 group-hover:text-primary/90 transition-colors">{post.title}</h3>
                    <p className="text-white/60 text-xs line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-white/50 text-[10px] font-semibold">
                      <span className="flex items-center gap-1"><Calendar className="size-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="container mx-auto px-4 max-w-6xl mt-10 md:mt-14 mb-10">
        <h2 className="text-lg font-bold text-secondary dark:text-white mb-6">
          {activeCategory === 'All' ? 'All Stories' : activeCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => {
            const CatIcon = post.categoryIcon;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="group rounded-2xl overflow-hidden border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-900">
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-secondary dark:text-white border-none text-[9px] font-bold gap-1">
                          <CatIcon className="size-2.5" /> {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-secondary dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No stories found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
