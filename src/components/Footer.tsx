import React from 'react';
import { useCars } from '../context/CarContext';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, Send } from 'lucide-react';
import { PageType } from '../types/car';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useCars();

  const handleNav = (p: PageType) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080b] border-t border-amber-500/20 text-neutral-400 mt-24">
      {/* Yuqori newsletter qismi */}
      <div className="border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-amber-950/40 via-[#121520] to-neutral-900/60 rounded-3xl p-8 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4" /> Eksklyuziv Takliflar
              </div>
              <h3 className="text-2xl font-bold text-white">Yangi VIP e'lonlar va arzonlashtirilgan narxlardan xabardor bo'ling</h3>
              <p className="text-neutral-400 text-sm mt-1">Har hafta eng saralangan avtomobillar sizning pochtangizda yoki Telegramingizda.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="text"
                placeholder="Telefon yoki Telegram username..."
                className="bg-black/60 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 w-full md:w-72"
              />
              <button 
                onClick={() => alert("Rahmat! Siz eksklyuziv yangiliklarga muvaffaqiyatli a'zo bo'ldingiz.")}
                className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition shadow-lg shadow-amber-500/20"
              >
                <span>Obuna</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asosiy footer ustunlari */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Kompaniya haqida */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-wider gold-gradient-text">
                AVTO<span className="text-white">PREMIUM</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              O'zbekistondagi eng nufuzli, xavfsiz va ishonchli avtomobil oldi-sotdi ekotizimi. Biz faqat tekshirilgan va premium sifatdagi transport vositalarini tavsiya etamiz.
            </p>
            <div className="flex items-center gap-4 pt-2 text-neutral-300">
              <div className="flex items-center gap-2 text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Yuridik Toza Bitimlar</span>
              </div>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
              Sahifalar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition cursor-pointer">
                  Bosh Sahifa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog')} className="hover:text-amber-400 transition cursor-pointer">
                  Barcha Avtomobillar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sell')} className="hover:text-amber-400 transition cursor-pointer text-amber-400 font-semibold">
                  + Avtomobil Sotish
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-amber-400 transition cursor-pointer">
                  Kredit Kalkulyatori
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('favorites')} className="hover:text-amber-400 transition cursor-pointer">
                  Tanlangan Mashinalar
                </button>
              </li>
            </ul>
          </div>

          {/* Ommabop brendlar */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
              Kategoriyalar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-amber-400 cursor-pointer">Mercedes-Benz VIP</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">BMW M Performance</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Porsche Supercars</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">BYD & Elektr Mobillar</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Chevrolet GM Modellar</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Krossover & SUV lar</span></li>
            </ul>
          </div>

          {/* Bog'lanish */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
              Aloqa Markazi
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Toshkent sh., Amir Temur shox ko'chasi 107A</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+998712008899" className="hover:text-white transition">+998 (71) 200-88-99</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@avtopremium.uz" className="hover:text-white transition">info@avtopremium.uz</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki avtori va huquqiy satr */}
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 AvtoPremium O'zbekiston. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Maxfiylik siyosati</span>
            <span className="hover:text-neutral-400 cursor-pointer">Foydalanish shartlari</span>
            <span className="hover:text-neutral-400 cursor-pointer">Xavfsizlik kafolatlari</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
