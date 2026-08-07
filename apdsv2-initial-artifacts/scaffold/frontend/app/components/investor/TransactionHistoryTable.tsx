'use client';

import React from 'react';
import { Download, FileText, ExternalLink, HelpCircle } from 'lucide-react';

export function TransactionHistoryTable() {
  const transactions = [
    {
      id: 'tx-892',
      date: 'Aug 04, 2026',
      type: 'YIELD_PAYMENT',
      project: 'Clean Biogas & Agroindustrial',
      amount: '+$145.20 USDC',
      hash: '0x3a4...8f1',
      status: 'CONFIRMED'
    },
    {
      id: 'tx-881',
      date: 'Jul 28, 2026',
      type: 'DEPOSIT',
      project: 'Wallet Funding',
      amount: '+$5,000.00 USDC',
      hash: '0x1b2...9c4',
      status: 'CONFIRMED'
    },
    {
      id: 'tx-875',
      date: 'Jul 15, 2026',
      type: 'INVESTMENT',
      project: 'Distributed Solar Farm LATAM',
      amount: '-$10,000.00 USDC',
      hash: '0x9d5...2e7',
      status: 'CONFIRMED'
    }
  ];

  return (
    <div className="glass-blue-card border border-white/5 rounded-3xl p-1 sm:p-6 overflow-hidden flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-0 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-syne font-bold text-white mb-1">Transaction History</h3>
          <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest">Auditable On-Chain Records</p>
        </div>
        <button className="flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-sans uppercase tracking-wider transition-colors border border-white/5">
          <Download className="w-3.5 h-3.5 mr-2" /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              <th className="py-4 px-4 font-medium">Date</th>
              <th className="py-4 px-4 font-medium">Type</th>
              <th className="py-4 px-4 font-medium hidden sm:table-cell">Context</th>
              <th className="py-4 px-4 font-medium text-right">Amount</th>
              <th className="py-4 px-4 font-medium text-center">Receipt</th>
              <th className="py-4 px-4 font-medium text-center">Support</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-4 px-4">
                  <p className="text-[12px] text-slate-300 font-medium">{tx.date}</p>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                    tx.type === 'DEPOSIT' ? 'bg-blue-500/10 text-blue-400' :
                    tx.type === 'YIELD_PAYMENT' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-slate-500/10 text-slate-300'
                  }`}>
                    {tx.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  <p className="text-[12px] text-slate-400 truncate max-w-[200px]">{tx.project}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className={`text-[13px] font-mono font-medium ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                    {tx.amount}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center gap-2">
                    <button title="View on BaseScan" className="p-1.5 rounded-lg bg-black/20 text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button title="Download PDF Receipt" className="p-1.5 rounded-lg bg-black/20 text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <button title="Open Dispute/Support Ticket" className="p-1.5 rounded-lg bg-transparent text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <HelpCircle className="w-4 h-4" />
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
