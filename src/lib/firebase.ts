import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Course, StudentProgress } from '../types';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
});

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore (support custom databaseId if configured)
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId.length > 0
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connectivity verification as recommended by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is in offline mode or waiting for connection.');
    }
  }
}
testConnection();

// Known admin emails
export const ADMIN_EMAILS = [
  'adonaywaly5@gmail.com', // Alouise Emmanuel Diouf
  'comptrust.tech@gmail.com' // Current AI Studio project admin
];

export interface AppUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'student' | 'admin';
  createdAt: string;
  lastLoginAt: string;
}

/**
 * Determine if an email belongs to Administrator Alouise Emmanuel Diouf
 */
export function isEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  return ADMIN_EMAILS.some(adm => adm.toLowerCase() === normalized);
}

/**
 * Create or sync user profile in Firestore
 */
export async function syncUserProfile(user: FirebaseUser): Promise<AppUserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  const isAdmin = isEmailAdmin(user.email);
  const now = new Date().toISOString();

  if (snap.exists()) {
    const existing = snap.data() as AppUserProfile;
    const role = isAdmin ? 'admin' : (existing.role || 'student');
    const updated: Partial<AppUserProfile> = {
      lastLoginAt: now,
      displayName: user.displayName || existing.displayName || user.email?.split('@')[0] || 'Étudiant',
      photoURL: user.photoURL || existing.photoURL || '',
      role
    };
    await setDoc(userRef, updated, { merge: true });
    return { ...existing, ...updated } as AppUserProfile;
  } else {
    const newProfile: AppUserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'Étudiant',
      photoURL: user.photoURL || '',
      role: isAdmin ? 'admin' : 'student',
      createdAt: now,
      lastLoginAt: now
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
}

/**
 * Authentication Methods
 */
export async function loginWithGoogle(): Promise<AppUserProfile> {
  const cred = await signInWithPopup(auth, googleProvider);
  return await syncUserProfile(cred.user);
}

export async function loginWithEmail(email: string, pass: string): Promise<AppUserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return await syncUserProfile(cred.user);
}

export async function signupWithEmail(email: string, pass: string, name: string): Promise<AppUserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name.trim()) {
    await updateProfile(cred.user, { displayName: name.trim() });
  }
  return await syncUserProfile(cred.user);
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Student Learning Progress in Firestore (users/{userId}/progress/{courseId})
 */
export async function fetchRemoteStudentProgress(userId: string, courseId: string): Promise<StudentProgress | null> {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', courseId);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as StudentProgress;
    }
  } catch (err) {
    console.warn('Error fetching remote progress:', err);
  }
  return null;
}

export async function saveRemoteStudentProgress(
  userId: string, 
  courseId: string, 
  progress: StudentProgress
): Promise<void> {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', courseId);
    await setDoc(progressRef, {
      ...progress,
      userId,
      courseId,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving remote progress:', err);
  }
}

/**
 * Course Submission by Admin (Alouise)
 */
export async function saveCourseToFirestore(course: Course, authorId: string): Promise<void> {
  const courseRef = doc(db, 'courses', course.id);
  await setDoc(courseRef, {
    ...course,
    authorId,
    updatedAt: new Date().toISOString(),
    status: 'published'
  }, { merge: true });
}

export async function fetchCoursesFromFirestore(): Promise<Course[]> {
  try {
    const q = collection(db, 'courses');
    const snap = await getDocs(q);
    const list: Course[] = [];
    snap.forEach(d => {
      list.push(d.data() as Course);
    });
    return list;
  } catch (err) {
    console.warn('Could not fetch courses from Firestore, will use bundled courses:', err);
    return [];
  }
}
