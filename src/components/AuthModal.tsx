import React, { useState, useEffect } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    signInGoogle, 
    signInEmail, 
    signUpEmail,
    resetPassword 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (authMode === 'login') {
        await signInEmail(email, password);
      } else if (authMode === 'signup') {
        if (!name.trim()) {
          throw new Error('Veuillez renseigner votre nom complet.');
        }
        if (password.length < 6) {
          throw new Error('Le mot de passe doit comporter au moins 6 caractères.');
        }
        await signUpEmail(email, password, name);
      } else if (authMode === 'forgot') {
        if (!email.trim()) {
          throw new Error('Veuillez saisir votre adresse email.');
        }
        await resetPassword(email);
        setSuccessMsg('Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Une erreur est survenue lors de l\'authentification.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Identifiants incorrects. Vérifiez votre email et mot de passe.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'Un compte existe déjà avec cette adresse email. Veuillez vous connecter.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Connexion Google annulée.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await signInGoogle();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('Échec de la connexion Google : ' + (err.message || 'Erreur réseau'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating high-priority Close Button */}
      <button
        type="button"
        onClick={closeAuthModal}
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[70] px-3.5 py-2 bg-slate-900/90 hover:bg-red-600 text-white rounded-full shadow-2xl border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer group"
        title="Fermer la fenêtre (ou touche Échap)"
        aria-label="Fermer la fenêtre"
      >
        <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform" />
        <span>Fermer (✕)</span>
      </button>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
        onClick={closeAuthModal}
      >
        {/* Modal Window Container */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 bg-gradient-to-r from-[#0A2540] via-[#0E2F54] to-slate-950 text-white p-5 px-6 relative flex items-center justify-between border-b border-slate-800 z-20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400">
                  Ephata Academy · Espace Sécurisé
                </span>
              </div>
              <h2 className="text-lg font-bold font-display">
                {authMode === 'login' && 'Connexion à votre espace'}
                {authMode === 'signup' && 'Créer votre compte apprenant'}
                {authMode === 'forgot' && 'Mot de passe oublié'}
              </h2>
            </div>

            <button 
              type="button"
              onClick={closeAuthModal}
              className="px-3 py-1.5 bg-white/10 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold shrink-0 cursor-pointer border border-white/20"
              aria-label="Fermer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Fermer</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Google One-Click Button */}
            {authMode !== 'forgot' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continuer avec Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                    ou par email
                  </span>
                </div>
              </div>
            )}

            {/* Error / Success Feedback */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom & Prénom
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Cheikh Ndiaye"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adresse Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Mot de passe
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg(null);
                          setSuccessMsg(null);
                          setAuthMode('forgot');
                        }}
                        className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold"
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#0A2540] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Traitement en cours...</span>
                ) : (
                  <>
                    {authMode === 'login' && <LogIn className="w-4 h-4 text-amber-400" />}
                    {authMode === 'signup' && <UserPlus className="w-4 h-4 text-amber-400" />}
                    <span>
                      {authMode === 'login' && 'Se connecter'}
                      {authMode === 'signup' && 'Créer mon compte'}
                      {authMode === 'forgot' && 'Envoyer le lien de réinitialisation'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle Modes */}
            <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-600">
              {authMode === 'login' && (
                <p>
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setSuccessMsg(null);
                      setAuthMode('signup');
                    }}
                    className="font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                  >
                    Inscrivez-vous ici
                  </button>
                </p>
              )}

              {authMode === 'signup' && (
                <p>
                  Vous avez déjà un compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setSuccessMsg(null);
                      setAuthMode('login');
                    }}
                    className="font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                  >
                    Connectez-vous
                  </button>
                </p>
              )}

              {authMode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setAuthMode('login');
                  }}
                  className="font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                >
                  ← Retour à la connexion
                </button>
              )}
            </div>

            {/* Privacy System Indicator */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Système de Confidentialité & Protection des Données</span>
              </div>
              <p>
                Vos cours suivis, notes privées et attestations sont chiffrés et accessibles uniquement via votre compte. L'administrateur Alouise Emmanuel Diouf garantit la sécurité de vos données.
              </p>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
            <span>Ephata Consulting Group · Dakar</span>
            <button
              type="button"
              onClick={closeAuthModal}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors cursor-pointer"
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
