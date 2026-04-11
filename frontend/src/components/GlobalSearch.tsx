import { useState, useEffect } from "react";
import { Search, ArrowRight, Building2, Briefcase, Hash, TrendingUp, Map, User } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { useUIStore } from "@/store/useUIStore";

const TRENDING = [
  { label: "Restaurants in Uppala", icon: TrendingUp, q: "restaurants uppala" },
  { label: "Electricians near me", icon: TrendingUp, q: "electrician" },
  { label: "Wedding Venues", icon: TrendingUp, q: "wedding venue" },
  { label: "Real Estate Kasaragod", icon: TrendingUp, q: "real estate" },
];

const QUICK_LINKS = [
  { label: "Business Directory", href: "/directory", icon: Building2 },
  { label: "Hire Professionals", href: "/experts", icon: Briefcase },
  { label: "Browse Categories", href: "/directory", icon: Hash },
  { label: "Explore Map", href: "/directory", icon: Map },
];

export function GlobalSearch() {
  const { searchOpen: open, setSearchOpen: setOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    businesses: any[];
    pros: any[];
    categories: any[];
  }>({ businesses: [], pros: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults({ businesses: [], pros: [], categories: [] });
      setLoading(false);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const [bizRes, proRes, catRes] = await Promise.all([
          api.get(`/businesses?search=${query}`),
          api.get(`/professionals?search=${query}`),
          api.get(`/categories`) 
        ]);
        
        setResults({
          businesses: Array.isArray(bizRes.data) ? bizRes.data.slice(0, 4) : [],
          pros: Array.isArray(proRes.data) ? proRes.data.slice(0, 3) : [],
          categories: Array.isArray(catRes.data) 
            ? catRes.data.filter((c: any) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
            : []
        });
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setQuery("");
      setResults({ businesses: [], pros: [], categories: [] });
    }
  };

  const { businesses: matchedBusinesses, pros: matchedPros, categories: matchedCategories } = results;

  const goTo = (href: string) => {
    navigate(href);
    handleOpenChange(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground bg-gray-50 hover:bg-white hover:border-primary/30 border border-gray-200/80 rounded-xl transition-all md:w-64 outline-none group shadow-sm shadow-black/[0.02]"
        aria-label="Open search"
      >
        <Search className="size-4 text-gray-400 shrink-0 group-hover:text-primary transition-colors" />
        <span className="flex-1 text-left hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider opacity-60">Search anything...</span>
        <span className="flex-1 text-left inline-block sm:hidden text-[11px] font-bold uppercase tracking-wider opacity-60">Search...</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1.5 font-mono text-[10px] font-bold text-gray-400 shadow-sm">
          ⌘K
        </kbd>
      </button>

      <CommandDialog 
        open={open} 
        onOpenChange={handleOpenChange}
        className="sm:max-w-2xl top-[15%] translate-y-0" 
      >
        <Command shouldFilter={false} className="rounded-xl overflow-hidden border-none shadow-2xl">
          <CommandInput
            placeholder="Search businesses, experts, categories..."
            value={query}
            onValueChange={setQuery}
            className="h-14 px-4 text-base border-b border-gray-100"
          />
          <CommandList className="max-h-[70vh] md:max-h-[450px]">
            <CommandEmpty>
              <div className="py-12 text-center">
                <div className="size-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-6 text-gray-300" />
                </div>
                <p className="text-sm font-black text-secondary">No results for "{query}"</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto leading-relaxed">Try searching for local services like "Biryani", "Bekal Fort", or "Electrician"</p>
              </div>
            </CommandEmpty>

            {!query && (
              <>
                <CommandGroup heading="Trending Searches">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                    {TRENDING.map((t) => (
                      <CommandItem
                        key={t.q}
                        onSelect={() => goTo(`/directory?q=${encodeURIComponent(t.q)}`)}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl hover:bg-primary/5 group"
                      >
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <t.icon className="size-3.5 text-primary" />
                        </div>
                        <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors">{t.label}</span>
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>

                <CommandSeparator className="my-2" />

                <CommandGroup heading="Quick Navigate">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
                    {QUICK_LINKS.map((link) => (
                      <CommandItem
                        key={link.href + link.label}
                        onSelect={() => goTo(link.href)}
                        className="flex flex-col items-center justify-center gap-2 p-4 cursor-pointer rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all group text-center"
                      >
                        <div className="size-9 rounded-full bg-secondary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <link.icon className="size-4 text-secondary/60 group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] font-black text-secondary tracking-tight">{link.label}</span>
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
              </>
            )}

            {query && (
              <div className="p-2 space-y-4">
                {matchedCategories.length > 0 && (
                  <CommandGroup heading="Categories">
                    {matchedCategories.map((cat) => (
                      <CommandItem
                        key={cat.id}
                        onSelect={() => goTo(`/directory?category=${cat.id}`)}
                        className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-xl data-selected:bg-primary/5 group"
                      >
                        <div className="size-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Hash className="size-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-secondary">{cat.name}</span>
                        <Badge className="ml-auto bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest">Category</Badge>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {matchedBusinesses.length > 0 && (
                  <CommandGroup heading="Businesses">
                    {matchedBusinesses.map((biz) => (
                      <CommandItem
                        key={biz.id}
                        onSelect={() => goTo(`/business/${biz.slug}`)}
                        className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-xl data-selected:bg-primary/5 group"
                      >
                        <div className="size-10 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                          {biz.logo_path || biz.logo_url
                            ? <img src={biz.logo_path || biz.logo_url} alt={biz.name} className="w-full h-full object-cover" />
                            : <Building2 className="size-5 text-gray-400 m-auto" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-secondary truncate">{biz.name}</p>
                          <div className="flex items-center gap-2">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider truncate">{biz.location_city || biz.location}</p>
                             {biz.is_verified ? <Badge className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase tracking-widest px-1.5 h-4">Verified</Badge> : null}
                          </div>
                        </div>
                        <ArrowRight className="size-3.5 text-gray-200 group-hover:text-primary transition-colors" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {matchedPros.length > 0 && (
                  <CommandGroup heading="Service Pros">
                    {matchedPros.map((pro) => (
                      <CommandItem
                        key={pro.id}
                        onSelect={() => goTo(`/expert/${pro.slug}`)}
                        className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-xl data-selected:bg-primary/5 group"
                      >
                        <div className="size-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                          <img src={pro.avatar_path || pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-secondary truncate">{pro.name}</p>
                          <div className="flex items-center gap-1.5">
                             <p className="text-[10px] font-black text-primary uppercase tracking-widest">{pro.profession}</p>
                          </div>
                        </div>
                        <Badge className="bg-secondary/10 text-secondary border-none text-[9px] font-black uppercase tracking-widest px-1.5 h-4">Expert</Badge>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {(matchedBusinesses.length > 0 || matchedPros.length > 0 || matchedCategories.length > 0) && (
                  <CommandItem
                    onSelect={() => goTo(`/directory?q=${encodeURIComponent(query)}`)}
                    className="flex items-center justify-center gap-2 py-4 cursor-pointer text-primary bg-primary/5 rounded-xl font-black text-xs uppercase tracking-widest mt-2"
                  >
                    View all results for "{query}" <ArrowRight className="size-3.5" />
                  </CommandItem>
                )}
              </div>
            )}
          </CommandList>

          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1.5">
                <kbd className="inline-flex h-4 items-center rounded border border-gray-200 bg-white px-1 font-mono text-[9px]">↑↓</kbd>
                Navigate
              </span>
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1.5">
                <kbd className="inline-flex h-4 items-center rounded border border-gray-200 bg-white px-1 font-mono text-[9px]">↵</kbd>
                Select
              </span>
            </div>
            <span className="text-[10px] font-black text-secondary tracking-tight">Kasaragod<span className="text-primary italic">Hub</span></span>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
}
