'use client';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { toast } from 'sonner'; // or your toast system

export function ComingSoon() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('You’ve been added to the waitlist!');
                setEmail('');
            } else {
                toast.error(data.message || 'Failed to subscribe.');
            }
        } catch (err) {
            console.error('Waitlist error:', err);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-input-background border-border text-white placeholder:text-muted-foreground"
                        disabled={loading}
                    />
                    <Button
                        onClick={handleSubmit}
                        className="gold-gradient text-accent-foreground hover:opacity-90"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Get Notified First'}
                    </Button>
                </div>
            </div>
        </section>
    );
}
