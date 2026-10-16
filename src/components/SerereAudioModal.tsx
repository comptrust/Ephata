import React, { useState } from 'react';
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
      // Try to find a rhythmic West African / French pitch
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingId(null), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Cours de Langue Sérère · Terroir Sine, Saloum, Baol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Studio Audio des 100 Expressions Courantes
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Dialect Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher en français ou sérère..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Dialect selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-semibold mr-1">Région :</span>
              {['all', 'Sine', 'Saloum', 'Baol'].map((dialect) => (
                <button
                  key={dialect}
                  onClick={() => setSelectedDialect(dialect)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedDialect === dialect
                      ? 'bg-[#0A2540] text-white font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {dialect === 'all' ? 'Toutes' : dialect}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-semibold ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'Toutes les expressions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Phrases List Grid */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-slate-100/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredPhrases.map((phrase) => {
              const isPlaying = playingId === phrase.id;
              return (
                <div
                  key={phrase.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-amber-400 shadow-2xs hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Dialect & Category metadata (clean unboxed) */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="text-amber-700 font-bold uppercase">{phrase.category}</span>
                      <span className="text-slate-400">Terroir : {phrase.dialectContext}</span>
                    </div>

                    {/* French Meaning */}
                    <div className="text-xs font-semibold text-slate-700">
                      "{phrase.french}"
                    </div>

                    {/* Serere Word & Phonetics */}
                    <div className="mt-1.5 flex items-baseline justify-between gap-2">
                      <div className="text-base sm:text-lg font-black text-[#0A2540]">
                        {phrase.serere}
                      </div>
                    </div>

                    <div className="text-xs text-amber-800 font-mono italic">
                      Prononciation : [{phrase.phonetic}]
                    </div>

                    {phrase.culturalNote && (
                      <p className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-150 leading-relaxed">
                        💡 {phrase.culturalNote}
                      </p>
                    )}
                  </div>

                  {/* Audio Play Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleSpeak(phrase)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-amber-500 text-slate-950 animate-pulse'
                          : 'bg-[#0A2540] hover:bg-amber-600 text-white'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'Écoute en cours...' : 'Écouter la prononciation'}</span>
                    </button>

                    <span className="text-[10px] text-slate-400">Audio Studio</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-amber-50 border-t border-amber-200 p-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
          <div>
            <strong>Formation Complète "Parlez le Sérère en 30 jours" :</strong> 20 vidéos pratiques + 30 fiches PDF complet.
          </div>
          <a
            href="https://wa.me/221775079184?text=Bonjour%20Ephata,%20je%20souhaite%20m'inscrire%20au%20cours%20de%20langue%20Sérère"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            S'inscrire (5 000 FCFA)
          </a>
        </div>
      </div>
    </div>
  );
};
