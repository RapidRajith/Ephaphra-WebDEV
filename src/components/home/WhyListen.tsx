'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const FEATURES = [
  {
    icon: (
      <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Beyond Doctor & Engineer',
    description: 'Deconstruct real career stories of people who stepped off standard STEM paths to build extraordinary lives.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h6m-6 0V11m0 0h6m-6 0H7" />
      </svg>
    ),
    title: 'Entrepreneur Journeys',
    description: 'In-depth interviews with D2C founders, agency owners, startup builders, and independent creators.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'YouTube @Epaphraa',
    description: 'High-quality 4K long-form podcast episodes with breakdown notes, timestamp guides, and resource links.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Practical Systems',
    description: 'Financial realities, risk management, family pressure, and actionable steps to monetize non-traditional crafts.',
  },
]

export default function WhyListen() {
  return (
    <section id="about" className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-[36px] bg-white/60 border border-white/90 p-8 sm:p-12 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col gap-10"
      >
        {/* Creator Bio Header & Expanded Editorial Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-slate-200/80 pb-12">
          {/* Host Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start gap-5 text-center sm:text-left bg-white/70 p-6 sm:p-8 rounded-3xl border border-white shadow-sm">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-slate-950 flex-shrink-0">
              <Image
                src="https://yt3.ggpht.com/9MWx6K2hcdf35k5v2Sr6fS8TvrqSvR0Ht5WorfdCqBOcgudQIe6K4BOTzIxKd7SmuiLdmrxhCug=s800-c-k-c0x00ffffff-no-rj"
                alt="Epaphra Creator Portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 mb-2">
                ABOUT THE HOST
              </span>
              <h3 className="text-3xl font-black text-slate-950 tracking-tight">Epaphra</h3>
              <p className="text-xs font-mono text-slate-500 font-semibold mt-1">Storyteller & Host of The ThirdLane Podcast</p>
            </div>

            {/* Quick Host Details */}
            <div className="w-full pt-4 border-t border-slate-200/80 flex flex-col gap-2.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Channel Debut</span>
                <span className="font-bold text-slate-950">March 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Core Focus</span>
                <span className="font-bold text-slate-950">Careers, Business & Systems</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Audience Reached</span>
                <span className="font-bold text-slate-950">164,000+ Subscribers</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Format</span>
                <span className="font-bold text-slate-950">4K Long-Form Podcast</span>
              </div>
            </div>
          </div>

          {/* Detailed Paragraphs About Epaphra */}
          <div className="lg:col-span-8 flex flex-col gap-5 text-slate-700 leading-relaxed font-medium">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                MEET EPAPHRA & THE THIRDLANE PHILOSOPHY
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight leading-tight">
                Deconstructing How The World System Actually Works
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
              Epaphra is an independent YouTube creator, podcaster, and deep-dive researcher obsessed with answering a single question: <strong className="text-slate-950 font-bold">How do modern systems of career, money, and freedom actually operate behind closed doors?</strong>
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Growing up in India, Epaphra observed how millions of young individuals are directed into rigid, pre-conditioned formulas—primarily Engineering or Medicine—without ever understanding alternative economic paths. Recognizing this gap, he launched <strong className="text-slate-950 font-bold">The ThirdLane Podcast</strong> to illuminate unorthodox journeys that standard educational systems never teach.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Through research-heavy conversations with D2C brand founders, agency builders, film analysts, creative artists, and financial experts, Epaphra cuts through fluff. He digs into raw unit economics, real startup failures, mental health struggles under family pressure, and practical blueprints for building an authentic, sustainable career in India today.
            </p>

            {/* Signature Quote Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden mt-2">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-serif text-8xl pointer-events-none select-none">
                “
              </div>
              <p className="text-sm sm:text-base italic font-serif text-slate-200 relative z-10 leading-relaxed">
                &quot;In a society obsessed with prescribed formulas, the most transformative wisdom lives in the third lane—where courage meets strategy, and standard rules no longer bind you.&quot;
              </p>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">— Epaphra</span>
                <span className="text-[11px] font-mono text-slate-400">Host, The ThirdLane</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-950 uppercase tracking-tight">The 4 Pillars of The Channel</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">What you gain every time you watch an episode</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/80 border border-white/90 backdrop-blur-2xl flex flex-col gap-3 group hover:border-slate-400 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
