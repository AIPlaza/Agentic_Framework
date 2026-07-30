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
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button 
          onClick={() => setActiveTab('bdo')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${activeTab === 'bdo' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-white/60 hover:text-white'}`}
        >
          <FileCheck className="w-4 h-4" /> Checklist BDO Diario
        </button>
        <button 
          onClick={() => setActiveTab('cold_chain')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${activeTab === 'cold_chain' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/60 hover:text-white'}`}
        >
          <Thermometer className="w-4 h-4" /> Cadena de Frío & Inocuidad
        </button>
        <button 
          onClick={() => setActiveTab('iot')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${activeTab === 'iot' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/60 hover:text-white'}`}
        >
          <Activity className="w-4 h-4" /> Telemetría IoT (Oráculo)
        </button>
      </div>

      {/* Tab 1: BDO Checklist */}
      {activeTab === 'bdo' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
            <div>
              <h4 className="text-xs font-semibold text-white">Registro Diario de Operaciones (BDO)</h4>
              <p className="text-[11px] text-white/50">Cumplimiento de estándares ISO 9001:2008 en campo</p>
            </div>
            <button 
              onClick={submitNewBDO}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs rounded transition-all flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" /> Registrar Hoy
            </button>
          </div>

          {submitted && (
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300">
              ✓ Registro enviado a la cola del Tercero Evaluador (TPA - Anexo VII-B)
            </div>
          )}

          <div className="space-y-2">
            {bdoEntries.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-black/40 border border-white/5 rounded-lg text-xs">
                <div className="space-y-0.5">
                  <span className="font-mono text-white/90">{entry.date}</span>
                  <div className="text-[10px] text-white/40">{entry.operator}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Estándar
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${entry.status === 'APPROVED_TPA' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
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
        <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-white/50">Sensor Asignado:</span>
            <span className="font-mono text-blue-400">{coldChain.sensorId}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-[10px] text-white/40 uppercase">Rango Seguro</span>
              <div className="text-sm font-semibold text-white mt-0.5">{coldChain.tempMin} - {coldChain.tempMax}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-[10px] text-white/40 uppercase">Lectura En Tiempo Real</span>
              <div className="text-sm font-semibold text-emerald-400 mt-0.5">{coldChain.lastReading}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: IoT Oracle */}
      {activeTab === 'iot' && (
        <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2 text-xs">
          <div className="flex justify-between items-center text-white/80">
            <span>Oráculo de Producción Biogás / KWh</span>
            <span className="text-emerald-400 font-mono">Conectado (MQTT / TLS)</span>
          </div>
          <p className="text-[11px] text-white/50">
            Los datos son ingeridos continuamente en el bus de oráculos y validados antes de activar los tramos FNVC.
          </p>
        </div>
      )}
    </div>
  )
}
