import { Business } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, MessageSquare, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HorizontalBusinessCardProps {
  business: Business;
  distance?: string | null;
}

export function HorizontalBusinessCard({ business, distance }: HorizontalBusinessCardProps) {
  const priceIndicator = business.price_range ? '$'.repeat(business.price_range) : '$$';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
            <img
              src={business.images?.[0] || business.logo_url}
              alt={business.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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
                    {business.is_verified && (
                      <ShieldCheck className="size-5 text-blue-500 fill-blue-50" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-primary text-primary" />
                      <span className="text-secondary font-bold">{business.rating || 5.0}</span>
                      <span className="opacity-60">({business.review_count || 0})</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-primary font-bold tracking-widest">{priceIndicator}</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {business.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {business.is_verified && (
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold border border-green-100">
                      <CheckCircle2 className="size-3" /> Trusted Hub Partner
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {business.description}
              </p>

              {/* Review Snippet (Simulated) */}
              <div className="bg-gray-50/80 rounded-2xl p-3 mb-4 hidden md:block">
                <p className="text-[11px] text-secondary/70 italic line-clamp-1">
                  "One of the best experiences we've had in {business.location}. Highly recommended for their professional service!"
                </p>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                   <Clock className="size-3" /> OPEN NOW
                </div>
                {distance && (
                  <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                    {distance} km away
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="rounded-xl flex-1 sm:flex-none h-9 border-gray-200">
                  <Phone className="size-3.5 mr-2" /> Call
                </Button>
                <Link to={`/business/${business.slug}`} className="flex-1 sm:flex-none">
                  <Button size="sm" className="rounded-xl w-full h-9 font-bold shadow-lg shadow-primary/20">
                    View Profile
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
