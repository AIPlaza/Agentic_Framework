'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CinematicBackground from '@/app/components/auth/CinematicBackground';

export function MarketplaceHero() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#5EC8F2] text-[10px] font-sans tracking-widest uppercase mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5EC8F2] animate-pulse" />
          Active Management Suite
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-syne font-bold text-white tracking-tight leading-tight mb-6">
          Institutional-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EC8F2] to-white">Transparency</span>.
        </h1>
        
        <p className="max-w-2xl mx-auto text-[15px] md:text-[17px] font-sans text-slate-300 leading-relaxed mb-10">
          Move beyond opaque tokenization. ACCET mitigates investor risk through continuous, autonomous auditing. Every asset is backed by up to 126 granular, verified operational stories.
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
