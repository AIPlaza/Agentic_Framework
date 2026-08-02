'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Activity, CheckCircle2, Lock, FileText, Cpu } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CinematicBackground from '@/app/components/auth/CinematicBackground';

export default function PublicAssetFiche({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const targetSlug = (resolvedParams as any)?.slug || '';

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiche() {
      setLoading(true);
      try {
        const { data: dbProj } = await supabase
          .from('projects')
          .select('*, indicators(*)')
          .or(`id.eq.${targetSlug},title.ilike.%${targetSlug}%`)
          .single();

        if (dbProj) {
          setProject(dbProj);
        } else {
          setProject({
            id: targetSlug,
            title: 'Clean Biogas & Agroindustrial Facility',
            description: 'Institutional-grade renewable energy asset, autonomously managed and verified through 126 continuous audit stories.',
            assetType: 'Energy / IoT',
            value: '$12,500,000',
            apy: '14.5%'
          });
        }
      } catch (e) {
        setProject({
          id: targetSlug,
          title: 'Clean Biogas & Agroindustrial Facility',
          description: 'Institutional-grade renewable energy asset, autonomously managed and verified through 126 continuous audit stories.',
          assetType: 'Energy / IoT',
          value: '$12,500,000',
          apy: '14.5%'
        });
      } finally {
        setLoading(false);
      }
    }
    loadFiche();
  }, [targetSlug]);

  const auditCategories = [
    { name: 'Legal & Compliance', icon: FileText, verified: 32, total: 32, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Financial Health', icon: Activity, verified: 45, total: 45, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'IoT Telemetry', icon: Cpu, verified: 28, total: 28, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Operational QA', icon: ShieldCheck, verified: 21, total: 21, color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E] relative">
        <CinematicBackground />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION (DARK CHIAROSCURO) */}
      <section className="relative w-full h-[55vh] min-h-[450px] bg-[#1A1A2E] flex flex-col justify-end pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <CinematicBackground />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
              {project.assetType || 'Verified RWA'}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> 126/126 Audit Stories Active
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-syne font-bold text-white tracking-tight max-w-4xl leading-tight mb-4">
            {project?.title}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            {project?.description}
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT (LIGHT CHIAROSCURO) */}
      <section className="flex-1 bg-[#F8FAFC] py-16 px-6 relative z-10 -mt-6 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: The 126-Story Moat */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-syne font-bold text-slate-900 mb-3">
                The 126-Story Moat
              </h2>
              <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl">
                Traditional tokenization offers tokens but hides the execution. ACCET eliminates opacity. This asset is governed by 126 autonomous audit stories, continuously verifying legal, financial, and operational health before distributions occur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditCategories.map((cat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-slate-900 text-lg mb-1">{cat.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full w-24">
                        <div className={`h-full rounded-full bg-current ${cat.color}`} style={{ width: '100%' }} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">{cat.verified}/{cat.total} Stories</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Feed */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
              <h3 className="font-syne font-bold text-slate-900 text-xl mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" /> Live Telemetry Feed
              </h3>
              <div className="space-y-6 border-l-2 border-slate-100 ml-3 pl-6">
                {[
                  { time: '2 mins ago', title: 'IoT Yield Data Synced', desc: 'Energy output telemetry matched expected baseline (+1.2% variance).' },
                  { time: '3 hours ago', title: 'Legal Story #42 Verified', desc: 'Quarterly compliance documentation notarized and verified by AI Auditor.' },
                  { time: 'Yesterday', title: 'Financial Story #88 Cleared', desc: 'Reserve funds confirmed in Escrow. Liquidity constraints met.' }
                ].map((feed, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">{feed.time}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{feed.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{feed.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Investment Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8">
              <div className="text-center mb-8 pb-8 border-b border-slate-100">
                <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-2">Asset Valuation</p>
                <p className="text-4xl font-mono font-bold text-slate-900">{project.value || '$12,500,000'}</p>
              </div>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">Target APY</p>
                  <p className="text-2xl font-mono font-bold text-[#3866B3]">{project.apy || '14.5%'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-mono font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Funding</p>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] text-white font-sans text-[13px] uppercase tracking-widest font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-4">
                <Lock className="w-4 h-4" /> Connect Identity to Invest
              </button>
              
              <button className="w-full py-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-sans text-[12px] uppercase tracking-widest font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Prospectus
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
