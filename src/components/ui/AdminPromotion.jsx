'use client';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/src/components/ui/card.jsx';

export function AdminPromotion() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dummyUser = { email: 'demo.user@example.com' }; // Replace with a fake user or keep null to simulate "not signed in"

    const promoteToAdmin = () => {
        setLoading(true);
        setTimeout(() => {
            setIsAdmin(true);
            setMessage('✅ You have been promoted to admin! Refresh the page to access admin features.');
            setLoading(false);
        }, 1000); // Simulated delay
    };

    return (
        <Card className="border-2 border-dashed border-secondary/50">
            <CardHeader>
                <CardTitle className="text-secondary">🔑 Admin Access</CardTitle>
                <CardDescription>
                    For testing purposes, promote your account to admin status to access product management features.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Current user: <span className="text-foreground">{dummyUser.email}</span>
                        </p>
                        <Button
                            onClick={promoteToAdmin}
                            disabled={loading || isAdmin}
                            className="gold-gradient text-background"
                        >
                            {loading ? 'Promoting...' : isAdmin ? 'Already Admin' : 'Promote to Admin'}
                        </Button>
                    </div>

                    {message && (
                        <div className="p-3 rounded-md bg-muted text-sm">
                            {message}
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>💡 <strong>Admin features include:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Add new products to the catalog</li>
                            <li>Edit existing product details</li>
                            <li>Delete products from inventory</li>
                            <li>View sales analytics and reports</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
