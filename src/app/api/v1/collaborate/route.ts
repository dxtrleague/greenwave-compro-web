import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
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

// Configure Nodemailer Transport
// (Untuk Production, gunakan Credentials asli Anda)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.sandbox.mailtrap.io",
    port: Number(process.env.EMAIL_PORT) || 2525,
    auth: {
        user: process.env.EMAIL_USER || "test_user",
        pass: process.env.EMAIL_PASS || "test_pass",
    },
});

export async function POST(request: Request) {
    try {
        const rawData = await request.json();

        // 1. INPUT VALIDATION (XSS, Format & Type Checking)
        const validData = collabSchema.parse(rawData);

        // 2. DATABASE INSERTION (ORM handles SQL Injection auto-escaping)
        const newCollaboration = await prisma.collaboration.create({
            data: {
                companyName: validData.companyName,
                focusArea: validData.focusArea,
                email: validData.email,
                message: validData.message,
            }
        });

        // 3. AUTOMATED EMAIL TO PROSPECT PARTNER
        // Tone: Warm, Hopeful, and Professional
        const mailOptions = {
            from: '"Tim Partnership Greenwave" <partnership@greenwave.or.id>',
            to: validData.email,
            subject: `Terima Kasih, ${validData.companyName}! Mari Ciptakan Dampak Bersama.`,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
                <h2 style="color: #61B58E; font-family: 'Playfair Display', serif;">Halo Tim ${validData.companyName},</h2>
                <p>Terima kasih telah menjangkau <strong>Yayasan Greenwave</strong>. Pesan Anda mengenai potensi kolaborasi di bidang <strong>${validData.focusArea.toUpperCase()}</strong> sudah kami terima dengan sangat baik.</p>
                <p>Ketika mangrove hilang, harapan tenggelam. Namun dengan niat baik dan inisiatif kemitraan yang Anda ajukan, kami percaya solusi berkelanjutan bagi ekosistem dan penguatan ekonomi masyarakat pesisir siap diwujudkan bersama-sama.</p>
                <p>Tim kami sedang me-review pesan Anda dan akan kembali menghubungi maksimal dalam waktu 2x24 Jam kerja untuk mengagendakan pertemuan konseptual.</p>
                <br>
                <p>Salam hangat & Lestari,</p>
                <p><strong>Partnership Department</strong><br>Yayasan Greenwave</p>
                <hr style="border: none; border-top: 1px solid #D9EEF3;" />
                <em style="color: #777; font-size: 12px;">Pemberdayaan masyarakat pesisir melalui konservasi mangrove yang berkelanjutan dan inklusif.</em>
            </div>
        `
        };

        // Asynchronous sendEmail (Optional try-catch block to not break HTTP response)
        transporter.sendMail(mailOptions).then(async () => {
            await prisma.collaboration.update({
                where: { id: newCollaboration.id },
                data: { isEmailSent: true }
            });
        }).catch(console.error);

        // 4. API DELIVERABLE
        return NextResponse.json({
            status: 'success',
            message: 'Terima kasih, data kolaborasi Anda telah kami terima. Silakan cek email Anda untuk konfirmasi awal.'
        }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                status: 'fail',
                message: 'Validasi data gagal. Cek kembali isian Anda.',
                errors: (error as z.ZodError).errors
            }, { status: 400 });
        }

        console.error("Collaboration API Error:", error);
        // Solutive Tone Of Voice for generic errors
        return NextResponse.json({
            status: 'error',
            message: 'Maaf, terjadi kendala teknis pada server. Kami sedang memperbaikinya agar proses kemitraan Anda dapat segera dilanjutkan.'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const collaborations = await prisma.collaboration.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            status: 'success',
            data: { collaborations }
        });
    } catch (error) {
        console.error("Fetch Collaborations API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal memuat data kolaborasi.'
        }, { status: 500 });
    }
}
