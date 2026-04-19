import { Business } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, MessageSquare, CheckCircle2, ShieldCheck, Clock, Crown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HorizontalBusinessCardProps {
  business: Business;
  distance?: string | null;
}

export function HorizontalBusinessCard({ business, distance }: HorizontalBusinessCardProps) {
  const priceIndicator = business.price_range ? '$'.repeat(business.price_range) : '$$';
  
  // Simulated tags/categories for demonstration based on the sample
  const tags = ["Services", "Premium Quality", "+3 More"];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 p-4 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-gray-100 bg-gray-50 flex items-center justify-center">
              <img
                src={business.images?.[0] || business.logo_url || "https://placehold.co/400x400/f8fafc/94a3b8?text=Logo"}
                alt={business.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Badges on Image */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {business.is_featured && (
                <Badge className="bg-primary text-white border-none shadow-lg text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-lg">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-secondary tracking-tight group-hover:text-primary transition-colors">
                      {business.name}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {business.location_city || business.address}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {business.review_count === 0 ? (
                      <span className="text-[11px] text-muted-foreground italic underline decoration-gray-300 underline-offset-2 hover:text-primary cursor-pointer transition-colors">
                        Be the first one to rate
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-secondary font-bold">{business.rating || 5.0}</span>
                        <span className="opacity-60">({business.review_count || 0})</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full">
                       <span className="size-1.5 rounded-full bg-green-500 animate-pulse" /> OPEN NOW
                    </div>

                    {business.is_verified && (
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-[10px] uppercase tracking-wider">
                        <ShieldCheck className="size-3.5 fill-blue-50 text-blue-600" /> VERIFIED
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
                     <Crown className="size-4 text-yellow-500" /> SUPER PREMIUM
                   </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {business.description || `At ${business.name}, our mission is to empower and train the next generation of professionals. We offer a wide range of services tailored to your needs.`} 
                <span className="text-blue-600 cursor-pointer text-xs font-bold ml-1 hover:underline">+More</span>
              </p>

              {/* Tags/Chips section like the sample */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                 <span className="text-[11px] font-medium text-gray-400 mr-1">Categories:</span>
                 {tags.map((tag, idx) => (
                   <span key={idx} className="bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-auto border-t border-gray-50">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="rounded-xl h-10 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold px-4">
                  <Phone className="size-4 mr-2" /> Show Number
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl h-10 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 font-bold px-4">
                  <MessageCircle className="size-4 mr-2" /> WhatsApp
                </Button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link to={`/business/${business.slug}`} className="flex-1 sm:flex-none">
                  <Button variant="outline" size="sm" className="rounded-xl w-full h-10 font-bold border-gray-200 text-secondary hover:bg-gray-50 px-4">
                    View Profile
                  </Button>
                </Link>
                <Link to={`/business/${business.slug}?enquire=true`} className="flex-1 sm:flex-none">
                  <Button size="sm" className="rounded-xl w-full h-10 font-bold bg-yellow-400 hover:bg-yellow-500 text-yellow-950 px-4 shadow-md shadow-yellow-400/20">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
