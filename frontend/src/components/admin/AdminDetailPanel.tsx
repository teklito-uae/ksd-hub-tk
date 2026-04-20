import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  X, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Zap,
  Info,
  CheckCircle2,
  AlertCircle,
  Save,
  Trash2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ADMIN_RESOURCES, ResourceType } from "@/config/admin-resources";
import { useResourceCRUD } from "@/hooks/useResourceCRUD";

interface AdminDetailPanelProps {
  type: ResourceType;
  data?: any; // If undefined, it's 'Create' mode
  onClose: () => void;
}

export function AdminDetailPanel({ type, data, onClose }: AdminDetailPanelProps) {
  const isEdit = !!data;
  const config = ADMIN_RESOURCES[type];
  const { create, update, remove, isCreating, isUpdating, isDeleting } = useResourceCRUD(type);

  // Generate dynamic Zod schema from config
  const schemaFields: any = {};
  config.fields.forEach(f => {
    schemaFields[f.name] = f.validation;
  });
  const schema = z.object(schemaFields);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: data || {}
  });

  useEffect(() => {
    reset(data || {});
  }, [data, reset]);

  const onSubmit = (formData: FormData) => {
    if (isEdit) {
      update({ id: data.id, data: formData });
    } else {
      create(formData);
    }
    // onClose(); // Keep open for confirmation or close on success? 
  };

  const renderField = (field: typeof config.fields[0]) => {
    const error = (errors as any)[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">{field.label}</label>
            <Textarea 
              {...register(field.name as any)}
              className="bg-zinc-900/50 border-zinc-800 rounded-xl min-h-[100px] focus:ring-primary/20 transition-all text-zinc-300"
              placeholder={field.placeholder}
            />
            {error && <p className="text-[10px] text-red-500 font-bold">{error.message}</p>}
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">{field.label}</label>
            <Controller
              name={field.name as any}
              control={control}
              render={({ field: selectField }) => (
                <Select 
                  onValueChange={selectField.onChange} 
                  value={selectField.value}
                >
                  <SelectTrigger className="h-12 bg-zinc-900/50 border-zinc-800 rounded-xl focus:ring-primary/20 text-zinc-300">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                    {field.options?.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="focus:bg-primary/20">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {error && <p className="text-[10px] text-red-500 font-bold">{error.message}</p>}
          </div>
        );
      default:
        return (
          <div key={field.name} className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">{field.label}</label>
            <Input 
              type={field.type}
              {...register(field.name as any)}
              className="h-12 bg-zinc-900/50 border-zinc-800 rounded-xl focus:ring-primary/20 transition-all text-zinc-300"
              placeholder={field.placeholder}
            />
            {error && <p className="text-[10px] text-red-500 font-bold">{error.message}</p>}
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-white font-outfit">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        {/* Header */}
        <div className="relative p-8 pb-12 border-b border-zinc-900 bg-gradient-to-b from-zinc-900/50 to-transparent">
          <button 
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 size-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
          >
            <X className="size-5 text-zinc-500" />
          </button>

          <div className="flex items-center gap-6 mt-4">
            <div className="size-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
              {isEdit ? <Zap className="size-10 text-primary" /> : <Shield className="size-10 text-blue-500" />}
            </div>
            <div>
              <Badge variant="outline" className={cn(
                "mb-3 uppercase tracking-[0.2em] text-[10px] font-black border-zinc-800 px-3 py-1",
                isEdit ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-400"
              )}>
                {isEdit ? 'Modification Protocol' : 'New Registry Node'}
              </Badge>
              <h2 className="text-3xl font-black tracking-tighter leading-none">
                {isEdit ? data.name || data.customer_name : `Create ${type}`}
              </h2>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] mt-2">{config.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          <section className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-900" />
              Registry Parameters
              <div className="h-px flex-1 bg-zinc-900" />
            </h4>
            
            <div className="grid grid-cols-1 gap-8">
              {config.fields.map(field => renderField(field))}
            </div>
          </section>

          {isEdit && (
            <section className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-8 rounded-lg bg-zinc-950 flex items-center justify-center">
                  <Shield className="size-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white tracking-tight">Security Governance</p>
                  <p className="text-[11px] text-zinc-600 font-medium italic">Record created on {new Date(data.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => remove(data.id)}
                  disabled={isDeleting}
                  className="bg-zinc-950 border-zinc-800 text-[11px] font-black uppercase tracking-widest h-10 px-5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  {isDeleting ? <Loader2 className="size-3.5 animate-spin mr-2" /> : <Trash2 className="size-3.5 mr-2" />}
                  Purge Identity
                </Button>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-zinc-900 bg-zinc-950">
          <div className="flex items-center justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="bg-zinc-900 border-zinc-800 text-white font-black text-[11px] uppercase tracking-widest h-12 px-8 rounded-2xl" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isCreating || isUpdating || !isDirty}
              className="bg-primary hover:bg-orange-600 text-white font-black text-[11px] uppercase tracking-widest h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 min-w-[160px]"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              {isEdit ? 'Sync Changes' : 'Initialize Node'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

