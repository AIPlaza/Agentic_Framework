'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Activity, Layers, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Intelligent Active Management
        </h1>
        <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
          Tokenize, audit, and manage real-world assets with an autonomous agentic framework. 
          Step into the future of verifiable impact and active management.
        </p>

        <Link href="/onboarding">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button text-lg flex items-center justify-center mx-auto gap-2 group"
          >
            Design Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
        <FeatureCard 
          icon={<Layers className="w-8 h-8 text-primary" />}
          title="Methodological Design"
          description="Build out logical frameworks with AI orchestration."
          delay={0.2}
        />
        <FeatureCard 
          icon={<Activity className="w-8 h-8 text-purple-400" />}
          title="Active Tranches"
          description="Secure payouts linked to audited indicators and goals."
          delay={0.4}
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
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
      className="glass-card flex flex-col items-center text-center group cursor-pointer"
    >
      <div className="bg-white/5 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white/90 mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </motion.div>
  )
}
