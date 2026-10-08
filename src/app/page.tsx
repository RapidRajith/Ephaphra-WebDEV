'use client'

import { useState, useEffect } from 'react'
import CreatorBanner from '@/components/home/CreatorBanner'
import HeroSection from '@/components/home/HeroSection'
import FeaturedEpisode from '@/components/home/FeaturedEpisode'
import WhyListen from '@/components/home/WhyListen'
import RecentPosts from '@/components/home/RecentPosts'
import SocialConnectBox from '@/components/home/SocialConnectBox'
import NewsletterForm from '@/components/home/NewsletterForm'
import EpisodeCard from '@/components/episodes/EpisodeCard'
import { Episode, CommunityPost } from '@/types'
import { fetchEpisodes, fetchCommunityPosts } from '@/lib/api'

export default function Home() {
  const [episodesList, setEpisodesList] = useState<Episode[]>([])
  const [postsList, setPostsList] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [epData, postsData] = await Promise.all([
          fetchEpisodes(),
          fetchCommunityPosts(),
        ])
        setEpisodesList(epData)
        setPostsList(postsData)
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Sort episodes by view count for the "Most Viewed" section
  const mostViewedEpisodes = [...episodesList]
    .sort((a, b) => (b.rawViewCount || 0) - (a.rawViewCount || 0))
    .slice(0, 6)

  const featuredEp = mostViewedEpisodes[0] || episodesList[0]

  const handlePlayEpisode = (episodeId: string) => {
    const ep = episodesList.find((e) => e.id === episodeId)
    if (ep?.youtubeUrl) {
      window.open(ep.youtubeUrl, '_blank')
    } else {
      window.location.href = `/episodes/${episodeId}`
    }
  }

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Official YouTube Creator Banner Header */}
      <CreatorBanner />

      {/* Interactive Liquid Glass Hero Window */}
      <HeroSection onPlayClick={() => featuredEp && handlePlayEpisode(featuredEp.id)} />

      {/* Why Listen / About Epaphra Section (Placed BEFORE video contents as requested) */}
      <WhyListen />

      {/* Featured #1 Most Viewed Episode Section */}
      {featuredEp && <FeaturedEpisode episode={featuredEp} onPlayClick={handlePlayEpisode} />}

      {/* Most Viewed Episodes Grid Section */}
      {mostViewedEpisodes.length > 0 && (
        <section className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-8 rounded-full bg-slate-950" />
              <div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
                  🔥 Most Viewed Episodes
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Top performing conversations on Epaphraa’s YouTube channel (Over 1M+ views)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostViewedEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onPlayClick={handlePlayEpisode} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Uploaded YouTube Channel Posts Section */}
      <RecentPosts posts={postsList} />

      {/* Official Social Media Community Box */}
      <SocialConnectBox />

      {/* Fan Feedback & Learning Submission Form Section */}
      <NewsletterForm />
    </div>
  )
}

