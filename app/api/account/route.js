// app/api/account/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/src/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";

export async function GET() {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }

        const profile = await User.findOne({ email: session.user.email })
            .select("-password")
            .lean();

        if (!profile) {
            return new Response(JSON.stringify({ profile: null, orders: [], addresses: [] }), { status: 200 });
        }

        const orders = await Order.find({ user: profile._id }).sort({ createdAt: -1 }).lean();

        return new Response(
            JSON.stringify({ profile, orders, addresses: profile.addresses || [] }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching account:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const updateFields = {};
        if (body.name) updateFields.name = body.name;
        if (body.phone) updateFields.phone = body.phone;
        if (body.addresses) updateFields.addresses = body.addresses;

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        return new Response(
            JSON.stringify({ success: true, user: updatedUser }),
            { status: 200 }
        );
    } catch (error) {
        console.error("PATCH /account error:", error);
        return new Response(JSON.stringify({ error: "Failed to update account" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();

        let update = {};
        let updateOp = {};

        // If password is provided, update password
        if (body.password) {
            updateOp = { $set: { password: body.password } };
        } else if (
            body.address || body.street || body.city || body.state || body.postalCode || body.country
        ) {
            // If address fields are provided, push to addresses array
            const addressObj = {
                address: body.address || "",
                street: body.street || "",
                city: body.city || "",
                state: body.state || "",
                postalCode: body.postalCode || "",
                country: body.country || ""
            };
            updateOp = { $push: { addresses: addressObj } };
        } else {
            return new Response(JSON.stringify({ error: "No valid fields provided" }), { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            updateOp,
            { new: true, runValidators: true }
        ).select("-password");

        return new Response(
            JSON.stringify({ success: true, user: updatedUser }),
            { status: 200 }
        );

    } catch (error) {
        console.error("POST /account error:", error);
        return new Response(JSON.stringify({ error: "Failed to update account" }), { status: 500 });
    }
}
