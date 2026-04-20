import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import { Skeleton } from '@/components/ui/skeleton';

// ── Lazy-loaded Pages (Code Splitting) ──
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const ForBusinessesPage = lazy(() => import('@/pages/ForBusinessesPage'));
const DirectoryPage = lazy(() => import('@/pages/DirectoryPage'));
const BusinessProfilePage = lazy(() => import('@/pages/BusinessProfilePage'));
const ProsPage = lazy(() => import('@/pages/ProsPage'));
const ExpertProfilePage = lazy(() => import('@/pages/ExpertProfilePage'));
const SupportPage = lazy(() => import('@/pages/SupportPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const BusinessDashboard = lazy(() => import('@/pages/dashboard/BusinessDashboard'));
const ProDashboard = lazy(() => import('@/pages/dashboard/ProDashboard'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('@/pages/admin/UserManagement'));
const AdminTraffic = lazy(() => import('@/pages/admin/AdminTraffic'));
const ListingApproval = lazy(() => import('@/pages/admin/ListingApproval'));
const InquiryManagement = lazy(() => import('@/pages/admin/InquiryManagement'));
const BlogManagement = lazy(() => import('@/pages/admin/BlogManagement'));
const SystemSettings = lazy(() => import('@/pages/admin/SystemSettings'));

import { AdminLayout } from '@/components/admin/AdminLayout';

// ── Page Loading Fallback ──
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48 mx-auto rounded-xl" />
        <Skeleton className="h-4 w-64 mx-auto rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-48 w-full rounded-2xl mt-4" />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><LandingPage /></Suspense>} />
          <Route path="/for-businesses" element={<Suspense fallback={<PageLoader />}><ForBusinessesPage /></Suspense>} />
          <Route path="/directory" element={<Suspense fallback={<PageLoader />}><DirectoryPage /></Suspense>} />
          <Route path="/directory/:slug" element={<Suspense fallback={<PageLoader />}><DirectoryPage /></Suspense>} />
          <Route path="/business/:slug" element={<Suspense fallback={<PageLoader />}><BusinessProfilePage /></Suspense>} />
          <Route path="/experts" element={<Suspense fallback={<PageLoader />}><ProsPage /></Suspense>} />
          <Route path="/expert/:slug" element={<Suspense fallback={<PageLoader />}><ExpertProfilePage /></Suspense>} />
          <Route path="/support" element={<Suspense fallback={<PageLoader />}><SupportPage /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense>} />
        </Route>
        
        {/* Dashboards — No global layout (has its own Sidebar) */}
        <Route path="/dashboard/business" element={<Suspense fallback={<PageLoader />}><BusinessDashboard /></Suspense>} />
        <Route path="/dashboard/pro" element={<Suspense fallback={<PageLoader />}><ProDashboard /></Suspense>} />
        
        {/* Super Admin Portal */}
        <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
        
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
          <Route path="/admin/users" element={<Suspense fallback={<PageLoader />}><UserManagement /></Suspense>} />
          <Route path="/admin/traffic" element={<Suspense fallback={<PageLoader />}><AdminTraffic /></Suspense>} />
          <Route path="/admin/businesses" element={<Suspense fallback={<PageLoader />}><ListingApproval /></Suspense>} />
          <Route path="/admin/pros" element={<Suspense fallback={<PageLoader />}><ListingApproval /></Suspense>} />
          <Route path="/admin/leads" element={<Suspense fallback={<PageLoader />}><InquiryManagement /></Suspense>} />
          <Route path="/admin/blog" element={<Suspense fallback={<PageLoader />}><BlogManagement /></Suspense>} />
          <Route path="/admin/settings" element={<Suspense fallback={<PageLoader />}><SystemSettings /></Suspense>} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
