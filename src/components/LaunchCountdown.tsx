import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Calendar, RotateCcw } from 'lucide-react';

interface LaunchCountdownProps {
  variant?: 'banner' | 'compact' | 'hero';
  onReset?: () => void;
  showAdminReset?: boolean;
}

const COUNTDOWN_STORAGE_KEY = 'ephata_launch_target_date';

// Returns target date, defaulting to 7 days from now if not set or expired
export const getCountdownTargetDate = (): Date => {
  const saved = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
  if (saved) {
    const parsed = new Date(saved);
    if (!isNaN(parsed.getTime()) && parsed.getTime() > Date.now()) {
      return parsed;
    }
  }
  // Default fresh countdown: 7 days from now at 23:59:59
  const freshTarget = new Date();
  freshTarget.setDate(freshTarget.getDate() + 7);
  freshTarget.setHours(23, 59, 59, 0);
  localStorage.setItem(COUNTDOWN_STORAGE_KEY, freshTarget.toISOString());
  return freshTarget;
};

export const resetCountdownTargetDate = (daysAhead: number = 7): Date => {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);
  target.setHours(23, 59, 59, 0);
  localStorage.setItem(COUNTDOWN_STORAGE_KEY, target.toISOString());
  window.dispatchEvent(new CustomEvent('ephata-countdown-reset', { detail: target.toISOString() }));
  return target;
};

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  variant = 'hero',
  onReset,
  showAdminReset = false,
}) => {
  const [targetDate, setTargetDate] = useState<Date>(getCountdownTargetDate);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  // Calculate remaining time
  const calculate = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      // Auto renew for the next cohort so visitors never see a dead 00:00:00 timer
      const renewed = resetCountdownTargetDate(7);
      setTargetDate(renewed);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
  };

  useEffect(() => {
    calculate();
    const interval = setInterval(calculate, 1000);

    const handleCustomReset = (e: any) => {
      if (e.detail) {
        setTargetDate(new Date(e.detail));
      } else {
        setTargetDate(getCountdownTargetDate());
      }
    };

    window.addEventListener('ephata-countdown-reset', handleCustomReset);
    return () => {
      clearInterval(interval);
      window.removeEventListener('ephata-countdown-reset', handleCustomReset);
    };
  }, [targetDate]);

  const handleManualReset = () => {
    const renewed = resetCountdownTargetDate(7);
    setTargetDate(renewed);
    if (onReset) onReset();
  };

  const formattedDate = targetDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-400/20">
        <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
        <span className="font-semibold text-slate-200">Clôture session :</span>
        <span className="font-mono font-bold text-amber-400">
          {String(timeLeft.days).padStart(2, '0')}j {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-[#0A2540] to-slate-900 border border-amber-500/40 p-4 sm:p-5 shadow-xl text-white">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Title and context */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Rentrée Officielle & Clôture des Inscriptions</span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-white">
            Prochaine cohorte certifiante : <span className="text-amber-300 font-bold">{formattedDate}</span>
          </p>
          <p className="text-xs text-slate-300 max-w-lg">
            Places limitées à 25 apprenants par promotion pour garantir le suivi personnalisé et les 3 mois de coaching individuel.
          </p>
        </div>

        {/* Live Timer Boxes */}
        <div className="flex items-center gap-2 sm:gap-3 self-center md:self-auto">
          {/* Days */}
          <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/40 rounded-xl px-2.5 sm:px-3 py-2 min-w-[52px] sm:min-w-[62px] shadow-inner">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mt-1">Jours</span>
          </div>

          <span className="text-amber-400 font-bold text-lg">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/40 rounded-xl px-2.5 sm:px-3 py-2 min-w-[52px] sm:min-w-[62px] shadow-inner">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mt-1">Heures</span>
          </div>

          <span className="text-amber-400 font-bold text-lg">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/40 rounded-xl px-2.5 sm:px-3 py-2 min-w-[52px] sm:min-w-[62px] shadow-inner">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mt-1">Min</span>
          </div>

          <span className="text-amber-400 font-bold text-lg">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/40 rounded-xl px-2.5 sm:px-3 py-2 min-w-[52px] sm:min-w-[62px] shadow-inner">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-300 leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mt-1">Sec</span>
          </div>

          {/* Admin reset quick button */}
          {showAdminReset && (
            <button
              onClick={handleManualReset}
              title="Réinitialiser le compte à rebours (+7 jours)"
              className="ml-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
