import React from 'react';
import { CarProvider, useCars } from './context/CarContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CarDetailsPage } from './pages/CarDetailsPage';
import { SellCarPage } from './pages/SellCarPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { currentPage } = useCars();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <CatalogPage />}
        {currentPage === 'car-details' && <CarDetailsPage />}
        {currentPage === 'sell' && <SellCarPage />}
        {currentPage === 'calculator' && <CalculatorPage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <CarProvider>
      <AppContent />
    </CarProvider>
  );
}

export default App;
