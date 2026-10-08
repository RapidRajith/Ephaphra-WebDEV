'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white/60 border-t border-slate-200/80 pt-16 pb-12 relative overflow-hidden backdrop-blur-2xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-base tracking-tight">Explore with Epaphra</span>
                <span className="text-xs text-slate-600 font-mono">@Epaphraa</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Unfiltered conversations with entrepreneurs, creators, and pioneers who chose alternative career paths outside traditional Engineering & Medicine.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@epaphraa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                YouTube Channel
              </a>
              <a
                href="https://www.youtube.com/show/VLPLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT?sbp=Kgtvdm83RVB0MmQ0WUAB"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 transition-all text-xs font-semibold shadow-sm"
              >
                Playlist
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-medium">
              <li><Link href="/" className="hover:text-slate-950 transition-colors">Home</Link></li>
              <li><Link href="/episodes" className="hover:text-slate-950 transition-colors">All Video Episodes</Link></li>
              <li><Link href="/posts" className="hover:text-slate-950 transition-colors">Community Posts</Link></li>
              <li><a href="#about" className="hover:text-slate-950 transition-colors">About Epaphra</a></li>
              <li><a href="#newsletter" className="hover:text-slate-950 transition-colors">Subscribe</a></li>
            </ul>
          </div>

          {/* Topics */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Topics</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-medium">
              <li><Link href="/episodes?category=Unconventional+Paths" className="hover:text-slate-950 transition-colors">Unconventional Paths</Link></li>
              <li><Link href="/episodes?category=Entrepreneurs" className="hover:text-slate-950 transition-colors">Entrepreneurs & Founders</Link></li>
              <li><Link href="/episodes?category=Creative+Arts" className="hover:text-slate-950 transition-colors">Creative Arts & Design</Link></li>
              <li><Link href="/episodes?category=Content+Creation" className="hover:text-slate-950 transition-colors">Content Creation & YouTube</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Channel & Contact</h4>
            <p className="text-sm text-slate-600 font-normal">
              Interested in being featured on Explore with Epaphra or pitching an episode story?
            </p>
            <a href="mailto:epaphraa@gmail.com" className="text-sm text-slate-950 font-bold hover:underline">
              epaphraa@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} Explore with Epaphra (@Epaphraa). All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap">
            <a href="https://www.youtube.com/@epaphraa" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-semibold">YouTube</a>
            <a href="https://open.spotify.com/show/4q3YzOx6wq0qc8WtfqgGyp" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-semibold">Spotify</a>
            <a href="https://www.instagram.com/explorewithepaphra/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-semibold">Instagram</a>
            <a href="https://www.linkedin.com/in/explorewithepaphra/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-semibold">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
