import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  MessageCircle, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Calculator, 
  Volume2, 
  User, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

import { LaunchCountdown } from './LaunchCountdown';

interface HeaderProps {
  activeTab: 'catalog' | 'dashboard' | 'business-plans' | 'calculator' | 'serere-audio';
  onSelectTab: (tab: 'catalog' | 'dashboard' | 'business-plans' | 'calculator' | 'serere-audio') => void;
  enrolledCount: number;
  onOpenQuickEnroll: () => void;
  onOpenAdminPanel?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  enrolledCount,
  onOpenQuickEnroll,
  onOpenAdminPanel
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs backdrop-blur-md bg-white/95">
      {/* Top Bar for African Contact & Trust */}
      <div className="bg-[#0A2540] text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Plateforme E-Learning Officielle
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">
              Sicap liberté 5A, Dakar Sénégal
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <div className="hidden sm:block">
              <LaunchCountdown variant="compact" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 transition text-[11px]"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Direction / Inscriptions</span>
              </button>
            )}
            <span className="hidden lg:inline text-slate-500">·</span>
            <a
              href="mailto:adonaywaly5@gmail.com"
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-amber-400 font-medium transition-colors"
            >
              <span>adonaywaly5@gmail.com</span>
            </a>
            <span className="hidden lg:inline text-slate-500">·</span>
            <a
              href="https://wa.me/221775079184?text=Bonjour%20M.%20Alouise%20Emmanuel%20Diouf,%20je%20souhaite%20des%20informations%20sur%20les%20formations%20Ephata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp : +221 77 507 91 84</span>
            </a>
            <span className="hidden md:inline text-slate-400">·</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Wave</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Orange Money</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">En ligne / Présentiel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onSelectTab('catalog')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md p-1"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => onSelectTab('catalog')}
              className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${
                activeTab === 'catalog'
                  ? 'text-[#0A2540] border-amber-500'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Catalogue des Formations
            </button>

            <button
              onClick={() => onSelectTab('business-plans')}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                activeTab === 'business-plans'
                  ? 'text-[#0A2540] border-amber-500'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>30 Business Plans</span>
            </button>

            <button
              onClick={() => onSelectTab('calculator')}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                activeTab === 'calculator'
                  ? 'text-[#0A2540] border-amber-500'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Simulateur Financier</span>
            </button>

            <button
              onClick={() => onSelectTab('serere-audio')}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                activeTab === 'serere-audio'
                  ? 'text-[#0A2540] border-amber-500'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Audio Sérère (100 Expressions)</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg flex items-center gap-2 border transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Mon Espace Apprenant</span>
              {enrolledCount > 0 && (
                <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenQuickEnroll}
              className="px-4 py-2 text-sm font-bold text-white bg-[#0A2540] hover:bg-[#0d345a] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>S'inscrire / Payer</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg relative"
              aria-label="Mon Espace"
            >
              <GraduationCap className="w-5 h-5 text-amber-600" />
              {enrolledCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectTab('catalog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Catalogue des Formations</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('business-plans');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>30 Business Plans Offerts</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('calculator');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Simulateur Éducation Financière</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('serere-audio');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Audio Sérère (100 Expressions)</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Mon Espace Apprenant</span>
              </span>
              {enrolledCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full font-bold">
                  {enrolledCount} cours
                </span>
              )}
            </button>
            {onOpenAdminPanel && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                <span>Direction · Gestion Inscriptions</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickEnroll();
              }}
              className="w-full py-2.5 px-4 bg-[#0A2540] text-white rounded-lg font-bold text-sm shadow text-center"
            >
              S'inscrire / Payer avec Wave ou Orange Money
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
