'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutGrid,
  ListTodo,
  Calendar,
  ShieldCheck,
  Store,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { useDictionary } from '@/app/components/DictionaryProvider';

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
  const { dict, lang } = useDictionary();

  const viewItems: { id: 'board' | 'list' | 'timeline' | 'audit' | 'marketplace'; label: string; icon: any }[] = [
    { id: 'board', label: dict?.nav?.kanbanBoard || 'Kanban Board', icon: LayoutGrid },
    { id: 'list', label: dict?.nav?.taskList || 'Task List View', icon: ListTodo },
    { id: 'timeline', label: dict?.nav?.timeline || 'Timeline & Roadmap', icon: Calendar },
    { id: 'audit', label: dict?.nav?.auditQueue || 'Auditor Review Queue', icon: ShieldCheck },
    { id: 'marketplace', label: dict?.nav?.marketplace || 'Public Marketplace', icon: Store }
  ];

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 z-30 transition-all duration-300 flex flex-col bg-gradient-to-r from-[#0a1128] via-[#0a1128]/60 to-transparent border-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      style={{ borderRadius: '0' }}
    >
      {/* Sidebar Header & Workspace Selector */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Image src="/logo.png" alt="ACCET Logo" width={28} height={28} className="object-contain opacity-90" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono text-slate-500 font-medium">
                {dict?.sidebar?.activeWorkspace || 'ACTIVE WORKSPACE'}
              </span>
              <h3 className="text-[14px] font-syne font-bold text-white truncate mt-0.5">{projectTitle}</h3>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Project Quick Action */}
      {!collapsed && (
        <div className="p-4 pb-2">
          <Link
            href={`/${lang}/onboarding`}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/5 font-mono text-[11px] font-medium transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4 text-[#5EC8F2]" /> {dict?.nav?.newProject || 'New Project'}
          </Link>
        </div>
      )}

      {/* View Switcher Menu */}
      <div className="p-3 flex-1 space-y-1 overflow-y-auto">
        {!collapsed && (
          <span className="px-3 text-[10px] font-mono text-slate-500 font-medium my-3 block">
            {dict?.nav?.viewsAndPanels || 'VIEWS & PANELS'}
          </span>
        )}

        {viewItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium transition-all ${
                isActive
                  ? 'bg-white/10 text-[#5EC8F2] border border-[#5EC8F2]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#5EC8F2]' : 'text-slate-500'}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Bottom Progress Widget */}
      {!collapsed && (
        <div className="p-5 border-t border-white/5 bg-[#1A1A2E]/20">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 font-medium">
              <BarChart3 className="w-3.5 h-3.5 text-slate-500" /> {dict?.sidebar?.completion || 'Completion'}
            </span>
            <span className="text-white font-medium">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </span>
          </div>

          <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>{completedTasks} {dict?.sidebar?.done || 'Done'}</span>
            <span>{totalTasks} {dict?.sidebar?.total || 'Total'}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
