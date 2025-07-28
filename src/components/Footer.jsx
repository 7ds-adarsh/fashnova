'use client';
import { Star } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-card/50 border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                            <div className="text-2xl">👤</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Customer Reviews</h3>
                            <div className="flex items-center gap-1">
                                {Array(5).fill(null).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                                ))}
                                <span className="text-muted-foreground ml-2">(4.9/5)</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground italic max-w-md mx-auto">
                        "Absolutely stunning jewelry! The quality exceeded my expectations and the customer service was exceptional."
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-semibold text-white mb-4">Shop</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rings</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Necklaces</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Earrings</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Customer Care</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">About</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Craftsmanship</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-border">
                    <p className="text-muted-foreground">
                        © 2025 Fashnova. All rights reserved. | Designed By <a href="https://github.com/7ds-adarsh">7DS_Adarsh</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}