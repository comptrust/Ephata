import React, { useState, useEffect } from 'react';
import { Course, CourseModule, LessonContent, StudentProgress } from '../types';
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Download, 
  FileText, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Edit3, 
  Sparkles, 
  Check, 
  Clock, 
  FileCheck,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { handleImgError } from '../utils/imageFallback';

interface ClassroomProps {
  course: Course;
  progress: StudentProgress;
  onUpdateProgress: (updated: StudentProgress) => void;
  onBackToCatalog: () => void;
  onOpenCertificate: () => void;
  onOpenBusinessPlans: () => void;
  onOpenCalculator: () => void;
  onOpenSerereAudio: () => void;
}

export const Classroom: React.FC<ClassroomProps> = ({
  course,
  progress,
  onUpdateProgress,
  onBackToCatalog,
  onOpenCertificate,
  onOpenBusinessPlans,
  onOpenCalculator,
  onOpenSerereAudio
}) => {
  // Navigation inside classroom
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'quiz' | 'resources' | 'notes'>(() => {
    return course.isPdfOnly ? 'text' : 'video';
  });

  // Video player simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Notes state
  const currentModule = course.modules[activeModuleIndex] || course.modules[0];
  const currentLesson = currentModule?.lessons[activeLessonIndex] || currentModule?.lessons[0];
  const [lessonNote, setLessonNote] = useState(progress.notes?.[currentLesson?.id] || '');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // Sync notes when changing lesson
  useEffect(() => {
    setLessonNote(progress.notes?.[currentLesson?.id] || '');
    setIsPlaying(false);
    setVideoProgress(0);
    setCurrentSlideIndex(0);
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setQuizScore(null);
  }, [currentLesson?.id]);

  // Video simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            handleMarkCompleted(currentLesson.id);
            return 100;
          }
          const next = prev + 1 * playbackSpeed;
          // update slide index based on progress
          if (currentLesson.videoSlides && currentLesson.videoSlides.length > 0) {
            const slideIdx = Math.min(
              Math.floor((next / 100) * currentLesson.videoSlides.length),
              currentLesson.videoSlides.length - 1
            );
            setCurrentSlideIndex(slideIdx);
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, currentLesson]);

  // Mark lesson as completed
  const handleMarkCompleted = (lessonId: string) => {
    if (!progress.completedLessonIds.includes(lessonId)) {
      const updatedIds = [...progress.completedLessonIds, lessonId];
      const updated: StudentProgress = {
        ...progress,
        completedLessonIds: updatedIds,
      };

      // Check if course completed
      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      if (updatedIds.length === totalLessons && !progress.certificateEarnedDate) {
        updated.certificateEarnedDate = new Date().toISOString();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      onUpdateProgress(updated);
    }
  };

  // Save personal note
  const handleSaveNote = () => {
    const updatedNotes = {
      ...(progress.notes || {}),
      [currentLesson.id]: lessonNote
    };
    onUpdateProgress({
      ...progress,
      notes: updatedNotes
    });
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Quiz submission
  const handleQuizSubmit = () => {
    if (!currentModule.quiz) return;
    let correct = 0;
    currentModule.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const scorePct = Math.round((correct / currentModule.quiz.questions.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    if (scorePct >= 70) {
      confetti({ particleCount: 50, spread: 60 });
      handleMarkCompleted(currentLesson.id);
      const updatedQuizzes = [...(progress.completedQuizIds || []), currentModule.id];
      onUpdateProgress({
        ...progress,
        completedQuizIds: Array.from(new Set(updatedQuizzes)),
        quizScores: {
          ...(progress.quizScores || {}),
          [currentModule.id]: scorePct
        }
      });
    }
  };

  // Total course completion percentage
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessonIds.filter(id => 
    course.modules.some(m => m.lessons.some(l => l.id === id))
  ).length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);
  const isLessonCompleted = progress.completedLessonIds.includes(currentLesson?.id);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Classroom Bar */}
      <div className="bg-[#0A2540] text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between border-b border-slate-700 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour au catalogue</span>
          </button>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
            {course.title}
          </h1>
        </div>

        {/* Progress & Certificate Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-slate-300">Progression :</span>
            <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-amber-400">{progressPercent}%</span>
          </div>

          <button
            onClick={onOpenCertificate}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              progressPercent >= 100 || progress.certificateEarnedDate
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm animate-pulse'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Attestation Officielle</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl w-full mx-auto p-3 sm:p-5 gap-4">
        {/* Left Side: Course Curriculum Sidebar */}
        <aside className="w-full lg:w-80 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col shrink-0 overflow-hidden max-h-[40vh] lg:max-h-[calc(100vh-100px)]">
          {/* Course Mini Banner */}
          {course.imageUrl && (
            <div className="relative h-24 w-full overflow-hidden shrink-0">
              <img
                src={course.imageUrl}
                alt={course.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImgError(e, 'course')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-amber-400 drop-shadow line-clamp-1">
                  {course.title}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Sommaire des {course.modules.length} Modules</span>
              <span className="text-amber-600 font-extrabold">{completedCount} / {totalLessons} faits</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {course.modules.map((mod, mIdx) => {
              const isModuleActive = mIdx === activeModuleIndex;
              return (
                <div key={mod.id} className="border border-slate-200/80 rounded-xl overflow-hidden">
                  <button
                    onClick={() => {
                      setActiveModuleIndex(mIdx);
                      setActiveLessonIndex(0);
                    }}
                    className={`w-full p-2.5 text-left flex items-start gap-2.5 transition-colors ${
                      isModuleActive ? 'bg-amber-50/70 border-b border-amber-200/50' : 'bg-slate-50/60 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#0A2540] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {mod.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                        {mod.title}
                      </h4>
                      <p className="text-[10px] text-slate-500">{mod.duration}</p>
                    </div>
                  </button>

                  {/* Lessons list */}
                  {isModuleActive && (
                    <div className="p-1.5 space-y-1 bg-white">
                      {mod.lessons.map((les, lIdx) => {
                        const isLessonActive = lIdx === activeLessonIndex;
                        const isDone = progress.completedLessonIds.includes(les.id);
                        return (
                          <button
                            key={les.id}
                            onClick={() => setActiveLessonIndex(lIdx)}
                            className={`w-full p-2 rounded-lg text-left flex items-center justify-between gap-2 text-xs transition-colors ${
                              isLessonActive
                                ? 'bg-amber-100/70 text-amber-950 font-semibold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {les.duration}
                            </span>
                          </button>
                        );
                      })}

                      {/* Module Quiz Button if available */}
                      {mod.quiz && (
                        <button
                          onClick={() => {
                            setActiveTab('quiz');
                          }}
                          className="w-full p-2 mt-1 rounded-lg text-left flex items-center justify-between gap-2 text-xs bg-slate-50 hover:bg-slate-100 text-[#0A2540] font-semibold border border-dashed border-slate-300"
                        >
                          <div className="flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Quiz du Module {mod.number}</span>
                          </div>
                          {progress.completedQuizIds?.includes(mod.id) && (
                            <span className="text-[10px] text-emerald-600 font-bold">Validé</span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Bonus Tools triggers inside sidebar */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-1.5 text-xs">
            {course.hasBusinessPlans && (
              <button
                onClick={onOpenBusinessPlans}
                className="w-full py-2 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ouvrir les 30 Business Plans</span>
              </button>
            )}

            {course.hasFinancialCalculator && (
              <button
                onClick={onOpenCalculator}
                className="w-full py-2 px-2.5 rounded-lg bg-[#0A2540] hover:bg-[#12365c] text-white font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Simulateur d'Indépendance</span>
              </button>
            )}

            {course.hasAudioPractice && (
              <button
                onClick={onOpenSerereAudio}
                className="w-full py-2 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Sérère (100 Expressions)</span>
              </button>
            )}
          </div>
        </aside>

        {/* Right Side: Main Classroom Content */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {/* Tabs Navigation (Functional buttons, zero-pill discipline) */}
          <div className="border-b border-slate-200 px-4 pt-2 flex items-center gap-2 overflow-x-auto bg-slate-50/50">
            {!course.isPdfOnly && (
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'border-amber-500 text-[#0A2540] bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-amber-600" />
                <span>Vidéo & Diaporama</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'text'
                  ? 'border-amber-500 text-[#0A2540] bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>{course.isPdfOnly ? 'Ouvrage & Synthèse PDF' : 'Fiche de Cours & Clés'}</span>
            </button>

            {currentModule.quiz && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-amber-500 text-[#0A2540] bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Quiz d'Évaluation</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-amber-500 text-[#0A2540] bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Supports & PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'border-amber-500 text-[#0A2540] bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
              <span>Mes Notes</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto">
            {/* TAB 1: VIDEO LESSON PLAYER */}
            {activeTab === 'video' && (
              <div className="space-y-6">
                {/* Simulated Interactive Video Screen */}
                <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-950 via-[#0A2540] to-slate-900 overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-6 sm:p-8 text-white">
                  {/* Subtle video background poster */}
                  {course.imageUrl && (
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImgError(e, 'course')}
                        className="w-full h-full object-cover filter blur-[2px]"
                      />
                      <div className="absolute inset-0 bg-[#0A2540]/80" />
                    </div>
                  )}

                  {/* Top Video Header */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-slate-300">
                        Ephata e-Learning HD Player
                      </span>
                    </div>
                    <span className="text-amber-400 font-mono">
                      Module {currentModule.number} · Leçon {activeLessonIndex + 1}
                    </span>
                  </div>

                  {/* Center Interactive Slide Presentation */}
                  <div className="my-auto max-w-xl mx-auto text-center space-y-4">
                    {currentLesson.videoSlides && currentLesson.videoSlides.length > 0 ? (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <span className="text-[11px] text-amber-400 uppercase tracking-widest font-black">
                          Diapositive {currentSlideIndex + 1} / {currentLesson.videoSlides.length}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {currentLesson.videoSlides[currentSlideIndex]?.title}
                        </h2>
                        <div className="space-y-2 text-left bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-slate-200">
                          {currentLesson.videoSlides[currentSlideIndex]?.bulletPoints.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {currentLesson.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300">
                          {currentLesson.summary}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Video Controls Bar */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {/* Scrub line */}
                    <div 
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newPct = (clickX / rect.width) * 100;
                        setVideoProgress(Math.max(0, Math.min(100, newPct)));
                      }}
                      className="w-full bg-white/20 hover:bg-white/30 h-2 rounded-full cursor-pointer overflow-hidden transition-all"
                    >
                      <div 
                        className="bg-amber-400 h-full rounded-full transition-all"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105"
                          aria-label={isPlaying ? 'Pause' : 'Lecture'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>

                        <button
                          onClick={() => {
                            setVideoProgress(0);
                            setCurrentSlideIndex(0);
                          }}
                          className="text-slate-300 hover:text-white p-1"
                          title="Recommencer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        <span className="font-mono text-slate-300 text-[11px]">
                          {Math.floor((videoProgress / 100) * 18)}:00 / 18:00
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Speed control */}
                        <div className="flex items-center gap-1 text-[11px] bg-white/10 px-2 py-1 rounded">
                          <span className="text-slate-400">Vitesse :</span>
                          {[1, 1.25, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => setPlaybackSpeed(speed)}
                              className={`px-1 rounded font-bold ${
                                playbackSpeed === speed ? 'text-amber-400 underline' : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Header & Mark Completed Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-xs text-amber-700 font-semibold mb-1">
                      Module {currentModule.number} · {currentModule.title}
                    </div>
                    <h2 className="text-xl font-bold text-[#0A2540]">
                      {currentLesson.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Durée estimée : {currentLesson.duration}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMarkCompleted(currentLesson.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isLessonCompleted
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-[#0A2540] hover:bg-amber-600 text-white shadow-xs'
                    }`}
                  >
                    {isLessonCompleted ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Leçon Validée !</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Marquer comme terminée</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Key takeaways quick box */}
                {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Points Clés à Retenir
                    </h3>
                    <ul className="space-y-1.5 text-xs text-amber-950">
                      {currentLesson.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TEXT & NOTES LESSON */}
            {activeTab === 'text' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                    Support de lecture officiel
                  </span>
                  <h2 className="text-2xl font-bold text-[#0A2540] mt-1">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="prose prose-slate text-sm space-y-4 text-slate-700 leading-relaxed">
                  {currentLesson.textContent.map((par, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed">
                      {par}
                    </p>
                  ))}
                </div>

                {currentLesson.downloadableResource && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {currentLesson.downloadableResource.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {currentLesson.downloadableResource.fileSize} · {currentLesson.downloadableResource.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Téléchargement de : ${currentLesson.downloadableResource?.name}`)}
                      className="px-3 py-1.5 bg-[#0A2540] text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: QUIZ EVALUATION */}
            {activeTab === 'quiz' && currentModule.quiz && (
              <div className="space-y-6 max-w-2xl">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-[#0A2540]">
                    {currentModule.quiz.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Testez vos acquis avant de passer au module suivant. Un score minimum de 70% est requis pour valider l'évaluation.
                  </p>
                </div>

                <div className="space-y-6">
                  {currentModule.quiz.questions.map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Question {qIdx + 1} : {q.question}
                      </h3>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          const isCorrect = q.correctAnswer === optIdx;
                          let optStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                          if (quizSubmitted) {
                            if (isCorrect) {
                              optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optStyle = 'border-red-400 bg-red-50 text-red-900';
                            }
                          } else if (isSelected) {
                            optStyle = 'border-amber-500 bg-amber-50 text-amber-900 font-medium';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => {
                                setSelectedAnswers({
                                  ...selectedAnswers,
                                  [q.id]: optIdx
                                });
                              }}
                              className={`w-full p-2.5 rounded-lg text-left text-xs border transition-all flex items-start gap-2.5 ${optStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-bold">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="mt-2 text-xs p-2.5 rounded-lg bg-slate-100 text-slate-700 border-l-4 border-amber-500">
                          <span className="font-bold">Explication : </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit Quiz Action */}
                <div className="pt-4 flex items-center justify-between">
                  {quizSubmitted ? (
                    <div className="flex items-center gap-4">
                      <div className={`text-sm font-bold ${quizScore! >= 70 ? 'text-emerald-700' : 'text-red-600'}`}>
                        Résultat : {quizScore}% {quizScore! >= 70 ? '✓ Validé avec succès !' : '✗ Score insuffisant'}
                      </div>
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                          setQuizScore(null);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300"
                      >
                        Recommencer le quiz
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(selectedAnswers).length < currentModule.quiz.questions.length}
                      className="px-6 py-2.5 bg-[#0A2540] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Soumettre mes réponses
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: RESOURCES & DOWNLOADS */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-xl font-bold text-[#0A2540]">
                    Supports de Cours & Documents Téléchargeables
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Documents officiels, canevas et guides pratiques inclus avec votre formation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Manuel Pédagogique Intégral ({course.title})
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Format PDF haute résolution comprenant tous les résumés et fiches pratiques des {course.modules.length} modules.
                    </p>
                    <button
                      onClick={() => alert(`Téléchargement du Manuel Intégral lancé !`)}
                      className="w-full mt-2 py-2 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger le Guide Complet (PDF)</span>
                    </button>
                  </div>

                  {course.hasBusinessPlans && (
                    <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/70 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h4 className="text-xs font-bold text-amber-950">
                          Pack des 30 Business Plans
                        </h4>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        Tous les 30 modèles financiers et études de marché prêts à l'emploi au Sénégal.
                      </p>
                      <button
                        onClick={onOpenBusinessPlans}
                        className="w-full mt-2 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Explorer & Exporter les 30 Plans</span>
                      </button>
                    </div>
                  )}

                  {course.hasFinancialCalculator && (
                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h4 className="text-xs font-bold text-blue-950">
                          E-Book : L'Éducation Financière
                        </h4>
                      </div>
                      <p className="text-[11px] text-blue-800">
                        "Bien gérer aujourd'hui pour être libre demain" - Le livre offert de la formation.
                      </p>
                      <button
                        onClick={() => alert(`Ouverture de l'E-book Éducation Financière offert !`)}
                        className="w-full mt-2 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#12365c] rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger le Livre Offert</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: PERSONAL NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540]">
                    Mes Notes Personnelles
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Prenez des notes pendant la leçon. Vos notes sont automatiquement enregistrées pour ce cours.
                  </p>
                </div>

                <div className="relative">
                  <textarea
                    rows={8}
                    value={lessonNote}
                    onChange={(e) => setLessonNote(e.target.value)}
                    placeholder="Écrivez vos réflexions, vos questions pour le coaching ou les points essentiels ici..."
                    className="w-full p-4 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  />
                  {noteSavedFeedback && (
                    <span className="absolute bottom-3 right-3 text-xs text-emerald-600 font-bold bg-white px-2 py-1 rounded shadow">
                      ✓ Note enregistrée !
                    </span>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    className="px-5 py-2 bg-[#0A2540] hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors shadow"
                  >
                    Enregistrer mes notes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Next/Previous Lesson Navigation Bar */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <button
              disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
              onClick={() => {
                if (activeLessonIndex > 0) {
                  setActiveLessonIndex(activeLessonIndex - 1);
                } else if (activeModuleIndex > 0) {
                  const prevMod = activeModuleIndex - 1;
                  setActiveModuleIndex(prevMod);
                  setActiveLessonIndex(course.modules[prevMod].lessons.length - 1);
                }
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Leçon précédente</span>
            </button>

            <button
              onClick={() => {
                handleMarkCompleted(currentLesson.id);
                if (activeLessonIndex < currentModule.lessons.length - 1) {
                  setActiveLessonIndex(activeLessonIndex + 1);
                } else if (activeModuleIndex < course.modules.length - 1) {
                  setActiveModuleIndex(activeModuleIndex + 1);
                  setActiveLessonIndex(0);
                } else {
                  // Final lesson completed!
                  onOpenCertificate();
                }
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-amber-600 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>
                {activeModuleIndex === course.modules.length - 1 && activeLessonIndex === currentModule.lessons.length - 1
                  ? 'Terminer la formation'
                  : 'Valider et leçon suivante'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
