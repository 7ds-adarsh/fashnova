import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
    code: String,
    discount: Number,
    // etc.
});

export default mongoose.models.PromoCode || mongoose.model('PromoCode', promoSchema);