import { Router, Request, Response } from 'express'
import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const router = Router()
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const payoutQueue = new Queue('payout-tasks', { connection })

// Mock in-memory TPA reports store for verification
const pendingReports = [
  {
    id: 'rep-101',
    projectId: 'proj-demo',
    projectTitle: 'Planta de Biogás & Granja Agroindustrial',
    milestone: 'Hito #2 - Operatividad de Compresor & Estándar BDO',
    indicatorName: 'Disminución Mermas > 15%',
    payoutUsd: 12500,
    source: 'Checklist BDO #2026-07-29 & Oráculo IoT',
    submittedAt: '2026-07-29T18:00:00Z',
    status: 'PENDING_APPROVAL'
  },
  {
    id: 'rep-102',
    projectId: 'proj-demo-2',
    projectTitle: 'Logística de Cadena de Frío P2P',
    milestone: 'Hito #1 - Monitoreo Rango Temperatura 2-4°C (30 días)',
    indicatorName: 'Cero Rompimiento de Cadena de Frío',
    payoutUsd: 8000,
    source: 'Oráculo IoT-TEMP-9982',
    submittedAt: '2026-07-30T10:30:00Z',
    status: 'PENDING_APPROVAL'
  }
]

// GET /api/evaluator/pending-reports
router.get('/pending-reports', (req: Request, res: Response) => {
  return res.json({ reports: pendingReports })
})

// POST /api/evaluator/reports/:id/approve
router.post('/reports/:id/approve', async (req: Request, res: Response) => {
  const { id } = req.params
  const report = pendingReports.find(r => r.id === id)

  if (!report) {
    return res.status(404).json({ error: 'Report not found' })
  }

  report.status = 'APPROVED'

  // Enqueue Payout Job to Smart Contract / Escrow Worker
  await payoutQueue.add('trigger-fnvc-payout', {
    reportId: report.id,
    projectId: report.projectId,
    payoutUsd: report.payoutUsd,
    approvedBy: 'TPA-Auditor-Anexo-VII-B'
  })

  console.log(`[TPA Approved] Report ${id} approved for $${report.payoutUsd} USD payout via FNVC`)

  return res.json({ 
    success: true, 
    message: 'Report approved by Third-Party Evaluator (Anexo VII-B). FNVC payout triggered programmatically.',
    report 
  })
})

export default router
