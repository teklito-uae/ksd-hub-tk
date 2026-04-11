import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary text-white relative overflow-hidden pb-24 md:pb-12 border-t border-white/5">
      {/* ── BACKGROUND ACCENTS ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 pt-16 md:pt-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* 1. BRAND & MISSION */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
               <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter inline-block">
                 Kasaragod<span className="text-primary italic font-black">Hub</span>
               </Link>
               <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-sm">
                 The definitive digital ecosystem for North Malabar. We bridge the gap between local mastery and modern commerce, ensuring every business in Kasaragod finds its digital pulse.
               </p>
            </div>
            
            <div className="flex items-center gap-4">
               {['fb', 'ig', 'wa', 'yt'].map((s) => (
                 <a 
                   key={s} 
                   href="#" 
                   className="size-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-primary hover:border-primary group shadow-xl"
                 >
                    <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-white">{s}</span>
                 </a>
               ))}
            </div>
          </div>

          {/* 2. NAVIGATION LINKS */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
             <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Discover</p>
                <ul className="space-y-4">
                  {['Business Directory', 'Real Estate Hub', 'Expert Masters', 'Heritage Tourism'].map(item => (
                    <li key={item}>
                       <Link to="/directory" className="text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2 group">
                          <div className="size-1 bg-gray-600 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all" />
                          {item}
                       </Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Join Us</p>
                <ul className="space-y-4">
                  {['Register Business', 'Become a Master', 'Partner Program', 'Live Support'].map(item => (
                    <li key={item}>
                       <Link to="/register" className="text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2 group">
                          <div className="size-1 bg-gray-600 rounded-full group-hover:bg-primary group-hover:scale-150 transition-all" />
                          {item}
                       </Link>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* 3. NEWSLETTER & HUB STATUS */}
          <div className="lg:col-span-4 space-y-10">
             <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Be In The Loop</p>
                <div className="p-1 px-1.5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 focus-within:border-primary/50 transition-all shadow-2xl">
                   <input 
                     type="email" 
                     placeholder="your@email.com" 
                     className="bg-transparent border-none focus:ring-0 text-xs text-white font-medium flex-1 px-3"
                   />
                   <button className="bg-primary text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-primary/20">
                      Join
                   </button>
                </div>
                <p className="text-[10px] text-gray-500 font-medium px-1">Weekly curation of top deals & local masters.</p>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                   <div className="text-xl font-black text-white group-hover:text-primary transition-colors">1.2k+</div>
                   <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest mt-1">Verified Pros</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                   <div className="text-xl font-black text-white group-hover:text-primary transition-colors">400+</div>
                   <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest mt-1">Daily Leads</div>
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-8 order-last">
           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-[10px] font-bold text-gray-500">
                &copy; 2026 Kasaragod Hub · Built for the Malabar Coast
              </p>
              <div className="hidden md:block h-3 w-px bg-white/10" />
              <div className="flex gap-4">
                 <Link to="#" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">Privacy</Link>
                 <Link to="#" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">Terms</Link>
                 <Link to="#" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">Feedback</Link>
              </div>
           </div>

           <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              {['Visa', 'Master', 'UPI', 'Stripe'].map(p => (
                <div key={p} className="text-[9px] font-black uppercase tracking-widest text-white">{p}</div>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
