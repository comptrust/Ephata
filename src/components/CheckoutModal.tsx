import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck,
  MessageCircle,
  FileText,
  Download
} from 'lucide-react';
import { handleImgError } from '../utils/imageFallback';

interface CheckoutModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmEnrollment: (courseId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  course,
  isOpen,
  onClose,
  onConfirmEnrollment
}) => {
  const [activePaymentTab, setActivePaymentTab] = useState<'wave' | 'om' | 'whatsapp' | 'international'>('wave');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [studentFullName, setStudentFullName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  const [selectedModality, setSelectedModality] = useState<'online' | 'presentiel'>('online');
  const [selectedFormat, setSelectedFormat] = useState<'individuel' | 'groupe'>('individuel');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // prevent background scrolling
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(course.price) + ' FCFA';
  const priceDisplay = course.priceEur 
    ? `${formattedPrice} (soit ${course.priceEur} €)`
    : formattedPrice;
  const internationalPhone = '+221 77 507 91 84';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    course.isService
      ? `Bonjour M. Alouise Emmanuel Diouf (Ephata Consulting Group),\n\nJe souhaite commander la prestation de rapprochements bancaires : *${course.title}* (Tarif : *${priceDisplay}* sous 48H).\n\nNom / Entreprise : ${studentFullName || '[Votre Nom]'}\nNuméro : ${studentPhone || '[Votre Numéro]'}\n\nMerci de m'indiquer la procédure d'envoi des 3 documents comptables.`
      : course.isPdfOnly
        ? `Bonjour M. Alouise Emmanuel Diouf (Ephata Consulting Group),\n\nJe souhaite commander l'ouvrage vendu au format PDF : *${course.title}* (Tarif : *10 000 FCFA*).\n\nNom : ${studentFullName || '[Votre Nom]'}\nNuméro : ${studentPhone || '[Votre Numéro WhatsApp]'}\nAdresse : Sicap liberté 5A, Dakar Sénégal\n\nMerci de m'envoyer le fichier PDF complet dès validation de mon règlement.`
        : `Bonjour M. Alouise Emmanuel Diouf (Ephata Consulting Group),\n\nJe souhaite m'inscrire à la formation : *${course.title}* (Tarif : *${priceDisplay}*).\nModalité : *${selectedModality === 'online' ? 'En Ligne (24h/24)' : 'En Présentiel (Sicap liberté 5A)'}*\nFormat : *${selectedFormat === 'individuel' ? 'En Individuel' : 'En Groupe'}*\nNom : ${studentFullName || '[Votre Nom]'}\nNuméro : ${studentPhone || '[Votre Numéro]'}\n\nMerci de confirmer les détails de démarrage.`
  );
  const whatsappUrl = `https://wa.me/221775079184?text=${whatsappMessage}`;

  const handleInstantActivate = () => {
    onConfirmEnrollment(course.id);
    onClose();
  };

  return (
    <>
      {/* Floating high-priority Close Button at top-right of screen for absolute accessibility */}
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
        {/* Modal Card - strictly limited to 88vh with internal flex-col and overflow-y-auto */}
        <div 
          className="relative w-full max-w-xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. STICKY TOP HEADER */}
          <div className="shrink-0 bg-[#0A2540] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between z-20 border-b border-slate-800">
            <div className="min-w-0 pr-3">
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Paiement Sécurisé & Inscription</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white truncate mt-0.5">
                {course.title}
              </h2>
            </div>

            {/* In-header Close Button */}
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

          {/* 2. STICKY PRICE BANNER */}
          <div className="shrink-0 bg-amber-500 text-slate-950 py-2.5 px-4 sm:px-6 flex items-center justify-between z-10 shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block">
                {course.isService 
                  ? 'Tarif de la prestation express 48H' 
                  : course.isPdfOnly 
                    ? 'Tarif unique du document PDF' 
                    : 'Montant de la formation'}
              </span>
              <div className="text-lg sm:text-xl font-black leading-tight">
                {priceDisplay}
              </div>
            </div>
            <div className="text-right text-[11px]">
              <span className="font-bold block">Direction : Alouise Emmanuel Diouf</span>
              <span className="text-slate-900 font-medium">+221 77 507 91 84</span>
            </div>
          </div>

          {/* 3. SCROLLABLE INNER BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
            {/* If isPdfOnly: Show PDF banner */}
            {course.isPdfOnly ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-xs">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Format : Ouvrage & Documents en PDF (10 000 FCFA)</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Ce produit est vendu sous forme d'ouvrage et documents au format PDF (<strong>ce n'est pas une formation vidéo en ligne</strong>). Dès confirmation, vous recevez le fichier PDF complet sur WhatsApp ou e-mail.
                </p>
                <div className="text-[11px] text-emerald-800 font-semibold bg-white p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Envoi immédiat sur votre WhatsApp (+221 77 507 91 84)</span>
                </div>
              </div>
            ) : course.isService ? (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1.5">
                <span className="font-bold text-blue-900 block">⚡ Prestation Express sous 48H</span>
                <p className="text-[11px] text-slate-700">
                  Après votre règlement, transmettez les 3 pièces (dernier rapprochement, transactions du mois, original du relevé) sur WhatsApp au <strong>+221 77 507 91 84</strong> pour restitution sous 48 heures.
                </p>
              </div>
            ) : (
              /* Modality & Format Selection */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                <div>
                  <label className="block text-[10px] font-bold text-amber-950 uppercase mb-1">
                    Modalité de formation
                  </label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedModality('online')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold border transition-all text-[11px] ${
                        selectedModality === 'online'
                          ? 'bg-[#0A2540] text-white border-[#0A2540]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      🌐 En Ligne
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedModality('presentiel')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold border transition-all text-[11px] ${
                        selectedModality === 'presentiel'
                          ? 'bg-[#0A2540] text-white border-[#0A2540]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      🏛️ Présentiel
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-950 uppercase mb-1">
                    Format d'apprentissage
                  </label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('individuel')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold border transition-all text-[11px] ${
                        selectedFormat === 'individuel'
                          ? 'bg-[#0A2540] text-white border-[#0A2540]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      👤 En Individuel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('groupe')}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold border transition-all text-[11px] ${
                        selectedFormat === 'groupe'
                          ? 'bg-[#0A2540] text-white border-[#0A2540]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      👥 En Groupe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Student Identification Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                  Votre Nom & Prénom (pour l'attestation)
                </label>
                <input
                  type="text"
                  placeholder="Ex : Aminata Sow"
                  value={studentFullName}
                  onChange={(e) => setStudentFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                  Numéro WhatsApp / Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="Ex : +221 77 123 45 67"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1.5">
                Choisissez votre mode de règlement :
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActivePaymentTab('wave')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    activePaymentTab === 'wave'
                      ? 'border-blue-500 bg-blue-50/80 text-blue-900 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xs">🐧 Wave</span>
                  <span className="text-[10px] text-slate-500">Sénégal & Côte d'Ivoire</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePaymentTab('om')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    activePaymentTab === 'om'
                      ? 'border-orange-500 bg-orange-50/80 text-orange-900 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xs">🟧 Orange Money</span>
                  <span className="text-[10px] text-slate-500">UEMOA / Sénégal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePaymentTab('whatsapp')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    activePaymentTab === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xs">💬 WhatsApp Direct</span>
                  <span className="text-[10px] text-slate-500">Conseiller Ephata</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePaymentTab('international')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    activePaymentTab === 'international'
                      ? 'border-amber-500 bg-amber-50/80 text-amber-900 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xs">🌍 Ria / Western Union</span>
                  <span className="text-[10px] text-slate-500">Diaspora & Monde</span>
                </button>
              </div>
            </div>

            {/* Tab Detailed Content */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              {activePaymentTab === 'wave' && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-blue-900 uppercase">
                    Instructions de Paiement Wave
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Transférez la somme de <strong>{formattedPrice}</strong> vers le compte marchand ou numéro officiel :
                  </p>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-blue-200 shadow-2xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Numéro Wave Ephata</span>
                      <span className="text-sm font-extrabold text-[#0A2540]">{internationalPhone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('+221775079184')}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    <p>1. Ouvrez votre application <strong>Wave</strong> sur smartphone.</p>
                    <p>2. Envoyez <strong>{formattedPrice}</strong> au <strong>+221 77 507 91 84</strong> (Ephata Consulting).</p>
                    <p>3. Cliquez sur "Activer ma formation maintenant" pour débloquer immédiatement votre accès.</p>
                  </div>
                </div>
              )}

              {activePaymentTab === 'om' && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-orange-900 uppercase">
                    Instructions Orange Money
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Effectuez le transfert via Orange Money Max ou par USSD vers le numéro :
                  </p>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-orange-200 shadow-2xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Numéro Orange Money</span>
                      <span className="text-sm font-extrabold text-[#0A2540]">{internationalPhone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('+221775079184')}
                      className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Code USSD au Sénégal : <strong>#144#</strong> puis transfert vers le <strong>77 507 91 84</strong>.
                  </div>
                </div>
              )}

              {activePaymentTab === 'whatsapp' && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase">
                    Échange direct avec un conseiller Ephata
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Finalisez votre commande directement avec M. Alouise Emmanuel Diouf :
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Discuter sur WhatsApp (+221 77 507 91 84)</span>
                  </a>
                </div>
              )}

              {activePaymentTab === 'international' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 uppercase">
                    Paiements Internationaux (Ria, Western Union)
                  </h4>
                  <div className="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                    <p><strong>Bénéficiaire :</strong> Ephata Consulting Group</p>
                    <p><strong>Adresse :</strong> Sicap liberté 5A, Dakar Sénégal</p>
                    <p><strong>Téléphone contact :</strong> +221 77 507 91 84</p>
                    <p><strong>Email :</strong> adonaywaly5@gmail.com</p>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Envoyez la référence MTCN sur WhatsApp au +221 77 507 91 84 dès émission du bordereau.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 4. STICKY BOTTOM ACTION FOOTER */}
          <div className="shrink-0 bg-slate-50 p-3 sm:p-4 px-4 sm:px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-20">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                ✕ Fermer
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp (+221 77 507 91 84)</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleInstantActivate}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {course.isPdfOnly ? (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Confirmer la commande (Accès immédiat)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Activer ma formation (Accès immédiat)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
