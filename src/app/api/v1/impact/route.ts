import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const impactMetrics = await prisma.impactMetric.findMany({
            where: { isActive: true },
            select: {
                id: true,
                title: true,
                value: true,
                iconName: true,
            },
            orderBy: { createdAt: 'asc' },
        });

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
        const body = await request.json();

        const newMetric = await prisma.impactMetric.create({
            data: {
                title: body.title,
                value: body.value,
                iconName: body.iconName || "TrendingUp",
            }
        });

        return NextResponse.json({
            status: 'success',
            data: { newMetric }
        }, { status: 201 });
    } catch (error) {
        console.error("Create Impact API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menambahkan data metrik dampak.',
        }, { status: 500 });
    }
}
