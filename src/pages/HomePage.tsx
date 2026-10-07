import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { CarCard } from '../components/CarCard';
import { POPULAR_BRANDS } from '../data/cars';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  BadgePercent, 
  Zap, 
  ArrowRight, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Award,
  CircleCheckBig
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { cars, setCurrentPage, setSelectedCarId, setFilterBrand, setSearchQuery } = useCars();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState('');

  const vipCars = cars.filter((c) => c.isVIP);
  const recentCars = cars.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch) setSearchQuery(localSearch);
    if (selectedBrand) setFilterBrand(selectedBrand);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandSelect = (brandName: string) => {
    setFilterBrand(brandName);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-amber-300 shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>O'zbekistondagi 1-Raqamli Premium Avtosalon & Bozor</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Orzuingizdagi Mashinani <br />
              <span className="gold-gradient-text">Kafolat Va Hashamat</span> Bilan Toping
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Tekshirilgan VIP avtomobillar, qulay kredit stavkalari va 1 kunda rasmiylashtirish. Minglab xaridorlar va nufuzli avtodilerlar ishonchi.
            </p>

            {/* Tezkor Qidiruv Paneli */}
            <div className="pt-6">
              <form
                onSubmit={handleSearchSubmit}
                className="glass-panel p-3 sm:p-4 rounded-3xl border border-amber-500/30 shadow-2xl max-w-4xl mx-auto glow-gold-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                  {/* Qidiruv matni */}
                  <div className="bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800">
                    <label className="text-[11px] font-semibold text-amber-400 block mb-1 uppercase tracking-wider">
                      Model yoki kalit so'z
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Mercedes G63, BYD..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-neutral-500"
                    />
                  </div>

                  {/* Marka tanlash */}
                  <div className="bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800">
                    <label className="text-[11px] font-semibold text-amber-400 block mb-1 uppercase tracking-wider">
                      Brend / Marka
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#131620] text-neutral-400">Barcha brendlar</option>
                      {POPULAR_BRANDS.map((b) => (
                        <option key={b.name} value={b.name} className="bg-[#131620] text-white">
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Kuzov turi */}
                  <div className="bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800">
                    <label className="text-[11px] font-semibold text-amber-400 block mb-1 uppercase tracking-wider">
                      Kuzov turi
                    </label>
                    <select
                      value={selectedBodyType}
                      onChange={(e) => setSelectedBodyType(e.target.value)}
                      className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#131620] text-neutral-400">Barchasi</option>
                      <option value="Sedan" className="bg-[#131620] text-white">Sedan</option>
                      <option value="Krossover / SUV" className="bg-[#131620] text-white">Krossover / SUV</option>
                      <option value="Kupe" className="bg-[#131620] text-white">Kupe</option>
                      <option value="Elektr" className="bg-[#131620] text-white">Elektr transport</option>
                    </select>
                  </div>

                  {/* Qidirish tugmasi */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-2xl flex items-center justify-center gap-2 p-3 shadow-lg shadow-amber-500/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 text-base"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>Mashina Qidirish</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Statistika ko'rsatkichlari */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
              <div className="glass-panel p-4 rounded-2xl border-neutral-800/80 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">2,500+</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Faol E'lonlar</div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border-neutral-800/80 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Yuridik Kafolat</div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border-neutral-800/80 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">12 ta</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Hamkor Banklar</div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border-neutral-800/80 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9 ★</div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">Mijozlar Bahosi</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OMMABOP BRENDLAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
              Eng Nufuzli Ishlab Chiqaruvchilar
            </span>
            <h2 className="text-3xl font-bold text-white">Brendlar Bo'yicha Tanlang</h2>
          </div>
          <button
            onClick={() => {
              setFilterBrand('');
              setCurrentPage('catalog');
            }}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Barcha brendlarni ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {POPULAR_BRANDS.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleBrandSelect(brand.name)}
              className="glass-panel glass-panel-hover p-4 rounded-2xl text-center cursor-pointer flex flex-col items-center justify-center gap-2 group"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {brand.icon}
              </span>
              <div className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                {brand.name}
              </div>
              <div className="text-[11px] text-neutral-400">
                {brand.count} ta e'lon
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VIP VA PRESTIJ AVTOMOBILLAR */}
      {vipCars.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#131622] to-[#0d0e14] border border-amber-500/30 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" /> VIP Kolleksiya
                </div>
                <h2 className="text-3xl font-extrabold text-white">Eksklyuziv Va Lyuks Avtomobillar</h2>
                <p className="text-sm text-neutral-400 mt-1">To'liq opsiyali, kafolatlangan va zudlik bilan rasmiylashtirishga tayyor mashinalar</p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('catalog');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Katalogga O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {vipCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SO'NGGI QO'SHILGAN E'LONLAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
              Eng So'nggi Takliflar
            </span>
            <h2 className="text-3xl font-bold text-white">Yangi Joylangan Avtomobillar</h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('catalog');
            }}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Barcha avtomobillarni ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 5. AVTOMOBIL SOTISH BANNERI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel bg-gradient-to-r from-amber-950/60 via-neutral-900 to-amber-950/40 rounded-3xl p-8 sm:p-14 border border-amber-500/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
              Tezkor Va Foydali Sotish
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Avtomobilingizni Bozor Narxida <span className="gold-gradient-text">Tez Va Xavfsiz</span> Soting!
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              E'loningizni 2 daqiqada joylashtiring. Bizning platformamiz orqali har kuni 50,000 dan ortiq real xaridorlar avtomobil qidirmoqda.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                <span>Tekin e'lon joylashtirish</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <CircleCheckBig className="w-4 h-4 text-emerald-400" />
                <span>Tezkor xaridorlar bazasi</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 text-base cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Avtomobil Sotish (E'lon Berish)</span>
            </button>
            <button
              onClick={() => {
                setCurrentPage('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-neutral-900/80 hover:bg-neutral-800 text-white font-bold px-6 py-4 rounded-2xl border border-neutral-700 transition cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <span>Narxini Baholash</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. NEGA AVTOPREMIUM? (Afzalliklar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
            Ishonch Va Standartlar
          </span>
          <h2 className="text-3xl font-extrabold text-white">Nega Aynan AvtoPremium?</h2>
          <p className="text-neutral-400 text-sm mt-2">
            Biz har bir mijoz va bitim xavfsizligiga yuqori darajada yondashamiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border-neutral-800 text-left space-y-4 hover:border-amber-500/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">To'liq Yuridik Kafolat</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Barcha mashinalar taqiq, jarima, kredit va garovdan toza ekanligi davlat reyestrlari orqali tekshiriladi.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-neutral-800 text-left space-y-4 hover:border-amber-500/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BadgePercent className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Qulay Kredit & Lizing</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              O'zbekistonning yetakchi banklari bilan hamkorlikda eng past foiz stavkalari va 1 soatda rozilik olish imkoni.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-neutral-800 text-left space-y-4 hover:border-amber-500/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">200 Nuqta Bo'yicha Diagnostika</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Dvigatel, kuzov kraskasi, elektronika va podveska sertifikatlangan ustalar tomonidan ko'rikdan o'tkaziladi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
