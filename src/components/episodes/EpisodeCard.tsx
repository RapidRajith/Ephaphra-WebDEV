'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Episode } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatDuration, formatDate } from '@/lib/utils'

export interface EpisodeCardProps {
  episode: Episode
  onPlayClick?: (episodeId: string) => void
  variant?: 'default' | 'featured' | 'compact'
}

export default function EpisodeCard({
  episode,
  onPlayClick,
  variant = 'default',
}: EpisodeCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex gap-4 p-3 rounded-2xl bg-white/70 border border-white/90 hover:border-slate-400 transition-all duration-200 group shadow-sm">
        <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900">
          <Image src={episode.thumbnail} alt={episode.title} fill className="object-cover group-hover:scale-105 transition-transform opacity-90" />
        </div>
        <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
          <span className="text-[10px] font-mono text-amber-800 uppercase font-semibold">{episode.category}</span>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
            {episode.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>{formatDuration(episode.duration)}</span>
            {episode.viewCount && <span>• {episode.viewCount} views</span>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-3xl bg-white/60 border border-white/90 overflow-hidden group hover:border-slate-400 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition-all duration-300 h-full backdrop-blur-2xl"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <Image
          src={episode.thumbnail}
          alt={episode.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <Badge variant="primary">EP #{episode.episodeNumber}</Badge>
        </div>

        {/* Top Right Duration */}
        <div className="absolute top-3 right-3 z-10 text-[11px] font-mono bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20">
          {formatDuration(episode.duration)}
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={() => onPlayClick && onPlayClick(episode.id)}
            className="w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300 font-bold"
            aria-label={`Play ${episode.title}`}
          >
            <svg className="w-7 h-7 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span className="text-slate-900 font-bold uppercase">{episode.category}</span>
            <span>{formatDate(episode.publishedAt)}</span>
          </div>

          <Link href={`/episodes/${episode.id}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
              {episode.title}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
            {episode.description}
          </p>

          {episode.guest && (
            <div className="text-xs text-slate-500 pt-1">
              Guest: <span className="text-slate-900 font-semibold">{episode.guest}</span>
            </div>
          )}
        </div>

        {/* Card Footer Actions & YouTube Stats */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 text-slate-600 font-mono text-[11px]">
            {episode.viewCount && (
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <svg className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {episode.viewCount} views
              </span>
            )}
            {episode.likeCount && (
              <span className="flex items-center gap-1 font-semibold text-rose-600">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {episode.likeCount}
              </span>
            )}
          </div>

          <Link
            href={`/episodes/${episode.id}`}
            className="font-bold text-slate-950 hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            Watch Video →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
