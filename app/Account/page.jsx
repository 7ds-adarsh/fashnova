'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/src/components/ui/button.jsx';
import { Input } from '@/src/components/ui/input.jsx';
import { Label } from '@/src/components/ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card.jsx';
import { Badge } from '@/src/components/ui/badge.jsx';
import { User, Package, MapPin, CreditCard } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function Account() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState([]);
    const [newAddress, setNewAddress] = useState({ address: "", street: "", city: "", state: "", postalCode: "", country: "" });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [profile, setProfile] = useState({ name: '', email: '', phone: '', addresses: [] });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch user profile + addresses
    const fetchUser = async () => {
        try {
            const res = await fetch("/api/account");
            if (res.ok) {
                const data = await res.json();
                setProfile({
                    name: data.profile?.name || "",
                    email: data.profile?.email || "",
                    phone: data.profile?.phone || "",
                    addresses: data.profile?.addresses || [],
                });
            }
        } catch (err) {
            console.error("Error fetching account:", err);
        }
    };

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders/user");
            if (res.ok) {
                const data = await res.json();
                setOrders(data || []);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        if (session?.user) {
            fetchUser();
            fetchOrders();
        }
    }, [session]);

    // Removed unused handleAddressChange

    // Save new address
    const handleSaveAddress = async () => {
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const res = await fetch("/api/account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAddress),
            });
            if (res.ok) {
                await fetchUser(); // refresh with updated list
                setShowAddressForm(false);
                setNewAddress({ address: "", street: "", city: "", state: "", postalCode: "", country: "" });
                setSuccessMsg("Address added successfully.");
            } else {
                setErrorMsg("Failed to save address.");
            }
        } catch (err) {
            setErrorMsg("Error saving address.");
        }
    };


    // Update profile
    const updateProfile = async () => {
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const res = await fetch("/api/account", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            if (res.ok) {
                setSuccessMsg("Profile updated successfully.");
                await fetchUser();
            } else {
                setErrorMsg("Failed to update profile.");
            }
        } catch (error) {
            setErrorMsg("Error updating profile.");
        }
    };

    if (!session) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4">My Account</h1>
                    <p className="text-muted-foreground">Please sign in to view your account.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <h1 className="mb-4">My Account</h1>
                <p className="text-muted-foreground">Manage your account settings and view your order history</p>

                {errorMsg && <div className="text-red-500 mb-2">{errorMsg}</div>}
                {successMsg && <div className="text-green-500 mb-2">{successMsg}</div>}

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Profile Information</CardTitle>
                                <CardDescription>Update your account details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                                <Button onClick={updateProfile} className="w-full bg-muted text-white">Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" />Order History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <div key={order._id || order.id} className="border p-4 my-2">
                                            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                                            <p><strong>Status:</strong> {order.orderStatus}</p>
                                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No orders found.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Addresses Tab */}
                    <TabsContent value="addresses" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Shipping Addresses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {profile.addresses.length > 0 ? (
                                    profile.addresses.map((address, idx) => (
                                        <div key={address._id || address.id || idx} className="border p-4 my-2">
                                            <p><strong>{address.address}</strong></p>
                                            <p>{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No addresses found.</p>
                                )}

                                {!showAddressForm && (
                                    <Button variant="outline" onClick={() => setShowAddressForm(true)}>Add New Address</Button>
                                )}

                                {showAddressForm && (
                                    <div className="mt-4 space-y-2">
                                        {["address", "street", "city", "state", "postalCode", "country"].map((field) => (
                                            <div key={field}>
                                                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                                <Input
                                                    name={field}
                                                    value={newAddress[field]}
                                                    onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                                                />
                                            </div>
                                        ))}
                                        <Button onClick={handleSaveAddress}>Save Address</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments" className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Payment Methods</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>No payment methods yet.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
