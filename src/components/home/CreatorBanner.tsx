'use client'

import Image from 'next/image'

export default function CreatorBanner() {
  return (
    <section className="w-full pt-28 pb-6 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Outer Frosted Glass Container */}
      <div className="relative rounded-[36px] bg-white/60 border border-white/90 backdrop-blur-3xl overflow-hidden shadow-[0_25px_70px_rgba(15,23,42,0.07)] p-4 sm:p-6 flex flex-col gap-6">
        
        {/* YouTube Channel Banner Frame */}
        <div className="relative w-full h-44 sm:h-64 lg:h-72 rounded-[28px] overflow-hidden bg-slate-900 border border-white/80 shadow-inner group">
          <Image
            src="https://yt3.googleusercontent.com/CF6Lyi3T-BEECd1NTHP2f7WTAXNpiv6A0y1yaz8H-b-UB8aGZdQFithh2wXVyF8-_BGuMF4pTw"
            alt="Explore with Epaphra YouTube Channel Banner"
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          {/* Channel Tag Overlay */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            Official YouTube Channel • @epaphraa
          </div>
        </div>

        {/* Creator Info & Expressive Display Typography Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-4 sm:px-6 pt-2 pb-4">
          
          {/* Avatar + Bold Typography Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0 bg-slate-900">
              <Image
                src="https://yt3.ggpht.com/9MWx6K2hcdf35k5v2Sr6fS8TvrqSvR0Ht5WorfdCqBOcgudQIe6K4BOTzIxKd7SmuiLdmrxhCug=s800-c-k-c0x00ffffff-no-rj"
                alt="Epaphra Avatar"
                fill
                className="object-cover"
              />
            </div>

            {/* Expressive Display Typography (Mixed Font Sizes: Big & Small) */}
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 font-extrabold block">
                HOSTED BY EPAPHRA • @EPAPHRAA
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-950 uppercase tracking-tight leading-[0.95] mt-1">
                MAKE DOPE <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600">STUFF</span>
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-700 tracking-normal capitalize mt-1">
                  Unconventional Career Stories & Entrepreneurship
                </span>
              </h1>
            </div>
          </div>

          {/* YouTube Action CTA */}
          <a
            href="https://www.youtube.com/@epaphraa"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start lg:self-end px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-3 shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>

        {/* Live Channel Statistics Grid (Subscribers, Views, Started Date, Total Videos) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-white/70 border border-white/90 backdrop-blur-2xl shadow-sm">
          <div className="flex flex-col p-4 rounded-2xl bg-white/80 border border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">Subscribers</span>
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-950 mt-1">900K+</span>
            <span className="text-[11px] text-slate-500">Active YouTube Community</span>
          </div>

          <div className="flex flex-col p-4 rounded-2xl bg-white/80 border border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">Total Views</span>
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-950 mt-1">238M+</span>
            <span className="text-[11px] text-slate-500">Video Views Worldwide</span>
          </div>

          <div className="flex flex-col p-4 rounded-2xl bg-white/80 border border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">Channel Joined</span>
            <span className="font-display font-black text-xl sm:text-2xl text-slate-950 mt-1">Sep 27, 2020</span>
            <span className="text-[11px] text-slate-500">Started Exploring Reality</span>
          </div>

          <div className="flex flex-col p-4 rounded-2xl bg-white/80 border border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">Total Videos</span>
            <span className="font-display font-black text-2xl sm:text-3xl text-slate-950 mt-1">553+</span>
            <span className="text-[11px] text-slate-500">Episodes & Short Films</span>
          </div>
        </div>

      </div>
    </section>
  )
}
