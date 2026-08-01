import type { Metadata } from 'next'
import { Inter, DM_Sans, Syne, JetBrains_Mono } from 'next/font/google'
import SplashScreen from '@/app/components/common/SplashScreen'
import HeaderNav from '@/app/components/HeaderNav'
import { getDictionary } from '@/lib/dictionaries'
import { DictionaryProvider } from '@/app/components/DictionaryProvider'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['400', '500', '700'] })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '500', '600', '700', '800'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'ACCET - Ultimate Project Design & Management Suite',
  description: 'Project Design & Active Management Suite for RWA Tokenization — APDS v2.0',
  icons: { icon: '/favicon.ico' },
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'pt' }]
}

export default async function RootLayout(props: {
  children: React.ReactNode,
  params: Promise<{ lang: 'en' | 'es' | 'pt' }>
}) {
  const { children, params } = props;
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  
  // Load the dictionary for the server layout
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="bg-[#1A1A2E] font-sans text-slate-100 overflow-x-hidden min-h-screen flex flex-col">
        <DictionaryProvider dict={dict} lang={lang}>
          <SplashScreen />
          <HeaderNav />
          <main className="flex-1">{children}</main>
        </DictionaryProvider>
      </body>
    </html>
  )
}
