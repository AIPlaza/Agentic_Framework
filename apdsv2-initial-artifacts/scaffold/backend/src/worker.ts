import { Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import Anthropic from '@anthropic-ai/sdk'
import { PrismaClient } from '@prisma/client'
import fs from 'fs-extra'
import path from 'path'

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const queueName = 'agent-tasks'
const prisma = new PrismaClient()
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })

async function processOnboarding(job: Job) {
  const { projectId, brief } = job.data
  console.log(`Processing onboarding for project ${projectId}`)
  
  const templatePath = path.resolve(__dirname, '../../agent-templates/onboarding_prompt.md')
  const promptTemplate = await fs.readFile(templatePath, 'utf-8')
  const prompt = `${promptTemplate}\n\nProject Brief:\n${brief}`

  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    system: "You are an AI analyst evaluating project briefs. Output JSON only. Format: { eligible: boolean, reasons: string[], vertical: 'Tech'|'Físico'|'Impacto' }",
    messages: [{ role: 'user', content: prompt }]
  })

  const output = (msg.content[0] as any).text
  const parsed = JSON.parse(output)

  // We could save this analysis in the DB, for now just log it
  console.log('Onboarding Analysis:', parsed)
  
  // If eligible, queue the logical framework generation
  if (parsed.eligible) {
     const { Queue } = require('bullmq')
     const q = new Queue(queueName, { connection })
     await q.add('generate-logframe', { projectId, brief })
  }
}

async function processLogframe(job: Job) {
  const { projectId, brief } = job.data
  console.log(`Processing logframe for project ${projectId}`)

  const templatePath = path.resolve(__dirname, '../../agent-templates/logframe_prompt.md')
  let promptTemplate = ''
  try {
     promptTemplate = await fs.readFile(templatePath, 'utf-8')
  } catch (e) {
     promptTemplate = "A partir de este brief, genera un marco lógico con Impacto -> Outcomes -> Outputs -> Actividades."
  }
  
  const prompt = `${promptTemplate}\n\nProject Brief:\n${brief}`

  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 2000,
    system: "You generate logical frameworks. Output JSON only. Keys: impact, outcomes[], outputs[], activities[].",
    messages: [{ role: 'user', content: prompt }]
  })

  const output = (msg.content[0] as any).text
  const parsed = JSON.parse(output)

  await prisma.logicalFramework.upsert({
    where: { projectId },
    update: {
      impact: parsed.impact,
      outcomes: parsed.outcomes || [],
      outputs: parsed.outputs || [],
      activities: parsed.activities || []
    },
    create: {
      projectId,
      impact: parsed.impact,
      outcomes: parsed.outcomes || [],
      outputs: parsed.outputs || [],
      activities: parsed.activities || []
    }
  })

  console.log(`Logframe persisted for project ${projectId}`)
}

const worker = new Worker(queueName, async job => {
  if (job.name === 'onboarding') {
    await processOnboarding(job)
  } else if (job.name === 'generate-logframe') {
    await processLogframe(job)
  }
  return { result: 'ok' }
}, { connection })

worker.on('completed', (job) => console.log('Job completed', job.id))
worker.on('failed', (job, err) => console.error('Job failed', job?.id, err))

console.log('Worker started, listening for agent tasks')
