import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  fullScreen?: boolean
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }

  const colors = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-400',
    white: 'border-white',
  }

  const spinner = (
    <div
      className={cn(
        'rounded-full border-2 border-t-transparent animate-spin',
        sizes[size],
        colors[color]
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-200/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>
}
