'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { Episode } from '@/types'
import { fetchEpisodes } from '@/lib/api'

export interface HeroSectionProps {
  onPlayClick?: () => void
}

export default function HeroSection({ onPlayClick }: HeroSectionProps) {
  const [episodesList, setEpisodesList] = useState<Episode[]>([])
  const [activeCategory, setActiveCategory] = useState('All Stories')

  useEffect(() => {
    async function loadData() {
      const data = await fetchEpisodes()
      setEpisodesList(data)
    }
    loadData()
  }, [])

  const featured = episodesList.find((ep) => ep.featured) || episodesList[0]

  const filteredTrending = activeCategory === 'All Stories'
    ? episodesList.slice(1, 4)
    : episodesList.filter((ep) => ep.category === activeCategory).slice(0, 3)

  const displayTrending = filteredTrending.length > 0 ? filteredTrending : episodesList.slice(1, 4)

  if (!featured) return null

  return (
    <section className="relative w-full pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Outer Floating White/Light-Grey Glass Window (Mexzy Reference UI) */}
      <div className="relative rounded-[36px] bg-white/55 border border-white/80 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)] overflow-hidden">
        
        {/* Top Window Bar Navigation & Pill Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/60">
          {/* Top Search Pill */}
          <Link href="/episodes" className="w-full md:w-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-white/90 text-slate-700 text-xs font-medium hover:bg-white transition-all shadow-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search podcasts, guests, alternative careers...</span>
            </div>
          </Link>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
            {['All Stories', 'Unconventional Paths', 'Entrepreneurs', 'Creative Arts', 'Content Creation'].map((cat, i) => (
              <Link
                key={cat}
                href={cat === 'All Stories' ? '/episodes' : `/episodes?category=${encodeURIComponent(cat)}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat || (i === 0 && activeCategory === 'All Stories')
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white/60 border border-white/80 text-slate-700 hover:bg-white hover:text-slate-950'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Grid: Left Stacked Trending Thumbnails + Right Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Stacked Trending Episodes (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono tracking-wider text-slate-700 uppercase font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {activeCategory === 'All Stories' ? 'Latest Episodes' : activeCategory}
              </span>
              {activeCategory !== 'All Stories' && (
                <Link
                  href={`/episodes?category=${encodeURIComponent(activeCategory)}`}
                  className="text-[11px] font-bold text-amber-700 hover:underline"
                >
                  View All &rarr;
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-3 flex-1 justify-between">
              {displayTrending.map((ep) => (
                <Link key={ep.id} href={`/episodes/${ep.id}`}>
                  <div className="group relative rounded-2xl bg-white/70 border border-white/90 p-3 hover:border-slate-400 hover:bg-white transition-all duration-300 flex items-center gap-3.5 shadow-sm">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={ep.thumbnail} alt={ep.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-amber-700 font-semibold">{ep.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                        {ep.title}
                      </h4>
                      {ep.viewCount && <span className="text-[10px] text-slate-500 mt-1">{ep.viewCount} views</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Main Featured Card (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-[460px] border border-white/80 shadow-xl flex flex-col justify-end p-6 sm:p-10 group bg-slate-900">
            <Image
              src={featured.thumbnail}
              alt={featured.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
            />
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* Overlay Text Content */}
            <div className="relative z-10 flex flex-col gap-4 max-w-2xl text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-extrabold bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">
                  THE CONVERSATIONS THAT MATTER
                </span>
                {featured.viewCount && (
                  <span className="text-xs font-mono text-slate-300 font-semibold">
                    🔥 {featured.viewCount} Views
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                {featured.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 line-clamp-2 leading-relaxed font-normal">
                {featured.description}
              </p>

              {/* Action Buttons: Solid Black Pill + White Glass Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={featured.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-white text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg hover:bg-amber-300 hover:scale-105 transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-slate-950" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  WATCH LATEST EPISODE
                </a>

                <Link
                  href="/episodes"
                  className="px-6 py-3.5 rounded-full bg-white/20 border border-white/40 backdrop-blur-md text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-white/30 transition-all"
                >
                  EXPLORE EPISODES &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
