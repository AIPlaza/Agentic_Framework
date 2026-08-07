'use client';

import React from 'react';
import { ShieldAlert, FileText, Bell, Key, LogOut } from 'lucide-react';

export function SettingsAndDocs() {
  return (
    <div className="glass-blue-card border border-white/5 rounded-2xl p-6 h-full flex flex-col group">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Key className="w-5 h-5 text-slate-300" />
        </div>
        <div>
          <h3 className="text-xl font-syne font-bold text-white">Settings & Legal</h3>
          <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest">Compliance & Security</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {/* Document Action */}
        <button className="w-full bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all rounded-xl p-4 flex items-center justify-between group/btn">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-medium text-white mb-0.5">ERC-3643 Audit Report</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase">View Security Audit</p>
            </div>
          </div>
          <FileText className="w-4 h-4 text-slate-600 group-hover/btn:text-white transition-colors" />
        </button>

        {/* Contract Action */}
        <button className="w-full bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all rounded-xl p-4 flex items-center justify-between group/btn">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#5EC8F2]/10 text-[#5EC8F2]">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-medium text-white mb-0.5">Signed RBF Contract</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase">CID: QmXr8...4nB</p>
            </div>
          </div>
          <DownloadIcon />
        </button>

        {/* Notification Settings */}
        <div className="w-full bg-black/20 border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-slate-400">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-medium text-white mb-0.5">Yield Notifications</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase">Current: Monthly</p>
            </div>
          </div>
          <select className="bg-transparent border-none text-[11px] font-mono text-slate-400 outline-none cursor-pointer">
            <option>Daily</option>
            <option>Weekly</option>
            <option selected>Monthly</option>
          </select>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <button className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 text-[11px] font-sans uppercase tracking-widest font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 border border-red-500/20">
          <LogOut className="w-4 h-4" /> Revoke Remote Sessions
        </button>
      </div>

    </div>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover/btn:text-white transition-colors">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}
