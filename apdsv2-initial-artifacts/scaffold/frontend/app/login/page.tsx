'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CinematicBackground from '@/app/components/auth/CinematicBackground'
import LoginIntro from '@/app/components/auth/LoginIntro'
import NeuralButton from '@/app/components/ui/NeuralButton'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        setError(loginError.message === 'Invalid login credentials' ? 'Credenciales inválidas.' : loginError.message)
        setLoading(false)
        return
      }

      if (data.session) {
        // Give the SSR cookie a tick to propagate, then hard navigate
        await new Promise(resolve => setTimeout(resolve, 300))
        window.location.href = '/onboarding'
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#0D0D0D] overflow-hidden">
      {/* Cinematic Background Engine */}
      <CinematicBackground />

      <AnimatePresence>
        {!showForm ? (
          <LoginIntro key="intro" onComplete={() => setShowForm(true)} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-20 w-full max-w-md"
          >
            {/* Cinematic Overlays */}
            <div className="fixed inset-0 vignette pointer-events-none z-10" />
            <div className="fixed inset-0 grain pointer-events-none z-0" />

            <div className="flex flex-col items-center mb-12">
              <Image 
                src="/logo.png" 
                alt="ACCET" 
                width={80} 
                height={80} 
                className="mb-6 rounded-2xl bg-[#5EC8F2]/20 p-2 shadow-[0_0_30px_rgba(94,200,242,0.2)]"
                priority
              />
              <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                ACCET<span className="text-[#5EC8F2]">.</span>
              </h1>
              <p className="font-mono text-[10px] text-[#5EC8F2]/60 tracking-[4px] uppercase font-bold">
                Tokenization Engine
              </p>
            </div>

            <motion.div 
              animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="glass-platinum p-8 rounded-3xl relative overflow-hidden"
            >
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight font-mono">Iniciar Sesión</h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-black">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all outline-none font-medium"
                    placeholder="accet.project@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-black">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all outline-none font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-lg bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 text-[#FF7575] text-[11px] font-bold font-mono uppercase tracking-wider"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <NeuralButton
                  type="submit"
                  isLoading={loading}
                  className="w-full py-4 mt-2"
                >
                  Entrar — Access Gate
                </NeuralButton>
              </form>
            </motion.div>

            <div className="mt-8 text-center text-[10px] font-mono text-slate-600 tracking-wider font-bold">
              PROTECCIÓN DE ACTIVOS · BASE L2 · ACCET v1.0.7
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
