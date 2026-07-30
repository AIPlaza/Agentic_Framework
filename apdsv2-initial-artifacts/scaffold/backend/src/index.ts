import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Minimal endpoints matching openapi.yaml (stubs)
app.post('/api/auth/request-otp', (req, res) => {
  // TODO: implement Supabase OTP flow
  return res.json({ message: 'OTP requested (stub)' })
})

app.post('/api/auth/verify-otp', (req, res) => {
  // TODO: verify OTP with Supabase and return session
  return res.json({ token: 'demo-token' })
})

app.post('/api/projects', (req, res) => {
  // persist project via Prisma (stub)
  console.log('create project', req.body)
  return res.status(201).json({ id: 'proj-demo', ...req.body })
})

app.get('/api/projects/:projectId', (req, res) => {
  return res.json({ id: req.params.projectId, title: 'Demo project', status: 'draft' })
})

app.post('/api/projects/:projectId/logical-framework', (req, res) => {
  // store logical framework
  console.log('logical framework', req.params.projectId, req.body)
  return res.json({ ok: true })
})

app.post('/api/agents/tasks', (req, res) => {
  // enqueue an agent task - worker will process
  console.log('enqueuing task', req.body)
  return res.status(202).json({ queued: true })
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Backend API listening on ${port}`))
