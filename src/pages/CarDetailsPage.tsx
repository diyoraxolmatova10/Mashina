import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  Send, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  UserCheck,
  Star
} from 'lucide-react';

export const CarDetailsPage: React.FC = () => {
  const { cars, selectedCarId, setCurrentPage, setSelectedCarId, isFavorite, toggleFavorite, formatPrice } = useCars();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Kredit kalkulyatori local state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanPeriodMonths, setLoanPeriodMonths] = useState<number>(36);

  const car = cars.find((c) => c.id === selectedCarId) || cars[0];

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Avtomobil topilmadi</h2>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="mt-4 bg-amber-500 text-black px-6 py-2 rounded-xl font-bold"
        >
          Katalogga qaytish
        </button>
      </div>
    );
  }

  const favorite = isFavorite(car.id);

  // Kredit hisoblash
  const interestRateYearly = 0.22; // 22% yillik bank stavkasi
  const downPaymentAmount = (car.priceUSD * downPaymentPercent) / 100;
  const loanPrincipal = car.priceUSD - downPaymentAmount;
  const monthlyInterestRate = interestRateYearly / 12;
  const monthlyPaymentUSD = Math.round(
    (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriodMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanPeriodMonths) - 1)
  );
  const monthlyPaymentUZS = Math.round(monthlyPaymentUSD * 12700);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Havola nusxalandi!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Yuqori navigatsiya satri */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('catalog')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition font-medium text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Katalogga qaytish</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Ulashish</span>
          </button>
          <button
            onClick={() => toggleFavorite(car.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              favorite
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            <span>{favorite ? 'Saqlangan' : 'Saqlash'}</span>
          </button>
        </div>
      </div>

      {/* Sarlavha va Narx */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {car.isVIP && (
              <span className="bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-black" /> VIP TAKLIF
              </span>
            )}
            <span className="bg-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded-md font-semibold">
              {car.brand} • {car.year}-yil
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> {car.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {car.title}
          </h1>
        </div>

        <div className="bg-gradient-to-br from-[#1a1e2b] to-[#121520] border border-amber-500/40 p-5 rounded-2xl shadow-xl min-w-[280px]">
          <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Sotuv Narxi</div>
          <div className="text-3xl font-black text-amber-400 mt-1">
            {formatPrice(car.priceUSD, car.priceUZS)}
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-medium">
            Kreditga: taxminan <span className="text-white font-bold">${monthlyPaymentUSD}/oy</span>
          </div>
        </div>
      </div>

      {/* 2 USTUNLI ASOSIY QISM: Galereya + Sotuvchi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chap tomon: Fotogalereya (2 ustun) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-[16/10] bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src={car.images[activeImageIndex] || car.images[0]}
              alt={car.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-white">
              {activeImageIndex + 1} / {car.images.length} ta rasm
            </div>
          </div>

          {/* Kichik rasmlar tanlagich */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {car.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Asosiy Xususiyatlar Ro'yxati */}
          <div className="glass-panel p-6 rounded-3xl border-neutral-800/90 mt-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-amber-400" />
              <span>Texnik Ko'rsatkichlar</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Ishlab chiqarilgan yili</span>
                <span className="text-base font-bold text-white">{car.year}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Yurgan masofasi</span>
                <span className="text-base font-bold text-white">{car.mileage.toLocaleString()} km</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Yoqilg'i turi</span>
                <span className="text-base font-bold text-white">{car.fuelType}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Uzatmalar qutisi</span>
                <span className="text-base font-bold text-white">{car.transmission}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Dvigatel hajmi / quvvati</span>
                <span className="text-base font-bold text-white">{car.engine} ({car.horsepower} ot kuchi)</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Yetakchi g'ildiraklar</span>
                <span className="text-base font-bold text-white">{car.drive}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Kuzov turi</span>
                <span className="text-base font-bold text-white">{car.bodyType}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Rangi</span>
                <span className="text-base font-bold text-white">{car.color}</span>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">Holati</span>
                <span className="text-base font-bold text-emerald-400">{car.condition}</span>
              </div>
            </div>

            {/* Tavsif */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Batafsil Tavsif</h4>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {car.description}
              </p>
            </div>

            {/* Qulayliklar va Opsiya (Features) */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Komplektatsiya va Qulayliklar</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-800/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* O'ng tomon: Sotuvchi kartasi va Tezkor Kredit Kalkulyatori */}
        <div className="space-y-6">
          
          {/* Sotuvchi kartasi */}
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Sotuvchi Ma'lumotlari</span>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Tekshirilgan</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={car.seller.avatar}
                alt={car.seller.name}
                className="w-16 h-16 rounded-2xl object-cover border border-amber-500/40 shadow-lg"
              />
              <div>
                <h4 className="text-lg font-bold text-white">{car.seller.name}</h4>
                <p className="text-xs text-neutral-400">{car.seller.type}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{car.seller.rating}</span>
                  <span className="text-neutral-500">(15+ ijobiy fikrlar)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`tel:${car.seller.phone}`}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-amber-500/25 text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{car.seller.phone}</span>
              </a>

              <a
                href={`https://t.me/${car.seller.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#182538] hover:bg-[#20324c] border border-sky-500/30 text-sky-400 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition duration-200 text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Telegram orqali yozish</span>
              </a>
            </div>

            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>AvtoPremium kafolati: To'lov faqat notarial rasmiylashtirilgandan so'ng amalga oshiriladi.</span>
            </div>
          </div>

          {/* Mini Avtokredit Kalkulyatori */}
          <div className="glass-panel p-6 rounded-3xl border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Calculator className="w-5 h-5 text-amber-400" />
              <span>Avtokredit Hisoblagich</span>
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Boshlang'ich to'lov:</span>
                <span className="font-bold text-amber-400">{downPaymentPercent}% (${downPaymentAmount.toLocaleString()})</span>
              </div>
              <input
                type="range"
                min="15"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Kredit muddati:</span>
                <span className="font-bold text-amber-400">{loanPeriodMonths} oy ({Math.round(loanPeriodMonths / 12)} yil)</span>
              </div>
              <input
                type="range"
                min="12"
                max="60"
                step="12"
                value={loanPeriodMonths}
                onChange={(e) => setLoanPeriodMonths(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-neutral-900 to-[#131722] rounded-2xl border border-neutral-800 text-center">
              <div className="text-xs text-neutral-400">Oylik to'lov miqdori:</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                ${monthlyPaymentUSD.toLocaleString()} / oy
              </div>
              <div className="text-[11px] text-neutral-400">
                (taxminan {monthlyPaymentUZS.toLocaleString()} so'm/oy)
              </div>
            </div>

            <button
              onClick={() => {
                alert("Kredit arizangiz bankka yuborildi! 15 daqiqa ichida siz bilan mutaxassis bog'lanadi.");
              }}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Kreditga ariza topshirish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
