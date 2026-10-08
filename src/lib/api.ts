import { Episode, CommunityPost } from '@/types'
import { getPlaylistEpisodes, getFallbackEpisodes } from '@/lib/youtube'


export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    const epList = await getPlaylistEpisodes()
    return epList.length > 0 ? epList : getFallbackEpisodes()
  } catch (error) {
    console.error('[fetchEpisodes Error]:', error)
    return getFallbackEpisodes()
  }
}

export async function fetchEpisodeById(id: string): Promise<Episode | null> {
  try {
    const epList = await fetchEpisodes()
    const episode = epList.find((ep) => ep.id === id)
    return episode || null
  } catch (error) {
    console.error('[fetchEpisodeById Error]:', error)
    return null
  }
}

export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const { communityPosts } = await import('@/data/posts')
    const episodes = await fetchEpisodes()

    // Transform every YouTube channel playlist item into an official creator community post
    const episodePosts: CommunityPost[] = episodes.map((ep, idx) => {
      const d = ep.publishedAt ? new Date(ep.publishedAt) : new Date()
      const monthStr = !isNaN(d.getTime())
        ? d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
        : 'March 2024'

      return {
        id: `yt-post-${ep.id}`,
        author: {
          name: 'Explore with Epaphra',
          handle: '@Epaphraa',
          avatar: 'https://yt3.ggpht.com/9MWx6K2hcdf35k5v2Sr6fS8TvrqSvR0Ht5WorfdCqBOcgudQIe6K4BOTzIxKd7SmuiLdmrxhCug=s800-c-k-c0x00ffffff-no-rj',
        },
        publishedAt: ep.publishedAt || `${idx + 1} days ago`,
        publishedMonth: monthStr,
        category: 'Podcast Breakdown',
        content: `🎬 NEW YOUTUBE EPISODE DROP: "${ep.title}"

${ep.description}

Watch the full 4K episode on YouTube and join the conversation in the comment section below! 👇`,
        images: ep.thumbnail ? [ep.thumbnail] : [],
        likeCount: ep.likeCount || '4.2K',
        commentCount: ep.commentCount || '380',
        youtubeUrl: ep.youtubeUrl || `https://www.youtube.com/watch?v=${ep.id}`,
      }
    })

    // Combine custom community posts + dynamic YouTube channel episode posts
    const combined = [...communityPosts, ...episodePosts]

    // Deduplicate by ID
    const uniqueMap = new Map<string, CommunityPost>()
    combined.forEach((p) => uniqueMap.set(p.id, p))

    return Array.from(uniqueMap.values())
  } catch (error) {
    console.error('[fetchCommunityPosts Error]:', error)
    const { communityPosts } = await import('@/data/posts')
    return communityPosts
  }
}


