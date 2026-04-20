import { useState, useMemo } from 'react';
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
  Search,
  UserCog,
  ShieldCheck,
  Phone,
  Calendar,
  MoreHorizontal,
  Trash2,
  User as UserIcon
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  created_at: string;
}

const columnHelper = createColumnHelper<UserRecord>();

export default function UserManagement() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get('/admin/users');
      return res.data.data || res.data;
    },
  });

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Identity',
      cell: info => (
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-colors">
            <UserIcon className="size-5 text-zinc-600" />
          </div>
          <div>
            <p className="font-bold text-[14px] text-white tracking-tight">{info.getValue()}</p>
            <p className="text-[11px] font-bold text-zinc-500 tabular-nums lowercase">{info.row.original.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('role', {
      header: 'Privileges',
      cell: info => (
        <Badge
          variant="outline"
          className={cn(
            "uppercase tracking-[0.15em] text-[8px] font-black px-2.5 py-1 rounded-lg border-0",
            info.getValue() === 'admin' ? "bg-red-500/10 text-primary shadow-[0_0_15px_rgba(200,16,46,0.1)]" :
              info.getValue() === 'business' ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
          )}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('phone', {
      header: 'Contact',
      cell: info => (
        <div className="flex items-center gap-2 text-zinc-500">
          <Phone className="size-3 text-zinc-600" />
          <span className="text-[12px] font-bold tabular-nums tracking-tight">{info.getValue() || '---'}</span>
        </div>
      ),
    }),
    columnHelper.accessor('created_at', {
      header: 'Timeline',
      cell: info => (
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="size-3 text-zinc-700" />
          <span className="text-[11px] font-bold tracking-tight">
            {new Date(info.getValue()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
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
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Identity</h1>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">Authorized Personnel Registry</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-12 px-5 flex items-center gap-3">
          <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-300">
            {users.length} Active Records
          </span>
        </div>
      </header>

      <AdminDataTable
        columns={columns as any}
        data={users}
        isLoading={isLoading}
        searchKey="identity"
        onAdd={() => setIsCreating(true)}
        onRowClick={(row) => setSelectedUser(row as UserRecord)}
      />

      <Drawer
        open={!!selectedUser || isCreating}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
            setIsCreating(false);
          }
        }}
        direction="right"
      >
        <DrawerContent className="h-full mt-0 rounded-none border-l border-zinc-900 bg-zinc-950 sm:max-w-xl">
          <AdminDetailPanel
            type="user"
            data={selectedUser || undefined}
            onClose={() => {
              setSelectedUser(null);
              setIsCreating(false);
            }}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
