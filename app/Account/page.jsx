'use client';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Label } from '@/src/components/ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card.jsx';
import { Badge } from '@/src/components/ui/badge.jsx';
import { User, Package, MapPin, CreditCard } from 'lucide-react';

export function Account() {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567'
    });

    const orders = [
        {
            id: '#ORD-001',
            date: '2025-01-15',
            status: 'Delivered',
            total: '$458.00',
            items: 2
        },
        {
            id: '#ORD-002',
            date: '2025-01-10',
            status: 'In Transit',
            total: '$299.00',
            items: 1
        }
    ];

    const addresses = [
        {
            id: 1,
            type: 'Home',
            name: 'John Doe',
            address: '123 Fashion Ave, Style City, SC 12345',
            isDefault: true
        }
    ];

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="mb-4">My Account</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and view your order history
                    </p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>
                                    Update your account details and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                                <Button className="gold-gradient text-background">
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order History
                                </CardTitle>
                                <CardDescription>
                                    View and track your orders
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">{order.id}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.date} • {order.items} items
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                                    {order.status}
                                                </Badge>
                                                <p className="text-sm font-medium mt-1">{order.total}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="addresses" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Shipping Addresses
                                </CardTitle>
                                <CardDescription>
                                    Manage your delivery addresses
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {addresses.map((address) => (
                                        <div key={address.id} className="p-4 border border-border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">{address.type}</h4>
                                                {address.isDefault && <Badge variant="secondary">Default</Badge>}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{address.name}</p>
                                            <p className="text-sm text-muted-foreground">{address.address}</p>
                                        </div>
                                    ))}
                                    <Button variant="outline">Add New Address</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payments" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Methods
                                </CardTitle>
                                <CardDescription>
                                    Manage your payment information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 border border-border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium">•••• •••• •••• 1234</h4>
                                            <Badge variant="secondary">Default</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                                    </div>
                                    <Button variant="outline">Add New Payment Method</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}