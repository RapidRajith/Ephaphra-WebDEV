import { NextResponse } from 'next/server'
import { communityPosts } from '@/data/posts'

export async function GET() {
  return NextResponse.json(communityPosts)
}
