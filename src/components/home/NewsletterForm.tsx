'use client'

import { motion } from 'framer-motion'
import FanFeedbackForm from '@/components/forms/FanFeedbackForm'

export default function NewsletterForm() {
  return (
    <section id="newsletter" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-[36px] bg-white/65 border border-white/90 p-8 sm:p-14 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-3xl text-center flex flex-col items-center gap-8"
      >
        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-800 bg-white/90 border border-slate-200 px-4 py-1.5 rounded-full shadow-sm font-bold">
            Interactive Fan Community & Feedback
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight leading-tight">
            Share Your Favourite Video & Key Learnings
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            What episode of Explore with Epaphra resonated with you most? Tell Epaphra what you learned and how it influenced your career path.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <FanFeedbackForm />
        </div>
      </motion.div>
    </section>
  )
}
