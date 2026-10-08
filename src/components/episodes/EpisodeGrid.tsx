'use client'

import { Episode } from '@/types'
import EpisodeCard from './EpisodeCard'

export interface EpisodeGridProps {
  episodes: Episode[]
  onPlayClick?: (episodeId: string) => void
  isLoading?: boolean
}

export default function EpisodeGrid({ episodes, onPlayClick, isLoading }: EpisodeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white/5 border border-white/10 h-80 animate-pulse p-4 flex flex-col justify-between">
            <div className="w-full h-40 bg-white/10 rounded-xl" />
            <div className="flex flex-col gap-2">
              <div className="w-1/3 h-4 bg-white/10 rounded" />
              <div className="w-3/4 h-6 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl gap-4">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">No Episodes Found</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          No episodes match your search criteria. Try adjusting your query or category filter.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {episodes.map((ep) => (
        <EpisodeCard key={ep.id} episode={ep} onPlayClick={onPlayClick} />
      ))}
    </div>
  )
}
