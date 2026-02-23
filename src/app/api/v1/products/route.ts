import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import dbData from '@/data/production-data.json';

export async function GET() {
    try {
        const products = dbData.products;

        return NextResponse.json({
            status: 'success',
            data: { products },
        });
    } catch (error) {
        console.error("Products API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Maaf, terjadi kendala teknis saat memuat katalog produk turunan kami. Tim kami sedang berusaha memulihkan layanan ini.',
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // const body = await request.json();

        /*
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                category: body.category,
                description: body.description,
                price: Number(body.price),
                imageUrl: body.imageUrl || null,
            }
        });
        */

        return NextResponse.json({
            status: 'success',
            message: 'Fitur tulis data dinonaktifkan untuk mode statis (GitHub Pages).',
            // data: { product: newProduct }
        }, { status: 200 });
    } catch (error) {
        console.error("Create Product API Error:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menambahkan produk baru (Mode Statis).',
        }, { status: 500 });
    }
}
