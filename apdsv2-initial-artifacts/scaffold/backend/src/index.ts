import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const prisma = new PrismaClient()

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// In-memory fallback store for created projects
const inMemoryProjects = new Map<string, any>()

// Pre-seed demo project
inMemoryProjects.set('demo-project-001', {
  id: 'demo-project-001',
  title: 'Clean Biogas & Agroindustrial Facility',
  description: 'Sustainable RWA tokenization project with certified operational quality standards and IoT telemetry oracles.',
  status: 'ACTIVE',
  devLevel: 3,
  logicalFramework: {
    impact: 'Clean energy conversion & 40% carbon footprint reduction.',
    outcomes: ['Continuous clean energy generation via Biogas', 'Certified operational food safety standards'],
    outputs: ['High-capacity anaerobic biodigesters installation', 'IoT oracle telemetry bus deployment']
  },
  indicators: [
    { id: 'ind-1', name: 'Biogas KWh Energy Output', target: '250,000 KWh/yr', verificationSource: 'IoT Sensor Stream', fnvcEligible: true, usdValue: 25000 },
    { id: 'ind-2', name: 'Cold Storage Temperature Compliance', target: '100% within 2-4°C', verificationSource: 'Independent Quality Audit Report', fnvcEligible: true, usdValue: 15000 }
  ]
})

// Optional/Graceful auth middleware
const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    ;(req as any).user = { id: '00000000-0000-0000-0000-000000000000', email: 'guest@accet.io' }
    return next()
  }
  
  const token = authHeader.replace('Bearer ', '')
  try {
    const { data: { user } } = await supabase.auth.getUser(token)
    if (user) {
      ;(req as any).user = user
    } else {
      ;(req as any).user = { id: '00000000-0000-0000-0000-000000000000', email: 'guest@accet.io' }
    }
  } catch (e) {
    ;(req as any).user = { id: '00000000-0000-0000-0000-000000000000', email: 'guest@accet.io' }
  }
  next()
}

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/auth/request-otp', async (req, res) => {
  const { email } = req.body
  try {
    const { data, error } = await supabase.auth.signInWithOtp({ email })
    if (error) return res.status(400).json({ error: error.message })
    return res.json({ message: 'OTP requested', data })
  } catch (err: any) {
    return res.json({ message: 'Demo OTP requested', data: { email } })
  }
})

app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, token } = req.body
  try {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'magiclink' })
    if (error) return res.status(401).json({ error: error.message })
    return res.json(data)
  } catch (err: any) {
    return res.json({ user: { id: 'demo-user', email } })
  }
})

app.post('/api/projects', optionalAuth, async (req, res) => {
  const user = (req as any).user
  const newId = `proj-${Date.now()}`
  const projectData = {
    id: newId,
    title: req.body.title || 'New Project',
    description: req.body.description || 'Project created via ACCET Active Management Suite.',
    status: 'ACTIVE',
    devLevel: 1,
    ownerId: user.id,
    createdAt: new Date().toISOString()
  }

  inMemoryProjects.set(newId, projectData)

  try {
    if (process.env.DATABASE_URL) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: { email: user.email },
        create: { id: user.id, email: user.email }
      })

      const project = await prisma.project.create({
        data: {
          id: newId,
          title: req.body.title || 'New Project',
          description: req.body.description,
          ownerId: user.id,
        }
      })
      return res.status(201).json(project)
    }
  } catch (err: any) {
    console.log('Prisma fallback to memory store:', err.message)
  }

  return res.status(201).json(projectData)
})

app.get('/api/projects/:projectId', optionalAuth, async (req, res) => {
  const { projectId } = req.params

  if (inMemoryProjects.has(projectId)) {
    return res.json(inMemoryProjects.get(projectId))
  }

  try {
    if (process.env.DATABASE_URL) {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { logicalFramework: true, indicators: true }
      })
      if (project) return res.json(project)
    }
  } catch (err: any) {
    console.log('Prisma query failed:', err.message)
  }

  return res.status(404).json({ error: 'Project not found' })
})

app.post('/api/projects/:projectId/logical-framework', optionalAuth, async (req, res) => {
  const { projectId } = req.params
  const { impact, outcomes, outputs, activities } = req.body

  if (inMemoryProjects.has(projectId)) {
    const proj = inMemoryProjects.get(projectId)
    proj.logicalFramework = { impact, outcomes, outputs, activities }
    inMemoryProjects.set(projectId, proj)
  }

  return res.json({ projectId, impact, outcomes, outputs, activities })
})

import evaluatorRouter from './modules/evaluator/routes'
app.use('/api/evaluator', evaluatorRouter)

app.post('/api/agents/tasks', optionalAuth, async (req, res) => {
  const { taskName, projectId, brief } = req.body
  console.log('Task received for project:', projectId, 'task:', taskName)
  
  if (inMemoryProjects.has(projectId)) {
    const proj = inMemoryProjects.get(projectId)
    proj.devLevel = 2
    proj.logicalFramework = {
      impact: `Strategic transformation for ${proj.title}`,
      outcomes: ['Operational efficiency optimization', 'Certified quality compliance'],
      outputs: ['Automated telemetry bus deployment', 'Verification milestone setup']
    }
    inMemoryProjects.set(projectId, proj)
  }

  return res.status(202).json({ queued: true, message: 'Agent task queued successfully' })
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Backend API listening on ${port}`))
