import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Home, 
  PiggyBank, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FinancialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialCalculatorModal: React.FC<FinancialCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(300000); // 300 000 FCFA
  const [savingsRate, setSavingsRate] = useState<number>(20); // 20%
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(7); // 7% (ex: Bons du Trésor UEMOA)
  const [years, setYears] = useState<number>(10);

  if (!isOpen) return null;

  // 50/30/20 Budget Breakdown
  const needs50 = Math.round(monthlyIncome * 0.5);
  const wants30 = Math.round(monthlyIncome * 0.3);
  const monthlySavings = Math.round(monthlyIncome * (savingsRate / 100));

  // Emergency Fund target (6 months of needs)
  const emergencyFundTarget = needs50 * 6;

  // Compound Interest Calculation
  // FV = P * [((1 + r/12)^(12*t) - 1) / (r/12)]
  const monthlyRate = annualReturnRate / 100 / 12;
  const totalMonths = years * 12;
  const futureValue = Math.round(
    monthlySavings * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
  );
  const totalInvested = monthlySavings * totalMonths;
  const totalGains = futureValue - totalInvested;

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-200">
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Pack Éducation Financière Ephata</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Simulateur d'Indépendance Financière & Budget Sérénité
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Section 1: Inputs & 50/30/20 African Formula */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">
                1. Vos Paramètres Mensuels (FCFA)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Revenu Mensuel Net Total : <strong className="text-[#0A2540]">{formatFCFA(monthlyIncome)}</strong>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="3000000"
                  step="25000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>50 000 FCFA</span>
                  <span>1 500 000 FCFA</span>
                  <span>3 000 000 FCFA</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Part consacrée à l'épargne & investissement : <strong className="text-amber-600">{savingsRate}% ({formatFCFA(monthlySavings)}/mois)</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={savingsRate}
                  onChange={(e) => setSavingsRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>10% (Règle d'or minimale)</span>
                  <span>20% (Recommandé)</span>
                  <span>40% (Accéléré)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Horizon de temps : <strong className="text-[#0A2540]">{years} ans</strong>
                </label>
                <div className="flex gap-2">
                  {[3, 5, 10, 15, 20].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setYears(yr)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        years === yr
                          ? 'bg-[#0A2540] text-white border-[#0A2540]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {yr} ans
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: The 50/30/20 Budget Map */}
            <div className="md:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Répartition Budgétaire Équilibrée
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>50% Besoins Vitaux & Famille</span>
                    <span className="text-[#0A2540]">{formatFCFA(needs50)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Loyer, nourriture, factures Senelec/Sen'Eau, santé, scolarité.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>30% Confort & Vie Sociale</span>
                    <span className="text-slate-600">{formatFCFA(wants30)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Sorties, vêtements, contributions cérémoniales, loisirs.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300">
                  <div className="flex justify-between text-xs font-bold text-amber-950">
                    <span>{savingsRate}% Richesse Future (Loi N°1)</span>
                    <span className="text-amber-800 font-extrabold">{formatFCFA(monthlySavings)}</span>
                  </div>
                  <p className="text-[10px] text-amber-800 mt-0.5">
                    Votre part sacrée : fonds d'urgence, BRVM, immobilier, affaires.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Wealth Accumulation Projection */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A2540] to-slate-900 text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Magie des Intérêts Composés (Rendement annuel 7%)
                </span>
                <h4 className="text-lg font-black text-white">
                  Votre Capital Accumulé dans {years} Ans
                </h4>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {formatFCFA(futureValue)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 text-[11px] block">Total de vos versements réels</span>
                <span className="text-base font-bold text-white">{formatFCFA(totalInvested)}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                <span className="text-emerald-300 text-[11px] block">Gains générés par les intérêts</span>
                <span className="text-base font-bold text-emerald-400">+{formatFCFA(totalGains)}</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30">
                <span className="text-amber-300 text-[11px] block">Fonds d'urgence conseillé</span>
                <span className="text-base font-bold text-amber-400">{formatFCFA(emergencyFundTarget)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 italic pt-1">
              * Simulation basée sur un placement régulier diversifié (Bons et obligations du Trésor UEMOA, titres BRVM ou tontine d'investissement sécurisée).
            </p>
          </div>

          {/* Section 3: The 7 Laws Reminder */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Rappel des 7 Lois du Pack Éducation Financière Ephata
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Commencer à remplir votre bourse (10% minimum)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Contrôlez vos dépenses (Budget 50/30/20)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Fructifiez vos économies (Faire travailler l'argent)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                <span>Protégez vos trésors contre la perte (Fonds d'urgence)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">5</span>
                <span>Possédez votre propre maison (Sécurité foncière)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">6</span>
                <span>Augmentez toujours vos connaissances (Compétences)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
