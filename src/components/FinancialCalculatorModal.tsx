import React, { useState, useEffect } from 'react';
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 50/30/20 Budget Breakdown
  const needs50 = Math.round(monthlyIncome * 0.5);
  const wants30 = Math.round(monthlyIncome * 0.3);
  const monthlySavings = Math.round(monthlyIncome * (savingsRate / 100));

  // Emergency Fund target (6 months of needs)
  const emergencyFundTarget = needs50 * 6;

  // Compound Interest Calculation
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
    <>
      {/* Floating high-priority Close Button at top-right of screen for instant access */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[70] px-3.5 py-2 bg-slate-900/90 hover:bg-red-600 text-white rounded-full shadow-2xl border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer group"
        title="Fermer la fenêtre (ou touche Échap)"
        aria-label="Fermer la fenêtre"
      >
        <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform" />
        <span>Fermer (✕)</span>
      </button>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-hidden"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div 
          className="relative w-full max-w-3xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky Header */}
          <div className="shrink-0 bg-[#0A2540] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between border-b border-slate-700 z-20">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-4 h-4" />
                <span>Pack Éducation Financière Ephata</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Simulateur d'Épargne & Budget 50/30/20
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-white/10 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold shrink-0 cursor-pointer border border-white/20"
              aria-label="Fermer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Fermer</span>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
            {/* Section 1: Inputs & 50/30/20 breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-amber-600" />
                  Vos Données Financières Mensuelles
                </h3>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Revenu mensuel net :</span>
                    <span className="font-bold text-[#0A2540]">{formatFCFA(monthlyIncome)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="3000000"
                    step="50000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Part épargnée & investie :</span>
                    <span className="font-bold text-emerald-600">{savingsRate}% ({formatFCFA(monthlySavings)}/mois)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={savingsRate}
                    onChange={(e) => setSavingsRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Rendement annuel estimé :</span>
                    <span className="font-bold text-blue-600">{annualReturnRate}% / an</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={annualReturnRate}
                    onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Durée d'investissement :</span>
                    <span className="font-bold text-slate-800">{years} ans</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-slate-800 cursor-pointer"
                  />
                </div>
              </div>

              {/* 50/30/20 Diagram */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <PiggyBank className="w-4 h-4 text-amber-600" />
                  Répartition Recommandée (Règle 50/30/20)
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex justify-between font-bold text-slate-800 mb-0.5">
                      <span>50% Besoins vitaux</span>
                      <span>{formatFCFA(needs50)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Loyer, nourriture, factures Senelec/SDE, santé, scolarité.</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex justify-between font-bold text-slate-800 mb-0.5">
                      <span>30% Envies & Confort</span>
                      <span>{formatFCFA(wants30)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Loisirs, sorties, cadeaux, tabaski/fêtes de famille.</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex justify-between font-bold text-emerald-900 mb-0.5">
                      <span>20% Avenir & Liberté</span>
                      <span>{formatFCFA(monthlySavings)}</span>
                    </div>
                    <p className="text-[10px] text-emerald-700">Épargne de sécurité, investissements productifs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Wealth projection */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#0A2540] to-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm">Projection de Capital dans {years} ans</span>
                </div>
                <span className="text-xl font-extrabold text-amber-400">
                  {formatFCFA(futureValue)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Versements réels</span>
                  <span className="text-sm font-bold text-white">{formatFCFA(totalInvested)}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-400/30">
                  <span className="text-emerald-300 text-[10px] block">Intérêts générés</span>
                  <span className="text-sm font-bold text-emerald-400">+{formatFCFA(totalGains)}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-400/30">
                  <span className="text-amber-300 text-[10px] block">Fonds d'urgence (6 mois)</span>
                  <span className="text-sm font-bold text-amber-400">{formatFCFA(emergencyFundTarget)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 bg-slate-50 p-3 sm:p-4 px-4 sm:px-6 border-t border-slate-200 flex items-center justify-between z-20">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-3.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              ✕ Fermer
            </button>
            <span className="text-xs text-slate-500">
              Cabinet Ephata Consulting · +221 77 507 91 84
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
