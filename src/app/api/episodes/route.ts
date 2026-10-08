import { NextResponse } from 'next/server'
import { getPlaylistEpisodes } from '@/lib/youtube'

export async function GET() {
  try {
    const episodes = await getPlaylistEpisodes()
    return NextResponse.json(
      {
        success: true,
        count: episodes.length,
        playlistId: 'PLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT',
        data: episodes,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('[API /api/episodes] Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch playlist episodes' },
      { status: 500 }
    )
  }
}
