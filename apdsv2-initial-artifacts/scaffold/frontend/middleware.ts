import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ladhrrjidksmynazoybx.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGhycmppZGtzbXluYXpveWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTg5ODUsImV4cCI6MjA4OTY3NDk4NX0.BhhSZQgDn3Hyi2oKlLzEgXVQOmBYwMWk_9PQzZX0inA'

const locales = ['en', 'es', 'pt']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Handle case where Accept-Language is not present
  if (!negotiatorHeaders['accept-language']) {
    return defaultLocale
  }

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  try {
    return match(languages, locales, defaultLocale)
  } catch (e) {
    return defaultLocale
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const pathname = request.nextUrl.pathname

  // 1. Locale Routing Logic
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // e.g. incoming request is /login
    // The new URL is now /en/login
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // Allow direct access to demo routes without forcing login
  if (pathname.includes('/demo-project')) {
    return response
  }

  // 2. Supabase Auth Logic
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
    
    // Extract pathname without locale for auth checks
    const pathnameWithoutLocale = pathname.replace(/^\/[^\/]+/, '')

    // Protect non-demo dashboard routes
    if (
      !user &&
      (pathnameWithoutLocale.startsWith('/project') ||
        pathnameWithoutLocale.startsWith('/onboarding') ||
        pathnameWithoutLocale.startsWith('/evaluator'))
    ) {
      const currentLocale = pathname.split('/')[1]
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url))
    }

    if (user && pathnameWithoutLocale === '/login') {
      const currentLocale = pathname.split('/')[1]
      return NextResponse.redirect(new URL(`/${currentLocale}/onboarding`, request.url))
    }
  } catch (err) {
    console.error('Middleware auth check error:', err)
  }

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|images|.*\\.mp4|auth/callback).*)',
  ],
}
