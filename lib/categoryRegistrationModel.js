import mongoose from 'mongoose';

const categoryRegistrationSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  paymentAmount: { type: String },
  transactionId: { type: String },
  registeredAt: { type: Date, default: Date.now },
  zohoFormData: { type: mongoose.Schema.Types.Mixed } // Store all Zoho form data
}, { timestamps: true });

// Create compound index to prevent duplicate registrations
categoryRegistrationSchema.index({ clerkUserId: 1, category: 1 }, { unique: true });

export default mongoose.models.CategoryRegistration || mongoose.model('CategoryRegistration', categoryRegistrationSchema);
