import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        if (!id) {
            return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({
            status: 'success',
            message: 'Produk berhasil dihapus',
        });
    } catch (error) {
        console.error("Delete Product API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menghapus produk.',
        }, { status: 500 });
    }
}
