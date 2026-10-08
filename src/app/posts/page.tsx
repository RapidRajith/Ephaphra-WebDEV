'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/posts/PostCard'
import { CommunityPost } from '@/types'
import { fetchCommunityPosts } from '@/lib/api'

const POST_CATEGORIES = [
  'All',
  'Podcast Breakdown',
  'Behind The Scenes',
  'Questions & Polls',
  'Mindset',
  'Announcements',
]

export default function PostsPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMonth, setSelectedMonth] = useState('All Months')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchCommunityPosts()
        setPosts(data)
      } catch (err) {
        console.error('Failed to load posts:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Dynamically compute unique months available across all fetched posts
  const availableMonths = useMemo(() => {
    const monthSet = new Set<string>()
    posts.forEach((p) => {
      if (p.publishedMonth) {
        monthSet.add(p.publishedMonth)
      }
    })
    return ['All Months', ...Array.from(monthSet)]
  }, [posts])

  // Filter posts based on category, month, & search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory

    const matchesMonth =
      selectedMonth === 'All Months' || post.publishedMonth === selectedMonth

    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesMonth && matchesSearch
  })

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col gap-10">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[36px] bg-white/70 border border-white/90 p-8 sm:p-12 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-200 w-max">
            YOUTUBE @EPAPHRAA COMMUNITY ({posts.length} POSTS)
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
            📱 Community Posts & Channel Notes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-3xl">
            Stay updated with Epaphra’s official YouTube channel posts, episode releases, behind-the-scenes podcast snapshots, and community poll breakdowns.
          </p>
        </div>

        {/* Filter Controls Bar: Category, Month & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {POST_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-md scale-105'
                      : 'bg-white/80 text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Dynamic Month Filter Selector */}
            <div className="flex items-center gap-2 bg-white/90 border border-slate-200 rounded-full px-4 py-2 shadow-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-950 focus:outline-none cursor-pointer pr-2"
              >
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input Bar */}
            <div className="relative min-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 shadow-sm"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts List / Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-slate-500 font-mono text-sm">
          Loading YouTube channel posts...
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white/50 border border-slate-200 text-slate-600 font-medium">
          No community posts found for {selectedMonth !== 'All Months' ? `"${selectedMonth}"` : ''} {selectedCategory !== 'All' ? `in category "${selectedCategory}"` : ''}.
        </div>
      )}
    </main>
  )
}
