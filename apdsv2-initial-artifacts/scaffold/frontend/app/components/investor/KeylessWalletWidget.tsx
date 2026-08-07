'use client';

import React from 'react';
import { Copy, ShieldCheck } from 'lucide-react';

export function KeylessWalletWidget() {
  const mockAddress = "0x8F3...9A2C";
  
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-4 py-2 hover:border-[#5EC8F2]/30 transition-colors cursor-pointer group">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[12px] font-mono text-slate-300 tracking-wider">
          {mockAddress}
        </span>
        <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
      </div>
      
      <div className="flex items-center gap-1.5 mt-2 opacity-70">
        <ShieldCheck className="w-3.5 h-3.5 text-[#5EC8F2]" />
        <span className="text-[10px] font-sans uppercase tracking-widest text-slate-400 font-medium">
          ERC-4337 Keyless Wallet (Base)
        </span>
      </div>
    </div>
  );
}
