// app/api/auth/register/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/src/lib/db';
import User from '@/models/User';

export async function POST(req) {
    try {
        await connectDB();


        const { username, email, password } = await req.json();
        username = username.trim();
        email = email.trim().toLowerCase();

        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format.' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'User already exists.' },
                { status: 409 }
            );
        }

        // Validate password length
        if (password.length < 8) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 8 characters.' },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);


        // Create the user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        newUser.password = undefined;

        return NextResponse.json(
            { success: true, message: 'User registered successfully.' },
            { status: 201 }
        );
    } catch (err) {
        console.error('[REGISTER_ERROR]', err);
        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
