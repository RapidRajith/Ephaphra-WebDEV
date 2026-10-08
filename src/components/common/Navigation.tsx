'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Episodes', href: '/episodes' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '#about' },
  { label: 'Subscribe', href: '#newsletter' },
]


interface NavigationProps {
  isOpen: boolean
  onClose: () => void
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-7">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-sm font-semibold transition-colors duration-200 py-1 text-slate-600 hover:text-slate-950',
                isActive && 'text-slate-950 font-bold'
              )}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-40 md:hidden"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white/90 border-l border-slate-200 p-6 z-50 flex flex-col justify-between backdrop-blur-2xl shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <span className="font-extrabold text-lg text-slate-900">
                    Explore with Epaphra
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'text-base font-semibold px-4 py-3 rounded-2xl transition-all duration-200',
                          isActive
                            ? 'bg-slate-950 text-white shadow-md'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 text-center font-medium">
                © {new Date().getFullYear()} Explore with Epaphra
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
