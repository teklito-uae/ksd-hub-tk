import { useState, useMemo } from 'react';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import {
  FileText,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  Eye,
  MessageCircle
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { AdminDetailPanel } from '@/components/admin/AdminDetailPanel';
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  views: number;
  comments_count: number;
  created_at: string;
}

const columnHelper = createColumnHelper<BlogPost>();

export default function BlogManagement() {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: async () => {
      const res = await api.get('/admin/blog');
      return res.data.data || res.data;
    },
  });

  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Article',
      cell: info => (
        <div className="flex flex-col gap-1 py-1">
          <p className="font-bold text-[14px] text-white tracking-tight leading-tight">{info.getValue()}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-black uppercase text-zinc-600 flex items-center gap-1">
              <Calendar className="size-2.5" /> {new Date(info.row.original.created_at).toLocaleDateString()}
            </span>
            <a
              href={`/blog/${info.row.original.slug}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-[9px] font-black uppercase text-zinc-500 hover:text-primary transition-colors flex items-center gap-1"
            >
              Public Link <ExternalLink className="size-2" />
            </a>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Visibility',
      cell: info => (
        <Badge
          variant="outline"
          className={cn(
            "uppercase tracking-[0.15em] text-[8px] font-black px-2.5 py-1 rounded-lg border-0",
            info.getValue() === 'published' ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-500"
          )}
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('views', {
      header: 'Impact',
      cell: info => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Eye className="size-3 text-zinc-600" />
            <span className="text-[11px] font-bold tabular-nums">{info.getValue() || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MessageCircle className="size-3 text-zinc-600" />
            <span className="text-[11px] font-bold tabular-nums">{info.row.original.comments_count || 0}</span>
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <div className="text-right">Operations</div>,
      cell: info => (
        <div className="text-right" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
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
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Blog Engine</h1>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">Content Dissemination Management</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-2xl h-12 px-5 flex items-center gap-3">
          <div className="size-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-300">
            {posts.length} Knowledge Nodes
          </span>
        </div>
      </header>

      <AdminDataTable
        columns={columns} 
        data={posts}
        isLoading={isLoading}
        searchKey="title"
        onAdd={() => setIsCreating(true)}
        onRowClick={(row) => setSelectedPost(row as BlogPost)}
      />

      <Drawer
        open={!!selectedPost || isCreating}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPost(null);
            setIsCreating(false);
          }
        }}
        direction="right"
      >
        <DrawerContent className="h-full mt-0 rounded-none border-l border-zinc-900 bg-zinc-950 sm:max-w-xl">
          <div className="p-8 text-center mt-20">
            <FileText className="size-20 text-zinc-800 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-2">CMS Advanced Editor</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">This module is currently being synchronized with the Rich Text Core. CRUD capabilities will be initialized in the next cycle.</p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
