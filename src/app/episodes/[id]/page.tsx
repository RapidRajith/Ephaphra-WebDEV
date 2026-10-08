'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Episode } from '@/types'
import { fetchEpisodes } from '@/lib/api'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import EpisodeCard from '@/components/episodes/EpisodeCard'
import NewsletterForm from '@/components/home/NewsletterForm'
import { formatDuration, formatDate } from '@/lib/utils'
import { cleanEpisodeDescription } from '@/lib/youtube'

interface Chapter {
  timestamp: string
  title: string
  seconds: number
}

function parseTimestamps(text: string): Chapter[] {
  if (!text) return []
  const lines = text.split('\n')
  const chapters: Chapter[] = []

  const timeRegex = /(?:(\d+):)?(\d{1,2}):(\d{2})/

  for (const line of lines) {
    const match = line.match(timeRegex)
    if (match) {
      const timestamp = match[0]
      const parts = timestamp.split(':').map((p) => parseInt(p, 10))
      let seconds = 0
      if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
      } else if (parts.length === 2) {
        seconds = parts[0] * 60 + parts[1]
      }

      const cleanTitle = line
        .replace(timestamp, '')
        .replace(/^[\s•\-–—:]+/, '')
        .trim()

      if (cleanTitle) {
        chapters.push({ timestamp, title: cleanTitle, seconds })
      }
    }
  }

  return chapters
}

export default function EpisodeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [episodesList, setEpisodesList] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchEpisodes()
        setEpisodesList(data)
      } catch (err) {
        console.error('Error fetching episode details:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const episode = episodesList.find((ep) => ep.id === id)

  // Chapters parsed from description or showNotes
  const chapters = useMemo(() => {
    if (!episode) return []
    const fromNotes = parseTimestamps(episode.showNotes || '')
    if (fromNotes.length > 0) return fromNotes
    return parseTimestamps(episode.description || '')
  }, [episode])

  // Related episodes prioritized by same category
  const relatedEpisodes = useMemo(() => {
    if (!episode) return []
    const sameCategory = episodesList.filter(
      (ep) => ep.id !== id && ep.category === episode.category
    )
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3)
    const others = episodesList.filter(
      (ep) => ep.id !== id && ep.category !== episode.category
    )
    return [...sameCategory, ...others].slice(0, 3)
  }, [episodesList, episode, id])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col gap-6 animate-pulse">
        <div className="w-48 h-6 bg-slate-200 rounded-xl" />
        <div className="w-full h-96 bg-white/60 rounded-3xl border border-white" />
      </div>
    )
  }

  if (!episode) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">EPISODE NOT FOUND</h1>
        <p className="text-slate-600">We couldn&apos;t find this conversation in the Explore with Epaphra playlist.</p>
        <Link href="/episodes">
          <Button variant="primary">← Back to All Episodes</Button>
        </Link>
      </div>
    )
  }

  const embedBase = episode.embedUrl || `https://www.youtube.com/embed/${episode.id}`
  const embedUrl = activeTimestamp !== null ? `${embedBase}?start=${activeTimestamp}&autoplay=1` : embedBase

  const currentUrl = (typeof window !== 'undefined' ? window.location.href : episode.youtubeUrl) || ''
  const shareText = encodeURIComponent(`Check out this episode of Explore with Epaphra: ${episode.title}`)

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Back Link */}
      <Link
        href="/episodes"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 transition-colors bg-white/80 border border-white/90 px-4 py-2 rounded-full w-fit shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>← BACK TO EPISODES</span>
      </Link>

      {/* Main Hero & Player Window */}
      <div className="rounded-[36px] bg-white/60 border border-white/90 p-6 sm:p-10 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col gap-8">
        
        {/* Title Header */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">EPISODE #{episode.episodeNumber}</Badge>
            <Badge variant="primary">{episode.category}</Badge>
            <span className="text-xs font-mono text-slate-500 font-semibold">{formatDuration(episode.duration)}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono text-slate-500">{formatDate(episode.publishedAt)}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {episode.title}
          </h1>

          {episode.guest && (
            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-sm font-black shadow-sm">
                {episode.guest[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Featured Guest</span>
                <span className="text-base font-bold text-slate-950">{episode.guest}</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/80 shadow-2xl bg-slate-950">
          <iframe
            src={embedUrl}
            title={episode.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Stats & Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/70">
          <div className="flex items-center gap-6 text-xs text-slate-700 font-mono font-semibold">
            {episode.viewCount && (
              <span className="flex items-center gap-1.5 text-amber-800">
                🔥 {episode.viewCount} views
              </span>
            )}
            {episode.likeCount && (
              <span className="flex items-center gap-1.5 text-rose-700">
                ❤️ {episode.likeCount} likes
              </span>
            )}
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">Share:</span>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all shadow-sm"
            >
              {copied ? '✓ Link Copied!' : 'Copy Link'}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              X / Twitter
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Clean Podcast Content (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/60 border border-white/90 backdrop-blur-2xl flex flex-col gap-4 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 tracking-tight uppercase border-b border-slate-200/80 pb-3">
              PODCAST CONVERSATION
            </h2>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line">
              {cleanEpisodeDescription(episode.description, episode.title)}
            </p>
          </div>

          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap px-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Topic Tags:</span>
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-white/80 border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Guest Speaker & YouTube Player Link (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {episode.guest && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/60 border border-white/90 backdrop-blur-2xl flex flex-col gap-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                FEATURED GUEST
              </span>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0">
                  {episode.guest[0]}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-slate-950">{episode.guest}</h3>
                  <span className="text-xs text-slate-600 font-medium">Guest Speaker on ThirdLane Podcast</span>
                </div>
              </div>
            </div>
          )}

          {/* Watch on YouTube Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white flex flex-col gap-4 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              OFFICIAL PLAYLIST
            </span>
            <h4 className="text-lg font-extrabold text-white">
              Watch on YouTube & Subscribe to Epaphraa
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Support Explore with Epaphra directly on YouTube for full 4K episode drops.
            </p>
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-md mt-2"
            >
              <svg className="w-4 h-4 fill-current text-red-600" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Related Episodes Section */}
      {relatedEpisodes.length > 0 && (
        <div className="flex flex-col gap-6 pt-12 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                MORE CONVERSATIONS
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                More episodes in <span className="font-bold text-slate-900">{episode.category}</span>
              </p>
            </div>
            <Link href="/episodes" className="text-xs font-bold text-amber-700 hover:underline">
              View All Episodes &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA at bottom */}
      <NewsletterForm />
    </div>
  )
}

