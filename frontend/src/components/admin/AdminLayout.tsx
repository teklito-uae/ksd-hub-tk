import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import '@/styles/admin.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function AdminLayout() {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('admin-theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  if (loading) return null;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`admin-portal ${theme} flex min-h-screen font-outfit`}>
        <AdminSidebar theme={theme} />
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--admin-bg)] transition-colors duration-500">
          <AdminTopbar theme={theme} setTheme={setTheme} />
          <main className="flex-1 p-8 lg:p-10">
            <Outlet context={{ theme }} />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
