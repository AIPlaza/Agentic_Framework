'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const MOCK_PROJECTS = [
  {
    id: 'demo-project-001',
    title: 'Clean Biogas & Agroindustrial Facility',
    assetType: 'Energy / IoT',
    imageSrc: '/images/accet-arq-main-1.JPG', // Fallback to our existing image
    verifiedStories: 126,
    totalStories: 126,
    value: '$12,500,000',
    apy: '14.5%',
  },
  {
    id: 'madrid-real-estate-002',
    title: 'Tokenized Real Estate - Madrid Prime',
    assetType: 'Real Estate',
    imageSrc: '/images/accet-arq-main-2.JPG', // Assuming these exist, they will break gracefully if missing by showing alt text or fallback if handled
    verifiedStories: 104,
    totalStories: 126,
    value: '$4,200,000',
    apy: '8.2%',
  },
  {
    id: 'agro-supply-chain-003',
    title: 'Agroindustrial Supply Chain Financing',
    assetType: 'Commodities',
    imageSrc: '/images/accet-arq-main-3.JPG',
    verifiedStories: 89,
    totalStories: 126,
    value: '$8,000,000',
    apy: '11.0%',
  },
  {
    id: 'solar-farm-latam-004',
    title: 'Distributed Solar Farm LATAM',
    assetType: 'Clean Energy',
    imageSrc: '/images/accet-arq-main-1.JPG',
    verifiedStories: 126,
    totalStories: 126,
    value: '$21,000,000',
    apy: '12.8%',
  }
];

export function ProjectGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card-wrapper', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 px-6 bg-[#F8FAFC] relative z-10" ref={gridRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-slate-900 mb-4">
              Active Offerings
            </h2>
            <p className="text-[15px] font-sans text-slate-600 max-w-xl">
              Explore our curated selection of high-yield, autonomously managed real-world assets. Every project is continuously audited by AI agents against strict PRINCE2 methodologies.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-sans text-[11px] uppercase tracking-widest font-medium hover:bg-slate-800 transition-colors shadow-sm">
              All Assets
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-500 font-sans text-[11px] uppercase tracking-widest font-medium hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm">
              Energy
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-500 font-sans text-[11px] uppercase tracking-widest font-medium hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm">
              Real Estate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
