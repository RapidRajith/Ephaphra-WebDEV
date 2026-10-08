import type { Metadata } from 'next'
import { Inter, Fira_Code, Syne } from 'next/font/google'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import FloatingSidebar from '@/components/common/FloatingSidebar'
import CustomCursor from '@/components/common/CustomCursor'
import './globals.css'
import '@/styles/animations.css'
import '@/styles/glassmorphism.css'
import '@/styles/utilities.css'
import '@/styles/components.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Explore with Epaphra (@Epaphraa) | Official Website',
  description: 'Official web platform for Epaphra (@Epaphraa). 900K+ subscribers, 238M+ views. Unfiltered conversations with entrepreneurs, creators, and pioneers who chose alternative career paths.',
  keywords: ['Explore with Epaphra', 'Epaphraa', 'Alternative Careers', 'Entrepreneurship', 'YouTube Podcast', 'Career Choices', 'Dropouts', 'Founders'],
  authors: [{ name: 'Epaphra (@Epaphraa)' }],
  openGraph: {
    title: 'Explore with Epaphra (@Epaphraa)',
    description: 'Understanding reality better with host Epaphra. 900K+ Subscribers & 238M+ Views.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${syne.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#eef2f6] text-slate-900 antialiased selection:bg-slate-950 selection:text-white min-h-screen flex flex-col justify-between relative">
        <CustomCursor />
        <Header />
        <FloatingSidebar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

