'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { ProductCard } from '@/src/components/ProductCard.jsx';

export function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const res = await fetch('/api/product');
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (err) {
                console.error('Error loading new arrivals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    return (
        <section className="py-20 px-6 bg-card/40">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
                    ✨ Featured Collection
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-muted-foreground text-lg animate-pulse">Loading...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id || product.id}
                                productId={product._id || product.id}
                                name={product.title}
                                price={`$${product.price.toFixed(2)}`}
                                image={product.images?.[0]}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
