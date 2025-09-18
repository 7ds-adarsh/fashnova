"use client";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '@/public/Fallback.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { Badge } from '@/src/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs.jsx';
import { Heart, ShoppingCart, Share2, Star, ArrowLeft } from 'lucide-react';
// import { apiClient } from '../utils/api.js';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import { useCart } from '../contexts/CartContext.jsx';

export default function Product() {
    const { slug } = useParams(); // This will work for both slugs and IDs
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [slug]);

    const fetchProduct = async () => {
        setLoading(true);
        setError('');

        try {
            // Try to fetch product by slug/id
            const response = await apiClient.getProduct(slug);
            setProduct(response.product);
            setSelectedImage(0);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Product not found');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        setAddingToCart(true);

        try {
            await addToCart(product, quantity);
            // You could add a toast notification here
            console.log('Added to cart successfully');
        } catch (error) {
            console.error('Failed to add to cart:', error);
            // You could show an error toast here
        } finally {
            setAddingToCart(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Loading skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-muted rounded-lg animate-pulse"></div>
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-8 bg-muted rounded animate-pulse"></div>
                            <div className="h-6 bg-muted rounded animate-pulse w-2/3"></div>
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <h1 className="mb-4">Product Not Found</h1>
                        <p className="text-muted-foreground mb-8">
                            The product you're looking for doesn't exist or has been removed.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => navigate(-1)} variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                            <Button onClick={() => navigate('/shop')} className="gold-gradient text-background">
                                Browse Products
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!product) return null;

    // Ensure we have images array
    const images = product.images || [product.image].filter(Boolean);

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <button onClick={() => navigate('/')} className="hover:text-foreground">
                            Home
                        </button>
                        <span>/</span>
                        <button onClick={() => navigate('/shop')} className="hover:text-foreground">
                            Shop
                        </button>
                        <span>/</span>
                        <span className="text-foreground">{product.name}</span>
                    </div>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-card">
                            <ImageWithFallback
                                src={images[selectedImage] || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-secondary' : 'border-transparent hover:border-muted'
                                            }`}
                                    >
                                        <ImageWithFallback
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <Badge className="mb-4">{product.category}</Badge>
                            <h1 className="mb-4">{product.name}</h1>

                            {/* Rating */}
                            {product.rating && (
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                        ? 'fill-secondary text-secondary'
                                                        : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-muted-foreground">
                                            {product.rating} {product.reviews && `(${product.reviews} reviews)`}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl gold-text-gradient">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${product.originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground">{product.description}</p>

                        {/* Features */}
                        {product.features && (
                            <div>
                                <h3 className="mb-4">Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium">Quantity:</label>
                                <div className="flex items-center border border-border rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-1 hover:bg-muted transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-1 hover:bg-muted transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    className="flex-1 gold-gradient text-background"
                                    onClick={handleAddToCart}
                                    disabled={addingToCart || !product.inStock}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {addingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleShare}>
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-20">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-8">
                            <div className="prose prose-invert max-w-none">
                                <p>{product.description}</p>
                                {product.features && (
                                    <div className="mt-6">
                                        <h4>Product Features:</h4>
                                        <ul>
                                            {product.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="shipping" className="mt-8">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2">Shipping Options</h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>• Standard Shipping (5-7 business days) - Free</li>
                                        <li>• Express Shipping (2-3 business days) - $15</li>
                                        <li>• Overnight Shipping (1 business day) - $30</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="mb-2">Return Policy</h4>
                                    <p className="text-muted-foreground">
                                        30-day return policy. Items must be in original condition with tags attached.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-8">
                            <div className="space-y-6">
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">
                                        Reviews feature coming soon. Be the first to review this product!
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}