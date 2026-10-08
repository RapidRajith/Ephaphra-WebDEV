import { Episode } from '@/types'

const PLAYLIST_ID = 'PLvwsqRScrkH6Xp6IPuLV3mYHZmFzXPXQT'

export function parseISO8601Duration(durationStr: string): number {
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)

  return hours * 3600 + minutes * 60 + seconds
}

export function formatCompactNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseInt(num, 10) : num
  if (isNaN(n) || n === 0) return '0'

  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

/**
 * Dynamically categorizes a video and generates relevant tags based on title and description.
 */
function categorizeVideo(title: string, description: string): { category: string; tags: string[] } {
  const t = title.toLowerCase()
  const d = description.toLowerCase()

  let category = 'Unconventional Paths'
  const tags: string[] = ['Epaphraa', 'ThirdLane Podcast']

  // 1. Creative Arts (Cinema, Acting, Media, Art, Film, Music, Comedy, Entertainment)
  if (
    t.includes('film') ||
    t.includes('cinema') ||
    t.includes('actor') ||
    t.includes('art') ||
    t.includes('music') ||
    t.includes('kisthenics') ||
    t.includes('vasuki') ||
    t.includes('rio raj') ||
    t.includes('makapa') ||
    t.includes('media industry') ||
    t.includes('sudhir')
  ) {
    category = 'Creative Arts'
    tags.push('Creative Arts', 'Cinema', 'Acting', 'Film', 'Music', 'Media', 'Entertainment')
  }
  // 2. Content Creation (Youtube, Content Creation, Marketing, Social Media, Creators, Branding)
  else if (
    t.includes('content creation') ||
    t.includes('marketing') ||
    t.includes('rahul m') ||
    t.includes('deepan') ||
    t.includes('youtube') ||
    t.includes('creator') ||
    t.includes('media') ||
    d.includes('content creation')
  ) {
    category = 'Content Creation'
    tags.push('Content Creation', 'YouTube', 'Marketing', 'Creator Economy', 'Branding')
  }
  // 3. Unconventional Paths (Overcoming struggle, village, purpose, tragedy, mindset, middle class trap, alternative career)
  else if (
    t.includes('refused a normal life') ||
    t.includes('disappeared') ||
    t.includes('middle class trap') ||
    t.includes('purpose in life') ||
    t.includes('tragedy') ||
    t.includes('dark phase') ||
    t.includes('death') ||
    t.includes('boy from the village') ||
    t.includes('from coolie') ||
    t.includes('small town') ||
    t.includes('happiness') ||
    t.includes('chase') ||
    t.includes('ratheesh') ||
    t.includes('indu') ||
    t.includes('hard work will not make you rich') ||
    t.includes('unconventional')
  ) {
    category = 'Unconventional Paths'
    tags.push('Unconventional Paths', 'Alternative Career', 'Mindset', 'Reality', 'Life Lessons')
  }
  // 4. Entrepreneurs (Business, D2C, Startup, Wealth, Stocks, Real Estate, Investment, Crores, Founder)
  else if (
    t.includes('wealth') ||
    t.includes('d2c') ||
    t.includes('cookd') ||
    t.includes('franchise') ||
    t.includes('stocks') ||
    t.includes('company') ||
    t.includes('restaurant') ||
    t.includes('founder') ||
    t.includes('startup') ||
    t.includes('business') ||
    t.includes('investing') ||
    t.includes('invest') ||
    t.includes('crore') ||
    t.includes('entrepreneur') ||
    t.includes('rich') ||
    t.includes('finance')
  ) {
    category = 'Entrepreneurs'
    tags.push('Entrepreneurs', 'Startup', 'Finance', 'Wealth', 'Business', 'D2C', 'Founders')
  } else {
    category = 'Unconventional Paths'
    tags.push('Unconventional Paths', 'Alternative Career', 'Mindset')
  }

  return { category, tags }
}

