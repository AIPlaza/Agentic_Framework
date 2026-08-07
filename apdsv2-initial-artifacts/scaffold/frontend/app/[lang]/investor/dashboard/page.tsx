'use client';

import React from 'react';
import { useDictionary } from '@/app/components/DictionaryProvider';
import { PortfolioOverview } from '@/app/components/investor/PortfolioOverview';
import { ActiveInvestmentsGrid } from '@/app/components/investor/ActiveInvestmentsGrid';
import { KeylessWalletWidget } from '@/app/components/investor/KeylessWalletWidget';

export default function InvestorDashboardPage() {
  const { dict } = useDictionary();

  return (
    <main className="max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight mb-2">
            Investor Dashboard
          </h1>
          <p className="text-slate-400 font-sans text-sm max-w-xl">
            Monitor your asset portfolio, track real-time yield from the FVM, and manage your keyless wallet operations safely.
          </p>
        </div>
        
        {/* Quick Wallet Widget on top right */}
        <KeylessWalletWidget />
      </div>

      {/* Main Stats / Overview */}
      <PortfolioOverview />

      {/* Grid of Investments */}
      <div className="mt-8">
        <h2 className="text-xl font-syne font-medium text-white mb-6">Active Investments</h2>
        <ActiveInvestmentsGrid />
      </div>
    </main>
  );
}
