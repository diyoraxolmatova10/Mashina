import React from 'react';
import { useCars } from '../context/CarContext';
import { ShieldCheck, Award, Users, Clock, Sparkles, Building2, MapPin, Phone, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useCars();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Sarlavha qismi */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
          Biz Haqimizda
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          O'zbekistonda Premium Avtomobil Savdosining <span className="gold-gradient-text">Yangi Davri</span>
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          AvtoPremium — bu shunchaki avtobozor emas. Bu yuridik toza, texnik jihatdan sinchkovlik bilan tekshirilgan va hashamatli avtomobillarni xarid qilish hamda qulay sotish uchun yaratilgan yagona ekotizimdir.
        </p>
      </div>

      {/* Asosiy 4 ustunli afzalliklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Yuridik Himoya</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Har bir bitim qonuniy va xavfsiz. Taqiq, jarimalar va lizing qarzlari yo'qligi 100% kafolatlanadi.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Premium Sifat</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Bizning VIP kolleksiyamizdagi har bir mashina yuqori darajadagi estetik va texnik holatga ega.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">1 Kunda Rasmiylashtirish</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Notarius, sug'urta, hisobga qo'yish va davlat raqamini olish xizmatlari bir joyning o'zida amalga oshiriladi.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">100,000+ Hamjamiyat</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            O'zbekiston bo'ylab avtomobil ixlosmandlari, rasmiy dilerlar va kolleksionerlar jamoasi.
          </p>
        </div>
      </div>

      {/* Ofisimiz va Manzil */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border-amber-500/30 bg-gradient-to-br from-[#121520] via-neutral-900 to-[#0e1017]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Bosh Showroom
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Toshkent Markazidagi Hashamatli Avtosalonimizga Tashrif Buyuring
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Kofe tanaffusi hamrohligida eksklyuziv avtomobillar bilan shaxsan tanishing, test-drayv qiling va shartnomani qulay VIP-zonada tuzing.
            </p>

            <div className="space-y-3 pt-2 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Toshkent sh., Amir Temur shox ko'chasi 107A (Mo'ljal: Radisson SAS ro'parasida)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>+998 (71) 200-88-99 / +998 (90) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span>concierge@avtopremium.uz</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/25 text-sm"
              >
                Mavjud Avtomobillarni Ko'rish
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-neutral-700 aspect-[4/3] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="AvtoPremium Showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-base font-bold">AvtoPremium Flagship Showroom</div>
                <div className="text-xs text-neutral-300">Har kuni: 09:00 dan 21:00 gacha ochiq</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
