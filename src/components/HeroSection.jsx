'use client';
import { Button } from './ui/button.jsx';
import { ImageWithFallback } from '@/public/Fallback.jsx';

export function HeroSection() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Shine in Every Moment{' '}
                            <span className="gold-text-gradient">✨</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                            Gold &amp; Silver Accessories for Bold &amp; Beautiful
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                                Shop Now
                            </Button>
                            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3">
                                View Collection
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="aspect-square bg-muted/20 rounded-lg border border-border flex items-center justify-center">
                            <div className="text-6xl text-muted-foreground">✨</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}