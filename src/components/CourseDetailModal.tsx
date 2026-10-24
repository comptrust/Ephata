import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { 
  X, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Gift, 
  Video, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall,
  Download,
  Eye,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { handleImgError } from '../utils/imageFallback';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (course: Course) => void;
  onStartCourse: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  isEnrolled,
  onEnroll,
  onStartCourse
}) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [showPosterLightbox, setShowPosterLightbox] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPosterLightbox) {
          setShowPosterLightbox(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, showPosterLightbox]);

  if (!isOpen || !course) return null;

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(course.price) + ' FCFA';
  const formattedOriginalPrice = course.originalPrice 
    ? new Intl.NumberFormat('fr-FR').format(course.originalPrice) + ' FCFA' 
    : null;

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber);
  };

  const whatsappMessage = course.isService
    ? `Bonjour Ephata Consulting, je souhaite commander la prestation : ${course.title} (${formattedPrice} sous 48H)`
    : course.isPdfOnly
      ? `Bonjour Ephata Consulting, je souhaite commander l'ouvrage PDF : ${course.title} (${formattedPrice})`
      : `Bonjour Ephata Consulting, je souhaite m'inscrire à la formation : ${course.title} (${formattedPrice})`;

  return (
    <>
      {/* Floating high-priority Close Button at top-right of screen for instant access */}
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
        {/* Modal Card - strictly limited to 88vh with flex-col */}
        <div 
          className="relative w-full max-w-3xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. STICKY TOP HEADER */}
          <div className="shrink-0 bg-[#0A2540] text-white p-4 sm:p-5 px-5 sm:px-6 relative overflow-hidden border-b border-slate-800 z-20">
            {course.imageUrl && (
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImgError(e, 'course')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-transparent" />
              </div>
            )}

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold mb-1 uppercase tracking-wider">
                  <span>{course.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.executionTime || course.durationWeeks || course.totalHours}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {course.title}
                </h2>

                {course.isService && (
                  <div className="mt-2 px-3 py-1 rounded-lg bg-blue-500/25 border border-blue-400 text-blue-200 text-[11px] font-bold inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span>⚡ Prestation express 48H</span>
                  </div>
                )}

                {course.isPdfOnly && (
                  <div className="mt-2 px-3 py-1 rounded-lg bg-amber-500/25 border border-amber-400 text-amber-300 text-[11px] font-bold inline-flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Ouvrage PDF · Réception immédiate</span>
                  </div>
                )}
              </div>

              {/* In-Header Close Button */}
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
          </div>

          {/* 2. SCROLLABLE INNER BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
            {/* Official Flyer Poster Banner if available */}
            {course.posterUrl && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => setShowPosterLightbox(true)}
                    className="relative w-14 h-18 rounded-lg overflow-hidden border-2 border-amber-400 cursor-pointer shadow-xs shrink-0 hover:scale-105 transition-transform group"
                    title="Cliquer pour agrandir"
                  >
                    <img 
                      src={course.posterUrl} 
                      alt="Affiche officielle" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5 text-white drop-shadow" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Affiche Officielle Ephata Consulting</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Consultez l'affiche promotionnelle originale certifiée par Alouise Emmanuel Diouf.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPosterLightbox(true)}
                  className="py-1.5 px-3 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-300 rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-800" />
                  <span>Agrandir l'affiche</span>
                </button>
              </div>
            )}

            {/* Special Service Section if isService */}
            {course.isService && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Modalités d'Externalisation sous 48H
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px]">
                    Délai Garanti : 48 Heures
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-blue-900">
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px]">
                      📄 Les 3 Documents à envoyer :
                    </span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-700 text-[11px]">
                      <li>Votre dernier rapprochement bancaire</li>
                      <li>Les transactions du mois (journal 521)</li>
                      <li>L'original du relevé bancaire du mois</li>
                    </ol>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px]">
                      ⚙️ Déroulement en 3 étapes :
                    </span>
                    <ul className="space-y-0.5 text-slate-700 text-[11px]">
                      <li><strong>1. Pointer :</strong> Rapprochement ligne à ligne</li>
                      <li><strong>2. Identifier les écarts :</strong> Agios, chèques</li>
                      <li><strong>3. Passer les OD :</strong> Régularisations & certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Overview & Description */}
            <div>
              <h3 className="text-sm font-bold text-[#0A2540] mb-1.5">
                {course.isService ? 'Présentation de la Prestation' : 'Présentation de la Formation'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Inclusions & Bonuses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Ce qui est inclus
                </h4>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  {course.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <h4 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-700" />
                  {course.bonusTitle || 'Bonus & Outils Offerts'}
                </h4>
                <ul className="space-y-1.5 text-[11px] text-amber-900">
                  {course.bonuses.map((bonus, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">★</span>
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Curriculum Modules Accordion */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#0A2540]">
                  {course.isService 
                    ? 'Déroulement du Processus d\'Exécution (48H)'
                    : course.isPdfOnly 
                      ? "Sommaire & Table des Matières de l'Ouvrage PDF" 
                      : `Programme des ${course.modules.length} Modules`}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {course.isService
                    ? 'Méthodologie certifiée'
                    : course.isPdfOnly 
                      ? "Fiches & Chapitres inclus" 
                      : `${course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} leçons au total`}
                </span>
              </div>

              <div className="space-y-2">
                {course.modules.map((mod) => {
                  const isExpanded = expandedModule === mod.number;
                  return (
                    <div
                      key={mod.id}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.number)}
                        className="w-full p-3 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-[#0A2540] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                            {mod.number}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">
                              {mod.title}
                            </h4>
                            <span className="text-[10px] text-slate-500">
                              {mod.duration} · {mod.lessons.length} leçons
                            </span>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {mod.description}
                          </p>
                          <div className="space-y-1 pt-1">
                            {mod.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between py-1 px-2 rounded-md bg-slate-50 text-[11px] text-slate-700"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  {lesson.type === 'video' ? (
                                    <Video className="w-3 h-3 text-blue-600 shrink-0" />
                                  ) : (
                                    <FileText className="w-3 h-3 text-emerald-600 shrink-0" />
                                  )}
                                  <span className="font-medium truncate">{lesson.title}</span>
                                </div>
                                <span className="text-slate-400 text-[10px] shrink-0 ml-2">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-700">Moyens de paiement acceptés :</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">Wave</span>
                <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-bold border border-orange-200 text-[11px]">Orange Money</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">Ria</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[11px]">Western Union</span>
              </div>
            </div>

            {/* Instructor Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              {course.instructor.avatarUrl ? (
                <img
                  src={course.instructor.avatarUrl}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImgError(e, 'avatar')}
                  className="w-12 h-12 rounded-full object-cover object-[center_20%] border-2 border-amber-500 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
                  ECG
                </div>
              )}
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">
                  {course.instructor.name}
                </h4>
                <p className="text-[11px] text-amber-700 font-medium">
                  {course.instructor.title}
                </p>
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>

          {/* 3. STICKY BOTTOM ACTION FOOTER */}
          <div className="shrink-0 bg-slate-50 p-3 sm:p-4 px-4 sm:px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                ✕ Fermer
              </button>

              <div className="text-left">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-[#0A2540]">
                    {formattedPrice}
                  </span>
                  {course.priceEur && (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      soit {course.priceEur} €
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/221775079184?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {isEnrolled ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartCourse(course);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {course.isPdfOnly ? (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Consulter PDF</span>
                    </>
                  ) : (
                    <span>Accéder à l'espace</span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEnroll(course);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold text-white bg-[#0A2540] hover:bg-amber-600 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {course.isService ? (
                    <span>Commander ({formattedPrice})</span>
                  ) : course.isPdfOnly ? (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Acheter ({formattedPrice})</span>
                    </>
                  ) : (
                    <span>S'inscrire ({formattedPrice})</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Poster Lightbox Modal */}
      {showPosterLightbox && course.posterUrl && (
        <div 
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowPosterLightbox(false)}
        >
          <div 
            className="relative max-w-2xl max-h-[92vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-white text-xs">
              <span className="font-bold flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Affiche Officielle · {course.title}
              </span>
              <button 
                type="button"
                onClick={() => setShowPosterLightbox(false)}
                className="p-1 px-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Fermer</span>
              </button>
            </div>
            <div className="overflow-auto max-h-[82vh] p-2 flex items-center justify-center bg-slate-950">
              <img 
                src={course.posterUrl} 
                alt={`Affiche officielle ${course.title}`}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
