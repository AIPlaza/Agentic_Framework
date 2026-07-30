'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Mail, Lock, ArrowRight, X, CheckCircle2, KeyRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import NeuralButton from '@/app/components/ui/NeuralButton'
import LoginIntro from '@/app/components/auth/LoginIntro'

export default function LoginPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentOtp, setSentOtp] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Exclusive Access Check (matching accet-app pattern)
    const allowedDomains = ['gmail.com', 'accet.app', 'accet.io', 'tenant.accet']
    const domain = email.split('@')[1]?.toLowerCase()
    
    if (email.toLowerCase() !== 'accet.project@gmail.com' && !allowedDomains.includes(domain)) {
      setError('Acceso restringido al Workspace. Contacte a Tenant Admin.')
      setLoading(false)
      return
    }

    try {
      if (authMethod === 'password') {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (loginError) {
          setError(loginError.message === 'Invalid login credentials' ? 'Credenciales inválidas.' : loginError.message)
          setLoading(false)
        } else {
          router.push('/onboarding')
          router.refresh()
        }
      } else {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })

        if (otpError) {
          setError(otpError.message)
        } else {
          setSentOtp(true)
        }
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'Error de autenticación.')
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && <LoginIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen bg-[#020624] text-white overflow-hidden flex flex-col justify-between">
        
        {/* Background Overlays */}
        <div className="absolute inset-0 vignette pointer-events-none z-10" />
        <div className="absolute inset-0 grain pointer-events-none z-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5EC8F2]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#377D8C]/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Minimal Floating Header */}
        <header className="fixed top-0 left-0 w-full z-40 bg-[#020624]/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 p-1 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#5EC8F2]" />
            </div>
            <span className="font-bold text-white tracking-tight uppercase text-xs font-mono">
              ACCET Infrastructure
            </span>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="glass-platinum hover:bg-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all border border-white/20 shadow-lg cursor-pointer"
          >
            Conectar Identidad
          </button>
        </header>

        {/* Centered Hero Section */}
        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 pt-32 pb-20 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5EC8F2] px-4 py-2 bg-[#5EC8F2]/10 rounded-full border border-[#5EC8F2]/20">
                EMISIÓN PRIVADA · RONDA FRIENDS & FAMILY
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
              El puente entre el <span className="text-gradient">dinero global</span> y la riqueza del <span className="text-gradient">mundo real</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed">
              Una sola plataforma para que los grandes proyectos consigan financiamiento sin bancos, y los inversionistas compartan sus ganancias de forma directa, transparente y automática.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full glass-platinum hover:bg-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all border border-white/20 shadow-lg cursor-pointer"
            >
              Quiero invertir y ganar utilidades
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full glass hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all border border-white/10 cursor-pointer"
            >
              Tengo un proyecto, busco capital
            </button>
          </div>

          <div className="pt-6 max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400 font-sans">
            <ShieldCheck className="w-4 h-4 text-[#5EC8F2] shrink-0" />
            <span>Esta ronda es privada. Los contratos se firman de forma directa con el equipo fundador.</span>
          </div>

        </section>

        {/* Institutional Access Modal Form */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-[#020624]/85 backdrop-blur-md"
              />
              
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative w-full max-w-md glass-platinum p-6 xs:p-8 rounded-3xl border border-white/20 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#5EC8F2]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Acceso Institucional</h2>
                    <p className="text-xs text-white/50">Conexión directa con el entorno ACCET v2.0</p>
                  </div>
                </div>

                {/* Auth Method Selector */}
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10 mb-6">
                  <button
                    type="button"
                    onClick={() => { setAuthMethod('password'); setError(null) }}
                    className={`py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${authMethod === 'password' ? 'bg-[#5EC8F2] text-[#020624] font-bold shadow' : 'text-white/60 hover:text-white'}`}
                  >
                    <Lock className="w-3.5 h-3.5" /> Clave Secreta
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMethod('otp'); setError(null) }}
                    className={`py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${authMethod === 'otp' ? 'bg-[#5EC8F2] text-[#020624] font-bold shadow' : 'text-white/60 hover:text-white'}`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Magic Link (OTP)
                  </button>
                </div>

                {sentOtp ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 flex flex-col items-center text-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                    <h3 className="text-base font-semibold text-white">Revisa tu correo</h3>
                    <p className="text-white/70 text-xs">
                      Enviamos un enlace de acceso mágico a <strong>{email}</strong>. Haz clic para conectar tu identidad.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-1.5 font-bold">
                        Identidad / Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#020624]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none placeholder-slate-500 text-sm"
                        placeholder="originator@accet.app"
                        required
                      />
                    </div>

                    {authMethod === 'password' && (
                      <div>
                        <label className="block text-[10px] font-mono text-[#5EC8F2] uppercase tracking-widest mb-1.5 font-bold">
                          Frase Secreta / Clave
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#020624]/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all font-sans outline-none placeholder-slate-500 text-sm"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    )}

                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-lg bg-[#8B1A1A]/20 border border-[#8B1A1A]/40 text-[#FF7575] text-[11px] font-bold font-mono uppercase tracking-wider"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <NeuralButton
                      type="submit"
                      isLoading={loading}
                      className="w-full py-3.5 mt-2 !rounded-xl !bg-[#5EC8F2] !text-[#020624] hover:!bg-[#5ED7F2] font-bold transition-colors"
                    >
                      {authMethod === 'password' ? 'Establecer Conexión Segura' : 'Enviar Magic Link'}
                    </NeuralButton>
                  </form>
                )}

                <div className="mt-6 text-center text-[10px] font-mono text-slate-500 tracking-wider">
                  PROTECCIÓN DE ACTIVOS · BASE L2 · ACCET v2.0
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
