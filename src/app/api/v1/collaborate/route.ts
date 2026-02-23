import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import nodemailer from 'nodemailer';
import { z } from 'zod';

// ==========================================
// FORM COLLABORATION VALIDATION SCHEMA
// Melindungi API dari invasi data XSS/Injection
// ==========================================
const collabSchema = z.object({
    companyName: z.string().min(2, "Nama Perusahaan minimal 2 karakter").max(100),
    focusArea: z.enum(['csr', 'esg', 'donor', 'other']),
    email: z.string().email("Format email tidak valid."),
    message: z.string().min(10, "Pesan kolaborasi minimal 10 karakter.").max(1000)
});

/*
// Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.sandbox.mailtrap.io",
    port: Number(process.env.EMAIL_PORT) || 2525,
    auth: {
        user: process.env.EMAIL_USER || "test_user",
        pass: process.env.EMAIL_PASS || "test_pass",
    },
});
*/

export async function POST(request: Request) {
    try {
        const rawData = await request.json();

        // 1. INPUT VALIDATION
        const _validData = collabSchema.parse(rawData);

        /*
        // 2. DATABASE INSERTION
        const newCollaboration = await prisma.collaboration.create({
            data: {
                companyName: validData.companyName,
                focusArea: validData.focusArea,
                email: validData.email,
                message: validData.message,
            }
        });

        // 3. AUTOMATED EMAIL
        const mailOptions = { ... };
        transporter.sendMail(mailOptions)...
        */

        // 4. API DELIVERABLE
        return NextResponse.json({
            status: 'success',
            message: 'Terima kasih, pesan Anda telah diterima (Simulasi Mode Statis). Tim kami akan segera menindaklanjuti.'
        }, { status: 200 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                status: 'fail',
                message: 'Validasi data gagal. Cek kembali isian Anda.',
                errors: (error as z.ZodError).errors
            }, { status: 400 });
        }

        console.error("Collaboration API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Maaf, terjadi kendala teknis pada server (Mode Statis).'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        /*
        const collaborations = await prisma.collaboration.findMany({
            orderBy: { createdAt: 'desc' }
        });
        */
        const collaborations: any[] = [];

        return NextResponse.json({
            status: 'success',
            data: { collaborations }
        });
    } catch (error) {
        console.error("Fetch Collaborations API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal memuat data kolaborasi (Mode Statis).'
        }, { status: 500 });
    }
}
