'use client'

import { useState } from 'react'
import { FileCheck, Thermometer, ShieldCheck, Upload, Activity } from 'lucide-react'

export function ChecklistBuilder({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState<'bdo' | 'cold_chain' | 'iot'>('bdo')
  
  const [bdoEntries, setBdoEntries] = useState([
    { date: '2026-07-30', operator: 'Operador BDO #1', standardMet: true, status: 'APPROVED_TPA' },
    { date: '2026-07-29', operator: 'Operador BDO #2', standardMet: true, status: 'APPROVED_TPA' }
  ])

  const [coldChain, setColdChain] = useState({
    tempMin: '2.1°C',
    tempMax: '3.8°C',
    sensorId: 'IOT-TEMP-9982',
    lastReading: '3.2°C (hace 2 min)',
    status: 'NORMAL'
  })

  const [submitted, setSubmitted] = useState(false)

  const submitNewBDO = () => {
    setBdoEntries([
      { date: new Date().toISOString().split('T')[0], operator: 'Operador Activo', standardMet: true, status: 'PENDING_TPA' },
      ...bdoEntries
    ])
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <button 
          onClick={() => setActiveTab('bdo')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'bdo' ? 'bg-[#5EC8F2]/20 text-[#5EC8F2] border border-[#5EC8F2]/40 shadow-[0_0_15px_rgba(94,200,242,0.2)]' : 'text-slate-400 hover:text-white bg-black/40 border border-white/10'}`}
        >
          <FileCheck className="w-4 h-4" /> Checklist BDO Diario
        </button>
        <button 
          onClick={() => setActiveTab('cold_chain')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'cold_chain' ? 'bg-[#377D8C]/20 text-[#5ED7F2] border border-[#377D8C]/40 shadow-[0_0_15px_rgba(55,125,140,0.2)]' : 'text-slate-400 hover:text-white bg-black/40 border border-white/10'}`}
        >
          <Thermometer className="w-4 h-4" /> Cadena de Frío & Inocuidad
        </button>
        <button 
          onClick={() => setActiveTab('iot')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'iot' ? 'bg-[#5EC8F2]/20 text-[#5EC8F2] border border-[#5EC8F2]/40' : 'text-slate-400 hover:text-white bg-black/40 border border-white/10'}`}
        >
          <Activity className="w-4 h-4" /> Telemetría IoT (Oráculo)
        </button>
      </div>

      {/* Tab 1: BDO Checklist */}
      {activeTab === 'bdo' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/10">
            <div>
              <h4 className="text-base font-syne font-bold text-white">Registro Diario de Operaciones (BDO)</h4>
              <p className="text-xs font-mono text-slate-400">Cumplimiento de estándares ISO 9001:2008 en campo</p>
            </div>
            <button 
              onClick={submitNewBDO}
              className="px-4 py-2 bg-[#5EC8F2] hover:bg-[#5ED7F2] text-[#020624] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(94,200,242,0.3)]"
            >
              <Upload className="w-3.5 h-3.5" /> Registrar Hoy
            </button>
          </div>

          {submitted && (
            <div className="p-3 bg-[#5EC8F2]/15 border border-[#5EC8F2]/30 rounded-xl text-xs font-mono text-[#5EC8F2]">
              ✓ Registro enviado a la cola del Tercero Evaluador (TPA - Anexo VII-B)
            </div>
          )}

          <div className="space-y-2">
            {bdoEntries.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-black/50 border border-white/10 rounded-xl text-xs">
                <div className="space-y-1">
                  <span className="font-mono font-bold text-[#5EC8F2]">{entry.date}</span>
                  <div className="text-[11px] font-sans text-slate-400">{entry.operator}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#5EC8F2] font-mono text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100% Estándar
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${entry.status === 'APPROVED_TPA' ? 'bg-[#1A7A4A]/20 text-[#1A7A4A] border border-[#1A7A4A]/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                    {entry.status === 'APPROVED_TPA' ? 'Aprobado TPA' : 'Pendiente TPA'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cold Chain */}
      {activeTab === 'cold_chain' && (
        <div className="p-5 bg-black/50 border border-white/10 rounded-2xl space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-mono">Sensor Asignado:</span>
            <span className="font-mono font-bold text-[#5EC8F2]">{coldChain.sensorId}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/60 border border-white/5 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Rango Seguro</span>
              <div className="text-base font-mono font-bold text-white mt-1">{coldChain.tempMin} - {coldChain.tempMax}</div>
            </div>
            <div className="p-4 bg-black/60 border border-white/5 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Lectura En Tiempo Real</span>
              <div className="text-base font-mono font-bold text-[#5EC8F2] mt-1">{coldChain.lastReading}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: IoT Oracle */}
      {activeTab === 'iot' && (
        <div className="p-5 bg-black/50 border border-white/10 rounded-2xl space-y-3 text-xs">
          <div className="flex justify-between items-center text-white">
            <span className="font-syne font-bold text-sm">Oráculo de Telemetría Biogás / KWh</span>
            <span className="text-[#5EC8F2] font-mono font-bold">Conectado (MQTT / TLS)</span>
          </div>
          <p className="text-xs font-sans text-slate-400 leading-relaxed">
            Los datos son ingeridos continuamente en el bus de oráculos y validados de forma inmutable antes de activar los tramos FNVC.
          </p>
        </div>
      )}
    </div>
  )
}
