import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { PageType } from '../types/car';
import { 
  Car, 
  Search, 
  PlusCircle, 
  Heart, 
  Calculator, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, favorites, currency, setCurrency } = useCars();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Car className="w-4 h-4" /> },
    { id: 'catalog', label: 'Avtomobillar', icon: <Search className="w-4 h-4" /> },
    { id: 'calculator', label: 'Kredit & Baholash', icon: <Calculator className="w-4 h-4" /> },
    { id: 'favorites', label: 'Sevimlilar', icon: <Heart className="w-4 h-4" /> },
    { id: 'about', label: 'Biz haqimizda', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  const handleNav = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0c10]/85 border-b border-amber-500/20 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition duration-300">
              <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-wider gold-gradient-text">
                AVTO<span className="text-white">PREMIUM</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 -mt-1 font-semibold">
                O'zbekiston Elita Avtobozori
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131620]/70 p-1.5 rounded-full border border-neutral-800">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.id === 'favorites' && favorites.length > 0 && (
                    <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                      active ? 'bg-black text-amber-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {favorites.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Valyuta tanlash */}
            <div className="flex items-center bg-[#131620] border border-neutral-800 rounded-lg p-1 text-xs font-semibold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('UZS')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  currency === 'UZS'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                UZS (so'm)
              </button>
            </div>

            {/* Avtomobil Sotish Tugmasi */}
            <button
              onClick={() => handleNav('sell')}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
              <span>E'lon Berish</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNav('sell')}
              className="text-xs font-bold bg-amber-500 text-black px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Sotish</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e111a] border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-xs text-neutral-400 font-medium">Valyuta:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`text-xs px-3 py-1 rounded font-bold ${currency === 'USD' ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-300'}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('UZS')}
                className={`text-xs px-3 py-1 rounded font-bold ${currency === 'UZS' ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-300'}`}
              >
                UZS (so'm)
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  currentPage === item.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.id === 'favorites' && favorites.length > 0 && (
                  <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <a 
              href="tel:+998712000000" 
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-amber-400/80 bg-amber-500/10 rounded-lg border border-amber-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Yordam: +998 (71) 200-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
