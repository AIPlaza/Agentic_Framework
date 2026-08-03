'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, User } from 'lucide-react';
import { TaskItem, TaskDetailModal } from './TaskDetailModal';
import { useDictionary } from '@/app/components/DictionaryProvider';

function generateInitialStories(projectTitle: string, dict: any): TaskItem[] {
  const categories = [dict?.kanbanData?.catStrategy || 'Strategy & Legal', dict?.kanbanData?.catEngineering || 'Engineering & IoT', dict?.kanbanData?.catQuality || 'Quality & ISO 9001', dict?.kanbanData?.catTokenomics || 'Tokenomics & Tranches', dict?.kanbanData?.catOperations || 'Operations & Field'];
  const priorities: ('CRITICAL' | 'HIGH' | 'NORMAL')[] = ['CRITICAL', 'HIGH', 'NORMAL'];
  const assignees = [dict?.kanbanData?.assigneeLead || 'Lead Architect', dict?.kanbanData?.assigneeField || 'Field Operator #1', dict?.kanbanData?.assigneeAuditor || 'Independent Auditor (TPA)', dict?.kanbanData?.assigneeDev || 'Smart Contract Dev', dict?.kanbanData?.assigneePM || 'Project Manager'];

  const baseTemplates = [
    { title: dict?.kanbanData?.story1 || 'Draft Project Brief & Executive Summary', cat: categories[0], status: 'DONE', p: 'HIGH' },
    { title: dict?.kanbanData?.story2 || 'Incorporate SPV Vehicle & Legal Ownership Structure', cat: categories[0], status: 'DONE', p: 'CRITICAL' },
    { title: dict?.kanbanData?.story3 || 'Map Logical Framework Impact -> Outcome -> Output Tree', cat: categories[0], status: 'DONE', p: 'CRITICAL' },
    { title: dict?.kanbanData?.story4 || 'Define RACER Performance Indicators & Verification Sources', cat: categories[3], status: 'DONE', p: 'HIGH' },
    { title: dict?.kanbanData?.story5 || 'Deploy Smart Contract Escrow Vault for Tranche Disbursement', cat: categories[3], status: 'EXECUTION', p: 'CRITICAL', usd: 45000 },
    { title: dict?.kanbanData?.story6 || 'Configure IoT Telemetry Sensor Gateways (MQTT / TLS)', cat: categories[1], status: 'EXECUTION', p: 'CRITICAL' },
    { title: dict?.kanbanData?.story7 || 'Establish Cold Chain & Storage Temperature Baseline (<4°C)', cat: categories[2], status: 'EXECUTION', p: 'HIGH' },
    { title: dict?.kanbanData?.story8 || 'Set Up PRINCE2 Budget Tolerance Alerting Threshold (+10%)', cat: categories[0], status: 'DESIGN', p: 'NORMAL' },
    { title: dict?.kanbanData?.story9 || 'Set Up PRINCE2 Schedule Deviation Alerting Threshold (+15%)', cat: categories[0], status: 'DESIGN', p: 'NORMAL' },
    { title: dict?.kanbanData?.story10 || 'Implement Daily Operational Quality Log Schema (ISO 9001)', cat: categories[2], status: 'DESIGN', p: 'HIGH' },
    { title: dict?.kanbanData?.story11 || 'Independent Auditor Verification of Milestone #1 Deliverables', cat: categories[2], status: 'AUDIT', p: 'CRITICAL', usd: 25000 },
    { title: dict?.kanbanData?.story12 || 'Publish Glassmorphism Public Marketplace Fiche & Return Simulator', cat: categories[3], status: 'DONE', p: 'HIGH' },
    { title: dict?.kanbanData?.story13 || 'Connect Real-Time Audit Stream to Investor Transparency Portal', cat: categories[1], status: 'EXECUTION', p: 'HIGH' },
    { title: dict?.kanbanData?.story14 || 'Conduct 5-Why Root Cause Analysis for Relay Transfer Variance', cat: categories[2], status: 'AUDIT', p: 'CRITICAL' },
    { title: dict?.kanbanData?.story15 || 'Finalize Tranche #2 Payout Rules with Independent TPA Auditor', cat: categories[3], status: 'BACKLOG', p: 'HIGH', usd: 35000 }
  ];

  const stories: TaskItem[] = [];

  for (let i = 1; i <= 126; i++) {
    const base = baseTemplates[(i - 1) % baseTemplates.length];
    const cat = categories[(i - 1) % categories.length];
    const priority = (base.p || priorities[i % 3]) as 'CRITICAL' | 'HIGH' | 'NORMAL';
    const assignee = assignees[i % assignees.length];

    let status: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE' = 'BACKLOG';
    if (i <= 48) status = 'DONE';
    else if (i <= 78) status = 'EXECUTION';
    else if (i <= 96) status = 'AUDIT';
    else if (i <= 112) status = 'DESIGN';

    stories.push({
      id: `TASK-${String(i).padStart(3, '0')}`,
      title: `${base.title}`,
      category: cat,
      priority,
      status,
      assignee,
      payoutUsd: i % 7 === 0 ? 15000 + i * 250 : undefined,
      description: (dict?.kanbanData?.storyDesc || 'Operational story requirement for {title}. Ensures full ISO 9001 quality standards and milestone disbursement compliance.').replace('{title}', projectTitle),
      racerMetric: i % 7 === 0 ? `Metric #${i} Audit Standard` : undefined,
      whyAnalysis: i % 15 === 0 ? [`Why 1: Variance in telemetry pulse #${i}`, `Why 2: Scheduled sensor recalibration required.`] : undefined
    });
  }

  return stories;
}

