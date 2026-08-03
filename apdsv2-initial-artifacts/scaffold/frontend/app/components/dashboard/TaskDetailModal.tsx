'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Clock, ShieldAlert, DollarSign, User, Tag, ArrowRight, Activity, FileText } from 'lucide-react';

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  status: 'BACKLOG' | 'DESIGN' | 'EXECUTION' | 'AUDIT' | 'DONE';
  assignee: string;
  payoutUsd?: number;
  whyAnalysis?: string[];
  description?: string;
  racerMetric?: string;
}

interface TaskDetailModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onUpdate: (updatedTask: TaskItem) => void;
}

export function TaskDetailModal({ task, onClose, onUpdate }: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-md p-4 sm:p-6">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-xl h-full bg-[#020624] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl relative"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold uppercase">
                {task.id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                  task.priority === 'CRITICAL'
                    ? 'bg-[#8B1A1A]/30 text-[#FF7575] border border-[#8B1A1A]/60'
                    : task.priority === 'HIGH'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {task.priority} PRIORITY
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/40 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Category */}
          <div>
            <span className="text-xs font-mono text-[#5ED7F2] uppercase tracking-wider block font-bold mb-1">
              {task.category}
            </span>
            <input
              type="text"
              value={task.title}
              onChange={(e) => onUpdate({ ...task, title: e.target.value })}
              className="text-xl sm:text-2xl font-syne font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-[#5EC8F2] focus:outline-none w-full py-1 transition-all"
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-white shadow-sm border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-bold">Assignee</span>
              <div className="text-slate-900 flex items-center gap-1.5 font-sans font-medium">
                <User className="w-3.5 h-3.5 text-[#5EC8F2]" /> {task.assignee}
              </div>
            </div>

            <div className="p-3 bg-black/40 border border-slate-200 rounded-xl space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-bold">Column Status</span>
              <select
                value={task.status}
                onChange={(e) => onUpdate({ ...task, status: e.target.value as any })}
                className="bg-black/60 text-[#5EC8F2] font-mono font-bold text-xs rounded-lg px-2 py-1 border border-slate-200 focus:outline-none focus:border-[#5EC8F2]"
              >
                <option value="BACKLOG">1. Backlog & Requirements</option>
                <option value="DESIGN">2. Design & Architecture</option>
                <option value="EXECUTION">3. Operational Execution</option>
                <option value="AUDIT">4. Auditor Review Queue</option>
                <option value="DONE">5. Milestone Released</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-600 uppercase tracking-widest block font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#5EC8F2]" /> Task Description
            </label>
            <textarea
              rows={4}
              value={
                task.description ||
                'Executive task details, standard operational checks, and deliverables required for milestone approval.'
              }
              onChange={(e) => onUpdate({ ...task, description: e.target.value })}
              className="w-full bg-black/40 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-sans focus:outline-none focus:border-[#5EC8F2] resize-none leading-relaxed"
            />
          </div>

          {/* RACER & Tranche Link */}
          {task.payoutUsd && (
            <div className="p-4 bg-[#5EC8F2]/10 border border-[#5EC8F2]/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  Linked Performance Metric
                </span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {task.racerMetric || 'Operational Standards Audit'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  Tranche Release
                </span>
                <span className="text-base font-mono font-bold text-[#5EC8F2] flex items-center justify-end">
                  <DollarSign className="w-4 h-4 -mr-1" />
                  {task.payoutUsd.toLocaleString()} USD
                </span>
              </div>
            </div>
          )}

          {/* 5-Why Analysis */}
          {task.whyAnalysis && task.whyAnalysis.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-600 uppercase tracking-widest block font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#5EC8F2]" /> Root-Cause Analysis (5 Whys)
              </label>
              <div className="p-3 bg-black/40 border border-slate-200 rounded-xl space-y-2 text-xs font-mono text-slate-600">
                {task.whyAnalysis.map((why, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#5EC8F2] font-bold">{idx + 1}.</span>
                    <span>{why}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-mono text-xs text-slate-600 hover:text-slate-900 bg-black/40 border border-slate-200"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase text-[#020624] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-all shadow-md shadow-[#5EC8F2]/20"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
