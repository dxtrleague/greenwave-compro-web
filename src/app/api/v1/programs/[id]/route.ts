import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        /*
        if (!id) {
            return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
        }

        await prisma.program.delete({
            where: { id },
        });
        */

        return NextResponse.json({
            status: 'success',
            message: `Program ${id} berhasil dihapus (Simulasi Mode Statis)`,
        });
    } catch (error) {
        console.error("Delete Program API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menghapus program (Mode Statis).',
        }, { status: 500 });
    }
}
