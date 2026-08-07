'use client';

import React from 'react';
import { TrendingUp, Info } from 'lucide-react';

export function EvolutionChart() {
  // SVG points for a smooth upward curve mimicking exponential RBF growth
  const curvePath = "M 0 100 C 20 100, 40 80, 60 70 C 80 60, 90 40, 100 20";
  
  return (
    <div className="glass-blue-card border border-white/5 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
          <h3 className="text-lg font-syne font-bold text-white mb-1">Yield Projection</h3>
          <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest">RBF Horizon (36 Months)</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-emerald-400 font-medium tracking-wider">ON TRACK</span>
        </div>
      </div>

      {/* Simplified CSS/SVG based chart to avoid heavy dependencies for the prototype */}
      <div className="flex-1 relative min-h-[150px] flex items-end justify-between px-2 pb-6 z-10 border-b border-white/10">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
        </div>

        {/* SVG Curve */}
        <div className="absolute inset-0 pointer-events-none pb-6">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5EC8F2" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#5EC8F2" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={`M 0 100 L 0 100 ${curvePath} L 100 100 Z`} fill="url(#curveGradient)" />
            <path d={curvePath} fill="none" stroke="#5EC8F2" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            
            {/* Current Position Marker */}
            <circle cx="60" cy="70" r="3" fill="#050505" stroke="#5EC8F2" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        
        {/* Y Axis labels (mock) */}
        <div className="absolute right-0 top-0 bottom-6 flex flex-col justify-between text-[9px] font-mono text-slate-500 pb-2">
          <span>+20%</span>
          <span>+10%</span>
          <span>0%</span>
        </div>

      </div>
      
      <div className="flex justify-between items-center mt-3 z-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        <span>Q1 2026</span>
        <span className="text-[#5EC8F2] font-bold">TODAY</span>
        <span>Q4 2028</span>
      </div>

      <div className="mt-4 bg-black/20 p-3 rounded-xl border border-white/5 flex gap-2 items-start z-10">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
          Projections are calculated dynamically based on FVM real-time metrics. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}
