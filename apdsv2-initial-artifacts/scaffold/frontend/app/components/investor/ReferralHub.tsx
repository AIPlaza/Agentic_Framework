'use client';

import React from 'react';
import { Link2, Copy, Users, DollarSign, Gift } from 'lucide-react';

export function ReferralHub() {
  const referralLink = "https://app.accet.io/invite/did:accet:9f8e7d...";
  
  return (
    <div className="glass-blue-card border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#5EC8F2]/10 flex items-center justify-center border border-[#5EC8F2]/20 mb-3">
            <Gift className="w-5 h-5 text-[#5EC8F2]" />
          </div>
          <span className="px-2 py-1 rounded bg-white/5 text-slate-300 text-[10px] font-mono uppercase tracking-widest border border-white/10">
            Referral Program
          </span>
        </div>
        
        <h3 className="text-xl font-syne font-bold text-white mb-2">Invite & Earn</h3>
        <p className="text-[12px] font-sans text-slate-400 leading-relaxed mb-6">
          Share your unique decentralized identifier (DID) link. Earn a 2% bonus in USDC when your guests complete KYC and their first funding.
        </p>

        <div className="bg-black/40 border border-white/10 rounded-xl p-1 flex items-center mb-6">
          <div className="px-3 flex-shrink-0">
            <Link2 className="w-4 h-4 text-slate-500" />
          </div>
          <input 
            type="text"
            readOnly
            value={referralLink}
            className="bg-transparent border-none outline-none text-slate-300 text-[11px] font-mono flex-1 w-full"
          />
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex-shrink-0">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Users className="w-4 h-4 text-slate-400 mb-2" />
          <p className="text-xl font-syne font-bold text-white mb-0.5">3</p>
          <p className="text-[9px] font-sans text-slate-500 uppercase tracking-widest">Active Guests</p>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <DollarSign className="w-4 h-4 text-emerald-400 mb-2" />
          <p className="text-xl font-syne font-bold text-emerald-400 mb-0.5">$250</p>
          <p className="text-[9px] font-sans text-slate-500 uppercase tracking-widest">Bonus Earned</p>
        </div>
      </div>
    </div>
  );
}
