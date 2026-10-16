import React, { useState } from 'react';
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
  ShieldCheck, 
  PhoneCall,
  UserCheck,
  Download
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

  if (!isOpen || !course) return null;

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(course.price) + ' FCFA';
  const formattedOriginalPrice = course.originalPrice 
    ? new Intl.NumberFormat('fr-FR').format(course.originalPrice) + ' FCFA' 
    : null;

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header with optional banner image background */}
        <div className="relative bg-[#0A2540] text-white p-6 sm:p-8 overflow-hidden">
          {course.imageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
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

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            {/* Clean metadata */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
              <span>{course.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{course.durationWeeks || course.totalHours}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {course.title}
            </h2>

            {/* Special PDF product banner */}
            {course.isPdfOnly && (
              <div className="mt-3 px-3.5 py-2 rounded-xl bg-amber-500/25 border border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ouvrage vendu au format PDF à 10 000 FCFA · Ce n'est pas une formation en ligne</span>
              </div>
            )}

            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {course.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10 pt-4">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{course.isPdfOnly ? 'Ouvrage Complet & Fiches' : `${course.modules.length} Modules Détaillés`}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{course.isPdfOnly ? 'Fichier PDF à télécharger' : course.totalHours}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{course.isPdfOnly ? 'Ephata Consulting Group' : 'Attestation Certifiée Ephata'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[68vh] overflow-y-auto space-y-8">
          {/* Overview & Description */}
          <div>
            <h3 className="text-base font-bold text-[#0A2540] mb-2">Présentation de la Formation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Inclusions & Bonuses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ce qui est inclus
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {course.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-700" />
                Bonus Spéciaux Offerts
              </h4>
              <ul className="space-y-2 text-xs text-amber-900">
                {course.bonuses.map((bonus, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">★</span>
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Curriculum Modules Accordion */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#0A2540]">
                {course.isPdfOnly ? "Sommaire & Table des Matières de l'Ouvrage PDF" : `Programme des ${course.modules.length} Modules`}
              </h3>
              <span className="text-xs text-slate-500">
                {course.isPdfOnly ? "Fiches & Chapitres inclus" : `${course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} leçons au total`}
              </span>
            </div>

            <div className="space-y-2.5">
              {course.modules.map((mod) => {
                const isExpanded = expandedModule === mod.number;
                return (
                  <div
                    key={mod.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleModule(mod.number)}
                      className="w-full p-3.5 sm:p-4 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0A2540] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {mod.number}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {mod.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">
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
                      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {mod.description}
                        </p>
                        <div className="space-y-1.5 pt-2">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-50 text-xs text-slate-700"
                            >
                              <div className="flex items-center gap-2">
                                {lesson.type === 'video' ? (
                                  <Video className="w-3.5 h-3.5 text-blue-600" />
                                ) : (
                                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                                <span className="font-medium">{lesson.title}</span>
                              </div>
                              <span className="text-slate-400 text-[11px]">
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

          {/* Instructor & Guarantee */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            {course.instructor.avatarUrl ? (
              <img
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                referrerPolicy="no-referrer"
                onError={(e) => handleImgError(e, 'avatar')}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-700 font-bold text-lg shrink-0">
                ECG
              </div>
            )}
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900">
                {course.instructor.name}
              </h4>
              <p className="text-xs text-amber-700 font-medium">
                {course.instructor.title}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0A2540]">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              Paiement Wave, Orange Money ou Western Union
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/221775079184?text=${encodeURIComponent(`Bonjour Ephata Consulting, je souhaite commander l'ouvrage : ${course.title} (${course.isPdfOnly ? 'Pack PDF à 10 000 FCFA' : formattedPrice})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Commander sur WhatsApp</span>
            </a>

            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  onStartCourse(course);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-6 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                {course.isPdfOnly ? (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Consulter / Télécharger le PDF</span>
                  </>
                ) : (
                  <span>Accéder à la Classe</span>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-6 text-sm font-bold text-white bg-[#0A2540] hover:bg-amber-600 rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                {course.isPdfOnly ? (
                  <>
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Acheter le PDF (10 000 FCFA)</span>
                  </>
                ) : (
                  <span>S'inscrire maintenant ({formattedPrice})</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
