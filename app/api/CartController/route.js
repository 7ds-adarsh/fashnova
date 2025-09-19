import { connectDB } from '@/src/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import PromoCode from '@/models/PromoCode';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { z } from 'zod';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/nextjs';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Schemas
const postSchema = z.object({
    productId: z.preprocess((val) => {
        if (val == null) return val;
        return String(val);
    }, z.string().min(1)),
    quantity: z.preprocess((val) => {
        if (val == null) return val;
        const n = Number(val);
        return Number.isNaN(n) ? val : n;
    }, z.number().min(1)),
});

const putSchema = z.object({
    productId: z.preprocess((val) => {
        if (val == null) return val;
        return String(val);
    }, z.string().min(1)),
    quantity: z.preprocess((val) => {
        if (val == null) return val;
        const n = Number(val);
        return Number.isNaN(n) ? val : n;
    }, z.number().min(1)),
});

const promoSchema = z.object({
    promoCode: z.string(),
});

// GET: Fetch user's cart with pagination and caching
export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();
    // resolve user id from session (session.user.id or lookup by email)
    const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
    if (!userId) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const cacheKey = `cart:${userId}:page${page}:limit${limit}`;
    const cached = await redis.get(cacheKey);
    if (cached) return new Response(JSON.stringify(JSON.parse(cached)), { status: 200 });

    try {
        const cart = await Cart.findOne({ userId })
            .populate('items.productId')
            .select('items')
            .slice('items', [skip, limit]);
        const items = cart?.items || [];
        await redis.set(cacheKey, JSON.stringify(items), { ex: 300 });
        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        Sentry.captureException(error);
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    }
}

// POST: Add item to cart with stock check and transaction
export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    let body;
    try {
        body = postSchema.parse(await req.json());
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
    }
    const { productId, quantity } = body;

    await connectDB();
    // resolve user id
    const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
    if (!userId) {
        return new Response(JSON.stringify({ message: 'Unauthorized', reason: 'no-userId-or-email', hasSessionUser: !!session.user, hasEmail: !!session.user?.email }), { status: 401 });
    }

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
    try {
        // Support lookup by Mongo _id or by product.id (string) to be resilient
        const product = await Product.findOne({ $or: [{ _id: productId }, { id: productId }] }).session(mongoSession);
        // Handle different product schemas: numeric `stock` or boolean `inStock`
        const stockAvailable = (product && typeof product.stock === 'number')
            ? product.stock
            : (product && typeof product.inStock === 'boolean')
                ? (product.inStock ? Number.MAX_SAFE_INTEGER : 0)
                : Number.MAX_SAFE_INTEGER;
        if (!product || stockAvailable < quantity) throw new Error('Out of stock');

        let cart = await Cart.findOne({ userId }).session(mongoSession);
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save({ session: mongoSession });
        await mongoSession.commitTransaction();

    const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
    await redis.del(`cart:${userId}:*`); // Invalidate cache
        return new Response(JSON.stringify(populatedCart.items), { status: 200 });
    } catch (error) {
        await mongoSession.abortTransaction();
        Sentry.captureException(error);
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    } finally {
        mongoSession.endSession();
    }
}

// PUT: Update item quantity with stock check and transaction
export async function PUT(req) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    let body;
    try {
        body = putSchema.parse(await req.json());
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
    }
    const { productId, quantity } = body;

    await connectDB();
    const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
    if (!userId) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
    try {
        // Support lookup by Mongo _id or by product.id (string)
        const product = await Product.findOne({ $or: [{ _id: productId }, { id: productId }] }).session(mongoSession);
        const stockAvailable = (product && typeof product.stock === 'number')
            ? product.stock
            : (product && typeof product.inStock === 'boolean')
                ? (product.inStock ? Number.MAX_SAFE_INTEGER : 0)
                : Number.MAX_SAFE_INTEGER;
        if (!product || stockAvailable < quantity) throw new Error('Out of stock');

    const cart = await Cart.findOne({ userId }).session(mongoSession);
    if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), { status: 404 });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });

        cart.items[itemIndex].quantity = quantity;
        await cart.save({ session: mongoSession });
        await mongoSession.commitTransaction();

    const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
    await redis.del(`cart:${userId}:*`); // Invalidate cache
        return new Response(JSON.stringify(populatedCart.items), { status: 200 });
    } catch (error) {
        await mongoSession.abortTransaction();
        Sentry.captureException(error);
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    } finally {
        mongoSession.endSession();
    }
}

// DELETE: Remove item from cart with transaction
export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });

    await connectDB();
    const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
    if (!userId) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
    try {
        const cart = await Cart.findOne({ userId }).session(mongoSession);
        if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), { status: 404 });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save({ session: mongoSession });
        await mongoSession.commitTransaction();

    const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
    await redis.del(`cart:${userId}:*`); // Invalidate cache
        return new Response(JSON.stringify(populatedCart.items), { status: 200 });
    } catch (error) {
        await mongoSession.abortTransaction();
        Sentry.captureException(error);
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
    } finally {
        mongoSession.endSession();
    }
}