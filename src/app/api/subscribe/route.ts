import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email address is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Process subscription logic (e.g. database save or ESP integration)
    console.log(`[API /subscribe] New newsletter subscriber: ${email}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the Third Lane newsletter!',
        email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /subscribe] Error handling request:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
