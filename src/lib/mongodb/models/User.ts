import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  whatsapp: {
    type: String,
    required: [true, 'Please provide a whatsapp number'],
  },
  level_establishment: {
    type: String,
  },
  fingerprint_id: {
    type: String,
    required: [true, 'Please provide a fingerprint ID'],
    unique: true,
  },
  plan_type: {
    type: String,
    enum: ['hourly', 'daily', 'monthly'],
    default: 'hourly',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
