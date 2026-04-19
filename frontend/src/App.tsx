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
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
