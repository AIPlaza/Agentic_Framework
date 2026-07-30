import { Worker, Queue } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const queueName = 'agent-tasks'

// simple worker that logs tasks and demonstrates calling Claude (stub)
const worker = new Worker(queueName, async job => {
  console.log('Processing job', job.name, job.data)
  // Example: call Claude using CLAUDE_API_KEY (do not hardcode)
  // const resp = await fetch('https://api.anthropic.com/v1/complete', { ... })
  // parse structured JSON output and persist to DB
  return { result: 'ok' }
}, { connection })

worker.on('completed', (job) => console.log('Job completed', job.id))
worker.on('failed', (job, err) => console.error('Job failed', job?.id, err))

console.log('Worker started, listening for agent tasks')
