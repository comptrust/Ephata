import React, { useState } from 'react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';
import { 
  Search, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  MessageCircle,
  PhoneCall,
  Mail,
  UserCheck,
  Building2,
  Users,
  Compass,
  Layers,
  MapPin,
  Laptop,
  BookOpen,
  Award
} from 'lucide-react';
import { directorAvatar } from '../assets/images';
import { handleImgError } from '../utils/imageFallback';

interface CourseCatalogProps {
  courses: Course[];
  enrolledCourseIds: string[];
  onOpenDetails: (course: Course) => void;
  onStartCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
  onOpenBusinessPlans: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  enrolledCourseIds,
  onOpenDetails,
  onStartCourse,
  onEnroll,
  onOpenBusinessPlans
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'formations-certifiantes' | 'pdf-packs' | 'entreprises'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'online' | 'presentiel'>('all');

  const targetTabs = [
    { id: 'all', label: 'Toutes nos Offres', icon: Layers },
    { id: 'formations-certifiantes', label: '🎓 Formations en Ligne Certifiantes', icon: Award },
    { id: 'pdf-packs', label: '📄 Packs & Guides Numériques (PDF / Audio)', icon: BookOpen },
    { id: 'entreprises', label: 'Entreprises & ONGs', icon: Building2 },
  ];

  const categories = [
    { id: 'all', label: 'Tous les thèmes' },
    { id: 'formations-certifiantes', label: '🎓 Formations Certifiantes (4)' },
    { id: 'pdf-packs', label: '📄 Packs PDF & Audio (3)' },
    { id: 'ong', label: 'Gestion & Management des ONGs' },
    { id: 'leadership', label: 'Management Relationnel' },
    { id: 'entrepreneurship', label: 'Entrepreneuriat' },
    { id: 'finance', label: 'Finances & Comptabilité' },
    { id: 'langue', label: 'Langue Sérère' },
  ];

  const filteredCourses = courses.filter((course) => {
    const isPack = course.isPdfOnly === true || course.category === 'langue';

    const matchesTarget = 
      selectedTarget === 'all' || 
      (selectedTarget === 'formations-certifiantes' && !isPack) ||
      (selectedTarget === 'pdf-packs' && isPack) ||
      (selectedTarget === 'entreprises' && (course.category === 'management' || course.category === 'leadership' || course.category === 'entrepreneurship' || course.id.includes('ong')));

    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'formations-certifiantes' && !isPack) ||
      (selectedCategory === 'pdf-packs' && isPack) ||
      (selectedCategory === 'ong' && (course.category === 'management' || course.id.includes('ong'))) ||
      (course.category === selectedCategory);

    const matchesModality = 
      modalityFilter === 'all' ||
      !course.modalities ||
      course.modalities.includes(modalityFilter);

    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTarget && matchesCategory && matchesModality && matchesSearch;
  });

  return (
    <div id="catalog-section" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Public Segments Bar (Formation Personnelle, Entreprises, Étudiants) */}
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {targetTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTarget === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTarget(tab.id as any)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0A2540] text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Catalogue Officiel Ephata Consulting Group</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">
              {selectedTarget === 'formations-certifiantes' && 'Formations en Ligne Certifiantes'}
              {selectedTarget === 'pdf-packs' && 'Packs & Guides Numériques (PDF / Audio)'}
              {selectedTarget === 'entreprises' && 'Formations pour Entreprises & Organisations'}
              {selectedTarget === 'all' && 'Formations Certifiantes & Packs Numériques'}
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Formations certifiantes dispensées <strong>en ligne</strong> (24h/24) ou <strong>en présentiel</strong>, et <strong>packs documentaires PDF</strong> téléchargeables immédiatement.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par titre, module..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Modalités & Categories Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Modality toggle: En ligne / Présentiel */}
          <div className="flex items-center gap-1.5 text-xs self-end sm:self-auto bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setModalityFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                modalityFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tous formats
            </button>
            <button
              onClick={() => setModalityFilter('online')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                modalityFilter === 'online' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3 h-3 text-blue-600" />
              <span>En Ligne</span>
            </button>
            <button
              onClick={() => setModalityFilter('presentiel')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                modalityFilter === 'presentiel' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3 h-3 text-amber-600" />
              <span>Présentiel</span>
            </button>
          </div>
        </div>

        {/* Clear Notice about PDF Packs vs Online Courses */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-4 sm:p-5 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <span className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black tracking-wide shrink-0 uppercase">
              PDF 10 000 F
            </span>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-[#0A2540]">
                Ouvrages vendus sous forme de PDF à 10 000 FCFA chacun (Ce ne sont pas des formations en ligne)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Le <strong>Pack Entrepreneuriat</strong> (avec 30 Business Plans complets) et le <strong>Pack Éducation Financière</strong> sont des ouvrages téléchargeables vendus à <strong>10 000 FCFA (15 €) chacun</strong>. Envoi immédiat par WhatsApp ou e-mail. Les autres programmes sont des formations certifiantes interactives.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory('pdf-packs')}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-[#0A2540] hover:bg-amber-600 text-white font-bold text-xs transition-colors self-end md:self-auto cursor-pointer"
          >
            Filtrer les Packs PDF
          </button>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledCourseIds.includes(course.id)}
                onOpenDetails={onOpenDetails}
                onStartCourse={onStartCourse}
                onEnroll={onEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">
              Aucune formation trouvée pour vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTarget('all');
                setModalityFilter('all');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-amber-600 hover:text-amber-700 underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Official Director Banner with Contact Info */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] via-[#0E2F54] to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-amber-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={directorAvatar}
                alt="Alouise Emmanuel Diouf - Directeur de la formation Ephata Consulting"
                referrerPolicy="no-referrer"
                onError={(e) => handleImgError(e, 'avatar')}
                className="w-20 h-20 rounded-full object-cover border-3 border-amber-400 shadow-lg shrink-0"
              />
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Direction des Formations Ephata Consulting
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Alouise Emmanuel Diouf
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Directeur de la formation · Accompagnement en individuel ou en groupe · En ligne et en présentiel
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs text-amber-300">
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sicap liberté 5A, Dakar Sénégal</span>
                  </div>
                  <span>·</span>
                  <a
                    href="mailto:adonaywaly5@gmail.com"
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>adonaywaly5@gmail.com</span>
                  </a>
                  <span>·</span>
                  <a
                    href="https://wa.me/221775079184"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:underline text-emerald-400 font-semibold"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>+221 77 507 91 84</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/221775079184?text=Bonjour%20M.%20Alouise%20Emmanuel%20Diouf,%20je%20souhaite%20m'inscrire%20à%20une%20formation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contacter M. Diouf sur WhatsApp</span>
              </a>

              <button
                onClick={onOpenBusinessPlans}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors"
              >
                Voir les 30 Business Plans
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
