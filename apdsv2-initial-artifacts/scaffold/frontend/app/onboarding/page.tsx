'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, CheckCircle2, ArrowRight, UploadCloud, File, Settings, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import NeuralButton from '@/app/components/ui/NeuralButton';
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

    // Store in localStorage for fail-safe instant frontend retrieval
    if (typeof window !== 'undefined') {
      localStorage.setItem(`accet_project_${newId}`, JSON.stringify(projectPayload));
      localStorage.setItem('accet_latest_project', newId);
    }

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const projRes = await fetch('http://localhost:4001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
    <div className="min-h-screen bg-[#020624] text-white flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <CinematicBackground />
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />
      <div className="fixed top-0 left-0 right-0 h-[3px] signature-line z-50" />

      <motion.div
        layout
        className="glass-platinum w-full max-w-3xl relative overflow-hidden p-8 sm:p-12 rounded-3xl z-20 border border-white/20 shadow-2xl bg-[#020624]/80 backdrop-blur-2xl"
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
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/20 border border-[#5EC8F2]/40 flex items-center justify-center text-[#5EC8F2] shadow-[0_0_20px_rgba(94,200,242,0.3)]">
                  <FileText className="w-6 h-6 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">
                    Step 01 / 03
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">Project Identity</h2>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
                Define the core concept and real-world asset (RWA) onboarding into the ACCET Active Management platform.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-bold">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none text-base"
                    placeholder="e.g. Clean Biogas & Agroindustrial Facility"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-bold">
                    Asset Class & Category
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Tech', label: 'Clean Energy & Tech' },
                      { id: 'Físico', label: 'Agro & Operations' },
                      { id: 'Impacto', label: 'Real Estate & Infra' }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setFormData({ ...formData, vertical: v.id })}
                        className={`py-3.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all border ${
                          formData.vertical === v.id
                            ? 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#020624] border-[#5EC8F2] shadow-[0_0_25px_rgba(94,200,242,0.4)] font-bold'
                            : 'bg-black/30 text-white border-white/15 hover:border-white/40 hover:bg-white/10'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <NeuralButton onClick={() => setStep(2)} disabled={!formData.title}>
                  Continue <ArrowRight className="w-4 h-4 ml-1 text-[#020624]" />
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
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/20 border border-[#5EC8F2]/40 flex items-center justify-center text-[#5EC8F2] shadow-[0_0_20px_rgba(94,200,242,0.3)]">
                  <Cpu className="w-6 h-6 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">
                    Step 02 / 03
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">
                    AI Context & Documents
                  </h2>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
                Provide executive summary notes or upload documentation. The AI agent will auto-generate 126 stories and RACER metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-bold">
                    Executive Project Brief
                  </label>
                  <textarea
                    rows={7}
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none resize-none text-sm leading-relaxed"
                    placeholder="Describe the asset, target production goals, quality standards, and milestone targets..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-2 font-bold">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-white/25 hover:border-[#5EC8F2] rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-black/30 hover:bg-white/10 transition-all relative group cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                      accept=".txt,.pdf,.docx"
                    />
                    <UploadCloud className="w-8 h-8 text-[#5EC8F2] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white text-xs font-mono font-bold uppercase tracking-wider">
                      Drop files here or click to browse
                    </p>
                    <p className="text-slate-300 text-[10px] font-mono mt-1">PDF, TXT, DOCX (Max 50MB)</p>
                  </div>

                  {documents.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Attached Context:
                      </h4>
                      {documents.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-black/50 border border-white/15 p-2.5 rounded-xl text-xs text-white"
                        >
                          <File className="w-4 h-4 text-[#5EC8F2]" />
                          <span className="truncate flex-1 font-sans">{d.name}</span>
                          <span className="text-[#5EC8F2] font-mono text-[10px] font-bold">
                            {d.tokens.toLocaleString()} tokens
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Token Context Manager */}
              <div className="bg-black/50 border border-white/15 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                    Context Window Usage
                  </h4>
                  <span className="text-xs font-mono text-[#5EC8F2] font-bold">
                    {totalTokens.toLocaleString()} / {maxTokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      tokenPercentage > 90 ? 'bg-[#8B1A1A]' : 'bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]'
                    }`}
                    animate={{ width: `${tokenPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold"
                >
                  ← Back
                </button>
                <NeuralButton onClick={() => setStep(3)} disabled={!formData.brief && documents.length === 0}>
                  Continue <ArrowRight className="w-4 h-4 ml-1 text-[#020624]" />
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
                <div className="w-12 h-12 rounded-2xl bg-[#5EC8F2]/20 border border-[#5EC8F2]/40 flex items-center justify-center text-[#5EC8F2] shadow-[0_0_20px_rgba(94,200,242,0.3)]">
                  <Settings className="w-6 h-6 text-[#5EC8F2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.3em] font-bold">
                    Step 03 / 03
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-syne font-bold text-white tracking-tight">AI Engine Selection</h2>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
                Select the intelligence model to analyze your context and formulate 126 stories & RACER metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, model: 'claude-3-haiku-20240307' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${
                    formData.model === 'claude-3-haiku-20240307'
                      ? 'bg-[#5EC8F2]/20 border-[#5EC8F2] shadow-[0_0_30px_rgba(94,200,242,0.3)] font-bold'
                      : 'bg-black/30 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <h3 className="text-lg font-syne font-bold text-white mb-2 flex items-center justify-between">
                    Claude 3 Haiku
                    {formData.model === 'claude-3-haiku-20240307' && <CheckCircle2 className="w-5 h-5 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    Ultra-fast response for instant logical mapping and metric generation.
                  </p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, model: 'claude-3-5-sonnet-20240620' })}
                  className={`p-6 text-left rounded-2xl transition-all border ${
                    formData.model === 'claude-3-5-sonnet-20240620'
                      ? 'bg-[#5EC8F2]/20 border-[#5EC8F2] shadow-[0_0_30px_rgba(94,200,242,0.3)] font-bold'
                      : 'bg-black/30 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <h3 className="text-lg font-syne font-bold text-white mb-2 flex items-center justify-between">
                    Claude 3.5 Sonnet
                    {formData.model === 'claude-3-5-sonnet-20240620' && <CheckCircle2 className="w-5 h-5 text-[#5EC8F2]" />}
                  </h3>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    Deep multi-document reasoning for complex assets and large datasets.
                  </p>
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold"
                >
                  ← Back
                </button>
                <NeuralButton onClick={handleSubmit} isLoading={loading}>
                  {loading ? 'Initializing...' : 'Start AI Diagnosis'}
                </NeuralButton>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Analysis Queued Modal */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                className="relative group mb-2"
              >
                <div className="w-24 h-24 rounded-3xl bg-[#5EC8F2]/20 border border-[#5EC8F2]/50 flex items-center justify-center shadow-[0_0_40px_rgba(94,200,242,0.4)]">
                  <ShieldCheck className="w-12 h-12 text-[#5EC8F2]" />
                </div>
                <div className="absolute inset-[-15px] rounded-3xl border border-[#5EC8F2]/20 blur-xl pointer-events-none" />
              </motion.div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#5EC8F2] uppercase tracking-[0.4em] font-bold">
                  ORCHESTRATION TASK QUEUED
                </span>
                <h2 className="text-4xl sm:text-5xl font-syne font-black text-white tracking-tight">
                  Project Analysis Scheduled!
                </h2>
              </div>

              <p className="text-slate-200 max-w-lg text-sm sm:text-base font-sans leading-relaxed">
                Project brief dispatched to <strong className="font-mono text-[#5EC8F2]">{formData.model}</strong>. The agent is generating the 126 stories, Results Chain, and RACER metrics.
              </p>

              <div className="pt-6">
                <NeuralButton
                  onClick={() => (window.location.href = `/project/${projectId}`)}
                  className="px-10 py-4 text-sm font-syne"
                >
                  GO TO PROJECT STUDIO →
                </NeuralButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
