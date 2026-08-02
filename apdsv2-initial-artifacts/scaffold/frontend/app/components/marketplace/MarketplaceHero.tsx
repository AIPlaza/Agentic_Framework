'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CinematicBackground from '@/app/components/auth/CinematicBackground';
import { useDictionary } from '@/app/components/DictionaryProvider';
import { ShieldCheck } from 'lucide-react';

export function MarketplaceHero() {
  const { dict } = useDictionary();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from(metricRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)',
        delay: 1.0,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-visible pt-16">
      <div className="absolute inset-0 overflow-hidden z-0">
        <CinematicBackground />
      </div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center" ref={textRef}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" /> {dict?.publicMarketplace?.heroSubtitle || 'Active Management Suite'}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-syne font-bold text-white tracking-tight leading-[1.1] mb-6">
          {dict?.publicMarketplace?.heroTitle || 'Institutional-Grade Transparency'}
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-sans leading-relaxed mb-10">
          {dict?.publicMarketplace?.heroDesc || 'Move beyond opaque tokenization. ACCET mitigates investor risk through continuous, autonomous auditing. Every asset is backed by up to 126 granular, verified operational stories.'}
        </p>
      </div>

      {/* Floating Metric */}
      <div 
        ref={metricRef}
        className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 z-30 glass-blue-card px-8 py-5 rounded-2xl flex items-center gap-6 md:gap-10 whitespace-nowrap shadow-2xl"
      >
        <div className="text-center border-r border-white/10 pr-6 md:pr-10">
          <p className="text-2xl md:text-3xl font-syne font-bold text-white">126</p>
          <p className="text-[9px] md:text-[10px] font-sans text-[#5EC8F2] uppercase tracking-widest mt-1">Audit Stories</p>
        </div>
        <div className="text-center border-r border-white/10 pr-6 md:pr-10">
          <p className="text-2xl md:text-3xl font-syne font-bold text-white">$45M+</p>
          <p className="text-[9px] md:text-[10px] font-sans text-slate-400 uppercase tracking-widest mt-1">Tokenized Value</p>
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-syne font-bold text-white">4</p>
          <p className="text-[9px] md:text-[10px] font-sans text-slate-400 uppercase tracking-widest mt-1">Asset Classes</p>
        </div>
      </div>
    </section>
  );
}
