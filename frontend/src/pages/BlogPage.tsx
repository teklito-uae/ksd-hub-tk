import { useState, useEffect } from 'react';
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

import api from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import * as Icons from 'lucide-react';

const categories = ['All', 'Food & Dining', 'Real Estate', 'Tourism', 'Healthcare', 'Business', 'Education'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/blog', { params: { category: activeCategory } })
      .then(res => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const featured = posts.filter(p => p.is_featured);
  const filtered = posts.filter(p => !p.is_featured);

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
      {loading ? (
        <section className="container mx-auto px-4 max-w-6xl mt-10 md:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[280px] md:h-[340px] rounded-3xl" />
            <Skeleton className="h-[280px] md:h-[340px] rounded-3xl" />
          </div>
        </section>
      ) : activeCategory === 'All' && featured.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl mt-10 md:mt-14">
          <div className="flex items-center gap-2 mb-6">
            <Icons.TrendingUp className="size-4 text-primary" />
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
                      <span className="flex items-center gap-1"><Icons.Calendar className="size-3" /> {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Icons.Clock className="size-3" /> {post.read_time}</span>
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[320px] rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => {
              const CatIcon = (Icons as any)[post.category_icon || 'FileText'] || Icons.FileText;
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
                          <span className="flex items-center gap-1"><Icons.Calendar className="size-3" /> {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Icons.Clock className="size-3" /> {post.read_time}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No stories found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
