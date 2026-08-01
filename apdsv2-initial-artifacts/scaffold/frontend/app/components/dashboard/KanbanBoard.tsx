'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, User } from 'lucide-react';
import { TaskItem, TaskDetailModal } from './TaskDetailModal';

function generateInitialStories(projectTitle: string): TaskItem[] {
  const categories = ['Strategy & Legal', 'Engineering & IoT', 'Quality & ISO 9001', 'Tokenomics & Tranches', 'Operations & Field'];
  const priorities: ('CRITICAL' | 'HIGH' | 'NORMAL')[] = ['CRITICAL', 'HIGH', 'NORMAL'];
  const assignees = ['Lead Architect', 'Field Operator #1', 'Independent Auditor (TPA)', 'Smart Contract Dev', 'Project Manager'];

  const baseTemplates = [
    { title: 'Draft Project Brief & Executive Summary', cat: 'Strategy & Legal', status: 'DONE', p: 'HIGH' },
    { title: 'Incorporate SPV Vehicle & Legal Ownership Structure', cat: 'Strategy & Legal', status: 'DONE', p: 'CRITICAL' },
    { title: 'Map Logical Framework Impact -> Outcome -> Output Tree', cat: 'Strategy & Legal', status: 'DONE', p: 'CRITICAL' },
    { title: 'Define RACER Performance Indicators & Verification Sources', cat: 'Tokenomics & Tranches', status: 'DONE', p: 'HIGH' },
    { title: 'Deploy Smart Contract Escrow Vault for Tranche Disbursement', cat: 'Tokenomics & Tranches', status: 'EXECUTION', p: 'CRITICAL', usd: 45000 },
    { title: 'Configure IoT Telemetry Sensor Gateways (MQTT / TLS)', cat: 'Engineering & IoT', status: 'EXECUTION', p: 'CRITICAL' },
    { title: 'Establish Cold Chain & Storage Temperature Baseline (<4°C)', cat: 'Quality & ISO 9001', status: 'EXECUTION', p: 'HIGH' },
    { title: 'Set Up PRINCE2 Budget Tolerance Alerting Threshold (+10%)', cat: 'Strategy & Legal', status: 'DESIGN', p: 'NORMAL' },
    { title: 'Set Up PRINCE2 Schedule Deviation Alerting Threshold (+15%)', cat: 'Strategy & Legal', status: 'DESIGN', p: 'NORMAL' },
    { title: 'Implement Daily Operational Quality Log Schema (ISO 9001)', cat: 'Quality & ISO 9001', status: 'DESIGN', p: 'HIGH' },
    { title: 'Independent Auditor Verification of Milestone #1 Deliverables', cat: 'Quality & ISO 9001', status: 'AUDIT', p: 'CRITICAL', usd: 25000 },
    { title: 'Publish Glassmorphism Public Marketplace Fiche & Return Simulator', cat: 'Tokenomics & Tranches', status: 'DONE', p: 'HIGH' },
    { title: 'Connect Real-Time Audit Stream to Investor Transparency Portal', cat: 'Engineering & IoT', status: 'EXECUTION', p: 'HIGH' },
    { title: 'Conduct 5-Why Root Cause Analysis for Relay Transfer Variance', cat: 'Quality & ISO 9001', status: 'AUDIT', p: 'CRITICAL' },
    { title: 'Finalize Tranche #2 Payout Rules with Independent TPA Auditor', cat: 'Tokenomics & Tranches', status: 'BACKLOG', p: 'HIGH', usd: 35000 }
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
      description: `Operational story requirement for ${projectTitle}. Ensures full ISO 9001 quality standards and milestone disbursement compliance.`,
      racerMetric: i % 7 === 0 ? `Metric #${i} Audit Standard` : undefined,
      whyAnalysis: i % 15 === 0 ? [`Why 1: Variance in telemetry pulse #${i}`, `Why 2: Scheduled sensor recalibration required.`] : undefined
    });
  }

  return stories;
}

export function KanbanBoard({ projectTitle = 'Clean Biogas Facility' }: { projectTitle?: string }) {
  const [tasks, setTasks] = useState<TaskItem[]>(() => generateInitialStories(projectTitle));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const columns: { id: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE'; label: string; color: string; badgeBg: string }[] = [
    { id: 'BACKLOG', label: '1. Backlog & Requirements', color: 'border-white/10', badgeBg: 'bg-white/5 text-slate-400 border border-white/5' },
    { id: 'DESIGN', label: '2. Design & Architecture', color: 'border-[#377D8C]/20', badgeBg: 'bg-[#377D8C]/10 text-[#5ED7F2] border border-[#377D8C]/20' },
    { id: 'EXECUTION', label: '3. Operational Execution', color: 'border-[#5EC8F2]/20', badgeBg: 'bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/20' },
    { id: 'AUDIT', label: '4. Auditor Review Queue', color: 'border-amber-500/20', badgeBg: 'bg-amber-500/10 text-amber-300 border border-amber-500/20' },
    { id: 'DONE', label: '5. Milestone Released', color: 'border-[#5EC8F2]/40', badgeBg: 'bg-[#5EC8F2]/20 text-white border border-[#5EC8F2]/30' } /* Replaced Emerald Green with Sky Blue for strict compliance */
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
            placeholder="Search 126 stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-[13px] font-sans text-white placeholder-slate-500 focus:outline-none focus:border-[#5EC8F2]/50 transition-all shadow-inner"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-[11px] uppercase tracking-wider">
          {['ALL', 'Strategy & Legal', 'Engineering & IoT', 'Quality & ISO 9001', 'Tokenomics & Tranches'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'bg-transparent text-slate-400 hover:text-white border border-white/5 hover:bg-white/5'
              }`}
            >
              {cat}
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
                <h4 className="text-[12px] font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
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
                      <span className="text-[10px] font-mono font-medium text-[#5EC8F2] group-hover:text-white transition-colors">
                        {task.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md ${
                          task.priority === 'CRITICAL'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : task.priority === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-white/5 text-slate-400 border border-white/5'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-[13px] font-sans font-medium text-slate-200 group-hover:text-white leading-relaxed">
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
