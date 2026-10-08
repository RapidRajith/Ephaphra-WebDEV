'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CommunityPost } from '@/types'

interface PostCardProps {
  post: CommunityPost
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(() => {
    // Parse like count for interactive toggle
    return post.likeCount
  })
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-white/70 border border-white/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] flex flex-col gap-5 hover:bg-white hover:border-slate-300 transition-all duration-300"
      >
        {/* Post Header: Avatar, Name, Handle, Date & Category */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-slate-950 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-950">{post.author.name}</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>{post.author.handle}</span>
                <span>•</span>
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </div>

          {post.category && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {post.category}
            </span>
          )}
        </div>

        {/* Pinned Badge if applicable */}
        {post.pinned && (
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-max">
            <svg className="w-3.5 h-3.5 fill-current text-amber-600" viewBox="0 0 24 24">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
            </svg>
            Pinned Channel Post
          </div>
        )}

        {/* Post Body Content */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line">
          {post.content}
        </div>

        {/* Community Poll Widget if present */}
        {post.pollOptions && post.pollOptions.length > 0 && (
          <div className="flex flex-col gap-2.5 p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-200/80 my-1">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">
              COMMUNITY POLL RESULTS
            </span>
            {post.pollOptions.map((opt, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>{opt.text}</span>
                  <span>{opt.votesPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-slate-900 to-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${opt.votesPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Attached Images Grid */}
        {post.images && post.images.length > 0 && (
          <div
            className={`grid gap-3 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm ${
              post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {post.images.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className="relative h-64 sm:h-72 w-full bg-slate-100 cursor-pointer group overflow-hidden"
              >
                <Image
                  src={imgUrl}
                  alt={`Community Post Image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-950 text-xs font-bold shadow-md">
                    Click to Enlarge 🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Footer Actions: Likes, Comments, View on YouTube */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-6">
            {/* Interactive Like Toggle Button */}
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full ${
                isLiked
                  ? 'bg-red-50 text-red-600 font-bold border border-red-200'
                  : 'hover:text-red-600 hover:bg-slate-100'
              }`}
            >
              <svg
                className={`w-4 h-4 ${isLiked ? 'fill-current text-red-600' : 'fill-none stroke-current'}`}
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{isLiked ? 'Liked' : likes}</span>
            </button>

            {/* Comments Counter */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{post.commentCount} Comments</span>
            </div>
          </div>

          {/* View Original Post on YouTube */}
          <a
            href={post.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-red-600 transition-colors"
          >
            <span>YouTube Post</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </motion.article>

      {/* Enlarged Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Enlarged Post Preview"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
