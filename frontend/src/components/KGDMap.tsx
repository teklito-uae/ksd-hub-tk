import { Map, Marker, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Business } from '@/types';
import { Link } from 'react-router-dom';

interface Props {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  businesses?: Business[];
  className?: string;
  businessName?: string;
  logoUrl?: string;
  interactive?: boolean;
}

export function KGDMap({ 
  latitude, 
  longitude, 
  zoom = 12, 
  businesses = [],
  className, 
  businessName,
  logoUrl,
  interactive = true
}: Props) {
  // Center on Kasaragod Town if no specific coords provided
  const centerLat = latitude || (businesses.length > 0 ? businesses[0].latitude! : 12.4998);
  const centerLng = longitude || (businesses.length > 0 ? businesses[0].longitude! : 74.9892);

  return (
    <div className={cn("relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-inner", className)}>
      <Map
        initialViewState={{
          longitude: centerLng,
          latitude: centerLat,
          zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        attributionControl={false}
        scrollZoom={interactive}
        dragPan={interactive}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        
        {/* Render Single Business Marker */}
        {!businesses.length && latitude && longitude && (
          <Marker longitude={longitude} latitude={latitude} anchor="bottom">
             <CustomPin name={businessName} logo={logoUrl} />
          </Marker>
        )}

        {/* Render Multiple Business Markers */}
        {businesses.filter(b => b.latitude && b.longitude).map((b) => (
          <Marker key={b.id} longitude={b.longitude!} latitude={b.latitude!} anchor="bottom">
             <Link to={`/business/${b.slug}`}>
                <CustomPin name={b.name} logo={b.logo_url} />
             </Link>
          </Marker>
        ))}
      </Map>
      
      {/* Branding Overlay */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-2 py-1 rounded-md border border-gray-200 shadow-sm flex items-center gap-1.5">
           <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Maps Powered by</span>
           <span className="text-[8px] font-extrabold text-secondary">OpenFreeMap</span>
        </div>
      </div>
    </div>
  );
}

function CustomPin({ name, logo }: { name?: string, logo?: string }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping pointer-events-none opacity-50" />
      <div className="relative flex flex-col items-center">
        <div className="size-10 bg-white rounded-xl shadow-xl border-2 border-primary flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
          {logo ? (
            <img src={logo} className="w-full h-full object-cover" alt="Logo" />
          ) : (
            <MapPin className="size-5 text-primary" />
          )}
        </div>
        <div className="w-2.5 h-2.5 bg-primary rotate-45 -mt-1.5 shadow-lg" />
        
        <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2 pointer-events-none z-50">
          <div className="bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl border border-white/10">
            {name || 'Business Location'}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}

