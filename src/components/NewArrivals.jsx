'use client';
import { ProductCard } from '@/src/components/ProductCard.jsx';

export function NewArrivals() {
    const products = [
        { name: "Golden Elegance Ring", price: "$249" },
        { name: "Silver Chain Necklace", price: "$189" },
        { name: "Diamond Stud Earrings", price: "$340" },
        { name: "Rose Gold Bracelet", price: "$275" }
    ];

    return (
        <section className="py-16 px-4 bg-card/30">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">New Arrivals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}