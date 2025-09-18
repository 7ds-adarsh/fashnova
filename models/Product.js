import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  images: [String], // array of image URLs
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: ['braclets', 'necklaces', 'rings', 'earrings', 'watches', 'jewelry'],
    default: 'jewelry',
  },
  tags: [String], // for filtering and SEO
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
