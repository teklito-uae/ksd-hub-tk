import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Store,
  Briefcase,
  MapPin,
  Tag,
  Search,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

import { AdminDataTable } from '@/components/admin/AdminDataTable';

import { AdminDetailPanel } from '@/components/admin/AdminDetailPanel';
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";

interface ListingItem {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  status: 'pending' | 'approved' | 'suspended';
  category: { name: string } | null;
  place: { name: string } | null;
}

const columnHelper = createColumnHelper<ListingItem>();

export default function ListingApproval() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const type = location.pathname.includes('businesses') ? 'business' : 'pro';
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['admin-listings', type],
    queryFn: async () => {
      const endpoint = type === 'business' ? '/businesses' : '/professionals';
      const res = await api.get(endpoint);
      return res.data.data || res.data;
    },
  });

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Identity',
      cell: info => (
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-zinc-600 transition-colors">
            {info.row.original.logo ? (
              <img src={info.row.original.logo} alt="" className="size-full object-cover" />
            ) : (
              type === 'business' ? <Store className="size-5 text-zinc-500" /> : <Briefcase className="size-5 text-zinc-500" />
            )}
          </div>
          <div>
            <p className="font-bold text-[14px] text-white tracking-tight">{info.getValue()}</p>
            <a
              href={`/${type}/${info.row.original.slug}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-[9px] font-black uppercase text-zinc-600 hover:text-primary transition-colors flex items-center gap-1 mt-1"
            >
              Live Node <ExternalLink className="size-2" />
            </a>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('category.name', {
      header: 'Sector',
      cell: info => (
        <div className="flex items-center gap-2 text-zinc-400">
          <Tag className="size-3 text-zinc-700" />
          <span className="text-[11px] font-black uppercase tracking-widest bg-zinc-800/50 px-2.5 py-1 rounded-lg border border-zinc-800/50">
            {info.getValue() || 'General'}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Integrity',
      cell: info => (
        <Badge
          variant="outline"
          className={cn(
            "uppercase tracking-[0.15em] text-[8px] font-black px-2.5 py-1 rounded-lg border-0",
            info.getValue() === 'approved'
              ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              : "bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          )}
        >
          {info.getValue() === 'approved' ? 'Live' : 'Draft'}
        </Badge>
      ),
    }),
    columnHelper.accessor('place.name', {
      header: 'Location',
      cell: info => (
        <div className="flex items-center gap-2 text-zinc-500">
          <MapPin className="size-3 text-zinc-700" />
          <span className="text-[11px] font-bold tracking-tight">{info.getValue() || 'Kasaragod'}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <div className="text-right">Verification</div>,
      cell: info => (
        <div className="text-right" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-xl h-10 px-5 font-black text-[11px] uppercase tracking-widest gap-2.5 transition-all duration-300 active:scale-95",
              info.row.original.status === 'approved'
                ? "text-red-400 hover:text-red-500 hover:bg-red-500/10"
                : "text-emerald-400 hover:text-emerald-500 hover:bg-emerald-500/10"
            )}
          >
            {info.row.original.status === 'approved' ? (
              <><XCircle className="size-4" /> De-Activate</>
            ) : (
              <><CheckCircle2 className="size-4" /> Grant Access</>
            )}
          </Button>
        </div>
      ),
    }),
  ], [type]);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {type === 'business' ? 'Inventory' : 'Expertise'}
          </h1>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(200,16,46,0.5)]" />
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">Content Verification Queue</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-12 px-5 flex items-center gap-3">
          <div className={`size-2 rounded-full animate-pulse ${type === 'business' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`} />
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-300">
            {listings.length} Records
          </span>
        </div>
      </header>

      <AdminDataTable
        columns={columns} 
        data={listings}
        isLoading={isLoading}
        searchKey="name"
        onAdd={() => setIsCreating(true)}
        onRowClick={(row) => setSelectedListing(row as ListingItem)}
      />

      <Drawer
        open={!!selectedListing || isCreating}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedListing(null);
            setIsCreating(false);
          }
        }}
        direction="right"
      >
        <DrawerContent className="h-full mt-0 rounded-none border-l border-zinc-900 bg-zinc-950 sm:max-w-xl">
          <AdminDetailPanel
            type={type}
            data={selectedListing || undefined}
            onClose={() => {
              setSelectedListing(null);
              setIsCreating(false);
            }}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
