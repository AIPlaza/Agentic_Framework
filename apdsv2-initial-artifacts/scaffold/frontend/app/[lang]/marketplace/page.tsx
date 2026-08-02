import React from 'react';
import { MarketplaceHero } from '@/app/components/marketplace/MarketplaceHero';
import { ProjectGrid } from '@/app/components/marketplace/ProjectGrid';

export default function MarketplacePage() {
  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen flex flex-col">
      <main className="flex-1">
        <MarketplaceHero />
        <ProjectGrid />
      </main>
    </div>
  );
}
