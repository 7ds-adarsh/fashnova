// app/api/auth/logout/route.js

import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ success: true, message: 'Logged out' });

    // Clear the cookie
    res.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    return res;
}
