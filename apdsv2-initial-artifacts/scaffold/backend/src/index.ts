import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const prisma = new PrismaClient()

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Middleware to protect routes with Supabase JWT
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' })
  }
  
  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  // Attach user to request
  ;(req as any).user = user
  next()
}

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Minimal endpoints matching openapi.yaml
app.post('/api/auth/request-otp', async (req, res) => {
  const { email } = req.body
  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) return res.status(400).json({ error: error.message })
  return res.json({ message: 'OTP requested', data })
})

app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, token } = req.body
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'magiclink' }) // or 'signup'/'email' depending on OTP type
  if (error) return res.status(401).json({ error: error.message })
  return res.json(data)
})

app.post('/api/projects', requireAuth, async (req, res) => {
  const user = (req as any).user
  try {
    // Upsert the user into public.User to satisfy Prisma relation
    await prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.email },
      create: { id: user.id, email: user.email }
    })

    const project = await prisma.project.create({
      data: {
        title: req.body.title || 'New Project',
        description: req.body.description,
        ownerId: user.id,
      }
    })
    return res.status(201).json(project)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
})

app.get('/api/projects/:projectId', requireAuth, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.projectId },
      include: { logicalFramework: true, indicators: true }
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    return res.json(project)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
})

app.post('/api/projects/:projectId/logical-framework', requireAuth, async (req, res) => {
  try {
    const { impact, outcomes, outputs, activities } = req.body
    const lf = await prisma.logicalFramework.upsert({
      where: { projectId: req.params.projectId },
      update: { impact, outcomes, outputs, activities },
      create: { projectId: req.params.projectId, impact, outcomes, outputs, activities }
    })
    return res.json(lf)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
})

import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const queue = new Queue('agent-tasks', { connection })

app.post('/api/agents/tasks', requireAuth, async (req, res) => {
  const { taskName, projectId, brief } = req.body
  console.log('enqueuing task', taskName)
  await queue.add(taskName || 'onboarding', { projectId, brief })
  return res.status(202).json({ queued: true })
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Backend API listening on ${port}`))
