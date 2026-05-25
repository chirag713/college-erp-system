import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Boys', 'Girls', 'Co-ed'],
    required: true,
  },
  wardenName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Hostel', hostelSchema);
