'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, AlertCircle, RefreshCw, Shield, FileCheck, DollarSign, ArrowLeft, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SidebarNav } from '@/app/components/dashboard/SidebarNav';
import { KanbanBoard } from '@/app/components/dashboard/KanbanBoard';
import { RACERTable } from '@/app/components/dashboard/RACERTable';
import { GovernanceKanban } from '@/app/components/dashboard/GovernanceKanban';
import { ChecklistBuilder } from '@/app/components/dashboard/ChecklistBuilder';

export default function ProjectBoard({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const targetId = (resolvedParams as any)?.id || 'demo-project-001';

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'board' | 'list' | 'timeline' | 'audit' | 'marketplace'>('board');
  const [activeTab, setActiveTab] = useState<'logframe' | 'racer' | 'governance' | 'checklists'>('logframe');

  async function fetchProject() {
    setLoading(true);
    setError(null);

    let localData: any = null;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`accet_project_${targetId}`);
      if (stored) {
        try {
          localData = JSON.parse(stored);
        } catch (e) {}
      }
    }

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`http://localhost:4001/api/projects/${targetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProject(data);
      } else {
        const { data: dbProj } = await supabase
          .from('projects')
          .select('*, logical_frameworks(*), indicators(*)')
          .eq('id', targetId)
          .single();

        if (dbProj) {
          setProject({
            id: dbProj.id,
            title: dbProj.title,
            description: dbProj.description,
            status: dbProj.status || 'ACTIVE',
            devLevel: dbProj.dev_level || 3,
            logicalFramework: dbProj.logical_frameworks?.[0] || null,
            indicators: dbProj.indicators || []
          });
        } else if (localData) {
          setProject(localData);
        } else {
          setProject({
            id: targetId,
            title: localData?.title || (targetId.startsWith('proj-') ? 'New Custom RWA Project' : 'Clean Biogas & Agroindustrial Facility'),
            description: localData?.description || 'Sustainable RWA tokenization project with certified operational quality standards and IoT telemetry oracles.',
            status: 'ACTIVE',
            devLevel: 3,
            logicalFramework: {
              impact: 'Clean energy conversion & operational zero-defect targets.',
              outcomes: ['Continuous energy output', 'Certified food safety compliance'],
              outputs: ['Sensor oracle deployment', 'Audit milestone tranche release']
            },
            indicators: []
          });
        }
      }
    } catch (e: any) {
      if (localData) {
        setProject(localData);
      } else {
        setProject({
          id: targetId,
          title: targetId.startsWith('proj-') ? 'New Custom RWA Project' : 'Clean Biogas & Agroindustrial Facility',
          description: 'Sustainable RWA tokenization project with certified operational quality standards and IoT telemetry oracles.',
          status: 'ACTIVE',
          devLevel: 3,
          indicators: []
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (targetId) {
      fetchProject();
    }
  }, [targetId]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#020624]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#5EC8F2] animate-spin" />
          <span className="font-mono text-xs text-[#5EC8F2] uppercase tracking-[0.3em]">
            Loading Project Studio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020624] text-white flex">
      {/* Collapsible Left Navigation Sidebar */}
      <SidebarNav
        activeView={activeView}
        onViewChange={setActiveView}
        projectTitle={project?.title}
        totalTasks={126}
        completedTasks={48}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl">
        {/* Header Card in Onboarding Aesthetic */}
        <header className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-3xl backdrop-blur-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
                READINESS STAGE {project?.devLevel || 3} / 5
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-mono font-bold uppercase">
                {project?.status || 'ACTIVE'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-syne font-bold text-white tracking-tight">
              {project?.title}
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans leading-relaxed">{project?.description}</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={fetchProject}
              className="p-3 bg-white/[0.03] hover:bg-white/10 rounded-xl text-slate-300 hover:text-white border border-white/15 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a
              href={`/marketplace/${project?.id || 'demo-project-001'}`}
              className="px-5 py-3 bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(94,200,242,0.3)] hover:shadow-[0_0_30px_rgba(94,200,242,0.5)] transition-all flex items-center gap-2 font-bold"
            >
              Marketplace Preview <ExternalLink className="w-4 h-4 text-[#020624]" />
            </a>
          </div>
        </header>

        {/* VIEW 1: KANBAN BOARD VIEW */}
        {activeView === 'board' && (
          <div className="space-y-6">
            {/* Top Sub-tabs Bar in Minimalist Pill Container */}
            <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl max-w-fit font-mono text-xs">
              <button
                onClick={() => setActiveTab('logframe')}
                className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'logframe'
                    ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] shadow-[0_0_20px_rgba(94,200,242,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                126 Interactive Kanban Stories
              </button>
              <button
                onClick={() => setActiveTab('racer')}
                className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'racer'
                    ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] shadow-[0_0_20px_rgba(94,200,242,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Performance Metrics & Milestones
              </button>
              <button
                onClick={() => setActiveTab('governance')}
                className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'governance'
                    ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] shadow-[0_0_20px_rgba(94,200,242,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PRINCE2 Tolerances & 5-Whys
              </button>
              <button
                onClick={() => setActiveTab('checklists')}
                className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'checklists'
                    ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] shadow-[0_0_20px_rgba(94,200,242,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Quality & Telemetry Logs
              </button>
            </div>

            {activeTab === 'logframe' && <KanbanBoard projectTitle={project?.title} />}
            {activeTab === 'racer' && <RACERTable indicators={project?.indicators || []} projectId={project?.id} />}
            {activeTab === 'governance' && <GovernanceKanban projectId={project?.id} />}
            {activeTab === 'checklists' && <ChecklistBuilder projectId={project?.id} />}
          </div>
        )}

        {/* VIEW 2: TASK LIST VIEW */}
        {activeView === 'list' && (
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-3xl backdrop-blur-2xl space-y-4">
            <h2 className="text-xl font-syne font-bold text-white">Project Task List View (126 Items)</h2>
            <p className="text-xs font-mono text-slate-400">Structured tabular list of project deliverables and milestone checks.</p>
            <KanbanBoard projectTitle={project?.title} />
          </div>
        )}

        {/* VIEW 3: TIMELINE & ROADMAP */}
        {activeView === 'timeline' && (
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-3xl backdrop-blur-2xl space-y-6">
            <h2 className="text-xl font-syne font-bold text-white">Maturity Roadmap & Timeline (DEv-matrix 5x4)</h2>
            <div className="space-y-4">
              {['Stage 1: Concept & Identity', 'Stage 2: Results & Quality Layout', 'Stage 3: Telemetry & RACER Metrics', 'Stage 4: Auditor Verification & Escrow', 'Stage 5: Marketplace & Yield Release'].map((stg, i) => (
                <div key={i} className="p-4 bg-black/40 border border-white/10 rounded-2xl flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">{stg}</span>
                  <span className={i < 2 ? 'text-[#5EC8F2] font-bold' : i === 2 ? 'text-[#5ED7F2] font-bold' : 'text-slate-500'}>
                    {i < 2 ? '✓ Completed' : i === 2 ? '⚡ Active Sprint' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: AUDITOR QUEUE */}
        {activeView === 'audit' && (
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-3xl backdrop-blur-2xl space-y-4">
            <h2 className="text-xl font-syne font-bold text-white">Auditor Verification Queue</h2>
            <p className="text-xs font-mono text-slate-400">Auditor review queue for programmatic smart contract milestone releases.</p>
            <a href="/evaluator" className="inline-block px-5 py-2.5 bg-[#5EC8F2] text-[#020624] font-mono text-xs font-bold rounded-xl uppercase">
              Open Independent Auditor Portal →
            </a>
          </div>
        )}

        {/* VIEW 5: MARKETPLACE PREVIEW */}
        {activeView === 'marketplace' && (
          <div className="p-6 md:p-8 bg-[#020624]/60 border border-white/10 rounded-3xl backdrop-blur-2xl space-y-4">
            <h2 className="text-xl font-syne font-bold text-white">Public Marketplace Preview</h2>
            <p className="text-xs font-mono text-slate-400">Investor-facing summary fiche and 3-scenario yield simulator.</p>
            <a href={`/marketplace/${project?.id}`} className="inline-block px-5 py-2.5 bg-[#5EC8F2] text-[#020624] font-mono text-xs font-bold rounded-xl uppercase">
              View Public Marketplace Fiche →
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
