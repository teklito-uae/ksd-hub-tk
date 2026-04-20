import { useState, useMemo } from 'react';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Phone,
  User,
  Building2,
  Clock,
  ExternalLink,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { AdminDetailPanel } from '@/components/admin/AdminDetailPanel';
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";

interface InquiryRecord {
  id: number;
  customer_name: string;
  customer_phone: string;
  notes: string;
  status: string;
  created_at: string;
  business: {
    name: string;
    slug: string;
  } | null;
}

const columnHelper = createColumnHelper<InquiryRecord>();

export default function InquiryManagement() {
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: async () => {
      const res = await api.get('/admin/leads');
      return res.data.data || res.data;
    },
  });

  const columns = useMemo(() => [
    columnHelper.accessor('customer_name', {
      header: 'Customer',
      cell: info => (
        <div className="flex flex-col gap-1.5 py-1">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-primary/30 transition-colors">
              <User className="size-3 text-zinc-500" />
            </div>
            <p className="font-bold text-[14px] text-white tracking-tight">{info.getValue()}</p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 ml-8">
            <Phone className="size-3 text-zinc-600" />
            <p className="text-[12px] font-bold tabular-nums tracking-tight">{info.row.original.customer_phone}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('business.name', {
      header: 'Target Entity',
      cell: info => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg group-hover:border-emerald-500/30 transition-colors">
            <Building2 className="size-4 text-zinc-500" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-zinc-300 tracking-tight">{info.getValue() || '---'}</p>
            <a
              href={`/business/${info.row.original.business?.slug}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-[9px] font-black uppercase text-zinc-600 hover:text-primary transition-colors flex items-center gap-1 mt-0.5"
            >
              Directory <ExternalLink className="size-2" />
            </a>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('notes', {
      header: 'Requirements',
      cell: info => (
        <div className="bg-zinc-800/30 rounded-xl p-3 border border-zinc-800/50 group-hover:border-zinc-700 transition-colors max-w-xs">
          <p className="text-[12px] text-zinc-400 line-clamp-2 leading-relaxed italic">
            "{info.getValue() || 'No specific requirements listed.'}"
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Classification',
      cell: info => (
        <Badge
          variant="outline"
          className={cn(
            "uppercase tracking-[0.15em] text-[8px] font-black px-2.5 py-1 rounded-lg border-0",
            info.getValue() === 'new' ? "bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          )}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('created_at', {
      header: 'Timeline',
      cell: info => (
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="size-3 text-zinc-700" />
            <span className="text-[11px] font-bold tabular-nums">
              {new Date(info.getValue()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <div className="text-right">Operations</div>,
      cell: info => (
        <div className="text-right flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all duration-300 active:scale-95"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      ),
    }),
  ], []);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent text-left">Pipeline</h1>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(200,16,46,0.5)]" />
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">Monitoring Customer Interactions</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-12 px-5 flex items-center gap-3">
          <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(200,16,46,0.5)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-300">
            {inquiries.length} Active Leads
          </span>
        </div>
      </header>

      <AdminDataTable
        columns={columns as any}
        data={inquiries}
        isLoading={isLoading}
        searchKey="customer"
        onAdd={() => setIsCreating(true)}
        onRowClick={(row) => setSelectedInquiry(row as InquiryRecord)}
      />

      <Drawer
        open={!!selectedInquiry || isCreating}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedInquiry(null);
            setIsCreating(false);
          }
        }}
        direction="right"
      >
        <DrawerContent className="h-full mt-0 rounded-none border-l border-zinc-900 bg-zinc-950 sm:max-w-xl">
          <AdminDetailPanel
            type="inquiry"
            data={selectedInquiry || undefined}
            onClose={() => {
              setSelectedInquiry(null);
              setIsCreating(false);
            }}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
