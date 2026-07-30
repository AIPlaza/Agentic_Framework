import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ladhrrjidksmynazoybx.supabase.co'
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGhycmppZGtzbXluYXpveWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTg5ODUsImV4cCI6MjA4OTY3NDk4NX0.BhhSZQgDn3Hyi2oKlLzEgXVQOmBYwMWk_9PQzZX0inA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
