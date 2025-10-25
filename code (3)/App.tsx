
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './hooks/useTheme';
import { GalleryProvider } from './hooks/useGallery';
import { UserProvider } from './hooks/useUser';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RenderPage from './pages/RenderPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DeploymentGuidePage from './pages/DeploymentGuidePage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <GalleryProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/render" element={<RenderPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/deployment-guide" element={<DeploymentGuidePage />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </GalleryProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
