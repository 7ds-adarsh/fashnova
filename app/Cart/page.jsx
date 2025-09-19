'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ImageWithFallback } from '@/src/components/Fallback';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Separator } from '@/src/components/ui/separator.jsx';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);

export default function Cart() {
    const { data: session, status } = useSession();
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/cart')
                .then(res => res.json())
                .then(data => setCartItems(data));
        }
    }, [status]);

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        const prevItems = [...cartItems];
        const itemIndex = prevItems.findIndex(item => item.productId._id === id);
        if (itemIndex > -1) {
            prevItems[itemIndex].quantity = newQuantity;
            setCartItems(prevItems);
        }
        try {
            const res = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: id, quantity: newQuantity }),
            });
            if (!res.ok) throw new Error();
            ReactGA.event({ category: 'Cart', action: 'Update Quantity' });
        } catch {
            setCartItems(prevItems);
        }
    };

    const removeItem = async (id) => {
        const prevItems = [...cartItems];
        setCartItems(prevItems.filter(item => item.productId._id !== id));
        try {
            const res = await fetch(`/api/cart?productId=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            ReactGA.event({ category: 'Cart', action: 'Remove Item' });
        } catch {
            setCartItems(prevItems);
        }
    };

    const applyPromoCode = async () => {
        const res = await fetch('/api/cart/promo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ promoCode }),
        });
        if (res.ok) {
            const updatedCart = await res.json();
            setCartItems(updatedCart);
            ReactGA.event({ category: 'Cart', action: 'Apply Promo' });
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 25;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (status !== 'authenticated') {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
                        <h1 className="mb-4">Please Sign In</h1>
                        <p className="text-muted-foreground mb-8">
                            Sign in to view your cart.
                        </p>
                        <Button asChild className="gold-gradient text-background">
                            <Link href="/api/auth/signin">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
                        <h1 className="mb-4">Your Cart is Empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Button asChild className="gold-gradient text-background">
                            <Link href="/Shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="mb-4">Shopping Cart</h1>
                    <p className="text-muted-foreground">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.productId._id} className="flex gap-4 p-4 border border-border rounded-lg">
                                <ImageWithFallback
                                    src={item.productId.image}
                                    alt={item.productId.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="mb-2">{item.productId.name}</h3>
                                    <p className="text-muted-foreground mb-4">${item.productId.price}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-muted"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-muted"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-medium">${(item.productId.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeItem(item.productId._id)}
                                                className="text-destructive hover:text-destructive/80"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-card p-6 rounded-lg h-fit">
                        <h3 className="mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span className="gold-text-gradient">${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-sm font-medium mb-2 block">Promo Code</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <Button variant="outline" size="sm" onClick={applyPromoCode}>Apply</Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Button asChild className="w-full gold-gradient text-background">
                                <Link href="/Checkout">Proceed to Checkout</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/Shop">Continue Shopping</Link>
                            </Button>
                        </div>
                        {shipping > 0 && (
                            <p className="text-sm text-muted-foreground mt-4 text-center">
                                Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}