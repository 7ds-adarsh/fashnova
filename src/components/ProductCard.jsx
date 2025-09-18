
import { useState } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
import { Card, CardContent } from '@/src/components/ui/card.jsx';
import { ImageWithFallback } from '@/public/Fallback.jsx';

export function ProductCard({ name, price, image, productId, id, _id, product }) {
    const [loading, setLoading] = useState(false);

    // tolerate different shapes: productId, id, _id or product object
    const resolvedId = productId ?? id ?? _id ?? product?._id ?? product?.id;

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            if (!resolvedId) {
                alert('Product id not available. Cannot add to cart.');
                return;
            }

            const payload = { productId: String(resolvedId), quantity: 1 };
            console.debug('Add to cart payload:', payload);

            const res = await fetch('/api/CartController', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Added to cart!');
            } else {
                const text = await res.text();
                console.error('Add to cart failed', res.status, text);
                alert(`Failed to add to cart: ${text}`);
            }
        } catch (err) {
            console.error('Add to cart error', err);
            alert('Error adding to cart. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-card border-border hover:border-secondary transition-colors group">
            <CardContent className="p-4">
                <div className="aspect-square bg-muted/20 rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
                    {image ? (
                        <ImageWithFallback
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-4xl text-muted-foreground">💍</div>
                    )}
                </div>
                <h3 className="font-medium text-white mb-2">{name}</h3>
                <p className="text-secondary mb-3">{price}</p>
                <Button
                    size="sm"
                    className="w-full bg-muted text-white hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add to Cart'}
                </Button>
            </CardContent>
        </Card>
    );
}