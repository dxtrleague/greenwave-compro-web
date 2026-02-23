import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import dbData from '@/data/production-data.json';

export async function GET() {
    try {
        const programs = dbData.programs;

        return NextResponse.json({
            status: 'success',
            data: { programs },
        });
    } catch (error) {
        console.error("Programs API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Maaf, terjadi kendala teknis dalam memuat program kerja kami. Kami sedang memperbaikinya demi kenyamanan Anda.',
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // const body = await request.json();

        /*
        const newProgram = await prisma.program.create({
            data: {
                title: body.title,
                description: body.description,
                iconName: body.iconName || "Target",
            }
        });
        */

        return NextResponse.json({
            status: 'success',
            message: 'Fitur tulis data dinonaktifkan untuk mode statis (GitHub Pages).',
            // data: { program: newProgram }
        }, { status: 200 });
    } catch (error) {
        console.error("Create Program API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menambahkan program baru (Mode Statis).',
        }, { status: 500 });
    }
}
