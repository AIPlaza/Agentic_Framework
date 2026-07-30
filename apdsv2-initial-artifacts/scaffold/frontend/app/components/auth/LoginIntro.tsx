'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const introSteps = [
  'INICIALIZANDO PROTOCOLOS RWA...',
  'CALIBRANDO MOTORES NEURALES...',
  'ESTABLECIENDO VÍNCULO SOBERANO...',
  'ACCESO RESTRINGIDO - VALIDANDO...',
]

export default function LoginIntro({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step < introSteps.length) {
      const timer = setTimeout(() => setStep(step + 1), 800)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 500)
    }
  }, [step, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0D0D0D] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="relative mb-12">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[#5EC8F2]/20 blur-3xl rounded-full"
        />
        <div className="relative w-24 h-24 border-2 border-[#5EC8F2]/20 border-t-[#5EC8F2] rounded-full animate-spin" />
      </div>

      <div className="h-8 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-[10px] font-bold font-mono text-[#5EC8F2] tracking-[0.4em] uppercase"
          >
            {introSteps[step] || 'READY'}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 3.2, ease: 'linear' }}
        className="mt-8 h-px bg-gradient-to-r from-transparent via-[#5EC8F2]/50 to-transparent" 
      />
    </motion.div>
  )
}
