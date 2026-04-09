import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-black tracking-tight mb-4">
              Kasaragod<span className="text-primary italic">Hub</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-xs">
              Northern Kerala's most trusted business discovery platform. Connecting communities, enabling commerce, and celebrating local excellence.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'WA'].map(s => (
                <div key={s} className="size-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-primary hover:border-primary hover:text-white cursor-pointer transition-all">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Explore</p>
            <ul className="space-y-3">
              {['Business Directory', 'Real Estate', 'Food & Dining', 'Healthcare', 'Tourism'].map(l => (
                <li key={l}>
                  <Link to="/directory" className="text-xs text-gray-400 hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">For Businesses</p>
            <ul className="space-y-3">
              {[
                ['Register Now', '/register'], 
                ['How It Works', '/for-businesses'], 
                ['Pricing Plans', '/for-businesses'], 
                ['Success Stories', '/for-businesses'], 
                ['Partner FAQs', '#']
              ].map(([l, href]) => (
                <li key={l}>
                  <Link to={href} className="text-xs text-gray-400 hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Stay Updated</p>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Get curated weekly updates on new local gems and seasonal offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl text-xs px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary min-w-0 transition-all font-medium"
              />
              <button className="bg-primary text-white text-xs font-bold px-4 py-3 rounded-xl hover:bg-orange-600 transition-colors shrink-0 shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-[10px] text-gray-500 flex items-center gap-2">📍 Kasaragod, Kerala – 671121</p>
              <p className="text-[10px] text-gray-500 flex items-center gap-2">📧 hello@kasaragodhub.in</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-500">
            &copy; 2026 Kasaragod Hub · Crafted with ❤️ by <span className="text-primary font-semibold">Archi Studio</span>
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <a key={l} href="#" className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
