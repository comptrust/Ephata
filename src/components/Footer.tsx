import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Heart,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'catalog' | 'dashboard' | 'business-plans' | 'calculator' | 'serere-audio') => void;
  onOpenQuickEnroll: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenQuickEnroll,
  onOpenAdminPanel
}) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t border-slate-800">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Attestation Certifiée</h4>
              <p className="text-xs text-slate-400 mt-0.5">Délivrée officiellement à l'issue de votre formation</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Paiement Mobile Sécurisé</h4>
              <p className="text-xs text-slate-400 mt-0.5">Wave, Orange Money, Ria, Western Union</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Coaching 3 Mois Inclus</h4>
              <p className="text-xs text-slate-400 mt-0.5">Accompagnement personnalisé par nos experts</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Assistance WhatsApp 7j/7</h4>
              <p className="text-xs text-slate-400 mt-0.5">+221 77 507 91 84</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <BrandLogo size="lg" variant="light" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Cabinet d'expertise panafricain spécialisé dans le Conseil, la Formation certifiante et l'Accompagnement des ONG, des PME et des leaders en Afrique de l'Ouest.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Sicap liberté 5A, Dakar Sénégal</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href="tel:+221775079184" className="hover:underline">
                  +221 77 507 91 84
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:adonaywaly5@gmail.com" className="hover:underline">
                  adonaywaly5@gmail.com
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Directeur de la formation : <strong>Alouise Emmanuel Diouf</strong>
              </p>
            </div>
          </div>

          {/* Formations Rapides */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Formations Certifiantes & Packs PDF
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  1. Gestion Financière & Comptabilité des ONGs (100 000 FCFA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  2. Management des ONGs (50 000 FCFA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3. Management Relationnel et Professionnel (50 000 FCFA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  4. Comment Réussir en Entrepreneuriat en Afrique (50 000 FCFA)
                </button>
              </li>
              <li className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-medium"
                >
                  📄 Pack Entrepreneuriat - 30 Plans PDF (10 000 FCFA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-medium"
                >
                  📄 Pack sur l'Éducation Financière PDF (10 000 FCFA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-medium"
                >
                  🎙️ Pack Apprendre le Sérère Sine-Saloum en 30 jours (5 000 FCFA)
                </button>
              </li>
            </ul>
          </div>

          {/* Outils & Ressources Offertes */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Outils & Ressources Incluses
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('business-plans')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Banque des 30 Business Plans</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Simulateur Budget 50/30/20</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('serere-audio')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Studio Audio Sérère (100 expressions)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Mon Espace Apprenant</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuickEnroll}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 font-bold text-amber-300"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>S'inscrire / Payer avec Wave & OM</span>
                </button>
              </li>
              {onOpenAdminPanel && (
                <li>
                  <button
                    onClick={onOpenAdminPanel}
                    className="hover:text-amber-400 text-slate-400 transition-colors text-left flex items-center gap-1 text-[11px]"
                  >
                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                    <span>Direction · Gestion Inscriptions</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Slogan */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ephata Consulting Group. Tous droits réservés.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Conseil · Formation · Accompagnement · </span>
            <span className="text-amber-400 font-bold">Votre réussite, notre priorité !</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
