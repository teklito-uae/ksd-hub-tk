import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Search, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  LifeBuoy,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    q: "How do I register my business?",
    a: "Click on the 'For Businesses' button in the header and follow the registration steps. It's completely free!"
  },
  {
    q: "How can I verify my profile?",
    a: "Verification requires a valid business license or proof of professional certification. You can upload these in your dashboard."
  },
  {
    q: "Is Kasaragod Hub free to use?",
    a: "Yes! Browsing the directory and listing your basic business profile is 100% free forever."
  },
  {
    q: "How do I contact an expert?",
    a: "You can click the WhatsApp icon on any expert card to chat directly with them."
  }
];

export function SupportPage() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-hubbot'));
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      {/* ── HERO SECTION ── */}
      <section className="container mx-auto px-4 max-w-5xl mb-12">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black px-4 py-1.5 uppercase tracking-widest mb-2">Help Center</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">How can we help you?</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-medium">
            Find answers to common questions or reach out to our dedicated support team for assistance with your listings and account.
          </p>
        </div>

        {/* Search FAQ */}
        <div className="mt-10 relative group max-w-2xl mx-auto">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
           <Input 
             placeholder="Search for help..." 
             className="h-14 pl-12 pr-4 bg-white border-gray-100 rounded-2xl shadow-xl shadow-secondary/5 focus-visible:ring-primary text-base"
           />
        </div>
      </section>

      {/* ── TOP CONTACT CARDS ── */}
      <section className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all p-6 text-center group cursor-pointer" onClick={openChat}>
            <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
               <MessageCircle className="size-7 text-primary" />
            </div>
            <h3 className="text-base font-black text-secondary uppercase tracking-widest mb-2">Live Support</h3>
            <p className="text-xs text-muted-foreground mb-4">Chat with HubBot discovery & support assistant.</p>
            <Button variant="outline" className="rounded-xl font-bold text-[10px] uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5">
               Start Chat
            </Button>
          </Card>

          <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all p-6 text-center group">
            <div className="size-14 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
               <Phone className="size-7 text-secondary" />
            </div>
            <h3 className="text-base font-black text-secondary uppercase tracking-widest mb-2">Call Us</h3>
            <p className="text-xs text-muted-foreground mb-4">Available Mon-Fri, 9am - 6pm for major issues.</p>
            <p className="text-sm font-black text-secondary tracking-wide">+91 0000 000 000</p>
          </Card>

          <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all p-6 text-center group">
            <div className="size-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
               <Mail className="size-7 text-blue-600" />
            </div>
            <h3 className="text-base font-black text-secondary uppercase tracking-widest mb-2">Email Desk</h3>
            <p className="text-xs text-muted-foreground mb-4">For verification requests and business inquiries.</p>
            <p className="text-sm font-black text-secondary tracking-wide">support@kasaragodhub.in</p>
          </Card>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="container mx-auto px-4 max-w-4xl mb-20 bg-gray-50/50 rounded-[3rem] p-8 md:p-12 border border-gray-100">
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
           <LifeBuoy className="size-6 text-primary shrink-0" />
           <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm"
            >
              <h4 className="text-base font-black text-secondary mb-2 tracking-tight">{faq.q}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center p-8 bg-secondary/5 rounded-[2rem] border border-secondary/10">
           <h3 className="text-base font-black text-secondary tracking-wide mb-2 uppercase tracking-widest">Still have questions?</h3>
           <p className="text-sm text-muted-foreground mb-6">Our team is ready to help you grow your business in Kasaragod.</p>
           <Button className="rounded-xl px-8 h-12 bg-secondary hover:bg-black font-black uppercase tracking-widest text-xs" onClick={openChat}>
              Contact Us Now <ArrowRight className="ml-2 size-4" />
           </Button>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="container mx-auto px-4 max-w-5xl text-center">
         <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
               <ShieldCheck className="size-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
               <ShieldCheck className="size-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
               <ShieldCheck className="size-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Data Privacy</span>
            </div>
         </div>
      </section>
    </div>
  );
}
