'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Episode } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatDuration } from '@/lib/utils'

export interface ThumbnailSliderProps {
  episodes: Episode[]
  title?: string
  onEpisodeClick?: (episodeId: string) => void
  autoScroll?: boolean
  autoScrollInterval?: number
}

export default function ThumbnailSlider({
  episodes,
  title = 'Recent Episodes',
  onEpisodeClick,
  autoScroll = true,
  autoScrollInterval = 7000,
}: ThumbnailSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = 3

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(episodes.length / itemsPerPage))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(episodes.length / itemsPerPage) - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (!autoScroll || episodes.length === 0) return
    const totalPages = Math.ceil(episodes.length / itemsPerPage)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, autoScrollInterval)
    return () => clearInterval(timer)
  }, [autoScroll, autoScrollInterval, episodes.length])

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-purple-600" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-purple-500/40 transition"
            aria-label="Previous episodes"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-purple-500/40 transition"
            aria-label="Next episodes"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="min-w-[100%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] flex-shrink-0"
            >
              <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden group hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(147,51,234,0.2)] flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={ep.thumbnail}
                    alt={ep.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">EP #{ep.episodeNumber}</Badge>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-300 border border-white/10">
                    {formatDuration(ep.duration)}
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onEpisodeClick && onEpisodeClick(ep.id)}
                      className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 scale-90 group-hover:scale-100 transition-transform"
                    >
                      <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-cyan-400 font-mono">{ep.category}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ep.description}
                    </p>
                  </div>

                  <Link href={`/episodes/${ep.id}`} className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 pt-2 border-t border-white/5">
                    View Episode Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(episodes.length / itemsPerPage) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-8 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
