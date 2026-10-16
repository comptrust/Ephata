import React from 'react';
import { 
  Award, 
  Video, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall,
  Clock,
  Shield,
  Users
} from 'lucide-react';
import { directorAvatar } from '../assets/images';
import { handleImgError } from '../utils/imageFallback';

interface HeroProps {
  onExploreCourses: () => void;
  onOpenBusinessPlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCourses,
  onOpenBusinessPlans
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0E2F54] to-[#0A2540] text-white py-14 sm:py-20">
      {/* Background Subtle Geometrics */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-blue-500 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ephata Consulting Group · Conseil, Formation & Accompagnement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
              Formez-vous aux compétences qui créent de la valeur{' '}
              <span className="text-amber-400 underline decoration-amber-400/50 decoration-wavy decoration-2">
                au Sénégal et en Afrique
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Management des ONG, Leadership professionnel, Pack Entreprenariat avec 30 Business Plans offerts, Éducation Financière et Maîtrise de la Langue Sérère en 30 jours. Apprenez à votre rythme, 100% en ligne, avec attestation certifiée et coaching personnalisé.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Découvrir les 5 Formations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenBusinessPlans}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Voir les 30 Business Plans Inclus</span>
              </button>
            </div>

            {/* Quick Guarantees (Clean typographic metadata, no pill slop) */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-slate-700/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Attestation de formation certifiée</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3 mois de coaching personnalisé</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Paiement sécurisé Wave & Orange Money</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Banner Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#0A2540] border border-amber-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded shadow">
                Formations Phares 2026
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={directorAvatar}
                    alt="Direction Ephata Consulting Group - Alouise Emmanuel Diouf"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImgError(e, 'avatar')}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">Cabinet Ephata Consulting</h3>
                    <p className="text-xs text-amber-300 font-medium">Sicap liberté 5A, Dakar Sénégal</p>
                    <p className="text-[11px] text-slate-400">Direction : Alouise Emmanuel Diouf · « Votre réussite, notre priorité ! »</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-800 text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">1. Gestion Financière & Comptabilité des ONGs</span>
                      <span className="text-[10px] text-amber-300 font-medium">Formation en Ligne Certifiante</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">100 000 FCFA</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">2. Management des ONGs</span>
                      <span className="text-[10px] text-amber-300 font-medium">Formation en Ligne Certifiante</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">50 000 FCFA</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">3. Management Relationnel et Professionnel</span>
                      <span className="text-[10px] text-amber-300 font-medium">Formation en Ligne Certifiante</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">50 000 FCFA</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">4. Comment Réussir en Entrepreneuriat en Afrique</span>
                      <span className="text-[10px] text-amber-300 font-medium">Formation en Ligne Certifiante</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">50 000 FCFA</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between bg-amber-400/10 px-2 rounded-lg my-1">
                    <div>
                      <span className="text-amber-300 font-bold block">Packs Numériques PDF (10 000 FCFA chacun)</span>
                      <span className="text-[10px] text-slate-300">Pack Entrepreneuriat & Pack sur l'Éducation Financière (Vendus en PDF)</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">10 000 FCFA <span className="text-[10px] text-amber-300/80 block">chacun</span></span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-medium block">Pack Apprendre le Sérère Sine-Saloum en 30 jours</span>
                      <span className="text-[10px] text-slate-400">Guide PDF complet + Audios studio</span>
                    </div>
                    <span className="font-bold text-amber-400 text-right">5 000 FCFA</span>
                  </div>
                </div>

                {/* Direct Contact Button */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/221775079184?text=Bonjour%20Ephata%20Consulting%20Group,%20je%20souhaite%20m'inscrire%20à%20vos%20cours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Assistance Inscription : +221 77 507 91 84</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
