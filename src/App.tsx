import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { ForBusinessesPage } from '@/pages/ForBusinessesPage';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { BusinessProfilePage } from '@/pages/BusinessProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProsPage } from '@/pages/ProsPage';
import { ExpertProfilePage } from '@/pages/ExpertProfilePage';
import { SupportPage } from '@/pages/SupportPage';
import { LoginPage } from '@/pages/LoginPage';
import { BusinessDashboard } from '@/pages/dashboard/BusinessDashboard';
import { ProDashboard } from '@/pages/dashboard/ProDashboard';
import { Layout } from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/for-businesses" element={<ForBusinessesPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/business/:slug" element={<BusinessProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/experts" element={<ProsPage />} />
          <Route path="/expert/:slug" element={<ExpertProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
        
        {/* Dashboards — No global layout (has its own Sidebar) */}
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route path="/dashboard/pro" element={<ProDashboard />} />
      </Routes>



      <Toaster />
    </>
  );
}

export default App;
