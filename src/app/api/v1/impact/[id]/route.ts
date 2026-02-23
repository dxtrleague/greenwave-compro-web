import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = await params.id;

        await prisma.impactMetric.delete({
            where: { id }
        });

        return NextResponse.json({
            status: 'success',
            message: 'Metrik berhasil dihapus.'
        });
    } catch (error) {
        console.error("Delete Impact API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menghapus metrik.'
        }, { status: 500 });
    }
}
