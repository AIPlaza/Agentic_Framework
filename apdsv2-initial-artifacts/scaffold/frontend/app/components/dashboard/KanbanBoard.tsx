'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, User } from 'lucide-react';
import { TaskItem, TaskDetailModal } from './TaskDetailModal';
import { useDictionary } from '@/app/components/DictionaryProvider';

function generateInitialStories(projectTitle: string): TaskItem[] {
  const categories = ['White Space Distribution', 'Typography', 'Desaturation & Clarity', 'Visual Hierarchy'];
  const priorities: ('CRITICAL' | 'HIGH' | 'NORMAL')[] = ['CRITICAL', 'HIGH', 'NORMAL'];
  const assignees = ['Lead Designer', 'UI Architect', 'UX Engineer', 'Motion Specialist'];

  const vignelliStories = [
    { title: "Replace heavy gradient cards with crisp white #FFFFFF surfaces", cat: "Desaturation & Clarity" },
    { title: "Implement subtle 1px slate borders for structural definition", cat: "Visual Hierarchy" },
    { title: "Increase padding to 24px in cards for better cognitive distribution", cat: "White Space Distribution" },
    { title: "Remove muddy transparency overlays from primary content areas", cat: "Desaturation & Clarity" },
    { title: "Transition typography to dark slate for high legibility", cat: "Typography" },
    { title: "Apply soft Apple-style drop shadows (0 4px 20px) to cards", cat: "Visual Hierarchy" },
    { title: "Use solid sky blue (#5EC8F2) for primary accents instead of gradients", cat: "Desaturation & Clarity" },
    { title: "Standardize corner radius to 12px for consistent pill shapes", cat: "Visual Hierarchy" },
    { title: "Ensure WCAG AAA contrast ratio on all gray text elements", cat: "Typography" },
    { title: "Introduce generous margins between dashboard sections", cat: "White Space Distribution" },
    { title: "Convert saturated priority badges to light pastel tints", cat: "Desaturation & Clarity" },
    { title: "Enhance column headers with bolder, darker slate colors", cat: "Typography" },
    { title: "Implement the Vignelli baseline grid for vertical rhythm", cat: "White Space Distribution" },
    { title: "Reduce UI noise by eliminating unnecessary borders", cat: "White Space Distribution" },
    { title: "Simplify hover states to gentle Y-axis translations", cat: "Visual Hierarchy" },
    { title: "Establish 'Syne' font weights for clear header hierarchy", cat: "Typography" },
    { title: "Align all text strictly left to create a clean ragged edge", cat: "White Space Distribution" },
    { title: "Remove background blurs that conflict with solid layouts", cat: "Desaturation & Clarity" },
    { title: "Use JetBrains Mono exclusively for data and IDs", cat: "Typography" },
    { title: "Increase line-height to 1.6 for improved reading stamina", cat: "Typography" },
    { title: "Desaturate secondary icons to slate-400 for balance", cat: "Desaturation & Clarity" },
    { title: "Group related information visually using Gestalt proximity", cat: "White Space Distribution" },
    { title: "Design minimalist button states without heavy borders", cat: "Visual Hierarchy" },
    { title: "Ensure white space represents 40% of the active canvas", cat: "White Space Distribution" },
    { title: "Audit the Auditor Review Queue for clean aesthetics", cat: "Desaturation & Clarity" },
    { title: "Refactor the Marketplace Preview container backgrounds", cat: "Desaturation & Clarity" },
    { title: "Establish a clear Z-index architecture for modals and overlays", cat: "Visual Hierarchy" },
    { title: "Harmonize the 'Chiaroscuro' transition to favor light modes", cat: "Desaturation & Clarity" },
    { title: "Optimize font loading to prevent layout shifts (FOUT)", cat: "Typography" },
    { title: "Implement semantic HTML5 tags for accessibility structure", cat: "Visual Hierarchy" },
    { title: "Refine form inputs to use clean lines and light backgrounds", cat: "Desaturation & Clarity" },
    { title: "Balance the visual weight of the sidebar navigation", cat: "Visual Hierarchy" },
    { title: "Use negative space to draw attention to primary CTAs", cat: "White Space Distribution" },
    { title: "Standardize letter-spacing for uppercase metadata tags", cat: "Typography" },
    { title: "Eliminate color-banding in background transitions", cat: "Desaturation & Clarity" },
    { title: "Create focus states that are visible but not overwhelming", cat: "Visual Hierarchy" },
    { title: "Apply Vignelli's minimalist philosophy to dashboard metrics", cat: "White Space Distribution" },
    { title: "Ensure text color contrast passes accessibility on white cards", cat: "Typography" },
    { title: "Design empty states that feel intentional and spacious", cat: "White Space Distribution" },
    { title: "Reduce the number of brand colors used simultaneously to 2", cat: "Desaturation & Clarity" },
    { title: "Streamline the visual experience for first-time users", cat: "Visual Hierarchy" },
    { title: "Conduct a final visual QA on the 42-story implementation", cat: "White Space Distribution" }
  ];

  const stories: TaskItem[] = [];

  for (let i = 0; i < 42; i++) {
    const base = vignelliStories[i];
    const priority = priorities[i % 3];
    const assignee = assignees[i % assignees.length];

    let status: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE' = 'BACKLOG';
    if (i < 12) status = 'DONE';
    else if (i < 24) status = 'EXECUTION';
    else if (i < 34) status = 'AUDIT';
    else if (i < 38) status = 'DESIGN';

    stories.push({
      id: `DESIGN-${String(i + 1).padStart(3, '0')}`,
      title: base.title,
      category: base.cat,
      priority,
      status,
      assignee,
      payoutUsd: i % 5 === 0 ? 1200 + i * 50 : undefined,
      description: `Implementation of the Vignelli Canon design principle: ${base.title}.`,
      racerMetric: i % 4 === 0 ? `Visual Standard #${i + 1}` : undefined
    });
  }

  return stories;
}

