'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Activity, Layers, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <div className="min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans">
      
      {/* Base Background Image with Netflix Effect */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#3866B3]">
        <img 
          src="/images/accet-arq-main-1.JPG"
          alt="Archetype Background"
          className="w-full h-full object-cover opacity-25 blur-sm scale-105 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3866B3] via-[#3866B3]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#162032_100%)] opacity-90" />
      </div>

      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center z-20"
      >
        <h1 className="text-5xl md:text-7xl font-syne font-medium tracking-tight mb-6 text-white">
          Intelligent Active Management
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Tokenize, audit, and manage real-world assets with an autonomous agentic framework. 
          Step into the future of verifiable impact and active management.
        </p>

        <Link href={`/${lang}/project/demo-project-001`}>
          <motion.button 
            whileHover={{ opacity: 0.9 }}
            className="flex items-center justify-center mx-auto gap-2 bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#050505] font-sans font-medium text-[13px] rounded-full px-8 py-3.5 transition-opacity"
          >
            Design Your Project
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full z-20">
        <FeatureCard 
          icon={<Layers className="w-8 h-8 text-[#5EC8F2]" />}
          title="Methodological Design"
          description="Build out logical frameworks with AI orchestration."
          delay={0.2}
        />
        <FeatureCard 
          icon={<Activity className="w-8 h-8 text-[#5EC8F2]" />}
          title="Active Tranches"
          description="Secure payouts linked to audited indicators and goals."
          delay={0.4}
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-8 h-8 text-[#5EC8F2]" />}
          title="Verified Oracles"
          description="Quality control via ISO 9001 standards and real-time feeds."
          delay={0.6}
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-blue-card p-8 flex flex-col items-center text-center group cursor-pointer"
    >
      <div className="bg-white/5 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-syne font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-300 font-sans text-[15px] leading-relaxed">{description}</p>
    </motion.div>
  )
}
