'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  assetType: string;
  imageSrc: string;
  verifiedStories: number;
  totalStories: number;
  value: string;
  apy: string;
}

export function ProjectCard({
  id,
  title,
  assetType,
  imageSrc,
  verifiedStories = 126,
  totalStories = 126,
  value,
  apy
}: ProjectCardProps) {
  const progressPercent = Math.round((verifiedStories / totalStories) * 100);

  return (
    <Link href={`/en/marketplace/${id}`} className="block group h-full">
      <div className="glass-blue-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(94,200,242,0.05)] group-hover:border-[#5EC8F2]/30">
        
        {/* Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-[#1A1A2E]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/20 to-transparent z-10" />
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-50 group-hover:saturate-100"
          />
          <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EC8F2] animate-pulse" />
            <span className="text-[9px] font-sans text-white uppercase tracking-wider font-bold">Active</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <span className="px-2 py-1 rounded text-[9px] font-sans bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20 uppercase tracking-widest font-medium mb-3 inline-block">
              {assetType}
            </span>
            <h3 className="text-lg font-syne font-bold text-white leading-tight group-hover:text-[#5EC8F2] transition-colors line-clamp-2">
              {title}
            </h3>
          </div>

          {/* 126 Story Moat Metric */}
          <div className="mt-auto pt-5 border-t border-white/5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="flex items-center gap-1.5 text-[10px] font-sans text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5EC8F2]" />
                Audited Stories
              </span>
              <span className="text-[12px] font-mono text-white font-medium">{verifiedStories}/{totalStories}</span>
            </div>
            
            <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mb-5">
              <div 
                className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">Valuation</p>
                <p className="text-[13px] font-mono text-slate-200">{value}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">Target APY</p>
                <p className="text-[13px] font-mono text-[#5EC8F2] font-bold">{apy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Footer Reveal */}
        <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-300 bg-[#5EC8F2]/5 flex items-center justify-center border-t border-transparent group-hover:border-[#5EC8F2]/20">
          <span className="text-[11px] font-sans font-bold text-[#5EC8F2] uppercase tracking-widest flex items-center gap-2">
            View Audit Trail <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
