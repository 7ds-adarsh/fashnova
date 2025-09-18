// app/api/waitlist/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Waitlist from '@/models/Waitlist';

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 });
        }

        const existing = await Waitlist.findOne({ email });
        if (existing) {
            return NextResponse.json({ success: false, message: 'Already subscribed' }, { status: 409 });
        }

        const newEntry = new Waitlist({ email });
        await newEntry.save();

        return NextResponse.json({ success: true, message: 'Added to waitlist' }, { status: 201 });
    } catch (err) {
        console.error('[WAITLIST_POST_ERROR]', err);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
