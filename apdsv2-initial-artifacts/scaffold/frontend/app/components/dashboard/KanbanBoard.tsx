'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, User } from 'lucide-react';
import { TaskItem, TaskDetailModal } from './TaskDetailModal';
import { useDictionary } from '@/app/components/DictionaryProvider';

function generateInitialStories(projectTitle: string): TaskItem[] {
  const categories = ['Grid & Structure', 'Typography', 'Chiaroscuro & Contrast', 'Visual Experience'];
  const priorities: ('CRITICAL' | 'HIGH' | 'NORMAL')[] = ['CRITICAL', 'HIGH', 'NORMAL'];
  const assignees = ['Lead Designer', 'UI Architect', 'UX Engineer', 'Motion Specialist'];

  const vignelliStories = [
    { title: "Define the 12-Column Modular Swiss Grid Layout System", cat: "Grid & Structure" },
    { title: "Establish Baseline Grid for Vertical Rhythm & Harmony", cat: "Grid & Structure" },
    { title: "Configure Primary Typography Scales (Modular Scale Ratio 1.250)", cat: "Typography" },
    { title: "Select 'Syne' as Display Font for Bold Hero Statements", cat: "Typography" },
    { title: "Implement 'JetBrains Mono' for Data Tables and Code Snippets", cat: "Typography" },
    { title: "Design the 'Chiaroscuro Sandwich' Layout Architecture", cat: "Chiaroscuro & Contrast" },
    { title: "Create Pure White (#FFFFFF) Diffuminated Workspace Gradient", cat: "Chiaroscuro & Contrast" },
    { title: "Build Deep Blue Cinematic Background Overlay (#0a1128)", cat: "Chiaroscuro & Contrast" },
    { title: "Add Subtle Grain Overlay for Cinematic Texture Depth", cat: "Visual Experience" },
    { title: "Implement 3D Drop Shadows on Hover States (0_20px_50px)", cat: "Visual Experience" },
    { title: "Design Glassmorphic Transparent Cards for Dark Modes", cat: "Chiaroscuro & Contrast" },
    { title: "Configure CSS Container Queries for Fluid Grid Adaptation", cat: "Grid & Structure" },
    { title: "Apply Vignelli's Principle of Semantic Structural Alignment", cat: "Grid & Structure" },
    { title: "Set Optimal Line-Height (1.5 - 1.7) for Reading Ergonomics", cat: "Typography" },
    { title: "Ensure WCAG AAA Contrast Ratio for All Text on Light Cards", cat: "Typography" },
    { title: "Develop Horizontal Gradient Fade on the Left Navigation Bar", cat: "Chiaroscuro & Contrast" },
    { title: "Design Micro-Interactions for Button Hover States", cat: "Visual Experience" },
    { title: "Implement Scroll-Driven Parallax Animations on Hero Section", cat: "Visual Experience" },
    { title: "Create the 'Archetype Silhouette' Grayscale Watermark", cat: "Visual Experience" },
    { title: "Anchor Typography to the Baseline Grid Structurally", cat: "Grid & Structure" },
    { title: "Remove Extraneous Borders to Embrace White Space", cat: "Grid & Structure" },
    { title: "Design Minimalist Pill-Shaped Navigation Menus", cat: "Grid & Structure" },
    { title: "Configure Dynamic Color Tokens in globals.css", cat: "Chiaroscuro & Contrast" },
    { title: "Implement Backdrop-Filter Blurs (20px) on Dark Overlays", cat: "Chiaroscuro & Contrast" },
    { title: "Optimize Web Fonts Loading with Preload and Display Swap", cat: "Typography" },
    { title: "Adjust Tracking (Letter-Spacing) for Uppercase Headers", cat: "Typography" },
    { title: "Establish Visual Hierarchy using Size and Weight", cat: "Typography" },
    { title: "Refine Transition Timings (duration-300, ease-out)", cat: "Visual Experience" },
    { title: "Design Skeleton Loading States for Data Fetching", cat: "Visual Experience" },
    { title: "Ensure Responsive Typography (Clamp functions)", cat: "Typography" },
    { title: "Structure the 'Z-Pattern' Reading Flow on Dashboards", cat: "Grid & Structure" },
    { title: "Implement 'F-Pattern' Scanning for Data Tables", cat: "Grid & Structure" },
    { title: "Balance Positive and Negative Space (Vignelli Canon)", cat: "Grid & Structure" },
    { title: "Define the Corporate Ink Color Palette (Teal, Amber, Slate)", cat: "Chiaroscuro & Contrast" },
    { title: "Create High-Contrast Focus Rings for Accessibility", cat: "Chiaroscuro & Contrast" },
    { title: "Develop View Transitions API for Seamless Page Loads", cat: "Visual Experience" },
    { title: "Design Contextual Tooltips with Micro-Delays", cat: "Visual Experience" },
    { title: "Implement Sticky Headers with Blur Backgrounds", cat: "Visual Experience" },
    { title: "Define Max-Width Constraints for Optimal Line Length (65 chars)", cat: "Typography" },
    { title: "Align all Elements to the Left (No Centered Body Text)", cat: "Grid & Structure" },
    { title: "Implement Alternating Odd/Even Card Aesthethics", cat: "Chiaroscuro & Contrast" },
    { title: "Finalize Polish of the '42 Visual Stories' Implementation", cat: "Visual Experience" }
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
            className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-[13px] font-sans text-white placeholder-slate-500 focus:outline-none focus:border-[#5EC8F2]/50 transition-all shadow-inner"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-[11px] uppercase tracking-wider">
          {['ALL', 'Grid & Structure', 'Typography', 'Chiaroscuro & Contrast', 'Visual Experience'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'bg-transparent text-slate-400 hover:text-white border border-white/5 hover:bg-white/5'
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
                    className="glass-blue-gradient-card p-5 space-y-4 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Top ID & Priority */}
                    <div className="flex justify-between items-center relative z-10">
                      <span className="text-[11px] font-mono font-semibold text-[#5EC8F2] group-hover:text-white transition-colors tracking-wide">
                        {task.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2.5 py-1 rounded-md tracking-wider font-semibold ${
                          task.priority === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : task.priority === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-white/10 text-slate-300 border border-white/10'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-[14px] font-sans font-medium text-white group-hover:text-[#5ED7F2] leading-relaxed relative z-10 transition-colors">
                      {task.title}
                    </p>

                    {/* Category Tag */}
                    <div className="text-[10px] font-mono text-slate-400 relative z-10 uppercase tracking-widest">
                      <span>{task.category}</span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-slate-300 relative z-10 border-t border-white/10">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-[#5EC8F2]" /> {task.assignee.split(' ')[0]}
                      </span>

                      {task.payoutUsd && (
                        <span className="text-[#5EC8F2] font-bold flex items-center bg-[#5EC8F2]/10 px-2 py-0.5 rounded">
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
