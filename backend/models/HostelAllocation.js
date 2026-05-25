import mongoose from 'mongoose';

const hostelAllocationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // A student can only have one active allocation at a time
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Vacated'],
    default: 'Active',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  vacatedAt: {
    type: Date,
  }
}, { timestamps: true });

export default mongoose.model('HostelAllocation', hostelAllocationSchema);
