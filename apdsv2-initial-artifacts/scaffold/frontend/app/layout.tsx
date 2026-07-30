import './globals.css'

export const metadata = {
  title: 'APDS v2.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen bg-slate-50">{children}</main>
      </body>
    </html>
  )
}
