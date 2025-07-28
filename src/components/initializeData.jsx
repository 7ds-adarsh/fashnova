import { useState } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
// import { apiClient } from '../utils/api.js';

export function InitializeData() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const initializeSampleData = async () => {
        setLoading(true);
        setMessage('');

        try {
            await apiClient.initSampleData();
            setMessage('Sample products initialized successfully!');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card p-6 rounded-lg border-2 border-dashed border-border">
            <h3 className="mb-4">Development Tools</h3>
            <p className="text-muted-foreground mb-4">
                Initialize sample products for testing the e-commerce functionality.
            </p>
            <Button
                onClick={initializeSampleData}
                disabled={loading}
                className="gold-gradient text-background"
            >
                {loading ? 'Initializing...' : 'Initialize Sample Products'}
            </Button>
            {message && (
                <p className={`mt-3 text-sm ${message.includes('Error') ? 'text-destructive' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}