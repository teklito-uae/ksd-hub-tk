import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { ForBusinessesPage } from '@/pages/ForBusinessesPage';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { BusinessProfilePage } from '@/pages/BusinessProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';
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
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
