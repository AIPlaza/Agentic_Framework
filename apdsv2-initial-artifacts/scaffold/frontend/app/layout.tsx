import type { Metadata } from 'next'
import { Inter, DM_Sans, Syne, JetBrains_Mono } from 'next/font/google'
import SplashScreen from '@/app/components/common/SplashScreen'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['300', '400', '500', '700'] })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '500', '600', '700', '800'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'ACCET - Tokenización RWA | APDS v2.0',
  description: 'Plataforma de activos del mundo real (RWA) — APDS v2.0',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="bg-[#0D0D0D] font-sans text-slate-100 overflow-x-hidden min-h-screen flex flex-col">
        <SplashScreen />
        {children}
      </body>
    </html>
  )
}
