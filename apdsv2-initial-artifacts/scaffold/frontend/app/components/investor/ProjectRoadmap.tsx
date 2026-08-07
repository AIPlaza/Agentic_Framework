'use client';

import React from 'react';
import { Target, Server, Landmark, BadgeDollarSign, Rocket, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectRoadmap() {
  const axes = [
    {
      id: 'tech',
      title: 'Tecnológico',
      icon: <Server className="w-5 h-5" />,
      color: 'from-[#5EC8F2] to-blue-500',
      progress: 75,
      milestones: [
        { title: 'MVP Dashboard Inversor', status: 'completed', date: 'Q3 2026' },
        { title: 'Integración Filecoin (FVM)', status: 'in-progress', date: 'Q4 2026' },
        { title: 'Graphiti SSOT Agents', status: 'pending', date: 'Q1 2027' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & Cumplimiento',
      icon: <Landmark className="w-5 h-5" />,
      color: 'from-emerald-400 to-teal-500',
      progress: 100,
      milestones: [
        { title: 'Constitución SPVs (Venezuela)', status: 'completed', date: 'Q2 2026' },
        { title: 'Contrato RBF Auditado', status: 'completed', date: 'Q3 2026' },
        { title: 'Cumplimiento AML Anexo 2', status: 'completed', date: 'Q3 2026' }
      ]
    },
    {
      id: 'financial',
      title: 'Financiero',
      icon: <BadgeDollarSign className="w-5 h-5" />,
      color: 'from-amber-400 to-orange-500',
      progress: 40,
      milestones: [
        { title: 'Ronda Pre-Semilla RBF ($100k)', status: 'in-progress', date: 'Q3 2026' },
        { title: 'Grants & Fundaciones', status: 'pending', date: 'Q4 2026' },
        { title: 'Apertura Inversión Minorista ($100)', status: 'pending', date: 'Q1 2027' }
      ]
    },
    {
      id: 'commercial',
      title: 'Comercial',
      icon: <Target className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-500',
      progress: 60,
      milestones: [
        { title: 'Estrategia Hot Sale', status: 'completed', date: 'Q3 2026' },
        { title: 'Cierre Proyecto Piloto (ACCET)', status: 'in-progress', date: 'Q3 2026' },
        { title: 'Listado Proyecto Biogás', status: 'pending', date: 'Q4 2026' }
      ]
    },
    {
      id: 'operational',
      title: 'Operativo',
      icon: <Rocket className="w-5 h-5" />,
      color: 'from-rose-400 to-red-500',
      progress: 30,
      milestones: [
        { title: 'Despliegue Motor Plataforma', status: 'completed', date: 'Q3 2026' },
        { title: 'Integración Motor Factoring', status: 'in-progress', date: 'Q4 2026' },
        { title: 'Motor Administradora Automatizado', status: 'pending', date: 'Q1 2027' }
      ]
    }
  ];

  return (
    <div className="glass-blue-card p-6 md:p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-syne text-white font-bold tracking-wide">Project Roadmap</h2>
          <p className="text-slate-400 text-sm font-sans mt-1">Evolución de los 5 Ejes Fundamentales (SSOT)</p>
        </div>
        <div className="px-4 py-2 bg-[#5EC8F2]/10 border border-[#5EC8F2]/20 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EC8F2] animate-pulse" />
          <span className="text-[#5EC8F2] text-xs font-semibold tracking-wide">FASE ACTUAL: PRE-SEMILLA RBF</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {axes.map((axis) => (
          <div key={axis.id} className="space-y-6">
            {/* Axis Header */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${axis.color} bg-opacity-20`}>
                <div className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {axis.icon}
                </div>
              </div>
              <div>
                <h3 className="text-white font-sans font-semibold text-[15px]">{axis.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-16 h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${axis.color}`}
                      style={{ width: `${axis.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{axis.progress}%</span>
                </div>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="relative pl-4 border-l border-white/10 space-y-6">
              {axis.milestones.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[21px] w-2.5 h-2.5 rounded-full border-2 ${
                    milestone.status === 'completed' ? 'bg-[#5EC8F2] border-[#5EC8F2]' :
                    milestone.status === 'in-progress' ? 'bg-amber-400 border-amber-400 animate-pulse' :
                    'bg-black border-white/20'
                  }`} />
                  
                  <div className="pl-4">
                    <p className={`text-xs font-mono mb-1 ${
                      milestone.status === 'completed' ? 'text-[#5EC8F2]' :
                      milestone.status === 'in-progress' ? 'text-amber-400' :
                      'text-slate-500'
                    }`}>
                      {milestone.date}
                    </p>
                    <h4 className={`text-sm font-sans ${
                      milestone.status === 'completed' ? 'text-white' :
                      milestone.status === 'in-progress' ? 'text-white font-medium' :
                      'text-slate-400'
                    }`}>
                      {milestone.title}
                    </h4>
                    {milestone.status === 'completed' && (
                      <div className="flex items-center gap-1 mt-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-wider">Verificado</span>
                      </div>
                    )}
                    {milestone.status === 'in-progress' && (
                      <div className="flex items-center gap-1 mt-1 text-amber-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-wider">En Ejecución</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
