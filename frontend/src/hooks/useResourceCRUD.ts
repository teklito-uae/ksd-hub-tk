import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { ADMIN_RESOURCES, ResourceType } from '@/config/admin-resources';

export function useResourceCRUD(type: ResourceType) {
  const queryClient = useQueryClient();
  const config = ADMIN_RESOURCES[type];

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post(config.endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(`${config.title} successfully initialized`);
    },
    onError: () => toast.error(`Critical failure during ${type} initialization`)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await api.put(`${config.endpoint}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(`${config.title} synchronized with registry`);
    },
    onError: () => toast.error(`Registry synchronization failure for ${type}`)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${config.endpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(`${config.title} purged from system`);
    },
    onError: () => toast.error(`Node purge failed for ${type}`)
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
