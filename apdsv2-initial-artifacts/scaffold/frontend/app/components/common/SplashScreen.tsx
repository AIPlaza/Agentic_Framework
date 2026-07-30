'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4500)

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 35)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 vignette pointer-events-none z-10 opacity-70" />
      <div className="absolute inset-0 grain pointer-events-none z-[1] opacity-50" />
      
      {/* Signature line at top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] signature-line z-[10000]" />

      {/* Decorative large CC watermark */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 text-[440px] font-black text-[#5EC8F2]/[0.03] select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-syne)' }}>
        CC
      </div>

      <div className="relative z-20 flex flex-col items-center gap-10" style={{ animation: 'fade-in-zoom 2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div className="relative group">
          <Image 
            src="/logo.png" 
            alt="ACCET Logo" 
            width={140} 
            height={140} 
            className="transition-transform duration-1000"
            priority
          />
          {/* Glowing atmosphere rings */}
          <div className="absolute inset-[-30px] rounded-full border border-[#5EC8F2]/10 blur-2xl group-hover:border-[#5EC8F2]/20 transition-all duration-1000" />
          <div className="absolute inset-[-15px] rounded-full border border-[#5EC8F2]/5" style={{ animation: 'ping 3s linear infinite' }} />
        </div>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="overflow-hidden">
            <p className="font-mono text-[10px] tracking-[6px] text-[#5EC8F2]/40 uppercase" style={{ animation: 'slide-up 1s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
              APDS · Platform v2.0
            </p>
          </div>
          
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none" style={{ fontFamily: 'var(--font-syne)' }}>
            ACCET <span className="text-[#5EC8F2]">TOKENIZER</span>
          </h1>
          
          <p className="font-mono text-[9px] tracking-[8px] text-[#5EC8F2]/20 uppercase mt-2">
            Base L2 Network · RWA Engine
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-72 h-[2px] bg-white/5 rounded-full overflow-hidden relative mt-4">
          <div 
            className="absolute inset-y-0 left-0 bg-[#5EC8F2] transition-all duration-150 ease-out"
            style={{ width: `${progress}%`, boxShadow: '0 0 15px rgba(94,200,242,0.6)' }}
          />
        </div>
      </div>

      {/* Status caption */}
      <div className="absolute bottom-16 px-8 py-3 bg-black/60 backdrop-blur-xl border border-white/5 rounded-full text-white/40 font-mono text-[9px] tracking-widest uppercase"
        style={{ animation: 'fade-in 1.5s ease-out 1s both' }}>
        <span className="text-[#5EC8F2]/60 mr-2">Status:</span> INITIALIZING COMPLIANCE PROTOCOL [APDS-v2.0]...
      </div>

      <style>{`
        @keyframes fade-in-zoom {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
