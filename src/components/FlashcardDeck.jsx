import React, { useState } from 'react';
import { Volume2, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function FlashcardDeck({ cards, onUpdateStatus }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl">
        <p className="text-slate-400">No cards available in this filter group.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = (status) => {
    onUpdateStatus(currentCard.id, status);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const speak = (text, e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Flip Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 perspective cursor-pointer"
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Face */}
          <div className="absolute inset-0 w-full h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between backface-hidden shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded-full">
                {currentCard.pos}
              </span>
              <span className="text-xs text-slate-500 font-medium">Card {currentIndex + 1} of {cards.length}</span>
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">{currentCard.words.join(', ')}</h2>
              <button 
                onClick={(e) => speak(currentCard.words[0], e)}
                className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full"
              >
                <Volume2 className="w-4 h-4" />
                <span>Pronounce</span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-500">Tap card to reveal definition</p>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full bg-slate-900 border border-indigo-500/40 rounded-3xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
            <div className="text-xs text-slate-400 uppercase font-semibold">Definition</div>
            
            <div className="space-y-4">
              <p className="text-lg font-medium text-slate-200">{currentCard.definition}</p>
              {currentCard.example && (
                <p className="text-sm italic text-slate-400 border-l-2 border-indigo-500 pl-3">
                  "{currentCard.example}"
                </p>
              )}
            </div>

            <div className="text-center text-xs text-slate-500">Rate your retention below</div>
          </div>

        </div>
      </div>

      {/* Spaced Repetition Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleNext('Needs Review')}
          className="py-3 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Needs Review</span>
        </button>

        <button
          onClick={() => handleNext('Learning')}
          className="py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Learning</span>
        </button>

        <button
          onClick={() => handleNext('Mastered')}
          className="py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Mastered</span>
        </button>
      </div>
    </div>
  );
}
