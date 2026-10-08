'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import FormInput from './FormInput'
import { fetchEpisodes } from '@/lib/api'
import { Episode } from '@/types'

const INTEREST_OPTIONS = [
  'All updates',
  'New podcast episodes',
  'Behind the scenes',
  'Creator updates',
  'Guest announcements',
  'Exclusive content',
  'Short clips / highlights',
]

export default function FanFeedbackForm() {
  const [episodesList, setEpisodesList] = useState<Episode[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('All updates')
  const [selectedVideoId, setSelectedVideoId] = useState('')
  const [comment, setComment] = useState('')
  const [guestSuggestion, setGuestSuggestion] = useState('')

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isDuplicate, setIsDuplicate] = useState(false)

  useEffect(() => {
    async function loadEpisodes() {
      const data = await fetchEpisodes()
      setEpisodesList(data)
      if (data.length > 0) {
        setSelectedVideoId(data[0].id)
      }
    }
    loadEpisodes()
  }, [])

  const selectedEpisode = episodesList.find((ep) => ep.id === selectedVideoId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          interest,
          selected_episode_id: selectedVideoId,
          selected_episode_title: selectedEpisode?.title || 'All Episodes',
          video: selectedEpisode?.title || 'All Episodes',
          comment: comment.trim(),
          learnings: comment.trim(),
          guest_or_topic_suggestion: guestSuggestion.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.isDuplicate) {
          setIsDuplicate(true)
          setSuccessMessage(result.message || "You're already part of the conversation.")
        } else {
          setIsDuplicate(false)
          setSuccessMessage(result.message || "✓ YOU'RE IN. Welcome to the conversation.")
          setName('')
          setPhone('')
          setEmail('')
          setComment('')
          setGuestSuggestion('')
        }
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-5 w-full text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma"
          disabled={isSubmitting || !!successMessage}
        />

        <FormInput
          label="Email Address (Required)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. rahul@example.com"
          disabled={isSubmitting || !!successMessage}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="interest-select" className="text-sm font-semibold text-slate-800">
            What are you interested in?
          </label>
          <select
            id="interest-select"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            disabled={isSubmitting || !!successMessage}
            className="px-5 py-3.5 bg-white/80 border border-white/90 rounded-2xl text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all duration-200 backdrop-blur-md shadow-sm text-sm font-medium cursor-pointer"
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                • {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="video-select" className="text-sm font-semibold text-slate-800">
            Favorite / Relevant Episode
          </label>
          <select
            id="video-select"
            value={selectedVideoId}
            onChange={(e) => setSelectedVideoId(e.target.value)}
            disabled={isSubmitting || !!successMessage}
            className="px-5 py-3.5 bg-white/80 border border-white/90 rounded-2xl text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all duration-200 backdrop-blur-md shadow-sm text-sm font-medium cursor-pointer"
          >
            {episodesList.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {ep.title} {ep.guest ? `(ft. ${ep.guest})` : ''}
              </option>
            ))}
            <option value="all">Other / All Episodes</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="comment-input" className="text-sm font-semibold text-slate-800">
          Message / Feedback (Optional)
        </label>
        <textarea
          id="comment-input"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What would you like to see or hear next? Tell Epaphra what you enjoyed..."
          disabled={isSubmitting || !!successMessage}
          className="px-5 py-3.5 bg-white/80 border border-white/90 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all duration-200 backdrop-blur-md shadow-sm text-sm font-medium resize-none"
        />
      </div>

      <FormInput
        label="Suggest a Guest or Topic (Optional)"
        type="text"
        value={guestSuggestion}
        onChange={(e) => setGuestSuggestion(e.target.value)}
        placeholder="e.g. Navigating D2C marketing with a founder..."
        disabled={isSubmitting || !!successMessage}
      />

      {error && (
        <span className="text-xs text-red-600 font-semibold">{error}</span>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting || !!successMessage}
        className="w-full h-12 shadow-md mt-1"
      >
        {isSubmitting ? 'SUBSCRIBING...' : successMessage ? '✓ YOU\'RE IN' : 'JOIN THE CONVERSATION'}
      </Button>

      {/* Privacy Note */}
      <p className="text-[11px] text-slate-600 text-center font-medium">
        By subscribing, you agree to receive updates from the creator. Unsubscribe anytime.
      </p>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-2xl border text-sm font-medium flex items-center justify-between gap-3 ${
            isDuplicate
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
              isDuplicate ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {isDuplicate ? 'ℹ' : '✓'}
            </div>
            <div>
              <p className="font-extrabold text-base">{successMessage}</p>
              <p className="text-xs opacity-90">
                {isDuplicate
                  ? 'You are already registered for Epaphraa’s insider updates.'
                  : 'Welcome to the community! You’ll hear from us when something interesting is happening.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="text-xs font-bold underline hover:opacity-80"
          >
            Submit Another
          </button>
        </motion.div>
      )}
    </motion.form>
  )
}
