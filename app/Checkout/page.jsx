"use client";
import { useState } from 'react';
import { ImageWithFallback } from '@/src/components/Fallback.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Label } from '@/src/components/ui/label.jsx';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select.jsx';
import { Separator } from '@/src/components/ui/separator.jsx';
import { CreditCard, Truck, Shield } from 'lucide-react';

export function Checkout() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        shippingMethod: 'standard',
        paymentMethod: 'card'
    });

    // Mock cart items
    const cartItems = [
        {
            id: 1,
            name: "Gold Statement Necklace",
            price: 299,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Silver Earrings Set",
            price: 159,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop"
        }
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = formData.shippingMethod === 'express' ? 25 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle checkout logic here
        console.log('Checkout data:', formData);
    };

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="mb-4">Checkout</h1>
                    <p className="text-muted-foreground">Complete your order</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Information */}
                            <div>
                                <h2 className="mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h2 className="mb-6">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            placeholder="123 Fashion Ave"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ca">California</SelectItem>
                                                <SelectItem value="ny">New York</SelectItem>
                                                <SelectItem value="tx">Texas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode">ZIP Code</Label>
                                        <Input
                                            id="zipCode"
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <div>
                                <h2 className="mb-6">Shipping Method</h2>
                                <RadioGroup
                                    value={formData.shippingMethod}
                                    onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}
                                >
                                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                                        <RadioGroupItem value="standard" id="standard" />
                                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-medium">Standard Shipping</p>
                                                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                                                </div>
                                                <span className="font-medium">Free</span>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                                        <RadioGroupItem value="express" id="express" />
                                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-medium">Express Shipping</p>
                                                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                                                </div>
                                                <span className="font-medium">$25.00</span>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h2 className="mb-6">Payment Method</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                        </div>
                                        <div>
                                            <Label htmlFor="cardName">Name on Card</Label>
                                            <Input id="cardName" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full gold-gradient text-background">
                                Complete Order
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-card p-6 rounded-lg h-fit">
                        <h3 className="mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <ImageWithFallback
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="mb-6" />

                        <div className="space-y-3 mb-6">
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

                        {/* Security Features */}
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>Secure 256-bit SSL encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                <span>Free returns within 30 days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                <span>Multiple payment options</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}