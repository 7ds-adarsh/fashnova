// models/Waitlist.js

import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
}, { timestamps: true });

export default mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);
