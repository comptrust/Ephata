import React, { useState, useEffect } from 'react';
import { BUSINESS_PLANS } from '../data/businessPlansData';
import { BusinessPlanItem } from '../types';
import { 
  X, 
  Search, 
  Briefcase, 
  Download, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  TrendingUp,
  DollarSign,
  Clock,
  Layers
} from 'lucide-react';

interface BusinessPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessPlansModal: React.FC<BusinessPlansModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedPlan, setSelectedPlan] = useState<BusinessPlanItem>(BUSINESS_PLANS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const sectors = ['all', ...Array.from(new Set(BUSINESS_PLANS.map((b) => b.sector)))];

  const filteredPlans = BUSINESS_PLANS.filter((plan) => {
    const matchesSector = selectedSector === 'all' || plan.sector === selectedSector;
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.sector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleCopyPlan = (plan: BusinessPlanItem) => {
    const text = `BUSINESS PLAN : ${plan.title}\nSecteur : ${plan.sector}\nInvestissement initial : ${plan.investmentFcfa}\nChiffre d'affaires estimé : ${plan.monthlyRevenueEst}/mois\nPoint mort : ${plan.breakEvenMonths}\n\nRésumé :\n${plan.summary}\n\nMarché cible :\n${plan.targetMarket}\n\nÉquipements clés :\n${plan.keyEquipment.join('\n- ')}\n\nFacteurs clés de succès :\n${plan.successKeys.join('\n- ')}\n\nOffert par Ephata Consulting Group (+221 77 507 91 84)`;
    navigator.clipboard.writeText(text);
    setCopiedId(plan.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating high-priority Close Button at top-right of screen */}
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
          className="relative w-full max-w-4xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Header */}
          <div className="shrink-0 bg-[#0A2540] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between border-b border-slate-700 z-20">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-4 h-4" />
                <span>Pack Entreprenariat Ephata · Bonus Offert</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Banque des 30 Business Plans Sénégal & Afrique
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

          {/* Filter & Search Bar */}
          <div className="shrink-0 bg-slate-50 border-b border-slate-200 p-3 sm:p-3.5 flex flex-col sm:flex-row gap-2.5 items-center justify-between z-10">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher parmi les 30 plans..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Sector Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
              {sectors.slice(0, 5).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSector(sec)}
                  className={`px-2 py-1 text-[11px] rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                    selectedSector === sec
                      ? 'bg-[#0A2540] text-white font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {sec === 'all' ? 'Tous les secteurs' : sec}
                </button>
              ))}
            </div>
          </div>

          {/* Master/Detail Layout */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Master list */}
            <div className="w-full md:w-72 border-r border-slate-200 overflow-y-auto p-2 space-y-1 bg-slate-50/50 shrink-0 max-h-48 md:max-h-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                {filteredPlans.length} Modèles Prêts à l'Emploi
              </span>

              {filteredPlans.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A2540] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className={`font-semibold ${isSelected ? 'text-amber-400' : 'text-amber-700'}`}>
                        {plan.sector}
                      </span>
                      <span className={`${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {plan.investmentFcfa}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold truncate">
                      {plan.title}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Detail View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                    {selectedPlan.sector}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#0A2540] mt-1">
                    {selectedPlan.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPlan(selectedPlan)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs shrink-0 cursor-pointer"
                >
                  {copiedId === selectedPlan.id ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedPlan.id ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Investissement Requis</span>
                  <span className="text-sm font-extrabold text-[#0A2540]">{selectedPlan.investmentFcfa}</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 uppercase font-semibold block">CA Mensuel Estimé</span>
                  <span className="text-sm font-extrabold text-emerald-900">{selectedPlan.monthlyRevenueEst}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 uppercase font-semibold block">Rentabilité (Point Mort)</span>
                  <span className="text-sm font-extrabold text-blue-900">{selectedPlan.breakEvenMonths}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Résumé du Modèle Économique
                </h5>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {selectedPlan.summary}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Marché Cible & Clientèle
                </h5>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {selectedPlan.targetMarket}
                </p>
              </div>

              {/* Equipment and Success keys */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Matériels & Équipements Clés
                  </h5>
                  <ul className="space-y-1 text-slate-700 text-xs">
                    {selectedPlan.keyEquipment.map((eq, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <h5 className="text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                    Facteurs Clés de Succès
                  </h5>
                  <ul className="space-y-1 text-amber-900 text-xs">
                    {selectedPlan.successKeys.map((k, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 bg-slate-50 p-3 sm:p-4 px-4 sm:px-6 border-t border-slate-200 flex items-center justify-between z-20">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              ✕ Fermer
            </button>
            <span className="text-xs text-slate-500">
              Ephata Consulting Group · +221 77 507 91 84
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
