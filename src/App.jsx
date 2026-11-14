import React, { useState } from 'react';
import { useVocabSync } from './hooks/useVocabSync';
import Header from './components/Header';
import FlashcardDeck from './components/FlashcardDeck';
import WordList from './components/WordList';

export default function App() {
  const { vocabList, customGroups, syncStatus, updateCloudState } = useVocabSync();
  const [activeTab, setActiveTab] = useState('flashcards');
  const [selectedGroup, setSelectedGroup] = useState('ALL');

  const filteredCards = selectedGroup === 'ALL' 
    ? vocabList 
    : vocabList.filter(item => item.group === selectedGroup);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = vocabList.map(item => item.id === id ? { ...item, status: newStatus } : item);
    updateCloudState(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} syncStatus={syncStatus} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedGroup('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedGroup === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            All Words ({vocabList.length})
          </button>
          {customGroups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedGroup === g ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {g} ({vocabList.filter(w => w.group === g).length})
            </button>
          ))}
        </div>

        {/* Dynamic Tab Rendering */}
        {activeTab === 'flashcards' && (
          <FlashcardDeck cards={filteredCards} onUpdateStatus={handleUpdateStatus} />
        )}
        {activeTab === 'words' && (
          <WordList cards={filteredCards} />
        )}
      </main>
    </div>
  );
}
