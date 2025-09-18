import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: Number,
  addresses: [addressSchema],
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
