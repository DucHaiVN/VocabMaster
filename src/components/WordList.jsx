import React from 'react';
import { Volume2, Tag } from 'lucide-react';

export default function WordList({ cards }) {
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-950/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Word(s)</th>
              <th className="px-4 py-4">POS</th>
              <th className="px-6 py-4">Definition</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Listen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {cards.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition">
                <td className="px-6 py-4 font-bold text-white">{item.words.join(', ')}</td>
                <td className="px-4 py-4">
                  <span className="font-mono text-xs bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded uppercase">
                    {item.pos}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">{item.definition}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.status === 'Mastered' ? 'bg-emerald-500/10 text-emerald-400' :
                    item.status === 'Learning' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    {item.status || 'Needs Review'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => speak(item.words[0])}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
