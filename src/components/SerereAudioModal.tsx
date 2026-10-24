import React, { useState, useEffect } from 'react';
import { SERERE_PHRASES } from '../data/sererePhrasesData';
import { SererePhrase } from '../types';
import { 
  X, 
  Volume2, 
  Search, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Compass, 
  ShoppingBag,
  Users
} from 'lucide-react';

interface SerereAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SerereAudioModal: React.FC<SerereAudioModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDialect, setSelectedDialect] = useState<string>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['all', 'Salutations', 'Au Marché & Chiffres', 'Expressions Courantes', 'Famille & Respect', 'Orientation & Voyage'];

  const filteredPhrases = SERERE_PHRASES.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDialect = selectedDialect === 'all' || item.dialectContext === selectedDialect;
    const matchesSearch =
      item.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serere.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phonetic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesDialect && matchesSearch;
  });

  const handleSpeak = (phrase: SererePhrase) => {
    setPlayingId(phrase.id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.serere);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingId(null), 1200);
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

      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-hidden"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div 
          className="relative w-full max-w-4xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 bg-[#0A2540] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between border-b border-slate-700 z-20">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-4 h-4" />
                <span>Cours de Langue Sérère · Terroir Sine, Saloum, Baol</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Studio Audio des 100 Expressions Courantes
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

          {/* Filter Bar */}
          <div className="shrink-0 bg-slate-50 border-b border-slate-200 p-3 sm:p-3.5 space-y-2 z-10">
            <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher en français, sérère ou phonétique..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold text-[11px]">Dialecte :</span>
                <select
                  value={selectedDialect}
                  onChange={(e) => setSelectedDialect(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none"
                >
                  <option value="all">Tous dialectes (Sine, Saloum, Baol)</option>
                  <option value="Sine (Standard)">Sine (Standard)</option>
                  <option value="Saloum (Delta)">Saloum (Delta)</option>
                  <option value="Baol (Centre)">Baol (Centre)</option>
                </select>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 text-[11px] rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0A2540] text-white font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Phrases Grid - Scrollable body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredPhrases.map((phrase) => {
                const isPlaying = playingId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isPlaying
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-amber-300 bg-white'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                          {phrase.category}
                        </span>
                        <span className="text-amber-700 font-medium">
                          {phrase.dialectContext}
                        </span>
                      </div>

                      <div className="text-sm font-extrabold text-[#0A2540] mt-1">
                        {phrase.serere}
                      </div>

                      <div className="text-[11px] text-amber-700 font-mono italic">
                        [{phrase.phonetic}]
                      </div>

                      <div className="text-xs text-slate-700 pt-0.5">
                        {phrase.french}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeak(phrase)}
                      className={`p-2 rounded-lg transition-all shrink-0 cursor-pointer ${
                        isPlaying
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700'
                      }`}
                      title="Écouter la prononciation audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Bottom Footer */}
          <div className="shrink-0 bg-amber-50 border-t border-amber-200 p-3 px-4 sm:px-6 flex items-center justify-between gap-3 text-xs text-amber-900 z-20">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              ✕ Fermer
            </button>
            <div className="text-right">
              <strong>Pack Complet Sérère (5 000 FCFA) :</strong> 20 vidéos + 30 fiches PDF.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
