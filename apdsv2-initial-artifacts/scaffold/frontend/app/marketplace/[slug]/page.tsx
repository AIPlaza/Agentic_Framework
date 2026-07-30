'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, TrendingUp, Download, Eye, Layers, Activity, CheckCircle2, ChevronRight, PieChart } from 'lucide-react'

export default function MarketplaceFiche({ params }: { params: { slug: string } }) {
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
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-black text-white">
      
      {/* Marketplace Header */}
      <header className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono">
              FINANCIACIÓN NO VINCULADA A COSTES (FNVC / UE)
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-mono">
              ACCET VERIFIED RWA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Planta de Biogás & Granja Agroindustrial</h1>
          <p className="text-white/60 text-sm mt-1 max-w-2xl">
            Proyecto de producción limpia e inocuidad alimentaria respaldado por la norma ISO 9001:2008 y oráculos de telemetría IoT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-medium text-xs rounded-xl transition-all flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" /> Descargar One-Pager Legal
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Progress & Scenario Simulator */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Card */}
          <div className="glass-card p-6 md:p-8 space-y-6 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-white/50 uppercase tracking-wider font-mono">Financiación Activa (FNVC)</span>
                <div className="text-3xl md:text-4xl font-bold text-white mt-1 font-mono">$45,000 / $120,000 USD</div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-sm font-semibold">
                37.5% Financiado
              </span>
            </div>

            {/* Funding Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden relative p-0.5 border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '37.5%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-lg shadow-emerald-500/50"
                />
              </div>
              <div className="flex justify-between text-xs text-white/50 font-mono">
                <span>0.00% (Inicio)</span>
                <span>Hito #1 Alcanzado</span>
                <span>100.00% (Meta)</span>
              </div>
            </div>
          </div>

          {/* Scenario Simulator */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-400" /> Simulador de Rendimientos (3 Escenarios)
                </h2>
                <p className="text-xs text-white/50">Modelado predictivo basado en los indicadores RACER del proyecto</p>
              </div>
            </div>

            {/* Scenario Selector */}
            <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setScenario('conservative')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${scenario === 'conservative' ? 'bg-emerald-500 text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Conservador
              </button>
              <button 
                onClick={() => setScenario('base')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${scenario === 'base' ? 'bg-emerald-500 text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Base (Proyectado)
              </button>
              <button 
                onClick={() => setScenario('optimistic')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${scenario === 'optimistic' ? 'bg-emerald-500 text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Optimista
              </button>
            </div>

            {/* Scenario Metrics */}
            <motion.div key={scenario} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Retorno Anual Estimado (APY)</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{scenarioData[scenario].apy}</div>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Frecuencia de Desembolso</span>
                <div className="text-lg font-semibold text-white mt-1">{scenarioData[scenario].payoutTime}</div>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Nivel de Confianza IA</span>
                <div className="text-xs font-medium text-emerald-300 mt-1">{scenarioData[scenario].confidence}</div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Sidebar: Transparency Feed */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" /> Portal de Transparencia
          </h2>

          <div className="glass-card p-6 space-y-4">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block border-b border-white/10 pb-2">
              Historial de Auditoría en Tiempo Real
            </span>

            <div className="space-y-3">
              {transparencyFeed.map((item, idx) => (
                <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-emerald-400">{item.date}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-white/60 font-mono">{item.type}</span>
                  </div>
                  <p className="text-white/80">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
