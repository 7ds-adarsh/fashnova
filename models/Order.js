import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    customer: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI', 'PayPal'],
      required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },
    totalAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
