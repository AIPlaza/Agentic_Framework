'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, RefreshCw, DollarSign, Award, FileCheck2 } from 'lucide-react';
import CinematicBackground from '@/app/components/auth/CinematicBackground';
import { useDictionary } from '@/app/components/DictionaryProvider';

export default function EvaluatorPortal() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { dict } = useDictionary();

  async function fetchReports() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4001/api/evaluator/pending-reports');
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  async function approveReport(id: string) {
    setApprovingId(id);
    setSuccessMessage(null);
    try {
      const res = await fetch(`http://localhost:4001/api/evaluator/reports/${id}/approve`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message);
        fetchReports();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setApprovingId(null);
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#1A1A2E] text-white relative overflow-hidden font-sans">
      <CinematicBackground />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Portal Header */}
        <header className="mb-12 pb-8 border-b border-white/5 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-xl text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> {dict?.evaluator?.auditorPortal || 'INDEPENDENT QUALITY AUDITOR PORTAL'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              {dict?.evaluator?.title || 'Milestone Audit & Payout Approval'}
            </h1>
            <p className="text-slate-300 text-[15px] mt-3 max-w-2xl font-sans leading-relaxed">
              {dict?.evaluator?.subtitle || 'Independent verification of project field telemetry and performance milestone achievements.'}
            </p>
          </div>

          <button
            onClick={fetchReports}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white border border-white/5 transition-colors mb-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </header>

        {/* Success Notification */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 rounded-xl text-white text-[13px] flex items-center gap-4 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#5EC8F2]" />
            <div>
              <div className="font-syne font-bold text-lg text-white">{successMessage}</div>
              <div className="text-[#5EC8F2] font-mono text-[11px] mt-1 uppercase tracking-wider">
                {dict?.evaluator?.released || 'Programmatic milestone tranche executed successfully.'}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-400" /> {dict?.evaluator?.pendingVerifications || 'Pending Milestone Verifications'}
          </h2>

          {loading ? (
            <div className="p-16 text-center text-slate-400 bg-[#1A1A2E]/20 border border-white/5 rounded-xl backdrop-blur-xl">
              <RefreshCw className="w-6 h-6 text-[#5EC8F2] animate-spin mx-auto mb-4" />
              <p className="text-[13px] font-mono uppercase tracking-widest">{dict?.common?.loading || 'Loading...'}</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-16 text-center text-slate-500 bg-[#1A1A2E]/20 border border-white/5 rounded-xl backdrop-blur-xl text-[13px] font-mono uppercase tracking-widest">
              No milestone verification requests pending audit.
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <motion.div
                  key={report.id}
                  layout
                  className="glass-blue-card p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8"
                >
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#5EC8F2] uppercase tracking-widest font-bold">
                        {report.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider ${
                          report.status === 'APPROVED' ? 'bg-[#5EC8F2]/10 text-white border border-[#5EC8F2]/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {report.status === 'APPROVED' ? (dict?.evaluator?.released || 'APPROVED') : report.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-syne font-bold text-white">{report.milestone}</h3>
                      <p className="text-[13px] text-slate-400 font-sans mt-1">{report.projectTitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px] pt-2">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest font-bold mb-2">{dict?.evaluator?.performanceMetric || 'Performance Metric'}</span>
                        <span className="text-slate-200 font-sans font-medium">{report.indicatorName}</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest font-bold mb-2">{dict?.evaluator?.verificationSource || 'Verification Source'}</span>
                        <span className="text-slate-200 font-sans font-medium flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-[#5EC8F2]" /> {report.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payout & Action */}
                  <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                    <div className="text-right mb-6 md:mb-0">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold block mb-2">{dict?.evaluator?.trancheAmount || 'Tranche Amount'}</span>
                      <span className="text-3xl font-mono font-bold text-white flex items-center justify-end">
                        <DollarSign className="w-6 h-6 -mr-0.5 text-[#5EC8F2]" />
                        {report.payoutUsd.toLocaleString()}
                      </span>
                    </div>

                    {report.status === 'APPROVED' ? (
                      <div className="px-5 py-2.5 bg-[#5EC8F2]/10 text-white border border-[#5EC8F2]/30 rounded-xl text-[12px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#5EC8F2]" /> {dict?.evaluator?.released || 'Released'}
                      </div>
                    ) : (
                      <button
                        onClick={() => approveReport(report.id)}
                        disabled={approvingId === report.id}
                        className="w-full md:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-mono font-bold uppercase tracking-widest text-[11px] rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {approvingId === report.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-300" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-slate-300" /> {dict?.evaluator?.approveAndRelease || 'Approve & Release'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
