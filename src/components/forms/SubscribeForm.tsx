'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import FormInput from './FormInput'
import FormCheckbox from './FormCheckbox'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!agreed) {
      setError('You must agree to the privacy policy')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail('')
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={error}
            disabled={isSubmitting || success}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting || success}
          className="whitespace-nowrap sm:self-start h-[50px]"
        >
          {success ? 'Subscribed!' : 'Subscribe'}
        </Button>
      </div>

      <FormCheckbox
        label="I agree to receive new episode alerts & exclusive updates."
        checked={agreed}
        onChange={setAgreed}
        disabled={isSubmitting || success}
      />

      {success && (
        <motion.p
          className="text-emerald-400 text-sm font-medium flex items-center gap-2 pt-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
            ✓
          </span>
          Successfully subscribed! Check your inbox for updates.
        </motion.p>
      )}
    </motion.form>
  )
}
