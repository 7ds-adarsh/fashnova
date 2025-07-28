'use client';
import { useState } from 'react';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { Button } from '@/src/components/ui/button.jsx';
import { SearchBar } from '@/src/components/ui/SearchBar.jsx';
import Link from 'next/link';

export function Header() {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center space-x-8">
                        <Link href="/"><h1 className="text-2xl font-bold text-white">Fashnova</h1></Link>
                        <nav className="hidden lg:flex items-center space-x-6">
                            <Link href="/" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
                            <Link href="/Shop" className="text-muted-foreground hover:text-white transition-colors">Shop</Link>
                            <Link href="/About" className="text-muted-foreground hover:text-white transition-colors">About</Link>
                            <Link href="/Contact" className="text-muted-foreground hover:text-white transition-colors">Contact</Link>
                        </nav>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <SearchBar
                            onSearch={(query) => console.log('Searching for:', query)}
                            placeholder="Search jewelry, accessories..."
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Mobile Search Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden text-muted-foreground hover:text-white"
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                            <Heart className="h-5 w-5" />
                            <span className="hidden sm:inline ml-1">Wishlist</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="hidden sm:inline ml-1">Cart (0)</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isMobileSearchOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-border">
                        <SearchBar
                            onSearch={(query) => {
                                console.log('Searching for:', query);
                                setIsMobileSearchOpen(false);
                            }}
                            placeholder="Search jewelry, accessories..."
                        />
                    </div>
                )}
            </div>
        </header>
    );
}