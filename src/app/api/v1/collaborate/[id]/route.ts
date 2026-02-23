import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // const { status } = await request.json();

        /*
        if (!id || !status) {
            return NextResponse.json({ status: 'error', message: 'ID and Status are required' }, { status: 400 });
        }

        const updatedCollab = await prisma.collaboration.update({
            where: { id },
            data: { status },
        });
        */

        return NextResponse.json({
            status: 'success',
            message: `Status kolaborasi ${id} diperbarui (Simulasi Mode Statis).`
            // data: { collaboration: updatedCollab }
        });
    } catch (error) {
        console.error("Update Collaboration Status Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal memperbarui status kolaborasi (Mode Statis).',
        }, { status: 500 });
    }
}

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

        await prisma.collaboration.delete({
            where: { id },
        });
        */

        return NextResponse.json({
            status: 'success',
            message: `Pesan kemitraan ${id} berhasil dihapus (Simulasi Mode Statis)`,
        });
    } catch (error) {
        console.error("Delete Collaboration Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menghapus pesan kemitraan (Mode Statis).',
        }, { status: 500 });
    }
}
