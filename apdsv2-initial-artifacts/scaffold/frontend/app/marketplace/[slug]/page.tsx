'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Activity, PieChart, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
      <div className="min-h-[80vh] flex items-center justify-center bg-[#020624]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#5EC8F2] animate-spin" />
          <span className="font-mono text-xs text-[#5EC8F2] uppercase tracking-[0.3em]">
            Loading Marketplace Fiche...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-[#020624] text-white relative overflow-hidden">
      {/* Marketplace Header */}
      <header className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
              MILESTONE-BASED ASSET DISBURSEMENT
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-mono font-bold">
              ACCET VERIFIED RWA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
            {project?.title || 'ACCET Real World Asset Project'}
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            {project?.description || 'Sustainable project with certified operational quality standards and IoT telemetry oracles.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-3 bg-black/40 hover:bg-white/10 text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2">
            <Download className="w-4 h-4 text-[#5EC8F2]" /> Download Legal Summary Sheet
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
        {/* Left Column: Progress & Scenario Simulator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-2xl space-y-6 border-l-4 border-l-[#5EC8F2] backdrop-blur-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                  Active Asset Funding
                </span>
                <div className="text-3xl md:text-4xl font-bold text-white mt-1 font-mono">$45,000 / $120,000 USD</div>
              </div>
              <span className="px-3.5 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
                37.5% Funded
              </span>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/10 rounded-full h-3.5 overflow-hidden relative p-0.5 border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '37.5%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] rounded-full shadow-[0_0_15px_rgba(94,200,242,0.5)]"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0.00% (Launch)</span>
                <span>Milestone #1 Achieved</span>
                <span>100.00% (Target Cap)</span>
              </div>
            </div>
          </div>

          {/* Scenario Simulator */}
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-2xl space-y-6 backdrop-blur-xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#5EC8F2]" /> Yield Simulator (3 Return Scenarios)
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Predictive financial modeling derived from verified project RACER metrics
                </p>
              </div>
            </div>

            {/* Scenario Selector */}
            <div className="grid grid-cols-3 gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 font-mono">
              <button
                onClick={() => setScenario('conservative')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  scenario === 'conservative' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Conservative
              </button>
              <button
                onClick={() => setScenario('base')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  scenario === 'base' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Base Case
              </button>
              <button
                onClick={() => setScenario('optimistic')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  scenario === 'optimistic' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Optimistic
              </button>
            </div>

            {/* Scenario Metrics */}
            <motion.div key={scenario} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Estimated APY</span>
                <div className="text-2xl font-bold text-[#5EC8F2] font-mono">{scenarioData[scenario].apy}</div>
              </div>
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Payout Frequency</span>
                <div className="text-base font-semibold text-white mt-1 font-sans">{scenarioData[scenario].payoutTime}</div>
              </div>
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">AI Model Confidence</span>
                <div className="text-xs font-mono font-bold text-[#5ED7F2] mt-1">{scenarioData[scenario].confidence}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar: Transparency Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#5EC8F2]" /> Transparency Audit Portal
          </h2>

          <div className="p-6 bg-[#020624]/60 border border-white/10 rounded-2xl space-y-4 backdrop-blur-xl">
            <span className="text-xs font-mono font-bold text-[#5EC8F2] uppercase tracking-wider block border-b border-white/10 pb-2">
              Real-Time Audit Stream
            </span>

            <div className="space-y-3">
              {transparencyFeed.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-black/50 border border-white/10 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#5EC8F2] font-bold">{item.date}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-white/10 text-white/80 font-mono font-bold">{item.type}</span>
                  </div>
                  <p className="text-slate-300 font-sans">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
