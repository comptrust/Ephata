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
  Calendar
} from 'lucide-react';
import { COURSES } from '../data/coursesData';

interface RegistrationRecord {
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

const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'REG-101',
    name: 'Moussa Ndiaye',
    phone: '+221 77 412 88 19',
    email: 'moussa.ndiaye@gmail.com',
    courseTitle: 'Gestion Financière et Comptabilité des ONGs',
    amountFcfa: 100000,
    paymentMethod: 'Wave',
    status: 'Validé',
    date: '2026-10-09'
  },
  {
    id: 'REG-102',
    name: 'Fatou Binetou Sarr',
    phone: '+221 78 230 45 67',
    email: 'fatou.sarr@outlook.com',
    courseTitle: 'Pack Entrepreneuriat (30 Business Plans PDF)',
    amountFcfa: 10000,
    paymentMethod: 'Orange Money',
    status: 'Validé',
    date: '2026-10-08'
  },
  {
    id: 'REG-103',
    name: 'Abdoulaye Diallo',
    phone: '+221 76 543 21 09',
    email: 'a.diallo.ong@ong-espoir.org',
    courseTitle: 'Management des ONG',
    amountFcfa: 50000,
    paymentMethod: 'Wave',
    status: 'Confirmé',
    date: '2026-10-08'
  },
  {
    id: 'REG-104',
    name: 'Mariama Diop',
    phone: '+221 70 889 12 34',
    email: 'mariama.diop@yahoo.fr',
    courseTitle: 'Pack Éducation Financière & Investissement',
    amountFcfa: 30000,
    paymentMethod: 'Wave',
    status: 'Validé',
    date: '2026-10-07'
  },
  {
    id: 'REG-105',
    name: 'Jean-Baptiste Faye',
    phone: '+33 6 12 34 56 78',
    email: 'jb.faye@diaspora-paris.fr',
    courseTitle: 'Cours de Langue Sérère (100 expressions)',
    amountFcfa: 30000,
    paymentMethod: 'Western Union',
    status: 'En attente',
    date: '2026-10-07'
  }
];

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ 
  isOpen, 
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for easy access
  const [passcode, setPasscode] = useState('');
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    const saved = localStorage.getItem('ephata_admin_registrations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_REGISTRATIONS;
  });
  const [searchTerm, setSearchTerm] = useState('');

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
                Tableau de Bord Direction & Inscriptions
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Suivi des inscriptions apprenants, validation des paiements (Wave, Orange Money) et export.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-slate-50 border-b border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Total Inscrits</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{registrations.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Apprenants enregistrés</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Recettes encaissées</span>
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
              <span>Formations actives</span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{COURSES.length}</p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Programmes certifiants</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Statut Plateforme</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-800">Opérationnelle</span>
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition border border-slate-200"
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
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{reg.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{reg.phone}</div>
                        <div className="text-[10px] text-slate-400">{reg.email}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-800 max-w-xs">
                        {reg.courseTitle}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">
                          {reg.amountFcfa.toLocaleString('fr-FR')} FCFA
                        </div>
                        <span className="inline-block mt-0.5 text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {reg.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleStatus(reg.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                            reg.status === 'Validé'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : reg.status === 'Confirmé'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            reg.status === 'Validé' ? 'bg-emerald-600' : reg.status === 'Confirmé' ? 'bg-blue-600' : 'bg-amber-600'
                          }`}></span>
                          <span>{reg.status}</span>
                        </button>
                      </td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">
                        {reg.date}
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleSendWhatsAppNotification(reg)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition inline-flex items-center gap-1 border border-emerald-200 text-[11px]"
                          title="Envoyer confirmation WhatsApp à l'apprenant"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <div>
            Siège : <strong>Sicap liberté 5A, Dakar Sénégal</strong> · Contact : <strong>+221 77 507 91 84</strong> · <span className="font-mono">adonaywaly5@gmail.com</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
