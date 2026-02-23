import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const programs = await prisma.program.findMany({
            where: { isActive: true },
            select: {
                id: true,
                title: true,
                description: true,
                iconName: true,
            },
            orderBy: { createdAt: 'asc' },
        });

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
        const body = await request.json();

        const newProgram = await prisma.program.create({
            data: {
                title: body.title,
                description: body.description,
                iconName: body.iconName || "Target",
            }
        });

        return NextResponse.json({
            status: 'success',
            data: { program: newProgram }
        }, { status: 201 });
    } catch (error) {
        console.error("Create Program API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menambahkan program baru.',
        }, { status: 500 });
    }
}
