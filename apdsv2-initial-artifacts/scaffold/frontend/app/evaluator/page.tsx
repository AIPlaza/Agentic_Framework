'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, FileText, DollarSign, ExternalLink } from 'lucide-react'

export default function EvaluatorPortal() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function fetchReports() {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4001/api/evaluator/pending-reports')
      if (res.ok) {
        const data = await res.json()
        setReports(data.reports || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  async function approveReport(id: string) {
    setApprovingId(id)
    setSuccessMessage(null)
    try {
      const res = await fetch(`http://localhost:4001/api/evaluator/reports/${id}/approve`, {
        method: 'POST'
      })
      if (res.ok) {
        const data = await res.json()
        setSuccessMessage(data.message)
        fetchReports()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setApprovingId(null)
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto bg-black text-white">
      
      {/* Portal Header */}
      <header className="mb-10 pb-6 border-b border-white/10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Portal Tercero Evaluador / TPA (Anexo VII-B UE)
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Evaluación & Liberación FNVC</h1>
          <p className="text-white/60 text-sm mt-1">
            Auditoría de cumplimiento de hitos por oráculos de datos e instrumentos de campo sin revisión de facturas financieras.
          </p>
        </div>

        <button onClick={fetchReports} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white border border-white/10 transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      {/* Success Notification */}
      {successMessage && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <div>
            <div className="font-semibold">{successMessage}</div>
            <div className="text-xs text-emerald-400/80 font-mono mt-0.5">El Smart Contract FNVC procesó el desembolso programático.</div>
          </div>
        </motion.div>
      )}

      {/* Reports List */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-white/90">Solicitudes de Hitos Pendientes</h2>

        {loading ? (
          <div className="glass-card p-12 text-center text-white/50">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
            Cargando expedientes de auditoría...
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card p-12 text-center text-white/40">
            No hay solicitudes de hitos pendientes de evaluación en este momento.
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <motion.div key={report.id} layout className="glass-card p-6 border-l-4 border-l-purple-500 flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">{report.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${report.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {report.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{report.milestone}</h3>
                    <p className="text-xs text-white/60 mt-0.5">{report.projectTitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-white/40 block text-[10px] uppercase">Indicador RACER:</span>
                      <span className="text-white/90 font-medium">{report.indicatorName}</span>
                    </div>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      <span className="text-white/40 block text-[10px] uppercase">Fuente de Verificación:</span>
                      <span className="text-emerald-400 font-mono">{report.source}</span>
                    </div>
                  </div>
                </div>

                {/* Payout & Action */}
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                  <div className="text-right">
                    <span className="text-xs text-white/50 block">Desembolso FNVC</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono flex items-center justify-end">
                      <DollarSign className="w-5 h-5 -mr-1" />
                      {report.payoutUsd.toLocaleString()} USD
                    </span>
                  </div>

                  {report.status === 'APPROVED' ? (
                    <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Hito Aprobado & Pagado
                    </div>
                  ) : (
                    <button
                      onClick={() => approveReport(report.id)}
                      disabled={approvingId === report.id}
                      className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-black font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {approvingId === report.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" /> Aprobar & Liberar FNVC
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
  )
}
