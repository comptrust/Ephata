import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Sparkles, 
  CheckCircle2,
  Send
} from 'lucide-react';

interface CoachingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
}

export const CoachingModal: React.FC<CoachingModalProps> = ({
  isOpen,
  onClose,
  defaultName = ''
}) => {
  const [name, setName] = useState(defaultName || '');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Entreprenariat & Business Plan');
  const [projectSummary, setProjectSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Bonjour Cabinet Ephata Consulting Group,\n\nJe souhaite planifier ma séance de coaching personnalisé (3 mois inclus avec ma formation).\nNom : ${name}\nTéléphone : ${phone}\nThème : ${subject}\nRésumé du projet / besoin : ${projectSummary || 'Accompagnement général'}`
    );
    window.open(`https://wa.me/221775079184?text=${msg}`, '_blank');
    setSubmitted(true);
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
          className="relative w-full max-w-lg max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 bg-[#0A2540] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between border-b border-slate-700 z-20">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-4 h-4" />
                <span>Accompagnement Sur-Mesure</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Réserver votre Séance de Coaching
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Demande de coaching envoyée !</h3>
                <p className="text-slate-600 text-xs max-w-sm mx-auto">
                  Votre demande a été transmise directement sur WhatsApp au cabinet Ephata Consulting (+221 77 507 91 84). Notre équipe conviendra d'un créneau dans les 24h.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-5 py-2 bg-[#0A2540] text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors"
                >
                  Fermer cette fenêtre
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>3 Mois de Coaching Offerts</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Séances individuelles par visio ou à Sicap liberté 5A pour auditer votre modèle d'affaires, vos finances ou votre gouvernance d'ONG.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                    Votre Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Moussa Ndiaye"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                    Votre Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex : +221 77 123 45 67"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                    Thématique Prioritaire
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Compétences de Vie & Confiance en Soi">Compétences de Vie & Confiance en Soi</option>
                    <option value="Management & Procédures OCB / ONG">Management & Procédures OCB / ONG</option>
                    <option value="Rapprochements Bancaires & Contrôle Interne">Rapprochements Bancaires & Contrôle Interne</option>
                    <option value="Entreprenariat & 30 Business Plans">Entreprenariat & 30 Business Plans</option>
                    <option value="Éducation Financière & Investissement">Éducation Financière & Investissement</option>
                    <option value="Langues Wolof & Sérère">Langues Wolof & Sérère</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                    Description Rapide de votre Projet ou Besoin
                  </label>
                  <textarea
                    rows={3}
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    placeholder="Précisez votre projet, vos questions ou votre objectif..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-3.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                  >
                    ✕ Fermer
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Envoyer la demande sur WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
