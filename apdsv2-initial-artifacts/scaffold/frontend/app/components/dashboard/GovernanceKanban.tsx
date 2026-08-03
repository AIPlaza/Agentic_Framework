'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, CheckCircle, Plus, Shield, ArrowRight, Activity } from 'lucide-react';

interface CARItem {
  id: string;
  title: string;
  category: string;
  status: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED';
  whyAnalysis?: string[];
}

export function GovernanceKanban({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<CARItem[]>([
    {
      id: 'car-1',
      title: 'Storage temperature variance detected (>4°C threshold)',
      category: 'Operational Quality Standard',
      status: 'IN_ANALYSIS',
      whyAnalysis: [
        'Why 1: Sensor logged 6.2°C at 03:00 AM.',
        'Why 2: Secondary compressor backup transfer did not trigger.',
        'Why 3: Transfer relay required preventive recalibration.'
      ]
    },
    {
      id: 'car-2',
      title: '8% delay in delivery timeline for Batch #A4',
      category: 'Schedule Variance Control',
      status: 'OPEN',
      whyAnalysis: []
    },
    {
      id: 'car-[#3]',
      title: 'Daily operational standards audit passed with 0 defects',
      category: 'Quality Assurance Verified',
      status: 'RESOLVED',
      whyAnalysis: ['Verified by Independent Quality Auditor.']
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const addCAR = () => {
    if (!newTitle.trim()) return;
    const newItem: CARItem = {
      id: `car-${Date.now()}`,
      title: newTitle,
      category: 'Quality Issue',
      status: 'OPEN',
      whyAnalysis: []
    };
    setItems([...items, newItem]);
    setNewTitle('');
    setShowAddModal(false);
  };

  const moveStatus = (id: string, nextStatus: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED') => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
  };

  const columns: { key: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED'; label: string; icon: any; color: string }[] = [
    { key: 'OPEN', label: 'Open Issues', icon: AlertCircle, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
    { key: 'IN_ANALYSIS', label: 'Root-Cause Analysis (5 Whys)', icon: Clock, color: 'text-[#5EC8F2] border-[#5EC8F2]/20 bg-[#5EC8F2]/5' },
    { key: 'RESOLVED', label: 'Resolved & Verified', icon: CheckCircle, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' }
  ];

  return (
    <div className="space-y-6">
      {/* Tolerances Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-[#020624]/60 border border-slate-200 rounded-2xl flex justify-between items-center border-l-4 border-l-[#5EC8F2]">
          <div>
            <span className="text-[10px] uppercase text-slate-500 font-mono tracking-wider font-bold">
              Budget Tolerance Variance
            </span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">
              +3.2% <span className="text-xs text-[#5EC8F2] font-normal">(Max Limit: +10%)</span>
            </div>
          </div>
          <Shield className="w-8 h-8 text-[#5EC8F2]/40" />
        </div>

        <div className="p-5 bg-[#020624]/60 border border-slate-200 rounded-2xl flex justify-between items-center border-l-4 border-l-[#377D8C]">
          <div>
            <span className="text-[10px] uppercase text-slate-500 font-mono tracking-wider font-bold">
              Schedule Tolerance Variance
            </span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">
              +8.0% <span className="text-xs text-[#377D8C] font-normal">(Max Limit: +15%)</span>
            </div>
          </div>
          <Clock className="w-8 h-8 text-[#377D8C]/40" />
        </div>
      </div>

      {/* Kanban Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-syne font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#5EC8F2]" />
            Quality Improvement & Issue Tracking
          </h3>
          <p className="text-xs font-mono text-slate-500">Root Cause Analysis & Zero-Defect Operational Control</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#5EC8F2]/15 text-[#5EC8F2] hover:bg-[#5EC8F2]/25 border border-[#5EC8F2]/30 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Log Issue
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="p-5 bg-[#020624] border border-slate-200 rounded-2xl space-y-3 shadow-2xl">
          <input
            type="text"
            placeholder="Enter issue or quality deviation description..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-black/40 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:border-[#5EC8F2] font-sans"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={addCAR}
              className="px-4 py-1.5 text-xs bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] font-mono font-bold uppercase rounded-lg"
            >
              Save Issue
            </button>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colItems = items.filter((i) => i.status === col.key);
          const Icon = col.icon;
          return (
            <div key={col.key} className="p-5 bg-[#020624]/40 border border-slate-200 rounded-2xl flex flex-col space-y-4 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono font-bold text-slate-900 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#5EC8F2]" /> {col.label}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#5EC8F2]">
                  {colItems.length}
                </span>
              </div>

              <div className="space-y-3 min-h-[160px]">
                {colItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="p-4 bg-black/50 border border-slate-200 rounded-xl space-y-2 hover:border-[#5EC8F2]/30 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-[#5EC8F2] uppercase tracking-wider font-mono font-bold">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs font-sans font-medium text-slate-700">{item.title}</p>

                    {item.whyAnalysis && item.whyAnalysis.length > 0 && (
                      <div className="p-2.5 bg-black/40 border border-slate-100 rounded-lg text-[11px] text-slate-500 space-y-1 font-mono">
                        {item.whyAnalysis.map((w, idx) => (
                          <div key={idx}>{w}</div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-1 pt-2 border-t border-slate-100">
                      {col.key === 'OPEN' && (
                        <button
                          onClick={() => moveStatus(item.id, 'IN_ANALYSIS')}
                          className="text-[10px] font-mono text-[#5EC8F2] hover:underline flex items-center gap-1"
                        >
                          Analyze Root Cause <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.key === 'IN_ANALYSIS' && (
                        <button
                          onClick={() => moveStatus(item.id, 'RESOLVED')}
                          className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          Mark Resolved <CheckCircle className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
