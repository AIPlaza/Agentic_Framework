'use client'

import { useState } from 'react'
import { Check, X, ShieldAlert, DollarSign } from 'lucide-react'

export function RACERTable({ indicators, projectId }: { indicators: any[], projectId: string }) {
  const [data, setData] = useState(indicators || [])

  const toggleFNVC = async (id: string, currentVal: boolean) => {
    const updated = data.map(ind => ind.id === id ? { ...ind, fnvcEligible: !currentVal } : ind)
    setData(updated)
  }

  const updateUSD = async (id: string, value: string) => {
    const updated = data.map(ind => ind.id === id ? { ...ind, usdValue: Number(value) } : ind)
    setData(updated)
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-8 bg-black/40 rounded-2xl border border-white/10">
        <ShieldAlert className="w-8 h-8 text-[#5EC8F2]/40 mx-auto mb-2" />
        <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">No se encontraron indicadores RACER. Generando métricas...</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-200">
        <thead className="text-[10px] font-mono uppercase tracking-widest bg-black/60 text-[#5EC8F2] border-b border-white/10">
          <tr>
            <th className="px-5 py-4 rounded-tl-xl font-bold">Indicador (RACER)</th>
            <th className="px-5 py-4 font-bold">Fuente de Verificación</th>
            <th className="px-5 py-4 text-center font-bold">Elegible FNVC</th>
            <th className="px-5 py-4 rounded-tr-xl font-bold">Desembolso (USD)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((ind, i) => (
            <tr key={ind.id || i} className="hover:bg-white/5 transition-colors">
              <td className="px-5 py-4 font-sans font-medium text-white">
                {ind.name}
                <div className="text-[11px] font-mono text-slate-400 mt-1">Meta: {ind.target}</div>
              </td>
              <td className="px-5 py-4 font-mono text-xs text-[#5EC8F2]">
                {ind.verificationSource || 'Informe Auditoría TPA (Anexo VII-B)'}
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleFNVC(ind.id, ind.fnvcEligible)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${ind.fnvcEligible ? 'bg-[#5EC8F2]' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-[#020624] absolute top-1 transition-transform ${ind.fnvcEligible ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="relative group max-w-[160px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-slate-400 group-focus-within:text-[#5EC8F2] transition-colors" />
                  </div>
                  <input
                    type="number"
                    disabled={!ind.fnvcEligible}
                    value={ind.usdValue || ''}
                    onChange={(e) => updateUSD(ind.id, e.target.value)}
                    className="w-full bg-black/50 border border-white/15 text-white font-mono text-xs rounded-xl py-2 pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2] transition-all disabled:opacity-30"
                    placeholder="0.00"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
