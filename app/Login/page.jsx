'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Label } from '@/src/components/ui/label.jsx';
import { Separator } from '@/src/components/ui/separator.jsx';
import { Eye, EyeOff } from 'lucide-react';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
    const { data: session } = useSession();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleOAuthSignIn = async (provider) => {
        setLoading(true);
        try {
            await signIn(provider, { callbackUrl: '/' });
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const text = await res.text();  // Read raw text first
            let data;

            try {
                data = JSON.parse(text);    // Try to parse only if not empty
            } catch (err) {
                console.error('❌ Failed to parse JSON:', text);
                setError('Invalid server response');
                return;
            }

            if (!res.ok || !data.success) {
                setError(data?.message || 'Invalid credentials');
                return;
            }

            // ✅ Login successful
            window.location.href = '/Account';

        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="mb-4">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Sign in to your Fashnova account
                        </p>
                    </div>

                    <div className="bg-card p-8 rounded-lg">
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="rounded border-border"
                                    />
                                    <span className="text-sm">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-secondary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full gold-gradient text-background"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <Separator className="my-4" />
                                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>

                            <div className="flex">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleOAuthSignIn('google')}
                                    type="button"
                                >
                                    Google
                                </Button>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href="/Register" className="text-secondary hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}