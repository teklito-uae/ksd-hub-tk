import { useParams, Link, useNavigate } from 'react-router-dom';

import { SEOHead } from '@/components/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Clock, Calendar, Share2, ArrowRight,
  MessageCircle, LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import * as Icons from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [morePosts, setMorePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/blog/${slug}`)
      .then(res => {
        setPost(res.data.post);
        setMorePosts(res.data.related);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 p-4 pt-20">
        <div className="container mx-auto max-w-3xl">
           <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl mb-8" />
           <div className="h-8 w-3/4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mb-4" />
           <div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md mb-8" />
           <div className="space-y-4">
             <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
             <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
             <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
           </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-secondary dark:text-white mb-2">Post Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6">The article you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/blog')} className="rounded-xl">Back to Blog</Button>
      </div>
    );
  }

  const shareUrl = `https://kasaragodhub.com/blog/${post.slug}`;

  // Convert markdown-style content to simple HTML paragraphs
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl md:text-2xl font-bold text-secondary dark:text-white mt-10 mb-4">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('| ')) {
        const rows = block.split('\n').filter(r => !r.startsWith('|--'));
        const headers = rows[0]?.split('|').filter(Boolean).map(h => h.trim());
        const data = rows.slice(1).map(r => r.split('|').filter(Boolean).map(c => c.trim()));
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  {headers?.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left font-bold text-secondary dark:text-white text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, ri) => (
                  <tr key={ri} className="border-t border-gray-100 dark:border-gray-800">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-secondary/80 dark:text-gray-300 text-sm">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map(line => line.replace(/^- \*\*(.*?)\*\*(.*)/, '$1$2').replace('- ', ''));
        return (
          <ul key={i} className="space-y-2 my-4 ml-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-secondary/80 dark:text-gray-300 text-[15px] leading-relaxed">
                <span className="size-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
      }
      if (block.match(/^\d+\.\s/)) {
        const items = block.split('\n');
        return (
          <ol key={i} className="space-y-2 my-4 ml-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-secondary/80 dark:text-gray-300 text-[15px] leading-relaxed">
                <span className="size-6 rounded-lg bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                {item.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={i} className="text-secondary/80 dark:text-gray-300 text-[15px] leading-[1.85] mb-4">{block}</p>
      );
    });
  };

  const CatIcon = (Icons as any)[post.category_icon || 'FileText'] || Icons.FileText;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-24 md:pb-12">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        article={{
          title: post.title,
          description: post.excerpt,
          image: post.image,
          author: post.author,
          publishedTime: post.published_at,
        }}
      />

      {/* Hero Image */}
      <section className="relative h-[280px] md:h-[420px] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-4 left-4 md:top-6 md:left-8 z-20 size-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <Icons.ChevronLeft className="size-5" />
        </button>

        {/* Share button */}
        <button
          onClick={() => navigator.clipboard?.writeText(shareUrl)}
          className="absolute top-4 right-4 md:top-6 md:right-8 z-20 size-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <Icons.Share2 className="size-5" />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="container mx-auto max-w-3xl">
            <Badge className="bg-primary text-white border-none text-[9px] font-bold mb-3 gap-1">
              <CatIcon className="size-2.5" /> {post.category}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/60 text-xs font-semibold">
              <span className="flex items-center gap-1"><Icons.Calendar className="size-3" /> {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Icons.Clock className="size-3" /> {post.read_time}</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-3xl mt-8 md:mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Excerpt callout */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-8 border-l-4 border-primary">
            <p className="text-secondary dark:text-gray-200 text-sm font-medium italic leading-relaxed">{post.excerpt}</p>
          </div>

          {/* Article body */}
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* Share Strip */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Share this article</p>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`} target="_blank" rel="noreferrer"
                className="size-10 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
                <MessageCircle className="size-4" />
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer"
                className="size-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors text-[11px] font-black">
                𝕏
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer"
                className="size-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-700 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors text-[13px] font-black">
                f
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
                className="size-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <LinkIcon className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      <section className="container mx-auto px-4 max-w-3xl mt-14 mb-10">
        <h3 className="text-lg font-bold text-secondary dark:text-white mb-6 flex items-center gap-2">
          More Stories <ArrowRight className="size-4 text-primary" />
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {morePosts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`}>
              <Card className="group rounded-2xl overflow-hidden border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-primary/20 transition-all duration-300 bg-white dark:bg-gray-900">
                <div className="h-40 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="text-[8px] font-bold mb-2 border-gray-200 dark:border-gray-700">{p.category}</Badge>
                  <h4 className="text-sm font-bold text-secondary dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1.5">{p.read_time}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full font-bold text-sm px-8 gap-2">
              View All Stories <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
