-- APDS v2.0 Additive Migration
-- Only adds new APDS tables. Does NOT modify existing tables (profiles, User, Tenant, etc.)

-- ── 1. Add missing columns to existing profiles if needed ──────────────
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- ── 2. Backfill profiles from auth.users (link existing auth user) ─────
INSERT INTO public.profiles (id, role)
SELECT id, 'owner'
FROM auth.users
WHERE id = '42a8a807-c5d0-4880-96f1-836de78534c2'
ON CONFLICT (id) DO NOTHING;

-- ── 3. Create projects table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  description  TEXT,
  status       TEXT        NOT NULL DEFAULT 'draft',
  dev_level    INT         NOT NULL DEFAULT 1,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 4. Logical frameworks ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.logical_frameworks (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID        UNIQUE NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  impact      TEXT,
  outcomes    JSONB       NOT NULL DEFAULT '[]',
  outputs     JSONB       NOT NULL DEFAULT '[]',
  activities  JSONB       NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 5. Indicators (RACER/FNVC) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.indicators (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id          UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name                TEXT        NOT NULL,
  racer               JSONB       NOT NULL DEFAULT '{}',
  fnvc_eligible       BOOLEAN     NOT NULL DEFAULT false,
  usd_value           NUMERIC,
  verification_source TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 6. Checklists (BDO / ISO) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.checklists (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type        TEXT        NOT NULL,
  schema      JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.checklist_entries (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id  UUID        NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
  date          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  values        JSONB       NOT NULL DEFAULT '{}',
  submitted_by  UUID        REFERENCES auth.users(id),
  approved_by   UUID        REFERENCES auth.users(id)
);

-- ── 7. Oracle readings (IoT telemetry) ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.oracle_readings (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  source      TEXT        NOT NULL,
  raw_value   JSONB       NOT NULL DEFAULT '{}',
  value       NUMERIC,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  validated   BOOLEAN     NOT NULL DEFAULT false
);

-- ── 8. Evaluator reports (TPA / Anexo VII-B) ──────────────────────────
CREATE TABLE IF NOT EXISTS public.evaluator_reports (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  evaluator_id  UUID        REFERENCES auth.users(id),
  report        JSONB       NOT NULL DEFAULT '{}',
  status        TEXT        NOT NULL DEFAULT 'pending',
  approved_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 9. FNVC tranches (smart contract payouts) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.fnvc_tranches (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  indicator_id  UUID        NOT NULL REFERENCES public.indicators(id) ON DELETE CASCADE,
  threshold     NUMERIC     NOT NULL,
  payout_usd    NUMERIC     NOT NULL,
  paid          BOOLEAN     NOT NULL DEFAULT false,
  paid_at       TIMESTAMPTZ
);

-- ── 10. Marketplace listings ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.market_listings (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID        UNIQUE NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  public_slug  TEXT        UNIQUE NOT NULL,
  scenarios    JSONB       NOT NULL DEFAULT '{}'
);

-- ── 11. Audit logs ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type  TEXT        NOT NULL,
  entity_id    UUID,
  actor_id     UUID        REFERENCES auth.users(id),
  action       TEXT        NOT NULL,
  payload      JSONB       NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 12. RLS ────────────────────────────────────────────────────────────
ALTER TABLE public.projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicators      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklists      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oracle_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluator_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fnvc_tranches   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_owner" ON public.projects;
CREATE POLICY "projects_owner" ON public.projects
  FOR ALL USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "market_public_read" ON public.market_listings;
CREATE POLICY "market_public_read" ON public.market_listings
  FOR SELECT USING (true);

-- ── 13. Seed demo project ──────────────────────────────────────────────
INSERT INTO public.projects (id, owner_id, title, description, status, dev_level)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  '42a8a807-c5d0-4880-96f1-836de78534c2',
  'Planta de Biogás & Granja Agroindustrial',
  'Proyecto RWA de producción limpia e inocuidad alimentaria respaldado por la norma ISO 9001:2008.',
  'ACTIVE',
  3
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.market_listings (project_id, public_slug, scenarios)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'biogas-granja-agroindustrial',
  '{"conservative":{"apy":"11.5%","confidence":"99.2%"},"base":{"apy":"16.8%","confidence":"94.5%"},"optimistic":{"apy":"22.4%","confidence":"82.0%"}}'
) ON CONFLICT (project_id) DO NOTHING;

SELECT 'APDS v2.0 migration applied successfully ✅' AS result;