export function KanbanBoard({ projectTitle = 'Clean Biogas Facility' }: { projectTitle?: string }) {
  const [tasks, setTasks] = useState<TaskItem[]>(() => generateInitialStories(projectTitle));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  
  const { dict } = useDictionary();

  const columns: { id: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE'; label: string; color: string; badgeBg: string }[] = [
    { id: 'BACKLOG', label: dict?.kanban?.col1 || '1. Backlog & Requirements', color: 'border-white/10', badgeBg: 'bg-white/5 text-slate-400 border border-white/5' },
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
            placeholder={dict?.kanban?.search || 'Search 42 stories...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A2E]/20 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-[13px] font-sans text-white placeholder-slate-500 focus:outline-none focus:border-[#5EC8F2]/50 transition-all shadow-inner"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-[11px] uppercase tracking-wider">
          {['ALL', 'White Space Distribution', 'Typography', 'Desaturation & Clarity', 'Visual Hierarchy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
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
                <h4 className="text-[12px] font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
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
                    className="vignelli-clean-card p-5 space-y-4 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Top ID & Priority */}
                    <div className="flex justify-between items-center relative z-10">
                      <span className="text-[11px] font-mono font-semibold text-[#5EC8F2] group-hover:text-[#377D8C] transition-colors tracking-wide">
                        {task.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2.5 py-1 rounded-full tracking-wider font-semibold ${
                          task.priority === 'CRITICAL'
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : task.priority === 'HIGH'
                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-[14px] font-sans font-medium text-slate-800 group-hover:text-black leading-relaxed relative z-10 transition-colors">
                      {task.title}
                    </p>

                    {/* Category Tag */}
                    <div className="text-[10px] font-mono text-slate-500 relative z-10 uppercase tracking-widest font-medium">
                      <span>{task.category}</span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 relative z-10 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {task.assignee.split(' ')[0]}
                      </span>

                      {task.payoutUsd && (
                        <span className="text-[#5EC8F2] font-bold flex items-center bg-[#5EC8F2]/10 px-2 py-0.5 rounded-md">
                          <DollarSign className="w-3.5 h-3.5 -mr-0.5" />
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
