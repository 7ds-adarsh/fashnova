import { connectDB } from '@/src/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        await connectDB();

        const bodyText = await req.text();

        // Handle case: empty request
        if (!bodyText) {
            return NextResponse.json({ success: false, message: 'Empty request body' }, { status: 400 });
        }

        let email, password;

        try {
            const body = JSON.parse(bodyText);
            email = body.email;
            password = body.password;
        } catch (jsonErr) {
            console.error('❌ JSON parse error:', jsonErr);
            return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
        }

        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({
            success: true,
            message: 'Login successful.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('🔥 LOGIN_ERROR:', err);
        return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
    }
}
