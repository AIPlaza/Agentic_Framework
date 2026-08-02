'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useDictionary } from '@/app/components/DictionaryProvider';

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
  const { dict } = useDictionary();
  const progressPercent = Math.round((verifiedStories / totalStories) * 100);

  return (
    <Link href={`/en/marketplace/${id}`} className="block group h-full">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] group-hover:border-slate-300">
        
        {/* Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-[#1A1A2E]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-100"
          />
          <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EC8F2] animate-pulse" />
            <span className="text-[9px] font-sans text-white uppercase tracking-wider font-bold">Active</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <span className="px-2 py-1 rounded text-[9px] font-sans bg-[#5EC8F2]/10 text-[#3866B3] border border-[#5EC8F2]/20 uppercase tracking-widest font-medium mb-3 inline-block">
              {assetType}
            </span>
            <h3 className="text-lg font-syne font-bold text-slate-900 leading-tight group-hover:text-[#3866B3] transition-colors line-clamp-2">
              {title}
            </h3>
          </div>

          {/* 126 Story Moat Metric */}
          <div className="mt-auto pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="flex items-center gap-1.5 text-[10px] font-sans text-slate-500 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5EC8F2]" />
                {dict?.publicMarketplace?.auditStatus || 'Audited Stories'}
              </span>
              <span className="text-[12px] font-mono text-slate-900 font-bold">{verifiedStories}/{totalStories}</span>
            </div>
            
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-5">
              <div 
                className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#3866B3] rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">{dict?.publicMarketplace?.totalValue || 'Valuation'}</p>
                <p className="text-[13px] font-mono text-slate-800 font-medium">{value}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">{dict?.publicMarketplace?.targetYield || 'Target APY'}</p>
                <p className="text-[13px] font-mono text-[#3866B3] font-bold">{apy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Footer Reveal */}
        <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-300 bg-slate-50 flex items-center justify-center border-t border-transparent group-hover:border-slate-100">
          <span className="text-[11px] font-sans font-bold text-[#3866B3] uppercase tracking-widest flex items-center gap-2">
            {dict?.publicMarketplace?.viewAsset || 'View Audit Trail'} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
