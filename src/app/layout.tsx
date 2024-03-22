import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import getCurrentUser from '@/actions/getCurrentUser'
import ToasterProvider from '@/components/ToasterProvider'
import AuthProvider from '@/providers/AuthProvider'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Duplayout from '@/components/duplayout'



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

  // const checkOpen = localStorage.getItem("checkOpen");

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className='max-h-[30px]'>
            <ToasterProvider />
          </div>
          <Duplayout children={children} currentUser={currentUser}/>
          <SpeedInsights />
        </body>
      </html>
    </AuthProvider>
  )
}
