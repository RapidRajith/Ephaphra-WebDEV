'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FloatingSidebar() {
  const [activeTab, setActiveTab] = useState('search')

  return (
    <aside aria-label="Quick Actions" className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6 px-3 py-6 rounded-full bg-white/70 border border-white/90 backdrop-blur-2xl shadow-[0_15px_35px_rgba(15,23,42,0.08)]">
      {/* Search Icon */}
      <Link href="/episodes" onClick={() => setActiveTab('search')}>
        <button
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
            activeTab === 'search'
              ? 'bg-slate-950 text-white shadow-md scale-110'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
          }`}
          title="Search Videos & Podcasts"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </Link>

      {/* Favorites / Featured */}
      <button
        onClick={() => setActiveTab('favorites')}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeTab === 'favorites'
            ? 'bg-rose-500 text-white shadow-md scale-110'
            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
        }`}
        title="Saved Episodes"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Downloads / Playlist */}
      <a
        href="https://www.youtube.com/show/VLPLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT?sbp=Kgtvdm83RVB0MmQ0WUAB"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setActiveTab('playlist')}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeTab === 'playlist'
            ? 'bg-amber-500 text-white shadow-md scale-110'
            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
        }`}
        title="YouTube Full Playlist"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>

      {/* Epaphra Profile */}
      <a
        href="https://www.youtube.com/@epaphraa"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setActiveTab('profile')}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeTab === 'profile'
            ? 'bg-slate-900 text-white shadow-md scale-110'
            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
        }`}
        title="Epaphra YouTube Channel"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </a>

      {/* Info */}
      <a
        href="#about"
        onClick={() => setActiveTab('info')}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeTab === 'info'
            ? 'bg-slate-800 text-white shadow-md scale-110'
            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
        }`}
        title="About Explore with Epaphra"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </aside>
  )
}
