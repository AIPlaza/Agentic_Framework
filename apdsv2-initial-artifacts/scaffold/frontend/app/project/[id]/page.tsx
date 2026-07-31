'use client'

import { useEffect, useState, use } from 'react'
import { motion } from 'framer-motion'
import { Layers, Activity, AlertCircle, RefreshCw, Shield, FileCheck, DollarSign, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { RACERTable } from '@/app/components/dashboard/RACERTable'
import { GovernanceKanban } from '@/app/components/dashboard/GovernanceKanban'
import { ChecklistBuilder } from '@/app/components/dashboard/ChecklistBuilder'

export default function ProjectBoard({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params
  const targetId = (resolvedParams as any)?.id || ''

  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'logframe' | 'racer' | 'governance' | 'checklists'>('logframe')

  async function fetchProject() {
    setLoading(true)
    setError(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const res = await fetch(`http://localhost:4001/api/projects/${targetId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setProject(data)
      } else {
        // Fallback live query directly to Supabase table
        const { data: dbProj, error: dbErr } = await supabase
          .from('projects')
          .select('*, logical_frameworks(*), indicators(*)')
          .eq('id', targetId)
          .single()

        if (dbProj) {
          setProject({
            id: dbProj.id,
            title: dbProj.title,
            description: dbProj.description,
            status: dbProj.status || 'ACTIVE',
            devLevel: dbProj.dev_level || 3,
            logicalFramework: dbProj.logical_frameworks?.[0] || {
              impact: 'Transformación energética limpia y reducción del 40% de huella de carbono.',
              outcomes: ['Generación continua de energía limpia vía Biogás', 'Inocuidad alimentaria certificada ISO 9001:2008'],
              outputs: ['Instalación de biodigestores anaeróbicos de alta capacidad', 'Despliegue del bus de oráculos IoT']
            },
            indicators: dbProj.indicators || []
          })
        } else {
          setError('Proyecto no encontrado en la base de datos.')
        }
      }
    } catch(e: any) {
      console.error(e)
      setError('Error de conexión con el backend de orquestación.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (targetId) {
      fetchProject()
    }
  }, [targetId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020624]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#5EC8F2] animate-spin" />
          <span className="font-mono text-xs text-[#5EC8F2] uppercase tracking-[0.3em]">Cargando Sistema APDS v2.0...</span>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020624] text-white p-6">
        <div className="w-16 h-16 rounded-2xl bg-[#8B1A1A]/20 border border-[#8B1A1A]/40 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-[#FF7575]" />
        </div>
        <h2 className="text-3xl font-syne font-bold text-white mb-2">Proyecto no encontrado</h2>
        <p className="text-slate-400 text-sm font-sans max-w-md text-center mb-6">{error || 'El ID de proyecto especificado no existe en la base de datos.'}</p>
        <a href="/onboarding" className="px-6 py-3 bg-[#5EC8F2] text-[#020624] font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Crear Nuevo Proyecto
        </a>
      </div>
    )
  }

  const logframe = project.logicalFramework

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-[#020624] text-white relative overflow-hidden">
      
      {/* Background Overlays */}
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />
      <div className="fixed top-0 left-0 right-0 h-[3px] signature-line z-50" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
              DEV-MATRIX NIVEL {project.devLevel || 1} / 5
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-mono font-bold uppercase">
              {project.status || 'ACTIVE'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">{project.title}</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">{project.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={fetchProject} className="p-3 bg-black/40 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white border border-white/15 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <a href={`/marketplace/${project.id}`} className="px-5 py-3 bg-[#5EC8F2] hover:bg-[#5ED7F2] text-[#020624] font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(94,200,242,0.3)] transition-all flex items-center gap-2">
            Ficha Pública Marketplace
          </a>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-black/50 p-2 rounded-2xl border border-white/15 max-w-fit relative z-20">
        <button 
          onClick={() => setActiveTab('logframe')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'logframe' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Layers className="w-4 h-4" /> Marco Lógico (Anexo C)
        </button>
        <button 
          onClick={() => setActiveTab('racer')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'racer' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <DollarSign className="w-4 h-4" /> Indicadores RACER & FNVC
        </button>
        <button 
          onClick={() => setActiveTab('governance')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'governance' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Shield className="w-4 h-4" /> Gobernanza & Tolerancias (PRINCE2)
        </button>
        <button 
          onClick={() => setActiveTab('checklists')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'checklists' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <FileCheck className="w-4 h-4" /> Instrumental de Campo (ISO 9001)
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
        
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'logframe' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#5EC8F2]" /> Marco Lógico de la UE
              </h2>
              
              {!logframe ? (
                <div className="glass-platinum p-8 flex flex-col items-center text-center rounded-2xl">
                  <RefreshCw className="w-8 h-8 text-[#5EC8F2] animate-spin mb-4" />
                  <p className="text-slate-300 text-sm font-sans">El Orquestador de IA está estructurando la teoría del cambio...</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="dark-section-card border-l-4 border-l-[#5EC8F2] p-6">
                    <h3 className="text-[#5EC8F2] font-mono font-bold text-xs uppercase tracking-widest mb-1">Impacto Superior</h3>
                    <p className="text-slate-200 text-sm font-sans leading-relaxed">{logframe.impact}</p>
                  </div>

                  <div className="dark-section-card border-l-4 border-l-[#5ED7F2] p-6 ml-4">
                    <h3 className="text-[#5ED7F2] font-mono font-bold text-xs uppercase tracking-widest mb-2">Resultados (Outcomes)</h3>
                    <ul className="list-disc pl-4 text-slate-300 space-y-1.5 text-sm font-sans">
                      {Array.isArray(logframe.outcomes) ? logframe.outcomes.map((o:any, i:number) => <li key={i}>{o}</li>) : <li>{logframe.outcomes}</li>}
                    </ul>
                  </div>
                  
                  <div className="dark-section-card border-l-4 border-l-[#377D8C] p-6 ml-8">
                    <h3 className="text-[#377D8C] font-mono font-bold text-xs uppercase tracking-widest mb-2">Productos (Outputs)</h3>
                    <ul className="list-disc pl-4 text-slate-300 space-y-1.5 text-sm font-sans">
                      {Array.isArray(logframe.outputs) ? logframe.outputs.map((o:any, i:number) => <li key={i}>{o}</li>) : <li>{logframe.outputs}</li>}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'racer' && (
            <div className="glass-platinum p-6 rounded-2xl space-y-4">
              <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#5EC8F2]" /> Asignación de Tranches FNVC
              </h2>
              <RACERTable indicators={project.indicators || []} projectId={project.id} />
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="glass-platinum p-6 rounded-2xl">
              <GovernanceKanban projectId={project.id} />
            </div>
          )}

          {activeTab === 'checklists' && (
            <div className="glass-platinum p-6 rounded-2xl">
              <ChecklistBuilder projectId={project.id} />
            </div>
          )}
        </div>

        {/* Right Sidebar - Status & Roadmap */}
        <div className="space-y-6">
          <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#5EC8F2]" /> Estado de Madurez
          </h2>
          
          <div className="glass-platinum p-6 rounded-2xl space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">DEv-matrix Roadmap (5x4)</h3>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(project.devLevel / 5) * 100}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Automatización</span>
              <span>Gamificación RWA</span>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-slate-300 font-sans">
              <div className="flex justify-between items-center">
                <span>Nivel 1: Concepto & Onboarding</span>
                <span className="text-[#5EC8F2] font-mono text-[10px] font-bold">✓ Completado</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Nivel 2: Logframe & Layout SGC</span>
                <span className="text-[#5EC8F2] font-mono text-[10px] font-bold">✓ Completado</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Nivel 3: RACER & Oráculos</span>
                <span className="text-[#5ED7F2] font-mono text-[10px] font-bold">⚡ En Proceso</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Nivel 4: Securitización & TPA</span>
                <span className="font-mono text-[10px]">Pendiente</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Nivel 5: Gamificación Marketplace</span>
                <span className="font-mono text-[10px]">Pendiente</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
