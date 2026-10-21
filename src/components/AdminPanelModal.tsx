import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Download, 
  Search, 
  Lock,
  Sparkles,
  BookOpen,
  Calendar,
  RotateCcw,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { resetCountdownTargetDate, getCountdownTargetDate } from './LaunchCountdown';

export interface RegistrationRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseTitle: string;
  amountFcfa: number;
  paymentMethod: 'Wave' | 'Orange Money' | 'WhatsApp / Manuel' | 'Western Union';
  status: 'Confirmé' | 'En attente' | 'Validé';
  date: string;
}

// Clean default for publication: empty list of registrations
const INITIAL_REGISTRATIONS: RegistrationRecord[] = [];

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ 
  isOpen, 
  onClose
}) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    const saved = localStorage.getItem('ephata_admin_registrations');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_REGISTRATIONS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalRevenue = registrations
    .filter(r => r.status === 'Validé' || r.status === 'Confirmé')
    .reduce((acc, curr) => acc + curr.amountFcfa, 0);

  const filteredRegistrations = registrations.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const handleToggleStatus = (id: string) => {
    const updated = registrations.map(reg => {
      if (reg.id === id) {
        const nextStatus: RegistrationRecord['status'] = 
          reg.status === 'En attente' ? 'Validé' : 
          reg.status === 'Confirmé' ? 'Validé' : 'En attente';
        return { ...reg, status: nextStatus };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('ephata_admin_registrations', JSON.stringify(updated));
  };

  const handleSendWhatsAppNotification = (reg: RegistrationRecord) => {
    const message = encodeURIComponent(
      `Bonjour ${reg.name}, Ephata Consulting Group confirme la validation de votre inscription à la formation : "${reg.courseTitle}". Bienvenue sur la plateforme ! Contact formateur : +221 77 507 91 84`
    );
    const cleanPhone = reg.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleExportCsv = () => {
    const headers = 'ID,Nom,Telephone,Email,Formation,Montant_FCFA,Methode_Paiement,Statut,Date\n';
    const rows = registrations.map(r => 
      `"${r.id}","${r.name}","${r.phone}","${r.email}","${r.courseTitle}",${r.amountFcfa},"${r.paymentMethod}","${r.status}","${r.date}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ephata_inscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Countdown Handler (7 days)
  const handleResetCountdown = (days: number = 7) => {
    const newTarget = resetCountdownTargetDate(days);
    const formatted = newTarget.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setResetFeedback(`Compte à rebours réinitialisé : Clôture fixée au ${formatted} (+${days} jours)`);
    setTimeout(() => setResetFeedback(null), 4000);
  };

  // Full reset for publication
  const handleFullResetForPublication = () => {
    // 1. Clear registrations
    setRegistrations([]);
    localStorage.removeItem('ephata_admin_registrations');

    // 2. Clear student state & progress
    localStorage.removeItem('ephata_student_name');
    localStorage.removeItem('ephata_enrolled_courses');
    localStorage.removeItem('ephata_progress_map');
    localStorage.removeItem('ephata_user_has_enrolled');

    // 3. Reset countdown to fresh 7 days
    const freshTarget = resetCountdownTargetDate(7);

    // 4. Dispatch global event to sync App.tsx
    window.dispatchEvent(new CustomEvent('ephata-reset-publication'));

    const formatted = freshTarget.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setResetFeedback(`Plateforme réinitialisée avec succès ! Cours et inscriptions remis à zéro. Compte à rebours relancé au ${formatted}. Prêt pour la publication.`);
    setTimeout(() => setResetFeedback(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
              Direction · Ephata Consulting Group
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-display">
                Tableau de Bord Direction & Publication
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Gestion des inscriptions, remise à zéro des cours et contrôle du compte à rebours de rentrée.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Alert if action occurred */}
        {resetFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{resetFeedback}</span>
          </div>
        )}

        {/* Publication & Countdown Controls Bar */}
        <div className="bg-amber-50 border-b border-amber-200 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Contrôle Publication & Rentrée des Formations</span>
            </div>
            <p className="text-xs text-slate-600 max-w-xl">
              Prêt pour le lancement officiel ? Réinitialisez les données de tests pour démarrer avec un compteur et des cours 100% neufs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex rounded-lg border border-amber-300 bg-white p-0.5 text-xs shadow-xs">
              <button
                onClick={() => handleResetCountdown(7)}
                className="px-2.5 py-1 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition"
                title="Relancer le compte à rebours pour 7 jours"
              >
                Chrono +7j
              </button>
              <button
                onClick={() => handleResetCountdown(14)}
                className="px-2.5 py-1 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition"
                title="Relancer le compte à rebours pour 14 jours"
              >
                Chrono +14j
              </button>
              <button
                onClick={() => handleResetCountdown(30)}
                className="px-2.5 py-1 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition"
                title="Relancer le compte à rebours pour 30 jours"
              >
                Chrono +30j
              </button>
            </div>

            <button
              onClick={handleFullResetForPublication}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Remise à Zéro (Publication)</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-slate-50 border-b border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Total Inscrits Réels</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{registrations.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Apprenants récents</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Recettes Réelles</span>
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl font-bold text-slate-900 font-display">
              {totalRevenue.toLocaleString('fr-FR')} <span className="text-xs text-slate-500">FCFA</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              ≈ {Math.round(totalRevenue / 655.957)} €
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Offres au Catalogue</span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{COURSES.length}</p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">4 Formations + 3 Packs</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Statut Plateforme</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-800">Prêt pour Publication</span>
            </div>
            <p className="text-[10px] text-emerald-600 font-medium mt-1">100% autonome</p>
          </div>
        </div>

        {/* Content: Learners table */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un apprenant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-none"
              />
            </div>

            <button
              onClick={handleExportCsv}
              disabled={registrations.length === 0}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition border ${
                registrations.length === 0 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 cursor-pointer'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter vers Excel (CSV)</span>
            </button>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Apprenant</th>
                    <th className="p-3">Formation</th>
                    <th className="p-3">Montant & Mode</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRegistrations.length > 0 ? (
                    filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{reg.name}</p>
                          <p className="text-[11px] text-slate-500">{reg.phone}</p>
                          <p className="text-[10px] text-slate-400">{reg.email}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-slate-800">{reg.courseTitle}</p>
                          <span className="text-[10px] text-slate-400">Réf : {reg.id}</span>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{reg.amountFcfa.toLocaleString('fr-FR')} FCFA</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {reg.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            reg.status === 'Validé' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : reg.status === 'Confirmé'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              reg.status === 'Validé' ? 'bg-emerald-500' : reg.status === 'Confirmé' ? 'bg-blue-500' : 'bg-amber-500'
                            }`} />
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">
                          {reg.date}
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleToggleStatus(reg.id)}
                            className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                          >
                            Changer statut
                          </button>
                          <button
                            onClick={() => handleSendWhatsAppNotification(reg)}
                            title="Envoyer confirmation sur WhatsApp"
                            className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50 border border-emerald-200 inline-block align-middle"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-400">
                        <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-medium text-slate-600 text-sm">Aucune inscription enregistrée</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                          La base de données est remise à neuf pour la publication. Les nouvelles inscriptions via Wave, Orange Money et WhatsApp apparaîtront ici automatiquement.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Ephata Consulting Group · Contact Direction : <strong>+221 77 507 91 84</strong>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            Fermer le panneau
          </button>
        </div>

      </div>
    </div>
  );
};
