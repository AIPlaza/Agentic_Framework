'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Clock, CheckCircle, Plus, Shield, ArrowRight } from 'lucide-react'

interface CARItem {
  id: string
  title: string
  category: string
  status: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED'
  whyAnalysis?: string[]
}

export function GovernanceKanban({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<CARItem[]>([
    {
      id: 'car-1',
      title: 'Desviación en temperatura de almacenamiento (>4°C)',
      category: 'Cadena de Frío (ISO 9001)',
      status: 'IN_ANALYSIS',
      whyAnalysis: [
        '¿Por qué 1?: El sensor registró 6.2°C a las 03:00 AM.',
        '¿Por qué 2?: El compresor secundario no activó el ciclo de respaldo.',
        '¿Por qué 3?: Falta de mantenimiento preventivo en relé de transferencia.'
      ]
    },
    {
      id: 'car-2',
      title: 'Retraso del 8% en entregas de lote #A4',
      category: 'Tolerancia Tiempo (PRINCE2)',
      status: 'OPEN',
      whyAnalysis: []
    },
    {
      id: 'car-3',
      title: 'Auditoría BDO completada con cero defectos',
      category: 'Estándar Operativo ISO 9001:2008',
      status: 'RESOLVED',
      whyAnalysis: ['Checklist BDO verificado por Tercero Evaluador TPA.']
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const addCAR = () => {
    if (!newTitle.trim()) return
    const newItem: CARItem = {
      id: `car-${Date.now()}`,
      title: newTitle,
      category: 'ISO 9001 / CAR',
      status: 'OPEN',
      whyAnalysis: []
    }
    setItems([...items, newItem])
    setNewTitle('')
    setShowAddModal(false)
  }

  const moveStatus = (id: string, nextStatus: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED') => {
    setItems(items.map(item => item.id === id ? { ...item, status: nextStatus } : item))
  }

  const columns: { key: 'OPEN' | 'IN_ANALYSIS' | 'RESOLVED'; label: string; icon: any; color: string }[] = [
    { key: 'OPEN', label: 'Abiertas (No Conformidad)', icon: AlertCircle, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
    { key: 'IN_ANALYSIS', label: 'En Análisis (5 Porqués)', icon: Clock, color: 'text-[#5EC8F2] border-[#5EC8F2]/20 bg-[#5EC8F2]/5' },
    { key: 'RESOLVED', label: 'Resueltas (Cero Defectos)', icon: CheckCircle, color: 'text-[#1A7A4A] border-[#1A7A4A]/20 bg-[#1A7A4A]/5' }
  ]

  return (
    <div className="space-y-6">
      
      {/* PRINCE2 Tolerances Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="dark-section-card p-5 flex justify-between items-center border-l-4 border-l-[#5EC8F2]">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">Tolerancia de Presupuesto (PRINCE2)</span>
            <div className="text-xl font-bold font-mono text-white mt-1">+3.2% <span className="text-xs text-[#5EC8F2] font-normal">(Permitido máx +10%)</span></div>
          </div>
          <Shield className="w-8 h-8 text-[#5EC8F2]/40" />
        </div>

        <div className="dark-section-card p-5 flex justify-between items-center border-l-4 border-l-[#377D8C]">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">Tolerancia de Tiempo (PRINCE2)</span>
            <div className="text-xl font-bold font-mono text-white mt-1">+8.0% <span className="text-xs text-[#377D8C] font-normal">(Permitido máx +15%)</span></div>
          </div>
          <Clock className="w-8 h-8 text-[#377D8C]/40" />
        </div>
      </div>

      {/* Kanban Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-syne font-bold text-white">Acciones Correctivas (CAR - ISO 9001)</h3>
          <p className="text-xs font-mono text-slate-400">Trazabilidad de 5 Porqués y Cero Defectos</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#5EC8F2]/15 text-[#5EC8F2] hover:bg-[#5EC8F2]/25 border border-[#5EC8F2]/30 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Registrar CAR
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="p-5 bg-black/60 border border-white/15 rounded-2xl space-y-3">
          <input 
            type="text" 
            placeholder="Descripción de la No Conformidad o Desviación..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-black/40 border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#5EC8F2] font-sans"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white">Cancelar</button>
            <button onClick={addCAR} className="px-4 py-1.5 text-xs bg-[#5EC8F2] text-[#020624] font-mono font-bold uppercase rounded-lg">Guardar</button>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => {
          const colItems = items.filter(i => i.status === col.key)
          const Icon = col.icon
          return (
            <div key={col.key} className="dark-section-card p-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#5EC8F2]" /> {col.label}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-[#5EC8F2]">{colItems.length}</span>
              </div>

              <div className="space-y-3 min-h-[160px]">
                {colItems.map(item => (
                  <motion.div key={item.id} layout className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-2 hover:border-[#5EC8F2]/30 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-[#5EC8F2] uppercase tracking-wider font-mono font-bold">{item.category}</span>
                    </div>
                    <p className="text-xs font-sans font-medium text-slate-200">{item.title}</p>
                    
                    {item.whyAnalysis && item.whyAnalysis.length > 0 && (
                      <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg text-[11px] text-slate-400 space-y-1 font-mono">
                        {item.whyAnalysis.map((w, idx) => (
                          <div key={idx}>{w}</div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-1 pt-2 border-t border-white/5">
                      {col.key === 'OPEN' && (
                        <button onClick={() => moveStatus(item.id, 'IN_ANALYSIS')} className="text-[10px] font-mono text-[#5EC8F2] hover:underline flex items-center gap-1">
                          Analizar 5 Porqués <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.key === 'IN_ANALYSIS' && (
                        <button onClick={() => moveStatus(item.id, 'RESOLVED')} className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1">
                          Marcar Resuelta <CheckCircle className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
