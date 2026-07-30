'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Cpu, CheckCircle2, ArrowRight, Loader2, UploadCloud, File, AlertTriangle, Settings } from 'lucide-react'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

  // Mock document upload state
  const [documents, setDocuments] = useState<{name: string, tokens: number}[]>([])
  
  // Calculate tokens
  const textTokens = Math.ceil(formData.brief.split(/\s+/).length * 1.3)
  const docTokens = documents.reduce((acc, doc) => acc + doc.tokens, 0)
  const totalTokens = textTokens + docTokens
  const maxTokens = formData.model.includes('haiku') ? 200000 : 200000 
  const tokenPercentage = Math.min((totalTokens / maxTokens) * 100, 100)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // Mock token extraction
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
      setProjectId(project.id)

      await fetch('http://localhost:4001/api/agents/tasks', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        // We pass the selected model and context to the backend agent task
        body: JSON.stringify({ taskName: 'onboarding', projectId: project.id, brief: formData.brief, model: formData.model }) 
      })

      setTimeout(() => {
        setLoading(false)
        setStep(4)
      }, 1500) // mock delay for visual effect
      
    } catch(e: any) {
      console.error('API Error:', e)
      alert('Failed to connect to the Agentic Orchestrator backend. Check if the server is running.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] -z-10" />

      <motion.div 
        layout
        className="glass-card w-full max-w-3xl relative overflow-hidden bg-white/10 border-white/20 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3 text-primary">
                <FileText className="w-10 h-10" />
                <h2 className="text-4xl font-bold text-white tracking-tight">Project Identity</h2>
              </div>
              
              <p className="text-white/80 text-lg">Define the core concept of your real-world asset.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-white mb-2">Project Name</label>
                  <input 
                    type="text" 
                    className="glass-input w-full text-lg py-3 px-4 bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-primary focus:bg-white/20" 
                    placeholder="e.g., Solar Farm Alpha" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-white mb-2">Asset Vertical</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Tech', 'Físico', 'Impacto'].map(v => (
                      <button 
                        key={v}
                        onClick={() => setFormData({ ...formData, vertical: v })}
                        className={`glass-input !py-4 font-semibold text-lg transition-all ${formData.vertical === v ? 'ring-2 ring-primary bg-primary/40 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'text-white/70 hover:text-white hover:bg-white/20 bg-white/5 border-white/10'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.title}
                  className="glass-button flex items-center gap-2 text-lg px-8 py-3 bg-primary hover:bg-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
               <div className="flex items-center gap-3 text-purple-400">
                <Cpu className="w-10 h-10" />
                <h2 className="text-4xl font-bold text-white tracking-tight">Agentic Context</h2>
              </div>
              
              <p className="text-white/80 text-lg">Provide a summary and upload supporting documents. Our Orchestrator will analyze viability to generate the logical framework.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-white mb-2">Concept Note (Brief)</label>
                  <textarea 
                    rows={8}
                    className="glass-input w-full text-lg resize-none p-4 bg-white/10 text-white placeholder-white/40 border-white/20 focus:ring-purple-400 focus:bg-white/20" 
                    placeholder="Describe your asset, its goals, and why it qualifies for ACCET..." 
                    value={formData.brief}
                    onChange={e => setFormData({ ...formData, brief: e.target.value })}
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="block text-base font-semibold text-white">Supporting Documents</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/5 hover:bg-white/10 transition-colors relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".txt,.pdf,.docx" />
                    <UploadCloud className="w-10 h-10 text-white/60 mb-2" />
                    <p className="text-white/80 font-medium">Drag & drop files here</p>
                    <p className="text-white/50 text-sm mt-1">PDF, TXT, DOCX</p>
                  </div>
                  
                  {documents.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-sm font-semibold text-white/80">Uploaded Context:</h4>
                      {documents.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-sm text-white/90">
                           <File className="w-4 h-4 text-purple-400" />
                           <span className="truncate flex-1">{d.name}</span>
                           <span className="text-purple-300 font-mono text-xs">{d.tokens.toLocaleString()} tokens</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Token Context Manager */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Context Window Estimate</h4>
                  <span className="text-sm font-mono text-purple-300">{totalTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     className={`h-full ${tokenPercentage > 90 ? 'bg-red-500' : 'bg-purple-500'}`}
                     animate={{ width: `${tokenPercentage}%` }}
                   />
                </div>
                {tokenPercentage > 90 && (
                   <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Approaching context limit. Consider summarizing your documents.</p>
                )}
              </div>

              <div className="flex justify-between mt-2">
                <button onClick={() => setStep(1)} className="text-white/70 hover:text-white px-4 font-medium">Back</button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!formData.brief && documents.length === 0}
                  className="glass-button flex items-center gap-2 text-lg px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
               <div className="flex items-center gap-3 text-emerald-400">
                <Settings className="w-10 h-10" />
                <h2 className="text-4xl font-bold text-white tracking-tight">Model Configuration</h2>
              </div>
              
              <p className="text-white/80 text-lg">Select the AI model that will process your context and formulate the logical framework.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <button 
                    onClick={() => setFormData({ ...formData, model: 'claude-3-haiku-20240307' })}
                    className={`glass-card p-6 text-left transition-all ${formData.model === 'claude-3-haiku-20240307' ? 'ring-2 ring-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'hover:bg-white/10'}`}
                 >
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      Claude 3 Haiku 
                      {formData.model === 'claude-3-haiku-20240307' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    </h3>
                    <p className="text-white/60 text-sm">Ultra-fast processing for straightforward logical mapping and indicator extraction. Ideal for concise briefs.</p>
                 </button>
                 <button 
                    onClick={() => setFormData({ ...formData, model: 'claude-3-5-sonnet-20240620' })}
                    className={`glass-card p-6 text-left transition-all ${formData.model === 'claude-3-5-sonnet-20240620' ? 'ring-2 ring-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'hover:bg-white/10'}`}
                 >
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      Claude 3.5 Sonnet
                      {formData.model === 'claude-3-5-sonnet-20240620' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    </h3>
                    <p className="text-white/60 text-sm">Deep, nuanced analysis for highly complex assets with extensive uploaded documentation.</p>
                 </button>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(2)} className="text-white/70 hover:text-white px-4 font-medium">Back</button>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="glass-button flex items-center gap-2 text-lg px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <><Cpu className="w-5 h-5" /> Initiate Analysis</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-16 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white">Analysis Queued!</h2>
              <p className="text-white/70 max-w-lg text-lg">
                Your project data and documents have been dispatched to <strong>{formData.model}</strong>. 
                The AI is now structuring the logical framework and RACER indicators asynchronously.
              </p>

              <div className="mt-8">
                <a href={`/project/${projectId}`} className="glass-button bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-none text-lg px-8 py-3 font-semibold">
                  Go to Project Board
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
