'use client';

import React from 'react';
import CinematicBackground from '@/app/components/auth/CinematicBackground';
import InvestorSidebar from '@/app/components/investor/InvestorSidebar';

export default async function InvestorLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans">
      <CinematicBackground />
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />
      
      {/* Content wrapper with z-index above background */}
      <div className="relative z-20 flex-1 flex pt-16">
        <InvestorSidebar lang={resolvedParams.lang} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
