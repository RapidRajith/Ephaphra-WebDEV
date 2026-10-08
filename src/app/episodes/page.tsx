'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/episodes/SearchBar'
import FilterPanel from '@/components/episodes/FilterPanel'
import EpisodeGrid from '@/components/episodes/EpisodeGrid'
import Pagination from '@/components/common/Pagination'
import { Episode } from '@/types'
import { fetchEpisodes } from '@/lib/api'

const ITEMS_PER_PAGE = 6

function EpisodesContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get('category') || 'All'
  const queryParam = searchParams?.get('q') || ''

  const [episodesList, setEpisodesList] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedMonth, setSelectedMonth] = useState('All Months')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam)
    if (queryParam) setSearchQuery(queryParam)
  }, [categoryParam, queryParam])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchEpisodes()
        setEpisodesList(data)
      } catch (err) {
        console.error('Failed to fetch YouTube episodes:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Extract available months dynamically from episodes list
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>()
    episodesList.forEach((ep) => {
      if (ep.publishedAt) {
        const d = new Date(ep.publishedAt)
        if (!isNaN(d.getTime())) {
          const monthYear = d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
          monthsSet.add(monthYear)
        }
      }
    })
    return Array.from(monthsSet)
  }, [episodesList])

  // Filter & Sort logic
  const filteredEpisodes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return episodesList
      .filter((ep) => {
        const matchesCategory = selectedCategory === 'All' || ep.category === selectedCategory
        
        let matchesMonth = true
        if (selectedMonth !== 'All Months' && ep.publishedAt) {
          const d = new Date(ep.publishedAt)
          if (!isNaN(d.getTime())) {
            const mYear = d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
            matchesMonth = mYear === selectedMonth
          }
        }

        const matchesQuery =
          q === '' ||
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          (ep.guest && ep.guest.toLowerCase().includes(q)) ||
          ep.category.toLowerCase().includes(q) ||
          ep.tags.some((tag) => tag.toLowerCase().includes(q))

        return matchesCategory && matchesMonth && matchesQuery
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        }
        if (sortBy === 'oldest') {
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        }
        if (sortBy === 'popular') {
          return (b as any).rawViewCount ? (b as any).rawViewCount - ((a as any).rawViewCount || 0) : b.episodeNumber - a.episodeNumber
        }
        if (sortBy === 'duration') {
          return b.duration - a.duration
        }
        return 0
      })
  }, [episodesList, searchQuery, selectedCategory, selectedMonth, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredEpisodes.length / ITEMS_PER_PAGE)
  const paginatedEpisodes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredEpisodes.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredEpisodes, currentPage])

  const handlePlay = (id: string) => {
    const ep = episodesList.find((e) => e.id === id)
    if (ep?.youtubeUrl) {
      window.open(ep.youtubeUrl, '_blank')
    } else {
      window.location.href = `/episodes/${id}`
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full self-center font-bold">
          Explore with Epaphra Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          All YouTube Podcast Episodes
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Explore all official episodes from Epaphraa’s YouTube playlist on alternative careers, entrepreneurship, and creative journeys.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-6">
        <SearchBar value={searchQuery} onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} />
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
          selectedMonth={selectedMonth}
          onMonthChange={(month) => { setSelectedMonth(month); setCurrentPage(1); }}
          sortBy={sortBy}
          onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}
          availableMonths={availableMonths}
        />
      </div>

      {/* Active Filter indicator */}
      {(selectedCategory !== 'All' || selectedMonth !== 'All Months' || searchQuery) && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-700">
            <span>Showing <strong className="text-slate-950">{filteredEpisodes.length}</strong> episodes</span>
            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-white font-mono text-[11px]">Category: {selectedCategory}</span>
            )}
            {selectedMonth !== 'All Months' && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-white font-mono text-[11px]">Month: {selectedMonth}</span>
            )}
          </div>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedMonth('All Months'); setSearchQuery(''); }}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Episodes Grid */}
      <EpisodeGrid episodes={paginatedEpisodes} onPlayClick={handlePlay} isLoading={isLoading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  )
}

export default function EpisodesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-slate-500">Loading episodes...</div>}>
      <EpisodesContent />
    </Suspense>
  )
}
