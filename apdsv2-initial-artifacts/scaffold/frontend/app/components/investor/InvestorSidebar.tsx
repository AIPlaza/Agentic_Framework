'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, ArrowRightLeft } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function InvestorSidebar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const navItems = [
    { name: 'Dashboard', href: `/${lang}/investor/dashboard`, icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Project Roadmap', href: `/${lang}/investor/roadmap`, icon: <Map className="w-5 h-5" /> },
    { name: 'P2P Market', href: `/${lang}/investor/p2p`, icon: <ArrowRightLeft className="w-5 h-5" /> }
  ];

  useGSAP(() => {
    // Staggered entrance animation for links
    gsap.fromTo(
      linksRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, { scope: navRef });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.02, x: 5, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, x: 0, duration: 0.2, ease: 'power2.inOut' });
  };

  return (
    <nav ref={navRef} className="w-64 flex-shrink-0 flex flex-col gap-2 p-6 border-r border-white/5 bg-black/20 backdrop-blur-md">
      <div className="mb-8 px-4">
        <h3 className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">Investor Portal</h3>
      </div>
      
      {navItems.map((item, i) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => { if (el) linksRef.current[i] = el; }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-[#5EC8F2]/20 to-transparent border-l-2 border-[#5EC8F2] text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <div className={`${isActive ? 'text-[#5EC8F2] drop-shadow-[0_0_8px_rgba(94,200,242,0.8)]' : 'text-slate-500'}`}>
              {item.icon}
            </div>
            <span className="font-sans text-sm font-medium tracking-wide">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
