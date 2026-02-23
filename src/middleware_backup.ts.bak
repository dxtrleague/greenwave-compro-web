import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;

    // Jika mengakses folder /admin dan bukan /admin/login
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
        if (!token) {
            // Tolak dan arahkan ke login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Jika sudah login tapi mengakses /admin/login, langsung lewati ke /admin
    if (request.nextUrl.pathname.startsWith('/admin/login') && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
