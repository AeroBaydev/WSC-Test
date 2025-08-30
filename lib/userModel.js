import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  schoolName: { type: String, required: true },
  categories: [{
    category: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    registeredAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
