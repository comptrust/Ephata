import React from 'react';
import { Course } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Gift, 
  Award,
  Sparkles,
  Smartphone,
  FileText,
  Download
} from 'lucide-react';
import { handleImgError } from '../utils/imageFallback';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onOpenDetails: (course: Course) => void;
  onStartCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  onOpenDetails,
  onStartCourse,
  onEnroll
}) => {
  // Format FCFA
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(course.price) + ' FCFA';
  const formattedOriginalPrice = course.originalPrice 
    ? new Intl.NumberFormat('fr-FR').format(course.originalPrice) + ' FCFA' 
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Course Thumbnail Image */}
        {course.imageUrl && (
          <div 
            className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer" 
            onClick={() => onOpenDetails(course)}
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              referrerPolicy="no-referrer"
              onError={(e) => handleImgError(e, 'course')}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs font-bold text-amber-400">
                {course.categoryLabel}
              </span>
              <span className="font-semibold text-slate-200 drop-shadow">
                {course.totalHours}
              </span>
            </div>
          </div>
        )}

        {/* Card Header Top */}
        <div className="p-6 pb-4">
          {/* Unboxed clean metadata (Zero-pill discipline) */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2.5">
            <span className="text-amber-700 font-semibold tracking-wide uppercase">
              {course.badge || course.categoryLabel}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.totalHours}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(course)}
            className="text-xl font-bold text-[#0A2540] group-hover:text-amber-600 transition-colors cursor-pointer leading-snug"
          >
            {course.title}
          </h3>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Special banner for PDF products */}
          {course.isPdfOnly && (
            <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300/80 text-[11px] font-bold text-amber-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Vente sous forme de PDF · Ce n'est pas une formation en ligne</span>
            </div>
          )}

          {/* Key Inclusions / Modules Count (clean inline metadata) */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            {course.isPdfOnly ? (
              <>
                <span className="font-bold text-amber-700">Document PDF complet</span>
                <span aria-hidden="true">·</span>
                <span>{course.pdfCount ? `${course.pdfCount} fiches / plans` : 'Document numérique'}</span>
                <span aria-hidden="true">·</span>
                <span>Envoi immédiat WhatsApp / Email</span>
              </>
            ) : (
              <>
                <span>{course.modules.length} modules complets</span>
                <span aria-hidden="true">·</span>
                <span>{course.videoCount ? `${course.videoCount} vidéos` : 'Vidéos HD'}</span>
                <span aria-hidden="true">·</span>
                <span>Attestation officielle</span>
              </>
            )}
          </div>
        </div>

        {/* Bonus / Special Features highlight banner */}
        {course.bonusTitle && (
          <div className="mx-6 mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>{course.bonusTitle}</span>
            </div>
            <p className="text-[11px] text-amber-700/90 leading-tight">
              {course.bonuses[0]}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-3 bg-slate-50/70 border-t border-slate-100 flex flex-col gap-3">
        {/* Pricing & Guarantee */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-[#0A2540]">
                {formattedPrice}
              </span>
              {course.priceEur && (
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  soit {course.priceEur} €
                </span>
              )}
              {formattedOriginalPrice && !course.priceEur && (
                <span className="text-xs text-slate-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
              {course.isPdfOnly 
                ? '📄 Vente en PDF · Réception immédiate par WhatsApp ou e-mail' 
                : course.modalities 
                  ? 'En ligne ou en présentiel (Sicap liberté 5A)' 
                  : 'Formation certifiante en ligne · Accès 24h/24'}
            </span>
          </div>

          <button
            onClick={() => onOpenDetails(course)}
            className="text-xs font-semibold text-slate-600 hover:text-amber-600 underline underline-offset-2 shrink-0 ml-2"
          >
            {course.isPdfOnly ? 'Sommaire PDF' : 'Programme'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenDetails(course)}
            className="w-full py-2.5 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors text-center"
          >
            {course.isPdfOnly ? 'Détails de l\'ouvrage' : 'Détails des cours'}
          </button>

          {isEnrolled ? (
            <button
              onClick={() => onStartCourse(course)}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              {course.isPdfOnly ? (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Consulter PDF</span>
                </>
              ) : (
                <>
                  <span>Accéder au cours</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#0A2540] hover:bg-amber-600 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              {course.isPdfOnly ? (
                <>
                  <Download className="w-3 h-3 text-amber-400" />
                  <span>Acheter le PDF (10 000 F)</span>
                </>
              ) : (
                <span>S'inscrire ({formattedPrice})</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
