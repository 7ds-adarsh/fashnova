"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card.jsx';
import { Badge } from '@/src/components/ui/badge.jsx';
import { Button } from '@/src/components/ui/button.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, Users, ShoppingCart, IndianRupee, TrendingUp, Eye, Plus, Edit } from 'lucide-react';

export default function Dashboard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        salesData: [],
        recentOrders: [],
        topProducts: [],
        topCustomers: [],
    });

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/product');
            const data = await response.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchDashboardStats = async () => {
        try {
            // API call to fetch stats
            const response = await fetch('/api/admin/overview');
            const data = await response.json();

            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchDashboardStats();
        const intervalid = setInterval(() => {
            fetchDashboardStats();
        }, 60000);

        return () => clearInterval(intervalid);
    }, []);

    if (loading) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-32 bg-muted rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="mb-2">Admin Dashboard</h1>
                            <p className="text-muted-foreground">
                                Welcome back! Here's what's happening with your store today.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild className="gold-gradient text-background">
                                <Link href="/Dashboard/Products">
                                    Manage Products
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/Dashboard/Products">
                            <CardContent className="flex items-center p-6">
                                <Package className="h-10 w-10 text-secondary mr-4" />
                                <div>
                                    <h3 className="font-medium">Product Management</h3>
                                    <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="flex items-center p-6">
                            <ShoppingCart className="h-10 w-10 text-secondary mr-4" />
                            <div>
                                <h3 className="font-medium">Order Management</h3>
                                <p className="text-sm text-muted-foreground">View and manage orders</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="flex items-center p-6">
                            <Users className="h-10 w-10 text-secondary mr-4" />
                            <div>
                                <h3 className="font-medium">Customer Management</h3>
                                <p className="text-sm text-muted-foreground">View customer details</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{stats.totalRevenue?.toLocaleString() || "loading"}</div>
                            <p className="text-xs text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {stats.totalRevenue ? ((stats.totalRevenue - stats.totalRevenue * 0.1) / stats.totalRevenue * 100).toFixed(2) : 0}%
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders?.toLocaleString() || "loading"}</div>
                            <p className="text-xs text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {stats.totalOrders ? ((stats.totalOrders - stats.totalOrders * 0.1) / stats.totalOrders * 100).toFixed(2) : 0}%
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers?.toLocaleString() || "0"}</div>
                            <p className="text-xs text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {stats.totalUsers ? ((stats.totalUsers - stats.totalUsers * 0.1) / stats.totalUsers * 100).toFixed(2) : 0}%
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                {/* In stock and new products info */}
                                <span className="mr-2">In stock: {stats.totalProducts}</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Sales Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                            <CardDescription>Monthly sales for the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={stats.salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="sales" stroke="#FFD700" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Top Products */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Top Products</CardTitle>
                                <CardDescription>Best performing products this month</CardDescription>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/Dashboard/Products">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View All
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="relative mr-4">
                                                <div className="relative w-8 h-8">
                                                    <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-full" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{product.title}</p>
                                                <p className="text-xs text-muted-foreground">{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your customers</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View All Orders
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentOrders.map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                    <div>
                                        <p className="font-medium">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{order.total}</p>
                                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
