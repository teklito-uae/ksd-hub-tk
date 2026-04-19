import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, ThumbsUp, Play } from 'lucide-react';

const categories = [
  { name: 'Restaurants', slug: 'restaurants', sub: ['Kerala Cuisine', 'Biryani & Meals', 'Cafes & Coffee', 'Bakeries', 'Seafood', 'Fast Food'] },
  { name: 'Home Services', slug: 'home-services', sub: ['Plumbers', 'Electricians', 'Painters', 'Contractors', 'Pest Control', 'Cleaning'] },
  { name: 'Auto Services', slug: 'auto-services', sub: ['Car Repair', 'Car Wash', 'Towing', 'Driving Schools', 'Bike Service'] },
  { name: 'Health & Beauty', slug: 'health-beauty', sub: ['Salons', 'Dentists', 'Hospitals', 'Ayurveda & Spa', 'Pharmacies'] },
  { name: 'Real Estate', slug: 'real-estate', sub: ['Apartments', 'Plots & Land', 'Villas', 'Commercial Space'] },
  { name: 'Education', slug: 'education', sub: ['Schools', 'Colleges', 'Coaching Centers', 'Skill Training'] },
  { name: 'Tourism', slug: 'tourism', sub: ['Resorts & Hotels', 'Tour Operators', 'Houseboats', 'Homestays'] },
  { name: 'Shopping', slug: 'shopping', sub: ['Supermarkets', 'Textiles & Fashion', 'Electronics', 'Jewellery'] },
  { name: 'Events', slug: 'events', sub: ['Wedding Halls', 'Photography', 'Catering', 'Flower Decoration'] },
  { name: 'Tech & IT', slug: 'tech-it', sub: ['Software Dev', 'Web Design', 'Mobile Repair', 'CCTV & Security'] },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pb-24 md:pb-0">

      {/* ── TOP CATEGORIES MEGA STRIP ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl py-10 md:py-14">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Browse All Categories</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div key={cat.slug} className="space-y-2">
                <Link
                  to={`/directory/${cat.slug}`}
                  className="text-[13px] font-extrabold text-secondary hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
                <ul className="space-y-1">
                  {cat.sub.map((s) => (
                    <li key={s}>
                      <Link
                        to={`/directory/${cat.slug}`}
                        className="text-[11px] text-gray-400 hover:text-primary font-medium transition-colors"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="container mx-auto px-4 max-w-7xl pt-10 md:pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-100">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img src="/assets/logo/kasaragodHub-logo.png" alt="KasaragodHub" className="h-7 w-auto object-contain" />
            </Link>
            <p className="text-[12px] text-gray-400 leading-relaxed font-medium max-w-xs">
              Kasaragod's largest business directory — connecting you with the best local services, professionals, and experiences across the district.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: ThumbsUp, href: '#', label: 'Facebook' },
                { icon: Share2, href: '#', label: 'Instagram' },
                { icon: Play, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="size-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-secondary">Quick Links</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Business Directory', href: '/directory' },
                { label: 'Expert Professionals', href: '/experts' },
                { label: 'Tourism & Heritage', href: '/directory/tourism' },
                { label: 'List Your Business', href: '/for-businesses' },
                { label: 'Real Estate Listings', href: '/directory/real-estate' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-[12px] text-gray-400 hover:text-primary font-semibold transition-colors flex items-center gap-1.5 group">
                    <span className="size-1 bg-gray-300 rounded-full group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-secondary">For Businesses</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Add Free Listing', href: '/for-businesses' },
                { label: 'Premium Listings', href: '/for-businesses' },
                { label: 'Get Verified Badge', href: '/for-businesses' },
                { label: 'Advertise with Us', href: '/for-businesses' },
                { label: 'Business Dashboard', href: '/dashboard' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-[12px] text-gray-400 hover:text-primary font-semibold transition-colors flex items-center gap-1.5 group">
                    <span className="size-1 bg-gray-300 rounded-full group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-secondary">Contact</p>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-primary transition-colors font-medium">
                  <Phone className="size-3.5 shrink-0" /> +91 98765 43210
                </a>
                <a href="mailto:hello@kasaragodhub.com" className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-primary transition-colors font-medium">
                  <Mail className="size-3.5 shrink-0" /> hello@kasaragodhub.com
                </a>
                <div className="flex items-start gap-2 text-[12px] text-gray-400 font-medium">
                  <MapPin className="size-3.5 shrink-0 mt-0.5" /> Kasaragod, Kerala – 671121
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase tracking-widest text-secondary">Newsletter</p>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 text-[12px] bg-transparent outline-none text-gray-700"
                />
                <button className="bg-primary text-white text-[11px] font-black px-3 py-2.5 hover:bg-red-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-gray-300">Weekly curations of top local deals.</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[11px] text-gray-300 font-medium">© 2026 KasaragodHub · All rights reserved</p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Use', 'Sitemap', 'Feedback'].map((l) => (
                <Link key={l} to="#" className="text-[11px] text-gray-400 hover:text-primary font-semibold transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-medium">
            <span>Proudly built for</span>
            <span className="font-black text-secondary">Kasaragod District</span>
            <MapPin className="size-3 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
