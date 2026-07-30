'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Activity, AlertCircle, RefreshCw } from 'lucide-react'

export default function ProjectBoard({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProject() {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:4001/api/projects/${params.id}`, {
        // In reality, pass the JWT Token
      })
      if (res.ok) {
        const data = await res.json()
        setProject(data)
      }
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h2 className="text-2xl text-white">Project not found</h2>
      </div>
    )
  }

  const logframe = project.logicalFramework

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
          <p className="text-white/60">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 border border-white/5 shadow-sm">
             Status: {project.status}
           </span>
           <button onClick={fetchProject} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
             <RefreshCw className="w-4 h-4" />
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Logical Framework visualizer */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-2xl font-semibold text-white/90 flex items-center gap-2">
             <Layers className="w-6 h-6 text-primary" /> Logical Framework
           </h2>
           
           {!logframe ? (
             <div className="glass-card p-8 flex flex-col items-center text-center">
               <RefreshCw className="w-8 h-8 text-white/30 animate-spin mb-4" />
               <p className="text-white/60">AI is generating the logical framework...</p>
             </div>
           ) : (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                
                <div className="glass-card border-l-4 border-l-emerald-500 bg-emerald-500/5">
                  <h3 className="text-emerald-400 font-semibold mb-2">Impact</h3>
                  <p className="text-white/80">{logframe.impact}</p>
                </div>

                <div className="ml-8 glass-card border-l-4 border-l-blue-500 bg-blue-500/5">
                  <h3 className="text-blue-400 font-semibold mb-2">Outcomes</h3>
                  <ul className="list-disc pl-4 text-white/80 space-y-1">
                    {Array.isArray(logframe.outcomes) ? logframe.outcomes.map((o:any, i:number) => <li key={i}>{o}</li>) : null}
                  </ul>
                </div>
                
                <div className="ml-16 glass-card border-l-4 border-l-purple-500 bg-purple-500/5">
                  <h3 className="text-purple-400 font-semibold mb-2">Outputs & RACER Indicators</h3>
                  <ul className="list-disc pl-4 text-white/80 space-y-1 mb-4">
                    {Array.isArray(logframe.outputs) ? logframe.outputs.map((o:any, i:number) => <li key={i}>{o}</li>) : null}
                  </ul>

                  {/* Indicators / Active Tranches Mockup */}
                  <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/5">
                    <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Eligible Active Tranches (FNVC)</h4>
                    
                    {project.indicators && project.indicators.length > 0 ? (
                      <div className="space-y-2">
                        {project.indicators.map((ind: any) => (
                           <div key={ind.id} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded">
                              <span className="text-white/80">{ind.name}</span>
                              <span className="text-emerald-400 font-medium">${ind.usdValue?.toLocaleString() || '0'}</span>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/40 text-sm">No indicators defined yet. The AI is assigning them.</p>
                    )}
                  </div>
                </div>
             </motion.div>
           )}
        </div>

        {/* Right Sidebar - Stats / PM Tools */}
        <div className="space-y-6">
           <h2 className="text-2xl font-semibold text-white/90 flex items-center gap-2">
             <Activity className="w-6 h-6 text-purple-400" /> PM Board
           </h2>
           
           <div className="glass-card">
              <h3 className="text-lg font-medium text-white/80 mb-4">Project Maturity</h3>
              <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden relative">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(project.devLevel / 5) * 100}%` }}
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-500"
                 />
              </div>
              <div className="flex justify-between text-xs text-white/50">
                <span>Automatization</span>
                <span>Gamification</span>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Current Level: <strong>{project.devLevel} / 5</strong>
              </p>
           </div>
        </div>

      </div>
    </div>
  )
}
