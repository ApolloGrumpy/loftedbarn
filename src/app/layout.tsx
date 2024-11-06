/* eslint-disable @typescript-eslint/no-unused-vars */
import './globals.css'
import Header from '@/components/Header'
import { Sorts_Mill_Goudy } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Sorts_Mill_Goudy({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: '3D Lofted Barn Configurator'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        {/* <div>
          <Header />
        </div> */}
        <main className="flex-1 overflow-y-hidden">{children}</main>
      </body>
    </html>
  )
}
