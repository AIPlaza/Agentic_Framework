'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, CheckCircle2, ArrowRight, UploadCloud, File, Settings, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CinematicBackground from '@/app/components/auth/CinematicBackground';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>('demo-project-001');

  const [formData, setFormData] = useState({
    title: '',
    vertical: 'Tech',
    brief: '',
    model: 'claude-3-haiku-20240307'
  });

  const [documents, setDocuments] = useState<{ name: string; tokens: number }[]>([]);

  const textTokens = Math.ceil(formData.brief.split(/\s+/).length * 1.3);
  const docTokens = documents.reduce((acc, doc) => acc + doc.tokens, 0);
  const totalTokens = textTokens + docTokens;
  const maxTokens = 200000;
  const tokenPercentage = Math.min((totalTokens / maxTokens) * 100, 100);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDocuments([...documents, { name: file.name, tokens: Math.floor(Math.random() * 5000) + 1000 }]);
    }
  };

  async function handleSubmit() {
    setLoading(true);
    const newId = `proj-${Date.now()}`;
    setProjectId(newId);

    const projectPayload = {
      id: newId,
      title: formData.title || 'New RWA Project',
      description: formData.brief || 'Active Management project created via AI Onboarding.',
      vertical: formData.vertical,
      status: 'ACTIVE',
      devLevel: 2,
      documents: documents.map((d) => d.name),
      createdAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(`accet_project_${newId}`, JSON.stringify(projectPayload));
      localStorage.setItem('accet_latest_project', newId);
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const projRes = await fetch('http://localhost:4001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ id: newId, title: formData.title, description: formData.brief })
      });

      if (projRes.ok) {
        const created = await projRes.json();
        if (created.id) setProjectId(created.id);
      }

      await fetch('http://localhost:4001/api/agents/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          taskName: 'onboarding',
          projectId: newId,
          brief: formData.brief,
          model: formData.model
        })
      });
    } catch (e: any) {
      console.log('Project creation fallback to local storage:', e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 1000);
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Base Background Image */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#3866B3]"
      >
        <img 
          src="/images/accet-arq-main-1.JPG"
          alt="Archetype Background"
          className="w-full h-full object-cover opacity-25 blur-sm scale-105 saturate-50"
        />
        
        {/* Cinematic Vignette & Netflix Blur Overlays (Left-to-Right #3866B3) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3866B3] via-[#3866B3]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#162032_100%)] opacity-90" />
      </div>

      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-10" />

      <motion.div
        layout
        className="glass-blue-card w-full max-w-3xl relative overflow-hidden p-10 sm:p-14 rounded-[32px] z-20"
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: Project Identity */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <FileText className="w-5 h-5 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[11px] font-sans text-[#5EC8F2] uppercase tracking-[0.2em] font-semibold mb-1 block">
                    Step 01 / 03
                  </span>
                  <h2 className="text-3xl font-syne font-medium text-white tracking-tight">Project Identity</h2>
                </div>
              </div>

              <p className="text-slate-300 text-[15px] font-sans leading-relaxed max-w-2xl">
                Define the core concept and real-world asset (RWA) onboarding into the ACCET Active Management platform.
              </p>

              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] font-sans text-slate-400 uppercase tracking-widest mb-3 font-medium">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2]/50 transition-all font-sans outline-none text-[15px] shadow-inner"
                    placeholder="e.g. Clean Biogas & Agroindustrial Facility"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans text-slate-400 uppercase tracking-widest mb-3 font-medium">
                    Asset Class & Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Tech', label: 'Clean Energy & Tech' },
                      { id: 'Físico', label: 'Agro & Operations' },
                      { id: 'Impacto', label: 'Real Estate & Infra' }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setFormData({ ...formData, vertical: v.id })}
                        className={`py-4 px-4 rounded-xl font-sans text-[12px] uppercase tracking-wide font-medium transition-all border ${
                          formData.vertical === v.id
                            ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#050505] border-transparent shadow-[0_0_20px_rgba(94,200,242,0.3)]'
                            : 'bg-black/20 text-slate-300 border-white/5 hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!formData.title}
                  className="flex items-center px-8 py-3.5 rounded-full text-[13px] font-sans font-medium text-[#050505] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2 text-[#050505]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Agentic Context & Documents */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[11px] font-sans text-[#5EC8F2] uppercase tracking-[0.2em] font-semibold mb-1 block">
                    Step 02 / 03
                  </span>
                  <h2 className="text-3xl font-syne font-medium text-white tracking-tight">
                    AI Context & Documents
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-[15px] font-sans leading-relaxed">
                Provide executive summary notes or upload documentation. The AI agent will auto-generate 126 stories and RACER metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-sans text-slate-400 uppercase tracking-widest mb-3 font-medium">
                    Executive Project Brief
                  </label>
                  <textarea
                    rows={7}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-5 text-white placeholder-slate-500 focus:ring-1 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2]/50 transition-all font-sans outline-none resize-none text-[14px] leading-relaxed shadow-inner"
                    placeholder="Describe the asset, target production goals, quality standards, and milestone targets..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  />
                </div>

                <div className="space-y-5">
                  <label className="block text-[11px] font-sans text-slate-400 uppercase tracking-widest mb-3 font-medium">
                    Supporting Documents
                  </label>
                  <div className="border border-dashed border-white/20 hover:border-white/40 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-black/20 hover:bg-white/5 transition-all relative group cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                      accept=".txt,.pdf,.docx"
                    />
                    <UploadCloud className="w-6 h-6 text-slate-400 mb-3 group-hover:text-white transition-colors" />
                    <p className="text-slate-300 text-[12px] font-sans font-medium tracking-wide">
                      Drop files here or click to browse
                    </p>
                    <p className="text-slate-500 text-[11px] font-sans mt-2">PDF, TXT, DOCX (Max 50MB)</p>
                  </div>

                  {documents.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {documents.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-xl text-[13px] text-slate-300"
                        >
                          <File className="w-4 h-4 text-slate-400" />
                          <span className="truncate flex-1 font-sans">{d.name}</span>
                          <span className="text-slate-500 font-sans text-[11px]">
                            {d.tokens.toLocaleString()} tokens
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Token Context Manager */}
              <div className="bg-black/20 border border-white/5 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[11px] font-sans uppercase tracking-widest text-slate-400 font-medium">
                    Context Window Usage
                  </h4>
                  <span className="text-[11px] font-sans text-slate-400">
                    {totalTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      tokenPercentage > 90 ? 'bg-red-500/80' : 'bg-[#5EC8F2]/80'
                    }`}
                    animate={{ width: `${tokenPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white font-sans text-[12px] uppercase tracking-wide font-medium transition-colors"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.brief && documents.length === 0}
                  className="flex items-center px-8 py-3.5 rounded-full text-[13px] font-sans font-medium text-[#050505] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2 text-[#050505]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Model Configuration */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Settings className="w-5 h-5 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[11px] font-sans text-[#5EC8F2] uppercase tracking-[0.2em] font-semibold mb-1 block">
                    Step 03 / 03
                  </span>
                  <h2 className="text-3xl font-syne font-medium text-white tracking-tight">AI Engine Selection</h2>
                </div>
              </div>

              <p className="text-slate-300 text-[15px] font-sans leading-relaxed">
                Select the intelligence model to analyze your context and formulate 126 stories & RACER metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <button
                  onClick={() => setFormData({ ...formData, model: 'claude-3-haiku-20240307' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${
                    formData.model === 'claude-3-haiku-20240307'
                      ? 'bg-white/10 border-white/20'
                      : 'bg-black/20 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <h3 className="text-[15px] font-sans font-medium text-white mb-2 flex items-center justify-between">
                    Claude 3 Haiku
                    {formData.model === 'claude-3-haiku-20240307' && <CheckCircle2 className="w-4 h-4 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-400 text-[13px] font-sans leading-relaxed">
                    Ultra-fast response for instant logical mapping and metric generation.
                  </p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, model: 'claude-3-5-sonnet-20240620' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${
                    formData.model === 'claude-3-5-sonnet-20240620'
                      ? 'bg-white/10 border-white/20'
                      : 'bg-black/20 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <h3 className="text-[15px] font-sans font-medium text-white mb-2 flex items-center justify-between">
                    Claude 3.5 Sonnet
                    {formData.model === 'claude-3-5-sonnet-20240620' && <CheckCircle2 className="w-4 h-4 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-400 text-[13px] font-sans leading-relaxed">
                    Deep multi-document reasoning for complex assets and large datasets.
                  </p>
                </button>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-400 hover:text-white font-sans text-[12px] uppercase tracking-wide font-medium transition-colors"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="flex items-center px-8 py-3.5 rounded-full text-[13px] font-sans font-medium text-[#050505] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Initializing...' : 'Start AI Diagnosis'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Analysis Queued Modal */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-8 py-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8 text-[#5EC8F2]" />
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-sans text-slate-400 uppercase tracking-[0.3em] font-medium">
                  ORCHESTRATION TASK QUEUED
                </span>
                <h2 className="text-3xl font-sans font-medium text-white tracking-tight">
                  Project Analysis Scheduled
                </h2>
              </div>

              <p className="text-slate-400 max-w-md text-[14px] font-sans leading-relaxed">
                Project brief dispatched to <strong className="text-white font-medium">{formData.model}</strong>. The agent is generating the 126 stories, Results Chain, and RACER metrics.
              </p>

              <div className="pt-8">
                <button
                  onClick={() => (window.location.href = `/project/${projectId}`)}
                  className="flex items-center px-8 py-4 rounded-full text-[13px] font-sans font-medium text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                >
                  GO TO PROJECT STUDIO →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
