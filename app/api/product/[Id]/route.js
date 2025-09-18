import Product from '@/models/Product';
import connectDB from '@/src/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    await connectDB();

    try {
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, product });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error retrieving product' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();

    try {
        const data = await req.json();
        const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to update product' }, { status: 400 });
    }
}

export async function DELETE(_, { params }) {
    await connectDB();

    try {
        const deleted = await Product.findByIdAndDelete(params.id);
        if (!deleted) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to delete product' }, { status: 500 });
    }
}
