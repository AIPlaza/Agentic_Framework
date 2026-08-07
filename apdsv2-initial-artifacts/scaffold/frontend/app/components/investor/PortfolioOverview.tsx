'use client';

import React from 'react';
import { Wallet, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';

export function PortfolioOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Invested */}
      <div className="glass-blue-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wallet className="w-12 h-12 text-[#5EC8F2]" />
        </div>
        <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest font-medium mb-1">
          Total Invested
        </p>
        <h3 className="text-3xl font-syne font-bold text-white tracking-tight mb-2">
          $12,500.00
        </h3>
        <p className="text-[12px] font-sans text-emerald-400 flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          <span>Active in 2 projects</span>
        </p>
      </div>

      {/* Yield Accrued */}
      <div className="glass-blue-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp className="w-12 h-12 text-[#5EC8F2]" />
        </div>
        <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest font-medium mb-1">
          Yield Accrued (RBF)
        </p>
        <h3 className="text-3xl font-syne font-bold text-white tracking-tight mb-2">
          $480.25
        </h3>
        <p className="text-[12px] font-sans text-emerald-400 flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          <span>+14.5% APY Avg.</span>
        </p>
      </div>

      {/* Wallet Balance */}
      <div className="glass-blue-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <DollarSign className="w-12 h-12 text-[#5EC8F2]" />
        </div>
        <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest font-medium mb-1">
          Available Balance
        </p>
        <h3 className="text-3xl font-syne font-bold text-white tracking-tight mb-2">
          $1,250.00
        </h3>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-1.5 rounded-lg bg-[#5EC8F2]/10 text-[#5EC8F2] text-[11px] font-mono uppercase font-medium hover:bg-[#5EC8F2]/20 transition-colors">
            Deposit
          </button>
          <button className="flex-1 py-1.5 rounded-lg bg-white/5 text-slate-300 text-[11px] font-mono uppercase font-medium hover:bg-white/10 transition-colors">
            Withdraw
          </button>
        </div>
      </div>
      
      {/* Portfolio Health */}
      <div className="glass-blue-card border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest font-medium">
            Portfolio Health
          </p>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">EXCELLENT</span>
        </div>
        <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-[#5EC8F2] to-emerald-400 w-full" />
        </div>
        <p className="text-[11px] text-slate-500 font-sans mt-1">
          All smart contracts are fully operational and verified by FVM.
        </p>
      </div>
    </div>
  );
}
