'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Activity, AlertCircle, RefreshCw, Shield, FileCheck, DollarSign } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { RACERTable } from '../../components/dashboard/RACERTable'
import { GovernanceKanban } from '../../components/dashboard/GovernanceKanban'
import { ChecklistBuilder } from '../../components/dashboard/ChecklistBuilder'

const DEMO_PROJECT = {
  id: 'demo-project',
  title: 'Planta de Biogás & Granja Agroindustrial',
  description: 'Proyecto RWA de producción limpia e inocuidad alimentaria respaldado por la norma ISO 9001:2008 y oráculos de telemetría IoT.',
  status: 'ACTIVE',
  devLevel: 3,
  logicalFramework: {
    impact: 'Transformación energética limpia y reducción del 40% de huella de carbono en la región agroindustrial.',
    outcomes: [
      'Generación continua de 2.5 MW/h de energía limpia vía Biogás',
      'Inocuidad alimentaria certificada bajo estándar ISO 9001:2008'
    ],
    outputs: [
      'Instalación de 2 biodigestores anaeróbicos de alta capacidad',
      'Despliegue del bus de oráculos IoT para control de temperatura y presión',
      'Implementación del sistema BDO (Registro Diario de Operaciones)'
    ]
  },
  indicators: [
    { id: 'ind-1', name: 'Disminución Mermas > 15%', target: '15% reducción', fnvcEligible: true, usdValue: 12500, verificationSource: 'Checklist BDO #2026-07-29 & Oráculo IoT' },
    { id: 'ind-2', name: 'Rango Seguro Cadena de Frío (2-4°C)', target: '100% cumplimiento', fnvcEligible: true, usdValue: 8000, verificationSource: 'Oráculo IoT-TEMP-9982' },
    { id: 'ind-3', name: 'Producción KWh Biogás', target: '2.5 MW/h', fnvcEligible: false, usdValue: 5000, verificationSource: 'Medidor Digital IoT' }
  ]
}

export default function ProjectBoard({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'logframe' | 'racer' | 'governance' | 'checklists'>('logframe')

  async function fetchProject() {
    setLoading(true)
    try {
      if (params.id === 'demo-project') {
        setProject(DEMO_PROJECT)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const res = await fetch(`http://localhost:4001/api/projects/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setProject(data)
      } else {
        setProject({ ...DEMO_PROJECT, id: params.id, title: `Proyecto #${params.id.slice(0, 8)}` })
      }
    } catch(e) {
      console.error(e)
      setProject({ ...DEMO_PROJECT, id: params.id })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h2 className="text-2xl text-white font-semibold">Project not found</h2>
        <p className="text-white/50 text-sm mt-1">Check if the project ID exists or create one via Onboarding.</p>
      </div>
    )
  }

  const logframe = project.logicalFramework

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-black text-white">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono">
              LEVEL {project.devLevel || 1} / 5 (DEv-matrix)
            </span>
            <span className="px-2.5 py-0.5 bg-white/10 text-white/70 rounded-full text-xs font-mono">
              {project.status || 'DRAFT'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h1>
          <p className="text-white/60 text-sm mt-1 max-w-2xl">{project.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={fetchProject} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white border border-white/10 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <a href={`/marketplace/${project.id}`} className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-black font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
            Marketplace Fiche
          </a>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10 max-w-fit">
        <button 
          onClick={() => setActiveTab('logframe')}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'logframe' ? 'bg-emerald-500 text-black shadow-lg font-semibold' : 'text-white/60 hover:text-white'}`}
        >
          <Layers className="w-4 h-4" /> Marco Lógico (Anexo C)
        </button>
        <button 
          onClick={() => setActiveTab('racer')}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'racer' ? 'bg-emerald-500 text-black shadow-lg font-semibold' : 'text-white/60 hover:text-white'}`}
        >
          <DollarSign className="w-4 h-4" /> Indicadores RACER & FNVC
        </button>
        <button 
          onClick={() => setActiveTab('governance')}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'governance' ? 'bg-emerald-500 text-black shadow-lg font-semibold' : 'text-white/60 hover:text-white'}`}
        >
          <Shield className="w-4 h-4" /> Gobernanza & Tolerancias (PRINCE2)
        </button>
        <button 
          onClick={() => setActiveTab('checklists')}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'checklists' ? 'bg-emerald-500 text-black shadow-lg font-semibold' : 'text-white/60 hover:text-white'}`}
        >
          <FileCheck className="w-4 h-4" /> Instrumental de Campo (ISO 9001)
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'logframe' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" /> Marco Lógico de la UE
              </h2>
              
              {!logframe ? (
                <div className="glass-card p-8 flex flex-col items-center text-center">
                  <RefreshCw className="w-8 h-8 text-emerald-400/50 animate-spin mb-4" />
                  <p className="text-white/60 text-sm">El Orquestador de IA está estructurando la teoría del cambio...</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5 p-5">
                    <h3 className="text-emerald-400 font-semibold text-sm mb-1 uppercase tracking-wider">Impacto Superior</h3>
                    <p className="text-white/90 text-sm">{logframe.impact}</p>
                  </div>

                  <div className="glass-card border-l-4 border-l-blue-500 bg-blue-500/5 p-5 ml-4">
                    <h3 className="text-blue-400 font-semibold text-sm mb-2 uppercase tracking-wider">Resultados (Outcomes)</h3>
                    <ul className="list-disc pl-4 text-white/80 space-y-1 text-sm">
                      {Array.isArray(logframe.outcomes) ? logframe.outcomes.map((o:any, i:number) => <li key={i}>{o}</li>) : <li>{logframe.outcomes}</li>}
                    </ul>
                  </div>
                  
                  <div className="glass-card border-l-4 border-l-purple-500 bg-purple-500/5 p-5 ml-8">
                    <h3 className="text-purple-400 font-semibold text-sm mb-2 uppercase tracking-wider">Productos (Outputs)</h3>
                    <ul className="list-disc pl-4 text-white/80 space-y-1 text-sm">
                      {Array.isArray(logframe.outputs) ? logframe.outputs.map((o:any, i:number) => <li key={i}>{o}</li>) : <li>{logframe.outputs}</li>}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'racer' && (
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> Asignación de Tranches FNVC
              </h2>
              <RACERTable indicators={project.indicators || []} projectId={project.id} />
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="glass-card p-6">
              <GovernanceKanban projectId={project.id} />
            </div>
          )}

          {activeTab === 'checklists' && (
            <div className="glass-card p-6">
              <ChecklistBuilder projectId={project.id} />
            </div>
          )}
        </div>

        {/* Right Sidebar - Status & Roadmap */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" /> Estado de Madurez
          </h2>
          
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">DEv-matrix Roadmap (5x4)</h3>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(project.devLevel / 5) * 100}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>Automatization</span>
              <span>Gamification</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Nivel 1: Concept & Onboarding</span>
                <span className="text-emerald-400">✓ Completado</span>
              </div>
              <div className="flex justify-between">
                <span>Nivel 2: Logframe & Layout SGC</span>
                <span className="text-emerald-400">✓ Completado</span>
              </div>
              <div className="flex justify-between">
                <span>Nivel 3: RACER & Oráculos</span>
                <span className="text-amber-400">⚡ En Proceso</span>
              </div>
              <div className="flex justify-between text-white/30">
                <span>Nivel 4: Securitization & TPA</span>
                <span>Pendiente</span>
              </div>
              <div className="flex justify-between text-white/30">
                <span>Nivel 5: Gamification Marketplace</span>
                <span>Pendiente</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
