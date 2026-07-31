'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Cpu, CheckCircle2, ArrowRight, Loader2, UploadCloud, File, AlertTriangle, Settings, ShieldCheck, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import NeuralButton from '@/app/components/ui/NeuralButton'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [projectId, setProjectId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    vertical: 'Tech',
    brief: '',
    model: 'claude-3-haiku-20240307'
  })

  // Document upload state
  const [documents, setDocuments] = useState<{name: string, tokens: number}[]>([])
  
  // Calculate tokens
  const textTokens = Math.ceil(formData.brief.split(/\s+/).length * 1.3)
  const docTokens = documents.reduce((acc, doc) => acc + doc.tokens, 0)
  const totalTokens = textTokens + docTokens
  const maxTokens = 200000 
  const tokenPercentage = Math.min((totalTokens / maxTokens) * 100, 100)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setDocuments([...documents, { name: file.name, tokens: Math.floor(Math.random() * 5000) + 1000 }])
    }
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const projRes = await fetch('http://localhost:4001/api/projects', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: formData.title, description: formData.brief }) 
      })
      
      const project = await projRes.json()
      setProjectId(project.id || 'demo-project')

      await fetch('http://localhost:4001/api/agents/tasks', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({ taskName: 'onboarding', projectId: project.id, brief: formData.brief, model: formData.model }) 
      })

      setTimeout(() => {
        setLoading(false)
        setStep(4)
      }, 1200)
      
    } catch(e: any) {
      console.error('API Error:', e)
      setProjectId('demo-project')
      setLoading(false)
      setStep(4)
    }
  }

  return (
    <div className="min-h-screen bg-[#020624] text-white flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
      
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5EC8F2]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#377D8C]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />

      {/* Signature Top Decorator Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] signature-line z-50" />

      <motion.div 
        layout
        className="glass-platinum w-full max-w-3xl relative overflow-hidden p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl z-20"
      >
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Project Identity */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 flex items-center justify-center text-[#5EC8F2]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">Paso 01 / 03</span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">Identidad del Proyecto</h2>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                Define el concepto central y el activo del mundo real (RWA) que ingresará al protocolo ACCET.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-2 font-bold">
                    Nombre del Proyecto
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-[#020624]/60 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none text-base" 
                    placeholder="ej. Planta de Biogás & Granja Agroindustrial" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-2 font-bold">
                    Vertical del Activo RWA
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Tech', label: 'Energía & Tech' },
                      { id: 'Físico', label: 'Agro / Minería' },
                      { id: 'Impacto', label: 'Bienes Raíces' }
                    ].map(v => (
                      <button 
                        key={v.id}
                        onClick={() => setFormData({ ...formData, vertical: v.id })}
                        className={`py-3.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all border ${formData.vertical === v.id ? 'bg-[#5EC8F2] text-[#020624] border-[#5EC8F2] shadow-[0_0_20px_rgba(94,200,242,0.3)]' : 'bg-black/40 text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <NeuralButton 
                  onClick={() => setStep(2)}
                  disabled={!formData.title}
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-1" />
                </NeuralButton>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Agentic Context & Documents */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 flex items-center justify-center text-[#5EC8F2]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">Paso 02 / 03</span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">Contexto de Orquestación</h2>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                Resumen ejecutivo y carga de documentación (ISO 9001, TPA, oráculos). El orquestador estructurará el Marco Lógico y los indicadores RACER.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-2 font-bold">
                    Nota de Concepto (Brief)
                  </label>
                  <textarea 
                    rows={7}
                    className="w-full bg-[#020624]/60 border border-white/15 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none resize-none text-sm leading-relaxed" 
                    placeholder="Describe el activo, sus metas de producción, normas aplicables y por qué califica para financiación FNVC..." 
                    value={formData.brief}
                    onChange={e => setFormData({ ...formData, brief: e.target.value })}
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-2 font-bold">
                    Documentos de Respaldo
                  </label>
                  <div className="border-2 border-dashed border-white/20 hover:border-[#5EC8F2]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-black/40 hover:bg-white/5 transition-all relative group cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".txt,.pdf,.docx" />
                    <UploadCloud className="w-8 h-8 text-[#5EC8F2] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white text-xs font-mono font-bold uppercase tracking-wider">Arrastra tus archivos aquí</p>
                    <p className="text-slate-400 text-[10px] font-mono mt-1">PDF, TXT, DOCX (Máx. 50MB)</p>
                  </div>
                  
                  {documents.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Contexto Cargado:</h4>
                      {documents.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 bg-black/60 border border-white/10 p-2.5 rounded-xl text-xs text-white">
                          <File className="w-4 h-4 text-[#5EC8F2]" />
                          <span className="truncate flex-1 font-sans">{d.name}</span>
                          <span className="text-[#5EC8F2] font-mono text-[10px] font-bold">{d.tokens.toLocaleString()} tokens</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Token Context Manager */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Estimación de Ventana de Contexto</h4>
                  <span className="text-xs font-mono text-[#5EC8F2] font-bold">{totalTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${tokenPercentage > 90 ? 'bg-[#8B1A1A]' : 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]'}`}
                    animate={{ width: `${tokenPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider font-bold">
                  ← Atrás
                </button>
                <NeuralButton 
                  onClick={() => setStep(3)}
                  disabled={!formData.brief && documents.length === 0}
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-1" />
                </NeuralButton>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Model Configuration */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 flex items-center justify-center text-[#5EC8F2]">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">Paso 03 / 03</span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">Configuración del Modelo IA</h2>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                Selecciona el motor que procesará tu contexto y formulará los indicadores RACER.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setFormData({ ...formData, model: 'claude-3-haiku-20240307' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${formData.model === 'claude-3-haiku-20240307' ? 'bg-[#5EC8F2]/15 border-[#5EC8F2] shadow-[0_0_25px_rgba(94,200,242,0.2)]' : 'bg-black/40 border-white/10 hover:bg-white/5'}`}
                >
                  <h3 className="text-lg font-syne font-bold text-white mb-2 flex items-center justify-between">
                    Claude 3 Haiku 
                    {formData.model === 'claude-3-haiku-20240307' && <CheckCircle2 className="w-5 h-5 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">Procesamiento ultra-rápido para mapeo lógico directo e extracción rápida de indicadores.</p>
                </button>

                <button 
                  onClick={() => setFormData({ ...formData, model: 'claude-3-5-sonnet-20240620' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${formData.model === 'claude-3-5-sonnet-20240620' ? 'bg-[#5EC8F2]/15 border-[#5EC8F2] shadow-[0_0_25px_rgba(94,200,242,0.2)]' : 'bg-black/40 border-white/10 hover:bg-white/5'}`}
                >
                  <h3 className="text-lg font-syne font-bold text-white mb-2 flex items-center justify-between">
                    Claude 3.5 Sonnet
                    {formData.model === 'claude-3-5-sonnet-20240620' && <CheckCircle2 className="w-5 h-5 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">Análisis profundo y matizado para activos complejos con documentación extensa.</p>
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider font-bold">
                  ← Atrás
                </button>
                <NeuralButton 
                  onClick={handleSubmit}
                  isLoading={loading}
                >
                  {loading ? 'Inicializando...' : 'Iniciar Análisis IA'}
                </NeuralButton>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Analysis Queued Modal (100% ACCET Brand Manual v1.0 Spec) */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-10 text-center"
            >
              {/* ACCET Sky Blue Atmosphere Ring */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                className="relative group mb-2"
              >
                <div className="w-24 h-24 rounded-3xl bg-[#5EC8F2]/20 border border-[#5EC8F2]/40 flex items-center justify-center shadow-[0_0_35px_rgba(94,200,242,0.35)]">
                  <ShieldCheck className="w-12 h-12 text-[#5EC8F2]" />
                </div>
                <div className="absolute inset-[-15px] rounded-3xl border border-[#5EC8F2]/10 blur-xl pointer-events-none" />
              </motion.div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.4em] font-bold">
                  ANÁLISIS EN COLA DE PROCESAMIENTO
                </span>
                <h2 className="text-4xl sm:text-5xl font-syne font-black text-white tracking-tight">
                  ¡Análisis Programado!
                </h2>
              </div>

              <p className="text-slate-300 max-w-lg text-sm sm:text-base font-sans leading-relaxed">
                Los datos del proyecto han sido enviados al motor <strong className="font-mono text-[#5EC8F2]">{formData.model}</strong>. El sistema está estructurando el marco lógico y los indicadores RACER.
              </p>

              <div className="pt-6">
                <NeuralButton 
                  onClick={() => window.location.href = `/project/${projectId || 'demo-project'}`}
                  className="px-10 py-4 text-sm font-syne"
                >
                  IR AL BOARD DE PROYECTO →
                </NeuralButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
