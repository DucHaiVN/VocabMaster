import React from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';

export default function SyncBadge({ status }) {
  return (
    <span className={`text-[10px] px-2.5 py-1 rounded-full border flex items-center gap-1.5 font-medium ${
      status === 'synced' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
      status === 'connecting' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
      'bg-rose-500/10 text-rose-400 border-rose-500/20'
    }`}>
      {status === 'synced' ? <Cloud className="w-3 h-3" /> : 
       status === 'connecting' ? <RefreshCw className="w-3 h-3 animate-spin" /> : 
       <CloudOff className="w-3 h-3" />}
      <span className="capitalize">{status}</span>
    </span>
  );
}
