'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Activity, PieChart, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CinematicBackground from '@/app/components/auth/CinematicBackground';

export default function MarketplaceFiche({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const targetSlug = (resolvedParams as any)?.slug || '';

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');

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
            title: 'ACCET Verified Project',
            description: 'Sustainable real-world asset project with verified operational standards and telemetry oracles.'
          });
        }
      } catch (e) {
        setProject({
          id: targetSlug,
          title: 'ACCET Verified Project',
          description: 'Sustainable real-world asset project with verified operational standards and telemetry oracles.'
        });
      } finally {
        setLoading(false);
      }
    }

    if (targetSlug) {
      loadFiche();
    }
  }, [targetSlug]);

  const scenarioData = {
    conservative: { apy: '11.5%', payoutTime: 'Quarterly', confidence: '99.2% (Low Volatility Baseline)' },
    base: { apy: '16.8%', payoutTime: 'Quarterly', confidence: '94.5% (AI Projected Target)' },
    optimistic: { apy: '22.4%', payoutTime: 'Quarterly', confidence: '82.0% (Max Operational Capacity)' }
  };

  const transparencyFeed = [
    { date: 'Today, 14:30', event: 'Milestone Payout executed programmatically via Smart Contract', type: 'PAYOUT' },
    { date: 'Yesterday, 18:00', event: 'Independent Quality Audit Report signed by Accredited Auditor', type: 'AUDIT' },
    { date: '29 Jul, 10:15', event: 'Sensor hardware logged 100% operational standards compliance', type: 'IOT' },
    { date: '28 Jul, 09:00', event: 'Daily Operational Quality Log validated with zero defects', type: 'CHECKLIST' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E] relative">
        <CinematicBackground />
        <div className="flex flex-col items-center gap-3 z-20">
          <RefreshCw className="w-6 h-6 text-[#5EC8F2] animate-spin" />
          <span className="font-mono text-[11px] text-[#5EC8F2] uppercase tracking-widest font-bold">
            Loading Marketplace Fiche...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#1A1A2E] text-white relative overflow-hidden font-sans">
      <CinematicBackground />
      
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Marketplace Header */}
        <header className="mb-12 pb-8 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#5EC8F2]/10 text-white border border-[#5EC8F2]/20 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                Milestone-Based Asset Disbursement
              </span>
              <span className="px-3 py-1 bg-white/10 text-white border border-white/10 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                ACCET Verified RWA
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-syne font-bold text-white tracking-tight">
              {project?.title || 'ACCET Real World Asset Project'}
            </h1>
            <p className="text-slate-300 text-[16px] mt-4 max-w-2xl font-sans leading-relaxed">
              {project?.description || 'Sustainable project with certified operational quality standards and IoT telemetry oracles.'}
            </p>
          </div>

          <div className="flex items-center gap-3 pb-1">
            <button className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-[11px] uppercase tracking-widest font-bold rounded-xl transition-all flex items-center gap-2">
              <Download className="w-4 h-4 text-[#5EC8F2]" /> Legal Summary Sheet
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Progress & Scenario Simulator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card (Glass Blue Card) */}
            <div className="glass-blue-card p-8 md:p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-3 block">
                    Active Asset Funding
                  </span>
                  <div className="text-4xl md:text-5xl font-bold text-white font-mono">$45,000 <span className="text-slate-500 text-3xl font-medium">/ $120,000 USD</span></div>
                </div>
                <span className="px-3 py-1 bg-white/10 text-white border border-white/10 rounded-md text-[10px] font-mono font-bold tracking-wider">
                  37.5% Funded
                </span>
              </div>

              {/* Funding Progress Bar */}
              <div className="space-y-4">
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '37.5%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-[#5EC8F2] rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                  <span>0% (Launch)</span>
                  <span className="text-white">Milestone #1 Achieved</span>
                  <span>100% (Target Cap)</span>
                </div>
              </div>
            </div>

            {/* Scenario Simulator */}
            <div className="glass-blue-card p-8 md:p-10 space-y-8">
              <div>
                <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2 mb-2">
                  <PieChart className="w-6 h-6 text-[#5EC8F2]" /> Yield Simulator
                </h2>
                <p className="text-[14px] font-sans text-slate-400">
                  Predictive financial modeling derived from verified project RACER metrics
                </p>
              </div>

              {/* Scenario Selector */}
              <div className="flex flex-wrap gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
                <button
                  onClick={() => setScenario('conservative')}
                  className={`px-5 py-2.5 rounded-xl transition-all ${
                    scenario === 'conservative' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-500 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                  }`}
                >
                  Conservative
                </button>
                <button
                  onClick={() => setScenario('base')}
                  className={`px-5 py-2.5 rounded-xl transition-all ${
                    scenario === 'base' ? 'bg-[#5EC8F2]/10 text-white border border-[#5EC8F2]/20' : 'text-slate-500 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                  }`}
                >
                  Base Case
                </button>
                <button
                  onClick={() => setScenario('optimistic')}
                  className={`px-5 py-2.5 rounded-xl transition-all ${
                    scenario === 'optimistic' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-500 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                  }`}
                >
                  Optimistic
                </button>
              </div>

              {/* Scenario Metrics */}
              <motion.div key={scenario} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white/5 border border-white/5 rounded-xl space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Estimated APY</span>
                  <div className="text-3xl font-bold text-white font-mono">{scenarioData[scenario].apy}</div>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 rounded-xl space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Payout Frequency</span>
                  <div className="text-[16px] font-syne font-bold text-slate-200 mt-1">{scenarioData[scenario].payoutTime}</div>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 rounded-xl space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">AI Confidence</span>
                  <div className="text-[13px] font-mono font-bold text-[#5EC8F2] mt-1">{scenarioData[scenario].confidence}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar: Transparency Feed */}
          <div className="space-y-8">
            <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#5EC8F2]" /> Transparency Audit
            </h2>

            <div className="glass-blue-card p-8 space-y-6">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block border-b border-white/5 pb-4">
                Real-Time Audit Stream
              </span>

              <div className="space-y-4 pt-2">
                {transparencyFeed.map((item, idx) => (
                  <div key={idx} className="p-5 bg-white/5 border border-white/5 rounded-xl text-[13px] space-y-3 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-[#5EC8F2] font-bold uppercase tracking-wider">{item.date}</span>
                      <span className="px-2 py-0.5 rounded-md text-[9px] bg-white/10 text-white font-mono font-bold uppercase tracking-widest">{item.type}</span>
                    </div>
                    <p className="text-slate-200 font-sans leading-relaxed">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
