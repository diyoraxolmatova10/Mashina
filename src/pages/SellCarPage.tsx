import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { POPULAR_BRANDS, REGIONS } from '../data/cars';
import { 
  PlusCircle, 
  Upload, 
  CheckCircle, 
  Sparkles, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SellCarPage: React.FC = () => {
  const { addNewCar, setCurrentPage, setSelectedCarId } = useCars();

  const [step, setStep] = useState<number>(1);
  const [successCarId, setSuccessCarId] = useState<string | null>(null);

  // Form maydonlari
  const [brand, setBrand] = useState('Mercedes-Benz');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [bodyType, setBodyType] = useState<any>('Sedan');
  const [fuelType, setFuelType] = useState<any>('Benzin');
  const [transmission, setTransmission] = useState<any>('Avtomat');
  const [drive, setDrive] = useState<any>("To'liq (AWD / 4WD)");
  const [condition, setCondition] = useState<any>('Ideal');
  const [mileage, setMileage] = useState<number>(15000);
  const [engine, setEngine] = useState('3.0L Turbo');
  const [horsepower, setHorsepower] = useState<number>(380);
  const [color, setColor] = useState('Qora metallik');
  const [location, setLocation] = useState('Toshkent shahar');
  const [priceUSD, setPriceUSD] = useState<number>(45000);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('+998 90 ');
  const [sellerTelegram, setSellerTelegram] = useState('@');

  // Namuna rasmlar
  const sampleImages = [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage = imageUrl.trim() || sampleImages[Math.floor(Math.random() * sampleImages.length)];
    const priceUZS = priceUSD * 12700;

    const newId = addNewCar({
      title: `${brand} ${model || 'Avtomobil'}`,
      brand,
      model: model || 'Klassik',
      year,
      priceUSD,
      priceUZS,
      mileage,
      fuelType,
      transmission,
      engine,
      horsepower,
      drive,
      color,
      bodyType,
      condition,
      location,
      images: [finalImage, ...sampleImages.slice(0, 2)],
      isFeatured: true,
      isVIP: false,
      description: description || `${year}-yilgi ${brand} ${model}. A'lo holatda, yangi xaridor uchun to'liq tayyorlangan.`,
      features: ['Klimat-kontrol', 'Multirul', 'Kruiz-kontrol', 'Orqa kamera', 'Charm salon', 'Elektr oynalar'],
      seller: {
        name: sellerName || 'Hurmatli Sotuvchi',
        type: 'Xususiy shaxs',
        phone: sellerPhone || '+998 90 123 45 67',
        telegram: sellerTelegram || '@avtopremium_user',
        verified: true,
        rating: 5.0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      }
    });

    setSuccessCarId(newId);
    setStep(4);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Sarlavha */}
      <div className="text-center space-y-2">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
          Tezkor E'lon Joylashtirish
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Avtomobilingizni <span className="gold-gradient-text">AvtoPremium</span> da Soting
        </h1>
        <p className="text-sm text-neutral-400 max-w-lg mx-auto">
          E'loningiz darhol minglab xaridorlar ro'yxatida ko'rinadi va eng qulay shartlarda sotiladi
        </p>
      </div>

      {/* Bosqichlar indikatori */}
      {step < 4 && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { num: 1, title: 'Asosiy Parametrlar' },
            { num: 2, title: 'Texnik Xususiyatlar' },
            { num: 3, title: 'Narx va Aloqa' }
          ].map((s) => (
            <div
              key={s.num}
              className={`p-3 rounded-2xl border text-center transition-all ${
                step === s.num
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                  : step > s.num
                  ? 'bg-neutral-900 border-emerald-500/40 text-emerald-400'
                  : 'bg-neutral-900/40 border-neutral-800 text-neutral-500'
              }`}
            >
              <div className="text-xs font-bold">
                {step > s.num ? '✓ Bajarildi' : `${s.num}-qadam`}
              </div>
              <div className="text-xs hidden sm:block truncate mt-0.5">{s.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* FORMA MAYDONI */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border-neutral-800/90 shadow-2xl">
        {/* 1-QADAM: Asosiy ma'lumotlar */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Avtomobil Asosiy Ma'lumotlari</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Marka / Ishlab chiqaruvchi *</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {POPULAR_BRANDS.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                  <option value="Boshqa marka">Boshqa marka</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Model nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: G63, X7, Song Plus, Malibu 2..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Ishlab chiqarilgan yili *</label>
                <input
                  type="number"
                  min="1990"
                  max="2027"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Kuzov turi *</label>
                <select
                  value={bodyType}
                  onChange={(e: any) => setBodyType(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="Krossover / SUV">Krossover / SUV</option>
                  <option value="Kupe">Kupe</option>
                  <option value="Xetchbek">Xetchbek</option>
                  <option value="Pikap">Pikap</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Shahar / Viloyat *</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {REGIONS.filter(r => r !== 'Barcha hududlar').map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Rangi *</label>
                <input
                  type="text"
                  placeholder="Masalan: Qora mat, Oq marvarid..."
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-lg shadow-amber-500/20 text-sm"
              >
                <span>Keyingi Qadam (Texnik Holat)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2-QADAM: Texnik parametrlar */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Texnik Ko'rsatkichlar & Holati</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Yurgan masofasi (km) *</label>
                <input
                  type="number"
                  min="0"
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Umumiy holati *</label>
                <select
                  value={condition}
                  onChange={(e: any) => setCondition(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Yangi (0 km)">Yangi (0 km)</option>
                  <option value="Ideal">Ideal (Kraska toza, yangi holatda)</option>
                  <option value="A'lo">A'lo darajada</option>
                  <option value="Yaxshi">Yaxshi holatda</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Yoqilg'i turi *</label>
                <select
                  value={fuelType}
                  onChange={(e: any) => setFuelType(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Benzin">Benzin</option>
                  <option value="Elektr">Elektr</option>
                  <option value="Gibrid">Gibrid</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Metan / Propan">Metan / Propan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Uzatmalar qutisi *</label>
                <select
                  value={transmission}
                  onChange={(e: any) => setTransmission(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Avtomat">Avtomat</option>
                  <option value="Mexanika">Mexanika</option>
                  <option value="Robot">Robot</option>
                  <option value="Variator">Variator</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Dvigatel *</label>
                <input
                  type="text"
                  placeholder="Masalan: 2.0L Turbo yoki Blade Battery 87kWh"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Yetakchi g'ildirak (Privod)</label>
                <select
                  value={drive}
                  onChange={(e: any) => setDrive(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="To'liq (AWD / 4WD)">To'liq (AWD / 4WD)</option>
                  <option value="Old (FWD)">Old (FWD)</option>
                  <option value="Orqa (RWD)">Orqa (RWD)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Orqaga</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-lg shadow-amber-500/20 text-sm"
              >
                <span>Keyingi Qadam (Narx va Aloqa)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3-QADAM: Narx, rasm va sotuvchi aloqasi */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>Narx, Rasmlar va Bog'lanish</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Sotuv narxi ($ AQSh dollari) *</label>
                <input
                  type="number"
                  required
                  min="500"
                  value={priceUSD}
                  onChange={(e) => setPriceUSD(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-amber-500/50 rounded-xl px-4 py-3 text-lg font-black text-amber-400 focus:outline-none focus:border-amber-400"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Taxminan: {(priceUSD * 12700).toLocaleString()} so'm
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Rasm havolasi (URL - ixtiyoriy)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Agar kiritmasangiz, avtomatik chiroyli premium rasm tanlanadi
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Ismingiz / Salon nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Rahimov"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Telefon raqamingiz *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Telegram username</label>
                <input
                  type="text"
                  placeholder="@sardor_avto"
                  value={sellerTelegram}
                  onChange={(e) => setSellerTelegram(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Qo'shimcha ma'lumotlar / Tavsif</label>
                <textarea
                  rows={3}
                  placeholder="Mashina qayerdan olib kelingan, qanday jihozlangan, kraska holati haqida qisqacha yozing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Orqaga</span>
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-black px-8 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-xl shadow-amber-500/30 text-sm"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>E'lonni Bepul Joylashtirish</span>
              </button>
            </div>
          </form>
        )}

        {/* 4-QADAM: Muvaffaqiyat (Success) */}
        {step === 4 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Tabriklaymiz!</h2>
              <p className="text-base text-neutral-300 max-w-md mx-auto">
                Avtomobilingiz bo'yicha e'lon muvaffaqiyatli qabul qilindi va katalogga joylashtirildi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  if (successCarId) {
                    setSelectedCarId(successCarId);
                    setCurrentPage('car-details');
                  } else {
                    setCurrentPage('catalog');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl cursor-pointer transition shadow-lg shadow-amber-500/25"
              >
                E'lonni Ko'rish
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setModel('');
                  setDescription('');
                }}
                className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-xl cursor-pointer transition"
              >
                Yana E'lon Berish
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
