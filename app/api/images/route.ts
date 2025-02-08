import { NextResponse } from 'next/server';
import { headers } from "next/headers";
import { rateLimit } from "./routeLimit";


export async function GET() {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);
  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  try {
    const response = await fetch(
      'https://api.unsplash.com/photos/random?count=16',
      {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}