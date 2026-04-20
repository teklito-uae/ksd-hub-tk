import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  SlidersHorizontal,
  Plus,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  searchKey?: string;
  onAdd?: () => void;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
}

export function AdminDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onAdd,
  onRowClick,
  isLoading = false,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 max-w-sm">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder={searchKey ? `Search ${searchKey}...` : "Search all records..."}
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="h-11 bg-zinc-900/50 border-zinc-800 pl-10 rounded-xl text-sm focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>
          <Button variant="outline" className="h-11 px-4 border-zinc-800 bg-zinc-900/50 rounded-xl gap-2 text-zinc-400">
            <SlidersHorizontal className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Filters</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-4 border-zinc-800 bg-zinc-900/50 rounded-xl gap-2 text-zinc-400">
            <Download className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Export</span>
          </Button>
          {onAdd && (
            <Button onClick={onAdd} className="h-11 px-6 bg-primary hover:bg-orange-600 rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Plus className="size-4" />
              <span className="text-sm font-bold tracking-tight">Create New</span>
            </Button>
          )}
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-2xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-zinc-800/50 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[9px] py-6 px-8">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest text-center">Retrieving Data Assets...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "border-zinc-800/40 hover:bg-white/[0.02] transition-colors group",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-5 px-8">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <p className="text-zinc-500 text-[13px] font-medium">No results found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-500">
          <span>Page</span>
          <span className="text-white">{table.getState().pagination.pageIndex + 1}</span>
          <span>of</span>
          <span className="text-white">{table.getPageCount()}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-zinc-800/50 mr-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Rows per page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black px-2 py-1 outline-none focus:border-primary/50 transition-colors"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 w-9 p-0 rounded-xl bg-zinc-900/50 border-zinc-800 transition-all active:scale-95 disabled:opacity-30"
            >
              <ChevronLeft className="size-4 text-zinc-400" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 w-9 p-0 rounded-xl bg-zinc-900/50 border-zinc-800 transition-all active:scale-95 disabled:opacity-30"
            >
              <ChevronRight className="size-4 text-zinc-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
