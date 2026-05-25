import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  currentOccupants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  roomType: {
    type: String,
    enum: ['AC', 'Non-AC'],
    default: 'Non-AC',
  },
  feePerSemester: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

// Prevent duplicate room numbers in the same hostel
roomSchema.index({ hostel: 1, roomNumber: 1 }, { unique: true });

export default mongoose.model('Room', roomSchema);
