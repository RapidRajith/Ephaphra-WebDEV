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

    // 1. If Render backend URL is configured in environment variables, forward to Render Express + MongoDB backend
    const renderBackendUrl = process.env.RENDER_BACKEND_URL

    if (renderBackendUrl) {
      try {
        const renderRes = await fetch(`${renderBackendUrl}/api/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        const renderData = await renderRes.json()
        return NextResponse.json(renderData, { status: renderRes.status })
      } catch (err) {
        console.error('[API /api/feedback] Render backend forwarding error:', err)
        // Fallthrough to local fallback if Render service is waking up
      }
    }

    // 2. Local Fallback handling
    const isDuplicate = subscriberEmails.has(cleanEmail)
    subscriberEmails.add(cleanEmail)

    if (isDuplicate) {
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          message: "You're already part of the conversation.",
          data: { email: cleanEmail },
        },
        { status: 200 }
      )
    }

    const episodeTitle = selected_episode_title || video || 'All Episodes'
    const episodeId = selected_episode_id || ''
    const userFeedback = learnings || comment || ''

    console.log('[API /api/feedback] New Fan Submission:', {
      id: `sub_${Date.now()}`,
      name: name || 'Anonymous Fan',
      phone: phone || '',
      email: cleanEmail,
      interest,
      selected_episode_id: episodeId,
      selected_episode_title: episodeTitle,
      comment: userFeedback,
      guest_or_topic_suggestion: guest_or_topic_suggestion || '',
      created_at: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        isDuplicate: false,
        message: "YOU'RE IN. Welcome to the conversation!",
        data: {
          name,
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
