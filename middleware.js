import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function middleware(req) {
    const ip = req.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    return NextResponse.next();
}

export const config = { matcher: '/api/cart' };