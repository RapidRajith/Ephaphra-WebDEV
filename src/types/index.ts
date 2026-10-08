export interface Episode {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number // in seconds
  publishedAt: string
  episodeNumber: number
  guest?: string
  category: string
  tags: string[]
  youtubeUrl?: string
  embedUrl?: string
  viewCount?: string
  likeCount?: string
  rawViewCount?: number
  rawLikeCount?: number
  commentCount?: string
  audioUrl?: string
  featured?: boolean
  showNotes?: string
  status: 'live' | 'upcoming' | 'archived'
}

export interface Subscriber {
  id: string
  email: string
  firstName: string
  preferences: string[]
  subscribedAt: Date
  confirmed: boolean
}

export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface FilterOptions {
  categories: string[]
  dateRange?: { start: string; end: string }
  durationRange?: { min: number; max: number }
  guest?: string
}

export interface CommunityPost {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  publishedAt: string
  publishedMonth?: string // e.g. "March 2024", "February 2024"
  content: string
  images?: string[]
  likeCount: string
  commentCount: string
  youtubeUrl: string
  pinned?: boolean
  category?: 'Announcements' | 'Behind The Scenes' | 'Questions & Polls' | 'Mindset' | 'Podcast Breakdown'
  pollOptions?: { text: string; votesPercent: number }[]
}

