'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// import { apiClient } from '../utils/api.js';
import { InitializeData } from '@/app/src/components/InitializeData.jsx';
import { ProductCard } from '@/src/components/ProductCard.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Search, Filter } from 'lucide-react';

export default function Shop() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [searchTerm, category]);

    const fetchProducts = async () => {
        setLoading(true);
        setError('');

        try {
            const filters = {
                search: searchTerm || undefined,
                category: category !== 'all' ? category : undefined,
                limit: 20
            };

            // Uncomment and use your API client here
            // const response = await apiClient.getProducts(filters);
            // setProducts(response.products.map(product => ({
            //     ...product,
            //     price: `${product.price}`,
            //     image: product.images?.[0] || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop"
            // })));
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'jewelry', label: 'Jewelry' },
        { value: 'bags', label: 'Bags' },
        { value: 'accessories', label: 'Accessories' }
    ];

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        const params = new URLSearchParams();
        if (value) {
            params.set('search', value);
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="mb-6">Shop Collection</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover our curated selection of luxury fashion pieces and accessories.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Initialize Data Section (Development) */}
                {products.length === 0 && !loading && (
                    <div className="mb-8">
                        <InitializeData />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-8">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                                <div className="aspect-square bg-muted rounded-md mb-4"></div>
                                <div className="h-4 bg-muted rounded mb-2"></div>
                                <div className="h-4 bg-muted rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* No Products Found */}
                {!loading && products.length === 0 && !error && (
                    <div className="text-center py-12">
                        <h3 className="mb-4">No products found</h3>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your search or filters.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm('');
                                setCategory('all');
                                handleSearchChange('');
                            }}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Load More */}
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                        Load More Products
                    </Button>
                </div>
            </div>
        </main>
    );
}