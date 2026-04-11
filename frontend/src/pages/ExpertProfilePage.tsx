import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { dummyBusinesses } from '@/lib/dummy-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  MessageSquare,
  CheckCircle2,
  Briefcase,
  ChevronLeft,
  Share2,
  Zap,
  ShieldCheck,
  Star,
  Globe,
  Phone,
  Mail,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export function ExpertProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pro, setPro] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPro = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/professionals/${slug}`);
        setPro(res.data);
      } catch (err) {
        console.error('Failed to load professional profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPro();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen">
        <nav className="h-16 bg-white border-b border-gray-200" />
        <div className="container mx-auto px-4 max-w-5xl pt-8 space-y-6">
          <Skeleton className="h-96 w-full rounded-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Skeleton className="h-96 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-secondary">Expert Not Found</h2>
        <Button onClick={() => navigate('/experts')} className="mt-4 rounded-xl">Back to Experts</Button>
      </div>
    );
  }

  const linkedBusinesses = (pro.business_ids || []).map((bid: any) => dummyBusinesses.find(b => b.id === bid)).filter(Boolean);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* ── UNIFIED RESPONSIVE NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl h-14 md:h-16 flex items-center justify-between">
           <div className="flex items-center gap-1 md:gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="size-10 md:size-auto md:px-0 rounded-full md:rounded-lg hover:bg-gray-100 flex items-center gap-2 group"
              >
                 <ChevronLeft className="size-5 md:size-4 group-hover:-translate-x-1 transition-transform" />
                 <span className="hidden md:inline font-bold text-sm">Return to Network</span>
              </Button>
           </div>
           
           <div className="flex items-center gap-2 md:gap-3">
              <Button variant="ghost" size="icon" className="size-9 md:size-10 rounded-full hover:bg-gray-100">
                <Share2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden size-9 rounded-full hover:bg-gray-100">
                <MoreVertical className="size-4" />
              </Button>
              <Link to="/directory">
                 <Button className="rounded-full h-9 md:h-10 px-5 md:px-8 bg-secondary hover:bg-black text-white font-bold text-xs shadow-lg shadow-secondary/10 active:scale-95 transition-all">
                   Search Experts
                 </Button>
              </Link>
           </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl pt-4 md:pt-8 pb-32 md:pb-16 space-y-4 md:space-y-6">
        
        {/* ── 1. IDENTITY SECTION ── */}
        <Card className="overflow-hidden rounded-2xl md:rounded-3xl border-gray-200/60 bg-white shadow-sm ring-1 ring-black/[0.02]">
           {/* Dynamic Banner */}
           <div className="h-32 md:h-56 bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 size-48 bg-secondary/5 rounded-full blur-[60px] -ml-24 -mb-24" />
           </div>
           
           <div className="px-5 md:px-10 pb-8 md:pb-10 relative">
              {/* Profile Image with Ring */}
              <div className="absolute top-0 -translate-y-1/2 left-5 md:left-10 size-28 md:size-44 rounded-full border-4 md:border-[6px] border-white bg-white shadow-xl shadow-secondary/5 overflow-hidden ring-1 ring-black/5">
                 <img 
                   src={pro.avatar_path || pro.avatar} 
                   className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-500" 
                   alt={pro.name} 
                 />
              </div>

              {/* Action Buttons: Multi-mode layout */}
              <div className="flex justify-end pt-4 md:pt-6 gap-2">
                 <a href={`https://wa.me/${pro.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 md:flex-none">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-black text-[11px] md:text-xs h-10 md:h-12 px-5 md:px-10 shadow-lg shadow-primary/20 hover:translate-y-[-2px] active:translate-y-0 transition-all">
                       Hire Master
                    </Button>
                 </a>
                 <Button variant="outline" className="hidden md:flex rounded-full border-gray-200 text-secondary font-bold text-xs h-12 px-8 hover:bg-gray-50">
                   Contact Info
                 </Button>
                 <Button variant="ghost" size="icon" className="md:hidden size-10 rounded-full border border-gray-100">
                    <Phone className="size-4 text-secondary" />
                 </Button>
              </div>

              {/* Name & Headline */}
              <div className="mt-4 md:mt-8">
                 <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">{pro.name}</h1>
                    {pro.is_verified && <CheckCircle2 className="size-5 md:size-6 text-blue-500 fill-blue-50" />}
                 </div>
                 <p className="text-base md:text-xl text-secondary/70 font-bold mt-1 md:mt-2">{pro.profession}</p>
                 
                 <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-4 md:mt-5">
                    <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground font-medium">
                       <MapPin className="size-4" /> {pro.location_city || pro.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base text-secondary font-black">
                       <Star className="size-4 fill-primary text-primary" /> {pro.rating || 5} <span className="text-muted-foreground font-medium underline decoration-primary/20 decoration-2 underline-offset-4">{pro.experience || 'Experienced'} Experience</span>
                    </div>
                 </div>
              </div>

              {/* Verified Badge Bar: Premium Style */}
              <div className="mt-8 p-4 md:p-5 bg-secondary/5 rounded-2xl border border-secondary/5 flex items-start md:items-center gap-4">
                 <div className="size-10 rounded-xl bg-white border border-secondary/10 flex items-center justify-center shadow-sm shrink-0">
                    <ShieldCheck className="size-6 text-primary" />
                 </div>
                 <div className="space-y-0.5">
                    <p className="text-sm font-black text-secondary">Verified Local Master</p>
                    <p className="text-[11px] md:text-xs font-medium text-secondary/60 leading-relaxed">
                       Identity, location, and professional standards verified by the Kasaragod Hub moderation team.
                    </p>
                 </div>
              </div>
           </div>
        </Card>

        {/* ── 2. TWO COLUMN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            
            {/* Extended About Section */}
            <Card className="p-6 md:p-10 rounded-2xl md:rounded-3xl border-gray-100 bg-white shadow-sm ring-1 ring-black/[0.01]">
               <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight mb-6">About</h2>
               <div className="prose prose-sm md:prose-base max-w-none text-secondary/80 leading-[1.7] space-y-4 font-medium">
                  <p>{pro.bio}</p>
                  <p>
                    Dedicated to providing excellence in {pro.profession} across {pro.location_city || pro.location} and surrounding areas. 
                    I specialize in high-impact solutions that combine local cultural values with international quality standards.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-x-12 gap-y-4 border-t border-gray-50 mt-8">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Base Rate</p>
                        <p className="text-sm font-black text-secondary">Affordable/Premium</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Service Area</p>
                        <p className="text-sm font-black text-secondary">District-Wide</p>
                     </div>
                  </div>
               </div>
            </Card>

            {/* Experience List (Cleaner) */}
            <Card className="p-6 md:p-10 rounded-2xl md:rounded-3xl border-gray-100 bg-white shadow-sm ring-1 ring-black/[0.01]">
               <div className="flex items-center justify-between mb-8 md:mb-10">
                  <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">Key Projects</h2>
                  <Badge variant="outline" className="border-primary/20 text-primary text-[10px] font-black uppercase">Verified History</Badge>
               </div>
               
               <div className="space-y-10 md:space-y-12">
                  {(pro.portfolio || []).map((_: any, i: number) => (
                    <div key={i} className="flex gap-4 md:gap-6 group relative">
                       {/* Timeline Decor */}
                       {i < (pro.portfolio?.length || 0) - 1 && <div className="absolute left-[23px] top-12 bottom-[-48px] w-0.5 bg-gray-50" />}
                       
                       <div className="size-12 md:size-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/10 transition-all duration-300">
                          <Briefcase className="size-6 md:size-7" />
                       </div>
                       
                       <div className="space-y-2 md:space-y-3 flex-1 pb-2">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                             <h3 className="text-base md:text-lg font-black text-secondary leading-tight tracking-tight">
                                Premium Infrastructure Project {i + 1}
                             </h3>
                             <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{pro.location_city || pro.location} • 2024</span>
                          </div>
                          <p className="text-sm font-bold text-primary active:opacity-80 transition-opacity">Lead Master Consultant</p>
                          <p className="text-xs md:text-sm text-secondary/60 leading-relaxed max-w-2xl font-medium">
                             Execution of specialized {pro.profession?.toLowerCase()} works for a high-profile local development. 
                             Managed all phases from initial site assessment to final implementation, ensuring 100% adherence to district safety and design standards. 
                             Received top rating for timeliness and technical precision.
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            {/* Brands Section (Redesigned Logogrid) */}
            {linkedBusinesses.length > 0 && (
              <Card className="p-6 md:p-10 rounded-2xl md:rounded-3xl border-gray-100 bg-white shadow-sm ring-1 ring-black/[0.01]">
                 <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight mb-8">Endorsed Brands</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {linkedBusinesses.map((biz: any) => biz && (
                       <Link key={biz.id} to={`/business/${biz.slug}`} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group">
                          <div className="size-14 rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm shrink-0">
                             <img src={biz.logo_url} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" alt="logo" />
                          </div>
                          <div className="min-w-0 pr-2">
                             <h4 className="text-sm md:text-base font-black text-secondary group-hover:text-primary transition-colors truncate">{biz.name}</h4>
                             <div className="flex items-center gap-1.5 mt-0.5">
                                <CheckCircle2 className="size-3 text-blue-500" />
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Certified Partner</p>
                             </div>
                          </div>
                       </Link>
                    ))}
                 </div>
              </Card>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
             
             {/* Sticky Contact Box */}
             <div className="sticky top-24 space-y-4 md:space-y-6">
                <Card className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border-gray-200/60 bg-white shadow-sm ring-1 ring-black/[0.02] relative overflow-hidden">
                   {/* Decor */}
                   <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                   
                   <h2 className="text-lg font-black text-secondary mb-6 flex items-center gap-2">
                     <MessageSquare className="size-5 text-primary" /> Contact Details
                   </h2>
                   
                   <div className="space-y-6">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">WhatsApp Business</p>
                         <p className="text-sm font-black text-secondary">+{pro.whatsapp}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Master Email</p>
                         <p className="text-sm font-black text-secondary lowercase truncate">{pro.slug}.kgd@kasaragodhub.in</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Digital Portfolio</p>
                         <p className="text-sm font-black text-blue-600 flex items-center gap-1 hover:underline cursor-pointer">
                           kasaragodhub.in/pro/{pro.slug} <ExternalLink className="size-3" />
                         </p>
                      </div>
                   </div>
                   
                   <div className="mt-8 space-y-3">
                      <Button className="w-full rounded-2xl md:rounded-[1.5rem] bg-secondary hover:bg-black text-white font-black h-12 md:h-14 text-xs md:text-sm shadow-xl shadow-secondary/10 transition-all active:scale-95">
                         Request Service Quote
                      </Button>
                      <Button variant="ghost" className="w-full text-[11px] font-black text-muted-foreground hover:text-primary transition-colors">
                        View Service Documents
                      </Button>
                   </div>
                </Card>

                {/* Skills Box */}
                <Card className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border-gray-100 bg-white shadow-sm">
                   <h2 className="text-lg font-black text-secondary mb-6 flex items-center gap-2">
                     <Zap className="size-5 text-primary" /> Verified Skills
                   </h2>
                   <div className="flex flex-wrap gap-2">
                      {(pro.skills || []).map((skill: any) => (
                         <Badge key={typeof skill === 'string' ? skill : skill.name} variant="secondary" className="rounded-xl px-4 py-2 border-none bg-gray-50 text-secondary text-[11px] font-black hover:bg-primary/5 hover:text-primary transition-colors cursor-default">
                           {typeof skill === 'string' ? skill : skill.name}
                         </Badge>
                      ))}
                   </div>
                </Card>
             </div>
          </div>

        </div>
      </div>
      
      {/* ── MOBILE QUICK ACTION BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 pb-8">
         <a href={`https://wa.me/${pro.whatsapp}`} className="flex-[2]">
            <Button className="w-full h-14 rounded-2xl bg-secondary text-white font-black shadow-2xl shadow-secondary/30 active:scale-95 transition-transform text-xs uppercase tracking-widest">
               WhatsApp Master
            </Button>
         </a>
         <a href={`tel:${pro.whatsapp}`} className="flex-1">
            <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-200 bg-white text-secondary font-black shadow-lg shadow-secondary/5">
               <Phone className="size-5" />
            </Button>
         </a>
      </div>
    </div>
  );
}
