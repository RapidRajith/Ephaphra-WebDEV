'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Episode } from '@/types'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatDuration, formatDate } from '@/lib/utils'

export interface FeaturedEpisodeProps {
  episode: Episode
  onPlayClick?: (episodeId: string) => void
}

export default function FeaturedEpisode({ episode, onPlayClick }: FeaturedEpisodeProps) {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2.5 h-8 rounded-full bg-slate-950" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Featured Episode Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Deep dive video episode with detailed show notes
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] bg-white/60 border border-white/90 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-3xl group hover:border-slate-300 transition-all duration-300"
      >
        {/* Left Column - Image (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[440px] overflow-hidden bg-slate-900">
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="accent">Episode #{episode.episodeNumber}</Badge>
          </div>

          {/* Play Overlay Button */}
          <a
            href={episode.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${episode.title}`}
            className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <div className="w-16 h-16 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300 font-bold">
              <svg className="w-8 h-8 fill-current ml-1 text-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        </div>

        {/* Right Column - Content (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
              <span>{formatDate(episode.publishedAt)}</span>
              <span>•</span>
              <span>{formatDuration(episode.duration)}</span>
              <span>•</span>
              <span className="text-amber-800 font-bold uppercase">{episode.category}</span>
              {episode.viewCount && (
                <>
                  <span>•</span>
                  <span className="text-slate-900 font-semibold">{episode.viewCount} views</span>
                </>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
              {episode.title}
            </h3>

            <p className="text-slate-700 text-base leading-relaxed line-clamp-3 font-normal">
              {episode.description}
            </p>

            {episode.guest && (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {episode.guest[0]}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Guest Speaker: <strong className="text-slate-950">{episode.guest}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200/80">
            <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 rounded-full bg-slate-950 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md">
                <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Video on YouTube
              </button>
            </a>

            <Link href={`/episodes/${episode.id}`}>
              <button className="px-6 py-3 rounded-full bg-white/80 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm hover:bg-white transition-all">
                View Show Notes
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
