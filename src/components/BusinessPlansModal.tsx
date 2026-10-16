import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Pack Entreprenariat Ephata · Bonus Offert</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Banque des 30 Business Plans Sénégal & Afrique
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

        {/* Filter & Search Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher parmi les 30 plans..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Sector Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {sectors.slice(0, 5).map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-[#0A2540] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {sec === 'all' ? 'Tous les secteurs' : sec}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area : Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Plans List */}
          <div className="w-full md:w-80 border-r border-slate-200 overflow-y-auto p-3 space-y-2 bg-slate-50/50 max-h-60 md:max-h-none">
            <span className="text-[11px] font-bold text-slate-500 uppercase px-1">
              {filteredPlans.length} plans disponibles
            </span>
            {filteredPlans.map((plan) => {
              const isSelected = selectedPlan.id === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-2xs'
                      : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                    {plan.sector}
                  </span>
                  <h4 className="text-xs font-bold mt-0.5 line-clamp-1">
                    {plan.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span className="font-semibold text-slate-700">{plan.investmentFcfa}</span>
                    <span>{plan.breakEvenMonths}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Plan Full Breakdown */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  {selectedPlan.sector}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2540] mt-1">
                  {selectedPlan.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyPlan(selectedPlan)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === selectedPlan.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedPlan.id ? 'Copié !' : 'Copier'}</span>
                </button>

                <button
                  onClick={() => alert(`Téléchargement de la fiche complète : ${selectedPlan.title}`)}
                  className="px-3 py-1.5 bg-[#0A2540] hover:bg-amber-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>

            {/* Financial Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Budget d'Investissement Initial
                </span>
                <span className="text-base font-extrabold text-[#0A2540]">
                  {selectedPlan.investmentFcfa}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-700 uppercase font-bold block">
                  Chiffre d'Affaires Mensuel Estimé
                </span>
                <span className="text-base font-extrabold text-emerald-900">
                  {selectedPlan.monthlyRevenueEst}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] text-amber-800 uppercase font-bold block">
                  Retour sur Investissement (Point Mort)
                </span>
                <span className="text-base font-extrabold text-amber-950">
                  {selectedPlan.breakEvenMonths}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Résumé du Projet & Modèle Économique
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedPlan.summary}
              </p>
            </div>

            {/* Target Market */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Clientèle Cible & Positionnement Local
              </h4>
              <p className="text-xs sm:text-sm text-slate-700">
                {selectedPlan.targetMarket}
              </p>
            </div>

            {/* Key Equipment & Success Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Matériels & Équipements Indispensables
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedPlan.keyEquipment.map((eq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Clés de Réussite & Pièges à Éviter
                </h5>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {selectedPlan.successKeys.map((k, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
