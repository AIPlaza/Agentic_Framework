'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  ListTodo,
  Calendar,
  ShieldCheck,
  Store,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  PlusCircle,
  BarChart3,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface SidebarNavProps {
  activeView: 'board' | 'list' | 'timeline' | 'audit' | 'marketplace';
  onViewChange: (view: 'board' | 'list' | 'timeline' | 'audit' | 'marketplace') => void;
  projectTitle?: string;
  totalTasks?: number;
  completedTasks?: number;
}

export function SidebarNav({
  activeView,
  onViewChange,
  projectTitle = 'Clean Biogas Facility',
  totalTasks = 126,
  completedTasks = 48
}: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  const viewItems: { id: 'board' | 'list' | 'timeline' | 'audit' | 'marketplace'; label: string; icon: any }[] = [
    { id: 'board', label: 'Kanban Board', icon: LayoutGrid },
    { id: 'list', label: 'Task List View', icon: ListTodo },
    { id: 'timeline', label: 'Timeline & Roadmap', icon: Calendar },
    { id: 'audit', label: 'Auditor Review Queue', icon: ShieldCheck },
    { id: 'marketplace', label: 'Public Marketplace', icon: Store }
  ];

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 z-30 transition-all duration-300 flex flex-col bg-[#020624]/90 backdrop-blur-2xl border-r border-white/10 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Sidebar Header & Workspace Selector */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5EC8F2] to-[#377D8C] flex items-center justify-center text-[#020624] font-bold shadow-md shadow-[#5EC8F2]/20">
              <FolderKanban className="w-4 h-4 text-[#020624]" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-wider block font-bold">
                ACTIVE RWA WORKSPACE
              </span>
              <h3 className="text-sm font-syne font-bold text-white truncate">{projectTitle}</h3>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-black/40 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Project Quick Action */}
      {!collapsed && (
        <div className="p-4 pb-2">
          <Link
            href="/onboarding"
            className="w-full py-2.5 px-3 rounded-xl bg-[#5EC8F2]/10 hover:bg-[#5EC8F2]/20 text-[#5EC8F2] border border-[#5EC8F2]/30 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(94,200,242,0.15)]"
          >
            <PlusCircle className="w-4 h-4" /> New Project Wizard
          </Link>
        </div>
      )}

      {/* View Switcher Menu */}
      <div className="p-3 flex-1 space-y-1 overflow-y-auto">
        {!collapsed && (
          <span className="px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold my-2">
            VIEWS & PANELS
          </span>
        )}

        {viewItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#5EC8F2]/20 to-[#377D8C]/20 text-[#5EC8F2] border border-[#5EC8F2]/40 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#5EC8F2]' : 'text-slate-400'}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Bottom Progress Widget */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#5EC8F2]" /> Completion Status
            </span>
            <span className="text-[#5EC8F2] font-bold">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>{completedTasks} Done</span>
            <span>{totalTasks} Total Tasks</span>
          </div>
        </div>
      )}
    </aside>
  );
}
