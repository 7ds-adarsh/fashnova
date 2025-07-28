'use client';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';

export function ComingSoon() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Clothing Coming Soon</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Be the first to know when our exclusive clothing collection launches.
                    Get notified about early access and special discounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                        placeholder="Enter your email"
                        className="flex-1 bg-input-background border-border text-white placeholder:text-muted-foreground"
                    />
                    <Button className="gold-gradient text-accent-foreground hover:opacity-90">
                        Get Notified First
                    </Button>
                </div>
            </div>
        </section>
    );
}