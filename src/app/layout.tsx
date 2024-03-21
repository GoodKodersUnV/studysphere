import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '../components/Header'
import getCurrentUser from '@/actions/getCurrentUser'
import ToasterProvider from '@/components/ToasterProvider'
import AuthProvider from '@/providers/AuthProvider'
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Study Sphere',
  description: 'study sphere',
}

export const viewport: Viewport = {
  themeColor: '#961018',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();


  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className='max-h-[30px]'>
            <ToasterProvider />
          </div>
          {currentUser && <Header currentUser={currentUser} />}
          {children}
          <SpeedInsights />
        </body>
      </html>
    </AuthProvider>
  )
}
