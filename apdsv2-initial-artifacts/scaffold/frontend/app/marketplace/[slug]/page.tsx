'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, TrendingUp, Download, Eye, Layers, Activity, CheckCircle2, ChevronRight, PieChart } from 'lucide-react'

export default function MarketplaceFiche({ params }: { params: any }) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params
  const [scenario, setScenario] = useState<'conservative' | 'base' | 'optimistic'>('base')

  const scenarioData = {
    conservative: { apy: '11.5%', payoutTime: 'Trimestral', confidence: '99.2% (Baja volatilidad)' },
    base: { apy: '16.8%', payoutTime: 'Trimestral', confidence: '94.5% (Escenario Proyectado IA)' },
    optimistic: { apy: '22.4%', payoutTime: 'Trimestral', confidence: '82.0% (Capacidad máxima)' }
  }

  const transparencyFeed = [
    { date: 'Hoy, 14:30', event: 'Desembolso FNVC $12,500 USD ejecutado por Smart Contract', type: 'PAYOUT' },
    { date: 'Ayer, 18:00', event: 'Informe TPA (Anexo VII-B) firmado por Tercero Evaluador', type: 'AUDIT' },
    { date: '29 Jul, 10:15', event: 'Sensor IoT-TEMP-9982 registró 100% inocuidad en cadena de frío', type: 'IOT' },
    { date: '28 Jul, 09:00', event: 'Checklist BDO Diario validado con Cero Defectos', type: 'CHECKLIST' }
  ]

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-[#020624] text-white relative overflow-hidden">
      
      {/* Background Overlays */}
      <div className="fixed inset-0 vignette pointer-events-none z-10" />
      <div className="fixed inset-0 grain pointer-events-none z-0" />
      <div className="fixed top-0 left-0 right-0 h-[3px] signature-line z-50" />

      {/* Marketplace Header */}
      <header className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-20">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
              FINANCIACIÓN NO VINCULADA A COSTES (FNVC / UE)
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-mono font-bold">
              ACCET VERIFIED RWA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">Planta de Biogás & Granja Agroindustrial</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            Proyecto de producción limpia e inocuidad alimentaria respaldado por la norma ISO 9001:2008 y oráculos de telemetría IoT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-3 bg-black/40 hover:bg-white/10 text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2">
            <Download className="w-4 h-4 text-[#5EC8F2]" /> Descargar One-Pager Legal
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
        
        {/* Left Column: Progress & Scenario Simulator */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Card */}
          <div className="dark-section-card p-6 md:p-8 space-y-6 border-l-4 border-l-[#5EC8F2]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Financiación Activa (FNVC)</span>
                <div className="text-3xl md:text-4xl font-bold text-white mt-1 font-mono">$45,000 / $120,000 USD</div>
              </div>
              <span className="px-3.5 py-1 bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 rounded-full text-xs font-mono font-bold">
                37.5% Financiado
              </span>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/10 rounded-full h-3.5 overflow-hidden relative p-0.5 border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '37.5%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] rounded-full shadow-[0_0_15px_rgba(94,200,242,0.5)]"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0.00% (Inicio)</span>
                <span>Hito #1 Alcanzado</span>
                <span>100.00% (Meta)</span>
              </div>
            </div>
          </div>

          {/* Scenario Simulator */}
          <div className="glass-platinum p-6 md:p-8 space-y-6 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#5EC8F2]" /> Simulador de Rendimientos (3 Escenarios)
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">Modelado predictivo basado en los indicadores RACER del proyecto</p>
              </div>
            </div>

            {/* Scenario Selector */}
            <div className="grid grid-cols-3 gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 font-mono">
              <button 
                onClick={() => setScenario('conservative')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${scenario === 'conservative' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Conservador
              </button>
              <button 
                onClick={() => setScenario('base')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${scenario === 'base' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Base (Proyectado)
              </button>
              <button 
                onClick={() => setScenario('optimistic')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${scenario === 'optimistic' ? 'bg-[#5EC8F2] text-[#020624] shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Optimista
              </button>
            </div>

            {/* Scenario Metrics */}
            <motion.div key={scenario} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Retorno Anual Estimado (APY)</span>
                <div className="text-2xl font-bold text-[#5EC8F2] font-mono">{scenarioData[scenario].apy}</div>
              </div>
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Frecuencia de Desembolso</span>
                <div className="text-base font-semibold text-white mt-1 font-sans">{scenarioData[scenario].payoutTime}</div>
              </div>
              <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Nivel de Confianza IA</span>
                <div className="text-xs font-mono font-bold text-[#5ED7F2] mt-1">{scenarioData[scenario].confidence}</div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Sidebar: Transparency Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#5EC8F2]" /> Portal de Transparencia
          </h2>

          <div className="glass-platinum p-6 rounded-2xl space-y-4">
            <span className="text-xs font-mono font-bold text-[#5EC8F2] uppercase tracking-wider block border-b border-white/10 pb-2">
              Historial de Auditoría en Tiempo Real
            </span>

            <div className="space-y-3">
              {transparencyFeed.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-black/50 border border-white/10 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#5EC8F2] font-bold">{item.date}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-white/10 text-white/80 font-mono font-bold">{item.type}</span>
                  </div>
                  <p className="text-slate-300 font-sans">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
