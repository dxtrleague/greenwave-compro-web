import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'greenwave2026';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_greenwave_key_2026';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Create JWT Token
            const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });

            // Set cookie
            const response = NextResponse.json({ status: 'success', message: 'Login berhasil.' });
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 8 * 60 * 60, // 8 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ status: 'fail', message: 'Username atau password salah.' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Kendala teknis saat login.' }, { status: 500 });
    }
}
