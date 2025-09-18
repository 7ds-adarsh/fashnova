// app/api/orders/user/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/src/lib/db";
import Order from "@/models/Order";
import User from '@/models/User';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }

        await connectDB();
        const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
        if (!userId) return new Response(JSON.stringify({ error: 'Not authenticated', reason: 'no-userId-or-email', hasSessionUser: !!session.user, hasEmail: !!session.user?.email }), { status: 401 });

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }

        await connectDB();
        const userId = session.user?.id ?? (session.user?.email ? String((await User.findOne({ email: session.user.email }).select('_id').lean())?._id) : null);
        if (!userId) return new Response(JSON.stringify({ error: 'Not authenticated', reason: 'no-userId-or-email', hasSessionUser: !!session.user, hasEmail: !!session.user?.email }), { status: 401 });

        const body = await req.json();
        const order = new Order(body);
        order.userId = userId;
        await order.save();
        return new Response(JSON.stringify(order), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}