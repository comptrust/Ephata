import React, { useState, useEffect } from 'react';
import { Course, StudentProgress } from './types';
import { COURSES as DEFAULT_COURSES } from './data/coursesData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { Classroom } from './components/Classroom';
import { CertificateView } from './components/CertificateView';
import { CheckoutModal } from './components/CheckoutModal';
import { StudentDashboard } from './components/StudentDashboard';
import { BusinessPlansModal } from './components/BusinessPlansModal';
import { FinancialCalculatorModal } from './components/FinancialCalculatorModal';
import { SerereAudioModal } from './components/SerereAudioModal';
import { CoachingModal } from './components/CoachingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useCourses } from './utils/courseStore';
import { fetchRemoteStudentProgress, saveRemoteStudentProgress, db } from './lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

function AppContent() {
  const { currentUser, userProfile, isAdmin, openAuthModal } = useAuth();
  const { courses } = useCourses();

  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'business-plans' | 'calculator' | 'serere-audio'>('catalog');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Direction / Admin state
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Student Profile Name
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('ephata_student_name') || '';
  });

  // Sync studentName with authenticated user
  useEffect(() => {
    if (currentUser?.displayName) {
      setStudentName(currentUser.displayName);
      localStorage.setItem('ephata_student_name', currentUser.displayName);
    }
  }, [currentUser]);

  // Enrolled courses
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ephata_enrolled_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Learning Progress Map
  const [progressMap, setProgressMap] = useState<Record<string, StudentProgress>>(() => {
    const saved = localStorage.getItem('ephata_progress_map');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) { /* ignore */ }
    }
    return {};
  });

  // Modal states
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);
  const [isBusinessPlansOpen, setIsBusinessPlansOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSerereAudioOpen, setIsSerereAudioOpen] = useState(false);
  const [isCoachingOpen, setIsCoachingOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ephata_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('ephata_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('ephata_progress_map', JSON.stringify(progressMap));
  }, [progressMap]);

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (!currentUser) return;

    // Load cloud progress for each enrolled course
    enrolledCourseIds.forEach(async (cId) => {
      const remote = await fetchRemoteStudentProgress(currentUser.uid, cId);
      if (remote) {
        setProgressMap(prev => ({
          ...prev,
          [cId]: {
            ...prev[cId],
            ...remote,
            completedLessonIds: Array.from(new Set([...(prev[cId]?.completedLessonIds || []), ...remote.completedLessonIds])),
            notes: { ...(prev[cId]?.notes || {}), ...(remote.notes || {}) }
          }
        }));
      }
    });

    // Save enrollment list to Firestore profile
    try {
      const uRef = doc(db, 'users', currentUser.uid);
      setDoc(uRef, { enrolledCourses: enrolledCourseIds }, { merge: true });
    } catch (e) {
      // ignore
    }
  }, [currentUser, enrolledCourseIds]);

  // Listen to admin full reset for publication
  useEffect(() => {
    const handlePublicationReset = () => {
      setStudentName('');
      setEnrolledCourseIds([]);
      setProgressMap({});
      setActiveCourseId(null);
      setActiveTab('catalog');
    };
    window.addEventListener('ephata-reset-publication', handlePublicationReset);
    return () => window.removeEventListener('ephata-reset-publication', handlePublicationReset);
  }, []);

  // Handlers
  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
  };

  const handleEnrollCourse = (course: Course) => {
    setCheckoutCourse(course);
  };

  const handleConfirmEnrollment = async (courseId: string) => {
    localStorage.setItem('ephata_user_has_enrolled', 'true');
    if (!enrolledCourseIds.includes(courseId)) {
      const updated = [...enrolledCourseIds, courseId];
      setEnrolledCourseIds(updated);
    }

    if (!progressMap[courseId]) {
      const newProg: StudentProgress = {
        courseId,
        completedLessonIds: [],
        completedQuizIds: [],
        quizScores: {},
        enrolledDate: new Date().toISOString(),
        notes: {}
      };
      setProgressMap(prev => ({ ...prev, [courseId]: newProg }));

      // Save to Firestore if user is authenticated
      if (currentUser) {
        await saveRemoteStudentProgress(currentUser.uid, courseId, newProg);
      }
    }

    // Direct navigate to classroom
    setActiveCourseId(courseId);
  };

  const handleStartCourse = (course: Course) => {
    if (!enrolledCourseIds.includes(course.id)) {
      handleConfirmEnrollment(course.id);
    }
    setActiveCourseId(course.id);
  };

  const handleUpdateProgress = async (updated: StudentProgress) => {
    setProgressMap(prev => ({
      ...prev,
      [updated.courseId]: updated
    }));

    // Secure persistent cloud storage in Firestore
    if (currentUser) {
      await saveRemoteStudentProgress(currentUser.uid, updated.courseId, updated);
    }
  };

  // Find active classroom course from dynamic courses
  const currentClassroomCourse = activeCourseId 
    ? (courses.find(c => c.id === activeCourseId) || DEFAULT_COURSES.find(c => c.id === activeCourseId))
    : null;

  if (currentClassroomCourse) {
    const courseProgress = progressMap[currentClassroomCourse.id] || {
      courseId: currentClassroomCourse.id,
      completedLessonIds: [],
      completedQuizIds: [],
      quizScores: {},
      enrolledDate: new Date().toISOString(),
      notes: {}
    };

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <Classroom
          course={currentClassroomCourse}
          progress={courseProgress}
          onUpdateProgress={handleUpdateProgress}
          onBackToCatalog={() => setActiveCourseId(null)}
          onOpenCertificate={() => setCertificateCourse(currentClassroomCourse)}
          onOpenBusinessPlans={() => setIsBusinessPlansOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSerereAudio={() => setIsSerereAudioOpen(true)}
        />

        {/* Modals inside classroom */}
        <CertificateView
          course={currentClassroomCourse}
          studentName={studentName || currentUser?.displayName || 'Apprenant Ephata'}
          onUpdateStudentName={handleUpdateStudentName}
          isOpen={!!certificateCourse}
          onClose={() => setCertificateCourse(null)}
        />

        <BusinessPlansModal
          isOpen={isBusinessPlansOpen}
          onClose={() => setIsBusinessPlansOpen(false)}
        />

        <FinancialCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />

        <SerereAudioModal
          isOpen={isSerereAudioOpen}
          onClose={() => setIsSerereAudioOpen(false)}
        />

        <AuthModal />
      </div>
    );
  }

  // Enrolled courses list
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'business-plans') {
            setIsBusinessPlansOpen(true);
          } else if (tab === 'calculator') {
            setIsCalculatorOpen(true);
          } else if (tab === 'serere-audio') {
            setIsSerereAudioOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        enrolledCount={enrolledCourseIds.length}
        onOpenQuickEnroll={() => setCheckoutCourse(courses[0] || DEFAULT_COURSES[0])}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onExploreCourses={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBusinessPlans={() => setIsBusinessPlansOpen(true)}
            />

            <CourseCatalog
              courses={courses}
              enrolledCourseIds={enrolledCourseIds}
              onOpenDetails={(course) => setDetailCourse(course)}
              onStartCourse={handleStartCourse}
              onEnroll={handleEnrollCourse}
              onOpenBusinessPlans={() => setIsBusinessPlansOpen(true)}
            />
          </>
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            enrolledCourses={enrolledCourses}
            progressMap={progressMap}
            studentName={studentName || currentUser?.displayName || ''}
            onSelectCourse={handleStartCourse}
            onOpenCertificate={(course) => setCertificateCourse(course)}
            onExploreCatalog={() => setActiveTab('catalog')}
            onOpenCoaching={() => setIsCoachingOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          if (tab === 'business-plans') {
            setIsBusinessPlansOpen(true);
          } else if (tab === 'calculator') {
            setIsCalculatorOpen(true);
          } else if (tab === 'serere-audio') {
            setIsSerereAudioOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenQuickEnroll={() => setCheckoutCourse(courses[0] || DEFAULT_COURSES[0])}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Persistent Floating WhatsApp Button */}
      <a
        href="https://wa.me/221775079184?text=Bonjour%20Cabinet%20Ephata%20Consulting%20Group,%20je%20souhaite%20m'informer%20sur%20vos%20formations"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp : +221 77 507 91 84
        </span>
      </a>

      {/* Modals */}
      <CourseDetailModal
        course={detailCourse}
        isOpen={!!detailCourse}
        onClose={() => setDetailCourse(null)}
        isEnrolled={detailCourse ? enrolledCourseIds.includes(detailCourse.id) : false}
        onEnroll={handleEnrollCourse}
        onStartCourse={handleStartCourse}
      />

      <CheckoutModal
        course={checkoutCourse}
        isOpen={!!checkoutCourse}
        onClose={() => setCheckoutCourse(null)}
        onConfirmEnrollment={handleConfirmEnrollment}
      />

      <CertificateView
        course={certificateCourse || courses[0] || DEFAULT_COURSES[0]}
        studentName={studentName || currentUser?.displayName || 'Apprenant Ephata'}
        onUpdateStudentName={handleUpdateStudentName}
        isOpen={!!certificateCourse}
        onClose={() => setCertificateCourse(null)}
      />

      <BusinessPlansModal
        isOpen={isBusinessPlansOpen}
        onClose={() => setIsBusinessPlansOpen(false)}
      />

      <FinancialCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <SerereAudioModal
        isOpen={isSerereAudioOpen}
        onClose={() => setIsSerereAudioOpen(false)}
      />

      <CoachingModal
        isOpen={isCoachingOpen}
        onClose={() => setIsCoachingOpen(false)}
        defaultName={studentName || currentUser?.displayName || ''}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
