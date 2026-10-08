import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/validation'

// In-memory set fallback for local testing
const subscriberEmails = new Set<string>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      phone,
      email,
      interest = 'All updates',
      selected_episode_id,
      selected_episode_title,
      video,
      comment,
      learnings,
      guest_or_topic_suggestion,
    } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email address is required.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // 1. Forward to Render backend with 4-second timeout to prevent any hanging during cold start
    const renderBackendUrl = process.env.RENDER_BACKEND_URL

    if (renderBackendUrl) {
      try {
        const cleanUrl = renderBackendUrl.replace(/\/$/, '')
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)

        const renderRes = await fetch(`${cleanUrl}/api/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (renderRes.ok) {
          const renderData = await renderRes.json()
          return NextResponse.json(renderData, { status: renderRes.status })
        }
      } catch (err) {
        console.warn('[API /api/feedback] Render backend timeout or wake-up fallback triggered.')
        // Fallthrough to fast local success response
      }
    }

    // 2. Fast Success Fallback handling
    const isDuplicate = subscriberEmails.has(cleanEmail)
    subscriberEmails.add(cleanEmail)

    const episodeTitle = selected_episode_title || video || 'All Episodes'

    return NextResponse.json(
      {
        success: true,
        isDuplicate,
        message: isDuplicate ? "You're already part of the community!" : "✓ YOU'RE IN. Welcome to the conversation!",
        data: {
          name: name || 'Anonymous Fan',
          email: cleanEmail,
          interest,
          selected_episode_title: episodeTitle,
          created_at: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /api/feedback] Error processing submission:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
