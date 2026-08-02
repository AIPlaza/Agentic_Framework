'use client';

import { useState } from 'react';
import { FileCheck, Thermometer, ShieldCheck, Upload, Activity, CheckCircle2 } from 'lucide-react';

export function ChecklistBuilder({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState<'quality' | 'cold_chain' | 'iot'>('quality');

  const [qualityEntries, setQualityEntries] = useState([
    { date: '2026-07-30', operator: 'Field Inspector #1', standardMet: true, status: 'AUDITED_APPROVED' },
    { date: '2026-07-29', operator: 'Field Inspector #2', standardMet: true, status: 'AUDITED_APPROVED' }
  ]);

  const [coldChain] = useState({
    tempMin: '2.1°C',
    tempMax: '3.8°C',
    sensorId: 'IOT-TEMP-9982',
    lastReading: '3.2°C (2 mins ago)',
    status: 'OPTIMAL'
  });

  const [submitted, setSubmitted] = useState(false);

  const submitNewQualityEntry = () => {
    setQualityEntries([
      { date: new Date().toISOString().split('T')[0], operator: 'Lead Operator', standardMet: true, status: 'PENDING_AUDIT' },
      ...qualityEntries
    ]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('quality')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'quality'
              ? 'bg-[#5EC8F2]/20 text-[#5EC8F2] border border-[#5EC8F2]/40 shadow-[0_0_15px_rgba(94,200,242,0.2)]'
              : 'text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" /> Daily Quality & Standards Log
        </button>
        <button
          onClick={() => setActiveTab('cold_chain')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'cold_chain'
              ? 'bg-[#377D8C]/20 text-[#5ED7F2] border border-[#377D8C]/40 shadow-[0_0_15px_rgba(55,125,140,0.2)]'
              : 'text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-200'
          }`}
        >
          <Thermometer className="w-4 h-4" /> Cold Chain & Storage Controls
        </button>
        <button
          onClick={() => setActiveTab('iot')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            activeTab === 'iot'
              ? 'bg-[#5EC8F2]/20 text-[#5EC8F2] border border-[#5EC8F2]/40'
              : 'text-slate-500 hover:text-slate-900 bg-white shadow-sm border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" /> IoT Telemetry & Oracle Stream
        </button>
      </div>

      {/* Tab 1: Quality Standards Log */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center vignelli-clean-card p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-base font-syne font-bold text-slate-900">Daily Operational Quality Log</h4>
              <p className="text-xs font-mono text-slate-500">Standard operational compliance & zero-defect verification</p>
            </div>
            <button
              onClick={submitNewQualityEntry}
              className="px-4 py-2 bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 text-[#020624] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(94,200,242,0.3)]"
            >
              <Upload className="w-3.5 h-3.5" /> Submit Today's Log
            </button>
          </div>

          {submitted && (
            <div className="p-3 bg-[#5EC8F2]/15 border border-[#5EC8F2]/30 rounded-xl text-xs font-mono text-[#5EC8F2] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#5EC8F2]" />
              <span>✓ Quality log submitted to Independent Auditor Review Queue</span>
            </div>
          )}

          <div className="space-y-2">
            {qualityEntries.map((entry, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <div className="space-y-1">
                  <span className="font-mono font-bold text-[#5EC8F2]">{entry.date}</span>
                  <div className="text-[11px] font-sans text-slate-500">{entry.operator}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#5EC8F2] font-mono text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100% Quality Met
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      entry.status === 'AUDITED_APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {entry.status === 'AUDITED_APPROVED' ? 'Auditor Approved' : 'Pending Audit'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cold Chain Controls */}
      {activeTab === 'cold_chain' && (
        <div className="p-5 vignelli-clean-card border border-slate-200 rounded-xl space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-mono">Assigned Sensor Hardware:</span>
            <span className="font-mono font-bold text-[#5EC8F2]">{coldChain.sensorId}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 vignelli-clean-card border border-slate-100 rounded-xl">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Safe Range</span>
              <div className="text-base font-mono font-bold text-slate-900 mt-1">
                {coldChain.tempMin} - {coldChain.tempMax}
              </div>
            </div>
            <div className="p-4 vignelli-clean-card border border-slate-100 rounded-xl">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Real-Time Reading</span>
              <div className="text-base font-mono font-bold text-[#5EC8F2] mt-1">{coldChain.lastReading}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: IoT Oracle */}
      {activeTab === 'iot' && (
        <div className="p-5 vignelli-clean-card border border-slate-200 rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center text-slate-900">
            <span className="font-syne font-bold text-sm">Biogas / KWh Telemetry Oracle Stream</span>
            <span className="text-[#5EC8F2] font-mono font-bold">Connected (MQTT / TLS Secure)</span>
          </div>
          <p className="text-xs font-sans text-slate-500 leading-relaxed">
            Data is ingested continuously into the oracle pipeline and cryptographically validated before triggering milestone disbursement tranches.
          </p>
        </div>
      )}
    </div>
  );
}
