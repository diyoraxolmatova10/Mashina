import React from 'react';
import { useCars } from '../context/CarContext';
import { CarCard } from '../components/CarCard';
import { Heart, Search } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { cars, favorites, setCurrentPage } = useCars();

  const favoriteCars = cars.filter((c) => favorites.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Sarlavha */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
            Shaxsiy To'plam
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span>Sevimlilar Ro'yxati</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Siz saqlagan avtomobillar soni: <span className="text-amber-400 font-bold">{favoriteCars.length} ta</span>
          </p>
        </div>

        {favoriteCars.length > 0 && (
          <button
            onClick={() => setCurrentPage('catalog')}
            className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition"
          >
            + Ko'proq mashina ko'rish
          </button>
        )}
      </div>

      {/* Kontent */}
      {favoriteCars.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border-dashed border-neutral-800">
          <Heart className="w-16 h-16 text-neutral-600 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Hozircha sevimlilar ro'yxati bo'sh</h3>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">
            Sizga yoqqan avtomobillarni yo'qotib qo'ymaslik uchun yurakcha belgisini bosing va shu yerda taqqoslang.
          </p>
          <button
            onClick={() => setCurrentPage('catalog')}
            className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition shadow-lg shadow-amber-500/20"
          >
            Avtomobillar Katalogiga O'tish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};