export function cleanEpisodeDescription(desc: string, title?: string): string {
  if (!desc) {
    return `In this episode of Explore with Epaphra, Epaphra hosts an in-depth conversation on career choices, mindset, and building real assets.`
  }

  const stopTriggers = [
    'by the way, these are investment',
    'open your demat account',
    'get help choosing health',
    'research stocks and invest',
    'about me',
    'about epaphra',
    'about the thirdlane',
    'about thethirdlane',
    'you can also find me on',
    'follow me on',
    'follow on instagram',
    'follow on linkedin',
    'follow on spotify',
    'follow on twitter',
    'timestamps',
    '🔗',
    'ditto',
    'zerodha',
    'tickertape',
    'smallcase',
    'groww',
    'upstox',
    'sponsorship',
    'sponsored by',
    'use code',
    'discount',
    'http://',
    'https://',
  ]

  const lines = desc.split('\n')
  const cleanLines: string[] = []

  for (const line of lines) {
    const lower = line.toLowerCase().trim()

    // Stop at any sponsor trigger, social link, about me block, or timestamp
    const shouldStop = stopTriggers.some((trigger) => lower.includes(trigger))
    if (shouldStop) {
      break
    }

    // Ignore empty divider lines or standalone timestamp lines
    if (lower.startsWith('---') || lower.startsWith('===') || lower.startsWith('***')) continue

    cleanLines.push(line)
  }

  const result = cleanLines.join('\n').trim()
  if (result.length < 35) {
    return `In this episode of Explore with Epaphra, Epaphra hosts an unscripted deep-dive discussion on ${title ? `"${title}"` : 'alternative career paths, mindset, and entrepreneurship'}.`
  }

  return result
}

export async function getPlaylistEpisodes(): Promise<Episode[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyBIQ82MO17RtcjYp47ns70loV5U5YedmyA'

  try {
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${PLAYLIST_ID}&key=${apiKey}`
    const res = await fetch(playlistUrl, { next: { revalidate: 3600 } })

    if (!res.ok) {
      console.error(`[YouTube API Error] Playlist fetch returned ${res.status}`)
      return getFallbackEpisodes()
    }

    const playlistData = await res.json()
    const items = playlistData.items || []

    if (items.length === 0) {
      return getFallbackEpisodes()
    }

    const videoIds = items.map((item: any) => item.snippet.resourceId.videoId).join(',')

    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`
    const videoRes = await fetch(videoDetailsUrl, { next: { revalidate: 3600 } })

    if (!videoRes.ok) {
      console.error(`[YouTube API Error] Video details fetch returned ${videoRes.status}`)
      return getFallbackEpisodes()
    }

    const videoData = await videoRes.json()
    const videoDetailsMap = new Map<string, any>()
    videoData.items?.forEach((vid: any) => {
      videoDetailsMap.set(vid.id, vid)
    })

    const episodes: Episode[] = items.map((item: any, index: number) => {
      const videoId = item.snippet.resourceId.videoId
      const detail = videoDetailsMap.get(videoId)

      const title = item.snippet.title || 'Explore with Epaphra'
      const rawDescription = item.snippet.description || ''
      const description = cleanEpisodeDescription(rawDescription, title)
      const publishedAt = item.snippet.publishedAt ? item.snippet.publishedAt.split('T')[0] : '2024-01-01'

      const thumbnails = item.snippet.thumbnails
      const thumbnailUrl =
        thumbnails?.maxres?.url ||
        thumbnails?.high?.url ||
        thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

      const durationStr = detail?.contentDetails?.duration || 'PT45M'
      const duration = parseISO8601Duration(durationStr)

      const rawViewCount = parseInt(detail?.statistics?.viewCount || '0', 10)
      const rawLikeCount = parseInt(detail?.statistics?.likeCount || '0', 10)

      const viewCount = formatCompactNumber(rawViewCount)
      const likeCount = formatCompactNumber(rawLikeCount)

      const { category, tags } = categorizeVideo(title, rawDescription)

      return {
        id: videoId,
        title,
        description,
        thumbnail: thumbnailUrl,
        duration,
        publishedAt,
        episodeNumber: items.length - index,
        guest: extractGuestFromTitle(title),
        category,
        tags,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        viewCount,
        likeCount,
        rawViewCount,
        rawLikeCount,
        featured: index === 0,
        status: 'live',
      } as Episode & { rawViewCount?: number; rawLikeCount?: number }
    })

    return episodes
  } catch (error) {
    console.error('[YouTube API Error] Failed to fetch:', error)
    return getFallbackEpisodes()
  }
}

