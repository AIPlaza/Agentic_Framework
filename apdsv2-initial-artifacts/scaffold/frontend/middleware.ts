import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ladhrrjidksmynazoybx.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGhycmppZGtzbXluYXpveWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTg5ODUsImV4cCI6MjA4OTY3NDk4NX0.BhhSZQgDn3Hyi2oKlLzEgXVQOmBYwMWk_9PQzZX0inA'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Allow direct access to demo routes without forcing login
  if (request.nextUrl.pathname.includes('/demo-project')) {
    return response
  }

  try {
    const supabase = createServerClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({ request: { headers: request.headers } })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response = NextResponse.next({ request: { headers: request.headers } })
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protect non-demo dashboard routes
    if (
      !user &&
      (request.nextUrl.pathname.startsWith('/project') ||
        request.nextUrl.pathname.startsWith('/onboarding') ||
        request.nextUrl.pathname.startsWith('/evaluator'))
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  } catch (err) {
    console.error('Middleware auth check error:', err)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
}