export function KanbanBoard({ projectTitle }: { projectTitle?: string }) {
  const { dict } = useDictionary();
  const finalProjectTitle = projectTitle || dict?.mockProject?.title || 'Clean Biogas Facility';
  const [tasks, setTasks] = useState<TaskItem[]>(() => generateInitialStories(finalProjectTitle, dict));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  


  const columns: { id: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE'; label: string; color: string; badgeBg: string }[] = [
    { id: 'BACKLOG', label: dict?.kanban?.col1 || '1. Backlog & Requirements', color: 'border-slate-200', badgeBg: 'bg-slate-50 text-slate-500 border border-slate-100' },
    { id: 'DESIGN', label: dict?.kanban?.col2 || '2. Design & Architecture', color: 'border-[#377D8C]/20', badgeBg: 'bg-[#377D8C]/10 text-[#5ED7F2] border border-[#377D8C]/20' },
    { id: 'EXECUTION', label: dict?.kanban?.col3 || '3. Operational Execution', color: 'border-[#5EC8F2]/20', badgeBg: 'bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20' },
    { id: 'AUDIT', label: dict?.kanban?.col4 || '4. Auditor Review Queue', color: 'border-amber-500/20', badgeBg: 'bg-amber-500/10 text-amber-300 border border-amber-500/20' },
    { id: 'DONE', label: dict?.kanban?.col5 || '5. Milestone Released', color: 'border-[#5EC8F2]/40', badgeBg: 'bg-[#5EC8F2]/20 text-white border border-[#5EC8F2]/30' }
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleUpdateTask = (updated: TaskItem) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTask(null);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Search & Filter Header Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder={dict?.kanban?.search || 'Search 126 stories...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-[13px] font-sans text-white placeholder-slate-500 focus:outline-none focus:border-[#5EC8F2]/50 transition-all shadow-inner"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-[11px] uppercase tracking-wider">
          {['ALL', dict?.kanbanData?.catStrategy || 'Strategy & Legal', dict?.kanbanData?.catEngineering || 'Engineering & IoT', dict?.kanbanData?.catQuality || 'Quality & ISO 9001', dict?.kanbanData?.catTokenomics || 'Tokenomics & Tranches'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-100 text-white border border-slate-200'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? (dict?.kanban?.all || 'ALL') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`pt-1 flex flex-col gap-4 min-h-[640px] border-t ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2">
                <h4 className="text-[12px] font-mono font-medium text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  {col.label.replace(/^[0-9]\.\s/, '')}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${col.badgeBg}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Container */}
              <div className="space-y-3 flex-1">
                {colTasks.slice(0, 15).map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    onClick={() => setSelectedTask(task)}
                    className="glass-blue-card p-4 space-y-3 cursor-pointer group relative"
                  >
                    {/* Top ID & Priority */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-medium text-[#5EC8F2] group-hover:text-slate-900 transition-colors">
                        {task.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md ${
                          task.priority === 'CRITICAL'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : task.priority === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}
                      >
                        {task.priority === 'CRITICAL' 
                          ? (dict?.kanbanData?.priorityCritical || 'CRITICAL') 
                          : task.priority === 'HIGH' 
                          ? (dict?.kanbanData?.priorityHigh || 'HIGH') 
                          : (dict?.kanbanData?.priorityNormal || 'NORMAL')}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-[13px] font-sans font-medium text-slate-700 group-hover:text-slate-900 leading-relaxed">
                      {task.title}
                    </p>

                    {/* Category Tag */}
                    <div className="text-[10px] font-mono text-slate-500">
                      <span>{task.category}</span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#5EC8F2]" /> {task.assignee.split(' ')[0]}
                      </span>

                      {task.payoutUsd && (
                        <span className="text-[#5EC8F2] font-semibold flex items-center">
                          <DollarSign className="w-3 h-3 -mr-0.5" />
                          {task.payoutUsd.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {colTasks.length > 15 && (
                  <div className="text-center py-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    + {colTasks.length - 15} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Slide-over Modal */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
}
