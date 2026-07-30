'use client'

import { useState } from 'react'
import { Check, X, ShieldAlert, DollarSign } from 'lucide-react'

export function RACERTable({ indicators, projectId }: { indicators: any[], projectId: string }) {
  const [data, setData] = useState(indicators || [])

  const toggleFNVC = async (id: string, currentVal: boolean) => {
    // Optimistic UI update
    const updated = data.map(ind => ind.id === id ? { ...ind, fnvcEligible: !currentVal } : ind)
    setData(updated)

    // TODO: Call API to update indicator in DB
  }

  const updateUSD = async (id: string, value: string) => {
    const updated = data.map(ind => ind.id === id ? { ...ind, usdValue: Number(value) } : ind)
    setData(updated)

    // TODO: Call API to update indicator USD in DB
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
        <ShieldAlert className="w-8 h-8 text-white/30 mx-auto mb-2" />
        <p className="text-white/50">No indicators assigned yet. AI is generating RACER metrics.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-white/80">
        <thead className="text-xs uppercase bg-white/5 text-white/50">
          <tr>
            <th className="px-4 py-3 rounded-tl-lg">Indicator (RACER)</th>
            <th className="px-4 py-3">Source of Verification</th>
            <th className="px-4 py-3 text-center">FNVC Eligible</th>
            <th className="px-4 py-3 rounded-tr-lg">Payout (USD)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ind, i) => (
            <tr key={ind.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-4 py-4 font-medium text-white/90">
                {ind.name}
                <div className="text-xs text-white/40 mt-1">Target: {ind.target}</div>
              </td>
              <td className="px-4 py-4 text-emerald-400">
                {ind.verificationSource || 'TPA Audit Report'}
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleFNVC(ind.id, ind.fnvcEligible)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${ind.fnvcEligible ? 'bg-emerald-500' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${ind.fnvcEligible ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-white/40 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="number"
                    disabled={!ind.fnvcEligible}
                    value={ind.usdValue || ''}
                    onChange={(e) => updateUSD(ind.id, e.target.value)}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-30"
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
