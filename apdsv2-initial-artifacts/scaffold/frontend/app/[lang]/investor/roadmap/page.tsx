import React from 'react';
import ProjectRoadmap from '../../../components/investor/ProjectRoadmap';

export default function InvestorRoadmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 animate-fade-in relative z-10">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-syne text-white font-bold tracking-wider">
          Roadmap & Proyecto
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-sans max-w-2xl">
          Visualiza el avance integral del ecosistema ACCET a través de sus 5 ejes de ejecución. Fuente única de verdad certificada.
        </p>
      </div>

      <div className="mt-8">
        <ProjectRoadmap />
      </div>
    </div>
  );
}
