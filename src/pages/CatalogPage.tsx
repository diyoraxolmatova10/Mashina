import React, { useState, useMemo } from 'react';
import { useCars } from '../context/CarContext';
import { CarCard } from '../components/CarCard';
import { POPULAR_BRANDS, REGIONS } from '../data/cars';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Grid, 
  ListFilter, 
  ChevronDown,
  Car as CarIcon
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    cars, 
    searchQuery, 
    setSearchQuery, 
    filterBrand, 
    setFilterBrand, 
    filterRegion, 
    setFilterRegion,
    setCurrentPage
  } = useCars();

  const [bodyType, setBodyType] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minYear, setMinYear] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'mileage'>('newest');
  const [onlyVIP, setOnlyVIP] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterBrand('');
    setFilterRegion('');
    setBodyType('');
    setFuelType('');
    setTransmission('');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setOnlyVIP(false);
    setSortBy('newest');
  };

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Qidiruv
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          car.title.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Brend
      if (filterBrand && car.brand.toLowerCase() !== filterBrand.toLowerCase()) {
        return false;
      }

      // Region
      if (filterRegion && filterRegion !== 'Barcha hududlar') {
        if (!car.location.toLowerCase().includes(filterRegion.toLowerCase())) {
          return false;
        }
      }

      // Kuzov
      if (bodyType && car.bodyType !== bodyType) {
        return false;
      }

      // Yoqilg'i
      if (fuelType && car.fuelType !== fuelType) {
        return false;
      }

      // Uzatmalar qutisi
      if (transmission && car.transmission !== transmission) {
        return false;
      }

      // Narx
      if (minPrice && car.priceUSD < Number(minPrice)) return false;
      if (maxPrice && car.priceUSD > Number(maxPrice)) return false;

      // Yil
      if (minYear && car.year < Number(minYear)) return false;

      // VIP
      if (onlyVIP && !car.isVIP) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    cars, 
    searchQuery, 
    filterBrand, 
    filterRegion, 
    bodyType, 
    fuelType, 
    transmission, 
    minPrice, 
    maxPrice, 
    minYear, 
    onlyVIP, 
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Sarlavha qismi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
            Keng tanlov
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Barcha Avtomobillar Katalogi
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Topilgan takliflar: <span className="text-amber-400 font-bold">{filteredCars.length} ta</span> mashina
          </p>
        </div>

        {/* Saralash (Sort) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Filtrlar</span>
          </button>

          <div className="flex items-center gap-2 bg-[#131620] border border-neutral-800 px-3 py-2 rounded-xl text-sm">
            <span className="text-xs text-neutral-400">Saralash:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-[#131620] text-white">Eng yangilari</option>
              <option value="price-asc" className="bg-[#131620] text-white">Narx: Arzondan qimmatga</option>
              <option value="price-desc" className="bg-[#131620] text-white">Narx: Qimmatdan arzonga</option>
              <option value="mileage" className="bg-[#131620] text-white">Kam yurganlari (Probeg)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Asosiy kontent: Chap tomon Filtrlar, O'ng tomon Mashinalar gridi */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTRLAR PANELI (DESKTOP) */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
          <div className="glass-panel p-6 rounded-3xl border-neutral-800/90 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filtrlash</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>
            </div>

            {/* Qidiruv so'zi */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Qidiruv</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Model, brend..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Brend tanlash */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Brend</label>
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Barcha brendlar</option>
                {POPULAR_BRANDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Hudud (Shahar) */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Hudud</label>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Kuzov turi */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Kuzov turi</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Barchasi</option>
                <option value="Sedan">Sedan</option>
                <option value="Krossover / SUV">Krossover / SUV</option>
                <option value="Kupe">Kupe</option>
                <option value="Xetchbek">Xetchbek</option>
                <option value="Pikap">Pikap</option>
              </select>
            </div>

            {/* Yoqilg'i turi */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Yoqilg'i turi</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">Barchasi</option>
                <option value="Benzin">Benzin</option>
                <option value="Elektr">Elektr</option>
                <option value="Gibrid">Gibrid</option>
                <option value="Dizel">Dizel</option>
                <option value="Metan / Propan">Metan / Propan</option>
              </select>
            </div>

            {/* Narx oralig'i (USD) */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">Narx ($ USD)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Dan ($)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="number"
                  placeholder="Gacha ($)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Faqat VIP belgilari */}
            <div className="pt-2 border-t border-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={onlyVIP}
                  onChange={(e) => setOnlyVIP(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-0 accent-amber-500 cursor-pointer"
                />
                <span>Faqat VIP e'lonlar</span>
              </label>
            </div>
          </div>
        </div>

        {/* MASHINALAR GRIDI */}
        <div className="lg:col-span-3">
          {filteredCars.length === 0 ? (
            <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border-dashed border-neutral-700">
              <CarIcon className="w-16 h-16 text-amber-400/50 mx-auto stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-white">Kechirasiz, avtomobil topilmadi</h3>
              <p className="text-neutral-400 text-sm max-w-md mx-auto">
                Qidiruv so'zini yoki tanlangan filtrlarni o'zgartirib ko'ring yoki barcha filtrlarni tozalang.
              </p>
              <button
                onClick={resetFilters}
                className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition shadow-lg shadow-amber-500/20"
              >
                Filtrlarni Qayta O'rnatish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
