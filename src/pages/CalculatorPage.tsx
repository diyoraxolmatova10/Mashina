import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { POPULAR_BRANDS } from '../data/cars';

export const CalculatorPage: React.FC = () => {
  // Tab: 'loan' | 'evaluation'
  const [activeTab, setActiveTab] = useState<'loan' | 'evaluation'>('loan');

  // Kredit kalkulyatori
  const [carPriceUSD, setCarPriceUSD] = useState<number>(35000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanPeriodMonths, setLoanPeriodMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(22); // 22% yillik

  const downPaymentAmountUSD = (carPriceUSD * downPaymentPercent) / 100;
  const principalUSD = carPriceUSD - downPaymentAmountUSD;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPaymentUSD = Math.round(
    (principalUSD * monthlyRate * Math.pow(1 + monthlyRate, loanPeriodMonths)) /
    (Math.pow(1 + monthlyRate, loanPeriodMonths) - 1)
  );
  const totalPaymentUSD = Math.round(monthlyPaymentUSD * loanPeriodMonths + downPaymentAmountUSD);
  const totalInterestUSD = totalPaymentUSD - carPriceUSD;

  // Baholash kalkulyatori
  const [evalBrand, setEvalBrand] = useState('Chevrolet');
  const [evalModel, setEvalModel] = useState('Malibu 2');
  const [evalYear, setEvalYear] = useState<number>(2022);
  const [evalMileage, setEvalMileage] = useState<number>(45000);
  const [evalCondition, setEvalCondition] = useState("A'lo");
  const [evaluatedPrice, setEvaluatedPrice] = useState<number | null>(null);

  const calculateEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    // Intellektual baholash simulatsiyasi
    let base = 25000;
    if (evalBrand === 'Mercedes-Benz') base = 90000;
    if (evalBrand === 'BMW') base = 75000;
    if (evalBrand === 'Porsche') base = 120000;
    if (evalBrand === 'BYD') base = 32000;
    if (evalBrand === 'Chevrolet') base = 22000;

    // Yil ta'siri (2026 hozirgi yil)
    const age = Math.max(0, 2026 - evalYear);
    const ageDeduction = age * 0.07 * base;

    // Probeg ta'siri
    const mileageDeduction = (evalMileage / 10000) * 0.015 * base;

    let finalPrice = Math.round(Math.max(4000, base - ageDeduction - mileageDeduction));
    setEvaluatedPrice(finalPrice);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Sarlavha */}
      <div className="text-center space-y-2">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
          Moliyaviy Xizmatlar
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Kredit & Avtomobilni Onlayn Baholash
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Bank kreditini oldindan hisoblang yoki o'z mashinangizning bugungi bozor narxini bilib oling
        </p>
      </div>

      {/* Tab almashtirish */}
      <div className="flex justify-center">
        <div className="bg-[#131622] p-1.5 rounded-2xl border border-neutral-800 flex gap-2">
          <button
            onClick={() => setActiveTab('loan')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'loan'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Avtokredit Hisoblash</span>
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeTab === 'evaluation'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Mashina Narxini Baholash</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KREDIT KALKULYATORI */}
      {activeTab === 'loan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border-neutral-800 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <span>Kredit Parametrlari</span>
            </h3>

            {/* Mashina narxi */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-neutral-300 mb-2">
                <span>Avtomobil narxi:</span>
                <span className="text-amber-400 font-bold text-lg">${carPriceUSD.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="1000"
                value={carPriceUSD}
                onChange={(e) => setCarPriceUSD(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>$5,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Boshlang'ich to'lov */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-neutral-300 mb-2">
                <span>Boshlang'ich to'lov ({downPaymentPercent}%):</span>
                <span className="text-amber-400 font-bold text-lg">${downPaymentAmountUSD.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="15"
                max="75"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>15%</span>
                <span>75%</span>
              </div>
            </div>

            {/* Kredit muddati */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-neutral-300 mb-2">
                <span>Kredit muddati ({loanPeriodMonths} oy / {Math.round(loanPeriodMonths/12)} yil):</span>
                <span className="text-amber-400 font-bold text-lg">{loanPeriodMonths} oy</span>
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
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>1 yil (12 oy)</span>
                <span>5 yil (60 oy)</span>
              </div>
            </div>

            {/* Foiz stavkasi */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-neutral-300 mb-2">
                <span>Yillik bank stavkasi (%):</span>
                <span className="text-white font-bold">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="14"
                max="30"
                step="1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Natija kartasi */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Hisob-kitob Natijasi
              </span>
              <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800">
                <div className="text-xs text-neutral-400">Oylik to'lov</div>
                <div className="text-3xl font-black text-amber-400 mt-1">
                  ${monthlyPaymentUSD.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  ≈ {(monthlyPaymentUSD * 12700).toLocaleString()} so'm
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300 pt-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Kredit summasi:</span>
                  <span className="font-bold text-white">${principalUSD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Boshlang'ich to'lov:</span>
                  <span className="font-bold text-white">${downPaymentAmountUSD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Jami foiz ustamasi:</span>
                  <span className="font-bold text-amber-400">${totalInterestUSD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-800">
                  <span className="text-neutral-300 font-bold">Jami qaytarish:</span>
                  <span className="font-bold text-white text-sm">${totalPaymentUSD.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert("Kredit bo'yicha ariza rasmiylashtirildi! Bank mutaxassisi siz bilan bog'lanadi.")}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-3.5 rounded-2xl transition duration-200 shadow-xl shadow-amber-500/25 text-sm cursor-pointer"
            >
              Ariza Berish
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: BAHOLASH KALKULYATORI */}
      {activeTab === 'evaluation' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border-neutral-800 space-y-8">
          <form onSubmit={calculateEvaluation} className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Avtomobilingiz Ma'lumotlarini Kiriting</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Brend</label>
                <select
                  value={evalBrand}
                  onChange={(e) => setEvalBrand(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {POPULAR_BRANDS.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Model</label>
                <input
                  type="text"
                  required
                  value={evalModel}
                  onChange={(e) => setEvalModel(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Yili</label>
                <input
                  type="number"
                  min="2000"
                  max="2026"
                  value={evalYear}
                  onChange={(e) => setEvalYear(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Yurgan masofasi (km)</label>
                <input
                  type="number"
                  min="0"
                  value={evalMileage}
                  onChange={(e) => setEvalMileage(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">Holati</label>
                <select
                  value={evalCondition}
                  onChange={(e) => setEvalCondition(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Ideal">Ideal (Kraska toza)</option>
                  <option value="A'lo">A'lo darajada</option>
                  <option value="Yaxshi">O'rtacha / Yaxshi</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3 rounded-xl transition duration-200 text-sm cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Bozor Narxini Hisoblash
                </button>
              </div>
            </div>
          </form>

          {evaluatedPrice !== null && (
            <div className="p-6 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40 rounded-3xl border border-amber-500/40 text-center space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Tavsiya Etilgan O'rtacha Bozor Narxi
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white">
                ${evaluatedPrice.toLocaleString()}{' '}
                <span className="text-base text-neutral-400 font-normal">
                  (≈ {(evaluatedPrice * 12700).toLocaleString()} so'm)
                </span>
              </div>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Ushbu narx so'nggi 30 kundagi {evalBrand} {evalModel} avtomobillarining haqiqiy sotuv tahlillari asosida shakllantirildi.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
