import React from 'react';
import { Course, StudentProgress } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Download, 
  Sparkles, 
  Plus,
  Play,
  FileText
} from 'lucide-react';
import { handleImgError } from '../utils/imageFallback';

interface StudentDashboardProps {
  enrolledCourses: Course[];
  progressMap: Record<string, StudentProgress>;
  studentName: string;
  onSelectCourse: (course: Course) => void;
  onOpenCertificate: (course: Course) => void;
  onExploreCatalog: () => void;
  onOpenCoaching: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  enrolledCourses,
  progressMap,
  studentName,
  onSelectCourse,
  onOpenCertificate,
  onExploreCatalog,
  onOpenCoaching
}) => {
  // Compute overall stats
  let totalLessonsCompleted = 0;
  let totalLessonsOverall = 0;
  let certificatesCount = 0;

  enrolledCourses.forEach((c) => {
    const prog = progressMap[c.id];
    const totalC = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    totalLessonsOverall += totalC;
    if (prog) {
      totalLessonsCompleted += prog.completedLessonIds.length;
      if (prog.certificateEarnedDate || prog.completedLessonIds.length >= totalC) {
        certificatesCount++;
      }
    }
  });

  return (
    <div className="py-10 bg-slate-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-[#0A2540] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4" />
              <span>Espace Apprenant Ephata Consulting</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bienvenue, {studentName || 'Cher Apprenant'} !
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Retrouvez l'ensemble de vos cours en ligne, suivez votre progression en temps réel et téléchargez vos attestations officielles certifiées.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenCoaching}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Réserver mon Coaching (3 Mois Inclus)</span>
            </button>

            <button
              onClick={onExploreCatalog}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-white/20"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Ajouter une formation</span>
            </button>
          </div>
        </div>

        {/* Learning Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold block uppercase">Formations Inscrites</span>
            <span className="text-2xl sm:text-3xl font-black text-[#0A2540] mt-1 block">
              {enrolledCourses.length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold block uppercase">Leçons Complétées</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">
              {totalLessonsCompleted}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold block uppercase">Attestations Prêtes</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 block">
              {certificatesCount}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold block uppercase">Accompagnement</span>
            <span className="text-sm font-bold text-slate-800 mt-2 block">
              Coaching 3 mois actif
            </span>
          </div>
        </div>

        {/* My Enrolled Courses List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0A2540]">
              Mes Formations en Cours
            </h2>
            <span className="text-xs text-slate-500">
              Accès illimité 24h/24 & 7j/7
            </span>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => {
                const prog = progressMap[course.id] || {
                  courseId: course.id,
                  completedLessonIds: [],
                  completedQuizIds: [],
                  quizScores: {},
                  enrolledDate: new Date().toISOString(),
                  notes: {}
                };
                const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                const completed = prog.completedLessonIds.length;
                const pct = Math.round((completed / (totalLessons || 1)) * 100);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    {course.imageUrl && (
                      <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImgError(e, 'course')}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-bold text-amber-400">
                          {course.categoryLabel}
                        </span>
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="text-amber-700 font-bold uppercase">{course.categoryLabel}</span>
                          <span>{completed} / {totalLessons} leçons</span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0A2540]">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {course.subtitle}
                        </p>
                      </div>

                      {/* Progress bar or PDF Download status */}
                      {course.isPdfOnly ? (
                        <div className="mt-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-amber-800">
                            <FileText className="w-3.5 h-3.5 text-amber-600" />
                            <span>Ouvrage PDF disponible (Pas de vidéo en ligne)</span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            Document complet et fiches associées prêts à la consultation et au téléchargement.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-600">Progression</span>
                            <span className="text-amber-600 font-bold">{pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      {course.isPdfOnly ? (
                        <a
                          href={`https://wa.me/221775079184?text=${encodeURIComponent(`Bonjour Ephata, je souhaite recevoir mon exemplaire PDF de : ${course.title} sur ce numéro WhatsApp.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Recevoir sur WhatsApp</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => onOpenCertificate(course)}
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 underline"
                        >
                          <Award className="w-4 h-4 text-amber-600" />
                          <span>Voir mon attestation</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-4 py-2 bg-[#0A2540] hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        {course.isPdfOnly ? (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Lire / Télécharger le PDF</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Reprendre le cours</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">
                  Vous n'êtes inscrit à aucune formation pour le moment
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Découvrez nos programmes phares (Management des ONG, Entreprenariat, Éducation Financière, Langue Sérère) et lancez votre apprentissage.
                </p>
              </div>
              <button
                onClick={onExploreCatalog}
                className="px-6 py-2.5 bg-[#0A2540] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Explorer le catalogue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
