'use client'

import Link from 'next/link'
import PostCard from '@/components/posts/PostCard'
import { CommunityPost } from '@/types'

interface RecentPostsProps {
  posts: CommunityPost[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  // Take top 3 recent posts
  const recentThree = posts.slice(0, 3)

  if (!recentThree || recentThree.length === 0) return null

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Section Header with View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 rounded-full bg-slate-950" />
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
              YOUTUBE COMMUNITY UPDATES
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
              📱 Recently Uploaded Posts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Short thoughts, channel polls, and behind-the-scenes notes from @Epaphraa
            </p>
          </div>
        </div>

        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-105 self-start sm:self-auto"
        >
          <span>View All Posts</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* 3 Grid Column Layout for Home Page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recentThree.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
