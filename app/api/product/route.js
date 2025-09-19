// app/api/products/route.js

import { connectDB } from '@/src/lib/db.js';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

// GET: Fetch all products with optional filters and sorting
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');

        const query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category && category !== 'all') {
            query.category = category;
        }

        let products = await Product.find(query).lean();

        // Sorting
        if (sort === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        } else if (sort === 'newest') {
            products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error('[PRODUCTS_GET_ERROR]', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST: Add a new product
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { title, description, price, images, inStock, category, tags } = body;

        // Validate required fields
        if (!title || !price) {
            return NextResponse.json(
                { success: false, message: 'Title and Price are required' },
                { status: 400 }
            );
        }

        // Generate slug and ID
        const slug = slugify(title, { lower: true, strict: true });
        const id = uuidv4();

        const newProduct = new Product({
            id,
            title,
            slug,
            description: description || '',
            price: parseFloat(price),
            images: Array.isArray(images) ? images : [],
            inStock: typeof inStock === 'boolean' ? inStock : true,
            category: category || 'jewelry',
            tags: Array.isArray(tags) ? tags : [],
        });

        await newProduct.save();

        return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('[PRODUCTS_POST_ERROR]', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
