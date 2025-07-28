import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Label } from '@/src/components/ui/label.jsx';
import { Separator } from '@@/app/src/components/ui/separator.jsx';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const { signIn, signInWithOAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signIn(formData.email, formData.password);
            navigate('/account');
        } catch (error) {
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider) => {
        try {
            await signInWithOAuth(provider);
        } catch (error) {
            setError(error.message || `Failed to sign in with ${provider}`);
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
                                <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
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

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleOAuthSignIn('google')}
                                    type="button"
                                >
                                    Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleOAuthSignIn('facebook')}
                                    type="button"
                                >
                                    Facebook
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center mt-2">
                                Note: Complete OAuth setup at <a href="https://supabase.com/docs/guides/auth/social-login/auth-google" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Supabase OAuth docs</a>
                            </p>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-secondary hover:underline">
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