import React from 'react';
import { Sparkles, BookOpen, ListFilter } from 'lucide-react';
import SyncBadge from './SyncBadge';

export default function Header({ activeTab, setActiveTab, syncStatus }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="font-bold text-lg text-white">VocabMaster</h1>
            <SyncBadge status={syncStatus} />
          </div>
        </div>

        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'flashcards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Flashcards</span>
          </button>
          <button
            onClick={() => setActiveTab('words')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'words' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Word List</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
