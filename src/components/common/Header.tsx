'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-4',
        isScrolled ? 'pt-2 pb-2 bg-slate-100/70 backdrop-blur-2xl border-b border-white/60 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto rounded-full bg-white/60 border border-white/80 backdrop-blur-2xl px-6 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 p-[1.5px] shadow-md group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-slate-700 transition-colors">
              Explore with Epaphra
            </span>
            <span className="text-[11px] font-mono tracking-wider text-slate-600">
              @Epaphraa • Unconventional Career Stories
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <Navigation isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        {/* YouTube Action CTA (Solid Black Pill Button) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.youtube.com/@epaphraa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold tracking-wide transition-all shadow-md hover:scale-105"
          >
            <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/80 border border-slate-200 text-slate-900"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}
