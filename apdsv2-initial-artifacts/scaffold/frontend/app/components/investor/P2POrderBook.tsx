'use client';

import React from 'react';
import { useDictionary } from '@/app/components/DictionaryProvider';
import { ArrowDownToLine, Info } from 'lucide-react';

export function P2POrderBook() {
  const { dict } = useDictionary();

  const mockOrders = [
    {
      id: 'ord-001',
      project: 'Clean Biogas & Agroindustrial',
      seller: '0x4F1...2B9',
      amount: '$2,500 USDC',
      discount: '4.5%',
      price: '$2,387.50 USDC',
      status: 'OPEN'
    },
    {
      id: 'ord-002',
      project: 'Distributed Solar Farm LATAM',
      seller: '0x9A3...7C4',
      amount: '$10,000 USDC',
      discount: '8.0%',
      price: '$9,200.00 USDC',
      status: 'OPEN'
    },
    {
      id: 'ord-003',
      project: 'Tokenized Real Estate - Madrid Prime',
      seller: '0x1B8...9E2',
      amount: '$1,200 USDC',
      discount: '2.0%',
      price: '$1,176.00 USDC',
      status: 'PROCESSING'
    }
  ];

  return (
    <div className="glass-blue-card border border-white/5 rounded-3xl p-1 sm:p-6 overflow-hidden">
      
      {/* Alert Banner */}
      <div className="mx-4 sm:mx-0 mb-6 bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 rounded-2xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-[#5EC8F2] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[13px] font-sans text-white font-medium mb-1">KYC Required for P2P Secondary Market</p>
          <p className="text-[12px] font-sans text-slate-400">
            To buy or sell tokenized RWA positions, you must hold a valid ERC-3643 KYC credential on your DID. All trades execute automatically via the FVM smart contract.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans">
          <thead>
            <tr className="border-b border-white/5 text-[11px] uppercase tracking-widest text-slate-500 font-medium">
              <th className="py-4 px-4 font-medium">Project</th>
              <th className="py-4 px-4 font-medium hidden sm:table-cell">Seller</th>
              <th className="py-4 px-4 font-medium text-right">Position Value</th>
              <th className="py-4 px-4 font-medium text-right">Discount</th>
              <th className="py-4 px-4 font-medium text-right">Asking Price</th>
              <th className="py-4 px-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-4 px-4">
                  <p className="text-[13px] text-white font-medium">{order.project}</p>
                </td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  <p className="text-[12px] font-mono text-slate-400">{order.seller}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-[13px] font-mono text-slate-300">{order.amount}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                    -{order.discount}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-[14px] font-mono font-medium text-[#5EC8F2]">{order.price}</p>
                </td>
                <td className="py-4 px-4 text-center">
                  <button 
                    disabled={order.status === 'PROCESSING'}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 text-white text-[11px] font-sans uppercase tracking-wider font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                  >
                    {order.status === 'OPEN' ? (
                      <>
                        Buy Position <ArrowDownToLine className="w-3.5 h-3.5 ml-2" />
                      </>
                    ) : (
                      'Processing'
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Sell Button Action */}
      <div className="mt-6 flex justify-end px-4 sm:px-0">
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#050505] text-[12px] font-sans uppercase tracking-widest font-bold hover:opacity-90 transition-opacity">
          Sell My Position
        </button>
      </div>
    </div>
  );
}
