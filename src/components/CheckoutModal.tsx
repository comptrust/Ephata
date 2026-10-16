import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  CheckCircle2, 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck,
  CreditCard,
  MessageCircle,
  QrCode,
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

  if (!isOpen || !course) return null;

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(course.price) + ' FCFA';
  const priceDisplay = course.priceEur 
    ? `${formattedPrice} (soit ${course.priceEur} €)`
    : formattedPrice;
  const merchantPhone = '77 507 91 84';
  const internationalPhone = '+221 77 507 91 84';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    course.isPdfOnly
      ? `Bonjour M. Alouise Emmanuel Diouf (Ephata Consulting Group),\n\nJe souhaite commander l'ouvrage vendu au format PDF : *${course.title}* (Tarif : *10 000 FCFA*).\n\nNom : ${studentFullName || '[Votre Nom]'}\nNuméro : ${studentPhone || '[Votre Numéro WhatsApp]'}\nAdresse : Sicap liberté 5A, Dakar Sénégal\n\nMerci de m'envoyer le fichier PDF complet dès validation de mon règlement.`
      : `Bonjour M. Alouise Emmanuel Diouf (Ephata Consulting Group),\n\nJe souhaite m'inscrire à la formation : *${course.title}* (Tarif : *${priceDisplay}*).\nModalité : *${selectedModality === 'online' ? 'En Ligne (24h/24)' : 'En Présentiel (Sicap liberté 5A)'}*\nFormat : *${selectedFormat === 'individuel' ? 'En Individuel' : 'En Groupe'}*\nNom : ${studentFullName || '[Votre Nom]'}\nNuméro : ${studentPhone || '[Votre Numéro]'}\n\nMerci de confirmer les détails de démarrage.`
  );
  const whatsappUrl = `https://wa.me/221775079184?text=${whatsappMessage}`;

  const handleInstantActivate = () => {
    onConfirmEnrollment(course.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          {course.imageUrl && (
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
              <img
                src={course.imageUrl}
                alt={course.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImgError(e, 'course')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/80 to-transparent" />
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Paiement Sécurisé & Inscription Immédiate</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {course.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price & Summary Banner */}
        <div className="bg-amber-500 text-slate-950 p-4 px-6 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider">
              {course.isPdfOnly ? 'Tarif unique du document PDF' : 'Montant de la formation'}
            </span>
            <div className="text-2xl font-black">{priceDisplay}</div>
          </div>
          <div className="text-right text-xs">
            <span className="font-bold">Directeur : Alouise Emmanuel Diouf</span>
            <div className="text-slate-900 text-[11px] font-medium">adonaywaly5@gmail.com</div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* If isPdfOnly: Show prominent PDF information banner instead of live class options */}
          {course.isPdfOnly ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Format : Ouvrage & Documents en PDF (10 000 FCFA)</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Ce produit est vendu exclusivement sous forme d'ouvrage et documents au format PDF (<strong>ce n'est pas une formation vidéo en ligne</strong>). Dès confirmation de votre règlement de <strong>10 000 FCFA (15 €)</strong>, vous recevez le fichier PDF complet sur WhatsApp ou par e-mail.
              </p>
              <div className="text-[11px] text-emerald-800 font-semibold bg-white p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Téléchargement immédiat + Envoi direct sur votre WhatsApp (+221 77 507 91 84)</span>
              </div>
            </div>
          ) : (
            /* Modality & Format Selection (En ligne / Présentiel & Individuel / Groupe) */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
              <div>
                <label className="block text-[11px] font-bold text-amber-950 uppercase mb-1.5">
                  Modalité de formation
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedModality('online')}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold border transition-all ${
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
                    className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold border transition-all ${
                      selectedModality === 'presentiel'
                        ? 'bg-[#0A2540] text-white border-[#0A2540]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    🏛️ En Présentiel
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-950 uppercase mb-1.5">
                  Format d'apprentissage
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('individuel')}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold border transition-all ${
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
                    className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold border transition-all ${
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

          {/* Learner Info Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Votre Nom & Prénom (Pour l'attestation)
              </label>
              <input
                type="text"
                value={studentFullName}
                onChange={(e) => setStudentFullName(e.target.value)}
                placeholder="Ex : Aminata Sow"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Numéro WhatsApp / Téléphone
              </label>
              <input
                type="tel"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="Ex : +221 77 123 45 67"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Switcher (Interactive Segmented buttons) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Choisissez votre mode de règlement :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActivePaymentTab('wave')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  activePaymentTab === 'wave'
                    ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs">🐧 Wave</div>
                <div className="text-[10px] text-slate-500">Sénégal & Côte d'Ivoire</div>
              </button>

              <button
                onClick={() => setActivePaymentTab('om')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  activePaymentTab === 'om'
                    ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs">🟧 Orange Money</div>
                <div className="text-[10px] text-slate-500">UEMOA / Sénégal</div>
              </button>

              <button
                onClick={() => setActivePaymentTab('whatsapp')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  activePaymentTab === 'whatsapp'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs">💬 WhatsApp Direct</div>
                <div className="text-[10px] text-slate-500">Conseiller Ephata</div>
              </button>

              <button
                onClick={() => setActivePaymentTab('international')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  activePaymentTab === 'international'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs">🌍 Ria / Western Union</div>
                <div className="text-[10px] text-slate-500">Diaspora & Monde</div>
              </button>
            </div>
          </div>

          {/* Payment Details Container */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            {activePaymentTab === 'wave' && (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase">
                      Instructions de Paiement Wave
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Transférez la somme de <strong className="text-blue-950">{formattedPrice}</strong> vers le compte marchand ou numéro officiel :
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Numéro Wave Ephata</span>
                    <span className="text-base font-extrabold text-[#0A2540]">{internationalPhone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('+221775079184')}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>1. Ouvrez votre application <strong>Wave</strong> sur smartphone.</p>
                  <p>2. Envoyez <strong>{formattedPrice}</strong> au <strong>+221 77 507 91 84</strong> (Ephata Consulting).</p>
                  <p>3. Cliquez sur "Activer ma formation maintenant" pour débloquer immédiatement votre classe en ligne.</p>
                </div>
              </div>
            )}

            {activePaymentTab === 'om' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-orange-900 uppercase">
                  Instructions Orange Money
                </h4>
                <p className="text-xs text-slate-600">
                  Composez le code USSD Orange Money ou effectuez le transfert via l'application Orange Money Max vers le numéro :
                </p>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Numéro Orange Money</span>
                    <span className="text-base font-extrabold text-[#0A2540]">{internationalPhone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('+221775079184')}
                    className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500">
                  Code USSD au Sénégal : <strong>#144#</strong> puis Transfert d'argent vers le <strong>77 507 91 84</strong>.
                </div>
              </div>
            )}

            {activePaymentTab === 'whatsapp' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-900 uppercase">
                  Échange direct avec un conseiller Ephata
                </h4>
                <p className="text-xs text-slate-600">
                  Vous préférez finaliser votre inscription avec notre équipe d'accompagnement ou payer par virement bancaire / espèces ?
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuter sur WhatsApp (+221 77 507 91 84)</span>
                </a>
              </div>
            )}

            {activePaymentTab === 'international' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase">
                  Paiements Internationaux (Ria, Western Union, MoneyGram)
                </h4>
                <div className="text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                  <p><strong>Bénéficiaire :</strong> Ephata Consulting Group</p>
                  <p><strong>Adresse :</strong> Sicap liberté 5A, Dakar Sénégal</p>
                  <p><strong>Téléphone contact :</strong> +221 77 507 91 84 (221 77 507 91 84)</p>
                  <p><strong>Email officiel :</strong> adonaywaly5@gmail.com</p>
                </div>
                <p className="text-[11px] text-slate-500">
                  Une fois le bordereau émis, envoyez la référence MTCN sur WhatsApp au +221 77 507 91 84.
                </p>
              </div>
            )}
          </div>

          {/* Instant Activation Simulator Button */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Contacter l'assistance WhatsApp</span>
            </a>

            <button
              onClick={handleInstantActivate}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {course.isPdfOnly ? (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Confirmer la commande du PDF (Accès / Téléchargement immédiat)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Activer ma formation maintenant (Accès immédiat)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
