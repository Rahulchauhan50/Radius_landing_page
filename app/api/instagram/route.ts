import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('Missing INSTAGRAM_ACCESS_TOKEN in environment variables.');
      return NextResponse.json(
        { error: 'Instagram access token is not configured.' },
        { status: 500 }
      );
    }

    // Fetch latest 6 posts from Instagram Graph API
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp';
    const apiUrl = `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${accessToken}`;

    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Instagram API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch Instagram posts.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const posts: InstagramMedia[] = data.data || [];

    // Map to a cleaner format for the frontend
    const formatted = posts.map((post) => ({
      id: post.id,
      imageUrl: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
      type: post.media_type === 'CAROUSEL_ALBUM' ? 'carousel' : post.media_type === 'VIDEO' ? 'video' : 'single',
      permalink: post.permalink,
      caption: post.caption || '',
    }));

    return NextResponse.json({ posts: formatted });
  } catch (error: any) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch Instagram posts.' },
      { status: 500 }
    );
  }
}
