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
      category: 'Estándar Operativo',
      status: 'RESOLVED',
      whyAnalysis: ['Checklist verificado por Tercero Evaluador.']
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
    { key: 'IN_ANALYSIS', label: 'En Análisis (5 Porqués)', icon: Clock, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
    { key: 'RESOLVED', label: 'Resueltas (Cero Defectos)', icon: CheckCircle, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' }
  ]

  return (
    <div className="space-y-6">
      
      {/* PRINCE2 Tolerances Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 flex justify-between items-center border-l-4 border-l-emerald-500">
          <div>
            <span className="text-xs uppercase text-white/50 font-semibold tracking-wider">Tolerancia de Presupuesto (PRINCE2)</span>
            <div className="text-xl font-bold text-white mt-1">+3.2% <span className="text-xs text-emerald-400 font-normal">(Permitido max +10%)</span></div>
          </div>
          <Shield className="w-8 h-8 text-emerald-400/40" />
        </div>

        <div className="glass-card p-4 flex justify-between items-center border-l-4 border-l-blue-500">
          <div>
            <span className="text-xs uppercase text-white/50 font-semibold tracking-wider">Tolerancia de Tiempo (PRINCE2)</span>
            <div className="text-xl font-bold text-white mt-1">+8.0% <span className="text-xs text-blue-400 font-normal">(Permitido max +15%)</span></div>
          </div>
          <Clock className="w-8 h-8 text-blue-400/40" />
        </div>
      </div>

      {/* Kanban Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">Acciones Correctivas (CAR - ISO 9001)</h3>
          <p className="text-xs text-white/50">Trazabilidad de 5 Porqués y Cero Defectos</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Registrar CAR
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
          <input 
            type="text" 
            placeholder="Descripción de la No Conformidad o Desviación..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAddModal(false)} className="px-3 py-1 text-xs text-white/60 hover:text-white">Cancelar</button>
            <button onClick={addCAR} className="px-3 py-1 text-xs bg-emerald-500 text-black font-semibold rounded">Guardar</button>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => {
          const colItems = items.filter(i => i.status === col.key)
          const Icon = col.icon
          return (
            <div key={col.key} className="glass-card p-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-medium text-white/70 flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-emerald-400" /> {col.label}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80">{colItems.length}</span>
              </div>

              <div className="space-y-2 min-h-[160px]">
                {colItems.map(item => (
                  <motion.div key={item.id} layout className="p-3 bg-black/40 border border-white/10 rounded-lg space-y-2 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-white/40 uppercase tracking-wider font-mono">{item.category}</span>
                    </div>
                    <p className="text-xs font-medium text-white/90">{item.title}</p>
                    
                    {item.whyAnalysis && item.whyAnalysis.length > 0 && (
                      <div className="p-2 bg-white/5 rounded text-[11px] text-white/60 space-y-1 font-mono">
                        {item.whyAnalysis.map((w, idx) => (
                          <div key={idx}>{w}</div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-1 pt-1 border-t border-white/5">
                      {col.key === 'OPEN' && (
                        <button onClick={() => moveStatus(item.id, 'IN_ANALYSIS')} className="text-[10px] text-blue-400 hover:underline flex items-center gap-1">
                          Analizar 5 Porqués <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {col.key === 'IN_ANALYSIS' && (
                        <button onClick={() => moveStatus(item.id, 'RESOLVED')} className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1">
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
