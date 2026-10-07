import React from 'react';
import { Car } from '../types/car';
import { useCars } from '../context/CarContext';
import { Heart, Fuel, Gauge, Calendar, ShieldCheck, MapPin, Zap } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { toggleFavorite, isFavorite, formatPrice, setSelectedCarId, setCurrentPage } = useCars();
  const favorite = isFavorite(car.id);

  const handleCardClick = () => {
    setSelectedCarId(car.id);
    setCurrentPage('car-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(car.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/15 flex flex-col justify-between relative"
    >
      {/* Rasmi va Belgilar */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* VIP / Yangi belgilari */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {car.isVIP && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 uppercase tracking-wider">
              <Zap className="w-3 h-3 fill-black" /> VIP
            </span>
          )}
          {car.condition.includes('Yangi') && (
            <span className="bg-emerald-500 text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-lg uppercase tracking-wider">
              Yangi
            </span>
          )}
        </div>

        {/* Sevimlilar tugmasi */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            favorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
          }`}
          title={favorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Joylashuv */}
        <div className="absolute bottom-3 left-3 text-xs text-neutral-300 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{car.location}</span>
        </div>
      </div>

      {/* Ma'lumotlar qismi */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 font-medium">
            <span>{car.brand} • {car.bodyType}</span>
            <span className="text-amber-400/90 font-semibold">{car.seller.type}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            {car.title}
          </h3>

          {/* Texnik xususiyatlar ikonkalari */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/80 my-3 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5 bg-neutral-900/50 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{car.year}-yil</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900/50 p-2 rounded-lg">
              <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900/50 p-2 rounded-lg">
              <Fuel className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{car.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Narx va Sotuvchi */}
        <div className="pt-2 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-medium tracking-wider">Narxi</div>
            <div className="text-xl font-black text-amber-400 tracking-tight">
              {formatPrice(car.priceUSD, car.priceUZS)}
            </div>
          </div>
          <button className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black font-semibold text-xs px-3.5 py-2 rounded-xl transition duration-200 border border-amber-500/30">
            Batafsil
          </button>
        </div>
      </div>
    </div>
  );
};
