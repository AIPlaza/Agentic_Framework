import React from 'react';
import { MarketplaceHero } from '@/app/components/marketplace/MarketplaceHero';
import { ProjectGrid } from '@/app/components/marketplace/ProjectGrid';
import HeaderNav from '@/app/components/HeaderNav';

export default function MarketplacePage() {
  return (
    <div className="w-full bg-[#162032] min-h-screen flex flex-col">
      <HeaderNav />
      <main className="flex-1">
        <MarketplaceHero />
        <ProjectGrid />
      </main>
    </div>
  );
}
