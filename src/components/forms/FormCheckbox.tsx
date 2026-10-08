'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface FormCheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
}

export default function FormCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  className,
}: FormCheckboxProps) {
  const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none group',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-[20px] h-[20px] rounded-md border border-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm',
            'group-hover:border-purple-400 group-focus-within:ring-2 group-focus-within:ring-purple-500/40',
            checked ? 'bg-purple-600 border-purple-500 shadow-[0_0_12px_rgba(147,51,234,0.5)]' : 'bg-white/5'
          )}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white stroke-[3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  )
}
