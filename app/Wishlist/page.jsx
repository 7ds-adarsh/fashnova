'use client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/src/components/ProductCard.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { Heart } from 'lucide-react';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "Gold Statement Necklace",
            price: "$299",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
            isNew: true
        },
        {
            id: 3,
            name: "Designer Handbag",
            price: "$899",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
        }
    ]);

    if (wishlistItems.length === 0) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
                        <h1 className="mb-4">Your Wishlist is Empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Save items you love to your wishlist so you can easily find them later.
                        </p>
                        <Button asChild className="gold-gradient text-background">
                            <Link to="/shop">Start Shopping</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="mb-4">My Wishlist</h1>
                    <p className="text-muted-foreground">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map(product => (
                        <ProductCard key={product.id} productId={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}