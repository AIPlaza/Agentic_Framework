'use client';

import React from 'react';
import { useDictionary } from '@/app/components/DictionaryProvider';
import { P2POrderBook } from '@/app/components/investor/P2POrderBook';

export default function P2PMarketplacePage() {
  const { dict } = useDictionary();

  return (
    <main className="max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">
          P2P Secondary Market
        </h1>
        <p className="text-slate-400 font-sans text-sm max-w-2xl">
          Liquidate your RWA token positions early or acquire discounted milestones from other investors. KYC required for all peer-to-peer transactions.
        </p>
      </div>

      {/* Order Book Component */}
      <P2POrderBook />
    </main>
  );
}
