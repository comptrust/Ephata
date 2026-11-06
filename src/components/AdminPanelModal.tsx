import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Download, 
  Search, 
  Lock,
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Plus,
  Trash2,
  Edit3,
  Layers,
  FileText,
  Video,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { Course, CourseModule, LessonContent } from '../types';
import { resetCountdownTargetDate } from './LaunchCountdown';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../utils/courseStore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { courseOngManagement, directorAvatar } from '../assets/images';

export interface RegistrationRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseTitle: string;
  amountFcfa: number;
  paymentMethod: 'Wave' | 'Orange Money' | 'WhatsApp / Manuel' | 'Western Union';
  status: 'Confirmé' | 'En attente' | 'Validé';
  date: string;
}

const INITIAL_REGISTRATIONS: RegistrationRecord[] = [];

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { currentUser, userProfile, isAdmin, openAuthModal, signInGoogle } = useAuth();
  const { courses, submitCourse, removeCourse } = useCourses();

  const [activeAdminTab, setActiveAdminTab] = useState<'create-course' | 'courses-list' | 'learners' | 'settings'>('create-course');
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    const saved = localStorage.getItem('ephata_admin_registrations');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_REGISTRATIONS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  // Firestore students list
  const [firestoreStudents, setFirestoreStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Course Creator Form State
  const [courseTitle, setCourseTitle] = useState('');
  const [courseSubtitle, setCourseSubtitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('management');
  const [courseCategoryLabel, setCourseCategoryLabel] = useState('Management des ONGs');
  const [coursePrice, setCoursePrice] = useState('50000');
  const [courseOriginalPrice, setCourseOriginalPrice] = useState('75000');
  const [courseDuration, setCourseDuration] = useState('20 Heures');
  const [courseDurationWeeks, setCourseDurationWeeks] = useState('4 semaines');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImageUrl, setCourseImageUrl] = useState('');
  const [coursePosterUrl, setCoursePosterUrl] = useState('');
  
  // Modules builder state
  const [modules, setModules] = useState<Array<{
    title: string;
    description: string;
    duration: string;
    lessons: Array<{
      title: string;
      duration: string;
      textContent: string;
      summaryPoints: string;
    }>;
    quizQuestion: string;
    quizOptions: string; // comma separated
    quizCorrectIndex: number;
  }>>([
    {
      title: 'Module 1 : Fondements & Cadre Stratégique',
      description: 'Introduction détaillée aux concepts clés et méthodologies.',
      duration: '4h 30m',
      lessons: [
        {
          title: 'Leçon 1.1 : Cadre juridique et gouvernance',
          duration: '45 min',
          textContent: 'Contenu détaillé de la leçon, définitions normatives et cas d\'application pratique au Sénégal et en zone OHADA.',
          summaryPoints: 'Règles de conformité, gouvernance transparente, responsabilités des dirigeants'
        },
        {
          title: 'Leçon 1.2 : Procédures opérationnelles et contrôle',
          duration: '50 min',
          textContent: 'Élaboration du manuel de procédures et mécanismes de vérification interne.',
          summaryPoints: 'Contrôle interne, validation hiérarchique, traçabilité des opérations'
        }
      ],
      quizQuestion: 'Quel est l\'organe principal de gouvernance statutaire ?',
      quizOptions: 'L\'Assemblée Générale, Le Trésorier seul, Le prestataire externe, Le comptable',
      quizCorrectIndex: 0
    }
  ]);

  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [courseSuccessMsg, setCourseSuccessMsg] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      loadFirestoreStudents();
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const loadFirestoreStudents = async () => {
    setLoadingStudents(true);
    try {
      const q = collection(db, 'users');
      const snap = await getDocs(q);
      const list: any[] = [];
      snap.forEach(d => {
        list.push({ id: d.id, ...d.data() });
      });
      setFirestoreStudents(list);
    } catch (e) {
      console.warn('Error loading students from firestore:', e);
    } finally {
      setLoadingStudents(false);
    }
  };

  if (!isOpen) return null;

  const totalRevenue = registrations
    .filter(r => r.status === 'Validé' || r.status === 'Confirmé')
    .reduce((acc, curr) => acc + curr.amountFcfa, 0);

  const filteredRegistrations = registrations.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const handleToggleStatus = (id: string) => {
    const updated = registrations.map(reg => {
      if (reg.id === id) {
        const nextStatus: RegistrationRecord['status'] = 
          reg.status === 'En attente' ? 'Validé' : 
          reg.status === 'Confirmé' ? 'Validé' : 'En attente';
        return { ...reg, status: nextStatus };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('ephata_admin_registrations', JSON.stringify(updated));
  };

  const handleSendWhatsAppNotification = (reg: RegistrationRecord) => {
    const message = encodeURIComponent(
      `Bonjour ${reg.name}, Ephata Consulting Group confirme la validation de votre inscription à la formation : "${reg.courseTitle}". Bienvenue sur la plateforme ! Direction M. Alouise Emmanuel Diouf : +221 77 507 91 84`
    );
    const cleanPhone = reg.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleExportCsv = () => {
    const headers = 'ID,Nom,Telephone,Email,Formation,Montant_FCFA,Methode_Paiement,Statut,Date\n';
    const rows = registrations.map(r => 
      `"${r.id}","${r.name}","${r.phone}","${r.email}","${r.courseTitle}",${r.amountFcfa},"${r.paymentMethod}","${r.status}","${r.date}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ephata_inscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Countdown Handler (7 days)
  const handleResetCountdown = (days: number = 7) => {
    const newTarget = resetCountdownTargetDate(days);
    const formatted = newTarget.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setResetFeedback(`Compte à rebours réinitialisé : Clôture fixée au ${formatted} (+${days} jours)`);
    setTimeout(() => setResetFeedback(null), 4000);
  };

  // Full reset for publication
  const handleFullResetForPublication = () => {
    setRegistrations([]);
    localStorage.removeItem('ephata_admin_registrations');
    localStorage.removeItem('ephata_student_name');
    localStorage.removeItem('ephata_enrolled_courses');
    localStorage.removeItem('ephata_progress_map');
    localStorage.removeItem('ephata_user_has_enrolled');
    window.dispatchEvent(new CustomEvent('ephata-reset-publication'));
    setResetFeedback('Plateforme réinitialisée avec succès ! Prêt pour la publication.');
    setTimeout(() => setResetFeedback(null), 5000);
  };

  // Add a module in form
  const handleAddModule = () => {
    const modNum = modules.length + 1;
    setModules(prev => [
      ...prev,
      {
        title: `Module ${modNum} : Titre du module`,
        description: 'Objectifs et thématiques abordées dans ce module.',
        duration: '3h 00m',
        lessons: [
          {
            title: `Leçon ${modNum}.1 : Introduction et fondamentaux`,
            duration: '30 min',
            textContent: 'Contenu pédagogique structuré et fiches pratiques.',
            summaryPoints: 'Point clé 1, Point clé 2, Point clé 3'
          }
        ],
        quizQuestion: 'Question de synthèse du module ?',
        quizOptions: 'Réponse correcte, Deuxième option, Troisième option',
        quizCorrectIndex: 0
      }
    ]);
  };

  // Add a lesson to a module
  const handleAddLessonToModule = (modIdx: number) => {
    setModules(prev => prev.map((m, idx) => {
      if (idx !== modIdx) return m;
      const lessNum = m.lessons.length + 1;
      return {
        ...m,
        lessons: [
          ...m.lessons,
          {
            title: `Leçon ${idx + 1}.${lessNum} : Nouvelle leçon`,
            duration: '25 min',
            textContent: 'Contenu explicatif, cas pratiques et recommandations méthodologiques.',
            summaryPoints: 'Notions essentielles à retenir'
          }
        ]
      };
    }));
  };

  // Submit Course to Firestore
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    setCourseSubmitting(true);
    setCourseSuccessMsg(null);

    const generatedId = courseTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `cours-${Date.now()}`;

    // Transform modules into CourseModule shape
    const formattedModules: CourseModule[] = modules.map((m, mIdx) => {
      const parsedOptions = m.quizOptions.split(',').map(s => s.trim()).filter(Boolean);
      return {
        id: `mod-${generatedId}-${mIdx + 1}`,
        number: mIdx + 1,
        title: m.title,
        description: m.description,
        duration: m.duration,
        lessons: m.lessons.map((l, lIdx) => ({
          id: `les-${generatedId}-${mIdx + 1}-${lIdx + 1}`,
          title: l.title,
          duration: l.duration,
          type: 'video' as const,
          summary: l.summaryPoints,
          videoSlides: [
            {
              timestamp: 0,
              title: l.title,
              bulletPoints: l.summaryPoints.split(',').map(s => s.trim()).filter(Boolean),
            }
          ],
          textContent: [l.textContent],
          keyTakeaways: l.summaryPoints.split(',').map(s => s.trim()).filter(Boolean),
          downloadableResource: {
            name: `Support PDF - ${l.title}`,
            fileSize: '1.8 MB',
            fileType: 'PDF',
            description: 'Support de cours et synthèse officielle Ephata Consulting'
          }
        })),
        quiz: {
          title: `Évaluation ${m.title}`,
          questions: [
            {
              id: `q-${mIdx + 1}-1`,
              question: m.quizQuestion,
              options: parsedOptions.length > 0 ? parsedOptions : ['Option A', 'Option B', 'Option C'],
              correctAnswer: m.quizCorrectIndex,
              explanation: 'Explication détaillée basée sur les règles et procédures officielles.'
            }
          ]
        }
      };
    });

    const newCourse: Course = {
      id: generatedId,
      title: courseTitle.trim(),
      subtitle: courseSubtitle.trim() || 'Formation certifiante d\'excellence dispensée par Ephata Consulting Group.',
      badge: 'Nouveau Programme 2026',
      category: (['management', 'finance', 'leadership', 'entrepreneurship', 'langue', 'personnel', 'service'].includes(courseCategory) ? courseCategory : 'management') as any,
      categoryLabel: courseCategoryLabel,
      price: parseInt(coursePrice, 10) || 50000,
      originalPrice: parseInt(courseOriginalPrice, 10) || 75000,
      durationWeeks: courseDurationWeeks,
      totalHours: courseDuration,
      videoCount: formattedModules.reduce((acc, m) => acc + m.lessons.length, 0),
      pdfCount: formattedModules.length * 2,
      bonusTitle: 'Pack Outils Professionnels Inclus',
      bonuses: [
        'Accès illimité 24h/24 et 7j/7 aux modules et vidéos',
        'Fiches de synthèse, modèles opérationnels et exercices pratiques',
        'Attestation de réussite certifiée par Ephata Consulting Group',
        'Assistance et coaching personnalisé de 3 mois avec Alouise Emmanuel Diouf'
      ],
      keyFeatures: [
        'Formation 100% en ligne ou présentiel à Dakar (Sicap liberté 5A)',
        'Accompagnement méthodologique adapté aux réalités professionnelles africaines',
        'Conforme aux standards de gestion internationaux et OHADA'
      ],
      description: courseDescription.trim() || 'Programme d\'excellence conçu pour renforcer les compétences stratégiques et managériales.',
      targetAudience: [
        'Professionnels en poste et dirigeants',
        'Chefs de projets et coordinateurs',
        'Entrepreneurs et porteurs d\'initiatives'
      ],
      prerequisites: 'Aucun prérequis spécifique. Motivation et rigueur professionnelle.',
      contactPhone: '+221 77 507 91 84',
      contactEmail: 'adonaywaly5@gmail.com',
      imageUrl: courseImageUrl.trim() || courseOngManagement,
      posterUrl: coursePosterUrl.trim() || undefined,
      instructor: {
        name: 'Alouise Emmanuel Diouf',
        title: 'Directeur Général & Formateur Principal · Ephata Consulting',
        bio: 'Expert consultant international en management des organisations et formation professionnelle.',
        avatarUrl: directorAvatar,
        email: 'adonaywaly5@gmail.com'
      },
      modules: formattedModules
    };

    try {
      await submitCourse(newCourse, currentUser?.uid || 'alouise-admin');
      setCourseSuccessMsg(`La formation « ${newCourse.title} » a été publiée avec succès dans la base de données Firestore ! Elle est immédiatement disponible pour les apprenants.`);
      // Reset form
      setCourseTitle('');
      setCourseSubtitle('');
      setCourseDescription('');
      setCoursePosterUrl('');
    } catch (err: any) {
      alert(`Erreur de publication : ${err.message}`);
    } finally {
      setCourseSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating high-priority Close Button at top-right of screen */}
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

      <div 
        className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-4 sm:p-5 px-5 sm:px-6 relative flex items-center justify-between border-b border-slate-800 z-20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400">
                  Direction Générale · Alouise Emmanuel Diouf
                </span>
                {isAdmin ? (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-400/30">
                    Connecté Admin (Firestore)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full border border-amber-400/30">
                    Mode Direction Locale & Cloud
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display">
                Tableau de Bord & Gestion des Formations (E-Learning Backend)
              </h2>
            </div>

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

          {/* Admin Navigation Tabs */}
          <div className="shrink-0 bg-slate-100 border-b border-slate-200 px-6 pt-2 flex items-center gap-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveAdminTab('create-course')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'create-course'
                  ? 'bg-white text-[#0A2540] border-t-2 border-amber-500 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-amber-600" />
              <span>Soumettre un Nouveau Cours</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('courses-list')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'courses-list'
                  ? 'bg-white text-[#0A2540] border-t-2 border-amber-500 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Formations au Catalogue ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('learners')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'learners'
                  ? 'bg-white text-[#0A2540] border-t-2 border-amber-500 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Apprenants & Suivi ({firestoreStudents.length + registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('settings')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'settings'
                  ? 'bg-white text-[#0A2540] border-t-2 border-amber-500 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Compte à Rebours & Publication</span>
            </button>
          </div>

          {/* Scrollable Modal Body */}
          <div className="flex-1 overflow-y-auto">

            {/* Feedback Alert if action occurred */}
            {resetFeedback && (
              <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{resetFeedback}</span>
              </div>
            )}

            {/* TAB 1: SOUSTRACTION / CRÉATION DE COURS PAR ALOUISE */}
            {activeAdminTab === 'create-course' && (
              <div className="p-6 space-y-6">
                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-amber-950">
                      Espace Formateur · Soumission de nouveaux cours & contenus
                    </p>
                    <p>
                      M. Alouise Emmanuel Diouf peut renseigner ici de nouveaux cours, organiser les modules, leçons, fiches de révision et quiz d'évaluation. Toute formation enregistrée est sauvegardée dans la base de données Firestore et immédiatement accessible aux apprenants.
                    </p>
                  </div>
                </div>

                {courseSuccessMsg && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">Succès de la soumission !</p>
                      <p className="mt-0.5">{courseSuccessMsg}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleCreateCourse} className="space-y-6">
                  {/* Basic Course Info */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      1. Informations Générales de la Formation
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Titre officiel de la formation *
                        </label>
                        <input
                          type="text"
                          required
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          placeholder="Ex : Gestion Financière & Rapprochements Bancaires des ONG"
                          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Sous-titre / Accroche promotionnelle
                        </label>
                        <input
                          type="text"
                          value={courseSubtitle}
                          onChange={(e) => setCourseSubtitle(e.target.value)}
                          placeholder="Ex : Maîtrisez le logiciel et les procédures sous 48H"
                          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Catégorie de formation
                        </label>
                        <select
                          value={courseCategory}
                          onChange={(e) => {
                            setCourseCategory(e.target.value);
                            const map: Record<string, string> = {
                              management: 'Management des ONGs',
                              finance: 'Finance & Comptabilité',
                              dev_perso: 'Développement Personnel & Leadership',
                              languages: 'Langues Africaines (Wolof / Sérère)',
                              entrepreneurship: 'Entrepreneuriat & Business Plans'
                            };
                            setCourseCategoryLabel(map[e.target.value] || 'Formation Professionnelle');
                          }}
                          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="management">Management des ONGs</option>
                          <option value="finance">Finance & Comptabilité</option>
                          <option value="dev_perso">Développement Personnel</option>
                          <option value="languages">Langues (Wolof / Sérère)</option>
                          <option value="entrepreneurship">Entrepreneuriat</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Prix (FCFA) *
                          </label>
                          <input
                            type="number"
                            required
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Prix barré (FCFA)
                          </label>
                          <input
                            type="number"
                            value={courseOriginalPrice}
                            onChange={(e) => setCourseOriginalPrice(e.target.value)}
                            className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Volume horaire / Durée
                        </label>
                        <input
                          type="text"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          placeholder="Ex : 20 Heures d'apprentissage"
                          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Affiche officielle / Flyer (URL de l'image ou capture)
                        </label>
                        <input
                          type="text"
                          value={coursePosterUrl}
                          onChange={(e) => setCoursePosterUrl(e.target.value)}
                          placeholder="Optionnel : Lien vers l'affiche officielle"
                          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Description complète de la formation
                      </label>
                      <textarea
                        rows={3}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Présentez les enjeux, les bénéfices concrets et les compétences acquises par les étudiants..."
                        className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Modules & Lessons Builder */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-blue-600" />
                        2. Structure Pédagogique : Modules & Leçons ({modules.length})
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ajouter un Module</span>
                      </button>
                    </div>

                    {modules.map((mod, mIdx) => (
                      <div key={mIdx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-xs font-black text-[#0A2540]">
                            Module {mIdx + 1}
                          </span>
                          {modules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setModules(modules.filter((_, idx) => idx !== mIdx))}
                              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Supprimer ce module</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Titre du Module</label>
                            <input
                              type="text"
                              value={mod.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModules(prev => prev.map((m, i) => i === mIdx ? { ...m, title: val } : m));
                              }}
                              className="w-full p-2 text-xs border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Durée estimée</label>
                            <input
                              type="text"
                              value={mod.duration}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModules(prev => prev.map((m, i) => i === mIdx ? { ...m, duration: val } : m));
                              }}
                              className="w-full p-2 text-xs border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Lessons in this module */}
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700">Leçons ({mod.lessons.length})</span>
                            <button
                              type="button"
                              onClick={() => handleAddLessonToModule(mIdx)}
                              className="text-[11px] text-amber-700 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" />
                              Ajouter une leçon
                            </button>
                          </div>

                          {mod.lessons.map((les, lIdx) => (
                            <div key={lIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">Leçon {mIdx + 1}.{lIdx + 1}</span>
                                {mod.lessons.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setModules(prev => prev.map((m, i) => i === mIdx ? {
                                        ...m,
                                        lessons: m.lessons.filter((_, li) => li !== lIdx)
                                      } : m));
                                    }}
                                    className="text-red-500 hover:text-red-700 text-[10px]"
                                  >
                                    Supprimer
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                placeholder="Titre de la leçon"
                                value={les.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setModules(prev => prev.map((m, i) => i === mIdx ? {
                                    ...m,
                                    lessons: m.lessons.map((l, li) => li === lIdx ? { ...l, title: val } : l)
                                  } : m));
                                }}
                                className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                              />
                              <textarea
                                rows={2}
                                placeholder="Fiche de cours et clés d'apprentissage..."
                                value={les.textContent}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setModules(prev => prev.map((m, i) => i === mIdx ? {
                                    ...m,
                                    lessons: m.lessons.map((l, li) => li === lIdx ? { ...l, textContent: val } : l)
                                  } : m));
                                }}
                                className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Module Quiz */}
                        <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 space-y-2 text-xs">
                          <span className="font-bold text-amber-900 block">Quiz de validation du module</span>
                          <input
                            type="text"
                            placeholder="Question du quiz"
                            value={mod.quizQuestion}
                            onChange={(e) => {
                              const val = e.target.value;
                              setModules(prev => prev.map((m, i) => i === mIdx ? { ...m, quizQuestion: val } : m));
                            }}
                            className="w-full p-1.5 text-xs bg-white border border-amber-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Options de réponse (séparées par des virgules)"
                            value={mod.quizOptions}
                            onChange={(e) => {
                              const val = e.target.value;
                              setModules(prev => prev.map((m, i) => i === mIdx ? { ...m, quizOptions: val } : m));
                            }}
                            className="w-full p-1.5 text-xs bg-white border border-amber-300 rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Form Submission */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={courseSubmitting}
                      className="px-6 py-3 bg-[#0A2540] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{courseSubmitting ? 'Publication en cours dans Firestore...' : 'Publier la formation sur la plateforme'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: LISTE DES COURS EN LIGNE */}
            {activeAdminTab === 'courses-list' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Toutes les Formations Actives ({courses.length})
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('create-course')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouveau Cours</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((c) => (
                    <div key={c.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex gap-3">
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="w-24 h-24 object-cover rounded-lg shrink-0 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            {c.categoryLabel || c.category}
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            {c.price.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {c.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {c.subtitle}
                        </p>
                        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{c.modules.length} modules · {c.totalHours}</span>
                          <span className="text-emerald-600 font-bold">Actif</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: APPRENANTS & PROGRESSIONS */}
            {activeAdminTab === 'learners' && (
              <div className="p-6 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>Comptes Étudiants Firestore</span>
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{firestoreStudents.length}</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Authentifiés Google & Email</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>Inscriptions Payées</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{registrations.length}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Wave & Orange Money</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>Recettes Totales</span>
                      <DollarSign className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-xl font-bold text-slate-900 font-display">
                      {totalRevenue.toLocaleString('fr-FR')} <span className="text-xs text-slate-500">FCFA</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">≈ {Math.round(totalRevenue / 655.957)} €</p>
                  </div>
                </div>

                {/* Firestore Accounts List */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Utilisateurs Authentifiés dans le Cloud ({firestoreStudents.length})
                    </span>
                    <button
                      onClick={loadFirestoreStudents}
                      className="text-xs text-amber-700 font-bold hover:underline cursor-pointer"
                    >
                      Actualiser la liste
                    </button>
                  </div>

                  {firestoreStudents.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      Aucun compte utilisateur enregistré pour le moment. Les étudiants apparaîtront ici dès leur première connexion Google ou inscription par email.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                      {firestoreStudents.map((st) => (
                        <div key={st.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                              {st.displayName?.[0] || st.email?.[0] || 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{st.displayName || 'Apprenant'}</p>
                              <p className="text-[11px] text-slate-500">{st.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              st.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {st.role === 'admin' ? 'Direction' : 'Étudiant'}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">
                              Inscrit le {new Date(st.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Local / Inscription Records Table */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Commandes & Inscriptions récentes</span>
                    <button
                      onClick={handleExportCsv}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-600" />
                      <span>Exporter CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-100 text-[11px] uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="p-3">Apprenant</th>
                          <th className="p-3">Formation</th>
                          <th className="p-3">Montant</th>
                          <th className="p-3">Statut</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-slate-400">
                              Aucune inscription locale en attente.
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-slate-50">
                              <td className="p-3 font-medium text-slate-900">{reg.name}</td>
                              <td className="p-3">{reg.courseTitle}</td>
                              <td className="p-3 font-bold">{reg.amountFcfa.toLocaleString()} FCFA</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  reg.status === 'Validé' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {reg.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleSendWhatsAppNotification(reg)}
                                  className="text-emerald-600 hover:text-emerald-700 font-bold mr-2"
                                >
                                  WhatsApp
                                </button>
                                <button
                                  onClick={() => handleToggleStatus(reg.id)}
                                  className="text-slate-600 hover:text-slate-900 font-bold"
                                >
                                  Changer statut
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COMPTE À REBOURS & SETTINGS */}
            {activeAdminTab === 'settings' && (
              <div className="p-6 space-y-6">
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Contrôle du Compte à Rebours de Rentrée</span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-xl">
                      Ajustez le délai affiché sur le bandeau supérieur pour créer l'urgence de publication.
                    </p>
                  </div>

                  <div className="inline-flex rounded-lg border border-amber-300 bg-white p-0.5 text-xs shadow-xs">
                    <button
                      onClick={() => handleResetCountdown(7)}
                      className="px-3 py-1.5 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition cursor-pointer"
                    >
                      Chrono +7j
                    </button>
                    <button
                      onClick={() => handleResetCountdown(14)}
                      className="px-3 py-1.5 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition cursor-pointer"
                    >
                      Chrono +14j
                    </button>
                    <button
                      onClick={() => handleResetCountdown(30)}
                      className="px-3 py-1.5 text-slate-700 hover:text-amber-800 font-medium rounded-md hover:bg-amber-50 transition cursor-pointer"
                    >
                      Chrono +30j
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Remise à zéro pour la publication
                  </h4>
                  <p className="text-xs text-slate-600">
                    Nettoie les sessions de test des apprenants en conservant les cours officiels enregistrés dans Firestore.
                  </p>
                  <button
                    onClick={handleFullResetForPublication}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Réinitialiser les tests pour publication</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Ephata Consulting Group · Contact Direction : <strong>+221 77 507 91 84</strong> · Sicap liberté 5A
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Fermer le panneau
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