function extractGuestFromTitle(title: string): string | undefined {
  if (title.includes('ft.')) {
    return title.split('ft.')[1]?.split('|')[0]?.trim()
  }
  if (title.includes('feat.')) {
    return title.split('feat.')[1]?.split('|')[0]?.trim()
  }
  if (title.includes('|')) {
    const parts = title.split('|')
    return parts[0]?.trim()
  }
  return undefined
}

export function getFallbackEpisodes(): Episode[] {
  return [
    {
      id: '_1aAonnensk',
      title: 'Kisthenics on Why Nothing You Chase Will Make You Happy | TLP ep. 26 | Epaphra (4K)',
      description: 'In this episode of TheThirdLane Podcast, Epaphra interviews Kisthenics on career mindset, peace, and building a life outside traditional norms.',
      thumbnail: 'https://i.ytimg.com/vi/_1aAonnensk/maxresdefault.jpg',
      duration: 5940,
      publishedAt: '2024-02-28',
      episodeNumber: 26,
      guest: 'Kisthenics',
      category: 'Creative Arts',
      tags: ['Creative Arts', 'Mindset', 'Kisthenics', 'Epaphraa'],
      youtubeUrl: 'https://www.youtube.com/watch?v=_1aAonnensk',
      embedUrl: 'https://www.youtube.com/embed/_1aAonnensk',
      viewCount: '1.2M',
      likeCount: '39.4K',
      rawViewCount: 1234597,
      featured: true,
      status: 'live',
    },
    {
      id: 'l7WH2BLZR6o',
      title: 'Dark Reality of Middle Class Trap | ft. Madurai Veeran | TLP Ep. 27',
      description: 'Madurai Veeran breaks down the middle class trap, wealth accumulation, and financial freedom.',
      thumbnail: 'https://i.ytimg.com/vi/l7WH2BLZR6o/maxresdefault.jpg',
      duration: 5280,
      publishedAt: '2024-03-05',
      episodeNumber: 27,
      guest: 'Madurai Veeran',
      category: 'Unconventional Paths',
      tags: ['Unconventional Paths', 'Finance', 'Madurai Veeran', 'Wealth'],
      youtubeUrl: 'https://www.youtube.com/watch?v=l7WH2BLZR6o',
      embedUrl: 'https://www.youtube.com/embed/l7WH2BLZR6o',
      viewCount: '857K',
      likeCount: '18.8K',
      rawViewCount: 857181,
      status: 'live',
    },
    {
      id: 'qLRUMgDCrUs',
      title: 'The Truth About FD, Bonds, Real Estate & Stocks in 2026 — Madurai Veeran Breaks It Down',
      description: 'Detailed analysis of investments, real estate, stocks, and building real assets.',
      thumbnail: 'https://i.ytimg.com/vi/qLRUMgDCrUs/maxresdefault.jpg',
      duration: 5160,
      publishedAt: '2024-03-12',
      episodeNumber: 28,
      guest: 'Madurai Veeran',
      category: 'Entrepreneurs',
      tags: ['Entrepreneurs', 'Investments', 'Real Estate', 'Stocks'],
      youtubeUrl: 'https://www.youtube.com/watch?v=qLRUMgDCrUs',
      embedUrl: 'https://www.youtube.com/embed/qLRUMgDCrUs',
      viewCount: '788K',
      likeCount: '18.0K',
      rawViewCount: 788760,
      status: 'live',
    },
  ]
}
