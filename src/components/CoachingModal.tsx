import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-200">
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Accompagnement Sur-Mesure</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Réserver votre Séance de Coaching (3 Mois)
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

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Demande envoyée avec succès !
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Votre message a été transmis directement à notre équipe de consultants via WhatsApp. Vous recevrez une proposition de créneau sous 24h ouvrées.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#0A2540] text-white text-xs font-bold rounded-xl"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-2.5 text-[11px] leading-relaxed">
              Séances organisées <strong>en ligne</strong> (visioconférence) ou <strong>en présentiel</strong> à notre cabinet (<strong>Sicap liberté 5A, Dakar Sénégal</strong>).
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Votre Nom & Prénom
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Fatou Diop"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Numéro WhatsApp / Téléphone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex : +221 77 507 91 84"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Thématique Principale
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Entreprenariat & Business Plan">Entreprenariat & Révision de Business Plan</option>
                <option value="Éducation Financière & Dettes">Éducation Financière & Stratégie d'Épargne</option>
                <option value="Management des ONG & Statuts">Gouvernance, Statuts & Bailleurs ONG</option>
                <option value="Leadership & Management d'Équipe">Management Relationnel & Résolution de Conflits</option>
                <option value="Pratique Langue Sérère">Pratique de Conversation en Sérère</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description de votre projet ou question
              </label>
              <textarea
                rows={3}
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                placeholder="Expliquez brièvement votre activité, vos blocages ou vos objectifs..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer et fixer mon rendez-vous WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
