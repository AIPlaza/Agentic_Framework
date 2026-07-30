# APDS v2.0 - Development README (scaffold)

This folder contains a minimal scaffold for the APDS v2.0 MVP.

Goals
- Provide a minimal Next.js frontend with an onboarding page.
- Provide a lightweight backend stub (Express + TypeScript) exposing the minimal API endpoints from openapi.yaml.
- Provide a worker stub to process agent tasks (uses Redis/BullMQ).
- Provide .env.example and developer instructions to run locally using Docker Compose (Postgres + Redis).

Contents
- frontend/: Next.js App Router app (minimal pages)
- backend/: Express + TypeScript API stubs
- worker/: BullMQ worker stub
- agent-templates/: prompt templates
- .env.example: example env variables
- docker-compose.yml: local Postgres + Redis

How to run locally (development)
1. Create a Supabase project and obtain SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
2. Copy .env.example to .env and fill variables (do NOT commit secrets).
3. Start local infra (if not using Supabase hosted DB):
   docker-compose up -d
4. Start backend & worker:
   cd scaffold/backend && npm install && npm run dev
   cd ../worker && npm install && npm run dev
5. Start frontend:
   cd ../frontend && npm install && npm run dev

Notes
- This scaffold uses environment variables to call Claude; never paste API keys into source.
- Use the prisma schema already added at apdsv2-initial-artifacts/schema.prisma for database models.
