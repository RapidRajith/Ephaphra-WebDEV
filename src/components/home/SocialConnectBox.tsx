'use client'

import { motion } from 'framer-motion'

export const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    handle: '@Epaphraa',
    subtitle: '900K+ Subscribers • Full 4K Video Episodes',
    url: 'https://www.youtube.com/@epaphraa',
    badge: 'Main Channel',
    icon: (
      <svg className="w-6 h-6 fill-current text-red-600" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    bgColor: 'hover:border-red-500/40 hover:bg-red-50/30',
  },
  {
    name: 'Spotify',
    handle: 'TheThirdLane Podcast',
    subtitle: 'Listen to Full Audio Episodes Anywhere',
    url: 'https://open.spotify.com/show/4q3YzOx6wq0qc8WtfqgGyp',
    badge: 'Audio Podcast',
    icon: (
      <svg className="w-6 h-6 fill-current text-emerald-600" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.38-.42-.18-.6.42-1.2.6-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.479.3z" />
      </svg>
    ),
    bgColor: 'hover:border-emerald-500/40 hover:bg-emerald-50/30',
  },
  {
    name: 'Instagram (Main)',
    handle: '@explorewithepaphra',
    subtitle: 'Daily Stories & Personal Behind The Scenes',
    url: 'https://www.instagram.com/explorewithepaphra/',
    badge: 'Creator Page',
    icon: (
      <svg className="w-6 h-6 fill-current text-pink-600" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    bgColor: 'hover:border-pink-500/40 hover:bg-pink-50/30',
  },
  {
    name: 'Instagram (Podcast)',
    handle: '@thethirdlanepodcast',
    subtitle: 'Official Episode Clips & Highlights',
    url: 'https://www.instagram.com/thethirdlanepodcast/',
    badge: 'Podcast Clips',
    icon: (
      <svg className="w-6 h-6 fill-current text-purple-600" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    bgColor: 'hover:border-purple-500/40 hover:bg-purple-50/30',
  },
  {
    name: 'LinkedIn',
    handle: 'Explore with Epaphra',
    subtitle: 'Career Frameworks & Essays',
    url: 'https://www.linkedin.com/in/explorewithepaphra/',
    badge: 'Professional',
    icon: (
      <svg className="w-6 h-6 fill-current text-blue-700" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    bgColor: 'hover:border-blue-500/40 hover:bg-blue-50/30',
  },
]

export default function SocialConnectBox() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-[36px] bg-white/60 border border-white/90 p-8 sm:p-12 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col gap-8"
      >
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-800 bg-white/90 border border-slate-200 px-4 py-1.5 rounded-full w-fit shadow-sm font-bold">
            FOLLOW THE CONVERSATION
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
            Connect Across All Platforms
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Follow Epaphra across Spotify, Instagram, LinkedIn, YouTube, and X for daily episode clips, behind-the-scenes, and career insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-3xl bg-white/80 border border-white/90 flex flex-col justify-between gap-6 transition-all duration-300 group shadow-sm hover:shadow-md ${social.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {social.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {social.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-slate-950 group-hover:text-amber-700 transition-colors">
                  {social.name}
                </h3>
                <span className="text-xs font-mono text-slate-700 font-bold">{social.handle}</span>
                <p className="text-[11px] text-slate-500 leading-snug font-normal mt-1">
                  {social.subtitle}
                </p>
              </div>

              <div className="text-xs font-bold text-slate-950 group-hover:translate-x-1 transition-transform flex items-center gap-1 pt-2 border-t border-slate-200/60">
                Follow &rarr;
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
