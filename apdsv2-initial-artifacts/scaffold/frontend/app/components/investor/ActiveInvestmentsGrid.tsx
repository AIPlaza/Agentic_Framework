'use client';

import React from 'react';
import { ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { useDictionary } from '@/app/components/DictionaryProvider';

export function ActiveInvestmentsGrid() {
  const { dict, lang } = useDictionary();

  const investments = [
    {
      id: 'demo-project-001',
      title: 'Clean Biogas & Agroindustrial Facility',
      investedAmount: 10000,
      currentValue: 10350,
      apy: '14.5%',
      status: 'Active',
      progress: 45 // 45% returned
    },
    {
      id: 'madrid-real-estate-002',
      title: 'Tokenized Real Estate - Madrid Prime',
      investedAmount: 2500,
      currentValue: 2630,
      apy: '8.2%',
      status: 'Active',
      progress: 12
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {investments.map((inv) => (
        <div key={inv.id} className="glass-blue-card border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-syne font-bold text-white mb-1">{inv.title}</h3>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">{inv.status}</span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">ERC-3643 Verified</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
            <div>
              <p className="text-[10px] text-slate-500 font-sans uppercase tracking-widest mb-1">Invested</p>
              <p className="text-white font-mono font-medium">${inv.investedAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-sans uppercase tracking-widest mb-1">Current Value</p>
              <p className="text-[#5EC8F2] font-mono font-medium">${inv.currentValue.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6 flex-1">
            <div className="flex justify-between text-[11px] font-sans text-slate-400 mb-2">
              <span>RBF Return Progress</span>
              <span>{inv.progress}%</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]" 
                style={{ width: `${inv.progress}%` }} 
              />
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Link 
              href={`/${lang}/project/${inv.id}`}
              className="flex-1 flex justify-center items-center py-2.5 rounded-xl bg-white/5 text-slate-300 text-[12px] font-sans font-medium hover:bg-white/10 hover:text-white transition-colors border border-white/5"
            >
              <Activity className="w-4 h-4 mr-2 opacity-50" />
              Project Studio
            </Link>
            <Link 
              href={`/${lang}/investor/p2p?asset=${inv.id}`}
              className="flex-1 flex justify-center items-center py-2.5 rounded-xl bg-transparent text-slate-400 text-[12px] font-sans font-medium hover:text-white transition-colors border border-white/5 hover:border-white/10"
            >
              Liquidate / P2P <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
