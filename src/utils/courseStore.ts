import { useState, useEffect } from 'react';
import { Course } from '../types';
import { COURSES as DEFAULT_COURSES } from '../data/coursesData';
import { fetchCoursesFromFirestore, saveCourseToFirestore, db } from '../lib/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'ephata_custom_courses';

/**
 * Get cached custom courses from localStorage
 */
function getLocalCustomCourses(): Course[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return [];
}

/**
 * Save custom courses to localStorage
 */
function saveLocalCustomCourses(courses: Course[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
  } catch (e) {
    // ignore
  }
}

/**
 * Merge default bundled courses with dynamically published courses
 */
export function mergeCourses(customCourses: Course[]): Course[] {
  const merged = [...customCourses];
  const customIds = new Set(customCourses.map(c => c.id));

  for (const def of DEFAULT_COURSES) {
    if (!customIds.has(def.id)) {
      merged.push(def);
    }
  }
  return merged;
}

/**
 * Hook to access and synchronize live courses with Firestore
 */
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(() => {
    return mergeCourses(getLocalCustomCourses());
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial fetch from Firestore
    fetchCoursesFromFirestore().then((remoteList) => {
      if (remoteList && remoteList.length > 0) {
        saveLocalCustomCourses(remoteList);
        setCourses(mergeCourses(remoteList));
      }
      setLoading(false);
    }).catch(() => setLoading(false));

    // 2. Real-time snapshot listener on Firestore courses collection
    let unsubscribe: () => void = () => {};
    try {
      const colRef = collection(db, 'courses');
      unsubscribe = onSnapshot(colRef, (snapshot) => {
        const remoteList: Course[] = [];
        snapshot.forEach((d) => {
          remoteList.push(d.data() as Course);
        });
        if (remoteList.length > 0) {
          saveLocalCustomCourses(remoteList);
          setCourses(mergeCourses(remoteList));
        }
      }, (err) => {
        console.warn('Realtime courses listener error:', err);
      });
    } catch (err) {
      console.warn('Snapshot error:', err);
    }

    return () => unsubscribe();
  }, []);

  /**
   * Submit or update a course (Alouise Admin action)
   */
  const submitCourse = async (newCourse: Course, authorId: string = 'alouise-admin') => {
    // Save to Firestore
    await saveCourseToFirestore(newCourse, authorId);
    
    // Update local state immediately
    const existing = getLocalCustomCourses();
    const updated = [newCourse, ...existing.filter(c => c.id !== newCourse.id)];
    saveLocalCustomCourses(updated);
    setCourses(mergeCourses(updated));

    // Notify listeners
    window.dispatchEvent(new CustomEvent('ephata-courses-updated', { detail: newCourse }));
  };

  /**
   * Delete a custom course
   */
  const removeCourse = async (courseId: string) => {
    try {
      await deleteDoc(doc(db, 'courses', courseId));
    } catch (e) {
      console.warn('Could not delete from Firestore:', e);
    }
    const existing = getLocalCustomCourses();
    const updated = existing.filter(c => c.id !== courseId);
    saveLocalCustomCourses(updated);
    setCourses(mergeCourses(updated));
  };

  return {
    courses,
    loading,
    submitCourse,
    removeCourse
  };
}
