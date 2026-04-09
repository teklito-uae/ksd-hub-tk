import { Business } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Star, MapPin, Phone, MessageSquare } from 'lucide-react';

import { Link } from 'react-router-dom';

interface Props {
  business: Business;
}

export function BusinessCard({ business }: Props) {
  return (
    <Card className="overflow-visible group hover:shadow-xl transition-all border border-gray-100 rounded-2xl bg-white">
      <Link to={`/business/${business.slug}`}>
        {/* Image Container - forced fill to top */}
        <div className="h-48 bg-gray-50 relative overflow-hidden rounded-t-2xl border-b border-gray-100 -mt-[1px] -mx-[1px]">
          {business.images?.[0] ? (
            <img
              src={business.images[0]}
              alt={business.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <span className="text-5xl font-black text-gray-200/50">{business.name[0]}</span>
            </div>
          )}
          {business.is_featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-lg shadow-md z-10">
              Featured
            </Badge>
          )}
        </div>

        {/* Logo overlay - moved outside overflow-hidden to prevent clipping */}
        <div className="relative">
          {business.logo_url && (
            <div className="absolute -top-6 left-4 z-20">
              <img
                src={business.logo_url}
                alt={`${business.name} logo`}
                className="size-12 rounded-xl border-2 border-white object-cover shadow-lg bg-white"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <CardHeader className="px-4 pt-8 pb-1 relative z-10">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base font-bold text-secondary line-clamp-1 leading-tight group-hover:text-primary transition-colors">
              {business.name}
            </CardTitle>
            <div className="flex items-center gap-1 text-primary shrink-0">
              <Star className="size-3.5 fill-current" />
              <span className="text-sm font-bold">{business.rating}</span>
              <span className="text-xs text-muted-foreground">({business.review_count})</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="text-xs line-clamp-1">{business.location}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{business.description}</p>
        </CardContent>
      </Link>

      <CardFooter className="px-4 pb-4 pt-1 mt-2 grid grid-cols-2 gap-2 relative z-10">
        <a
          href={`tel:${business.phone}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-xl text-xs h-9 flex items-center justify-center')}
        >
          <Phone className="size-3.5 mr-1.5" /> Call
        </a>
        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'rounded-xl text-xs h-9 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 flex items-center justify-center'
          )}
        >
          <MessageSquare className="size-3.5 mr-1.5" /> WhatsApp
        </a>
      </CardFooter>
    </Card>
  );
}
