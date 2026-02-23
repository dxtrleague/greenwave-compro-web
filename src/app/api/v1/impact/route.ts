import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import dbData from '@/data/production-data.json';

export async function GET() {
    try {
        const impactMetrics = dbData.impactMetrics;

        return NextResponse.json({
            status: 'success',
            data: { impactMetrics },
        });
    } catch (error) {
        console.error("Impact API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Maaf, terjadi kendala teknis dalam mengambil data metrik. Kami sedang memperbaikinya.',
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // const body = await request.json();

        /*
        const newMetric = await prisma.impactMetric.create({
            data: {
                title: body.title,
                value: body.value,
                iconName: body.iconName || "TrendingUp",
            }
        });
        */

        return NextResponse.json({
            status: 'success',
            message: 'Fitur tulis data dinonaktifkan untuk mode statis (GitHub Pages).',
            // data: { newMetric }
        }, { status: 200 }); // Changed to 200 for mock
    } catch (error) {
        console.error("Create Impact API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menambahkan data metrik dampak (Mode Statis).',
        }, { status: 500 });
    }
}
