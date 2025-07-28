'use client';
import { ImageWithFallback } from '@/public/Fallback.jsx';

export function InstagramFeed() {
    const instagramPosts = Array(6).fill(null);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Instagram Feed</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {instagramPosts.map((_, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-muted/20 rounded-lg border border-border hover:border-secondary transition-colors cursor-pointer flex items-center justify-center"
                        >
                            <div className="text-2xl text-muted-foreground">📸</div>
                        </div>
                    ))}
                </div>
                <p className="text-center mt-8 text-muted-foreground">
                    Follow us @fashnova_official
                </p>
            </div>
        </section>
    );
}