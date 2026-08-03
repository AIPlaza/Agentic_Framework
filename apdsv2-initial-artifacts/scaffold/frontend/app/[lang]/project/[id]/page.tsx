'use client';

import { useEffect, useState, use } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SidebarNav } from '@/app/components/dashboard/SidebarNav';
import { KanbanBoard } from '@/app/components/dashboard/KanbanBoard';
import { RACERTable } from '@/app/components/dashboard/RACERTable';
import { GovernanceKanban } from '@/app/components/dashboard/GovernanceKanban';
import { ChecklistBuilder } from '@/app/components/dashboard/ChecklistBuilder';
import CinematicBackground from '@/app/components/auth/CinematicBackground';
import { useDictionary } from '@/app/components/DictionaryProvider';

export default function ProjectBoard({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const targetId = (resolvedParams as any)?.id || 'demo-project-001';

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'board' | 'list' | 'timeline' | 'audit' | 'marketplace'>('board');
  const [activeTab, setActiveTab] = useState<'logframe' | 'racer' | 'governance' | 'checklists'>('logframe');

  const { dict, lang } = useDictionary();

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
        headers: { ...(token && { Authorization: `Bearer ${token}` }) }
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
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E] relative">
        <CinematicBackground />
        <div className="flex flex-col items-center gap-3 z-20">
          <RefreshCw className="w-6 h-6 text-[#5EC8F2] animate-spin" />
          <span className="font-mono text-[11px] text-[#5EC8F2] uppercase tracking-widest font-medium">
            {dict?.common?.loading || 'Loading...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex relative overflow-hidden font-sans">
      <CinematicBackground />
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />

      {/* Collapsible Left Navigation Sidebar */}
      <SidebarNav
        activeView={activeView}
        onViewChange={setActiveView}
        projectTitle={project?.title}
        totalTasks={126}
        completedTasks={48}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-7xl mx-auto z-20 relative">
        {/* Header Section (Minimalist style) */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-md text-[10px] font-mono uppercase tracking-wider">
                {dict?.project?.stage || 'Stage'} {project?.devLevel || 3} / 5
              </span>
              <span className="px-3 py-1 bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20 rounded-md text-[10px] font-mono uppercase tracking-wider">
                {project?.status === 'ACTIVE' ? (dict?.project?.active || 'ACTIVE') : project?.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              {project?.title}
            </h1>
            <p className="text-slate-300 text-[15px] mt-4 max-w-2xl font-sans leading-relaxed">
              {project?.description}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 pb-1">
            <button
              onClick={fetchProject}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white border border-white/5 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a
              href={`/${lang}/marketplace/${project?.id || 'demo-project-001'}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-mono text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
            >
              {dict?.project?.marketplacePreview || 'Marketplace Preview'} <ExternalLink className="w-4 h-4 text-[#5EC8F2]" />
            </a>
          </div>
        </header>

        {/* VIEW 1: KANBAN BOARD VIEW */}
        {activeView === 'board' && (
          <div className="space-y-8">
            {/* Top Sub-tabs Bar (12px radius, Mono font) */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('logframe')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'logframe'
                    ? 'bg-white/10 text-[#5EC8F2] border border-[#5EC8F2]/20'
                    : 'text-slate-400 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                }`}
              >
                {dict?.project?.stories126 || '126 Kanban Stories'}
              </button>
              <button
                onClick={() => setActiveTab('racer')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'racer'
                    ? 'bg-white/10 text-[#5EC8F2] border border-[#5EC8F2]/20'
                    : 'text-slate-400 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                }`}
              >
                {dict?.project?.performanceMetrics || 'Performance Metrics'}
              </button>
              <button
                onClick={() => setActiveTab('governance')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'governance'
                    ? 'bg-white/10 text-[#5EC8F2] border border-[#5EC8F2]/20'
                    : 'text-slate-400 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                }`}
              >
                {dict?.project?.prince2Tolerances || 'PRINCE2 Tolerances'}
              </button>
              <button
                onClick={() => setActiveTab('checklists')}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'checklists'
                    ? 'bg-white/10 text-[#5EC8F2] border border-[#5EC8F2]/20'
                    : 'text-slate-400 hover:text-white bg-transparent border border-white/5 hover:bg-white/5'
                }`}
              >
                {dict?.project?.qualityLogs || 'Quality Logs'}
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
          <div className="p-10 glass-blue-card space-y-4">
            <h2 className="text-2xl font-syne font-bold text-white">{dict?.project?.taskListView || 'Project Task List View (126 Items)'}</h2>
            <div className="pt-4">
              <KanbanBoard projectTitle={project?.title} />
            </div>
          </div>
        )}

        {/* VIEW 4: AUDITOR QUEUE */}
        {activeView === 'audit' && (
          <div className="p-10 glass-blue-card space-y-6">
            <h2 className="text-2xl font-syne font-bold text-white">{dict?.nav?.auditQueue || 'Auditor Review Queue'}</h2>
            <a href={`/${lang}/evaluator`} className="inline-block px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] uppercase tracking-widest rounded-xl border border-white/10 transition-all">
              {dict?.evaluator?.independentPortal || 'INDEPENDENT QUALITY AUDITOR PORTAL'} →
            </a>
          </div>
        )}

        {/* VIEW 5: MARKETPLACE PREVIEW */}
        {activeView === 'marketplace' && (
          <div className="p-10 glass-blue-card space-y-6">
            <h2 className="text-2xl font-syne font-bold text-white">{dict?.nav?.marketplace || 'Public Marketplace Preview'}</h2>
            <a href={`/${lang}/marketplace/${project?.id}`} className="inline-block px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] uppercase tracking-widest rounded-xl border border-white/10 transition-all">
              {dict?.project?.marketplacePreview || 'Marketplace Preview'} →
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
