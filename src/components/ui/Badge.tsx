import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  className?: string
}

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const variants = {
    primary: 'bg-slate-950 text-white border-slate-800',
    secondary: 'bg-slate-200/80 border-slate-300 text-slate-900',
    accent: 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold',
    neutral: 'bg-white/80 border-white text-slate-800',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm shadow-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
