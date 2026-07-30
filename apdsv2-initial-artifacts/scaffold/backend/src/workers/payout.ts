import { Worker, Job } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')
const queueName = 'payout-tasks'

async function processFNVCPayout(job: Job) {
  const { reportId, projectId, payoutUsd, approvedBy } = job.data
  console.log(`[FNVC Payout Worker] Processing approved report ${reportId} for project ${projectId}`)
  console.log(`[FNVC Payout Worker] Amount: $${payoutUsd} USD | Approved by: ${approvedBy}`)

  // Simulate smart contract invocation / Chainlink Oracle bridge
  console.log(`[Smart Contract Bridge] Calling FNVCPayout.sol -> releaseTranche(${projectId}, ${payoutUsd})`)
  
  // Artificial delay for blockchain transaction simulation
  await new Promise(resolve => setTimeout(resolve, 2000))

  console.log(`[Smart Contract Bridge] Tx Confirmed! Hash: 0x9a8f7c6e5d4c3b2a1f... Tranche released successfully.`)
}

const payoutWorker = new Worker(queueName, async job => {
  if (job.name === 'trigger-fnvc-payout') {
    await processFNVCPayout(job)
  }
  return { status: 'DISBURSED' }
}, { connection })

payoutWorker.on('completed', (job) => console.log(`[Payout Worker] Job ${job.id} completed.`))
payoutWorker.on('failed', (job, err) => console.error(`[Payout Worker] Job ${job?.id} failed:`, err))

console.log('[Payout Worker] Listener active for FNVC payouts')
