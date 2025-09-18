import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDB } from '@/src/lib/db';

export async function GET(req) {
    try {
        await connectDB();

        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error('[AUTH_ME_ERROR]', err);
        return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
    }
}
