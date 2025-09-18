import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import User from '@/models/User';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { data } from 'react-router-dom';

export async function GET() {
    try {
        await connectDB();

        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find().sort({ createdAt: -1 }).limit(5);

        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Monthly Revenue Calculation (last 6 months)
        const now = new Date();
        const monthlyRevenue = Array(6).fill(0);
        const monthlyLabels = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            monthlyLabels.push(date.toLocaleString('default', { month: 'short' }));
        }

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const monthsAgo = now.getMonth() - date.getMonth() + 12 * (now.getFullYear() - date.getFullYear());
            if (monthsAgo >= 0 && monthsAgo < 6) {
                monthlyRevenue[5 - monthsAgo] += order.totalAmount;
            }
        });

        const salesData = monthlyRevenue.map((revenue, index) => ({
            month: monthlyLabels[index],
            revenue: `₹${revenue}`
        }));

        const recentOrders = orders.map(order => ({
            id: order._id,
            total: `₹${order.totalAmount}`,
            status: order.orderStatus,
            createdAt: order.createdAt
        }));

        // Top Products
        const TopProducts = await Product.find().sort({ sales: -1 }).limit(5).exec();


        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                salesData,
                recentOrders,
                TopProducts,
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
}
