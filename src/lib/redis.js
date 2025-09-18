import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function getCachedCart(userId) {
    const cached = await redis.get(`cart:${userId}`);
    if (cached) return JSON.parse(cached);
    // Fetch from DB, then set
    await redis.set(`cart:${userId}`, JSON.stringify(cart), { ex: 300 });
}