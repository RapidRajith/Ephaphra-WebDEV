'use client'

import { CATEGORIES } from '@/data/episodes'
import { cn } from '@/lib/utils'

export interface FilterPanelProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedMonth: string
  onMonthChange: (month: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  availableMonths: string[]
}

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange,
  sortBy,
  onSortChange,
  availableMonths,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white/60 border border-white/90 backdrop-blur-2xl shadow-sm">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200',
              selectedCategory === cat
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white/80 text-slate-700 border border-white hover:bg-white hover:text-slate-950'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto flex-shrink-0">
        {/* Month Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <label htmlFor="month-select" className="text-xs text-slate-600 font-semibold">
            Month:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-950 focus:outline-none cursor-pointer pr-1"
          >
            <option value="All Months">All Months</option>
            {availableMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
          <label htmlFor="sort-select" className="text-xs text-slate-600 font-semibold">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-950 focus:outline-none cursor-pointer pr-1"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Viewed / Popular</option>
            <option value="oldest">Oldest First</option>
            <option value="duration">Longest Duration</option>
          </select>
        </div>
      </div>
    </div>
  )
}
